import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { combineLatest, map, Observable, shareReplay, startWith, throwError } from 'rxjs';
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
    email   : new FormControl<string>('ja@tu.pl', [Validators.required, Validators.email]),
    role    : new FormControl<string>('', [Validators.required])
  })

  roles$!          : Observable<RoleModel[]>;
  filteredRoles$!  : Observable<RoleModel[]>;
  searchRole$?     : Observable<string>;

  ngOnInit(): void {
    this.roles$ = this.mockApiService.getRoles().pipe(shareReplay());
    
    // On every change of role input, map this input to lowercase
    this.searchRole$ = this.createUserFormGroup.get('role')?.valueChanges.pipe(startWith(''),  map ( (x: string) => { return x.toLowerCase() }) );
    
    // Observable of filtered list of roles that include 'this.searchRole' substring in their name
    this.filteredRoles$ = combineLatest([
      this.roles$,
      this.searchRole$!,
    ]).pipe(
      map(([roles, searchString]: [RoleModel[], string]) => {
        return roles.filter((x) => x.role.toLowerCase().includes(searchString));
      })
    );
  }

  onCreateUser(data: UserModel) : void {
    // Map role (string) to roleId (number) and delete role from data object before posting
    // If RoleId is found then post new user else throw an error
    this.roles$
      .pipe(
        map((roless: RoleModel[]): number | undefined => {
          if( roless.find((x: RoleModel) => x.role === data.role)==undefined )
            throw Error('RoleId not found')
          else
            return roless.find((x: RoleModel) => x.role === data.role)?.id
        })
      )
      .subscribe({
        next: (x) => { data.roleId = x!; delete data.role },
        complete: () => { if(data.roleId!=-1) this.mockApiService.addUser(data).subscribe() },
        error: (e) => { this.createUserFormGroup.controls['role'].setErrors( {idNotFound: true} )}
      });
  }
}