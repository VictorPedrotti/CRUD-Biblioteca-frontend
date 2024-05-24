import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { Avaliacao } from '../../paginas/avaliacoes/avaliacao';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService extends Service<Avaliacao>{

  private static readonly apiUrl = 'http://localhost:3000/avaliacoes';

  constructor(http: HttpClient) {
    super(http, AvaliacaoService.apiUrl);
  }
}
