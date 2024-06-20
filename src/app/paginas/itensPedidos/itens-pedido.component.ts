import { Component, OnInit } from '@angular/core';
import { ItensPedido } from './itens-pedido';
import { PedidoService } from '../../services/pedidoService/pedido.service';
import { ActivatedRoute } from '@angular/router';
import { TabelaComponent } from "../../componentes/tabela/tabela.component";
import { LivroService } from '../../services/livroService/livro.service';

@Component({
    selector: 'app-itens-pedido',
    standalone: true,
    templateUrl: './itens-pedido.component.html',
    styleUrl: './itens-pedido.component.css',
    imports: [TabelaComponent]
})
export class ItensPedidoComponent implements OnInit {

  colunasTabela: string[] = ['Livro', 'Quantidade', 'Preço Unitário', 'Subtotal']
  itensPedidos: ItensPedido[] = [];
  id!: number;
  
  mapeamentoColunas: { [key: string]: string } = {
    'Livro': 'livro_id',
    'Quantidade': 'quantidade',
    'Preço Unitário': 'preco_unitario',
    'Subtotal': 'subtotal'
  };

  constructor(
    private pedidoService: PedidoService, 
    private route: ActivatedRoute,
    private livroService: LivroService
  
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.listarItensPedido();
  }

  listarItensPedido() {
    this.pedidoService.buscarItensPorPedidoId(this.id).subscribe((itensPedidos: ItensPedido[]) => {
      this.itensPedidos = itensPedidos;
    })
  }

}
