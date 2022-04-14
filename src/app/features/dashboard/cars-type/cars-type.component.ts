import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cars-type',
  templateUrl: './cars-type.component.html',
  styleUrls: ['./cars-type.component.css']
})
export class CarsTypeComponent implements OnInit {
  types: any[] = [];
  typeForm: FormGroup;
  isClickEdit: Boolean = false;
  isClickAdd: Boolean = false;
  typesInfo: any;
  constructor(private carService: CarsService, private router: Router, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.typeForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    })

    this.carService.getAllTypes$().subscribe((types) => {
      this.types = types;
    })
  }

  //show edit form
  showEdit(id: string) {
    this.carService.getTypeById$(id).subscribe(type => this.typesInfo = type)
    this.isClickEdit = !this.isClickEdit;
  }
  showAddForm(): void {
    this.isClickAdd = !this.isClickAdd;
  }
  addType(): void {
    console.log(this.typeForm.value)
    const data = {
      name: this.typeForm.value.name.trim()
    }
    this.carService.addTypeCar$(data).pipe(
      switchMap(() => this.carService.getAllTypes$())
    ).subscribe({
      next: data => {
        this.types = data;
        this.notifyService.showSuccess('Successfully Added new Car Type', 'Success');
        this.typeForm.reset();
        this.cancelAdd();
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
  updateType(id: string): void {
    const data = {
      name: this.typeForm.value.name.trim()
    }
    this.carService.updateTypeById$(id, data).pipe(
      switchMap(() => this.carService.getAllTypes$())
    ).subscribe({
      next: type => {
        this.types = type;
        console.log('Done')
        this.notifyService.showSuccess('Successfully updated!', 'Success');
        this.cancelEdit();
      },
      error: err => {
        console.log(err);
      }
    })
  }
  deleteType(id: string): void {
    this.carService.deleteTypeById$(id).pipe(
      switchMap(() => this.carService.getAllTypes$())
    ).subscribe({
      next: data => {
        this.types = data;
        this.notifyService.showSuccess('Record was Deleted', 'Success');
      },
      error: err => {
        console.log(err);
      }
    });
  }
}

