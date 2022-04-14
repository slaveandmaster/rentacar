import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-rents-page',
  templateUrl: './rents-page.component.html',
  styleUrls: ['./rents-page.component.css'],
})
export class RentsPageComponent implements OnInit {
  rentList: any[] = [];

  constructor(
    private carService: CarsService,
    private notifyService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carService.getAllRents$().subscribe({
      next: (rents) => {
        this.rentList = JSON.parse(rents);
      },
      error: (err) => {
        console.log(err.status);
      },
    });
  }
  deleteRent(id: string): void {
    this.carService
      .deleteRentCar$(id)
      .pipe(switchMap(() => this.carService.getAllRents$()))
      .subscribe({
        next: (rents) => {
          this.rentList = JSON.parse(rents);
          this.notifyService.showSuccess('Successfully Deleted!', 'Success');
        },
        error: (err) => {
          this.notifyService.showError('Something was wrong!', 'Alert');
        },
      });
  }
}
