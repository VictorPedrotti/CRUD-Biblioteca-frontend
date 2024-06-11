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

  ) {}

  @Input() colunas: string[] = [];
  @Input() dados: any[] = [];
  @Input() mapeamentoColunas: { [key: string]: string } = {};

  dataSource = new MatTableDataSource<any>();

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

  excluirRegistro(row: any) {
    const servico = this.dialogService.formularioPorRotaAtiva()?.servico
    if(confirm('Tem certeza que deseja excluir esse registro?')) {
      servico.excluirRegistro(row.id).subscribe(() => {
        this.snackBar.open('Registro excluído com sucesso', 'Fechar', { duration: 3000 })
      },
      (error: HttpErrorResponse) => {
        console.error('Erro ao excluir registro', error);
        this.snackBar.open('Erro ao excluir registro', 'Fechar', { duration: 3000 });
      }
    )
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
}