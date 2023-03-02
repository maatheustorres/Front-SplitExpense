import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/utils/guards/auth.guard";
import { ExpenseComponent } from "./expenses-group/expense.component";

const routes: Routes = [
  {path: 'expense-group/:id', canActivate: [AuthGuard], component: ExpenseComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ExpenseRoutingModule { }
