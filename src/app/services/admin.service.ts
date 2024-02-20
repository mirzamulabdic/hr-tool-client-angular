import { UserParams } from './../models/userParams';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';
import { Manager } from '../models/manager.model';
import { EmployeesWithRoles } from '../models/employeesWithRoles.model';
import { LeaveRequest, ReviewLeaveRequest } from '../models/leaveRequest.model';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrlManagerController = environment.apiUrl + 'manager'
  baseUrlLeaveRequestController = environment.apiUrl + 'leaveRequest'
  http = inject(HttpClient);

  getUsersWithRoles() {
    return this.http.get<EmployeesWithRoles[]>(this.baseUrlManagerController + '/users-with-roles');
  }

  getListOfManagers() {
    return this.http.get<Manager[]>(this.baseUrlManagerController + '/list-of-managers');
  }


  //Leave Requests
  getLeaveRequestsForMyEmployees(userParams: UserParams) {

    let params = getPaginationHeaders(userParams.pageNumber, userParams.pageSize);

    params = params.append('leaveStatus', userParams.leaveStatus);

    return getPaginatedResult<LeaveRequest[]>(this.baseUrlLeaveRequestController+ '/all-leaves-from-employees', params, this.http);
  }

  reviewLeaveRequest(reviewLeaveRequest: ReviewLeaveRequest) {
    return this.http.put(this.baseUrlLeaveRequestController + '/review-leave-request', reviewLeaveRequest);
  }
}
