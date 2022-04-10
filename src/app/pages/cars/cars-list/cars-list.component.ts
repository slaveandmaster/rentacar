import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {

  constructor(private carService: CarsService, private notifyService: NotificationService) { }
  cars: any;
  ngOnInit(): void {
    this.carService.getAllCars$().subscribe({
      next: cars => { 
        this.cars = JSON.parse(cars)
      
      },
      error: err => {
        this.notifyService.showError(err.message, 'Warning');
      }
      });
  }

}
