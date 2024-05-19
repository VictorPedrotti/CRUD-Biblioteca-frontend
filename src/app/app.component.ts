import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MenuLateralComponent } from "./componentes/menu-lateral/menu-lateral.component";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { CaixaDialogoComponent } from './componentes/caixa-dialogo/caixa-dialogo.component';

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
        MenuLateralComponent
    ]
})
export class AppComponent {
  title = 'biblioteca';
  
  constructor(private dialog: MatDialog) {

  }
  collapsed = signal(false);

  sidenavWidth = computed(() => (
    this.collapsed() ? '65px' : '250px'));

      
  abrirCaixaDeFormulario() {
    this.dialog.open(CaixaDialogoComponent, {
        width:'30%'
    })
  }
}
