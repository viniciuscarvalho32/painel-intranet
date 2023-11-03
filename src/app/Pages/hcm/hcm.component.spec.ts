import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcmComponent } from './hcm.component';

describe('HcmComponent', () => {
  let component: HcmComponent;
  let fixture: ComponentFixture<HcmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
