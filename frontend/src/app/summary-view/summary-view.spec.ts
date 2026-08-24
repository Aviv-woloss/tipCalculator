import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryViewComponent } from './summary-view';

describe('SummaryView', () => {
  let component: SummaryViewComponent;
  let fixture: ComponentFixture<SummaryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SummaryViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
