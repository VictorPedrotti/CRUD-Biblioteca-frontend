import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Inject } from '@angular/core';
import { Observable } from 'rxjs';

export const API = new InjectionToken<string>('apiUrl')

@Injectable({
  providedIn: 'root'
})

export class Service<T> {

  constructor(private http: HttpClient, @Inject(API) private apiUrl: string) {}

  obterTodos(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<T> {
    const url =`${this.apiUrl}/${id}`
    return this.http.get<T>(url)
  }

  salvarNovo(modelo: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, modelo);
  }

  excluirRegistro(id: number): Observable<T> {
    const url =`${this.apiUrl}/${id}`
    return this.http.delete<T>(url)
  }

  editarRegistro(modelo: T): Observable<T> {
    const url =`${this.apiUrl}/${(modelo as any).id}`
    return this.http.put<T>(url, modelo)
  }
}
