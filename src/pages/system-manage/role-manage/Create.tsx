import { RESPONSE_SUCCESS_CODE } from '@/constant';
import {
  PageGoodsData,
  SaveGoodParams,
  saveGoodService,
} from '@/services/machine-tool-manage/inventory';
import { AddUserData, addUserService } from '@/services/system-manage/people-manage';
import { createRoleService, RoleData } from '@/services/system-manage/role-manage';
import {
  ModalForm,
  ProFormDigit,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Divider, Form, message } from 'antd';
import React, { useEffect } from 'react';

type CreateProps = {
  open: boolean;
  onFinish: () => void;
  onCancel: () => void;
};
const Create = (props: CreateProps) => {
  const [form] = Form.useForm<RoleData>();
  // useEffect(() => {
  //   if (props?.values?.id) {
  //     form?.setFieldsValue(props?.values);
     
  //   }
  // }, [props?.values?.id]);
  return (
    <ModalForm<RoleData>
      title="新增角色"
      open={props?.open}
      form={form}
      width={500}
      labelCol={
        {
          span: 6
        }
      }
      layout="horizontal"
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: () => props?.onCancel!(),
      }}
  
      onFinish={async (values) => {
        const res = await createRoleService(values);
        if (res?.code === RESPONSE_SUCCESS_CODE) {
          message.success('提交成功');
          props?.onFinish!();
        }else {
          message.error(res?.message)
        }

        return true;
      }}
    >
      <Divider/>
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入角色名',
          },
        ]}
        name="name"
        label="角色名"
        placeholder="请输入角色名"
      />
      <ProFormSelect
        name="use"
        label="状态"
        valueEnum={{
          "1": "启用",
          "0": "停用"
        }}
        initialValue="1"
        width={100}
        placeholder="是否启用"
        rules={[{ required: true, message: '请选择状态' }]}
      />
    </ModalForm>
  );
};
export default Create;
