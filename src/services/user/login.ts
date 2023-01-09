import { request } from '@umijs/max';

type LoginData = {
  token: string;
};
export type LoginParams = {
  username?: string;
  password?: string;
  autoLogin?: boolean;
};
/** 登录接口 POST /sfw-managerApi/login */
export async function login(body: LoginParams) {
  return request<API.BaseResponse<string> & LoginData>('/sfw-managerApi/login', {
    method: 'POST',
    data: body,
  });
}
