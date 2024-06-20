import { Component, AfterViewInit, ViewChild, OnInit, Input, ChangeDetectorRef, Inject} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from '../../services/dialogService/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutorService } from '../../services/autorService/autor.service';
import { Livro } from '../../paginas/livros/livro';
import { ClienteService } from '../../services/clienteService/cliente.service';
import { Pedido } from '../../paginas/pedidos/pedido';
import { Avaliacao } from '../../paginas/avaliacoes/avaliacao';
import { FornecedorService } from '../../services/fornecedorService/fornecedor.service';
import { EditoraService } from '../../services/editoraService/editora.service';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ],
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.css']
})
export class TabelaComponent implements OnInit, AfterViewInit {

  constructor(
    private cdr: ChangeDetectorRef, 
    private dialogService: DialogService,
    private snackBar: MatSnackBar,
    private router: Router,
    private autorService: AutorService,
    private clienteService: ClienteService,
    private fornecedorService: FornecedorService,
    private editoraService: EditoraService

  ) {}

  @Input() colunas: string[] = [];
  @Input() dados: any[] = [];
  @Input() mapeamentoColunas: { [key: string]: string } = {};

  dataSource = new MatTableDataSource<any>();
  listaLivros: Livro[] = [];
  listaPedidos: Pedido[] = [];
  listaAvaliacoes: Avaliacao[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.dataSource.data = this.dados;
  }

  ngOnChanges() {
    this.dataSource.data = this.dados;
    this.cdr.detectChanges()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editarRegistro(row: any) {
    const dados = { registro: row, estaEditando: true };
    this.dialogService.abrirDialogEdicao(dados) 
  }

  async validarAutorComLivros(id: number): Promise<boolean> {
    const listaLivros = await this.autorService.buscarLivrosPorAutorId(id).toPromise();
    return (listaLivros ?? []).length > 0;
  }

  async validarFornecedorComLivros(id: number): Promise<boolean> {
    const listaLivrosFornecedor = await this.fornecedorService.buscarLivrosPorFornecedorId(id).toPromise();
    return (listaLivrosFornecedor ?? []).length > 0;
  }

  async validarEditoraComLivros(id: number): Promise<boolean> {
    const listaLivrosEditora = await this.editoraService.buscarLivrosPorEditoraId(id).toPromise();
    return (listaLivrosEditora ?? []).length > 0;
  }
  
  async validarClienteComPedidosEAvaliacoes(id: number): Promise<boolean> {
    const [listaPedidos, listaAvaliacoes] = await Promise.all([
      this.clienteService.buscarPedidosPorClienteId(id).toPromise(),
      this.clienteService.buscarAvaliacoesPorClienteId(id).toPromise()
    ]);
  
    return (listaPedidos ?? []).length > 0 || (listaAvaliacoes ?? []).length > 0;
  }
  
  async excluirRegistro(row: any) {
    const servico = this.dialogService.formularioPorRotaAtiva()?.servico;
  
    if (servico === this.autorService) {
      const temLivros = await this.validarAutorComLivros(row.id);
      if (temLivros) {
        this.snackBar.open('O autor possui livros de sua autoria cadastrados, não é possível excluir', 'Fechar', { duration: 3000 });
        return;
      }
    }
  
    if (servico === this.clienteService) {
      const temPedidosOuAvaliacoes = await this.validarClienteComPedidosEAvaliacoes(row.id);
      if (temPedidosOuAvaliacoes) {
        this.snackBar.open('O cliente possui avaliações ou pedidos cadastrados, não é possível excluir', 'Fechar', { duration: 3000 });
        return;
      }
    }

    if (servico === this.editoraService) {
      const temLivrosEditora = await this.validarEditoraComLivros(row.id);
      if (temLivrosEditora) {
        this.snackBar.open('A editora possui livros associados, não é possível excluir', 'Fechar', { duration: 3000 });
        return;
      }
    }

    if (servico === this.fornecedorService) {
      const temLivrosFornecedor = await this.validarFornecedorComLivros(row.id);
        if (temLivrosFornecedor) {
          this.snackBar.open('O fornecedor possui livros associados, não é possível excluir', 'Fechar', { duration: 3000 });
          return;
        }
      }
  
    if (confirm('Tem certeza que deseja excluir esse registro?')) {
      try {
        await servico.excluirRegistro(row.id).toPromise();
        this.snackBar.open('Registro excluído com sucesso', 'Fechar', { duration: 3000 });
        servico.atualizaConsulta.next(1);
      } catch (error) {
        console.error('Erro ao excluir registro', error);
        this.snackBar.open('Erro ao excluir registro', 'Fechar', { duration: 3000 });
      }
    }
  }

  formatarData(data: string): string {
    if (!data) return '';
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  filtrarColunasData(): string[] {
 
    return this.colunas.filter(coluna => coluna.includes('Data'));
  }

  adicionarItensPedido(row: any) {
    const id = row.id
    this.dialogService.dialogItensPedido({ id });
  }


  visualizarItensPedido(row: any) {
    const id = row.id
    this.router.navigate([`/pedidos/${id}/itens`]);
  }
}