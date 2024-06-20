import { Injectable } from '@angular/core';
import { Service } from '../service';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../paginas/clientes/cliente';
import { Pedido } from '../../paginas/pedidos/pedido';
import { Observable } from 'rxjs';
import { Avaliacao } from '../../paginas/avaliacoes/avaliacao';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends Service<Cliente> {

  private static readonly apiUrl = 'http://localhost:3000/clientes';

  constructor(http: HttpClient) {
    super(http, ClienteService.apiUrl);
  }

  buscarPedidosPorClienteId(id: number): Observable<Pedido[]> {
    const url =`${ClienteService.apiUrl}/${id}/pedidos`
    return this.http.get<Pedido[]>(url).pipe(
    );
  }

  buscarAvaliacoesPorClienteId(id: number): Observable<Avaliacao[]> {
    const url =`${ClienteService.apiUrl}/${id}/avaliacoes`
    return this.http.get<Avaliacao[]>(url).pipe(
    );
  }
}
