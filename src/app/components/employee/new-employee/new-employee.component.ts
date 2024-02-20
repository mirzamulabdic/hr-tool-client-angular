import { AdminService } from './../../../services/admin.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GenderEnum, NewEmployee } from '../../../models/newEmployee.model';
import { EmployeeService } from '../../../services/employee.service';
import { Manager } from '../../../models/manager.model';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent implements OnInit {

  managers: Manager[] = [];

  adminManager: Manager = {
    id: 1,
    firstName: 'Admin',
    lastName: '',
    email: ''
  }

  newEmployeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('',[ Validators.required]),
    gender: new FormControl('', [ Validators.required]),
    birthDate: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
    manager: new FormControl('', Validators.required),
    joinedDate: new FormControl('', Validators.required),
  });

  employeeService = inject(EmployeeService);
  adminService = inject(AdminService);

  ngOnInit(): void {
    this.loadManagers();
  }

  onSubmit() {

    const newEmployee: NewEmployee = {
      firstName: this.capitalizeFirstWord(String(this.newEmployeeForm.value.firstName)),
      lastName: this.capitalizeFirstWord(String(this.newEmployeeForm.value.lastName)),
      gender: String(this.newEmployeeForm.value.gender) == 'Male' ? GenderEnum.Male : GenderEnum.Female,
      birthDate: new Date(String(this.newEmployeeForm.value.birthDate)),
      email: String(this.newEmployeeForm.value.email),
      city: this.capitalizeFirstWord(String(this.newEmployeeForm.value.city)),
      street: String(this.newEmployeeForm.value.street),
      phoneNumber: String(this.newEmployeeForm.value.phoneNumber),
      managerId: String(this.newEmployeeForm.value.manager),
      joinedDate: new Date(String(this.newEmployeeForm.value.joinedDate)),
    }
    this.employeeService.addNewEmployee(newEmployee).subscribe(res=>{
      this.newEmployeeForm.reset();
    });
  }

  capitalizeFirstWord(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  loadManagers() {
    this.adminService.getListOfManagers().subscribe(res=> {
      this.managers = res;
      if (res.length == 0)  this.managers.push(this.adminManager);
    })
  }
}
