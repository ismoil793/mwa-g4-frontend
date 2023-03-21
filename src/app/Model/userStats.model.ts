export interface IuserStats {
  _id: string;
  total_sales: number;
  count: number;
}

export interface IuserStatsRes {
  success: boolean;
  data: IuserStats[];
}
