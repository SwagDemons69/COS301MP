import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlipComponent } from './blip.component';

describe('BlipComponent', () => {
  let component: BlipComponent;
  let fixture: ComponentFixture<BlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
