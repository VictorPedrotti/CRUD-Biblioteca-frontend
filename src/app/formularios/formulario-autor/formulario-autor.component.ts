import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario-autor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './formulario-autor.component.html',
  styleUrl: './formulario-autor.component.css'
})
export class FormularioAutorComponent {

  autorForm!: FormGroup;

  constructor(private datePipe: DatePipe) {
    this.autorForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      nacionalidade: new FormControl('', Validators.required),
      data_nascimento: new FormControl('', Validators.required)
    })
  }
  salvarAutor(){
    if(this.autorForm.valid){
      const formValue = this.autorForm.value;
      const DataFormatada = this.datePipe.transform(formValue.data_nascimento, 'dd-MM-yyyy')
      const autorData = {
        ...formValue,
        data_nascimento: DataFormatada
      };
      console.log(autorData)
    }
  }
}
