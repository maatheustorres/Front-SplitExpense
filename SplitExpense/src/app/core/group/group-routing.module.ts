import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/utils/guards/auth.guard";
import { AddUsersComponent } from "./add-users/add-users.component";
import { CreateComponent } from "./create/create.component";
import { GroupDetailsComponent } from "./group-details/group-details.component";
import { GroupComponent } from "./side-bar-groups/group.component";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: GroupComponent},
  {path: 'group/new', canActivate: [AuthGuard], component: CreateComponent},
  {path: 'group/add-users/:id', canActivate: [AuthGuard], component: AddUsersComponent},
  {path: 'group/details', canActivate: [AuthGuard], component: GroupDetailsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
