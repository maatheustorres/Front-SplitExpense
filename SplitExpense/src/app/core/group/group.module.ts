import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRoutingModule } from './group-routing.module';
import { GroupComponent } from './side-bar-groups/group.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateComponent } from './create/create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AddUsersComponent } from './add-users/add-users.component';
import { DebtsComponent } from '../expense/debts/debts.component';


@NgModule({
  declarations: [
    GroupComponent,
    DebtsComponent,
    CreateComponent,
    AddUsersComponent,
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    GroupComponent,
    DebtsComponent,
  ]
})
export class GroupModule { }
