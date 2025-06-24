import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaDeVagasComponent } from './mapa-de-vagas.component';

describe('MapaDeVagasComponent', () => {
  let component: MapaDeVagasComponent;
  let fixture: ComponentFixture<MapaDeVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapaDeVagasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MapaDeVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
