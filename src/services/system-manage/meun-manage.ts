import { request } from '@umijs/max';
export type MenuData = {
  label: string;
  id: number;
  icon: string;
  children: MenuData[];
};
// export async function queryMenuListService() {
//   return request<API.BaseResponse<MenuData[]>>('/sfw-managerApi/menu/firstMenu', {
//     method: 'POST',
//     data: {},
//   });
// }
export async function queryMenuListService() {
  return request<API.BaseResponse<MenuData[]>>('/sfw-managerApi/menu/treeMenu', {
    method: 'POST',
    data: {},
  });
}
