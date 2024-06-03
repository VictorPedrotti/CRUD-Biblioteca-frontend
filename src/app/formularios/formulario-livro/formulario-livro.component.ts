import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
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

  constructor(
    private editoraService: EditoraService, 
    private autorService: AutorService,
    private generoService: GeneroService,
    private fornecedorService: FornecedorService

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
    console.log(this.livroForm)
  }
}

