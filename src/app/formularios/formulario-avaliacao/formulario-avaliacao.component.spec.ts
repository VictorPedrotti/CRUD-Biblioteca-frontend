import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAvaliacaoComponent } from './formulario-avaliacao.component';

describe('FormularioAvaliacaoComponent', () => {
  let component: FormularioAvaliacaoComponent;
  let fixture: ComponentFixture<FormularioAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAvaliacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
