import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UpdateExpenseRequest } from 'src/app/models/request/update-expense-request';
import { Expense } from 'src/app/models/response/expense';
import { UsersGroup } from 'src/app/models/response/users-group';
import { GroupService } from '../../group/group.service';
import { ExpenseService } from '../expense.service';
import { AddExpenseDialogComponent } from './dialog/add-expense-dialog/add-expense-dialog.component';
import { EditExpenseDialogComponent } from './dialog/edit-expense-dialog/edit-expense-dialog.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {

  groupId = '';
  userGroupId = '';
  expenses!: Expense[];
  updateExpenseRequest: UpdateExpenseRequest = {
    expense: 0,
    paid: false,
    userId: '',
    userGroupId: ''
  };
  groupName = '';
  users!: UsersGroup[];
  ids!: string[];

  constructor(
    private expenseService: ExpenseService,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getExpensesByGroupId();
  }

  getExpensesByGroupId() {
    this.route.paramMap.subscribe(response => {
      this.groupId = response.get('id') as string;
      this.userGroupId = response.get('userGroupId') as string;
    })

    return this.expenseService.getExpensesByGroupId(this.groupId).subscribe(response => {
      this.expenses = response;
      console.log(this.expenses)
    }, error => {
      console.log(error)
    })
  }

  paidExpense(expense: any) {
    this.updateExpenseRequest.expense = expense.totalExpense;
    this.updateExpenseRequest.paid = true;
    this.updateExpenseRequest.userGroupId = expense.userGroupId;
    this.updateExpenseRequest.userId = expense.userId;

    return this.expenseService.updateExpense(expense.expenseId, this.updateExpenseRequest).subscribe(response => {
      this.getExpensesByGroupId()
    }, error => {
      console.log(error);
    })
  }

  addExpense() {
    return this.groupService.getUsersByGroupId(this.groupId).subscribe(response => {
      this.users = response;
      const userId = localStorage.getItem('userId');
      this.users.forEach(() => {
        const index = this.users.findIndex(user => user.userId == userId);
        if(index > -1) {
          this.users.splice(index, 1)
        }
      })
      const dialogRef = this.dialog.open(AddExpenseDialogComponent, {
        data: {
          groupId: this.groupId,
          userGroupId: this.userGroupId,
          userId: userId,
          users: this.users,
          buttonText: {
            ok: 'Adicionar',
            cancel: 'Cancelar'
          }
        }
      })

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if(confirmed) {
          this.getExpensesByGroupId()
        }
      }, error => {
        console.log(error);
      })
    });
  }

  editExpense(expense: Expense) {
    return this.groupService.getUsersByGroupId(this.groupId).subscribe(response => {
      this.users = response;
      const userId = localStorage.getItem('userId');
      this.users.forEach(() => {
        const index = this.users.findIndex(user => user.userId == userId);
        if(index > -1) {
          this.users.splice(index, 1)
        }
      });
      const usersIds = expense.userExpense.map((userId: {userId: any}) => userId.userId);
      const dialogRef = this.dialog.open(EditExpenseDialogComponent, {
        data: {
          totalExpense: expense.totalExpense,
          paid: expense.paid,
          expenseId: expense.expenseId,
          userId: userId,
          userGroupId: this.userGroupId,
          users: this.users,
          checked: usersIds,
          buttonText: {
            ok: 'Editar',
            cancel: 'Cancelar'
          }
        }
      })

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if(confirmed) {
          this.getExpensesByGroupId()
        }
      }, error => {
        console.log(error);
      })
    })
  }
}
