import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryBar } from './summary-bar';

describe('SummaryBar', () => {
  let component: SummaryBar;
  let fixture: ComponentFixture<SummaryBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
