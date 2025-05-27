import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermosDeUsoDialogComponent } from './termos-de-uso-dialog.component';

describe('TermosDeUsoDialogComponent', () => {
  let component: TermosDeUsoDialogComponent;
  let fixture: ComponentFixture<TermosDeUsoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TermosDeUsoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TermosDeUsoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
