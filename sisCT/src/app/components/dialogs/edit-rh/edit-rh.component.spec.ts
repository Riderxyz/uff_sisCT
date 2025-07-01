import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRHComponent } from './edit-rh.component';

describe('EditRHComponent', () => {
  let component: EditRHComponent;
  let fixture: ComponentFixture<EditRHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRHComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
