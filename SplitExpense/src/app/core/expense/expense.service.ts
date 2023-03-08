import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateExpenseRequest } from 'src/app/models/request/create-expense-request';
import { splitExpenseRequest } from 'src/app/models/request/split-expense-request';
import { UpdateExpenseRequest } from 'src/app/models/request/update-expense-request';
import { CreateExpense } from 'src/app/models/response/create-expense';
import { Debts } from 'src/app/models/response/debts';
import { Expense } from 'src/app/models/response/expense';
import { ExpenseToBeReceived } from 'src/app/models/response/expense-to-be-received';
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

  updateExpense(expenseId: string, updateExpenseRequest: UpdateExpenseRequest) {
    return this.http.put(`${this.baseUrl}/expense/${expenseId}`, updateExpenseRequest, this.createHttpOptions());
  }

  updateSplitExpense(expenseId: string, expense: splitExpenseRequest) {
    return this.http.put(`${this.baseUrl}/expense/splitexpense/update/${expenseId}`, expense, this.createHttpOptions());
  }

  createExpense(expense: CreateExpenseRequest) {
    return this.http.post<CreateExpense>(`${this.baseUrl}/expense/create/${expense.userGroupId}`, expense, this.createHttpOptions());
  }

  splitExpense(expenseId: string, expense: splitExpenseRequest) {
    return this.http.post(`${this.baseUrl}/expense/splitexpense/${expenseId}`, expense, this.createHttpOptions());
  }

  getDebtsByUserId(userId: string) {
    return this.http.get<Debts[]>(`${this.baseUrl}/expense/debts/${userId}`, this.createHttpOptions())
  }

  getExpensesToBeReceivedByUserId(userId: string) {
    return this.http.get<ExpenseToBeReceived[]>(`${this.baseUrl}/expense/expenseToBeReceived/${userId}`, this.createHttpOptions());
  }
}
