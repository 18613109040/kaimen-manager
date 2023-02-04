import { RESPONSE_SUCCESS_CODE } from '@/constant';
import {
  deleteGoodsService,
  PageGoodsData,
  queryMachinesListService,
} from '@/services/machine-tool-manage/inventory';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';
import Create from './Create';
const Inventory: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<PageGoodsData | undefined>(undefined);
  const handleDeleteConfirm = async (ids: Record<string, string>) => {
    const res = await deleteGoodsService(ids);
    message.success(res?.message);
    if (res?.code === RESPONSE_SUCCESS_CODE) {
      actionRef?.current?.reload();
    }
  };
  const handleEdit = (data: PageGoodsData) => {
    setEditData(data);
    setOpen(true);
  };
  const columns: ProColumns<PageGoodsData>[] = [
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      valueType: 'image',
      width: 60,
    },
    {
      title: '商品名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '机具型号',
      dataIndex: 'modelNumber',
      key: 'modelNumber',
    },
    {
      title: '厂家',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '销量',
      dataIndex: 'salesVolume',
      key: 'salesVolume',
    },
    {
      title: '创建时间',
      dataIndex: 'createDt',
      key: 'createDt',
    },
    {
      title: '操作',
      width: 120,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <Popconfirm
          key=""
          title="确认删除"
          onConfirm={() => handleDeleteConfirm({ id: record?.id as any })}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
          <Button type="link">删除</Button>
        </Popconfirm>,
        <a key="link" onClick={() => handleEdit(record)}>
          编辑
        </a>,
      ],
    },
  ];

  const handleCreateFinish = () => {
    setOpen(false);
    actionRef?.current?.reload();
    setEditData(undefined);
  };
  return (
    <>
      <ProTable<PageGoodsData>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        rowSelection={{
          defaultSelectedRowKeys: [],
        }}
        pagination={{
          defaultPageSize: 10,
        }}
        options={false}
        tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
          <Space size={24}>
            <span>
              已选 {selectedRowKeys.length} 项
              <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
                取消选择
              </a>
            </span>
          </Space>
        )}
        tableAlertOptionRender={({ selectedRowKeys }) => {
          console.log(selectedRowKeys);
          return <Button type="link">批量删除</Button>;
        }}
        request={async (params = {}) => {
          const res = await queryMachinesListService({
            currentPage: params.current!,
            pageSize: params.pageSize!,
          });
          if (res?.code === RESPONSE_SUCCESS_CODE) {
            return {
              data: res?.result?.list || [],
              success: true,
              total: res?.result?.countNum,
            };
          }
          return {
            data: [],
            success: false,
            total: 0,
          };
        }}
        rowKey="id"
        search={false}
        toolBarRender={() => [
          <Button key="button" onClick={() => setOpen(true)} icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
      <Create
        values={editData}
        open={open}
        onFinish={handleCreateFinish}
        onCancel={() => {
          setOpen(false);
          setEditData(undefined);
        }}
      />
    </>
  );
};
export default Inventory;
