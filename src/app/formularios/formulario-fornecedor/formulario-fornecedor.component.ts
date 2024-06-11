import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FornecedorService } from '../../services/fornecedorService/fornecedor.service';

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
export class FormularioFornecedorComponent {

  fornecedorForm!: FormGroup

  constructor(private fornecedorService: FornecedorService, private dialogRef: MatDialogRef<FormularioFornecedorComponent>) {
    this.fornecedorForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      telefone: new FormControl('', Validators.required)
    })
  }

  salvarFornecedor(){
    if(this.fornecedorForm.valid){
      const valorForm = this.fornecedorForm.value;

      this.fornecedorService.salvarNovo(valorForm).subscribe({
        next: res => {
          this.dialogRef.close();
          alert('Fornecedor salvo com sucesso')
        },
        error: err => {
          console.error('Erro ao salvar fornecedor:', err)
          alert('Erro ao salvar fornecedor, por favor tente novamente.')
        }
      })
    }
  }
    
}