export interface IUser {
  _id: string,
  email: string,
  fullname: string,
  jwt?: string
}

export interface ILoginRes {
  success: boolean;
  data:
  {
    _id: string;
      fullname: string;
      email: string;
      jwt: string;
    };
}
