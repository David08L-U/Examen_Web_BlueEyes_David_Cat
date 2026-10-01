import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlueEyes } from './blue-eyes';

describe('BlueEyes', () => {
  let component: BlueEyes;
  let fixture: ComponentFixture<BlueEyes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlueEyes],
    }).compileComponents();

    fixture = TestBed.createComponent(BlueEyes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
