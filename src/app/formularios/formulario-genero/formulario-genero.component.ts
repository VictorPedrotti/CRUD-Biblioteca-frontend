import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GeneroService } from '../../services/generoService/genero.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class FormularioGeneroComponent implements OnInit{
  
  generoForm!: FormGroup;
  titulo!: string;
  estaEditando!: boolean;

  constructor(
    private generoService: GeneroService, 
    private dialogRef: MatDialogRef<FormularioGeneroComponent>,
    private snackBar: MatSnackBar,  
    @Inject(MAT_DIALOG_DATA) public dados: any

  ) {}

  ngOnInit(): void {
    this.estaEditando = this.dados.estaEditando;
    this.titulo = this.estaEditando ? 'Editar gênero' : 'Adicionar novo gênero';

    this.generoForm = new FormGroup({
      descricao: new FormControl(this.dados.registro?.descricao || '', Validators.required)
    })
  }

  salvarGenero() {
    if(this.generoForm.valid){
      const valorForm = this.generoForm.value;

      if(this.estaEditando){
        this.generoService.editarRegistro({ ...this.dados.registro, ...valorForm }).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Registro alterado com sucesso', 'Fechar', { duration: 3000 })
            this.generoService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao atualizar registro:', err);
            this.snackBar.open('Erro ao alterar o registro', 'Fechar', { duration: 3000 })
          }
        })
      } else {
        this.generoService.salvarNovo(valorForm).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Gênero salvo com sucesso', 'Fechar', { duration: 3000 })
          },
          error: err => {
            console.error('Erro ao salvar gênero:', err)
            this.snackBar.open('Erro ao salvar gênero, por favor tente novamente', 'Fechar', { duration: 3000 })
          }
        })
      }
    }
  }
}
