import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsPageComponent } from './cars-page/cars-page.component';
import { CarsListItemComponent } from './cars-list-item/cars-list-item.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { CarsDetailsComponent } from './cars-details/cars-details.component';
import { CarsNewComponent } from './cars-new/cars-new.component';
import { CarsRoutingModule } from './cars-routing.module';



@NgModule({
  declarations: [
    CarsPageComponent,
    CarsListItemComponent,
    CarsListComponent,
    CarsDetailsComponent,
    CarsNewComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule
  ]
})
export class CarsModule { }
