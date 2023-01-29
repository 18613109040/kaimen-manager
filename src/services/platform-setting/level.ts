import { request } from '@umijs/max';

export async function queryLevelListService() {
  return request<API.BaseListResponse<{des: string, name: string}>>('/sfw-managerApi/sfw/partner/level/list', {
    method: 'GET'
  });
}

export async function updatePartnerLevelService(body: {id: string; name: string, des: string}) {
    return request<API.BaseResponse>('/sfw-managerApi/sfw/partner/level', {
      method: 'PUT',
        data: body
    });
  }