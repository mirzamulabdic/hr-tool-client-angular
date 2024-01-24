import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { authGuard } from './guards/auth.guard';
import { LeaveBalanceComponent } from './components/leave-requests/leave-balance/leave-balance.component';
import { NewLeaveRequestComponent } from './components/leave-requests/new-leave-request/new-leave-request.component';
import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import { MyLeaveRequestsComponent } from './components/leave-requests/my-leave-requests/my-leave-requests.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path:'', redirectTo: '/home', pathMatch:'full'},
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'leave',
        component: LeaveRequestsComponent,
        children: [
          {
            path: 'apply',
            component: NewLeaveRequestComponent,
          },
          {
            path: 'my-leave-requests',
            component: MyLeaveRequestsComponent,
          },
      ]
      },
    ]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '**', component: NotFoundComponent, pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
