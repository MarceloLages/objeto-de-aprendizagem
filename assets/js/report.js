/**
 * Módulo de Geração, Cópia e Exportação de Ficha Diagnóstica
 */

export function buildDiagnosticReport(metrics, reflections) {
  const nome = reflections.studentName.trim() || 'Não informado';
  const q1 = reflections.q1.trim() || '(Não respondido)';
  const q2 = reflections.q2.trim() || '(Não respondido)';
  const q3 = reflections.q3.trim() || '(Não respondido)';
  const q4 = reflections.q4.trim() || '(Não respondido)';

  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `📋 FICHA DIAGNÓSTICA — CULTURA DIGITAL (BNCC: EM13CO24)
Estudante: ${nome}
Data da Autoavaliação: ${dataAtual}
====================================================================

1. PANORAMA QUANTITATIVO DO TEMPO DE TELA
• Tempo diário total: ${metrics.totalDia.toFixed(1)}h (${metrics.totalSemana.toFixed(1)}h/semana | ~${metrics.diasInteirosAno} dias inteiros/ano)
• Divisão por atividade:
  - Estudos e pesquisas: ${metrics.estudo.toFixed(1)} h (${metrics.pctProdutivo}%)
  - Redes sociais e mensagens: ${metrics.redes.toFixed(1)} h
  - Jogos digitais, séries e vídeos: ${metrics.lazer.toFixed(1)} h
  - Total Recreativo (Redes + Lazer): ${metrics.recreativo.toFixed(1)} h (${metrics.pctRecreativo}%)
• Uso de telas antes de dormir: ${metrics.sono} min ${metrics.showSleepAlert ? '[⚠️ Alerta de Higiene do Sono]' : '[Dentro do limite recomendado]'}
• Classificação Diagnóstica: ${metrics.titulo}

2. REFLEXÕES CRÍTICAS DO(A) ESTUDANTE
a) O que surpreendeu na projeção anual e atividades substituídas:
   ${q1}

b) Impacto das redes sociais na autoestima, foco e comparação social:
   ${q2}

c) Papel do design persuasivo e algoritmos das plataformas digitais:
   ${q3}

d) Compromisso prático de saúde digital para esta semana:
   ${q4}`;
}

export async function copyReportToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    const tempArea = document.createElement('textarea');
    tempArea.value = text;
    document.body.appendChild(tempArea);
    tempArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(tempArea);
    return success;
  }
}

export function exportReportToPDF() {
  window.print();
}