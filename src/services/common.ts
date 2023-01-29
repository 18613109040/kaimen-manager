import { request } from '@umijs/max';
export type UserData = {
  account: string;
  createDt: string;
  id: string;
  name: string;
  pwd: string;
  token: string;
}
/** 获取当前的用户 GET /api/currentUser */
export async function queryCurrentUserService() {
  return request<API.BaseResponse<UserData>>(`/sfw-managerApi/admin/getUserInfoByToken`, {
    method: 'GET',
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
