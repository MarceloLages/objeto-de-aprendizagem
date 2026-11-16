/**
 * Módulo Motor de Cálculo Pedagógico (EM13CO24)
 */

export function calculateMetrics({ estudo, redes, lazer, sono }) {
  const totalDia = estudo + redes + lazer;
  const totalSemana = totalDia * 7;
  const horasAno = totalDia * 365;
  const diasInteirosAno = Math.round(horasAno / 24);

  const recreativo = redes + lazer;

  let pctProdutivo = 0;
  let pctRecreativo = 0;

  if (totalDia > 0) {
    pctProdutivo = Math.round((estudo / totalDia) * 100);
    pctRecreativo = 100 - pctProdutivo;
  }

  let status = 'balanced';
  let titulo = '✅ Uso Equilibrado / Saudável';
  let texto =
    'Seu tempo recreativo em telas está próximo das recomendações da Sociedade Brasileira de Pediatria para adolescentes (até 2h-3h/dia de lazer). Isso favorece o sono, a atividade física e o convívio presencial.';
  let iconName = 'check-circle-2';

  if (!(recreativo <= 2.5 && totalDia <= 5)) {
    if (recreativo <= 5 || totalDia <= 8) {
      status = 'warning';
      titulo = '⚠️ Zona de Atenção';
      texto = `Você passa ${recreativo.toFixed(1)}h diárias em redes e entretenimento (${diasInteirosAno} dias inteiros por ano no total). Vale observar se esse hábito está causando cansaço visual, sedentarismo ou distração nos estudos.`;
      iconName = 'alert-circle';
    } else {
      status = 'danger';
      titulo = '🚨 Uso Intenso / Risco de Sobrecarga';
      texto = `Com ${totalDia.toFixed(1)}h por dia (${diasInteirosAno} dias completos de 24h ao longo de um ano!), há alto risco de prejuízos ao sono, postura, ansiedade e isolamento social. Que tal testar pausas programadas?`;
      iconName = 'shield-alert';
    }
  }

  const showSleepAlert = sono >= 30;

  return {
    estudo,
    redes,
    lazer,
    sono,
    totalDia,
    totalSemana,
    diasInteirosAno,
    recreativo,
    pctProdutivo,
    pctRecreativo,
    status,
    titulo,
    texto,
    iconName,
    showSleepAlert
  };
}