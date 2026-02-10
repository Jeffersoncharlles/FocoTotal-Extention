#!/usr/bin/env node

/**
 * Script para compilar o Tailwind CSS para injeção dinâmica no content script
 * Este script gera o arquivo src/generated/tailwind-styles.ts
 */

import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateTailwindCSS() {
  try {
    // Lê o arquivo de entrada (apenas Tailwind)
    const inputPath = path.join(__dirname, "../src/tailwind-content.css");
    const input = fs.readFileSync(inputPath, "utf-8");

    console.log("🔄 Compilando Tailwind CSS...");

    // Cria um arquivo tailwind.config.js temporário com content patterns
    const configPath = path.join(__dirname, "../tailwind.config.temp.js");
    const configContent = `
export default {
  content: [
    "${path.join(__dirname, "../src/**/*.{tsx,ts}").replace(/\\\\/g, "/")}",
    "${path.join(__dirname, "../src/**/*.html").replace(/\\\\/g, "/")}",
  ],
}
`;

    // Escreve a config temporária
    fs.writeFileSync(configPath, configContent, "utf-8");

    // Compila com PostCSS + Tailwind + config
    const result = await postcss([
      tailwindcss({
        config: configPath,
      }),
    ]).process(input, {
      from: inputPath,
      to: undefined,
    });

    // Remove a config temporária
    fs.unlinkSync(configPath);

    // Pega o CSS compilado
    const css = result.css;

    // Escreve no arquivo TypeScript
    const outputPath = path.join(
      __dirname,
      "../src/generated/tailwind-styles.ts",
    );
    const tsContent = `/**
 * CSS compilado do Tailwind para injeção dinâmica no content script
 * Este arquivo é gerado automaticamente. NÃO edite manualmente.
 * Para regenerar, execute: npm run generate:tailwind-css
 * Gerado em: ${new Date().toISOString()}
 */

export const TAILWIND_CSS = \`${css.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`;
`;

    fs.writeFileSync(outputPath, tsContent, "utf-8");

    console.log("✅ Tailwind CSS compilado com sucesso!");
    console.log(`   Arquivo gerado: ${outputPath}`);
    console.log(`   Tamanho: ${(css.length / 1024).toFixed(2)} KB`);
  } catch (error) {
    console.error("❌ Erro ao compilar Tailwind CSS:");
    console.error(error.message);
    process.exit(1);
  }
}

generateTailwindCSS();
