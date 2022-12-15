import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, shareReplay, take } from 'rxjs';
import { RoleModel } from 'src/app/models/role.model';
import { UserModel } from 'src/app/models/user.model';
import { MockapiService } from 'src/app/services/mockapi.service';

@Component({
  selector: 'app-create-user-with-role-radio',
  templateUrl: './create-user-with-role-radio.component.html',
  styleUrls: ['./create-user-with-role-radio.component.scss'],
})
export class CreateUserWithRoleRadioComponent implements OnInit {
  createUserFormGroup: FormGroup = new FormGroup({
    email: new FormControl<string>('test@gmail.com', [
      Validators.email,
      Validators.required,
    ]),
  });

  roles$!       : Observable<RoleModel[]>;
  selectedRole! : string;

  constructor(private mockApiService: MockapiService) {}

  ngOnInit(): void {
    this.roles$ = this.mockApiService.getRoles().pipe(shareReplay());
    this.roles$.pipe( map( (roles :  RoleModel[]) => roles[0].role )).subscribe({ next: (x) => this.selectedRole=x });    
  }

  onCreateUser(data: UserModel): void {
    this.roles$
      .pipe(
        map((roles: RoleModel[]) => {
          return roles.find((role: RoleModel) => role.role == this.selectedRole)?.id;
        })
      )
      .subscribe({
        next: (x) => {
          data.roleId = x!;
          delete data.role;
        },
        complete: () => {
          this.mockApiService.addUser(data).subscribe();
        },
      });
  }
}
