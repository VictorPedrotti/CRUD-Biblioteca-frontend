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

  ) {
    this.livroForm = new FormGroup({
      titulo: new FormControl('', Validators.required),
      data_publicacao: new FormControl('', Validators.required),
      preco: new FormControl('', [Validators.required, Validators.min(1)]),
      numero_paginas: new FormControl('', Validators.required),
      genero_id: new FormControl('', Validators.required),
      editora_id: new FormControl('', Validators.required),
      autor_id: new FormControl('', Validators.required),
      fornecedor_id: new FormControl('', Validators.required),
    })
  }
  ngOnInit(): void {
    this.carregarEditoras();
    this.carregarAutores();
    this.carregarGeneros();
    this.carregarFornecedores();

    this.titulo = this.dados.estaEditando ? 'Editar livro' : 'Adicionar novo livro';
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
      
      this.livroService.salvarNovo(livroData).subscribe({
        next: res => {
          this.dialogRef.close();
          this.snackBar.open('Novo livro cadastrado com sucesso', 'Fechar', { duration: 3000 })
        },
        error: err => {
          console.error('Erro ao salvar livro:', err)
          this.snackBar.open('Erro ao cadastrar livro, tente novamente', 'Fechar', { duration: 3000 })
        }
      }) 
    }
  }
}

