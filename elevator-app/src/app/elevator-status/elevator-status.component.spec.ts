import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorStatusComponent } from './elevator-status.component';

describe('ElevatorStatusComponent', () => {
  let component: ElevatorStatusComponent;
  let fixture: ComponentFixture<ElevatorStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ElevatorStatusComponent]
    });
    fixture = TestBed.createComponent(ElevatorStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
