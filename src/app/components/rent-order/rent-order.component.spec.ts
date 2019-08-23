import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentOrderComponent } from './rent-order.component';

describe('RentOrderComponent', () => {
  let component: RentOrderComponent;
  let fixture: ComponentFixture<RentOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
