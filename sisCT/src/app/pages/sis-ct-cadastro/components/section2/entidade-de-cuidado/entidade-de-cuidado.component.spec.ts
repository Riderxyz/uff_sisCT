import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadeDeCuidadoComponent } from './entidade-de-cuidado.component';

describe('EntidadeDeCuidadoComponent', () => {
  let component: EntidadeDeCuidadoComponent;
  let fixture: ComponentFixture<EntidadeDeCuidadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntidadeDeCuidadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntidadeDeCuidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
