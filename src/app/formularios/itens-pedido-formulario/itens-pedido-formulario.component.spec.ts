import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensPedidoFormularioComponent } from './itens-pedido-formulario.component';

describe('ItensPedidoFormularioComponent', () => {
  let component: ItensPedidoFormularioComponent;
  let fixture: ComponentFixture<ItensPedidoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItensPedidoFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItensPedidoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
