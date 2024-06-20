import { Component } from '@angular/core';
import { Avaliacao } from './avaliacao';
import { AvaliacaoService } from '../../services/avaliacaoService/avaliacao.service';
import { TabelaComponent } from "../../componentes/tabela/tabela.component";

@Component({
    selector: 'app-avaliacoes',
    standalone: true,
    templateUrl: './avaliacoes.component.html',
    styleUrl: './avaliacoes.component.css',
    imports: [TabelaComponent]
})
export class AvaliacoesComponent {

  avaliacoes: Avaliacao[] = [];
  colunasTabela: string[] = ['Cliente', 'Livro', 'Data da avaliação', 'Avaliação', 'Comentário', 'Ações'];

  mapeamentoColunas: { [key: string]: string } = {
    'Cliente': 'cliente_id',
    'Livro': 'livro_id',
    'Data da avaliação': 'data_avaliacao',
    'Avaliação': 'avaliacao',
    'Comentário': 'comentario'
  };

  constructor(private avaliacaoService: AvaliacaoService) {
    this.avaliacaoService.acao$.subscribe(({
      next: (res) => {
        this.listarAvaliacoes()
      }
    }))
  }

  ngOnInit(): void {
    this.listarAvaliacoes();
  } 

  listarAvaliacoes() {
    this.avaliacaoService.obterTodos().subscribe((listaAvaliacoes) => {
      this.avaliacoes = listaAvaliacoes;
    });
  }

}