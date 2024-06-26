import { Component, OnInit } from '@angular/core';
import { Livro } from './livro';
import { LivroService } from '../../services/livroService/livro.service';
import { TabelaComponent } from "../../componentes/tabela/tabela.component";

@Component({
    selector: 'app-livros',
    standalone: true,
    templateUrl: './livros.component.html',
    styleUrl: './livros.component.css',
    imports: [TabelaComponent]
})
export class LivrosComponent implements OnInit{

  colunasTabela: string[] = ['Título', 'Data de Publicação', 'Preço', 'Número de Páginas', 'Gênero', 'Editora', 'Autor', 'Fornecedor', 'Ações'];
  livros: Livro[] = [];

  mapeamentoColunas: { [key: string]: string } = {
    'Título': 'titulo',
    'Data de Publicação': 'data_publicacao',
    'Preço': 'preco',
    'Número de Páginas': 'numero_paginas',
    'Gênero': 'genero_id',
    'Editora': 'editora_id',
    'Autor': 'autor_id',
    'Fornecedor': 'fornecedor_id',
  };

  constructor(private livroService: LivroService) {
    this.livroService.acao$.subscribe(({
      next: (res) => {
        this.listarLivros()
      }
    }))
  }
  
  ngOnInit(): void {
    this.listarLivros();
  }

  listarLivros() {
    this.livroService.obterTodos().subscribe((livros: Livro[]) => {
      this.livros = livros;
    })
  }

}
