import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipSelector } from './tip-selector';

describe('TipSelector', () => {
  let component: TipSelector;
  let fixture: ComponentFixture<TipSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(TipSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
