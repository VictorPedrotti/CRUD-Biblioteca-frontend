import { Component, OnInit } from '@angular/core';
import { TabelaComponent } from '../../componentes/tabela/tabela.component';
import { Editora } from './editora';
import { EditoraService } from '../../services/editoraService/editora.service';

@Component({
  selector: 'app-editoras',
  standalone: true,
  imports: [
    TabelaComponent
  ],
  templateUrl: './editoras.component.html',
  styleUrl: './editoras.component.css'
})
export class EditorasComponent implements OnInit {

  editoras: Editora[] = []; 
  colunasTabela: string[] = ['Nome', 'Data de Fundação', 'Ações'];

  mapeamentoColunas: { [key: string]: string } = {
    'Nome': 'nome',
    'Data de Fundação': 'data_fundacao'
  };

  constructor(private editoraService: EditoraService) {
    this.editoraService.acao$.subscribe(({
      next: (res) => {
        this.listarEditoras()
      }
    }))
  }

  ngOnInit() {
   this.listarEditoras(); 
  }

  listarEditoras(){
    this.editoraService.obterTodos().subscribe((listaEditoras) => {
      this.editoras = listaEditoras;
    });
  }
}
