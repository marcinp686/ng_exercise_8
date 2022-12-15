import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateUserWithRoleRadioComponent } from './components/create-user-with-role-radio/create-user-with-role-radio.component';
import { CreateUserWithRoleComponent } from './components/create-user-with-role/create-user-with-role.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'create-user-with-role', component: CreateUserWithRoleComponent},
    {path: 'create-user-with-role-radio', component: CreateUserWithRoleRadioComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
