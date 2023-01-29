import { RESPONSE_SUCCESS_CODE } from '@/constant';
import {
  AuthStatus,
  AuthStatusText,
  querySalesmanListService,
  SalesmanData,
} from '@/services/salesman-manage/salesman';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';
import Detail from './Detail';
const Salesman: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [selectId, setSelectId] = useState('');
  const handleSearchDetail = (id: string) => {
    setSelectId(id);
    setOpen(true);
  };
  const columns: ProColumns<SalesmanData>[] = [
    {
      title: '名称',
      dataIndex: 'merchName',
      key: 'merchName',
      fieldProps: {
        placeholder: '请输入手机号或业务员名称',
      },
      formItemProps: {
        label: '条件搜索',
        name: 'keyword',
      },
    },
    {
      title: '用户等级',
      dataIndex: 'level',
      key: 'level',
      search: false,
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
      key: 'mobile',
      search: false,
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      search: false,
    },
    {
      title: '实名状态',
      dataIndex: 'authStatus',
      key: 'authStatus',
      valueType: 'radioButton',
      valueEnum: {
        0: { text: '未实名' },
        2: { text: '已实名' },
      },
      render: (_, record) => {
        return record.authStatus === AuthStatus.ALREADY ? (
          <Button type="link">{AuthStatusText[record.authStatus]}</Button>
        ) : (
          <span>{AuthStatusText[record.authStatus]}</span>
        );
      },
    },
    {
      title: '加入时间',
      dataIndex: 'date',
      key: 'date',
      search: false,
    },
    {
      title: '操作',
      width: 60,
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, record) => [
        <Button key="1" type="link">
          等级调整
        </Button>,
        <Button key="link" type="link" onClick={() => handleSearchDetail(record.merchno)}>
          详情
        </Button>,
      ],
    },
  ];

  return (
    <>
      <ProTable<SalesmanData>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        options={false}
        pagination={{
          defaultPageSize: 10,
        }}
        request={async (params = {}) => {
          const res = await querySalesmanListService({
            currentPage: params.current!,
            pageSize: params.pageSize!,
            authStaus: params.authStatus || '',
            keyword: params.keyword || '',
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
      />
      <Detail open={open} id={selectId} onCancel={()=> setOpen(false)}/>
      {/* <Create values={editData} open={open} onFinish={handleCreateFinish} onCancel={()=> { setOpen(false); setEditData(undefined)}}/> */}
    </>
  );
};
export default Salesman;
