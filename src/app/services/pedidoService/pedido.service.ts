import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { Pedido } from '../../paginas/pedidos/pedido';
import { ItensPedido } from '../../paginas/itensPedidos/itens-pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends Service<Pedido> {

  private static readonly apiUrl = 'http://localhost:3000/pedidos';

  constructor(http: HttpClient) {
    super(http, PedidoService.apiUrl);
  }
  
  buscarItensPorPedidoId(id: number): Observable<ItensPedido[]> {
    const url =`${PedidoService.apiUrl}/${id}/itens`
    return this.http.get<ItensPedido[]>(url).pipe(
    );
  } 
}
