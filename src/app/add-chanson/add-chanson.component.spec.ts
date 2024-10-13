import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChansonComponent } from './add-chanson.component';

describe('AddChansonComponent', () => {
  let component: AddChansonComponent;
  let fixture: ComponentFixture<AddChansonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddChansonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddChansonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
