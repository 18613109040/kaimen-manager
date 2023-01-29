declare namespace API {
  export type BaseResponse<T = any> = {
    code: string;
    message: string;
    data?: T;
    result?: T;
    msg?: string;
  };

  export type BaseListResponse<T = any> = {
    code: string;
    message: string;
    data?: {
      count?: number;
      from?: string;
      size?: string;
      records: T;
    };
    rows?: T[]

  };
  export type BasePageResponse<T = any> = {
    code: string;
    message: string;
    result: {
      countNum: number;
      list: T[];
    };
  };
  export type IBaseList<T = any> = {
    total: number;
    records: T;
    customers: T;
  };
  export type BaseObject<T = any> = {
    total: number;
    stat: number;
    data: T;
  };

  export interface PageSortQueryParams {
    currentPage: number;
    pageSize: number;
    order?: number[];
    sort?: string[];
  }
  export interface CurrentUser {
    name: string
  }
}
