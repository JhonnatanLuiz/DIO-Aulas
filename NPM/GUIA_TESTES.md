# 🧪 Guia de Testes - Site DIO NPM

## 📋 Checklist de Funcionalidades

Use este guia para testar todas as funcionalidades do site após atualizações.

---

## 🎨 **1. Tema Claro/Escuro**

### Teste:
1. ✅ Clique no botão de tema (🌙/☀️) no header
2. ✅ Verifique se todas as seções mudam de cor
3. ✅ Recarregue a página
4. ✅ Confirme que o tema persiste (LocalStorage)

### Resultado Esperado:
- Tema alterna suavemente entre claro e escuro
- Ícone muda de lua para sol
- Cores de todas as seções se ajustam
- Preferência salva entre sessões

---

## 🔍 **2. Barra de Pesquisa**

### Teste Básico:
1. ✅ Digite "dotenv" na barra de pesquisa
2. ✅ Aguarde resultados aparecerem (300ms debounce)
3. ✅ Verifique se há highlight amarelo no termo
4. ✅ Clique em um resultado
5. ✅ Confirme scroll suave até o elemento
6. ✅ Verifique animação de pulso amarelo (2s)

### Teste de Edge Cases:
- ✅ Digite apenas 1 caractere → Nenhum resultado
- ✅ Digite "xyzabc123" → Mensagem "Nenhum resultado encontrado"
- ✅ Pressione ESC → Limpa busca e fecha dropdown
- ✅ Clique fora do dropdown → Fecha automaticamente

### Testes de Busca:
| Termo | Deve Encontrar |
|-------|----------------|
| `process.env` | Múltiplas ocorrências em código |
| `segurança` | Alertas e boas práticas |
| `Node.js` | Pré-requisitos e teoria |
| `.gitignore` | Seção de prática |
| `PORT` | Exemplos de variáveis |

### Resultado Esperado:
- Máximo 10 resultados exibidos
- Preview de ~80 caracteres
- Highlight em negrito amarelo
- Click fecha dropdown e rola página

---

## 📝 **3. Seção de Pré-Requisitos**

### Teste do Grid:
1. ✅ Navegue até Seção 0
2. ✅ Verifique 6 cards de pré-requisitos
3. ✅ Confirme badges coloridos:
   - 🔴 Vermelho = Obrigatório
   - 🟡 Amarelo = Recomendado
   - ⚫ Cinza = Opcional
4. ✅ Hover nos cards → Elevação com sombra

### Teste do Checklist:
1. ✅ Marque/desmarque checkboxes das ferramentas
2. ✅ Recarregue a página
3. ✅ Confirme que checkboxes persistem (LocalStorage)

### Teste do Quiz Rápido:
1. ✅ Clique em "Resposta" nas 4 questões
2. ✅ Verifique expansão suave do conteúdo
3. ✅ Confirme respostas corretas e completas

### Resultado Esperado:
- Grid responsivo (2-3 colunas conforme tela)
- Hover suave com elevação
- Checkboxes salvos entre sessões
- Quiz expansível funcionando

---

## 💼 **4. Caso Prático (Seção 3)**

### Teste Visual:
1. ✅ Navegue até Seção 3
2. ✅ Verifique cenário do e-commerce
3. ✅ Confirme 3 blocos de código .env:
   - `.env.development`
   - `.env.test`
   - `.env.production`

### Teste de Elementos:
1. ✅ Verifique workflow com 5 círculos numerados
2. ✅ Hover nos passos → Mudança de background
3. ✅ Verifique tabela comparativa
4. ✅ Hover nas linhas → Destaque azul

### Resultado Esperado:
- Código com syntax highlighting
- Workflow visual claro
- Tabela zebrada (linhas alternadas)
- Hover suave em todos elementos

---

## 📋 **5. Questionário (Seção 7)**

### Teste de Questões:
1. ✅ Navegue até Seção 7
2. ✅ Confirme 10 questões visíveis
3. ✅ Verifique pontuação:
   - Q1-Q7: 1 ponto cada
   - Q8-Q10: 2 pontos cada
   - **Total: 13 pontos**

### Teste de Validação:
1. ✅ Responda todas as 10 questões
2. ✅ Clique em "✅ Verificar Respostas"
3. ✅ Aguarde validação
4. ✅ Confirme feedback por questão:
   - ✅ Verde = Correto
   - ❌ Vermelho = Incorreto
5. ✅ Verifique estatísticas:
   - Pontos obtidos
   - Percentual
   - Corretas
   - Incorretas
6. ✅ Confirme mensagem motivacional

### Teste de Reset:
1. ✅ Clique em "🔄 Reiniciar Quiz"
2. ✅ Confirme limpeza de todas seleções
3. ✅ Verifique remoção de feedback visual
4. ✅ Confirme ocultação dos resultados

### Gabarito Correto (para teste):
| Questão | Resposta Correta |
|---------|------------------|
| Q1 | a) Variáveis que armazenam configurações |
| Q2 | b) Exposição no Git |
| Q3 | b) dotenv |
| Q4 | c) process.env.VARIAVEL |
| Q5 | c) .env |
| Q6 | b) Configurações diferentes |
| Q7 | b) Template seguro |
| Q8 | b) cross-env |
| Q9 | b) No início do arquivo |
| Q10 | c) Exposição permanente |

**Pontuação Máxima:** 13 pontos (100%)

### Resultado Esperado:
- Todas questões marcadas visualmente
- Estatísticas corretas
- Mensagens:
  - 90-100%: 🏆 Excelente!
  - 70-89%: 👍 Muito bom!
  - 50-69%: 📖 Bom começo!
  - 0-49%: 📚 Continue estudando!

---

## 🎮 **6. Playground Interativo**

### Teste Básico:
1. ✅ Navegue até Seção 8
2. ✅ Digite no campo ".env":
   ```
   PORT=3000
   DB_HOST=localhost
   ```
3. ✅ Digite no campo "Código JavaScript":
   ```javascript
   console.log(process.env.PORT);
   console.log(process.env.DB_HOST);
   ```
4. ✅ Clique em "▶️ Executar"
5. ✅ Verifique output no console

### Teste de Parse:
1. ✅ Digite .env mal formatado:
   ```
   NOME=valor
   NOME SEM IGUAL
   #COMENTARIO
   ```
2. ✅ Execute
3. ✅ Confirme que linhas inválidas são ignoradas

### Resultado Esperado:
- Parser identifica pares KEY=VALUE
- Ignora comentários (#)
- Ignora linhas vazias
- Executa código JavaScript real
- Output exibido no console visual

---

## 📱 **7. Responsividade**

### Teste Mobile (320px-767px):
1. ✅ Redimensione para 375px (iPhone)
2. ✅ Verifique grid de pré-requisitos → 1 coluna
3. ✅ Verifique tabela comparativa → Scrollable
4. ✅ Confirme barra de pesquisa → Largura ajustada
5. ✅ Teste menu de navegação → Links empilhados

### Teste Tablet (768px-1023px):
1. ✅ Redimensione para 768px (iPad)
2. ✅ Verifique grid → 2 colunas
3. ✅ Confirme espaçamento adequado
4. ✅ Teste todas seções → Sem overflow horizontal

### Teste Desktop (1024px+):
1. ✅ Maximiza janela
2. ✅ Verifique grid → 3 colunas
3. ✅ Confirme header fixo
4. ✅ Teste scroll suave

### Resultado Esperado:
- Zero scroll horizontal em qualquer resolução
- Conteúdo sempre legível
- Botões sempre clicáveis
- Imagens/códigos redimensionados

---

## 📋 **8. Checklist de Boas Práticas**

### Teste:
1. ✅ Role até Seção 5 (Conclusão)
2. ✅ Marque/desmarque itens do checklist
3. ✅ Recarregue página
4. ✅ Confirme persistência

### Resultado Esperado:
- 8 itens de boas práticas
- Checkboxes salvos em LocalStorage
- Visual limpo e organizado

---

## 🔄 **9. Navegação e Scroll**

### Teste de Links:
1. ✅ Clique em cada link do menu (0-8)
2. ✅ Confirme scroll suave até seção
3. ✅ Verifique offset correto (scroll-padding-top: 150px)

### Teste de Botões:
1. ✅ Teste todos botões "Copiar Código"
2. ✅ Confirme feedback "✅ Copiado!"
3. ✅ Cole em editor → Verifique código correto

### Resultado Esperado:
- Scroll suave (behavior: smooth)
- Offset de 150px do topo
- Botões de cópia funcionando
- Feedback visual temporário

---

## 🎨 **10. Syntax Highlighting**

### Teste:
1. ✅ Verifique todos blocos de código
2. ✅ Confirme cores (Atom One Dark theme)
3. ✅ Teste blocos em `.env`, `.js`, `.bash`

### Resultado Esperado:
- Highlight.js carregado
- Tema aplicado corretamente
- Keywords, strings, comentários coloridos
- Background escuro nos blocos

---

## 🐛 **11. Console e Erros**

### Teste:
1. ✅ Abra DevTools (F12)
2. ✅ Verifique console
3. ✅ Confirme mensagens esperadas:
   ```
   ✅ Highlight.js inicializado
   ✅ Sistema de busca inicializado
   ✅ Questionário inicializado
   ⚡ Página carregada em Xms
   ```
4. ✅ Confirme zero erros JavaScript

### Easter Egg:
1. ✅ Pressione: ↑ ↑ ↓ ↓ ← → ← → B A
2. ✅ Confirme confetes e mensagem

### Resultado Esperado:
- Nenhum erro 404 (recursos)
- Nenhum erro JavaScript
- Logs informativos exibidos
- Easter egg funcional

---

## 📊 **Relatório de Teste**

### Template de Report:

```
Data: __/__/____
Testador: _____________
Navegador: Chrome/Firefox/Edge/Safari (versão)
Resolução: ____x____

TESTES REALIZADOS:
[ ] Tema Claro/Escuro
[ ] Barra de Pesquisa
[ ] Pré-Requisitos
[ ] Caso Prático
[ ] Questionário
[ ] Playground
[ ] Responsividade
[ ] Navegação
[ ] Syntax Highlighting
[ ] Console

BUGS ENCONTRADOS:
1. ________________
2. ________________

OBSERVAÇÕES:
______________________________
______________________________
```

---

## ✅ **Resultado Final Esperado**

### Todas funcionalidades devem:
- ✅ Funcionar sem erros
- ✅ Ser responsivas
- ✅ Ter feedback visual
- ✅ Persistir dados quando apropriado
- ✅ Carregar em < 3 segundos
- ✅ Funcionar offline (exceto CDN)

---

## 🚀 **Testes de Performance**

### Google Lighthouse (meta):
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

### Teste Manual:
1. Abra DevTools → Network
2. Recarregue página (Ctrl+Shift+R)
3. Confirme:
   - ✅ HTML: < 100 KB
   - ✅ CSS: < 50 KB
   - ✅ JS: < 50 KB
   - ✅ Total: < 200 KB
   - ✅ Tempo de carga: < 3s

---

## 📝 **Notas Finais**

- Este guia cobre **todas** as funcionalidades do site v2.0.0
- Testes devem ser realizados em múltiplos navegadores
- Priorize testes em Chrome (usado pela maioria)
- Reporte bugs em `GitHub Issues` ou `BUGS.md`

**Happy Testing!** 🧪✨
