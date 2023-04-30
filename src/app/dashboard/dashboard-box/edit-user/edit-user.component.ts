import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/service/user.service';
import { LogService } from 'src/service/log.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  submitted = false;
  id;
  editForm: FormGroup;
  userData: User[];
  UserGender: any = ['M', 'F'];
  UserRole: any = ['admin', 'regular'];
  type;
  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateUser();
    this.id = this.actRoute.snapshot.paramMap.get('id');
    if (this.id != 0) {
      this.getUser(this.id);
      this.editForm = this.fb.group({
        userName: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        gender: ['', [Validators.required]],
        nameAndSurname: ['', [Validators.required]],
        // , Validators.pattern('^[0-9]+$')
        role: ['', [Validators.required]],
        birthdate: [new Date(), [Validators.required]]
      });
    } else {
      this.editForm = this.fb.group({
        userName: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        gender: ['', [Validators.required]],
        nameAndSurname: ['', [Validators.required]],
        password: ['', [Validators.required]],
        // , Validators.pattern('^[0-9]+$')
        role: ['', [Validators.required]],
        birthdate: [new Date(), [Validators.required]]
      });
    }

  }
  updateProfileGender(e) {
    this.editForm.get('gender').setValue(e, {
      onlySelf: true,
    });
  }
  updateProfileRole(e) {
    this.editForm.get('role').setValue(e, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }
  getUser(id) {
    this.userService.getUser(id).subscribe(
      value => {
        console.log(value);
        this.editForm.setValue({
          userName: value['userName'],
          email: value['email'],
          gender: value['gender'],
          role: value['role'],
          nameAndSurname: value['nameAndSurname'],
          birthdate: value['birthdate']
        });
      },
      error => { console.log(error); 
      }
    );
  }
  updateUser() {
    this.editForm = this.fb.group({
      userName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      gender: ['', [Validators.required]],
      nameAndSurname: ['', [Validators.required]],
      // , Validators.pattern('^[0-9]+$')
      role: ['', [Validators.required]],
      birthdate: [new Date(), [Validators.required]]
    });
  }
  onSubmit() {
    let currentUserId = this.userService.getUserPayload()._id;
    this.submitted = true;
    console.log("here")
    if (!this.editForm.valid) {
      console.log(this.editForm)
      console.log("notvalid")
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        console.log("onSubmit - id : ", id);
        if (this.id != 0) {//update
          this.userService.updateUser(id, this.editForm.value).subscribe({
            complete: () => {
              if (currentUserId != id) {
                this.router.navigateByUrl('/dashboard/view-users');
              } else {
                this.router.navigateByUrl('/dashboard/profile');
              }
              console.log('Content updated successfully!');
            },
            error: (e) => {
              console.log(e);
            },
          });
        } else {
          this.userService.addUser(this.editForm.value).subscribe({
            complete: () => {
              this.router.navigateByUrl('/dashboard/view-users');
              console.log('User added successfully!');
            },
            error: (e) => {
              console.log(e);
            },
          });
        }
      }
    }
  }

}
