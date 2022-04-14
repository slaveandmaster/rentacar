import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentsPageComponent } from './rents-page.component';

describe('RentsPageComponent', () => {
  let component: RentsPageComponent;
  let fixture: ComponentFixture<RentsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
