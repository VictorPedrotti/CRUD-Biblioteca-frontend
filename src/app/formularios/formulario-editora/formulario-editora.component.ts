import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EditoraService } from '../../services/editoraService/editora.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { converterParaDataSemFusoHorario } from '../../utils/converteDataString';

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
export class FormularioEditoraComponent implements OnInit {

  editoraForm!: FormGroup;
  titulo!: string;
  estaEditando!: boolean;

  constructor(
    private datePipe: DatePipe,
    private editoraService: EditoraService,
    private dialogRef: MatDialogRef<FormularioEditoraComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dados: any

  ) { }

  ngOnInit(): void {
    this.estaEditando = this.dados.estaEditando;
    this.titulo = this.estaEditando ? 'Editar editora' : 'Adicionar nova editora';

    this.editoraForm = new FormGroup({
      nome: new FormControl(this.dados.registro.nome || '', Validators.required),
      data_fundacao: new FormControl(converterParaDataSemFusoHorario(this.dados.registro.data_fundacao) || '', Validators.required)
    })
  }

  salvarEditora() {
    if (this.editoraForm.valid) {
      const valorForm = this.editoraForm.value;
      const DataFormatada = this.datePipe.transform(valorForm.data_fundacao, 'yyyy-MM-dd')
      const editoraData = {
        ...valorForm,
        data_fundacao: DataFormatada
      };

      if (this.estaEditando) {
        this.editoraService.editarRegistro({ ...this.dados.registro, ...editoraData }).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Registro alterado com sucesso', 'Fechar', { duration: 3000 })
          },
          error: err => {
            console.log('Erro ao atualizar registro:', err);
            this.snackBar.open('Erro ao alterar o registro', 'Fechar', { duration: 3000 })
          }
        })
      } else {
        this.editoraService.salvarNovo(editoraData).subscribe({
          next: res => {
            this.dialogRef.close();
            alert('Editora salva com sucesso')
          },
          error: err => {
            console.error('Erro ao salvar editora:', err)
            alert('Erro ao salvar editora, por favor tente novamente.')
          }
        })
      }
    }
  }
}
