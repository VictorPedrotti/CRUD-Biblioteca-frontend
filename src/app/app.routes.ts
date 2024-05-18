import { Routes } from '@angular/router';
import { LivrosComponent } from './paginas/livros/livros.component';
import { AutoresComponent } from './paginas/autores/autores.component';
import { GenerosComponent } from './paginas/generos/generos.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { EditorasComponent } from './paginas/editoras/editoras.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'livros'
  },
  {
    path: 'livros',
    component: LivrosComponent
  },
  {
    path: 'autores',
    component: AutoresComponent
  },
  {
    path: 'generos',
    component: GenerosComponent
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'pedidos',
    component: PedidosComponent
  },
  {
    path: 'editoras',
    component: EditorasComponent
  }
];
