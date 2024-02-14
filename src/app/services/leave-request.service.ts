import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LeaveRequest, ReviewLeaveRequest } from '../models/leaveRequest.model';
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

  getMyLeaveRequests() {
    return this.http.get<LeaveRequest[]>(this.baseUrl);
  }


  cancelLeaveREquest(leaveRequestId: number) {
    return this.http.delete(this.baseUrl + '/cancel/' + leaveRequestId);
  }




  //MANAGER

  getLeaveRequestsForMyEmployees() {
    return this.http.get<LeaveRequest[]>(this.baseUrl + '/all-leaves-from-employees');
  }

  reviewLeaveRequest(reviewLeaveRequest: ReviewLeaveRequest) {
    return this.http.put(this.baseUrl + '/review-leave-request', reviewLeaveRequest);
  }
}
