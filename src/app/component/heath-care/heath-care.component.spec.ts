import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeathCareComponent } from './heath-care.component';

describe('HeathCareComponent', () => {
  let component: HeathCareComponent;
  let fixture: ComponentFixture<HeathCareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeathCareComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeathCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
