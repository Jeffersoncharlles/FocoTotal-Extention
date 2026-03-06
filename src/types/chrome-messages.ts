/**
 * Tipos para comunicação entre popup e content scripts via Chrome Extension API
 */

/**
 * Estrutura de dados armazenada no chrome.storage.sync
 */
export interface StorageData {
  pluginEnabled?: boolean;
}

/**
 * Mensagens enviadas entre popup e content scripts
 */
export interface ChromeMessage {
  action: "togglePlugin";
  enabled: boolean;
}
