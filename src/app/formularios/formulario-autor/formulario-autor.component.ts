import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-formulario-autor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule
  ],
  templateUrl: './formulario-autor.component.html',
  styleUrl: './formulario-autor.component.css'
})
export class FormularioAutorComponent {

  autorForm!: FormGroup;

  constructor() {
    this.autorForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      nacionalidade: new FormControl('', Validators.required),
      data_nascimento: new FormControl('', Validators.required)
    })
  }

  cancelar(){

  }
}
