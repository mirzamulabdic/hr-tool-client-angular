import { LeaveBalance } from './../models/leaveBalance.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { map, of } from 'rxjs';

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
    )
  }

  setLeaveBalance(newLeaveBalance: LeaveBalance) {
    this.leaveBalance = newLeaveBalance;
  }
}
