import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsNewComponent } from './cars-new.component';

describe('CarsNewComponent', () => {
  let component: CarsNewComponent;
  let fixture: ComponentFixture<CarsNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarsNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
