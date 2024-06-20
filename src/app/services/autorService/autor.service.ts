import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service'; 
import { Autor } from '../../paginas/autores/autor'
import { BehaviorSubject, Observable } from 'rxjs';
import { Livro } from '../../paginas/livros/livro';

@Injectable({
  providedIn: 'root'
})
export class AutorService extends Service<Autor>{

  private static readonly apiUrl = 'http://localhost:3000/autores';

  constructor(http: HttpClient) {
    super(http, AutorService.apiUrl);
  }

  buscarLivrosPorAutorId(id: number): Observable<Livro[]> {
    const url =`${AutorService.apiUrl}/${id}/livros`
    return this.http.get<Livro[]>(url).pipe(
    );
  }
}
