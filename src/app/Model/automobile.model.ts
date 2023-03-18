export interface IAutoMobile {
  _id: string;
  title: string;
  description: string;
  owner: {
    ownerId: string;
    fullName: string;
  };
  color: string;
  interiorColor: string;
  vin: number;
  type: string;
  price: number;
  pictures: {
    primary: string;
    interior: string;
  };
  location: [string, string];
}
