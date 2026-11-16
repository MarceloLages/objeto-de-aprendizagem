/**
 * Módulo de Gerenciamento de Persistência Local (LocalStorage)
 */

const STORAGE_KEY = 'simulador_saude_digital_em13co24_v1';

export const DEFAULT_STATE = {
  estudo: 2.0,
  redes: 2.5,
  lazer: 1.5,
  sono: 45,
  studentName: '',
  q1: '',
  q2: '',
  q3: '',
  q4: ''
};

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (error) {
    console.warn('Não foi possível acessar o LocalStorage:', error);
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch (error) {
    console.warn('Erro ao salvar no LocalStorage:', error);
    return false;
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Erro ao limpar LocalStorage:', error);
  }
}