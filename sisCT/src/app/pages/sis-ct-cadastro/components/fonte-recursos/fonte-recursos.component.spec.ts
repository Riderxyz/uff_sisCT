import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonteRecursosComponent } from './fonte-recursos.component';

describe('FonteRecursosComponent', () => {
  let component: FonteRecursosComponent;
  let fixture: ComponentFixture<FonteRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FonteRecursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FonteRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
