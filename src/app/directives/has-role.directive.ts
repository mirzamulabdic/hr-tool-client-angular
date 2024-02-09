import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {

  @Input() appHasRole: string[] = [];
  user: User = {} as User;

  viewContainerRef = inject(ViewContainerRef);
  templateRef = inject(TemplateRef<any>);
  authService = inject(AuthService);

  constructor() {
    this.authService.currentUser$.pipe(take(1)).subscribe(user=> {
      if (user) {
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
    if(this.user.roles.some(r=> this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
