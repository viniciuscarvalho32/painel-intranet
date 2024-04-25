import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioRateioComponent } from './relatorio-rateio.component';

describe('RelatorioRateioComponent', () => {
  let component: RelatorioRateioComponent;
  let fixture: ComponentFixture<RelatorioRateioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RelatorioRateioComponent]
    });
    fixture = TestBed.createComponent(RelatorioRateioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
