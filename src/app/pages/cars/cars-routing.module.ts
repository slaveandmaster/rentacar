import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard } from 'src/app/guards/check-login.guard';
import { CarsDetailsComponent } from './cars-details/cars-details.component';
import { CarsNewComponent } from './cars-new/cars-new.component';
import { CarsPageComponent } from './cars-page/cars-page.component';


const routes: Routes = [
  {
    path: 'cars',
    component: CarsPageComponent,
    canActivate: [CheckLoginGuard]
},
{
  path: 'cars/:id',
  component: CarsDetailsComponent,
  canActivate: [CheckLoginGuard]
},
{
  path: 'cars/new',
  component: CarsNewComponent,
  canActivate: [CheckLoginGuard]
},
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class CarsRoutingModule { }


export const CarsRoutingModule = RouterModule.forChild(routes);
