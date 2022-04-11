import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //currentUser: Boolean = false;
  
  constructor(private tokenService: TokenStorageService, private router: Router, private auth: AuthService) { }
  
  get isLogged() {
    return !!this.tokenService.getToken();
  }
  get currentUser() {
    return this.tokenService.getUser()
  }
  get isAdmin() {
    return this.tokenService.getUser().isAdmin;
  }
  ngOnInit(): void {
  }
  logout(): void {
    this.tokenService.signOut();
    window.location.reload();
  }
}
