import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  top: any [];
  constructor(private carService: CarsService, private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.carService.getTopRentCar$().subscribe({
      next: top => {
        this.top = JSON.parse(top)
      },
      error: err => {
        this.notifyService.showError(err.message, 'Warning');

      }
    });
    //console.log(top);
  }

}
