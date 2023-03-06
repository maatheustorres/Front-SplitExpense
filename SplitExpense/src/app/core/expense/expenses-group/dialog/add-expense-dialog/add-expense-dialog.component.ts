import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateExpenseRequest } from 'src/app/models/request/create-expense-request';
import { splitExpenseRequest } from 'src/app/models/request/split-expense-request';
import { UsersGroup } from 'src/app/models/response/users-group';
import { ExpenseService } from '../../../expense.service';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss']
})
export class AddExpenseDialogComponent {

  groupId = '';
  userGroupId = '';
  userId = '';
  confirmButtonText = 'Adicionar';
  cancelButtonText = 'Cancelar';
  users!: UsersGroup[];
  userIds: string[] = [];
  expenseForm: any = FormGroup;
  createExpenseRequest: CreateExpenseRequest = {
    totalExpense: 0,
    paid: false,
    userGroupId: '',
    userId: '',
    groupId: ''
  };
  splitExpenseRequest: splitExpenseRequest = {
    userIds: [],
    userId: ''
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService) {
      if(data.groupId) {
        this.groupId = data.groupId;
      }

      if (data.userGroupId) {
        this.userGroupId = data.userGroupId;
      }

      if (data.userId) {
        this.userId = data.userId;
      }

      if (data.users) {
        this.users = data.users;
      }

      if(data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }

      this.createExpenseForm()
  }

  createExpenseForm() {
    this.expenseForm = this.formBuilder.group({
      totalExpense: [null, [Validators.required, Validators.min(1)]],
    })
  }

  checkUsers(userId: string) {
    this.userIds.push(userId);
  }

  createExpense() {
    const expense = this.expenseRequest();
    return this.expenseService.createExpense(expense).subscribe(response => {
      this.splitExpense(response.expenseId);
      this.dialogRef.close(true);
    }, error => {
      console.log(error);
    })
  }

  expenseRequest() {
    this.createExpenseRequest.totalExpense = this.expenseForm.value.totalExpense;
    this.createExpenseRequest.paid = false;
    this.createExpenseRequest.userGroupId = this.userGroupId;
    this.createExpenseRequest.userId = this.userId;
    this.createExpenseRequest.groupId = this.groupId;
    return this.createExpenseRequest;
  }

  splitExpense(expenseId: string) {
    const splitExpenseRequest = this.createSplitExpenseRequest();
    return this.expenseService.splitExpense(expenseId, splitExpenseRequest).subscribe(() => {
      console.log('dividiu')
    }, error => {
      console.log(error);
    })
  }

  createSplitExpenseRequest() {
    this.splitExpenseRequest.userIds = this.userIds;
    this.splitExpenseRequest.userId = this.userId;
    return this.splitExpenseRequest;
  }
}
