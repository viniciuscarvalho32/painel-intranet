import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FretesErpComponent } from './fretes-erp.component';

describe('FretesErpComponent', () => {
  let component: FretesErpComponent;
  let fixture: ComponentFixture<FretesErpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FretesErpComponent]
    });
    fixture = TestBed.createComponent(FretesErpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
