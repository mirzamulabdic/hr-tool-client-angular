import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { LeaveBalanceComponent } from './components/leave-requests/leave-balance/leave-balance.component';
import { NewLeaveRequestComponent } from './components/leave-requests/new-leave-request/new-leave-request.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { LeaveRequestsComponent } from './components/leave-requests/leave-requests.component';
import {MatSelectModule} from '@angular/material/select';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    NotFoundComponent,
    LeaveBalanceComponent,
    NewLeaveRequestComponent,
    LeaveRequestsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptors([authInterceptor ])),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
