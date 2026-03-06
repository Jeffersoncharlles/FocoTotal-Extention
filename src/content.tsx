/// <reference types="chrome" />
import { contentLogger } from "./config/logger";
import {
  injectTailwindStyles,
  removeTailwindStyles,
} from "./services/css-injector";
import { useVideoDetection } from "./hooks/useVideoDetection";
import { useVideoRenderer } from "./hooks/useVideoRenderer";
import { usePluginState } from "./hooks/usePluginState";
import { usePageObserver } from "./hooks/usePageObserver";

// ⚙️ CONFIGURAÇÃO: Ative/desative o novo sistema de detecção de iframes
// Para voltar ao sistema antigo, mude para false
const USE_IFRAME_DETECTOR = true;

// // Log inicial para confirmar que o content script foi carregado
// contentLogger.log("Content script carregado com sucesso!");
// contentLogger.log(`Versão: 2.4.3`);
// contentLogger.log(`URL: ${window.location.href}`);
// contentLogger.log(
//   `Modo de detecção: ${USE_IFRAME_DETECTOR ? "IFRAME DETECTOR (Novo)" : "SELETORES (Legado)"}`,
// );

// Inicializa os hooks
const videoDetector = useVideoDetection({ useIframeDetector: USE_IFRAME_DETECTOR });
const videoRenderer = useVideoRenderer();

/**
 * Função que verifica e renderiza vídeos na página
 */
function handleVideoCheck() {
  const videoInfo = videoDetector.detectVideo();

  if (videoInfo && videoInfo.success) {
    videoRenderer.renderVideo(videoInfo.container, videoInfo.src);
  }
}

// Configura o plugin com handlers de enable/disable
const pluginState = usePluginState({
  onEnable: () => {
    injectTailwindStyles();
    contentLogger.log("Iniciando busca por vídeos...");
    handleVideoCheck();
  },
  onDisable: () => {
    removeTailwindStyles();
    videoRenderer.cleanupVideo();
  },
});

// Configura o observador de página
const pageObserver = usePageObserver(() => {
  // Só executa a verificação se o plugin estiver ativado
  if (pluginState.getIsEnabled()) {
    handleVideoCheck();
  }
});

// Inicializa o plugin
pluginState.initialize();
pluginState.setupMessageListener();
pageObserver.startObserving();
