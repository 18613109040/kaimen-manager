import { RESPONSE_SUCCESS_CODE } from '@/constant';
import {  CreateUserData, createUserService,queryUserService, updateUserService } from '@/services/system-manage/people-manage';
import {
  ModalForm,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Divider, Form, message } from 'antd';
import CryptoJS from 'crypto-js';
import React, { useEffect } from 'react';

type CreateProps = {
  open: boolean;
  id: number;
  onFinish: () => void;
  onCancel: () => void;
};
const Create = (props: CreateProps) => {
  const [form] = Form.useForm<CreateUserData>();
  const getData = async (id: number) => {
   const res = await queryUserService(id);
   if(res.code === RESPONSE_SUCCESS_CODE) {
    form?.setFieldsValue({...res?.data });
   }
  }
  useEffect(() => {
    if (props?.id) {
      getData(props?.id)
    }
  }, [props?.id]);
  return (
    <ModalForm<CreateUserData>
      title="新增管理员"
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
        if(props.id) {
          
          const res = await updateUserService({
            ...values,
            id: props.id
          });
          if (res?.code === RESPONSE_SUCCESS_CODE) {
            message.success('提交成功');
            props?.onFinish!();
          }else {
            message.error(res?.msg);
          }
        }else{
          const key = CryptoJS.enc.Utf8.parse('kjjmanager-qaz852');
          const srcs = CryptoJS.enc.Utf8.parse(values.pwd!);
          const encrypted = CryptoJS.AES.encrypt(srcs, key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          });
          const res = await createUserService({
            ...values,
            pwd: encrypted.toString()
          });
          if (res?.code === RESPONSE_SUCCESS_CODE) {
            message.success('提交成功');
            props?.onFinish!();
          }else{
            message.error(res?.msg);
          }
        }
       

        return true;
      }}
    >
      <Divider/>
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
        name="name"
        label="用户名"
        placeholder="请输入用户名"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入账户',
          },
        ]}
        name="account"
        label="账户"
        placeholder="请输入账户"
      />
      { !props.id && <ProFormText

        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
        name="pwd"
        label="密码"
        placeholder="请输入密码"
      />}
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入手机号',
          },
        ]}
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入邮箱',
          },
        ]}
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
      />
      <ProFormSelect
        name="use"
        label="状态"
        // valueEnum={{
        //   1: "启用",
        //   0: "停用"
        // }}
        request={async () => [
          { label: '启用', value: 1 },
          { label: '停用', value: 0 }
        ]}
        width={100}
        placeholder="是否启用"
        rules={[{ required: true, message: '请选择状态' }]}
      />
    </ModalForm>
  );
};
export default Create;
