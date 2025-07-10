import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConclusaoDoCadastroDialogComponent } from './conclusao-do-cadastro.component';

describe('ConclusaoDoCadastroDialogComponent', () => {
  let component: ConclusaoDoCadastroDialogComponent;
  let fixture: ComponentFixture<ConclusaoDoCadastroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConclusaoDoCadastroDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConclusaoDoCadastroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
