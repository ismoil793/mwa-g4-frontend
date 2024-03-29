import { IOffer } from './offer.model';

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
  pictures: { fileName: string }[];
  location: [string, string];
  offers: IOffer[];
  createdAt: string;
  status: string;
}

export interface IPurchased {
  _id: string;
  title: string;
  offers: IOffer[];
}
