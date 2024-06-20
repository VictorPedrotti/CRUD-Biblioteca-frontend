import { Component, Inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { Livro } from '../../paginas/livros/livro';
import { LivroService } from '../../services/livroService/livro.service';
import { ItensPedidoService } from '../../services/itensPedidoService/itens-pedido.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PedidoService } from '../../services/pedidoService/pedido.service';
import { ItensPedido } from '../../paginas/itensPedidos/itens-pedido';

@Component({
  selector: 'app-formulario-itens-pedido',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './formulario-itens-pedido.component.html',
  styleUrl: './formulario-itens-pedido.component.css'
})
export class FormularioItensPedidoComponent implements OnInit {

  itensPedidoForm!: FormGroup;
  livros: Livro[] = [];
  itensPedido: ItensPedido[] = [];

  constructor(
    private livroService: LivroService,
    private itensPedidoService: ItensPedidoService,
    private pedidoService: PedidoService,
    private dialogRef: MatDialogRef<FormularioItensPedidoComponent>,
    private snackBar: MatSnackBar, 
    @Inject(MAT_DIALOG_DATA) public dados: { id: number }

  ) {}
  
  ngOnInit(): void {
    
    this.carregarLivros();

    this.itensPedidoForm = new FormGroup({
      pedido_id: new FormControl({value: this.dados.id || '', disabled: true }),
      livro_id: new FormControl('', Validators.required),
      quantidade: new FormControl('', [Validators.required, Validators.min(1)])
    })
  }

  carregarLivros() {
    this.livroService.obterTodos().subscribe((livros: Livro[]) => {
      this.livros = livros;
    });
  }

  ProcessarItensPedido() {
    if (this.itensPedidoForm.valid) {

      this.itensPedidoForm.get('pedido_id')?.enable();
      const valorForm = this.itensPedidoForm.value;
      this.itensPedidoForm.get('pedido_id')?.disable();

      this.livroService.buscarPorId(valorForm.livro_id).subscribe((livro) => {
        const preco_unitario = livro.preco;
        const subtotal = (preco_unitario * valorForm.quantidade).toFixed(2);

        const itensPedidoData = {
          ...valorForm,
          preco_unitario: preco_unitario,
          subtotal: subtotal
        }

        this.salvarItensPedido(itensPedidoData);
      })

    }
  }

  salvarItensPedido(dados: any) {

    this.itensPedidoService.salvarNovo(dados).subscribe({
      next: res => {
        this.dialogRef.close();
        this.snackBar.open('Itens pedido salvos com sucesso', 'Fechar', { duration: 3000 })
        this.itensPedidoService.atualizaConsulta.next(1);

        this.atualizarTotalPedido(dados);
      },
      error: err => {
        console.error('Erro ao salvar itens do pedido:', err)
        this.snackBar.open('Erro ao salvar itens do pedido, por favor tente novamente', 'Fechar', { duration: 3000 })
      }
    })
  }

  atualizarTotalPedido(dados: any) {
    this.pedidoService.buscarItensPorPedidoId(Number(dados.pedido_id)).subscribe((itensPedido: ItensPedido[]) => {
      this.itensPedido = itensPedido;

      const valorTotalPedido = itensPedido.reduce((total, item) => total + item.subtotal, 0)

      this.pedidoService.buscarPorId(Number(dados.pedido_id)).subscribe((pedido) => {
        const pedidoData = {
          ...pedido,
          total: valorTotalPedido
        }

        this.pedidoService.editarRegistro(pedidoData).subscribe({
          next: res => {
            this.pedidoService.atualizaConsulta.next(1);
          },
          error: err => {
            console.error('Erro ao atualizar registro:', err);
          }
        })
      })
    })
  }
}
