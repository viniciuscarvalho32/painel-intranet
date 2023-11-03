import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CteComponent } from './cte.component';

describe('CteComponent', () => {
  let component: CteComponent;
  let fixture: ComponentFixture<CteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CteComponent]
    });
    fixture = TestBed.createComponent(CteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
