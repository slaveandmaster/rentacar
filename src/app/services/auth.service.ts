import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
// import { Auth, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
// import { signInWithEmailAndPassword } from '@firebase/auth';
// import { LoginData } from '../interfaces/login-data.interface';
const API_URL = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;

  constructor(private http: HttpClient) {}
  // constructor(private auth: Auth) { }

  // login({email, password}: LoginData) {
  //   return signInWithEmailAndPassword(this.auth, email, password);
  // }

  // register({email, password}: LoginData) {
  //   return createUserWithEmailAndPassword(this.auth, email, password);
  // }

  // logout() {
  //   return signOut(this.auth);
  // }
  login(email: string, password: string) : Observable<any> {
    return this.http.post(API_URL + 'login', {
      email,
      password
    }, httpOptions).pipe(
      tap(response => console.log(response)),
      map(response => response),
      tap(user => this.currentUser = user)
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post(API_URL + 'register', {
      email,
      password
    }, httpOptions)
  }

  get isLogged() {
    return this.currentUser;
  }
}
