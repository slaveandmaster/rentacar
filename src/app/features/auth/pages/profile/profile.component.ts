import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any = '';
  isAdmin: Boolean = this.currentUser.isAdmin;
  constructor(private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
  }

}
