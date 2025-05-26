import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoGeraisComponent } from './info-gerais.component';

describe('InfoGeraisComponent', () => {
  let component: InfoGeraisComponent;
  let fixture: ComponentFixture<InfoGeraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoGeraisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoGeraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
