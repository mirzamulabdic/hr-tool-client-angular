import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  user: User | null = null;
  authService = inject(AuthService);

  constructor() {
    this.authService.currentUser$.pipe(take(1)).subscribe(userRes=>{
      this.user = userRes;
    })
  }

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
  }
}
