import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateCartComponent } from './components/create-cart/create-cart.component';
import { CreateJobWithTagsComponent } from './components/create-job-with-tags/create-job-with-tags.component';
import { CreateUserWithRoleRadioComponent } from './components/create-user-with-role-radio/create-user-with-role-radio.component';
import { CreateUserWithRoleComponent } from './components/create-user-with-role/create-user-with-role.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {path: 'create-user-with-role', component: CreateUserWithRoleComponent},
    {path: 'create-user-with-role-radio', component: CreateUserWithRoleRadioComponent},
    {path: 'create-job', component: CreateJobWithTagsComponent},
    {path: ':userId/cart', component: CreateCartComponent}
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
