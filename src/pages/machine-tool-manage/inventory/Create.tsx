import { RESPONSE_SUCCESS_CODE } from '@/constant';
import {
  PageGoodsData,
  SaveGoodParams,
  saveGoodService,
} from '@/services/machine-tool-manage/inventory';
import {
  ModalForm,
  ProFormDigit,
  ProFormMoney,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { RcFile } from 'antd/es/upload';
import React, { useEffect } from 'react';

type CreateProps = {
  open: boolean;
  values: PageGoodsData | undefined;
  onFinish: () => void;
  onCancel: () => void;
};
const Create = (props: CreateProps) => {
  const [form] = Form.useForm<SaveGoodParams>();
  useEffect(() => {
    if (props?.values?.id) {
      form?.setFieldsValue({
        ...props?.values,
      });
      form?.setFieldsValue({
        // @ts-ignore
        imgUrl: [{
            uid: '-1',
            status: 'done',
            url: props?.values?.image
        }]
      })
     
    }
  }, [props?.values?.id]);
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('图片格式为JPG/PNG');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2M');
    }
    return isJpgOrPng && isLt2M;
  };
  return (
    <ModalForm<SaveGoodParams>
      title="新建机具"
      open={props?.open}
      form={form}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        maskClosable: false,
        onCancel: () => props?.onCancel!(),
      }}
      onFinish={async (values) => {
        // @ts-ignore
        const res = await saveGoodService({
          ...values,
          id: props?.values?.id.toString() || "",
          // @ts-ignore
          imgUrl: values?.imgUrl?.response ? values?.imgUrl?.response?.result?.url:values?.imgUrl[0].url ,
        });
        if (res?.code === RESPONSE_SUCCESS_CODE) {
          message.success('提交成功');
          props?.onFinish!();
        }

        return true;
      }}
    >
      <ProFormUploadButton
        name="imgUrl"
        label="图片链接:"
        max={1}
        fieldProps={{
          name: 'file',
          listType: 'picture-card',
          beforeUpload: beforeUpload
        }}
        rules={[
          {
            required: true,
            message: '请上传图片',
          },
        ]}
        action="/sfw-managerApi/image/uploadFile"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入商品名',
          },
        ]}
        name="name"
        label="商品名"
        placeholder="请输入商品名"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入机具型号',
          },
        ]}
        name="modelNumber"
        label="机具型号"
        placeholder="请输入机具型号"
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: '请输入厂家',
          },
        ]}
        name="manufacturer"
        label="厂家"
        placeholder="请输入厂家"
      />
      <ProFormMoney
        rules={[
          {
            required: true,
            message: '请输入价格',
          },
        ]}
        name="price"
        min={0}
        label="价格"
        placeholder="请输入价格"
      />
      <ProFormDigit
        rules={[
          {
            required: true,
            message: '请输入库存',
          },
        ]}
        name="stock"
        label="库存"
        placeholder="请输入库存"
      />
      <ProFormTextArea
        rules={[
          {
            required: true,
            message: '请输入描述',
          },
        ]}
        name="content"
        label="描述"
        placeholder="请输入描述"
      />
    </ModalForm>
  );
};
export default Create;
