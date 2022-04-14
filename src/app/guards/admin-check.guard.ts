import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminCheckGuard implements CanActivate {
  constructor(private tokenService: TokenStorageService, private router: Router) {}

  get isAdmin() {
    return !!this.tokenService.getUser().isAdmin;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(this.isAdmin);
      if (this.isAdmin != true) {
        window.alert('Access Denied, You Dont have permissions!');
        this.router.navigate(['home']);
      }
    return true;
  }
  
}
