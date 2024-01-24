import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LeaveRequest } from '../models/leaveRequest.model';
import { User } from '../models/user.model';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  baseUrl = environment.apiUrl + 'leaverequest';

  private http = inject(HttpClient);

  createLeaveRequest(newLeave: LeaveRequest) {
    return this.http.post<Employee>(this.baseUrl + '/new-request', newLeave);
  }

  getLeaveRequests() {
    return this.http.get<LeaveRequest[]>(this.baseUrl);
  }

  cancelLeaveREquest(leaveRequestId: number) {
    return this.http.delete(this.baseUrl + '/cancel/' + leaveRequestId);
  }
}
