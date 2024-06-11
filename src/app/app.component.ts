import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MenuLateralComponent } from "./componentes/menu-lateral/menu-lateral.component";
import { DialogService } from './services/dialogService/dialog.service';

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
  
  constructor(private dialogService: DialogService) {

  }
  collapsed = signal(false);

  sidenavWidth = computed(() => (
    this.collapsed() ? '65px' : '250px'));

  abrirCaixaDeFormulario() {
      this.dialogService.abrirDialogVazio()
    }
  }
