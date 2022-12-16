import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatRadioModule } from '@angular/material/radio'
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatMomentDateModule } from '@angular/material-moment-adapter'

import { CreateUserWithRoleComponent } from './components/create-user-with-role/create-user-with-role.component';
import { CreateUserWithRoleRadioComponent } from './components/create-user-with-role-radio/create-user-with-role-radio.component';
import { CreateJobWithTagsComponent } from './components/create-job-with-tags/create-job-with-tags.component';
import { CreateCartComponent } from './components/create-cart/create-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserWithRoleComponent,
    CreateUserWithRoleRadioComponent,
    CreateJobWithTagsComponent,
    CreateCartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
