import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditoraComponent } from './formulario-editora.component';

describe('FormularioEditoraComponent', () => {
  let component: FormularioEditoraComponent;
  let fixture: ComponentFixture<FormularioEditoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEditoraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioEditoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
