import { Component } from '@angular/core';
import { Pedido } from './pedido';
import { PedidoService } from '../../services/pedidoService/pedido.service';
import { TabelaComponent } from "../../componentes/tabela/tabela.component";

@Component({
    selector: 'app-pedidos',
    standalone: true,
    templateUrl: './pedidos.component.html',
    styleUrl: './pedidos.component.css',
    imports: [TabelaComponent]
})
export class PedidosComponent {

  pedidos: Pedido[] = [];
  colunasTabela: string[] = ['Data do Pedido', 'Valor Total', 'Cliente', 'Forma de Pagamento', 'Itens Pedido'];

  mapeamentoColunas: { [key: string]: string } = {
    'Data do Pedido': 'data_pedido',
    'Valor Total': 'total',
    'Cliente': 'cliente_id',
    'Forma de Pagamento': 'forma_pagamento_id'
  };

  constructor(private pedidoService: PedidoService) {
    this.pedidoService.acao$.subscribe(({
      next: (res) => {
        this.listarPedidos()
      }
    }))
  }

  ngOnInit() {
    this.listarPedidos(); 
  }

  listarPedidos() {
    this.pedidoService.obterTodos().subscribe((listaPedidos) => {
      this.pedidos = listaPedidos;
    });
  }
}

