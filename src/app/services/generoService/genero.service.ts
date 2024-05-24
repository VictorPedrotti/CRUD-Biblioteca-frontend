import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { Genero } from '../../paginas/generos/genero';

@Injectable({
  providedIn: 'root'
})
export class GeneroService extends Service<Genero> {

  private static readonly apiUrl = 'http://localhost:3000/generos';

  constructor(http: HttpClient) {
    super(http, GeneroService.apiUrl);
  }
}
