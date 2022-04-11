import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsTypeComponent } from './cars-type.component';

describe('CarsTypeComponent', () => {
  let component: CarsTypeComponent;
  let fixture: ComponentFixture<CarsTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
