import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantgustsLandingComponent } from './restaurantgusts-landing.component';

describe('RestaurantgustsLandingComponent', () => {
  let component: RestaurantgustsLandingComponent;
  let fixture: ComponentFixture<RestaurantgustsLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantgustsLandingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantgustsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
