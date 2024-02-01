import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NewEmployee } from '../../../models/newEmployee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.scss'
})
export class NewEmployeeComponent implements OnInit {

  managers = ['Manager 1', 'Manager 2', 'Manager 3']

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
  constructor() {}

  ngOnInit(): void {

  }

  onSubmit() {

    const newEmployee: NewEmployee = {
      firstName: String(this.newEmployeeForm.value.firstName),
      lastName: String(this.newEmployeeForm.value.lastName),
      gender: String(this.newEmployeeForm.value.lastName),
      birthDate: new Date(String(this.newEmployeeForm.value.birthDate)),
      email: String(this.newEmployeeForm.value.email),
      city: String(this.newEmployeeForm.value.city),
      street: String(this.newEmployeeForm.value.street),
      phoneNumber: String(this.newEmployeeForm.value.phoneNumber),
      manager: String(this.newEmployeeForm.value.manager),
      joinedDate: new Date(String(this.newEmployeeForm.value.joinedDate)),
    }

    this.employeeService.addNewEmployee(newEmployee).subscribe(res=>{
      this.newEmployeeForm.reset();
    })
  }

}
