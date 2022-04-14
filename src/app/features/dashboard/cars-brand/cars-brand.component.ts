import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cars-brand',
  templateUrl: './cars-brand.component.html',
  styleUrls: ['./cars-brand.component.css']
})
export class CarsBrandComponent implements OnInit {

  constructor(private carService: CarsService, private router: Router, private notifyService: NotificationService) { }
  brands: any[] = [];
  brandForm: FormGroup;
  isClickEdit: Boolean = false;
  isClickAdd: Boolean = false;
  brandInfo: any;

  ngOnInit(): void {
    this.brandForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })

    this.carService.getAllBrands$().subscribe((brands) => {
      this.brands = brands;
    })
  }

  //show edit form
  showEdit(id: string) {
    this.carService.getBrandById$(id).subscribe(brand => this.brandInfo = brand)
    this.isClickEdit = !this.isClickEdit;
  }
  showAddForm(): void {
    this.isClickAdd = !this.isClickAdd;
  }
  addBrand(): void {
    //console.log(this.brandForm.value)
    const data = {
      name: this.brandForm.value.name.trim()
    }
    this.carService.addBrandCar$(data).pipe(
      switchMap(() => this.carService.getAllBrands$())
    ).subscribe({
      next: data => {
        this.brands = data;
        this.notifyService.showSuccess('Successfully Added new Brand', 'Success');
        this.cancelAdd();
        //this.router.navigate(['/dashboard/cars-brand'])
        //reload page
        // setTimeout(() => {
        //   this.router.navigateByUrl('/dashboard', {skipLocationChange: false}).then(() =>
        //         this.router.navigate(['/dashboard/cars-brand']));
        //   }, 1500)
      },
      error: err => {
        this.notifyService.showError('Something  was wrong!', 'Warning');
      }
    })
  }

  cancelAdd(): void {
    this.isClickAdd = !this.isClickAdd
  }
  cancelEdit(): void {
    this.isClickEdit = !this.isClickEdit
  }
  updateBrand(id: string): void {
    const data = {
      name: this.brandForm.value.name.trim()
    }
    this.carService.updateBrandById$(id, data).pipe(
      switchMap(() => this.carService.getAllBrands$())
    ).subscribe({
      next: brand => {
        this.brands = brand;
        console.log('Done')
        this.notifyService.showSuccess('Successfully updated!', 'Success');
        this.cancelEdit();
      },
      error: err => {
        console.log(err);
      }
    })
  }
  deleteBrand(id: string): void {
    this.carService.deleteBrandById$(id).pipe(
      switchMap(() => this.carService.getAllBrands$())
    ).subscribe({
      next: data => {
        this.brands = data;
        this.notifyService.showSuccess('Record was Deleted', 'Success');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
