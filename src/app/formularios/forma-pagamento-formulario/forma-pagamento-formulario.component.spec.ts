import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPagamentoFormularioComponent } from './forma-pagamento-formulario.component';

describe('FormaPagamentoFormularioComponent', () => {
  let component: FormaPagamentoFormularioComponent;
  let fixture: ComponentFixture<FormaPagamentoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormaPagamentoFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormaPagamentoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
