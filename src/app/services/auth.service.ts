import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Subject, map } from 'rxjs';
import { LoginUserData } from '../models/loginUser.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl + 'auth';

  private currentUserSource = new BehaviorSubject<User | null>(null);
  private authStatusListener = new Subject<boolean>();
  currentUser$ = this.currentUserSource.asObservable();
  isUserAuthenticated: boolean = false;

  private http = inject(HttpClient);
  private router = inject(Router);

  login(email: string, password: string, stayLoggedIn: boolean) {
    const loginInfo: LoginUserData = {
      email: email,
      password: password,
    }
    if (stayLoggedIn) {
      loginInfo.stayLoggedIn = stayLoggedIn;
    }
    return this.http.post<User>(this.baseUrl+'/login', loginInfo).pipe(
      map((response: User)=>{
        const user = response;
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  getAuthStatusObservable() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isUserAuthenticated;
  }

  autoAuthUser() {
    const userString = localStorage.getItem('user')
    if(!userString) return;

    const user: User = JSON.parse(userString)
    this.setCurrentUser(user);
    this.authStatusListener.next(true);
    this.isUserAuthenticated = true;
  }

  setCurrentUser(user: User) {
    localStorage.setItem('token', JSON.stringify(user.token));
    localStorage.setItem('user', JSON.stringify(user));
    this.authStatusListener.next(true);
    this.isUserAuthenticated = true;
    this.currentUserSource.next(user);
  }

  getToken(){
    const token:any = JSON.parse(localStorage.getItem('token')as string)
    if (token){
      return token;
    } else return '';
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.authStatusListener.next(false);
    this.isUserAuthenticated = false;
    this.router.navigateByUrl('/login');
  }
}
