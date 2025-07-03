import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLoggedComponent } from './student-logged.component';

describe('StudentLoggedComponent', () => {
  let component: StudentLoggedComponent;
  let fixture: ComponentFixture<StudentLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentLoggedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
