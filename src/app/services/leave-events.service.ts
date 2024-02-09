import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LeaveRequest } from '../models/leaveRequest.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveEventsService {

  baseUrl = environment.apiUrl + 'leaveEvents';

  private http = inject(HttpClient);

  getEmplyoeesOnLeaveToday() {
    return this.http.get<LeaveRequest[]>(this.baseUrl + '/employees-on-leave-today');
  }
}
