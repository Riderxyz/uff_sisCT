import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoHumanosComponent } from './recurso-humanos.component';

describe('RecursoHumanosComponent', () => {
  let component: RecursoHumanosComponent;
  let fixture: ComponentFixture<RecursoHumanosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecursoHumanosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursoHumanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
