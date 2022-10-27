import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarddiscTypeComponent } from './harddisc-type.component';

describe('HarddiscTypeComponent', () => {
  let component: HarddiscTypeComponent;
  let fixture: ComponentFixture<HarddiscTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarddiscTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarddiscTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
