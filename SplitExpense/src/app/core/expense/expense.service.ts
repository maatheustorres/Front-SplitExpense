import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from 'src/app/models/response/expense';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  createHttpOptions() {
    const token = localStorage.getItem('token');
    const httpOptions: Object = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }),
      responseType: 'json'
    }

    return httpOptions;
  }

  getExpensesByGroupId(groupId: string) {
    return this.http.get<Expense[]>(`${this.baseUrl}/expense/${groupId}`, this.createHttpOptions());
  }
}
