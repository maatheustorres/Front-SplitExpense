import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/utils/guards/auth.guard";
import { GroupComponent } from "./side-bar-groups/group.component";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: GroupComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
