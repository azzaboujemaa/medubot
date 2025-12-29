import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeduseDistribution } from './meduse-distribution';

describe('MeduseDistribution', () => {
  let component: MeduseDistribution;
  let fixture: ComponentFixture<MeduseDistribution>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeduseDistribution]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeduseDistribution);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
