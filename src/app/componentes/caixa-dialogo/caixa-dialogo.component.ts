import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';


@Component({
  selector: 'app-caixa-dialogo',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './caixa-dialogo.component.html',
  styleUrl: './caixa-dialogo.component.css'
})
export class CaixaDialogoComponent {

}
