import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableframedetailComponent } from './timetableframedetail.component';

describe('TimetableframedetailComponent', () => {
  let component: TimetableframedetailComponent;
  let fixture: ComponentFixture<TimetableframedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableframedetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableframedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
