import Footer from '@/components/Footer';
import { AUTHORIZATION_TOKEN, RESPONSE_SUCCESS_CODE } from '@/constant';
import { login, LoginParams } from '@/services/user/login';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { history, Helmet } from '@umijs/max';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import store from 'store';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  const [useLoginError, setUseLoginError] = useState(false);

  const handleSubmit = async (values: LoginParams) => {
    try {
      const key = CryptoJS.enc.Utf8.parse('kjjmanager-qaz852');
      const srcs = CryptoJS.enc.Utf8.parse(values.password!);
      const encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const res = await login({ ...values, password: encrypted.toString() });
      console.log(res);
      if (res.code === RESPONSE_SUCCESS_CODE) {
        message.success('登录成功！');
        store.set(AUTHORIZATION_TOKEN, res.token);
        const urlParams = new URL(window.location.href).searchParams;
        history.replace(urlParams.get('redirect') || '/');
        return;
      }
      // 如果失败去设置用户错误信息
      setUseLoginError(true);
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
  };

  return (
    <div className={styles['login']}>
      <Helmet>
        <title>登录页</title>
      </Helmet>
      <div className={styles['login-content']}>
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
            marginTop: '40px',
          }}
          // logo={<img alt="logo" src="/logo.png" />}
          title="凯蒙后台管理系统"
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          {useLoginError && <LoginMessage content="账户或密码错误" />}
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder="用户名: "
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder="密码: "
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
          />

          {/* <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
          </div> */}
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
