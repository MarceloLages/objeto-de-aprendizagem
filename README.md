# Simulador de Tempo de Tela e Saúde Digital

Aplicação web educacional interativa desenvolvida para apoiar estudantes e professores do Ensino Médio na reflexão crítica sobre hábitos digitais, economia da atenção e bem-estar físico e mental.

---

## 🎯 Objetivos Educacionais

- Promover a **autorregulação** e a consciência quantitativa sobre o tempo diário, semanal e anual dedicado às telas.
- Diferenciar o **uso produtivo/formativo** (estudos, pesquisas) do **uso recreativo/passivo** (redes sociais, vídeos curtos, jogos).
- Alertar sobre os impactos fisiológicos do uso de dispositivos antes de dormir (**higiene do sono** e inibição de melatonina).
- Estimular a problematização crítica sobre o design persuasivo das plataformas digitais e gerar uma **Ficha Diagnóstica Individual** exportável.

---

## 📚 Alinhamento à BNCC — Habilidade EM13CO24

> **(EM13CO24)** Identificar e analisar criticamente o impacto das tecnologias digitais na saúde física e mental, nas relações sociais e no mundo do trabalho, propondo estratégias individuais e coletivas para o uso ético, seguro, saudável e equilibrado das tecnologias.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico** (estrutura acessível com landmarks ARIA e skip-link)
- **CSS3 Modular** (variáveis nativas, Grid/Flexbox, Mobile First, Dark Mode e folha de estilos `@media print` para PDF)
- **JavaScript Vanilla ES6+** (arquitetura em módulos nativos `type="module"`, sem frameworks externos)
- **Web Storage API (`localStorage`)** para salvamento automático local
- **PWA (Progressive Web App)** com `manifest.json` e `sw.js` (funcionamento offline)
- **Lucide Icons** para iconografia vetorial leve

---

## 🖼️ Capturas de Tela (Exemplo da Interface)

### Modo Claro (Dashboard Interativo)
```text
+-----------------------------------------------------------------------+
| 📱 Saúde Digital [EM13CO24]                         [☁ Salvo] [🌙]   |
+-----------------------------------------------------------------------+
| 🎓 Cultura Digital • Ensino Médio (BNCC)                              |
| Você controla as telas ou as telas controlam o seu tempo?             |
+-----------------------------------+-----------------------------------+
| 1. Seus Hábitos Diários           | 2. Impacto Calculado no Tempo     |
| 📚 Estudos:        [2.0 h] ===o== | [ 6.0h/dia ] [ 42.0h/sem ] [ 91d ]|
| 📱 Redes sociais:  [2.5 h] ====o= | Estudo: 33% | Redes+Lazer: 67%    |
| 🎮 Jogos/vídeos:   [1.5 h] ==o=== | [■■■■■■■□□□□□□□□□□□□□□□□□□□□□□□□]  |
| 🌙 Antes dormir:   [45 min] ===o= | ⚠️ Zona de Atenção                |
+-----------------------------------+-----------------------------------+
```

### Modo Escuro & Ficha Diagnóstica Exportável
```text
+-----------------------------------------------------------------------+
| 📋 FICHA DIAGNÓSTICA — CULTURA DIGITAL (BNCC: EM13CO24)               |
| • Tempo diário total: 6.0h (42.0h/semana | ~91 dias inteiros/ano)     |
| • Classificação Diagnóstica: ⚠️ Zona de Atenção                       |
| [ Gerar Ficha ]  [ Copiar Relatório ]  [ Exportar PDF ]  [ Reiniciar ]|
+-----------------------------------------------------------------------+
```

---

## 💻 Como Executar Localmente

Como o projeto utiliza **ES6 Modules (`type="module"`)**, os navegadores exigem um servidor HTTP local:

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU-USUARIO/simulador-saude-digital.git
   cd simulador-saude-digital
   ```
2. Inicie um servidor local simples:
   - **VS Code:** Clique em *"Go Live"* na extensão **Live Server**.
   - **Python 3:** `python -m http.server 8080`
   - **Node.js:** `npx serve .`
3. Acesse `http://localhost:8080` no navegador.

---

## 🚀 Como Publicar no GitHub Pages (Passo a Passo)

1. **Criar repositório:** Acesse [github.com/new](https://github.com/new), crie um repositório público (ex: `simulador-saude-digital`) e clique em *Create repository*.
2. **Enviar arquivos:** Faça upload de todos os arquivos e pastas mantendo a estrutura original (`index.html`, `assets/`, `manifest.json`, `sw.js`, `README.md`, `LICENSE`, `.gitignore`).
3. **Acessar Settings:** No menu superior do repositório no GitHub, clique na aba **Settings**.
4. **Pages:** No menu lateral esquerdo, clique em **Pages**.
5. **Selecionar branch main:** Em *Build and deployment > Branch*, selecione **main** (e `/ (root)`).
6. **Salvar:** Clique no botão **Save**.
7. **Acessar URL gerada:** Aguarde 1 a 2 minutos, atualize a página e acesse o link gerado.

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT** — veja o arquivo [LICENSE](./LICENSE) para mais detalhes.
