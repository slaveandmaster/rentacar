import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCheckGuard } from 'src/app/guards/admin-check.guard';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';
import { CarsBrandComponent } from './cars-brand/cars-brand.component';
import { CarsTypeComponent } from './cars-type/cars-type.component';
import { CarsComponent } from './cars/cars.component';
import { DashboardComponent } from './dashboard.component';
import { RentsPageComponent } from './rents-page/rents-page.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent,
    canActivate:[AdminCheckGuard]
  },
  {
    path: 'users', component: UsersComponent,
    canActivate:[AdminCheckGuard]
  },
  {
    path: 'cars', component: CarsComponent,
    canActivate:[AdminCheckGuard]
  },
  {
    path: 'cars-brand', component: CarsBrandComponent,
    canActivate:[AdminCheckGuard]
  },
  {
    path: 'cars-type', component: CarsTypeComponent,
    canActivate:[AdminCheckGuard]
  },
  {
    path: 'rents-page', component: RentsPageComponent,
    canActivate:[AdminCheckGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
