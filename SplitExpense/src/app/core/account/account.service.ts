import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { User } from 'src/app/models/response/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.baseUrl;
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();
  httpOptions: Object = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }),
    responseType: 'json'
  }

  constructor(
    private http: HttpClient,
    private router: Router) { }

  register(value: any) {
    return this.http.post<User>(`${this.baseUrl}/authentication/register`, value, this.httpOptions).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('userId', user.id);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    );
  }

  login(value: any) {
    return this.http.post<User>(`${this.baseUrl}/authentication/login`, value).pipe(
      map((user: User) => {
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.id);
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSource.next(user)
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate(['']);
  }

  loadCurrentUser(token: string) {
    if(token === null) {
      this.currentUserSource.next(null);
      return;
    }

    let localUser = localStorage.getItem('user') as string;
    let user = JSON.parse(localUser);

    localStorage.setItem('token', token);
    localStorage.setItem('userId', user.id);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }
}
