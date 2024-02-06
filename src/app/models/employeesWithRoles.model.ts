export interface EmployeesWithRoles {
  employeeId: number;
  firstName: string;
  lastName: string;
  email: string;
  joinedDate: Date;
  managedByManagerId: number;
  roles: string[];
}
