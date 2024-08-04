import { ComponentFixture, TestBed } from '@angular/core/testing';

import { managerlogincomponent } from './manager-login.component';

describe('RestaurantPanelComponent', () => {
  let component: managerlogincomponent;
  let fixture: ComponentFixture<managerlogincomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ managerlogincomponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(managerlogincomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
