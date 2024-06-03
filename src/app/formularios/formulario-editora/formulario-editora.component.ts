import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario-editora',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './formulario-editora.component.html',
  styleUrl: './formulario-editora.component.css'
})
export class FormularioEditoraComponent {

  editoraForm!: FormGroup;

  constructor(private datePipe: DatePipe) {
    this.editoraForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      data_fundacao: new FormControl('', Validators.required)
    })
  }

  salvarEditora() {

  }
}
