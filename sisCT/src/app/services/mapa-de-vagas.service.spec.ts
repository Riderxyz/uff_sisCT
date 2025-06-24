import { TestBed } from '@angular/core/testing';

import { MapaDeVagasService } from './mapa-de-vagas.service';

describe('MapaDeVagasService', () => {
  let service: MapaDeVagasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapaDeVagasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
