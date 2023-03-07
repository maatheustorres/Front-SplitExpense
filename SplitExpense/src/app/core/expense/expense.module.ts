import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { ExpenseRoutingModule } from "./expense-routing.module";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ExpenseComponent } from "./expenses-group/expense.component";
import { AddExpenseDialogComponent } from './expenses-group/dialog/add-expense-dialog/add-expense-dialog.component';
import { EditExpenseDialogComponent } from './expenses-group/dialog/edit-expense-dialog/edit-expense-dialog.component';

@NgModule({
  declarations: [
    ExpenseComponent,
    AddExpenseDialogComponent,
    EditExpenseDialogComponent
  ],
  imports: [
    CommonModule,
    ExpenseRoutingModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSlideToggleModule
  ],
  exports: [
    ExpenseComponent,
    AddExpenseDialogComponent
  ]
})
export class ExpenseModule {}
