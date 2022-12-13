import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user.model';
import { MockapiService } from 'src/app/services/mockapi.service';

@Component({
  selector: 'app-create-user-with-role',
  templateUrl: './create-user-with-role.component.html',
  styleUrls: ['./create-user-with-role.component.scss']
})
export class CreateUserWithRoleComponent implements OnInit {

  constructor(private mockApiService: MockapiService) { }

  createUserFormGroup:  FormGroup = new FormGroup({
    email   : new FormControl(null, Validators.required),
    roleId  : new FormControl(null, Validators.required)
  })

  ngOnInit(): void {
  }

  onCreateUser(data: UserModel) : void {
    this.mockApiService.addUser(data).subscribe();
  }

}
