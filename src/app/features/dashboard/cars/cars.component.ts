import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, forkJoin, mergeMap, of, switchMap } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: any[] = [];
  brands: any[] = [];
  types: any[] = [];
  carForm: FormGroup;
  isClickEdit: Boolean = false;
  isClickAdd: Boolean = false;
  carInfo: any;
  selectedItem: any;

  constructor(private carService: CarsService, private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
    let loadCars$ = this.carService.getAllCars$().pipe(catchError((err) => of(err)));
    let loadBrands$ = this.carService.getAllBrands$().pipe(catchError((err) => of(err)));
    let loadTypes$ = this.carService.getAllTypes$().pipe(catchError((err) => of(err)));

    forkJoin([loadCars$, loadBrands$, loadTypes$]).subscribe((result) => {
      this.cars = JSON.parse(result[0]);
      this.brands = result[1];
      this.types = result[2]
    })
    //form fields
    this.carForm = new FormGroup({
      model: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      brand: new FormControl('Select Car Brand', [Validators.required]),
      type: new FormControl('Select Car Type', [Validators.required]),
      seats: new FormControl('', [Validators.required]),
      doors: new FormControl('', [Validators.required]),
      transmission: new FormControl('', [Validators.required]),
      licenseNumber: new FormControl('', [Validators.required]),
      air: new FormControl('', [Validators.required]),

    })
  }

  showAddForm(): void {
    this.isClickAdd = !this.isClickAdd;
  }

  showEdit(id: string): void {
    this.carService.getCarById$(id).subscribe((car) => {
      this.carInfo = car.car;
    })
    this.isClickEdit = !this.isClickEdit;

  }

  cancelEdit(): void {
    this.isClickEdit = !this.isClickEdit;
  }
  //edit - update car
  updateCar(id: string): void {

    const data = {
      model: this.carForm.value.model.trim(),
      image: this.carForm.value.image.trim(),
      price: this.carForm.value.price,
      year: this.carForm.value.year,
      brand: this.carForm.value.brand.trim(),
      type: this.carForm.value.type.trim(),
      numberInSeats: this.carForm.value.seats,
      numberOfDoors: this.carForm.value.doors,
      transmission: this.carForm.value.transmission.trim(),
      numberInStock: this.carForm.value.licenseNumber.trim(),
      airConditioner: this.carForm.value.air,
    }

    this.carService.updateCarInfo$(id, data).pipe(
      switchMap(() => this.carService.getAllCars$())
    ).subscribe({
      next: data => {
        this.cars = JSON.parse(data);
        this.cancelEdit();
        this.notifyService.showSuccess('Car was Updated!', 'Success');
      },
      error: err => {
        console.log(err);
        this.notifyService.showError(err.message, 'Alert');
      }
    })
  }
  //TODO DELETE
  deleteCar(id: string): void {
    this.carService.deleteCarById$(id).pipe(
      switchMap(() => this.carService.getAllCars$())
    ).subscribe({
      next: data => {
        this.cars = JSON.parse(data);
        this.notifyService.showSuccess('Successfully deleted!', 'Success');
      },
      error: err => {
        this.notifyService.showError('Something wrong', 'Alert');
      }
    })
  }
  //TODO ADD
  addCar(): void {
    const data = {
      model: this.carForm.value.model.trim(),
      image: this.carForm.value.image.trim(),
      price: this.carForm.value.price.trim(),
      year: this.carForm.value.year.trim(),
      brand: this.carForm.value.brand.trim(),
      type: this.carForm.value.type.trim(),
      numberInSeats: this.carForm.value.seats.trim(),
      numberOfDoors: this.carForm.value.doors.trim(),
      transmission: this.carForm.value.transmission.trim(),
      numberInStock: this.carForm.value.licenseNumber.trim(),
      airConditioner: this.carForm.value.air.trim(),
    }

    if (this.carForm.valid) {
      this.carService.addCar$(data).subscribe({
        next: data => {
          this.notifyService.showSuccess('Successfuly added new car', 'Success');
          this.carForm.reset();
          this.cancelAdd();
        },
        error: err => {
          console.log(err);
          this.notifyService.showError('Something  was wrong!', 'Warning');
        }
      })
    }
  }

  //cancel add
  cancelAdd(): void {
    this.isClickAdd = !this.isClickAdd;
  }

  //getter form controls values
  get f() {
    return this.carForm.controls;
  }

  //get checkbox value
  onCheckChange(e: any): void {
    let isAir = e.target.value ? 'true' : false;
    if (e.target.checked) {
      this.carForm.controls['air'].setValue(isAir);
    } else {
      this.carForm.controls['air'].setValue(false);

    }
  }
  //get brand from select menu
  onChangeBrand(e: any) {
    this.carForm.get('brand')?.setValue(e.target.value, {
      onlySelf: true
    })
    this.selectedItem = e.target.value;
  }
  //get type from select menu
  onChangeType(e: any) {
    this.carForm.get('type')?.setValue(e.target.value, {
      onlySelf: true
    })
  }
}
