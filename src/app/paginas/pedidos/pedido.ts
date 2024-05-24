export interface Pedido {
  id?: number,
  data_pedido: string,
  total: number,
  cliente_id: number,
  forma_pagamento_id: number
}
