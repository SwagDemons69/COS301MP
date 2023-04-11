import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileOtherComponent } from './profile-other.component';

describe('ProfileOtherComponent', () => {
  let component: ProfileOtherComponent;
  let fixture: ComponentFixture<ProfileOtherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileOtherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
