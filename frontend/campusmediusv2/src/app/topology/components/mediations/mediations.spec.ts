import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediationsComponent } from './mediations';

describe('MediationsComponent', () => {
  let component: MediationsComponent;
  let fixture: ComponentFixture<MediationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});