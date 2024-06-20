import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ClienteService } from '../../services/clienteService/cliente.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.css'
})
export class FormularioClienteComponent implements OnInit {

  clienteForm!: FormGroup
  titulo!: string;
  estaEditando!: boolean;

  constructor(
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<FormularioClienteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dados: any

  ) {}
  
  ngOnInit(): void {
    this.estaEditando = this.dados.estaEditando;
    this.titulo = this.estaEditando ? 'Editar avaliação' : 'Adicionar nova avaliação';

    this.clienteForm = new FormGroup({
      nome: new FormControl(this.dados.registro?.nome || '', Validators.required),
      cpf: new FormControl(this.dados.registro?.cpf || '', [Validators.required, Validators.minLength(11)]),
      email: new FormControl(this.dados.registro?.email || '', [Validators.required, Validators.email]),
      telefone: new FormControl(this.dados.registro?.telefone || '', Validators.required),
    })
  }

  salvarCliente() {
    if (this.clienteForm.valid) {
      const valorForm = this.clienteForm.value;

      if (this.estaEditando) {
        this.clienteService.editarRegistro({ ...this.dados.registro, ...valorForm }).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Registro alterado com sucesso', 'Fechar', { duration: 3000 })
            this.clienteService.atualizaConsulta.next(1);
          },
          error: err => {
            console.log('Erro ao atualizar registro:', err);
            this.snackBar.open('Erro ao alterar o registro', 'Fechar', { duration: 3000 })
          }
        })
      } else {
        this.clienteService.salvarNovo(valorForm).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Cliente salvo com sucesso', 'Fechar', { duration: 3000 })
            this.clienteService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao salvar cliente:', err)
            this.snackBar.open('Erro ao salvar cliente, por favor tente novamente.', 'Fechar', { duration: 3000 })
          }
        })
      }
    }
  }
}

