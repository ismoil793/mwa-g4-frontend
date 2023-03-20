import { IOffer } from "./offer.model";

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
  offers: IOffer[],
  createdAt: string
}

export interface IPurchased {
  _id: string;
  title: string;
  offers: IOffer[];
}
