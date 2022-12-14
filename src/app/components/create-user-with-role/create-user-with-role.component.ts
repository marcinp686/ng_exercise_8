import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, map, Observable, of, startWith } from 'rxjs';
import { RoleModel } from 'src/app/models/role.model';
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
    email   : new FormControl<string>('', [Validators.required, Validators.email]),
    role    : new FormControl<string>('', [Validators.required])
  })

  roles!          : Observable<RoleModel[]>;
  filteredRoles!  : Observable<RoleModel[]>;
  searchRole?     : Observable<string>;

  ngOnInit(): void {
    this.roles = this.mockApiService.getRoles();
    this.searchRole = this.createUserFormGroup.get('role')?.valueChanges.pipe(startWith(''),  map ( (x: string) => { return x.toLowerCase() }) );
    
    this.filteredRoles = combineLatest([
      this.roles,
      this.searchRole!,
    ]).pipe(
      map(([roles, searchString]: [RoleModel[], string]) => {
        return roles.filter((x) => x.role.toLowerCase().includes(searchString));
      })
    );
  }

  onCreateUser(data: UserModel) : void {
    this.roles
      .pipe(
        map((roless: RoleModel[]): number => {
          return roless.find((x: RoleModel) => x.role === data.role)?.id || -1;
        })
      )
      .subscribe({ next: (x) => (data.roleId = x) });
    
    
      this.mockApiService.addUser(data).subscribe();
  }
}