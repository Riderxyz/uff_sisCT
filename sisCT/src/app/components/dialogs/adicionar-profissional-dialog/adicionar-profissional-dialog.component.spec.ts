import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarProfissionalDialogComponent } from './adicionar-profissional-dialog.component';

describe('AdicionarProfissionalDialogComponent', () => {
  let component: AdicionarProfissionalDialogComponent;
  let fixture: ComponentFixture<AdicionarProfissionalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarProfissionalDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarProfissionalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
