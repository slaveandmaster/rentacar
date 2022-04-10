import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { analyze } from 'eslint-scope';
import { forkJoin } from 'rxjs';
import { CarsService } from 'src/app/services/cars.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-cars-details',
  templateUrl: './cars-details.component.html',
  styleUrls: ['./cars-details.component.css']
})
export class CarsDetailsComponent implements OnInit {

  constructor(private notifyService:NotificationService, private http: HttpClient,private carService: CarsService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { }
   cardId: string;
   car: any;
   isClickRent: boolean = false;
  //  userData: any;
  //  id: string;


  reserveForm: FormGroup = new FormGroup({
        names: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
        days: new FormControl('', [Validators.required]),
        car: new FormControl('')


  })
  

  ngOnInit(): void {
      this.cardId = this.route.snapshot.params['id'];
      this.carService.getCarById$(this.cardId).subscribe((data)=> {
        this.car = data.car;
      });
      //set default option value
      this.reserveForm.patchValue({
        car: this.cardId
      })
    } 
    showReserve(): boolean {
      return this.isClickRent = !this.isClickRent;
    }
    //getter form controls
    get f() {
      return this.reserveForm.controls;
    }
    onSubmit(): void {
        console.log(this.reserveForm.value)
        const { names, date, days, car } = this.reserveForm.value;
        //update car status to isRented true and rent raiting
        let data = {
          isRented: true
        }
        ;
        
         let updateCar$ = this.carService.updateCar$(data, this.cardId);
        // this.userData  = sessionStorage.getItem('auth-user');
         //this.id = JSON.parse(this.userData).id;
        // //add new rent
         let newRent$ = this.carService.rentCar$(this.cardId,names, date, days);
         forkJoin([updateCar$, newRent$]).subscribe(result => {
           if (result[0] == 'success') {
             this.notifyService.showSuccess('Successfully created reservation!', 'Success');
             this.router.navigate(['/home']);
           }
         })
    }
    
    // reserveCar() {
    //   //console.log(id)
    //   console.log(this.reserveForm.value)
    //   const { carId, name, date, days} = this.reserveForm.value;
    //   //update car status to isRented true and rent raiting
    //   let data = {
    //     isRented: true
    //   }
    //   console.log(carId);
      
    //   // let updateCar = this.carService.updateCar$(data, this.cardId).subscribe((data) => console.log(data));
    //   // //add new rent
    //   // let newRent = this.carService.rentCar$(carId, name, date, days).subscribe((data)=> console.log(data))
    // }
    
  }
  