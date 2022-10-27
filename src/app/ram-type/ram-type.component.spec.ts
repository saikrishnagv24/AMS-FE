import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamTypeComponent } from './ram-type.component';

describe('RamTypeComponent', () => {
  let component: RamTypeComponent;
  let fixture: ComponentFixture<RamTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RamTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
