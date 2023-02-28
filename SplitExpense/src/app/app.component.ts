import { Component, OnInit } from '@angular/core';
import { AccountService } from './core/account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'SplitExpense';
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token') as string;
    this.accountService.loadCurrentUser(token);
  }
}
