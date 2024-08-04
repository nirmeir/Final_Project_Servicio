import { ComponentFixture, TestBed } from '@angular/core/testing';

import {PanelManagerComponent} from './manager-panel.component'
describe('PanelManagerComponent', () => {
  let component: PanelManagerComponent;
  let fixture: ComponentFixture<PanelManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
