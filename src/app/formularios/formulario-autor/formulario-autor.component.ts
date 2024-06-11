import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutorService } from '../../services/autorService/autor.service';
import { converterParaDataSemFusoHorario } from '../../utils/converteDataString'
import { MatSnackBar } from '@angular/material/snack-bar';

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
export class FormularioAutorComponent implements OnInit {

  autorForm!: FormGroup;
  titulo!: string;
  estaEditando!: boolean;

  constructor(
    private datePipe: DatePipe, 
    private autorService: AutorService, 
    private dialogRef: MatDialogRef<FormularioAutorComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dados: any
    
  ) {}

  ngOnInit(): void {
    this.estaEditando = this.dados.estaEditando;
    this.titulo = this.estaEditando ? 'Editar autor' : 'Adicionar novo autor';

    this.autorForm = new FormGroup({
      nome: new FormControl(this.dados.registro?.nome || '', Validators.required),
      nacionalidade: new FormControl(this.dados.registro?.nacionalidade || '', Validators.required),
      data_nascimento: new FormControl(converterParaDataSemFusoHorario(this.dados.registro?.data_nascimento) || '', Validators.required)
    })
  }
    
  salvarAutor(){
    if(this.autorForm.valid){
      const valorForm = this.autorForm.value;
      const DataFormatada = this.datePipe.transform(valorForm.data_nascimento, 'yyyy-MM-dd')
      const autorData = {
        ...valorForm,
        data_nascimento: DataFormatada
      };
      
      if(this.estaEditando){
        this.autorService.editarRegistro({ ...this.dados.registro, ...autorData }).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Registro alterado com sucesso', 'Fechar', { duration: 3000 })
          },
          error: err => {
            console.log('Erro ao atualizar autor:', err);
            this.snackBar.open('Erro ao alterar o registro', 'Fechar', { duration: 3000 })
          }
        })
      } else {
        this.autorService.salvarNovo(autorData).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Autor salvo com sucesso', 'Fechar', { duration: 3000 })
          },
          error: err => {
            console.error('Erro ao salvar autor:', err)
            this.snackBar.open('Erro ao salvar autor, por favor tente novamente', 'Fechar', { duration: 3000 })
          }
        })
      }
    }
  }
}
