import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../../paginas/clientes/cliente';
import { Livro } from '../../paginas/livros/livro';
import { LivroService } from '../../services/livroService/livro.service';
import { ClienteService } from '../../services/clienteService/cliente.service';
import { MatSelectModule } from '@angular/material/select';
import { AvaliacaoService } from '../../services/avaliacaoService/avaliacao.service';

@Component({
  selector: 'app-formulario-avaliacao',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './formulario-avaliacao.component.html',
  styleUrl: './formulario-avaliacao.component.css'
})
export class FormularioAvaliacaoComponent implements OnInit{

  avaliacaoForm!: FormGroup;
  clientes: Cliente[] = [];
  livros: Livro[] = [];

  constructor(
    private datePipe: DatePipe,
    private avaliacaoService: AvaliacaoService,
    private livroService: LivroService,
    private clienteService: ClienteService,
    private dialogRef: MatDialogRef<FormularioAvaliacaoComponent>
  ) {
    this.avaliacaoForm = new FormGroup({
      cliente_id: new FormControl('', Validators.required),
      livro_id: new FormControl('', Validators.required),
      data_avaliacao: new FormControl('', Validators.required),
      avaliacao: new FormControl('', [Validators.required, Validators.max(5), Validators.min(0)]),
      comentario: new FormControl('', Validators.required)
    })
  }
  ngOnInit(): void {
    this.carregaClientes();
    this.carregaLivros();
  }

  carregaClientes() {
    this.clienteService.obterTodos().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    })
  }

  carregaLivros() {
    this.livroService.obterTodos().subscribe((livros: Livro[]) => {
      this.livros = livros;
    })
  }

  salvarAvaliacao(){
    if(this.avaliacaoForm.valid){
      const valorForm = this.avaliacaoForm.value;
      const DataFormatada = this.datePipe.transform(valorForm.data_avaliacao, 'yyyy-MM-dd')
      const avaliacaoData = {
        ...valorForm,
        data_avaliacao: DataFormatada
      };
      
      this.avaliacaoService.salvarNovo(avaliacaoData).subscribe({
        next: res => {
          this.dialogRef.close();
          alert('Avaliação salva com sucesso')
        },
        error: err => {
          console.error('Erro ao salvar avaliação:', err)
          alert('Erro ao salvar avaliação, por favor tente novamente.')
        }
      }) 
    }
  }
}