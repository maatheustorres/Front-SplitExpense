import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'', loadChildren: () => import('./core/group/group.module')
    .then(mod => mod.GroupModule)
  },
  {
  path:'home', loadChildren: () => import('./core/group/group.module')
  .then(mod => mod.GroupModule)
  },
  {
    path: 'account', loadChildren: () => import('./core/account/account.module')
    .then(mod => mod.AccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
