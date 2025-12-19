import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotreMission } from './notre-mission';

describe('NotreMission', () => {
  let component: NotreMission;
  let fixture: ComponentFixture<NotreMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotreMission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotreMission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
