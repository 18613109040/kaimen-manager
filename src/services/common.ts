import { request } from '@umijs/max';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.BaseResponse;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
type QueryMenuListParmas = {
  account: string;
};
export type MenuType = {
  icon: string;
  index: string;
  title: string;
  subs?: MenuType[];
};
/** 获取菜单 */
export async function queryMenuListService(body: QueryMenuListParmas) {
  return request<API.BaseResponse<MenuType[]>>('/sfw-managerApi/menu/menuListByUser', {
    method: 'POST',
    data: body,
  });
}
