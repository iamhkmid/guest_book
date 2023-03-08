import { StringLiteral } from "typescript";

export type TForm = {
  name: string;
  phoneNumber: string;
  address : string;
  description: string;
}

export type TFormLogin = {
  username: string;
  password: string;
}

export type TGuest = {
  id: string;
  name: string;
  phoneNumber : string;
  address: string;
  description: string;
  createdAt: string;
}

export type TSummary = {
  summary: {
    numberOfVisits: {
      day: number;
      week: number;
      month: number;
  }
 
  }
}

export type TMutationAddGuest = {
  addGuest: {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    description:string;
  }
}

export type TMutationUpdateGuest = {
  updateGuest: {
    id: string;
    name: string;
    phoneNumber: string;
    address: string;
    description:string;
  }
}

export type TMutationDeleteGuest = {
  deleteGuest: {
    id: string;
    name: string;
  }
}