import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { Fornecedor } from '../../paginas/fornecedores/fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends Service<Fornecedor> {

  private static readonly apiUrl = 'http://localhost:3000/fornecedor';

  constructor(http: HttpClient) {
    super(http, FornecedorService.apiUrl);
  }
}
