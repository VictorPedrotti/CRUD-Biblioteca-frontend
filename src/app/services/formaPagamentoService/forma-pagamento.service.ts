import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { FormaPagamento } from '../../paginas/formasPagamento/forma-pagamento';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService extends Service<FormaPagamento>{

  private static readonly apiUrl = 'http://localhost:3000/formasPagamento';

  constructor(http: HttpClient) {
    super(http, FormaPagamentoService.apiUrl);
  }
}
