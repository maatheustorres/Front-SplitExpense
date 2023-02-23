import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseComponent } from './core/expense/expense.component';

const routes: Routes = [
  {
    path:'', component:ExpenseComponent
  },
  {
  path:'expense', component: ExpenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
