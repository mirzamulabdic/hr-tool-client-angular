import { LeaveBalance } from './../models/leaveBalance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, of } from 'rxjs';
import { NewEmployee } from '../models/newEmployee.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  {

  baseUrl = environment.apiUrl + 'employee';

  leaveBalance: LeaveBalance | undefined;

  private http = inject(HttpClient);


  getLeaveBalance() {

    // if (this.leaveBalance) {
    //   return of(this.leaveBalance);
    // }

    return this.http.get<LeaveBalance>(this.baseUrl + '/leave-balance').pipe(
      map(res=> {
        this.leaveBalance = res;
        return res;
      })
    );
  }

  getEmployeeInfo() {
    return this.http.get<Employee>(this.baseUrl + '/my-info');
  }

  addNewEmployee(newEmployee: NewEmployee) {
    return this.http.post(this.baseUrl + '/new-employee', newEmployee);
  }

  setLeaveBalance(newLeaveBalance: LeaveBalance) {
    this.leaveBalance = newLeaveBalance;
  }
}
