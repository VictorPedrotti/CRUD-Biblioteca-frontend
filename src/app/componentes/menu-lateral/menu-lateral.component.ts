import { Component, Input, OnInit, computed, signal} from '@angular/core';
import { MenuItem } from './menu-lateral.interface';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent implements OnInit{

  menuLateralCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.menuLateralCollapsed.set(val);
  }

  menuItens = signal<MenuItem[]>([])

  ngOnInit(){
    this.menuItens.set([
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
      {
        descricao: "Fornecedores",
        icone: "local_shipping",
        rota: "/fornecedores"
      },
      {
        descricao: "Avaliações",
        icone: "star_rate",
        rota: "/avaliacoes"
      }
    ])
  }


    logoBiblioteca = computed(() => this.menuLateralCollapsed() ? '32' : '100')
  }