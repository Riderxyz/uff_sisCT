import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteMultiplaEscolhaComponent } from './teste-multipla-escolha.component';

describe('TesteMultiplaEscolhaComponent', () => {
  let component: TesteMultiplaEscolhaComponent;
  let fixture: ComponentFixture<TesteMultiplaEscolhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TesteMultiplaEscolhaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TesteMultiplaEscolhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
