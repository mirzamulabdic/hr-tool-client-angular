import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  authService =  inject(AuthService);

  ngOnInit(): void {
    this.authService.autoAuthUser();
  }


}
