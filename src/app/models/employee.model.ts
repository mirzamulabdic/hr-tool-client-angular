import { GenderEnum } from "./newEmployee.model";

export interface Employee {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: GenderEnum;
  city: string;
  street: string;
  birthDate: Date;
  phoneNumber: number;
  joinedDate: Date;
  vacationDays: number;
  vacationDaysTaken: number;
  remoteWorkDays: number;
  remoteWorkDaysTaken: number;
  sickDays: number;
  sickDaysTaken: number;
  familyDays: number;
  familyDaysTaken: number;
  leaveBalanceId: number;
}
