# 🔧 Guia Completo de Resolução de Problemas - FocoTotal-Extension

## 📋 Sumário Executivo

Este documento detalha todas as mudanças e soluções implementadas para resolver os seguintes problemas críticos:

1. **Erro de carregamento de CSS** - `Não foi possível carregar 'content.css'`
2. **Erro de módulo** - `Cannot use import statement outside a module`
3. **Popup sem estilização** - Popup aparecia sem CSS e sem interatividade
4. **Sistema de logging desorganizado** - Console.log espalhados por todo o código

---

## 🚨 Problema 1: Falha ao Carregar CSS do Content Script

### Sintoma

```
Não foi possível carregar 'content.css' em css para o script de conteúdo com a origem "https://..."
```

### Causa Raiz

O Vite estava compilando o `content.tsx` em um arquivo JavaScript de módulo ES, mas o `manifest.json` ainda tentava carregar um arquivo `content.css` separado que não estava sendo gerado corretamente.

### Solução Implementada

#### Passo 1: Adicionar CSS como entrada separada no Vite

**Arquivo**: `vite.config.ts`

```typescript
// Antes: Apenas um input (content.tsx)
rollupOptions: {
  input: {
    content: resolve(__dirname, "src/content.tsx"),
  }
}

// Depois: CSS também como entrada
rollupOptions: {
  input: {
    content: resolve(__dirname, "src/content.tsx"),
    "content-css": resolve(__dirname, "src/index.css"),
  }
}
```

#### Passo 2: Configurar saída de CSS com nome específico

```typescript
output: {
  entryFileNames: "[name].js",
  assetFileNames: (assetInfo) => {
    if (assetInfo.name?.includes("index.css")) {
      return "content.css";
    }
    return "[name].[ext]";
  }
}
```

**Resultado**: O arquivo `dist/content.css` passou a ser gerado corretamente.

---

## 🚨 Problema 2: "Cannot use import statement outside a module"

### Sintoma

```
Uncaught SyntaxError: Cannot use import statement outside a module (at content.js:1:1)
```

### Causa Raiz

O Chrome não conseguia executar `content.js` porque era um módulo ES6. Content scripts precisam ser **IIFE (Immediately Invoked Function Expression)** para serem injetados diretamente no escopo global da página, sem necessidade de sistema de módulos.

### Solução Implementada

#### Passo 1: Configurar Vite para gerar IIFE

**Arquivo**: `vite.config.ts`

```typescript
build: {
  rollupOptions: {
    output: {
      format: "iife",                    // Gera (function() { ... })()
      inlineDynamicImports: true,        // Embutir todas as dependências
    }
  }
}
```

**O que acontece**:

- `format: "iife"` força o Rollup a gerar uma função auto-executável
- `inlineDynamicImports: true` garante que todas as dependências (React, componentes, etc.) sejam embutidas no mesmo arquivo
- Resultado: Um arquivo `content.js` completo, sem imports

#### Antes (ES Module - QUEBRADO):

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
// ... erro aqui!
```

#### Depois (IIFE - FUNCIONANDO):

```javascript
(function () {
  "use strict";
  var gf = document.createElement("style");
  // ... código completo aqui, sem imports
})();
```

---

## 🚨 Problema 3: Popup sem Estilização e Não-Funcional

### Sintoma

- Popup aparecia, mas sem estilos CSS
- Botões de toggle não respondiam
- Arquivo CSS não era carregado

### Causa Raiz

1. `popup.html` estava em `public/` mas precisava estar em `src/` para ser processado pelo Vite
2. Não havia link para `popup.css` no HTML
3. O script referenciava um arquivo que não existia

### Solução Implementada

#### Passo 1: Mover popup.html para src/

**De**: `public/popup.html`
**Para**: `src/popup.html`

```html
<!-- Agora faz parte do build do Vite -->
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FocoTotal</title>
    <link rel="stylesheet" href="popup.css" />
  </head>
  <body>
    <div id="popup-root"></div>
    <script type="module" src="popup.js"></script>
  </body>
</html>
```

#### Passo 2: Criar Plugin Vite para mover popup.html

**Arquivo**: `vite.config.ts`

```typescript
const movePopupPlugin = {
  name: "move-popup",
  async writeBundle() {
    // Move popup.html de dist/src para dist
    const srcPath = resolve(__dirname, "dist/src/popup.html");
    const destPath = resolve(__dirname, "dist/popup.html");
    try {
      await fs.copyFile(srcPath, destPath);
      await fs.rm(resolve(__dirname, "dist/src"), {
        recursive: true,
        force: true,
      });
    } catch (error) {
      console.log("popup.html já no lugar certo");
    }
  },
};
```

#### Passo 3: Criar vite.config.popup.ts (Build separado)

**Arquivo**: `vite.config.popup.ts`

Como o Rollup não permite múltiplos formatos de saída com `inlineDynamicImports: true`, criamos dois builds separados:

```typescript
export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "src/popup.html"),
      },
      output: {
        entryFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.includes(".css")) {
            return "popup.css";
          }
          return "[name].[ext]";
        },
      },
    },
  },
});
```

#### Passo 4: Atualizar package.json para dual-build

**Arquivo**: `package.json`

```json
{
  "scripts": {
    "build": "tsc -b && vite build && vite build --config vite.config.popup.ts"
  }
}
```

**O que faz**:

1. `tsc -b` - Valida TypeScript
2. `vite build` - Cria content.js (IIFE)
3. `vite build --config vite.config.popup.ts` - Cria popup.js e popup.css (ES modules)

---

## 🚨 Problema 4: Logs Console.log Espalhados

### Sintoma

- Console.log em múltiplos arquivos
- Impossível desativar todos os logs de uma vez
- Difícil de controlar durante produção vs desenvolvimento

### Causa Raiz

Logs foram adicionados de forma ad-hoc durante debug, sem uma estratégia centralizada.

### Solução Implementada

#### Passo 1: Criar classe Logger centralizada

**Arquivo**: `src/config/logger.ts`

```typescript
const DEBUG_MODE = false; // Controle global

class Logger {
  private enabled: boolean;
  private prefix: string;
  private emoji: string;

  constructor(config: LoggerConfig) {
    this.enabled = DEBUG_MODE;
    this.prefix = config.prefix;
    this.emoji = config.emoji || "📝";
  }

  private buildMessage(message: string): string {
    return `${this.emoji} [${this.prefix}] ${message}`;
  }

  private print(level: LogLevel, message: string, data?: unknown) {
    if (!this.enabled) return; // Sem overhead se desativado

    const formattedMessage = this.buildMessage(message);
    if (data !== undefined) {
      console[level](formattedMessage, data);
    } else {
      console[level](formattedMessage);
    }
  }

  info(message: string, data?: unknown) {
    this.print("info", message, data);
  }

  log(message: string, data?: unknown) {
    this.print("log", message, data);
  }

  warn(message: string, data?: unknown) {
    this.print("warn", message, data);
  }

  error(message: string, data?: unknown) {
    this.print("error", message, data);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

// Exportar instâncias pré-configuradas
export const contentLogger = new Logger({
  prefix: "FocoTotal",
  emoji: "🎬",
});

export const modalLogger = new Logger({
  prefix: "FocoTotal",
  emoji: "🎬",
});

export const popupLogger = new Logger({
  prefix: "FocoTotal Popup",
  emoji: "📱",
});
```

#### Passo 2: Substituir console.log em content.tsx

**Antes**:

```typescript
console.log("🎬 [FocoTotal] Content script carregado com sucesso!");
console.log(`🎬 [FocoTotal] Versão: 2.4.2`);
console.log("[FocoTotal] Verificando presença de vídeos na página...");
```

**Depois**:

```typescript
import { contentLogger } from "./config/logger";

contentLogger.log("Content script carregado com sucesso!");
contentLogger.log(`Versão: 2.4.2`);
contentLogger.log("Verificando presença de vídeos na página...");
```

**Resultado**: Todos os 13+ console.log foram centralizados e podem ser desativados/ativados com uma única variável.

#### Passo 3: Substituir console.log em ModalVideo.tsx

**Antes**:

```typescript
console.log("[FocoTotal] Botão 'Tela Cheia' adicionado ao container");
console.log("[FocoTotal] Botão 'Tela Cheia' já existe no container");
console.log("[FocoTotal] Removendo botão 'Tela Cheia'");
```

**Depois**:

```typescript
import { modalLogger } from "../config/logger";

modalLogger.log("Botão 'Tela Cheia' adicionado ao container");
modalLogger.log("Botão 'Tela Cheia' já existe no container");
modalLogger.log("Removendo botão 'Tela Cheia'");
```

#### Como Usar o Logger

**Para ATIVAR logs em desenvolvimento**:

1. Abra `src/config/logger.ts`
2. Mude `const DEBUG_MODE = false;` para `const DEBUG_MODE = true;`
3. Execute `pnpm run build`
4. Abra DevTools (F12) e veja os logs com prefixo:
   - 🎬 [FocoTotal] - para content script e modal
   - 📱 [FocoTotal Popup] - para popup

**Para DESATIVAR**:

1. Mude `DEBUG_MODE` de volta para `false`
2. Execute `pnpm run build`

---

## 📊 Estrutura Final de Build

### Antes (Quebrado)

```
src/
├── content.tsx      → dist/content.js (ES module ❌)
├── popup.tsx        → dist/popup.js (ES module ❌)
└── index.css        → não gerado ❌

public/
└── popup.html       → não processado ❌
```

### Depois (Funcionando)

```
src/
├── content.tsx      → dist/content.js (IIFE ✅)
├── popup.tsx        → dist/popup.js (ES module ✅)
├── popup.html       → dist/popup.html (processado ✅)
└── index.css        → dist/content.css (embutido em content.js ✅)
                    → dist/popup.css (separado ✅)

vite.config.ts       → Content script build (IIFE)
vite.config.popup.ts → Popup build (ES modules)
```

---

## 🔄 Pipeline de Build Detalhado

### Comando: `pnpm run build`

Executa três etapas sequenciais:

```bash
tsc -b
```

✅ Valida todos os tipos TypeScript
✅ Detecta erros antes de compilar

```bash
vite build
```

✅ Usa `vite.config.ts`
✅ Compila `src/content.tsx` → `dist/content.js` (IIFE)
✅ Embute CSS em `content.js`
✅ Copia assets (icons)
✅ Executa plugin `movePopupPlugin`
✅ Resultado: arquivo `dist/popup.html` movido da subpasta

```bash
vite build --config vite.config.popup.ts
```

✅ Usa `vite.config.popup.ts`
✅ Compila `src/popup.html` → `dist/popup.js` e `dist/popup.css`
✅ Permite formato ES module (diferente de content.js)
✅ Cria CSS separado para popup

### Output Final

```
dist/
├── content.js           (220 KB IIFE - React + ModalVideo + CSS inline)
├── popup.html           (0.42 KB)
├── popup.js             (195 KB ES module)
├── popup.css            (20.79 KB Tailwind)
├── manifest.json        (Manifest V3)
├── icons/               (16x16, 32x32, 48x48, 128x128 PNG)
└── assets/              (chunk folder vazio)
```

---

## ✅ Verificação Final

### Checklist de Validação

- [x] **content.js começa com IIFE**

  ```bash
  head -1 dist/content.js
  # Output: (function(){"use strict";...
  ```

- [x] **Nenhum import statement em content.js**

  ```bash
  grep -c "import " dist/content.js
  # Output: 0
  ```

- [x] **popup.html referencia popup.js e popup.css**

  ```html
  <link rel="stylesheet" href="popup.css" />
  <script type="module" src="popup.js"></script>
  ```

- [x] **manifest.json aponta para content.js**

  ```json
  "content_scripts": [{
    "matches": ["https://*/*"],
    "js": ["content.js"]
  }]
  ```

- [x] **Nenhum console.log direto no código**

  ```bash
  grep -r "console\." src/
  # Output: (nenhum resultado)
  ```

- [x] **Logger centralizado funciona**

  ```typescript
  import { contentLogger, modalLogger, popupLogger } from "./config/logger";

  contentLogger.log("teste"); // ✅ Funciona
  ```

---

## 🎓 Lições Aprendidas

### 1. Content Scripts Precisam de IIFE

Content scripts são injetados em páginas como scripts globais, não como módulos. Precisam ser IIFE ou estarem configurados como módulos no manifest.

### 2. Rollup tem Limitações com Múltiplos Formatos

Ao usar `inlineDynamicImports: true`, o Rollup não permite múltiplas entradas. Solução: builds separados com configs diferentes.

### 3. Centralizar Configurações

Logs, temas, seletores, etc., devem estar centralizados em `src/config/` para facilitar manutenção e testes.

### 4. Plugin Vite é Poderoso

Um simples plugin Vite pode automatizar tarefas pós-build (mover arquivos, renomear, etc.).

---

## 📚 Referências Úteis

- **Manifest V3 Docs**: https://developer.chrome.com/docs/extensions/mv3/
- **Vite Guide**: https://vitejs.dev/guide/
- **Rollup Output**: https://rollupjs.org/guide/en/#output-options
- **Chrome Content Scripts**: https://developer.chrome.com/docs/extensions/mv3/content_scripts/

---

## 🔧 Como Debugar no Futuro

### Para Verificar o Content Script

1. Abra uma página com vídeo
2. Pressione F12 (DevTools)
3. Vá para a aba "Fontes" (Sources)
4. Procure por `content.js` na seção "Extensões"
5. Ative logs em `src/config/logger.ts` (DEBUG_MODE = true)

### Para Verificar o Popup

1. Clique na extensão
2. Abra DevTools no popup (pode usar chrome://extensions > Inspecionar)
3. Ative logs em `src/config/logger.ts`

### Para Debugar o Build

```bash
# Ver arquivos gerados
ls -lh dist/

# Ver conteúdo completo do content.js
cat dist/content.js | less

# Validar JSON do manifest
jq . dist/manifest.json
```

---

## 🚀 Próximos Passos (Recomendado)

1. **Adicionar logs ao popup** - Use `popupLogger` em `src/popup.tsx`
2. **Testar em mais plataformas** - Adicionar seletores em `src/config/plataform.ts`
3. **Implementar testes automatizados** - Usar vitest para content script
4. **Melhorar UX do popup** - Adicionar ícones e animações
5. **Publicar na Chrome Web Store** - Seguir guia oficial do Chrome

---

## 📞 Suporte

Se encontrar problemas similares:

1. **Verifique o manifest.json** - Deve estar em `dist/`
2. **Leia os erros do DevTools** - São bem descritivos
3. **Ative DEBUG_MODE** - Para ver todos os logs
4. **Verifique o arquivo build** - Use `pnpm run build` novamente
5. **Limpe cache** - `rm -rf dist/ && pnpm run build`

---

**Documento criado em**: 15 de janeiro de 2026
**Versão da extensão**: 2.4.2
**Status**: ✅ Totalmente funcional
