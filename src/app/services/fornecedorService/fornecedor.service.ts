import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { Fornecedor } from '../../paginas/fornecedores/fornecedor';
import { Livro } from '../../paginas/livros/livro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService extends Service<Fornecedor> {

  private static readonly apiUrl = 'http://localhost:3000/fornecedores';

  constructor(http: HttpClient) {
    super(http, FornecedorService.apiUrl);
  }

  buscarLivrosPorFornecedorId(id: number): Observable<Livro[]> {
    const url =`${FornecedorService.apiUrl}/${id}/livros`
    return this.http.get<Livro[]>(url).pipe(
    );
  }
}
