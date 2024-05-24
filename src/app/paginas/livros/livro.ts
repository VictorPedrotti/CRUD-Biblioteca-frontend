export interface Livro {
  id?: number,
  titulo: string,
  data_publicacao: string,
  preco: number,
  numero_paginas: number,
  genero_id: number,
  editora_id: number,
  autor_id: number,
  fornecedor_id: number
}
