import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LeaveBalance } from '../models/leaveBalance.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl + 'employee';

  private http = inject(HttpClient);

  getLeaveBalance() {
    return this.http.get<LeaveBalance>(this.baseUrl + '/leave-balance');
  }
}
