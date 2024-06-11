import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioFormaPagamentoComponent } from './formulario-forma-pagamento.component';

describe('FormularioFormaPagamentoComponent', () => {
  let component: FormularioFormaPagamentoComponent;
  let fixture: ComponentFixture<FormularioFormaPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioFormaPagamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioFormaPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
