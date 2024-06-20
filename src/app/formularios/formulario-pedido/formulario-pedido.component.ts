import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PedidoService } from '../../services/pedidoService/pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ClienteService } from '../../services/clienteService/cliente.service';
import { FormaPagamentoService } from '../../services/formaPagamentoService/forma-pagamento.service';
import { Cliente } from '../../paginas/clientes/cliente';
import { FormaPagamento } from '../../paginas/formas-pagamento/forma-pagamento';

@Component({
  selector: 'app-formulario-pedido',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './formulario-pedido.component.html',
  styleUrl: './formulario-pedido.component.css'
})
export class FormularioPedidoComponent implements OnInit {

  pedidoForm!: FormGroup;
  clientes: Cliente[] = [];
  formasPagamento: FormaPagamento[] = [];
  
  constructor(
    private pedidoService: PedidoService,
    private clienteService: ClienteService,
    private formaPagamentoService: FormaPagamentoService,
    private dialogRef: MatDialogRef<FormularioPedidoComponent>,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,  

  ) {}

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarFormaPagamento();

    this.pedidoForm = new FormGroup({
      data_pedido: new FormControl('', Validators.required),
      cliente_id: new FormControl('', Validators.required),
      forma_pagamento_id: new FormControl('', Validators.required),
    })
  }

  carregarClientes(): void {
    this.clienteService.obterTodos().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    })
  }

  carregarFormaPagamento(): void {
    this.formaPagamentoService.obterTodos().subscribe((formasPagamento: FormaPagamento[]) => {
      this.formasPagamento = formasPagamento;
    })
  }

  salvarPedido() {
    if(this.pedidoForm.valid){
      const valorForm = this.pedidoForm.value;
      const DataFormatada = this.datePipe.transform(valorForm.data_pedido, 'yyyy-MM-dd')
      const pedidoData = {
        ...valorForm,
        total: 0,
        data_pedido: DataFormatada
      };

      this.pedidoService.salvarNovo(pedidoData).subscribe({
        next: res => {
          this.dialogRef.close();
          this.snackBar.open('Novo pedido cadastrado com sucesso', 'Fechar', { duration: 3000 })
          this.pedidoService.atualizaConsulta.next(1);
        },
        error: err => {
          console.error('Erro ao salvar pedido:', err)
          this.snackBar.open('Erro ao cadastrar pedido, tente novamente', 'Fechar', { duration: 3000 })
        }
      }) 
    }
  }
}
