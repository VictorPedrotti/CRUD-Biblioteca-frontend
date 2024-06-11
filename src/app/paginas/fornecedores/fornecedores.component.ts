import { Component, OnInit } from '@angular/core';
import { Fornecedor } from './fornecedor';
import { FornecedorService } from '../../services/fornecedorService/fornecedor.service';
import { TabelaComponent } from "../../componentes/tabela/tabela.component";

@Component({
    selector: 'app-fornecedores',
    standalone: true,
    templateUrl: './fornecedores.component.html',
    styleUrl: './fornecedores.component.css',
    imports: [TabelaComponent]
})
export class FornecedoresComponent implements OnInit {

  fornecedores: Fornecedor[] = [];
  colunasTabela: string[] = ['Nome', 'Telefone', 'E-mail', 'Ações'];

  mapeamentoColunas: { [key: string]: string } = {
    'Nome': 'nome',
    'Telefone': 'telefone',
    'E-mail': 'email'
  };

  constructor(private fornecedorService: FornecedorService) {}

  ngOnInit(): void {
    this.fornecedorService.obterTodos().subscribe((listaFornecedores) => {
      this.fornecedores = listaFornecedores;
    });
  }
}