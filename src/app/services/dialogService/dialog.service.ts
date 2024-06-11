import { Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { FormularioLivroComponent } from '../../formularios/formulario-livro/formulario-livro.component';
import { FormularioAutorComponent } from '../../formularios/formulario-autor/formulario-autor.component';
import { FormularioGeneroComponent } from '../../formularios/formulario-genero/formulario-genero.component';
import { FormularioClienteComponent } from '../../formularios/formulario-cliente/formulario-cliente.component';
import { FormularioEditoraComponent } from '../../formularios/formulario-editora/formulario-editora.component';
import { FormularioFornecedorComponent } from '../../formularios/formulario-fornecedor/formulario-fornecedor.component';
import { FormularioAvaliacaoComponent } from '../../formularios/formulario-avaliacao/formulario-avaliacao.component';
import { Router } from '@angular/router';
import { AutorService } from '../autorService/autor.service';
import { LivroService } from '../livroService/livro.service';
import { GeneroService } from '../generoService/genero.service';
import { ClienteService } from '../clienteService/cliente.service';
import { EditoraService } from '../editoraService/editora.service';
import { FornecedorService } from '../fornecedorService/fornecedor.service';
import { AvaliacaoService } from '../avaliacaoService/avaliacao.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog, 
    private router: Router,
    private livroService: LivroService,
    private autorService: AutorService,
    private generoService: GeneroService,
    private clienteService: ClienteService,
    private editoraService: EditoraService,
    private fornecedorService: FornecedorService,
    private avaliacaoService: AvaliacaoService
  ) {}

  formularioPorRotaAtiva(): {componente: ComponentType<any>, servico: any }| undefined {
    const rotaAtiva = this.router.url;

    switch (rotaAtiva) {
      case '/livros':
        return {componente: FormularioLivroComponent, servico: this.livroService};
        break;
      case '/autores':
        return {componente: FormularioAutorComponent, servico: this.autorService };
        break;
      case '/generos':
        return {componente: FormularioGeneroComponent, servico: this.generoService};
        break;
      case '/clientes':
        return {componente: FormularioClienteComponent, servico: this.clienteService};
        break;
      case '/editoras':
        return {componente: FormularioEditoraComponent, servico: this.editoraService};
        break;
      case '/fornecedores':
        return {componente: FormularioFornecedorComponent, servico: this.fornecedorService};
        break;
      case '/avaliacoes':
        return {componente: FormularioAvaliacaoComponent, servico: this.avaliacaoService};
      default:
        return undefined;
    }
  }

  abrirDialogEdicao(dados: any){
    const componente = this.formularioPorRotaAtiva()?.componente;
    if(componente){
      this.dialog.open(componente, {
        width: '30%',
        data: dados
      })
    }
  }

  abrirDialogVazio(){
    const componente = this.formularioPorRotaAtiva()?.componente;
    
    if(componente){
      this.dialog.open(componente, {
        width: '30%',
        data: { estaEditando: false }
      })
    }
  }
}
