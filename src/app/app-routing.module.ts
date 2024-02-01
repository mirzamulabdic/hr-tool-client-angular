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
import { EmployeeComponent } from './components/employee/employee.component';
import { NewEmployeeComponent } from './components/employee/new-employee/new-employee.component';
import { EmployeeDetailComponent } from './components/employee/employee-detail/employee-detail.component';
import { EmployeeMyProfileComponent } from './components/employee/employee-my-profile/employee-my-profile.component';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path:'', redirectTo: '/dashboard', pathMatch:'full'},
      {
        path: 'dashboard',
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
      {
        path: 'employees',
        component: EmployeeComponent,
        children: [
          {
            path: 'employees:id',
            component: EmployeeDetailComponent, //employee detail
          },
          {
            path: 'my-profile',
            component: EmployeeMyProfileComponent, //employee detail
          },
          {
            path: 'new-employee',
            component: NewEmployeeComponent,
          },
          {
            path: 'manage-leave',
            component: NewLeaveRequestComponent,
          },
          {
            path: 'list',
            component: NewLeaveRequestComponent,
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
