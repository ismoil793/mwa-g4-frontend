export interface IUser {
  email: string,
  fullname: string,
  jwt ?: string,
  isLoggedIn: boolean
}

// export interface ISignUpRes {
//   success: boolean;
//   data:
//     {
//       fullname: string;
//       email: string;
//     }
//   ;
// }

export interface ILoginRes {
  success: boolean;
  data:
    {
      fullname: string;
      email: string;
      jwt: string;
    };
}

// {
//   "sucess": true,
//   "data": {
//     "email": "zaman@miu.edu",
//     "fullname": "monir zaman",
//     "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InphbWFuQG1pdS5lZHUiLCJmdWxsbmFtZSI6Im1vbmlyIHphbWFuIiwiaWF0IjoxNjc5MTU5NTY1fQ.o6XIoauVZMwF6YAOEFjOo7sP4zL10_9AomjZTo2kQ0A"
//   }
// }
