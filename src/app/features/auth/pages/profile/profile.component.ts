import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import {UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any = '';
  myRents: any[] = [];
  isAdmin: Boolean = this.currentUser.isAdmin;
  constructor(private tokenService: TokenStorageService,private userService: UserService ) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    let userId = this.currentUser.id;
    this.userService.getProfileById$(userId).subscribe({
      next: rents => {
        //filter by userId and get all rent for user
        this.myRents = rents.filter(function(v: any) {
          return v.user._id == userId
        });
        
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
