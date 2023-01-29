import { request } from '@umijs/max';
export type VipLevelData = {
  createDt: string;
  id: string;
  levelName: string;
  monthAmountPurchased: number;
  monthGmv: number;
  rate: number;
};
export async function queryVipLevelListService() {
  return request<API.BaseListResponse<VipLevelData>>('/sfw-managerApi/sfw/level/config/list', {
    method: 'GET'
  });
}