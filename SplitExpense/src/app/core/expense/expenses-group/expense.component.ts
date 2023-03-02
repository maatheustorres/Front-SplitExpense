import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateExpenseRequest } from 'src/app/models/request/update-expense-request';
import { Expense } from 'src/app/models/response/expense';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  groupId = '';
  expenses!: Expense[];
  updateExpenseRequest: UpdateExpenseRequest = {
    expense: 0,
    paid: false,
    userId: '',
    userGroupId: ''
  };
  groupName = '';

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getExpensesByGroupId();
  }

  getExpensesByGroupId() {
    this.route.paramMap.subscribe(response => {
      this.groupId = response.get('id') as string;
    })

    return this.expenseService.getExpensesByGroupId(this.groupId).subscribe(response => {
      this.expenses = response;
      console.log(this.expenses)
    }, error => {
      console.log(error)
    })
  }

  updateExpense(expense: any) {
    this.updateExpenseRequest.expense = expense.totalExpense;
    this.updateExpenseRequest.paid = true;
    this.updateExpenseRequest.userGroupId = expense.userGroupId;
    this.updateExpenseRequest.userId = expense.userId;

    return this.expenseService.paidExpense(expense.expenseId, this.updateExpenseRequest).subscribe(response => {
      this.getExpensesByGroupId()
    }, error => {
      console.log(error);
    })
  }
}
