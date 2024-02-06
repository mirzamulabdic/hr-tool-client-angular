import { Component, OnInit, inject } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { AdminService } from '../../../services/admin.service';
import { EmployeesWithRoles } from '../../../models/employeesWithRoles.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit {

  employees: EmployeesWithRoles[] = [];
  employeeService = inject(EmployeeService);
  adminService = inject(AdminService);

  ngOnInit(): void {
    this.getListOfAllEmployees();
  }

  getListOfAllEmployees() {
    this.adminService.getUsersWithRoles().subscribe(emp=>{
      this.employees = emp;
    })
  }

}
