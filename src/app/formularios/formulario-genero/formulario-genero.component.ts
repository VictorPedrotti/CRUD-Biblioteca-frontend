import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GeneroService } from '../../services/generoService/genero.service';

@Component({
  selector: 'app-formulario-genero',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatDialogModule
  ],
  templateUrl: './formulario-genero.component.html',
  styleUrl: './formulario-genero.component.css'
})
export class FormularioGeneroComponent {
  
  generoForm!: FormGroup;

  constructor(private generoService: GeneroService, private dialogRef: MatDialogRef<FormularioGeneroComponent>) {
    this.generoForm = new FormGroup({
      descricao: new FormControl('', Validators.required)
    })
  }

  salvarGenero() {
    if(this.generoForm.valid){
      const valorForm = this.generoForm.value;

      this.generoService.salvarNovo(valorForm).subscribe({
        next: res => {
          this.dialogRef.close();
          alert('Gênero salvo com sucesso')
        },
        error: err => {
          console.error('Erro ao salvar gênero:', err)
          alert('Erro ao salvar gênero, por favor tente novamente.')
        }
      })
    }
  }
}
