import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  authService = inject(AuthService);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    stayLoggedIn: new FormControl(false)
  });

  ngOnInit(): void {}

  login() {
    this.authService.login(this.loginForm.value.email as string, this.loginForm.value.password as string, this.loginForm.value.stayLoggedIn as boolean).subscribe({
      next: () => {
        this.router.navigateByUrl('/home')
      },
      error: error => console.log(error)
    })
  }
}
