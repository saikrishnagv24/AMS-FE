import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuTypeComponent } from './cpu-type.component';

describe('CpuTypeComponent', () => {
  let component: CpuTypeComponent;
  let fixture: ComponentFixture<CpuTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpuTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
