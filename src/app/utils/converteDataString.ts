export function converterParaDataSemFusoHorario(stringData: string): Date | null {
  if (!stringData) return null;
  const [ano, mes, dia] = stringData.split('-').map(Number);
  const data = new Date(ano, mes - 1, dia, 12); 
  return data;
}