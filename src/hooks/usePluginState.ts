/// <reference types="chrome" />
import type { ChromeMessage, StorageData } from "../types/chrome-messages";
import { contentLogger } from "../config/logger";

export interface PluginStateHandlers {
  onEnable: () => void;
  onDisable: () => void;
}

/**
 * Hook para gerenciar o estado do plugin
 *
 * Integra com chrome.storage.sync e chrome.runtime para:
 * - Carregar estado inicial do plugin
 * - Ouvir mudanças via mensagens do popup
 * - Executar callbacks quando ativado/desativado
 */
export function usePluginState(handlers: PluginStateHandlers) {
  let isEnabled = false;

  /**
   * Carrega o estado inicial do plugin do chrome.storage
   */
  function initialize(): void {
    chrome.storage.sync.get(["pluginEnabled"], (result: StorageData) => {
      isEnabled = result.pluginEnabled ?? false;

      contentLogger.log(`Plugin ${isEnabled ? "ATIVADO" : "DESATIVADO"}`);

      if (isEnabled) {
        handlers.onEnable();
      } else {
        contentLogger.log(
          "Plugin desativado. Clique no ícone da extensão para ativar.",
        );
      }
    });
  }

  /**
   * Configura listener para mensagens do popup
   */
  function setupMessageListener(): void {
    chrome.runtime.onMessage.addListener((message: ChromeMessage) => {
      if (message.action === "togglePlugin") {
        const newState = message.enabled;
        isEnabled = newState;

        contentLogger.log(
          `Plugin ${isEnabled ? "ATIVADO" : "DESATIVADO"} via popup`,
        );

        if (isEnabled) {
          handlers.onEnable();
        } else {
          handlers.onDisable();
        }
      }
    });
  }

  /**
   * Retorna o estado atual do plugin
   */
  function getIsEnabled(): boolean {
    return isEnabled;
  }

  return {
    initialize,
    setupMessageListener,
    getIsEnabled,
  };
}
