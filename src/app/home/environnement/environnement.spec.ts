import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Environnement } from './environnement';

describe('Environnement', () => {
  let component: Environnement;
  let fixture: ComponentFixture<Environnement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Environnement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Environnement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
