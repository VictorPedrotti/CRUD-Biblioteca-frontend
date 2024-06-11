import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioItensPedidoComponent } from './formulario-itens-pedido.component';

describe('FormularioItensPedidoComponent', () => {
  let component: FormularioItensPedidoComponent;
  let fixture: ComponentFixture<FormularioItensPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioItensPedidoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioItensPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
