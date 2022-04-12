import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';
import { CarsBrandComponent } from './cars-brand/cars-brand.component';
import { CarsTypeComponent } from './cars-type/cars-type.component';
import { CarsComponent } from './cars/cars.component';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'users', component: UsersComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'cars', component: CarsComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'cars-brand', component: CarsBrandComponent,
    canActivate:[CheckLoginGuard]
  },
  {
    path: 'cars-type', component: CarsTypeComponent,
    canActivate:[CheckLoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
