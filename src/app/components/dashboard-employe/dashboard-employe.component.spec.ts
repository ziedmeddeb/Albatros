import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmployeComponent } from './dashboard-employe.component';

describe('DashboardEmployeComponent', () => {
  let component: DashboardEmployeComponent;
  let fixture: ComponentFixture<DashboardEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardEmployeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
