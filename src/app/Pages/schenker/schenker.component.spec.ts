import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchenkerComponent } from './schenker.component';

describe('SchenkerComponent', () => {
  let component: SchenkerComponent;
  let fixture: ComponentFixture<SchenkerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchenkerComponent]
    });
    fixture = TestBed.createComponent(SchenkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
