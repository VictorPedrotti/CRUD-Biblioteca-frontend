import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from '../../services/clienteService/cliente.service';
import { TabelaComponent } from "../../componentes/tabela/tabela.component";

@Component({
    selector: 'app-clientes',
    standalone: true,
    templateUrl: './clientes.component.html',
    styleUrl: './clientes.component.css',
    imports: [TabelaComponent]
})
export class ClientesComponent implements OnInit{

  colunasTabela: string[] = ['Nome', 'CPF', 'E-mail', 'Telefone']
  clientes: Cliente[] = [];
  
  mapeamentoColunas: { [key: string]: string } = {
    'Nome': 'nome',
    'CPF': 'cpf',
    'E-mail': 'email',
    'Telefone': 'telefone',
  };

  constructor(private clienteService: ClienteService) {}
  
  ngOnInit(): void {
    this.clienteService.obterTodos().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    })
  }
}
