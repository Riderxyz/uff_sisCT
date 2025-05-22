import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsavelTecnicoComponent } from './responsavel-tecnico.component';

describe('ResponsavelTecnicoComponent', () => {
  let component: ResponsavelTecnicoComponent;
  let fixture: ComponentFixture<ResponsavelTecnicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResponsavelTecnicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponsavelTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
