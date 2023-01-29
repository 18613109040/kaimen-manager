import { RESPONSE_SUCCESS_CODE } from '@/constant';
import {
  AuthStatus,
  AuthStatusText,
  querySalesmanDetailService,
  SalesmanData,
} from '@/services/salesman-manage/salesman';
import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer, Image } from 'antd';
import React from 'react';

type DetailProps = {
  open: boolean;
  id: string;
  onCancel: () => void;
};
const Detail = (props: DetailProps) => {
  return (
    <Drawer destroyOnClose open={props?.open} width={800} onClose={props?.onCancel}>
      <ProDescriptions
        title="业务员基本信息"
        request={async () => {
          const res = await querySalesmanDetailService({
            merchno: props?.id,
          });
          if (res?.code === RESPONSE_SUCCESS_CODE) {
            return {
              success: true,
              data: res?.result,
            };
          }
          return {
            success: false,
          };
        }}
        columns={[
          {
            title: '业务员号',
            key: 'merchno',
            dataIndex: 'merchno',
          },
          {
            title: '业务员姓名',
            key: 'merchName',
            dataIndex: 'merchName',
          },
          {
            title: '用户等级',
            key: 'level',
            dataIndex: 'level',
          },
          {
            title: '手机号',
            key: 'mobile',
            dataIndex: 'mobile',
          },
          {
            title: '身份证号',
            key: 'identityCard',
            dataIndex: 'identityCard',
          },
          {
            title: '结算卡号',
            key: 'accountno',
            dataIndex: 'accountno',
          },
          {
            title: '开户行',
            key: 'bankName',
            dataIndex: 'bankName',
          },
          {
            title: '预留手机',
            key: 'bindMobile',
            dataIndex: 'bindMobile',
          },
          {
            title: '实名状态',
            key: 'authStatus',
            dataIndex: 'authStatus',
            render: (status: any) => <span>{AuthStatusText[status as AuthStatus]}</span>,
          },
          {
            title: '地址',
            key: 'address',
            dataIndex: 'address',
          },
          {
            title: '加入时间',
            key: 'date',
            dataIndex: 'date',
          },
          {
            title: '身份证正面',
            key: 'ii2',
            dataIndex: 'ii2',
            render: (img: any) => <Image src={img} width={100} height={80} />,
          },
          {
            title: '身份证反面',
            key: 'ii3',
            dataIndex: 'ii3',
            render: (img: any) => <Image src={img} width={100} height={80} />,
          },
          {
            title: '手持身份证照',
            key: 'ii1',
            dataIndex: 'ii1',
            render: (img: any) => <Image src={img} width={100} height={80} />,
          },
          {
            title: '结算卡正面照',
            key: 'ci1',
            dataIndex: 'ci1',
            render: (img: any) => <Image src={img} width={100} height={80} />,
          },
        ]}
      ></ProDescriptions>
    </Drawer>
  );
};
export default Detail;
