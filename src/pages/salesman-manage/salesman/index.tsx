import { RESPONSE_SUCCESS_CODE } from '@/constant';
import { queryVipLevelListService } from '@/services/platform-setting/vip-level';
import {
  AuthStatus,
  AuthStatusText,
  queryKLevelService,
  querySalesmanListService,
  SalesmanData,
  setKLevelService,
} from '@/services/salesman-manage/salesman';
import {
  ActionType,
  ModalForm,
  ProColumns,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import { useRef, useState } from 'react';
import Detail from './Detail';
const Salesman: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [open, setOpen] = useState(false);
  const [kform] = Form.useForm<any>();
  const [vform] = Form.useForm<any>();
  const [selectData, setSelectData] = useState<SalesmanData>();
  const handleSearchDetail = (data: SalesmanData) => {
    setSelectData(data);
    setOpen(true);
  };
  const handleKLevelChange = (data: SalesmanData) => {
    setSelectData(data);
    kform?.setFieldsValue(data);
  };
  const handleVLevelChange = (data: SalesmanData) => {
    setSelectData(data);
    vform?.setFieldsValue(data);
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
      title: '合伙人等级',
      dataIndex: 'kLevel',
      key: 'kLevel',
      search: false,
    },
    {
      title: 'VIP等级',
      dataIndex: 'pVipLevel',
      key: 'pVipLevel',
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
        <ModalForm<any>
          key="1"
          width={400}
          title="合伙人等级调整"
          trigger={
            <Button type="link" onClick={() => handleKLevelChange(record)}>
              合伙人等级调整
            </Button>
          }
          form={kform}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          onFinish={async (values) => {
            console.log(values);

            const res = await setKLevelService({
              id: selectData?.id as string,
              kLevel: values?.kLevel,
            });
            if (res?.code === RESPONSE_SUCCESS_CODE) {
              message.success('更新成功');
              actionRef?.current?.reload();
              return true;
            }
            return false;
          }}
        >
          <ProFormText name="merchName" label="名称" disabled />
          <ProFormSelect
            name="kLevel"
            label="合伙人等级"
            request={async () => {
              const res = await queryKLevelService(selectData?.id as string);
              if (res?.code === RESPONSE_SUCCESS_CODE) {
                return res?.data!.map((item) => {
                  return {
                    value: item,
                    label: item,
                  };
                });
              }
              return [];
            }}
            rules={[{ required: true, message: '请选择' }]}
          />
        </ModalForm>,
        <ModalForm<any>
          key="1"
          width={400}
          title="VIP等级调整"
          trigger={
            <Button type="link" onClick={() => handleVLevelChange(record)}>
              VIP等级调整
            </Button>
          }
          form={vform}
          autoFocusFirstInput
          modalProps={{
            destroyOnClose: true,
            onCancel: () => console.log('run'),
          }}
          onFinish={async (values) => {
            console.log(values);
            const res = await setKLevelService({
              id: selectData?.id as string,
              kLevel: values?.pVipLevel,
            });
            if (res?.code === RESPONSE_SUCCESS_CODE) {
              message.success('更新成功');
              actionRef?.current?.reload();
              return true;
            }
            return false;
          }}
        >
          <ProFormText name="merchName" label="名称" disabled />
          <ProFormSelect
            name="pVipLevel"
            label="合伙人等级"
            request={async () => {
              const res = await queryVipLevelListService();
              if (res?.code === RESPONSE_SUCCESS_CODE) {
                return res?.rows!.map((item) => {
                  return {
                    value: item.levelName,
                    label: item.levelName,
                  };
                });
              }
              return [];
            }}
            rules={[{ required: true, message: '请选择' }]}
          />
        </ModalForm>,
        <Button key="link" type="link" onClick={() => handleSearchDetail(record)}>
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
      <Detail open={open} id={selectData?.merchno as string} onCancel={() => setOpen(false)} />

      {/* <Create values={editData} open={open} onFinish={handleCreateFinish} onCancel={()=> { setOpen(false); setEditData(undefined)}}/> */}
    </>
  );
};
export default Salesman;
