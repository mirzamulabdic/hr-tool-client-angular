import { Component, OnInit, inject } from '@angular/core';
import { Employee } from '../../../models/employee.model';
import { ProfileEditModalComponent } from '../../modals/profile-edit-modal/profile-edit-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-employee-my-profile',
  templateUrl: './employee-my-profile.component.html',
  styleUrl: './employee-my-profile.component.scss'
})
export class EmployeeMyProfileComponent implements OnInit {

  bsModalRef: BsModalRef<ProfileEditModalComponent> = new BsModalRef<ProfileEditModalComponent>();
  employee: Employee | undefined;
  private modalService = inject(BsModalService);
  private employeeService = inject(EmployeeService);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loadProfileInfo();
  }

  loadProfileInfo() {
    this.employeeService.getEmployeeInfo().subscribe(emp=>{
      this.employee = emp;
    })
  }

  openEditProfileModal() {

    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        email: this.employee?.email,
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
    this.bsModalRef = this.modalService.show(ProfileEditModalComponent, config);
    this.bsModalRef.onHide?.subscribe(()=> {})
  }
}
