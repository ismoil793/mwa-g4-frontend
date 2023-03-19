export interface IOffer {
  _id: string;
  userId: string;
  fullname: string;
  status: string; //approved, reject, none
  comment: string;
}

export interface IOfferRes {
  _id: string;
  title: string;
  color: string;
  vin: number;
  type: string;
  offers: IOffer[];
}

export interface IUpdateRes {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: string;
  upsertedCount: number;
  matchedCount: number;
}
