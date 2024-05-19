import { Injectable } from '@angular/core';
import { Service } from '../service';
import { HttpClient } from '@angular/common/http';
import { Editora } from '../../paginas/editoras/editora';

@Injectable({
  providedIn: 'root'
})
export class EditoraService extends Service<Editora>{

  private static readonly apiUrl = 'http://localhost:3000/editoras';

  constructor(http: HttpClient) { 
    super(http, EditoraService.apiUrl);
  }
}
