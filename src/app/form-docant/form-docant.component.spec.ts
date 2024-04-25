import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDocantComponent } from './form-docant.component';

describe('FormDocantComponent', () => {
  let component: FormDocantComponent;
  let fixture: ComponentFixture<FormDocantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormDocantComponent]
    });
    fixture = TestBed.createComponent(FormDocantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
