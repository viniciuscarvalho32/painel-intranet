import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFileFatComponent } from './form-file-fat.component';

describe('FormFileFatComponent', () => {
  let component: FormFileFatComponent;
  let fixture: ComponentFixture<FormFileFatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFileFatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFileFatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
