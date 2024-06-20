import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FornecedorService } from '../../services/fornecedorService/fornecedor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-fornecedor',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './formulario-fornecedor.component.html',
  styleUrl: './formulario-fornecedor.component.css'
})
export class FormularioFornecedorComponent implements OnInit {

  fornecedorForm!: FormGroup;
  titulo!: string;
  estaEditando!: boolean;

  constructor(
    private fornecedorService: FornecedorService, 
    private dialogRef: MatDialogRef<FormularioFornecedorComponent>,
    private snackBar: MatSnackBar,  
    @Inject(MAT_DIALOG_DATA) public dados: any
  
  ) {}

  ngOnInit(): void {
    this.estaEditando = this.dados.estaEditando;
    this.titulo = this.estaEditando ? 'Editar fornecedor' : 'Adicionar novo fornecedor';

    this.fornecedorForm = new FormGroup({
      nome: new FormControl(this.dados.registro?.nome || '', Validators.required),
      email: new FormControl(this.dados.registro?.email || '', [Validators.required, Validators.email]),
      telefone: new FormControl(this.dados.registro?.telefone || '', Validators.required)
    })
  }

  salvarFornecedor(){
    if(this.fornecedorForm.valid){
      const valorForm = this.fornecedorForm.value;

      if(this.estaEditando){
        this.fornecedorService.editarRegistro({ ...this.dados.registro, ...valorForm }).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Registro alterado com sucesso', 'Fechar', { duration: 3000 })
            this.fornecedorService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao atualizar registro:', err);
            this.snackBar.open('Erro ao alterar o registro', 'Fechar', { duration: 3000 })
          }
        })
      } else {
        this.fornecedorService.salvarNovo(valorForm).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Fornecedor salvo com sucesso', 'Fechar', { duration: 3000 })
            this.fornecedorService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao salvar fornecedor:', err)
            this.snackBar.open('Erro ao salvar fornecedor, por favor tente novamente', 'Fechar', { duration: 3000 })
          }
        })
      }
    }
  }
    
}