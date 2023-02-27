import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { User } from 'src/app/models/user';
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

  isLoggedIn() {
    return localStorage.getItem('user') != null;
  }
}
