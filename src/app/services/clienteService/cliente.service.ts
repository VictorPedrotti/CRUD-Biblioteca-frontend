import { Injectable } from '@angular/core';
import { Service } from '../service';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../../paginas/clientes/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends Service<Cliente> {

  private static readonly apiUrl = 'http://localhost:3000/clientes';

  constructor(http: HttpClient) {
    super(http, ClienteService.apiUrl);
  }
}
