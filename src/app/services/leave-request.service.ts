import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { LeaveRequest } from '../models/leaveRequest.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveRequestService {

  baseUrl = environment.apiUrl + 'leaverequest';

  private http = inject(HttpClient);

  createLeaveRequest(newLeave: LeaveRequest) {
    return this.http.post(this.baseUrl + '/new-request', newLeave);
  }
}
