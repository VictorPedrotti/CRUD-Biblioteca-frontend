import { Routes } from '@angular/router';
import { LivrosComponent } from './paginas/livros/livros.component';
import { AutoresComponent } from './paginas/autores/autores.component';
import { GenerosComponent } from './paginas/generos/generos.component';
import { ClientesComponent } from './paginas/clientes/clientes.component';
import { PedidosComponent } from './paginas/pedidos/pedidos.component';
import { EditorasComponent } from './paginas/editoras/editoras.component';
import { FornecedoresComponent } from './paginas/fornecedores/fornecedores.component';
import { FormasPagamentoComponent } from './paginas/formas-pagamento/formas-pagamento.component';
import { AvaliacoesComponent } from './paginas/avaliacoes/avaliacoes.component';
import { ItensPedidoComponent } from './paginas/itensPedidos/itens-pedido.component';

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
  },
  {
    path: 'fornecedores',
    component: FornecedoresComponent
  },
  {
    path: 'formasPagamento',
    component: FormasPagamentoComponent
  },
  {
    path: 'avaliacoes',
    component: AvaliacoesComponent
  },
  {
    path: 'pedidos/:id/itens',
    component: ItensPedidoComponent
  }
];