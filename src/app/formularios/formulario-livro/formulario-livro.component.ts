import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditoraService } from '../../services/editoraService/editora.service';
import { Editora } from '../../paginas/editoras/editora';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { AutorService } from '../../services/autorService/autor.service';
import { Autor } from '../../paginas/autores/autor';
import { GeneroService } from '../../services/generoService/genero.service';
import { FornecedorService } from '../../services/fornecedorService/fornecedor.service';
import { Genero } from '../../paginas/generos/genero';
import { Fornecedor } from '../../paginas/fornecedores/fornecedor';
import { LivroService } from '../../services/livroService/livro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { converterParaDataSemFusoHorario } from '../../utils/converteDataString';


@Component({
  selector: 'app-formulario-livro',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './formulario-livro.component.html',
  styleUrl: './formulario-livro.component.css'
})
export class FormularioLivroComponent implements OnInit{

  livroForm!: FormGroup
  editoras: Editora[] = [];
  autores: Autor[] = [];
  generos: Genero[] = [];
  fornecedores: Fornecedor[] = [];
  titulo!: string;
  estaEditando!: boolean;
  
  constructor(
    private editoraService: EditoraService, 
    private autorService: AutorService,
    private generoService: GeneroService,
    private fornecedorService: FornecedorService,
    private livroService: LivroService,
    private dialogRef: MatDialogRef<FormularioLivroComponent>,
    private datePipe: DatePipe, 
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dados: any

  ) {}

  ngOnInit(): void {
    this.estaEditando = this.dados.estaEditando;
    this.titulo = this.dados.estaEditando ? 'Editar livro' : 'Adicionar novo livro';

    this.carregarEditoras();
    this.carregarAutores();
    this.carregarGeneros();
    this.carregarFornecedores();

    this.livroForm = new FormGroup({
      titulo: new FormControl(this.dados.registro?.titulo || '', Validators.required),
      data_publicacao: new FormControl(converterParaDataSemFusoHorario(this.dados.registro?.data_publicacao) || '', Validators.required),
      preco: new FormControl(this.dados.registro?.preco || '', [Validators.required, Validators.min(1)]),
      numero_paginas: new FormControl(this.dados.registro?.numero_paginas || '', Validators.required),
      genero_id: new FormControl(this.dados.registro?.genero_id || '', Validators.required),
      editora_id: new FormControl(this.dados.registro?.editora_id || '', Validators.required),
      autor_id: new FormControl(this.dados.registro?.autor_id || '', Validators.required),
      fornecedor_id: new FormControl(this.dados.registro?.fornecedor_id || '', Validators.required),
    })
  }

  carregarEditoras(): void {
    this.editoraService.obterTodos().subscribe((editoras: Editora[]) => {
      this.editoras = editoras;
    });
  }

  carregarAutores(): void {
    this.autorService.obterTodos().subscribe((autores: Autor[]) => {
      this.autores = autores;
    })
  }

  carregarGeneros(): void {
    this.generoService.obterTodos().subscribe((generos: Genero[]) => {
      this.generos = generos;
    })
  }

  carregarFornecedores(): void {
    this.fornecedorService.obterTodos().subscribe((fornecedores: Fornecedor[]) => {
      this.fornecedores = fornecedores;
    })
  }

  salvarLivro() {
    if(this.livroForm.valid){
      const valorForm = this.livroForm.value;
      const DataFormatada = this.datePipe.transform(valorForm.data_publicacao, 'yyyy-MM-dd')
      const livroData = {
        ...valorForm,
        data_publicacao: DataFormatada
      };
      
      if(this.estaEditando){
        this.livroService.editarRegistro({ ...this.dados.registro, ...livroData }).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Registro alterado com sucesso', 'Fechar', { duration: 3000 })
            this.livroService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao atualizar registro:', err);
            this.snackBar.open('Erro ao alterar o registro', 'Fechar', { duration: 3000 })
          }
        })
      } else {
        this.livroService.salvarNovo(livroData).subscribe({
          next: res => {
            this.dialogRef.close();
            this.snackBar.open('Novo livro cadastrado com sucesso', 'Fechar', { duration: 3000 })
            this.livroService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao salvar livro:', err)
            this.snackBar.open('Erro ao cadastrar livro, tente novamente', 'Fechar', { duration: 3000 })
          }
        }) 
      }
    }
  }
}

