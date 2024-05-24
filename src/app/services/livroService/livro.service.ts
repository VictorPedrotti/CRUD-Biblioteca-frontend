import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { Livro } from '../../paginas/livros/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService extends Service<Livro> {

  private static readonly apiUrl = 'http://localhost:3000/livros';

  constructor(http: HttpClient) {
    super(http, LivroService.apiUrl);
  }
}
