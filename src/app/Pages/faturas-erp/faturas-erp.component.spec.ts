import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturasErpComponent } from './faturas-erp.component';

describe('FaturasErpComponent', () => {
  let component: FaturasErpComponent;
  let fixture: ComponentFixture<FaturasErpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaturasErpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaturasErpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
