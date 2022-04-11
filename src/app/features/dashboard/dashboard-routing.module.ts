import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsBrandComponent } from './cars-brand/cars-brand.component';
import { CarsTypeComponent } from './cars-type/cars-type.component';
import { CarsComponent } from './cars/cars.component';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent 
  },
  {
    path: 'users', component: UsersComponent
  },
  {
    path: 'cars', component: CarsComponent
  },
  {
    path: 'cars-brand', component: CarsBrandComponent
  },
  {
    path: 'cars-type', component: CarsTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
