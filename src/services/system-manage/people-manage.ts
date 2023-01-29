import { request } from '@umijs/max';
export type PeopleData = {
  account: string;
  createDt: string;
  email: string;
  id?: number;
  name: string;
  phone: string;
  use: number;
};
export type CreateUserData = {
    account: string;
    email: string;
    name: string;
    phone: string;
    use: number;
    pwd?: string;
    id?: number;
}
  
export async function queryAdminUserListService(
  body: API.PageSortQueryParams & { searchStatus: string; keyword: string },
) {
  return request<API.BasePageResponse<PeopleData>>('/sfw-managerApi/manager/user/pageAdminUser', {
    method: 'POST',
    data: body,
  });
}

export async function createUserService(body: CreateUserData) {
    return request<API.BaseResponse<CreateUserData>>('/sfw-managerApi/manager/user', {
      method: 'POST',
      data: body
    });
  }

  export async function updateUserService(body: CreateUserData) {
    return request<API.BaseResponse<CreateUserData>>('/sfw-managerApi/manager/user', {
      method: 'PUT',
      data: body
    });
  }
export async function queryUserService(
    id: number
  ) {
    return request<API.BaseResponse<PeopleData>>(`/sfw-managerApi/manager/user/${id}`, {
      method: 'GET'
    });
  }

  export async function deleteUserService(
    id: number
  ) {
    return request<API.BaseResponse>(`/sfw-managerApi/manager/user/${id}`, {
      method: 'DELETE'
    });
  }


