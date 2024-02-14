import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LeaveRequest } from '../models/leaveRequest.model';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaveEventsService {

  baseUrl = environment.apiUrl + 'leaveEvents';

  private http = inject(HttpClient);

  employeesOnLeaveCache: LeaveRequest[] = []

  getEmplyoeesOnLeaveToday() {
    const response = this.employeesOnLeaveCache;

    if (response.length > 0) {
      return of(response);
    }

    return this.http.get<LeaveRequest[]>(this.baseUrl + '/employees-on-leave-today').pipe(
      map(response => {

        this.employeesOnLeaveCache = response;

        return response;
      })
    );
  }
}
