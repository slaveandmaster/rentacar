import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars-list-item',
  templateUrl: './cars-list-item.component.html',
  styleUrls: ['./cars-list-item.component.css']
})
export class CarsListItemComponent implements OnInit {
  @Input() car: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
