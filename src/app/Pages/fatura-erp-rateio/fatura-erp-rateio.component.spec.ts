import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturaErpRateioComponent } from './fatura-erp-rateio.component';

describe('FaturaErpRateioComponent', () => {
  let component: FaturaErpRateioComponent;
  let fixture: ComponentFixture<FaturaErpRateioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaturaErpRateioComponent]
    });
    fixture = TestBed.createComponent(FaturaErpRateioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
