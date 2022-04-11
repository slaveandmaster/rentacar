import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[] = [];
  userInfo: any;
  isClickEdit: boolean = false;
  editForm: FormGroup;
  

  constructor(private userService: UserService, private notifyService: NotificationService, private router: Router) { }


  ngOnInit(): void {
    this.editForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)]),
      isAdmin: new FormControl('false', [Validators.required])
    })


    this.userService.getAllUsers$().subscribe({
      next: users => {
        this.users = users;
      },
      error: err => {
        console.log(err);
      }
    })
  }

  //getter for form values
  get f() {
    return this.editForm.value;
  }

  showEdit(id: string): void {
    this.userService.getUserData$(id).subscribe(user => this.userInfo = user)
    this.isClickEdit = !this.isClickEdit;
  }
  cancelEdit(): void {
    this.isClickEdit = !this.isClickEdit;
  }
  onCheckChange(e: any): void {
    if (e.target.checked) {
      this.editForm.controls['isAdmin'].setValue(e.target.value);
    } else {
      this.editForm.controls['isAdmin'].setValue(false);
      
    }

  }

  updateUser(id: string): void {

    const data = {
      email: this.editForm.value.email.trim(),
      hashedPassword: this.editForm.value.password.trim(),
      isAdmin: this.editForm.value.isAdmin
    }
    this.userService.updateUser$(id, data).subscribe({
      next: user => {
        console.log(user.status)
        
      },
      error: err => {
        if (err.status == "200") {
          
          this.notifyService.showSuccess('Successfully updated!', 'Success');
          this.router.navigate(['dashboard']);
          this.cancelEdit();
        } else {
          console.log(err);
        }
      }
    })
  }
}
