import { request } from '@umijs/max';
export type PageGoodsData = {
  createDt: string;
  id: number;
  image: string;
  manufacturer: string;
  modelNumber: string;
  name: string;
  price: number;
  salesVolume: number;
  stock: number;
};
export async function queryMachinesListService(body: API.PageSortQueryParams) {
  return request<API.BasePageResponse<PageGoodsData>>('/sfw-managerApi/machinesManage/pageList', {
    method: 'POST',
    data: body,
  });
}

export async function deleteGoodsService(body: Record<string, string>) {
  return request<API.BaseResponse>('/sfw-managerApi/machinesManage/deleteGoods', {
    method: 'POST',
    data: body,
  });
}
export type SaveGoodParams = {
  content: string;
  id: string;
  imgUrl: string;
  manufacturer: string;
  modelNumber: string;
  name: string;
  price: number;
  showImg: string;
  stock: number;
};
export async function saveGoodService(body: SaveGoodParams) {
  return request<API.BaseResponse>('/sfw-managerApi/machinesManage/saveGoods', {
    method: 'POST',
    data: body,
  });
}
