import { Component, inject } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-profile-edit-modal',
  templateUrl: './profile-edit-modal.component.html',
  styleUrl: './profile-edit-modal.component.scss'
})
export class ProfileEditModalComponent {

  email = '';
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  bsModalRef = inject(BsModalRef);
  private authService = inject(AuthService);
  toastr = inject(ToastrService);

  passwordChange() {

    if (this.newPassword != this.confirmPassword) {
      this.toastr.warning("Passwords do not match!");
      return;
    }
    if (this.oldPassword && this.newPassword && this.email) {
      this.authService.changePassword(this.email, this.oldPassword, this.newPassword).subscribe(
        {

          error: error=> {
            if(error.status!=200) {
            if (error.error == 'Incorrect old password' && error.status == 401) {
                this.toastr.error("Incorrect old password!");
            }
            if (error.error) {
              error.error.forEach((el: any) => {
              this.toastr.warning(el.description + "!");
              });
            }
            }
          },
          complete: () => this.toastr.success('Password changed!'),
        }
      )
    }
  }
}
