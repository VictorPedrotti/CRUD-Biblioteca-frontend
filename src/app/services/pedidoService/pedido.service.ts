import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { Pedido } from '../../paginas/pedidos/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends Service<Pedido> {

  private static readonly apiUrl = 'http://localhost:3000/livros';

  constructor(http: HttpClient) {
    super(http, PedidoService.apiUrl);
  }
}
