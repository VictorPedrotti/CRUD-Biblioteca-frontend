import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { ComponentType } from '@angular/cdk/overlay';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MenuLateralComponent } from "./componentes/menu-lateral/menu-lateral.component";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormularioAutorComponent } from './formularios/formulario-autor/formulario-autor.component';
import { FormularioEditoraComponent } from './formularios/formulario-editora/formulario-editora.component';
import { FormularioGeneroComponent } from './formularios/formulario-genero/formulario-genero.component';
import { FormularioClienteComponent } from './formularios/formulario-cliente/formulario-cliente.component';
import { FormularioLivroComponent } from './formularios/formulario-livro/formulario-livro.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
        CommonModule,
        RouterOutlet,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MenuLateralComponent,
    ]
})
export class AppComponent {
  title = 'biblioteca';
  
  constructor(private dialog: MatDialog, private router: Router) {

  }
  collapsed = signal(false);

  sidenavWidth = computed(() => (
    this.collapsed() ? '65px' : '250px'));

      
  abrirCaixaDeFormulario() {

    const rotaAtiva = this.router.url;
    let componenteFormulario: ComponentType<any> | undefined;

    switch (rotaAtiva) {
      case '/livros':
        componenteFormulario = FormularioLivroComponent;
        break;
      case '/autores':
        componenteFormulario = FormularioAutorComponent;
        break;
      case '/generos':
        componenteFormulario =  FormularioGeneroComponent;
        break;
      case '/clientes':
        componenteFormulario =  FormularioClienteComponent;
        break;
      case '/editoras':
        componenteFormulario =  FormularioEditoraComponent;
        break;
    }

    if (componenteFormulario){
      this.dialog.open(componenteFormulario, {
        width:'30%',
      })
    }
    
  }
}
