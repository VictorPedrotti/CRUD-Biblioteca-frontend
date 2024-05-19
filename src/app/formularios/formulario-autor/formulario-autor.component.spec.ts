import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAutorComponent } from './formulario-autor.component';

describe('FormularioAutorComponent', () => {
  let component: FormularioAutorComponent;
  let fixture: ComponentFixture<FormularioAutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAutorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioAutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
