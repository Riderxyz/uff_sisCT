import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunidadeTerapeuticaComponent } from './comunidade-terapeutica.component';

describe('ComunidadeTerapeuticaComponent', () => {
  let component: ComunidadeTerapeuticaComponent;
  let fixture: ComponentFixture<ComunidadeTerapeuticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComunidadeTerapeuticaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComunidadeTerapeuticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
