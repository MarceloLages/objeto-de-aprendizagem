/**
 * Controlador Principal da Aplicação (Entry Point ES6)
 */

import { calculateMetrics } from './simulator.js';
import { buildDiagnosticReport, copyReportToClipboard, exportReportToPDF } from './report.js';
import { loadState, saveState, clearState, DEFAULT_STATE } from './storage.js';
import { initTheme, toggleTheme } from './theme.js';

const els = {
  estudo: document.getElementById('estudo'),
  redes: document.getElementById('redes'),
  lazer: document.getElementById('lazer'),
  sono: document.getElementById('sono'),

  valEstudo: document.getElementById('val-estudo'),
  valRedes: document.getElementById('val-redes'),
  valLazer: document.getElementById('val-lazer'),
  valSono: document.getElementById('val-sono'),

  totalDia: document.getElementById('total-dia'),
  totalSemana: document.getElementById('total-semana'),
  diasAno: document.getElementById('dias-ano'),

  pctProdutivo: document.getElementById('pct-produtivo'),
  pctLazer: document.getElementById('pct-lazer'),
  barProdutivo: document.getElementById('bar-produtivo'),
  barLazer: document.getElementById('bar-lazer'),
  progressAria: document.getElementById('progress-track-aria'),

  feedbackBox: document.getElementById('feedback-box'),
  feedbackIcon: document.getElementById('feedback-icon'),
  feedbackTitulo: document.getElementById('feedback-titulo'),
  feedbackTexto: document.getElementById('feedback-texto'),
  sleepAlert: document.getElementById('sleep-alert'),

  studentName: document.getElementById('student-name'),
  q1: document.getElementById('q1'),
  q2: document.getElementById('q2'),
  q3: document.getElementById('q3'),
  q4: document.getElementById('q4'),

  btnGerar: document.getElementById('btn-gerar'),
  btnCopiar: document.getElementById('btn-copiar'),
  btnPdf: document.getElementById('btn-pdf'),
  btnReiniciar: document.getElementById('btn-reiniciar'),
  themeToggle: document.getElementById('theme-toggle'),

  resumoContainer: document.getElementById('resumo-container'),
  resumoGerado: document.getElementById('resumo-gerado'),
  reportTimestamp: document.getElementById('report-timestamp'),
  reportBadgeStatus: document.getElementById('report-badge-status'),
  toast: document.getElementById('toast-notification')
};

let currentMetrics = null;
let currentReportText = '';

function getFormState() {
  return {
    estudo: parseFloat(els.estudo.value),
    redes: parseFloat(els.redes.value),
    lazer: parseFloat(els.lazer.value),
    sono: parseInt(els.sono.value, 10),
    studentName: els.studentName.value,
    q1: els.q1.value,
    q2: els.q2.value,
    q3: els.q3.value,
    q4: els.q4.value
  };
}

function applyFormState(state) {
  els.estudo.value = state.estudo;
  els.redes.value = state.redes;
  els.lazer.value = state.lazer;
  els.sono.value = state.sono;
  els.studentName.value = state.studentName || '';
  els.q1.value = state.q1 || '';
  els.q2.value = state.q2 || '';
  els.q3.value = state.q3 || '';
  els.q4.value = state.q4 || '';
}

function updateDashboard() {
  const state = getFormState();
  currentMetrics = calculateMetrics(state);

  els.valEstudo.textContent = `${currentMetrics.estudo.toFixed(1)} h`;
  els.valRedes.textContent = `${currentMetrics.redes.toFixed(1)} h`;
  els.valLazer.textContent = `${currentMetrics.lazer.toFixed(1)} h`;
  els.valSono.textContent = `${currentMetrics.sono} min`;

  els.totalDia.textContent = `${currentMetrics.totalDia.toFixed(1)}h`;
  els.totalSemana.textContent = `${currentMetrics.totalSemana.toFixed(1)}h`;
  els.diasAno.textContent = currentMetrics.diasInteirosAno;

  els.pctProdutivo.textContent = `${currentMetrics.pctProdutivo}%`;
  els.pctLazer.textContent = `${currentMetrics.pctRecreativo}%`;
  els.barProdutivo.style.width = `${currentMetrics.pctProdutivo}%`;
  els.barLazer.style.width = `${currentMetrics.pctRecreativo}%`;
  els.progressAria.setAttribute('aria-valuenow', currentMetrics.pctProdutivo);

  els.feedbackBox.className = 'feedback-box';
  if (currentMetrics.status !== 'balanced') {
    els.feedbackBox.classList.add(currentMetrics.status);
  }
  els.feedbackTitulo.textContent = currentMetrics.titulo;
  els.feedbackTexto.textContent = currentMetrics.texto;
  els.feedbackIcon.setAttribute('data-lucide', currentMetrics.iconName);

  els.sleepAlert.hidden = !currentMetrics.showSleepAlert;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  saveState(state);
}

function showToast(message) {
  els.toast.textContent = message;
  setTimeout(() => {
    if (els.toast.textContent === message) {
      els.toast.textContent = '';
    }
  }, 4000);
}

function handleGenerateReport() {
  const state = getFormState();
  currentReportText = buildDiagnosticReport(currentMetrics, state);

  els.resumoGerado.textContent = currentReportText;
  els.reportTimestamp.textContent = `Gerado em ${new Date().toLocaleString('pt-BR')}`;
  els.reportBadgeStatus.textContent = currentMetrics.titulo;
  els.resumoContainer.hidden = false;

  els.btnCopiar.disabled = false;
  els.btnPdf.disabled = false;

  els.resumoContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  showToast('✔ Ficha diagnóstica gerada com sucesso!');
}

async function handleCopyReport() {
  if (!currentReportText) return;
  const ok = await copyReportToClipboard(currentReportText);
  if (ok) {
    showToast('📋 Ficha diagnóstica copiada para a área de transferência!');
  } else {
    showToast('⚠️ Não foi possível copiar automaticamente. Selecione o texto abaixo.');
  }
}

function handleReset() {
  clearState();
  applyFormState(DEFAULT_STATE);
  els.resumoContainer.hidden = true;
  els.btnCopiar.disabled = true;
  els.btnPdf.disabled = true;
  currentReportText = '';
  updateDashboard();
  showToast('🔄 Simulação reiniciada para os valores iniciais.');
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .catch((err) => console.warn('Falha ao registrar Service Worker:', err));
    });
  }
}

function init() {
  initTheme();

  const savedState = loadState();
  applyFormState(savedState);
  updateDashboard();

  [els.estudo, els.redes, els.lazer, els.sono].forEach((input) => {
    input.addEventListener('input', updateDashboard);
  });

  [els.studentName, els.q1, els.q2, els.q3, els.q4].forEach((field) => {
    field.addEventListener('input', () => saveState(getFormState()));
  });

  els.themeToggle.addEventListener('click', toggleTheme);
  els.btnGerar.addEventListener('click', handleGenerateReport);
  els.btnCopiar.addEventListener('click', handleCopyReport);
  els.btnPdf.addEventListener('click', exportReportToPDF);
  els.btnReiniciar.addEventListener('click', handleReset);

  registerServiceWorker();
}

document.addEventListener('DOMContentLoaded', init);