import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { splitExpenseRequest } from 'src/app/models/request/split-expense-request';
import { UpdateExpenseRequest } from 'src/app/models/request/update-expense-request';
import { UsersGroup } from 'src/app/models/response/users-group';
import { ExpenseService } from '../../../expense.service';

@Component({
  selector: 'app-edit-expense-dialog',
  templateUrl: './edit-expense-dialog.component.html',
  styleUrls: ['./edit-expense-dialog.component.scss']
})
export class EditExpenseDialogComponent {

  expenseId = '';
  userId = '';
  userGroupId = '';
  confirmButtonText = 'Editar';
  cancelButtonText = 'Cancelar';
  totalExpense = 0;
  checked: string[] = [];
  users!: UsersGroup[];
  expenseForm: any = FormGroup;
  paid = false;
  updateRequest!: UpdateExpenseRequest
  splitExpenseRequest: splitExpenseRequest = {
    userIds: [],
    userId: ''
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditExpenseDialogComponent>,
    private formBuilder: FormBuilder,
    private expenseService: ExpenseService) {
    this.createEditValues(data);
    this.createUpdateExpenseForm();
  }

  createEditValues(data: any) {
    if (data.userId) {
      this.userId = data.userId;
    }
    if (data.expenseId) {
      this.expenseId = data.expenseId;
    }
    if (data.userGroupId) {
      this.userGroupId = data.userGroupId;
    }
    if (data.totalExpense) {
      this.totalExpense = data.totalExpense;
    }
    if(data.paid) {
      this.paid = data.paid;
    }
    if(data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }

    if(data.users) {
      this.users = data.users;
    }

    if(data.checked) {
      this.checked = data.checked;
    }
  }

  createUpdateExpenseForm() {
    this.expenseForm = this.formBuilder.group({
      expense: [this.totalExpense, [Validators.required, Validators.min(1)]],
      paid: [this.paid],
      userId: [this.userId],
      userGroupId: [this.userGroupId]
    })
  }

  checkUsers(userId: string) {
    if (this.checked.includes(userId)) {
      const index = this.checked.findIndex(x => x == userId);
      this.checked.splice(index, 1);
    } else {
      this.checked.push(userId);
    }
  }

  updateExpense() {
    this.updateRequest = this.expenseForm.value;
    return this.expenseService.updateExpense(this.expenseId, this.updateRequest).subscribe(() => {
      this.updateSplitExpense();
      this.dialogRef.close(true);
    }, error => {
      console.log(error);
    })
  }

  updateSplitExpense() {
    const splitExpenseRequest = this.createSplitExpenseRequest();
    return this.expenseService.updateSplitExpense(this.expenseId, splitExpenseRequest).subscribe(() => {
      console.log('dividiu')
    }, error => {
      console.log(error);
    })
  }

  createSplitExpenseRequest() {
    this.splitExpenseRequest.userIds = this.checked;
    this.splitExpenseRequest.userId = this.userId;
    return this.splitExpenseRequest;
  }
}
