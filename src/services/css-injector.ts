import { contentLogger } from "@/config/logger";
import { TAILWIND_CSS } from "@/generated/tailwind-styles";

const STYLE_ID = "focototal-tailwind";

/**
 * Injecta o CSS do Tailwind na página
 */
export function injectTailwindStyles() {
  // Verifica se já foi injetado
  const existing = document.getElementById(STYLE_ID);
  if (existing) {
    contentLogger.log("Tailwind CSS já foi injetado");
    return;
  }

  const styleElement = document.createElement("style");
  styleElement.id = STYLE_ID;
  styleElement.textContent = TAILWIND_CSS;
  document.head.appendChild(styleElement);

  contentLogger.log("✅ Tailwind CSS injetado com sucesso");
}

/**
 * Remove o CSS do Tailwind da página
 */
export function removeTailwindStyles() {
  const styleElement = document.getElementById(STYLE_ID);
  if (styleElement) {
    styleElement.remove();
    contentLogger.log("✅ Tailwind CSS removido com sucesso");
  } else {
    contentLogger.log("⚠️ Tailwind CSS já estava removido");
  }
}
