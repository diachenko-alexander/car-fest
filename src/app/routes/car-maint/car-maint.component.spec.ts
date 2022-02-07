import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarMaintComponent } from './car-maint.component';

describe('CarMaintComponent', () => {
  let component: CarMaintComponent;
  let fixture: ComponentFixture<CarMaintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarMaintComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarMaintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
