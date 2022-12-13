import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateUserWithRoleComponent } from './components/create-user-with-role/create-user-with-role.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'create-user-with-role', component: CreateUserWithRoleComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
