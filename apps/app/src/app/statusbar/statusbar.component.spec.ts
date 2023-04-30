import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusbarComponent } from './statusbar.component';

describe('StatusbarComponent', () => {
  let component: StatusbarComponent;
  let fixture: ComponentFixture<StatusbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StatusbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
