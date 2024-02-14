export interface NewEmployee {
  firstName: string;
  lastName: string;
  email: string;
  gender: GenderEnum;
  city: string;
  street: string;
  birthDate: Date;
  phoneNumber: string;
  managerId: string;
  joinedDate: Date;
}

export enum GenderEnum {
  Male,
  Female
}
