import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000/api';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUserData$(id: string): Observable<any> {
    return this.http.get(API_URL + '/info/' + id)
  }
  getProfileById$(id: string): Observable<any>{
    return this.http.get(API_URL + '/' + id)
  }
  getAllUsers$(): Observable<any> {
    return this.http.get(API_URL);
  }
  updateUser$(id: string, data:any): Observable<any> {
    return this.http.put(API_URL + '/user/' + id, data);
  }
  deleteUserById$(id: string): Observable<any>{
    return this.http.delete(API_URL + '/user/' + id);
  }
}
