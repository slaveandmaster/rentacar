import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsDetailsComponent } from './cars-details/cars-details.component';
import { CarsNewComponent } from './cars-new/cars-new.component';
import { CarsPageComponent } from './cars-page/cars-page.component';


const routes: Routes = [
  {
    path: 'cars',
    component: CarsPageComponent
},
{
  path: 'cars/:id',
  component: CarsDetailsComponent
},
{
  path: 'cars/new',
  component: CarsNewComponent
},
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
// export class CarsRoutingModule { }


export const CarsRoutingModule = RouterModule.forChild(routes);
