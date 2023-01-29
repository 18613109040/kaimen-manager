import { request } from '@umijs/max';
export type RoleData = {
  createDt?: string;
  id?: number;
  name: string;
  use: boolean;
};
export async function queryRoleListService(
  body: API.PageSortQueryParams & { searchStatus?: string; keyword?: string },
) {
  return request<API.BasePageResponse<RoleData>>('/sfw-managerApi/manager/pageAdminRole', {
    method: 'POST',
    data: body,
  });
}
export async function createRoleService(
    body:  RoleData
  ) {
    return request<API.BaseResponse>('/sfw-managerApi/manager/saveAdminRole', {
      method: 'POST',
      data: body,
    });
  }

