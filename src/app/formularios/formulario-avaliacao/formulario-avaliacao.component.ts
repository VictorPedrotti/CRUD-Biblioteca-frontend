import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../paginas/clientes/cliente';
import { Livro } from '../../paginas/livros/livro';
import { LivroService } from '../../services/livroService/livro.service';
import { ClienteService } from '../../services/clienteService/cliente.service';
import { MatSelectModule } from '@angular/material/select';
import { AvaliacaoService } from '../../services/avaliacaoService/avaliacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { converterParaDataSemFusoHorario } from '../../utils/converteDataString';

@Component({
  selector: 'app-formulario-avaliacao',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './formulario-avaliacao.component.html',
  styleUrl: './formulario-avaliacao.component.css'
})
export class FormularioAvaliacaoComponent implements OnInit{

  avaliacaoForm!: FormGroup;
  clientes: Cliente[] = [];
  livros: Livro[] = [];
  titulo!: string;
  estaEditando!: boolean;

  constructor(
    private datePipe: DatePipe,
    private avaliacaoService: AvaliacaoService,
    private livroService: LivroService,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<FormularioAvaliacaoComponent>,
    private snackBar: MatSnackBar,  
    @Inject(MAT_DIALOG_DATA) public dados: any
    
  ) {}

  ngOnInit(): void {
    this.estaEditando = this.dados.estaEditando;
    this.titulo = this.estaEditando ? 'Editar avaliação' : 'Adicionar nova avaliação';
  
    this.carregaClientes();
    this.carregaLivros();

    this.avaliacaoForm = new FormGroup({
      cliente_id: new FormControl(this.dados.registro?.cliente_id || '', Validators.required),
      livro_id: new FormControl(this.dados.registro?.livro_id || '', Validators.required),
      data_avaliacao: new FormControl(converterParaDataSemFusoHorario(this.dados.registro?.data_avaliacao) || '', Validators.required),
      avaliacao: new FormControl(this.dados.registro?.avaliacao || '', [Validators.required, Validators.max(5), Validators.min(0)]),
      comentario: new FormControl(this.dados.registro?.comentario || '', Validators.required)
    })
  }

  carregaClientes() {
    this.clienteService.obterTodos().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    })
  }

  carregaLivros() {
    this.livroService.obterTodos().subscribe((livros: Livro[]) => {
      this.livros = livros;
    })
  }

  salvarAvaliacao(){
    if(this.avaliacaoForm.valid){
      const valorForm = this.avaliacaoForm.value;
      const DataFormatada = this.datePipe.transform(valorForm.data_avaliacao, 'yyyy-MM-dd')
      const avaliacaoData = {
        ...valorForm,
        data_avaliacao: DataFormatada
      };
      
      if(this.estaEditando){
        this.avaliacaoService.editarRegistro({ ...this.dados.registro, ...avaliacaoData }).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Registro alterado com sucesso', 'Fechar', { duration: 3000 })
            this.avaliacaoService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao atualizar registro:', err);
            this.snackBar.open('Erro ao alterar o registro', 'Fechar', { duration: 3000 })
          }
        })
      } else {
        this.avaliacaoService.salvarNovo(avaliacaoData).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Avaliação salva com sucesso', 'Fechar', { duration: 3000 })
            this.avaliacaoService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao salvar avaliação:', err)
            this.snackBar.open('Erro ao salvar avaliação, por favor tente novamente', 'Fechar', { duration: 3000 })
          }
        }) 
      }
    }
  }
}