import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
const API_URL = 'http://localhost:3000/api/cars';
const API_URL_BRAND = 'http://localhost:3000/api/brand';
const API_URL_TYPE = 'http://localhost:3000/api/type';
const API_URL_RENT = 'http://localhost:3000/api/rent';


@Injectable({
  providedIn: 'root'
})
export class CarsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  getAllCars$(): Observable<any> {
    return this.http.get(API_URL + '/all', { responseType: 'text' }).pipe(catchError(this.errorHandler));
  }

  getCarById$(id: string): Observable<any> {
    return this.http.get(API_URL + '/' + id).
      pipe(catchError(this.errorHandler));
  }
  //get list with all rented cars
  getAllRents$(): Observable<any> {
    return this.http.get(API_URL_RENT + '/allrents', { responseType: 'text' }).pipe(catchError(this.errorHandler));
  }
  //rent
  rentCar$(car: string, names: string, date: string, days: string): Observable<any> {
    return this.http.post('http://localhost:3000/api/rent/' + car, {
      car,
      names,
      date,
      days,
    }).pipe(catchError(this.errorHandler))
  }
  //delete rent car
  deleteRentCar$(id:string): Observable<any> {
    return this.http.delete(API_URL_RENT + '/' + id).pipe(catchError(this.errorHandler))
  }

  //update car
  updateCar$(data: any, id: string): Observable<any> {
    return this.http.put(API_URL + '/' + id, data).pipe(catchError(this.errorHandler));
  }
  //home top rented
  getTopRentCar$(): Observable<any> {
    return this.http.get(API_URL + '/top', { responseType: 'text' }).pipe(catchError(this.errorHandler));
  }

  //-------Brand CRUD---------
  getAllBrands$(): Observable<any> {
    return this.http.get(API_URL_BRAND).pipe(catchError(this.errorHandler));
  }

  addBrandCar$(data: any): Observable<any> {
    return this.http.post(API_URL_BRAND, data).pipe(catchError(this.errorHandler))
  }

  getBrandById$(id: string): Observable<any> {
    return this.http.get(API_URL_BRAND + '/' + id).pipe(catchError(this.errorHandler));
  }
  updateBrandById$(id: string, data: any): Observable<any> {
    return this.http.put(API_URL_BRAND + '/' + id, data).pipe(catchError(this.errorHandler));
  }

  deleteBrandById$(id: string): Observable<any> {
    return this.http.delete(API_URL_BRAND + '/' + id).pipe(catchError(this.errorHandler));
  }

  //-------Type CRUD---------
  getAllTypes$(): Observable<any> {
    return this.http.get(API_URL_TYPE).pipe(catchError(this.errorHandler));
  }

  addTypeCar$(data: any): Observable<any> {
    return this.http.post(API_URL_TYPE, data).pipe(catchError(this.errorHandler))
  }

  getTypeById$(id: string): Observable<any> {
    return this.http.get(API_URL_TYPE + '/' + id).pipe(catchError(this.errorHandler));
  }
  updateTypeById$(id: string, data: any): Observable<any> {
    return this.http.put(API_URL_TYPE + '/' + id, data).pipe(catchError(this.errorHandler));
  }

  deleteTypeById$(id: string): Observable<any> {
    return this.http.delete(API_URL_TYPE + '/' + id).pipe(catchError(this.errorHandler));
  }

  //Add new Car
  addCar$(data: any): Observable<any> {
    return this.http.post(API_URL + '/new', data).pipe(catchError(this.errorHandler));
  }

  //update Car Details
  updateCarInfo$(id: string, data: any): Observable<any> {
    return this.http.put(API_URL + '/update' + id, data).pipe(catchError(this.errorHandler));
  }
  //delete car
  deleteCarById$(id: string): Observable<any> {
    return this.http.delete(API_URL + '/' + id).pipe(catchError(this.errorHandler));
  }
  //catch errors
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
