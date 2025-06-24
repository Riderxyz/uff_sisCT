import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarVagaDialogComponent } from './adicionar-vaga-dialog.component';

describe('AdicionarVagaDialogComponent', () => {
  let component: AdicionarVagaDialogComponent;
  let fixture: ComponentFixture<AdicionarVagaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarVagaDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdicionarVagaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
