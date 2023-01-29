import { RESPONSE_SUCCESS_CODE } from '@/constant';
import {
  deleteGoodsService,
  PageGoodsData,
  queryPageGoodsService,
} from '@/services/machine-tool-manage/inventory';
import { deleteUserService, PeopleData, queryAdminUserListService } from '@/services/system-manage/people-manage';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';
import Create from './Create';
const PeopleManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [editId,setEditId] = useState<number | string>();
  const handleDeleteConfirm = async (ids: number) => {
    const res = await deleteUserService(ids);
    message.success(res?.message);
    if (res?.code === RESPONSE_SUCCESS_CODE) {
      actionRef?.current?.reload();
    }
  };
  const handleEdit = (id: number) => {
    setEditId(id);
    setOpen(true);
  }
  const columns: ProColumns<PeopleData>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name',
      fieldProps: {
        placeholder: '请输入用名',
      },
      formItemProps: {
        label: '用户名',
        name: 'keyword',
      },
    },
    {
      title: '账户',
      dataIndex: 'account',
      key: 'account',
      search: false
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
      search: false
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      search: false
    },
    {
      title: '角色',
      dataIndex: 'price',
      key: 'price',
      search: false
    },
    {
      title: '状态',
      dataIndex: 'use',
      key: 'use',
      valueEnum: {
        1: { text: '启动', status: 'Success' },
        0: { text: '停用', status: 'Error' },
      },

    },
    {
      title: '创建时间',
      dataIndex: 'createDt',
      key: 'createDt',
      search: false
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
          onConfirm={() => handleDeleteConfirm( record.id!)}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
        >
          <Button type="link">删除</Button>
        </Popconfirm>,
        <a key="link" onClick={() => handleEdit(record.id!)}>编辑</a>,
      ],
    },
  ];

  const handleCreateFinish = () => {
    setOpen(false);
    actionRef?.current?.reload();
    setEditId("")
  }
  return (
    <>
      <ProTable<PeopleData>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        pagination={{
            defaultPageSize: 10
        }}
        options={false}
        request={async (params = {}) => {
          const res = await queryAdminUserListService({
            currentPage: params.current!,
            pageSize: params.pageSize!,
            keyword: params.keyword!,
            searchStatus: params.searchStatus,
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
        toolBarRender={() => [
          <Button key="button" onClick={()=> setOpen(true)} icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
      <Create id={editId} open={open} onFinish={handleCreateFinish} onCancel={()=> { setOpen(false); setEditId("")}}/>
    </>
  );
};
export default PeopleManage;
