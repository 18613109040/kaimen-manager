import { RESPONSE_SUCCESS_CODE } from '@/constant';
import { queryRoleListService, RoleData } from '@/services/system-manage/role-manage';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef, useState } from 'react';
import Create from './Create';
const RoleManage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  // const [editData, setEditData] = useState<PageGoodsData | undefined>(undefined)
  // const handleDeleteConfirm = async (ids: Record<string, string>) => {
  //   const res = await deleteGoodsService(ids);
  //   message.success(res?.message);
  //   if (res?.code === RESPONSE_SUCCESS_CODE) {
  //     actionRef?.current?.reload();
  //   }
  // };
  const handleEdit = (data: any) => {
    // setEditData(data);
    console.log(data);
    setOpen(true);
  };
  const columns: ProColumns<RoleData>[] = [
    {
      title: '角色名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '是否使用',
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
      search: false,
    },
    {
      title: '操作',
      width: 120,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <Button type="link" key="menu">
          菜单配置
        </Button>,
        <Button key="link" type="link" onClick={() => handleEdit(record)}>
          编辑
        </Button>,
        <Button key="delete" type="link" onClick={() => handleEdit(record)}>
          删除
        </Button>,
      ],
    },
  ];

  const handleCreateFinish = () => {
    setOpen(false);
    actionRef?.current?.reload();
    // setEditData(undefined);
  };
  return (
    <>
      <ProTable<RoleData>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        pagination={{
          defaultPageSize: 10,
        }}
        options={false}
        request={async (params = {}) => {
          const res = await queryRoleListService({
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
        search={false}
        rowKey="id"
        toolBarRender={() => [
          <Button key="button" onClick={() => setOpen(true)} icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
      <Create
        open={open}
        onFinish={handleCreateFinish}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};
export default RoleManage;
