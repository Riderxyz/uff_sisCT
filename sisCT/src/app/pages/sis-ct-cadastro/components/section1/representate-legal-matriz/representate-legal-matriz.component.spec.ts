import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepresentateLegalMatrizComponent } from './representate-legal-matriz.component';

describe('RepresentateLegalMatrizComponent', () => {
  let component: RepresentateLegalMatrizComponent;
  let fixture: ComponentFixture<RepresentateLegalMatrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepresentateLegalMatrizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepresentateLegalMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
