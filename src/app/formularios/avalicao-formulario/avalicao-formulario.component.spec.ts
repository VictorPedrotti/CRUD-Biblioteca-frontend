import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvalicaoFormularioComponent } from './avalicao-formulario.component';

describe('AvalicaoFormularioComponent', () => {
  let component: AvalicaoFormularioComponent;
  let fixture: ComponentFixture<AvalicaoFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvalicaoFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvalicaoFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
