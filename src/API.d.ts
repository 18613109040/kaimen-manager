declare namespace API {
  export type BaseResponse<T = any> = {
    code: string;
    message: string;
    data: T;
  };

  export type BaseListResponse<T = any> = {
    code: string;
    msg: string;
    data: {
      count?: number;
      from?: string;
      size?: string;
      records: T;
    };
  };
  export type BasePageResponse<T = any> = {
    code: string;
    msg: string;
    data: {
      count?: number;
      from?: string;
      size?: string;
      current?: number;
      total?: number;
      records: T;
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
    pageNum: number;
    pageSize: number;
    order?: number[];
    sort?: string[];
  }
}
