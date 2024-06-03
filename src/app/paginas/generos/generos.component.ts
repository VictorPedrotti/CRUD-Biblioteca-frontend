import { Component, OnInit } from '@angular/core';
import { TabelaComponent } from "../../componentes/tabela/tabela.component";
import { GeneroService } from '../../services/generoService/genero.service';
import { Genero } from './genero';

@Component({
    selector: 'app-generos',
    standalone: true,
    templateUrl: './generos.component.html',
    styleUrl: './generos.component.css',
    imports: [TabelaComponent]
})
export class GenerosComponent implements OnInit{

  colunasTabela: string[] = ['Descrição']
  generos: Genero[] = [];
  
  mapeamentoColunas: { [key: string]: string } = {
    'Descrição': 'descricao'
  };

  constructor(private generoService: GeneroService) {}

  ngOnInit(): void {
    this.generoService.obterTodos().subscribe((generos: Genero[]) => {
      this.generos = generos;
    })
  }
}
