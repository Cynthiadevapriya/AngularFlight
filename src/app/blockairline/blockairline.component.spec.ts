import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockairlineComponent } from './blockairline.component';

describe('BlockairlineComponent', () => {
  let component: BlockairlineComponent;
  let fixture: ComponentFixture<BlockairlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockairlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockairlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
