import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { AutorService } from '../../services/autorService/autor.service';
import { Autor } from './autor';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { TabelaComponent } from '../../componentes/tabela/tabela.component';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    MatIconModule,
    MatTableModule,
    TabelaComponent
  ],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit {

  autores: Autor[] = [];
  colunasTabela: string[] = ['Nome', 'Nacionalidade', 'Data de Nascimento'];

  mapeamentoColunas: { [key: string]: string } = {
    'Nome': 'nome',
    'Nacionalidade': 'nacionalidade',
    'Data de Nascimento': 'data_nascimento'
  };


  constructor(private autorService: AutorService) {}
  
  ngOnInit() {
    this.autorService.obterTodos().subscribe((listaAutores) => {
      this.autores = listaAutores;
    });
  }
}
