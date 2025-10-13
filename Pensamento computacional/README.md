# 🧠 Pensamento Computacional

> Site educacional interativo sobre os fundamentos do Pensamento Computacional, desenvolvido como parte do curso da plataforma DIO (Digital Innovation One).

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Usar](#-como-usar)
- [Seções do Site](#-seções-do-site)
- [Recursos Interativos](#-recursos-interativos)
- [Responsividade](#-responsividade)
- [Acessibilidade](#-acessibilidade)
- [Próximas Melhorias](#-próximas-melhorias)
- [Autor](#-autor)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

Este é um site educacional completo que ensina os fundamentos do **Pensamento Computacional**, uma habilidade essencial para resolver problemas de forma estruturada e lógica. O projeto foi desenvolvido alinhado com o conteúdo do curso da plataforma DIO.

### Objetivos:
- ✅ Ensinar os 4 pilares do Pensamento Computacional
- ✅ Introduzir conceitos de lógica de programação
- ✅ Apresentar diferentes linguagens de programação
- ✅ Proporcionar prática com algoritmos
- ✅ Avaliar conhecimento através de quiz interativo

## ⚡ Funcionalidades

### 🎴 Cards Interativos com Flip
- **4 Pilares**: Decomposição, Padrões, Abstração, Algoritmos
- **3 Paradigmas**: Imperativo, Orientado a Objetos, Funcional
- Animação 3D ao passar o mouse
- Conteúdo educativo no verso

### 🎮 Playground Interativo
- **5 Abas de Código**: Variáveis, Condicionais, Repetição, Funções, Vetores
- Exemplos práticos em JavaScript
- Syntax highlighting para melhor visualização
- Navegação por tabs

### 🧮 Simuladores
1. **Calculadora de Média**
   - Valida entrada (nota entre 0-10)
   - Feedback visual (aprovado/reprovado)
   - Apenas educacional (sem pontuação)

2. **Gerador de Tabuada**
   - Gera tabuada de qualquer número
   - Formatação clara e legível
   - Apenas educacional (sem pontuação)

### 📝 Quiz Interativo
- 3 perguntas sobre Pensamento Computacional
- Validação em tempo real
- Feedback visual (verde/vermelho)
- Sistema de pontuação persistente
- **🔄 Botão de Reset**: Permite refazer o quiz
  - Zera a pontuação do quiz
  - Remove pontos do total
  - Limpa respostas e feedback visual
  - Atualiza display em tempo real

### 🌓 Dark Mode
- Alternância entre tema claro e escuro
- Persistência via localStorage
- Transições suaves
- Ícones dinâmicos (☀️ ↔ 🌙)

### 💡 Sistema de Tooltips
- **56+ tooltips educacionais** em todo o site
- Explicações contextuais ao passar o mouse
- CSS puro (sem JavaScript)
- Suporte a dark mode
- Áreas cobertas:
  - Conceitos de lógica
  - Tipos de dados
  - Estruturas de controle
  - Paradigmas de programação
  - Sintaxe de Portugol
  - Dicas no quiz

### 🏆 Sistema de Gamificação
- Pontuação exclusiva no Quiz (10 pontos por resposta correta)
- Simuladores educacionais sem pontuação
- Persistência com localStorage
- Prevenção de pontos duplicados
- Animação visual ao ganhar pontos
- **Botão de Reset no Quiz**:
  - Reseta pontuação e permite refazer
  - Remove pontos do total exibido no topo
  - Limpa feedback visual
  - Armazena pontuação específica do quiz

### 📱 Menu Responsivo
- Hamburger menu para mobile
- Auto-fechamento inteligente:
  - Ao clicar em links
  - Ao clicar fora do menu
  - Ao redimensionar para desktop
- Animação de ícone (☰ ↔ ✕)
- Atributos ARIA para acessibilidade

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: 
  - Flexbox e Grid Layout
  - CSS Variables (Custom Properties)
  - Animations e Transitions
  - Media Queries
  - Pseudo-elementos (::before, ::after)
- **JavaScript (Vanilla)**:
  - DOM Manipulation
  - Event Handling
  - localStorage API
  - ES6+ features

### Bibliotecas Externas
- **Highlight.js**: Syntax highlighting para código
- **Google Fonts**: Fonte Poppins

## 📁 Estrutura do Projeto

```
Pensamento computacional/
│
├── PensamentoComputacional.html    # Estrutura principal (527 linhas)
├── PensamentoComputacional.css     # Estilos completos (852 linhas)
├── PensamentoComputacional.js      # Lógica e interatividade (330+ linhas)
└── README.md                        # Documentação (este arquivo)
```

### Arquitetura do Código

#### HTML (PensamentoComputacional.html)
```
<!DOCTYPE html>
├── <head>
│   ├── Meta tags (charset, viewport)
│   ├── Título
│   └── Link para CSS
│
├── <body>
    ├── <nav> - Navegação principal
    │   ├── Logo
    │   ├── Menu desktop/mobile
    │   ├── Botão hamburger
    │   └── Toggle dark mode
    │
    ├── <main>
    │   ├── #home - Hero section
    │   ├── #pilares - 4 Cards interativos
    │   ├── #logica - Conceitos e exemplos
    │   ├── #algoritmos - Playground com tabs
    │   ├── #linguagens - Timeline e paradigmas
    │   ├── #pratica - Desafios em Portugol
    │   ├── #quiz - Quiz interativo
    │   └── #conclusao - Encerramento
    │
    ├── <div id="modal"> - Modal de boas-vindas
    │
    └── <script> - Link para JavaScript
```

#### CSS (PensamentoComputacional.css)
```css
/* 1. Reset e Variáveis CSS (linhas 1-60) */
:root { /* Cores, espaçamentos, etc */ }

/* 2. Estilos Base (linhas 61-120) */
body, html { /* Tipografia, layout base */ }

/* 3. Navegação (linhas 121-200) */
nav, .nav-menu, .hamburger { /* Menu e responsividade */ }

/* 4. Dark Mode (linhas 201-250) */
.dark-mode { /* Overrides de cores */ }

/* 5. Cards Interativos (linhas 251-400) */
.card, .card-face, .card-flip { /* Animações 3D */ }

/* 6. Playground e Tabs (linhas 401-500) */
.tab-content, .tab-btn { /* Sistema de abas */ }

/* 7. Simuladores (linhas 501-580) */
.simulator, input, button { /* Calculadoras */ }

/* 8. Quiz (linhas 581-619) */
.quiz-question, .correct, .incorrect { /* Validação visual */ }

/* 9. Responsividade (linhas 620-775) */
@media (max-width: 768px) { /* Tablet/mobile */ }
@media (max-width: 480px) { /* Mobile small */ }

/* 10. Tooltips (linhas 946-999) */
.tooltip-trigger::before { /* Sistema de dicas */ }
```

#### JavaScript (PensamentoComputacional.js)
```javascript
// 1. Inicialização e Estado (linhas 1-35)
- Carregamento de tema salvo
- Inicialização de pontuação
- Event listeners DOMContentLoaded

// 2. Menu Hamburger (linhas 35-87)
- Toggle menu mobile
- Auto-fechamento
- Animações de ícone

// 3. Sistema de Pontuação (linhas 90-120)
- updateScoreDisplay() - Atualiza display de pontos
- addPoints(challenge, points) - Adiciona pontos
- localStorage persistence
- Animação visual
- Armazenamento separado da pontuação do quiz

// 4. Dark Mode (linhas 118-142)
- Toggle tema
- Salvar preferência
- Atualizar ícone

// 5. Modal (linhas 145-175)
- Abrir/fechar
- Eventos de click

// 6. Simuladores (linhas 178-235)
- Calculadora de média (sem pontuação)
- Gerador de tabuada (sem pontuação)
- Validações de entrada

// 7. Playground (linhas 223-245)
- showTab(tabId)
- Navegação entre abas

// 8. Quiz (linhas 248-310)
- Validação de respostas
- Feedback visual (cores corretas/incorretas)
- Cálculo de pontuação (10 pontos por acerto)
- Armazenamento da pontuação do quiz

// 9. Reset do Quiz (linhas 313-350)
- Resetar pontuação e respostas
- Remover pontos do total
- Atualizar display
- Limpar feedback visual
```

## 🚀 Como Usar

### Método 1: Abrir Localmente
1. Clone ou baixe este repositório
2. Navegue até a pasta do projeto
3. Abra o arquivo `PensamentoComputacional.html` em qualquer navegador moderno

### Método 2: Live Server (VS Code)
1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `PensamentoComputacional.html`
3. Selecione "Open with Live Server"

### Requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- JavaScript habilitado
- Conexão com internet (para carregar fontes e Highlight.js)

## 📚 Seções do Site

### 1️⃣ Home
- Hero section com título e descrição
- Call-to-action para explorar
- Design atrativo com gradiente

### 2️⃣ Pilares do Pensamento Computacional
- **Decomposição**: Dividir problemas complexos
- **Reconhecimento de Padrões**: Identificar similaridades
- **Abstração**: Focar no essencial
- **Algoritmos**: Criar soluções passo a passo

### 3️⃣ Lógica de Programação
- Tipos de raciocínio (Dedução, Indução, Abdução)
- Variáveis e constantes
- Estruturas de controle (if/else, for)
- Exemplos práticos

### 4️⃣ Algoritmos (Playground)
- **Variáveis**: let, const, tipos de dados
- **Condicionais**: if/else if/else
- **Repetição**: for, while
- **Funções**: declaração, parâmetros, return
- **Vetores**: arrays, push, iteração

### 5️⃣ Linguagens de Programação
- O que são linguagens
- Compilação vs Interpretação
- Paradigmas (Imperativo, OO, Funcional)
- Timeline histórica (Fortran, C, Python, JavaScript)

### 6️⃣ Prática
- Desafio 1: Soma de dois números
- Desafio 2: Adivinhe o número
- Código em Portugol
- Área para prática

### 7️⃣ Quiz
- 3 perguntas sobre conceitos
- Validação interativa
- Sistema de pontuação

### 8️⃣ Conclusão
- Resumo dos aprendizados
- Incentivo à prática
- Recursos adicionais

## 🎨 Recursos Interativos

### Cards com Flip 3D
```css
.card {
    transform-style: preserve-3d;
    transition: transform 0.6s;
}
.card:hover {
    transform: rotateY(180deg);
}
```

### Tabs de Navegação
```javascript
function showTab(tabId) {
    // Oculta todas as tabs
    // Mostra a tab selecionada
    // Atualiza estilos dos botões
}
```

### Sistema de Tooltips
```html
<span class="tooltip-trigger" data-tooltip="Explicação aqui">
    Termo técnico
</span>
```

### LocalStorage
```javascript
// Salvar tema
localStorage.setItem('theme', 'dark-mode');

// Salvar pontuação total
localStorage.setItem('userScore', score);

// Salvar pontuação do quiz (para reset)
localStorage.setItem('quizScore', quizPoints);

// Salvar desafios completados
localStorage.setItem('scoredChallenges', JSON.stringify([...challenges]));

// Recuperar dados
const theme = localStorage.getItem('theme');
const score = localStorage.getItem('userScore');
const quizScore = localStorage.getItem('quizScore');
```

## 📱 Responsividade

### Breakpoints

#### Desktop (> 768px)
- Menu horizontal completo
- Cards em grid 2x2
- Layout de 2 colunas nos desafios

#### Tablet/Mobile (≤ 768px)
- Menu hamburger ativo
- Cards em coluna única
- Simuladores empilhados
- Modal com 95% de largura

#### Mobile Small (≤ 480px)
- Fontes reduzidas
- Padding compacto
- Logo menor
- Botões ajustados

### Técnicas Utilizadas
```css
@media (max-width: 768px) {
    .nav-menu {
        position: absolute;
        flex-direction: column;
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .nav-menu.active {
        max-height: 400px;
    }
}
```

## ♿ Acessibilidade

### Implementações
- ✅ Atributos ARIA (aria-expanded, aria-label)
- ✅ Navegação por teclado
- ✅ Contraste adequado de cores
- ✅ Texto alternativo em ícones
- ✅ Semântica HTML5 correta
- ✅ Foco visível em elementos interativos

### Exemplo
```html
<button id="hamburger-menu-btn" 
        aria-label="Menu de navegação" 
        aria-expanded="false">
    ☰
</button>
```

## 🔧 Próximas Melhorias

### Funcionalidades Planejadas
- [ ] Sistema de badges/conquistas
- [ ] Gráfico de progresso
- [ ] Mais desafios práticos
- [ ] Modo de impressão otimizado
- [ ] Exportar certificado de conclusão
- [ ] Tradução para inglês
- [ ] Sons de feedback nas interações
- [ ] Mais exemplos de código em diferentes linguagens

### Otimizações Técnicas
- [ ] Minificação de CSS/JS
- [ ] Lazy loading de imagens
- [ ] Service Worker para PWA
- [ ] Testes automatizados
- [ ] Melhorias de SEO

## 👨‍💻 Autor

**Johnnie Desktop**
- GitHub: [@JhonnatanLuiz](https://github.com/JhonnatanLuiz)
- Projeto desenvolvido como parte dos estudos na plataforma DIO

## 📄 Licença

Este projeto é livre para uso educacional. Sinta-se à vontade para usar, modificar e compartilhar.

---

## 📊 Estatísticas do Projeto

- **Total de Linhas de Código**: ~1.750+
  - HTML: 527 linhas
  - CSS: 1.022 linhas
  - JavaScript: 366 linhas
  
- **Tooltips Educacionais**: 56+
- **Seções Interativas**: 8
- **Cards com Flip**: 7
- **Simuladores Educacionais**: 2 (sem pontuação)
- **Sistema de Quiz**: 1 (com pontuação e reset)
- **Abas de Código**: 5
- **Perguntas no Quiz**: 3
- **Pontos Possíveis no Quiz**: 30 (10 por acerto)

---

## 🎓 Conceitos Aprendidos

Este projeto demonstra conhecimento em:
- ✅ HTML5 semântico
- ✅ CSS3 avançado (Grid, Flexbox, Animations)
- ✅ JavaScript moderno (ES6+)
- ✅ Responsive Web Design
- ✅ Acessibilidade Web
- ✅ UX/UI Design
- ✅ Gamificação
- ✅ LocalStorage API
- ✅ DOM Manipulation
- ✅ Event Handling

---

## 📝 Changelog (Últimas Atualizações)

### Versão 2.0 - 13/10/2025
- ✅ **Sistema de Pontuação Reformulado**
  - Removida pontuação dos simuladores (agora apenas educacionais)
  - Pontuação exclusiva no Quiz (10 pontos por resposta correta)
  - Adicionado botão "Resetar Pontuação do Quiz"
  - Implementado `updateScoreDisplay()` para atualização em tempo real
  - Armazenamento separado da pontuação do quiz no localStorage

- ✅ **Correções de Dark Mode**
  - Texto do resultado do quiz agora visível no modo escuro
  - Cor de texto definida: `#333` (claro) e `#f0f0f0` (escuro)

- ✅ **Melhorias de UX**
  - Botão de reset com estilo destacado (vermelho)
  - Animação de hover no botão de reset
  - Alert informativo mostrando quantos pontos foram removidos
  - Limpeza completa de feedback visual ao resetar

- ✅ **Cards Interativos Corrigidos**
  - Todos os 7 cards agora funcionam com animação de flip
  - 4 pilares: Decomposição, Padrões, Abstração, Algoritmos
  - 3 paradigmas: Imperativo, Orientado a Objetos, Funcional

- ✅ **Tooltips Expandidos**
  - 56+ tooltips educacionais em todo o site
  - Cobertura completa: lógica, algoritmos, linguagens, prática, quiz

- ✅ **Documentação Completa**
  - README.md profissional com badges
  - Estrutura de código documentada
  - Exemplos de uso
  - Estatísticas do projeto

---

**🚀 Desenvolvido com dedicação para o aprendizado de Pensamento Computacional!**
