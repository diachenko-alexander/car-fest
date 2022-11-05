import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaModalComponent } from './spa-modal.component';

describe('SpaModalComponent', () => {
  let component: SpaModalComponent;
  let fixture: ComponentFixture<SpaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
