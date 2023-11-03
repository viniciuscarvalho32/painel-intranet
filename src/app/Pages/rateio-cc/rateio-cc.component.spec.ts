import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateioCcComponent } from './rateio-cc.component';

describe('RateioCcComponent', () => {
  let component: RateioCcComponent;
  let fixture: ComponentFixture<RateioCcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RateioCcComponent]
    });
    fixture = TestBed.createComponent(RateioCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
