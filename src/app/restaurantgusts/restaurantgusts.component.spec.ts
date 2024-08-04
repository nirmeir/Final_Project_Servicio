import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantgustsComponent } from './restaurantgusts.component';

describe('RestaurantgustsComponent', () => {
  let component: RestaurantgustsComponent;
  let fixture: ComponentFixture<RestaurantgustsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantgustsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantgustsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
