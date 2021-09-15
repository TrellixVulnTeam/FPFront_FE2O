import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCouponComponent } from './policy-coupon.component';

describe('PolicyCouponComponent', () => {
  let component: PolicyCouponComponent;
  let fixture: ComponentFixture<PolicyCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyCouponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
