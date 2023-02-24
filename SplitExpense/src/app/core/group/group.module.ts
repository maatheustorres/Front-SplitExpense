import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './side-bar-groups/group.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ExpenseComponent } from '../expense/expense.component';
import { AuthGuard } from 'src/app/utils/guards/auth.guard';

@NgModule({
  declarations: [
    GroupComponent,
    ExpenseComponent,
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MatListModule,
    MatSidenavModule,
  ],
  exports: [
    GroupComponent,
    ExpenseComponent,
  ]
})
export class GroupModule { }
