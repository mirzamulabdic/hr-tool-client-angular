import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LeaveRequest, ReviewLeaveRequest } from '../models/leaveRequest.model';
import { User } from '../models/user.model';
import { Employee } from '../models/employee.model';
import { PaginatedResult } from '../models/pagination';
import { map, take } from 'rxjs';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';
import { UserParams } from '../models/userParams';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  baseUrl = environment.apiUrl + 'leaveRequest';
  userParams: UserParams | undefined;

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  constructor() {
    this.authService.currentUser$.pipe(take(1)).subscribe(user => {
      if (user) {
        this.userParams = new UserParams();
      }
    })
  }

  setUserParams(userParams: UserParams) {
    this.userParams = userParams;
  }

  getUserParams() {
    return this.userParams;
  }

  createLeaveRequest(newLeave: LeaveRequest) {
    return this.http.post<Employee>(this.baseUrl + '/new-request', newLeave);
  }

  getMyLeaveRequests(userParams: UserParams) {

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('leaveStatus', userParams.leaveStatus);

    return getPaginatedResult<LeaveRequest[]>(this.baseUrl+ '/my-leave-requests', params, this.http);
  }

  getAllMyLeaveRequests() {
    return this.http.get<LeaveRequest[]>(this.baseUrl+ '/all-my-leave-requests');
  }


  cancelLeaveREquest(leaveRequestId: number) {
    return this.http.delete(this.baseUrl + '/cancel/' + leaveRequestId);
  }

}
