import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { CarsComponent } from './cars/cars.component';
import { CarsBrandComponent } from './cars-brand/cars-brand.component';
import { CarsTypeComponent } from './cars-type/cars-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RentsPageComponent } from './rents-page/rents-page.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent,
    CarsComponent,
    CarsBrandComponent,
    CarsTypeComponent,
    RentsPageComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
