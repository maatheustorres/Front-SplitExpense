import { Component, OnInit } from '@angular/core';
import { Debts } from 'src/app/models/response/debts';
import { ExpenseToBeReceived } from 'src/app/models/response/expense-to-be-received';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-debts',
  templateUrl: './debts.component.html',
  styleUrls: ['./debts.component.scss']
})
export class DebtsComponent implements OnInit {

  debts!: Debts[];
  expensesToBeReceived!: ExpenseToBeReceived[];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.getDebtsByUserId();
    this.getExpensesToBeReceivedByUserId();
  }

  getDebtsByUserId() {
    const userId = localStorage.getItem('userId') as string;
    return this.expenseService.getDebtsByUserId(userId).subscribe(response => {
      this.debts = response;
    }, error => {
      console.log(error);
    })
  }

  getExpensesToBeReceivedByUserId() {
    const userId = localStorage.getItem('userId') as string;
    return this.expenseService.getExpensesToBeReceivedByUserId(userId).subscribe(response => {
      this.expensesToBeReceived = response;
    }, error => {
      console.log(error);
    })
  }
}
