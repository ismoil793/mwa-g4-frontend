export interface IUser {
  _id: string;
  email: string;
  fullname: string;
  jwt?: string;
  location?: {
    coordinates: number[];
  };
}

export interface ILoginRes {
  success: boolean;
  data: {
    _id: string;
    fullname: string;
    email: string;
    jwt: string;
    msg?: string;
  };
}
