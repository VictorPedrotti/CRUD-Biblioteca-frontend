import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornecedorFormularioComponent } from './fornecedor-formulario.component';

describe('FornecedorFormularioComponent', () => {
  let component: FornecedorFormularioComponent;
  let fixture: ComponentFixture<FornecedorFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FornecedorFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FornecedorFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
