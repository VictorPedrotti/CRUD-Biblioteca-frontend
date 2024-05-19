import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { AutorService } from '../../services/autorService/autor.service';
import { Autor } from './autor';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-autores',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HttpClientModule,
    MatIconModule,
  ],
  templateUrl: './autores.component.html',
  styleUrl: './autores.component.css'
})
export class AutoresComponent implements OnInit {

  autores: Autor[] = [];

  constructor(private autorService: AutorService) {}
  
  ngOnInit() {
    this.autorService.obterTodos().subscribe((listaAutores) => {
      this.autores = listaAutores;
    });
  }
}
