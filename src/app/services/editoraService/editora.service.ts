import { Injectable } from '@angular/core';
import { Service } from '../service';
import { HttpClient } from '@angular/common/http';
import { Editora } from '../../paginas/editoras/editora';
import { Livro } from '../../paginas/livros/livro';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditoraService extends Service<Editora>{

  private static readonly apiUrl = 'http://localhost:3000/editoras';

  constructor(http: HttpClient) { 
    super(http, EditoraService.apiUrl);
  }

  buscarLivrosPorEditoraId(id: number): Observable<Livro[]> {
    const url =`${EditoraService.apiUrl}/${id}/livros`
    return this.http.get<Livro[]>(url).pipe(
    );
  }
}
