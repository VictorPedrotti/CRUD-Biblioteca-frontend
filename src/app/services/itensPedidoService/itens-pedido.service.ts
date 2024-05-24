import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { ItensPedido } from '../../paginas/itensPedidos/itens-pedido';

@Injectable({
  providedIn: 'root'
})
export class ItensPedidoService extends Service<ItensPedido> {

  private static readonly apiUrl = 'http://localhost:3000/itensPedidos';

  constructor(http: HttpClient) {
    super(http, ItensPedidoService.apiUrl);
  }
}
