import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SisCtCadastroComponent } from './sis-ct-cadastro.component';

describe('SisCtCadastroComponent', () => {
  let component: SisCtCadastroComponent;
  let fixture: ComponentFixture<SisCtCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SisCtCadastroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SisCtCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
