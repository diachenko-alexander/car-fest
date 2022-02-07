import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarPanelComponent } from './car-panel.component';

describe('CarPanelComponent', () => {
  let component: CarPanelComponent;
  let fixture: ComponentFixture<CarPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
