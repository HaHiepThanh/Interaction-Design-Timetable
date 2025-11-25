import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableframeComponent } from './timetableframe.component';

describe('TimetableframeComponent', () => {
  let component: TimetableframeComponent;
  let fixture: ComponentFixture<TimetableframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableframeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
