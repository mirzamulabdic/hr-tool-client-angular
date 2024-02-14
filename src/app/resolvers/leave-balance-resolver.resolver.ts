import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { LeaveBalance } from '../models/leaveBalance.model';

export const leaveBalanceResolverResolver: ResolveFn<LeaveBalance> = (route, state) => {

  const employeeService = inject(EmployeeService);

  return employeeService.getLeaveBalance();
};
