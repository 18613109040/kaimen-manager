import { request } from '@umijs/max';
export enum AuthStatus {
    /** 未实名认证 */
    CERTAIN = 0,
    ALREADY = 2,
}
export const AuthStatusText = {
    [AuthStatus.CERTAIN]: "未实名",
    [AuthStatus.ALREADY]: "已实名",
}
export type SalesmanData = {
  address: string;
  authStatus: AuthStatus;
  date: string;
  headIndex: string;
  level: number;
  merchName: string;
  merchno: string;
  mobile: string;
  accountno?: string;
  bindMobile?: string;
  ci1?: string;
  identityCard?: string;
  ii1?: string;
  ii2?: string;
  ii3?: string;

};
export async function querySalesmanListService(body: API.PageSortQueryParams & { authStaus: string; keyword: string}) {
  return request<API.BasePageResponse<SalesmanData>>('/sfw-managerApi/merch/pageList', {
    method: 'POST',
    data: body,
  });
}

export async function querySalesmanDetailService(body:{ merchno: string }) {
    return request<API.BaseResponse<SalesmanData>>('/sfw-managerApi/merch/detail', {
      method: 'POST',
      data: body,
    });
  }
