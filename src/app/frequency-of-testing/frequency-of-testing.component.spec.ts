import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyOfTestingComponent } from './frequency-of-testing.component';

describe('FrequencyOfTestingComponent', () => {
  let component: FrequencyOfTestingComponent;
  let fixture: ComponentFixture<FrequencyOfTestingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencyOfTestingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyOfTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
