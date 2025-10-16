# 📦 NPM Scripts em Node.js

[![DIO](https://img.shields.io/badge/DIO-Trilha%20de%20Aprendizado-purple)](https://www.dio.me/)
[![Status](https://img.shields.io/badge/Status-Completo-success)](.)
[![Version](https://img.shields.io/badge/Version-1.0.0-green)](.)

Página complementar ao curso **Gerenciando Variáveis de Ambiente com NPM** da **Digital Innovation One (DIO)**, focada em NPM Scripts.

---

## 📖 **Sobre**

Esta página ensina como usar NPM Scripts para automatizar tarefas em projetos Node.js, eliminando a necessidade de ferramentas como Gulp ou Grunt.

---

## 🎯 **Conteúdo**

### 5 Seções Completas:

#### 1️⃣ **Introdução** (O Que Você Vai Aprender)
- 📚 O que são NPM Scripts
- 🎯 Por que usar ao invés de Gulp/Grunt
- 📋 Scripts pré-definidos vs customizados
- 🎬 Exemplo básico de package.json

#### 2️⃣ **Prática** (Setup, Script Field, NPM Run Script)
- 🛠️ Setup inicial passo-a-passo
- 📝 Configurando campo "scripts"
- ⚡ Executando scripts (npm run)
- 🔄 VS Code NPM Scripts View
- 🎨 Scripts avançados (encadeamento, paralelos)
- 📛 Boas práticas de nomenclatura

#### 3️⃣ **Conclusão**
- ✅ Resumo do aprendizado
- 📋 Checklist de boas práticas (8 itens)
- 🚀 Próximos passos

#### 4️⃣ **Materiais de Apoio e Questionário** (Npm Scripts)
- 📖 Documentação oficial
- 🛠️ Ferramentas úteis (npm-run-all, concurrently, cross-env)
- 🎥 Vídeos e tutoriais
- 📝 Artigos recomendados
- 💡 4 dicas avançadas

#### 5️⃣ **Questionário**
- 📝 8 questões de múltipla escolha
- ⭐ Sistema de pontuação (10 pontos totais)
- ✅ Validação automática
- 📊 Estatísticas detalhadas

---

## ✨ **Funcionalidades**

### 🎨 **Interface**
- Design responsivo mobile-first
- Tema claro/escuro com persistência
- Navegação suave entre seções
- Link de volta para página principal

### 💻 **Interatividade**
- ✅ Botões de copiar código
- 📋 Checklist com persistência (LocalStorage)
- 🎯 Quiz com validação e feedback visual
- 🔍 Syntax highlighting (Highlight.js)

### 📱 **Responsividade**
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

---

## 🛠️ **Tecnologias**

| Tecnologia | Uso |
|------------|-----|
| **HTML5** | Estrutura semântica |
| **CSS3** | Design moderno com CSS Variables |
| **JavaScript ES6+** | Interatividade |
| **Highlight.js 11.9.0** | Syntax highlighting |
| **LocalStorage API** | Persistência de dados |

---

## 📊 **Estatísticas**

- **HTML:** 940 linhas
- **CSS:** 1180 linhas
- **JavaScript:** 285 linhas
- **Seções:** 5 completas
- **Questões:** 8 (1pt cada Q1-Q5, 2pts Q6-Q8)
- **Exemplos de Código:** 15+ snippets
- **Links Externos:** 11 recursos

---

## 🚀 **Como Usar**

### **Abrir Localmente**
1. Abra `NPM_Scripts_em_Node.html` no navegador
2. Não precisa instalar nada!

### **Navegação**
- Use o menu superior para navegar entre seções
- Clique no botão "← Variáveis de Ambiente" para voltar à página principal
- Alterne o tema com o botão 🌙/☀️

---

## 📝 **Tópicos Abordados**

### **Conceitos:**
- ✅ Definição de NPM Scripts
- ✅ Scripts pré-definidos (start, test, stop, restart)
- ✅ Scripts customizados (dev, build, lint, etc.)
- ✅ Diferença entre `npm start` e `npm run dev`

### **Prática:**
- ✅ Inicializar projeto com `npm init`
- ✅ Criar arquivo `server.js`
- ✅ Configurar campo `"scripts"` no package.json
- ✅ Executar scripts com `npm run`
- ✅ Pre e Post hooks (prebuild, postdeploy)
- ✅ Encadeamento com `&&`
- ✅ Paralelismo com `&`

### **Ferramentas:**
- ✅ VS Code NPM Scripts View
- ✅ npm-run-all (executar múltiplos scripts)
- ✅ concurrently (scripts paralelos)
- ✅ cross-env (variáveis cross-platform)
- ✅ rimraf (rm -rf cross-platform)

---

## 🎯 **Exemplos Práticos**

### **1. Script Básico**
```json
{
  "scripts": {
    "start": "node server.js"
  }
}
```

### **2. Scripts com Parâmetros**
```json
{
  "scripts": {
    "start:prod": "NODE_ENV=production node server.js",
    "start:dev": "NODE_ENV=development nodemon server.js"
  }
}
```

### **3. Scripts Encadeados**
```json
{
  "scripts": {
    "lint": "eslint .",
    "test": "jest",
    "validate": "npm run lint && npm run test"
  }
}
```

### **4. Scripts Paralelos**
```json
{
  "scripts": {
    "watch:css": "sass --watch styles",
    "watch:js": "webpack --watch",
    "watch": "npm run watch:css & npm run watch:js"
  }
}
```

### **5. Pre/Post Hooks**
```json
{
  "scripts": {
    "prebuild": "npm run clean",
    "build": "webpack --mode production",
    "postbuild": "echo '✅ Build concluído!'"
  }
}
```

---

## 📚 **Recursos Externos**

### **Documentação:**
- [NPM Scripts - Docs Oficiais](https://docs.npmjs.com/cli/v9/using-npm/scripts)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [package.json Reference](https://docs.npmjs.com/cli/v9/configuring-npm/package-json)

### **Ferramentas:**
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [rimraf](https://www.npmjs.com/package/rimraf)

### **Artigos:**
- [Why NPM Scripts? - CSS Tricks](https://css-tricks.com/why-npm-scripts/)
- [NPM Scripts Guide - freeCodeCamp](https://www.freecodecamp.org/news/introduction-to-npm-scripts-1dbb2ae01633/)

---

## 🧪 **Questionário - Gabarito**

| Questão | Resposta Correta |
|---------|------------------|
| Q1 | a) package.json, campo "scripts" |
| Q2 | b) npm run dev |
| Q3 | a) start, test, stop, restart |
| Q4 | b) Executa próximo apenas se anterior sucesso |
| Q5 | a) Scripts que executam automaticamente |
| Q6 | b) Simplicidade, menos dependências |
| Q7 | b) npm run script -- argumentos |
| Q8 | a) Antes do script "build" |

**Pontuação Máxima:** 10 pontos  
**Faixas:**
- 90-100%: 🏆 Excelente!
- 70-89%: 👍 Muito bom!
- 50-69%: 📖 Bom começo!
- 0-49%: 📚 Continue estudando!

---

## 🔗 **Integração com Página Principal**

Esta página é complementar ao conteúdo **Gerenciando Variáveis de Ambiente com NPM**.

### **Navegação:**
- Página Principal → NPM Scripts: Botão "📦 NPM Scripts →" no header
- NPM Scripts → Página Principal: Botão "← Variáveis de Ambiente" no header

### **Compartilham:**
- ✅ Mesmo estilo visual (CSS Variables)
- ✅ Tema claro/escuro sincronizado
- ✅ Layout responsivo idêntico
- ✅ Highlight.js para código
- ✅ LocalStorage para persistência

---

## 🎨 **Personalização**

### **Tema Claro/Escuro**
O tema é salvo em `localStorage` com a chave `npmScriptsTheme`.

### **Checklist**
O estado dos checkboxes é salvo em `localStorage` com a chave `npmScriptsChecklist`.

### **Quiz**
O resultado do quiz é salvo em `localStorage` com a chave `npmScriptsQuizResult`.

---

## 📱 **Responsividade**

### **Mobile (< 768px):**
- Header empilhado verticalmente
- Menu em coluna única
- Tabelas com scroll horizontal
- Botões em largura total

### **Tablet (768px - 1023px):**
- Grid de 2 colunas
- Header flexível
- Conteúdo otimizado

### **Desktop (> 1024px):**
- Grid de 3 colunas
- Layout completo
- Todas funcionalidades visíveis

---

## ✅ **Status**

- ✅ HTML: Estrutura completa
- ✅ CSS: Design responsivo
- ✅ JavaScript: Funcionalidades implementadas
- ✅ Conteúdo: 5 seções completas
- ✅ Quiz: 8 questões validadas
- ✅ Links: Integração com página principal
- ✅ Testes: Zero erros de código

---

## 🚀 **Melhorias Futuras**

- [ ] Adicionar mais exemplos práticos
- [ ] Criar playground interativo
- [ ] Adicionar vídeos tutoriais
- [ ] Implementar busca no conteúdo
- [ ] Criar versão PDF para download
- [ ] Adicionar modo de impressão

---

## 👨‍💻 **Autor**

**Trilha de Aprendizado DIO**  
Criado para o curso "Gerenciando Variáveis de Ambiente com NPM"

---

## 📅 **Versão**

**v1.0.0** - Lançamento inicial (2025)

### **Changelog:**
- ✨ 5 seções completas
- 🎨 Design responsivo
- 🎯 Quiz interativo
- 📋 Checklist com persistência
- 🔗 Integração com página principal

---

**📚 Happy Learning!** 🚀
