import { contentLogger } from "../config/logger";

export interface PageObserverConfig {
  debounceMs?: number;
  observeChildList?: boolean;
  observeSubtree?: boolean;
  observeAttributes?: boolean;
}

/**
 * Hook para observar mudanças na página
 *
 * Configura um MutationObserver com debounce para detectar
 * quando novos elementos são adicionados à página
 */
export function usePageObserver(
  callback: () => void,
  config: PageObserverConfig = {},
) {
  const {
    debounceMs = 250,
    observeChildList = true,
    observeSubtree = true,
    observeAttributes = true,
  } = config;

  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  let observer: MutationObserver | null = null;

  /**
   * Inicia a observação da página
   */
  function startObserving(): void {
    if (observer) {
      contentLogger.log("⚠️ Observer já está ativo, ignorando");
      return;
    }

    observer = new MutationObserver(() => {
      // Debounce para não rodar a verificação excessivamente
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(callback, debounceMs);
    });

    observer.observe(document.body, {
      childList: observeChildList,
      subtree: observeSubtree,
      attributes: observeAttributes,
    });

    contentLogger.log("👀 Page observer iniciado");
  }

  /**
   * Para a observação da página e limpa recursos
   */
  function stopObserving(): void {
    if (observer) {
      observer.disconnect();
      observer = null;
      contentLogger.log("👋 Page observer parado");
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer);
      debounceTimer = undefined;
    }
  }

  return {
    startObserving,
    stopObserving,
  };
}
