import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateschedComponent } from './updatesched.component';

describe('UpdateschedComponent', () => {
  let component: UpdateschedComponent;
  let fixture: ComponentFixture<UpdateschedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateschedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateschedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
