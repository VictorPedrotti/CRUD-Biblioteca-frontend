import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioLivroComponent } from './formulario-livro.component';

describe('FormularioLivroComponent', () => {
  let component: FormularioLivroComponent;
  let fixture: ComponentFixture<FormularioLivroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioLivroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
