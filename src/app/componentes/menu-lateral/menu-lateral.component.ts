import { Component, signal } from '@angular/core';
import { MenuItem } from './menu-lateral.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

menuItens: MenuItem[] = []

  ngOnInit() {
    this.menuItens = [
      {
        descricao: "Autores",
        icone: "account_circle",
        rota: "/autores",
      },
      {
        descricao: "Editoras",
        icone: "corporate_fare",
        rota: "/editoras",
      },
      {
        descricao: "Gêneros",
        icone: "library_books",
        rota: "/generos",
      },
      {
        descricao: "Livros",
        icone: "menu_book",
        rota: "/livros",
      },
      {
        descricao: "Clientes",
        icone: "supervisor_account",
        rota: "/clientes",
      },
      {
        descricao: "Pedidos",
        icone: "receipt",
        rota: "/pedidos",
      },
    ]
  }
  
}
