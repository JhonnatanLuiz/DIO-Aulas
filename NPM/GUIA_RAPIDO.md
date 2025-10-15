# 🚀 Guia Rápido - Variáveis de Ambiente com NPM

## ⚡ Setup Rápido (3 minutos)

```bash
# 1. Criar projeto
mkdir meu-projeto && cd meu-projeto
npm init -y

# 2. Instalar dotenv
npm install dotenv

# 3. Criar arquivo .env
echo "PORT=3000
DB_HOST=localhost
API_KEY=abc123" > .env

# 4. Adicionar ao .gitignore
echo ".env" >> .gitignore
```

## 📝 Uso Básico

### **Arquivo .env**
```env
PORT=3000
DB_HOST=localhost
DB_USER=admin
DB_PASS=12345
API_KEY=abc123xyz
```

### **Código JavaScript**

#### CommonJS (require)
```javascript
require('dotenv').config();

console.log(process.env.PORT);        // 3000
console.log(process.env.DB_HOST);     // localhost
```

#### ES Modules (import)
```javascript
import 'dotenv/config';

console.log(process.env.API_KEY);     // abc123xyz
```

## 🔒 Checklist de Segurança

- [ ] ✅ Criar `.env`
- [ ] ✅ Adicionar `.env` ao `.gitignore`
- [ ] ✅ Criar `.env.example` (sem valores reais)
- [ ] ✅ Nunca fazer commit de `.env`
- [ ] ✅ Usar valores padrão (fallback)
- [ ] ✅ Validar variáveis obrigatórias

## 🌍 Múltiplos Ambientes

```bash
# Criar arquivos
.env.development
.env.test
.env.production
```

### **package.json**
```json
{
  "scripts": {
    "dev": "NODE_ENV=development node app.js",
    "test": "NODE_ENV=test node app.js",
    "start": "NODE_ENV=production node app.js"
  }
}
```

### **Windows (usar cross-env)**
```bash
npm install cross-env --save-dev
```

```json
{
  "scripts": {
    "dev": "cross-env NODE_ENV=development node app.js"
  }
}
```

## 🛠️ Ferramentas Úteis

### **1. dotenv**
```bash
npm install dotenv
```
Carrega variáveis do `.env`.

### **2. cross-env**
```bash
npm install cross-env --save-dev
```
Compatibilidade Windows/Linux/Mac.

### **3. dotenv-expand**
```bash
npm install dotenv-expand
```
Usa variáveis dentro de outras:
```env
BASE_URL=https://api.example.com
API_USERS=$BASE_URL/users
```

### **4. envalid**
```bash
npm install envalid
```
Valida variáveis:
```javascript
import { cleanEnv, str, port } from 'envalid';

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  DB_HOST: str()
});
```

## 📋 Template .env.example

```env
# Servidor
PORT=3000
NODE_ENV=development

# Banco de Dados
DB_HOST=localhost
DB_PORT=5432
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=nome_banco

# APIs Externas
API_KEY=sua_chave_api
JWT_SECRET=seu_segredo

# URLs
BASE_URL=http://localhost:3000
```

## ⚠️ Erros Comuns

### **1. Variável não carrega**
```javascript
// ❌ ERRADO
console.log(process.env.PORT);  // undefined

// ✅ CORRETO
require('dotenv').config();     // Adicionar ANTES
console.log(process.env.PORT);  // 3000
```

### **2. .env commitado no Git**
```bash
# Remover do histórico
git rm --cached .env
git commit -m "Remove .env do histórico"

# Adicionar ao .gitignore
echo ".env" >> .gitignore
```

### **3. Windows não reconhece NODE_ENV**
```bash
# ❌ ERRADO (Windows)
NODE_ENV=production node app.js

# ✅ CORRETO (Windows)
npm install cross-env
cross-env NODE_ENV=production node app.js
```

## 🎯 Exemplo Completo

### **app.js**
```javascript
import 'dotenv/config';
import express from 'express';

// Validar variáveis obrigatórias
const required = ['DB_HOST', 'DB_USER', 'DB_PASS'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error(`❌ Variáveis faltando: ${missing.join(', ')}`);
  process.exit(1);
}

// Usar variáveis com fallback
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando!',
    environment: NODE_ENV
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor em http://localhost:${PORT}`);
  console.log(`📍 Ambiente: ${NODE_ENV}`);
});
```

## 📚 Links Úteis

- [dotenv - NPM](https://www.npmjs.com/package/dotenv)
- [process.env - Node.js](https://nodejs.org/api/process.html#process_process_env)
- [12 Factor App](https://12factor.net/config)
- [cross-env](https://www.npmjs.com/package/cross-env)
- [envalid](https://www.npmjs.com/package/envalid)

## 🎓 Próximos Passos

1. ✅ Implementar em projeto pessoal
2. ✅ Estudar validação com `envalid`
3. ✅ Aprender sobre Docker secrets
4. ✅ Explorar CI/CD (GitHub Actions)
5. ✅ Praticar segurança de APIs

---

**💡 Dica:** Sempre use `.env.example` para documentar quais variáveis são necessárias!

**🔒 Segurança:** NUNCA commite `.env` no Git!

**📖 Para mais detalhes:** Consulte o site completo em `Gerenciando_Variaveis_de_Ambientes_com_NPM.html`
