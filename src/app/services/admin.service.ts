import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { Employee } from '../models/employee.model';
import { Manager } from '../models/manager.model';
import { EmployeesWithRoles } from '../models/employeesWithRoles.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrlManagerController = environment.apiUrl + 'manager'
  http = inject(HttpClient);

  getUsersWithRoles() {
    return this.http.get<EmployeesWithRoles[]>(this.baseUrlManagerController + '/users-with-roles');
  }

  getListOfManagers() {
    return this.http.get<Manager[]>(this.baseUrlManagerController + '/list-of-managers');
  }
}
