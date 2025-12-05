import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeduseHistory } from './meduse-history';

describe('MeduseHistory', () => {
  let component: MeduseHistory;
  let fixture: ComponentFixture<MeduseHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeduseHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeduseHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
