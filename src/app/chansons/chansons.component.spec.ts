import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChansonsComponent } from './chansons.component';

describe('ChansonsComponent', () => {
  let component: ChansonsComponent;
  let fixture: ComponentFixture<ChansonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChansonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChansonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
