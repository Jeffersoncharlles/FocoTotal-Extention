import React from "react";
import ReactDOM from "react-dom/client";
import { ModalVideo } from "./components/ModalVideo";
import { PLATFORM_SELECTORS } from "./config/plataform";
import { contentLogger } from "./config/logger";
import {
  injectTailwindStyles,
  removeTailwindStyles,
} from "./services/css-injector";
import {
  detectPrimaryVideoIframe,
  isValidVideoContainer,
} from "./services/iframe-detector";

// ⚙️ CONFIGURAÇÃO: Ative/desative o novo sistema de detecção de iframes
// Para voltar ao sistema antigo, mude para false
const USE_IFRAME_DETECTOR = true;

// Log inicial para confirmar que o content script foi carregado
contentLogger.log("Content script carregado com sucesso!");
contentLogger.log(`Versão: 2.4.3`);
contentLogger.log(`URL: ${window.location.href}`);
contentLogger.log(
  `Modo de detecção: ${USE_IFRAME_DETECTOR ? "IFRAME DETECTOR (Novo)" : "SELETORES (Legado)"}`,
);

let currentVideoSrc: string | null = null; // Guarda o SRC do vídeo atual
let reactRoot: ReactDOM.Root | null = null; // Guarda a referência da nossa raiz React
let isPluginEnabled = false; // Controla se o plugin está ativado

// Função que inicia e atualiza nosso app
function renderApp(videoContainer: HTMLElement, videoSrc: string) {
  // Se o app ainda não foi criado, crie-o
  if (!reactRoot) {
    const rootDiv = document.createElement("div");
    rootDiv.id = "focototal-react-app-root";
    document.body.appendChild(rootDiv); // Anexa ao body para não ser destruído
    reactRoot = ReactDOM.createRoot(rootDiv);
  }

  // Atualiza o SRC atual em memória
  currentVideoSrc = videoSrc;

  // Renderiza/Atualiza o componente React com as novas props
  reactRoot.render(
    <React.StrictMode>
      <ModalVideo videoContainer={videoContainer} videoSrc={videoSrc} />
    </React.StrictMode>,
  );
}

/**
 * 🆕 NOVO MÉTODO: Detecção inteligente de iframe usando iframe-detector
 *
 * Detecta automaticamente o vídeo principal da página (maior iframe visível)
 * Funciona em qualquer site com player de vídeo em iframe.
 * Inclui validação de container e fallback para método legado se necessário.
 */
function handleStateCheckWithIframeDetector() {
  contentLogger.log("🔍 [IFRAME DETECTOR] Buscando vídeo principal...");

  try {
    const videoInfo = detectPrimaryVideoIframe({
      minWidth: 400,
      minHeight: 300,
      excludeHidden: true,
    });

    if (videoInfo && videoInfo.isPrimaryVideo) {
      contentLogger.log(`🎬 [IFRAME DETECTOR] Vídeo principal encontrado!`);
      contentLogger.log(`  📍 Plataforma: ${videoInfo.platform}`);
      contentLogger.log(
        `  📐 Dimensões: ${videoInfo.dimensions.width}x${videoInfo.dimensions.height} (área: ${videoInfo.dimensions.area}px²)`,
      );
      contentLogger.log(`  🔗 URL: ${videoInfo.src}`);

      // 🆕 Valida se o container retornado é adequado
      const containerIsValid = isValidVideoContainer(videoInfo.container);

      contentLogger.log(
        `  📦 Container: ${videoInfo.container.tagName}${
          videoInfo.container.className
            ? `.${videoInfo.container.className}`
            : ""
        }${videoInfo.container.id ? `#${videoInfo.container.id}` : ""}`,
      );
      contentLogger.log(
        `  ✅ Container válido: ${containerIsValid ? "SIM" : "NÃO (tentará fallback)"}`,
      );

      // Se container for inválido, tenta buscar com método legado
      if (!containerIsValid) {
        contentLogger.log(
          "🔄 Container inadequado, tentando método legado para buscar container correto...",
        );

        // Tenta encontrar container com seletores legados
        for (const platformSelector of PLATFORM_SELECTORS) {
          const legacyContainer = document.querySelector(platformSelector);
          if (legacyContainer) {
            const iframe = legacyContainer.querySelector("iframe");
            if (iframe && iframe.src === videoInfo.src) {
              contentLogger.log(
                `✅ [FALLBACK] Container correto encontrado com seletor legado: ${platformSelector}`,
              );
              // Usa o container do método legado
              videoInfo.container = legacyContainer as HTMLElement;
              break;
            }
          }
        }
      }

      // Verifica se é um vídeo novo
      if (videoInfo.src !== currentVideoSrc) {
        contentLogger.log(`✨ Renderizando botão de tela cheia...`);
        renderApp(videoInfo.container, videoInfo.src);
        return true; // Sucesso
      } else {
        contentLogger.log(`ℹ️ Mesmo vídeo já renderizado, ignorando`);
        return true; // Já renderizado
      }
    } else {
      contentLogger.log(
        "❌ [IFRAME DETECTOR] Nenhum vídeo principal encontrado",
      );
      return false; // Não encontrou
    }
  } catch (error) {
    contentLogger.log("⚠️ [IFRAME DETECTOR] Erro na detecção:", error);
    return false; // Erro
  }
}

/**
 * 📜 MÉTODO LEGADO: Detecção por seletores de plataforma fixos
 *
 * Mantido como fallback e para compatibilidade
 */
function handleStateCheckLegacy() {
  contentLogger.log("🔍 [LEGADO] Verificando vídeos com seletores...");
  contentLogger.log(`Seletores disponíveis: ${PLATFORM_SELECTORS.join(", ")}`);

  let foundContainer = false;
  let foundIframe = false;

  for (const platformSelector of PLATFORM_SELECTORS) {
    const videoContainer = document.querySelector(platformSelector);
    if (videoContainer) {
      foundContainer = true;
      contentLogger.log(`✅ Container encontrado: ${platformSelector}`);
      contentLogger.log(`Container HTML:`, videoContainer);

      const iframe = videoContainer.querySelector("iframe");
      if (iframe) {
        foundIframe = true;
        contentLogger.log(`✅ Iframe encontrado dentro do container`);
        contentLogger.log(`Iframe src: "${iframe.src}"`);

        if (iframe.src) {
          contentLogger.log(
            `🎉 [LEGADO] Vídeo encontrado! Renderizando botão...`,
          );
          const newSrc = iframe.src;
          if (newSrc !== currentVideoSrc) {
            renderApp(videoContainer as HTMLElement, newSrc);
          }
          return true; // Encontrou o vídeo, pode sair do loop
        } else {
          contentLogger.log(`⚠️ Iframe encontrado mas sem src`);
        }
      } else {
        contentLogger.log(`❌ Nenhum iframe encontrado dentro do container`);
        // Vamos ver se há um vídeo tag diretamente
        const video = videoContainer.querySelector("video");
        if (video) {
          contentLogger.log(
            `🎥 Tag <video> encontrada (não suportado ainda):`,
            video,
          );
        }
      }
    }
  }

  if (!foundContainer) {
    contentLogger.log(
      `❌ [LEGADO] Nenhum container encontrado com os seletores: ${PLATFORM_SELECTORS.join(
        ", ",
      )}`,
    );
    contentLogger.log(
      "💡 Dica: Abra o DevTools, vá na aba Elements e procure pelo player de vídeo. Anote a classe/id do elemento pai do iframe/video.",
    );
  } else if (!foundIframe) {
    contentLogger.log(
      "⚠️ [LEGADO] Container encontrado mas sem iframe. Verifique se o vídeo usa tag <video> ou <iframe>.",
    );
  }

  return false; // Não encontrou nada
}

/**
 * 🎯 FUNÇÃO PRINCIPAL: Escolhe método de detecção com fallback automático
 *
 * Estratégia:
 * 1. Se USE_IFRAME_DETECTOR = true, tenta novo método primeiro
 * 2. Se novo método falha ou não encontra, usa método legado como fallback
 * 3. Se USE_IFRAME_DETECTOR = false, usa apenas método legado
 */
function handleStateCheck() {
  // Só executa se o plugin estiver ativado
  if (!isPluginEnabled) {
    return;
  }

  contentLogger.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  contentLogger.log("Verificando presença de vídeos na página...");
  contentLogger.log(`URL atual: ${window.location.href}`);

  if (USE_IFRAME_DETECTOR) {
    // Tenta o novo método primeiro
    const success = handleStateCheckWithIframeDetector();

    if (!success) {
      // Fallback para método legado
      contentLogger.log("🔄 Tentando método legado como fallback...");
      handleStateCheckLegacy();
    }
  } else {
    // Usa apenas método legado
    handleStateCheckLegacy();
  }

  contentLogger.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

// Nosso observador que monitora a página inteira
let debounceTimer: ReturnType<typeof setTimeout> | undefined;
const observer = new MutationObserver(() => {
  // Usamos um debounce para não rodar a verificação excessivamente
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(handleStateCheck, 250);
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true, // Importante para pegar mudanças de de attributes
});

// Carrega o estado inicial do plugin
chrome.storage.sync.get(
  ["pluginEnabled"],
  (result: { pluginEnabled?: boolean }) => {
    isPluginEnabled = result.pluginEnabled ?? false;

    contentLogger.log(`Plugin ${isPluginEnabled ? "ATIVADO" : "DESATIVADO"}`);

    // Executa a verificação uma vez no início se o plugin estiver ativado
    if (isPluginEnabled) {
      injectTailwindStyles();
      contentLogger.log("Iniciando busca por vídeos...");
      handleStateCheck();
    } else {
      contentLogger.log(
        "Plugin desativado. Clique no ícone da extensão para ativar.",
      );
    }
  },
);

// Listener para receber mensagens do popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "togglePlugin") {
    isPluginEnabled = message.enabled;

    contentLogger.log(
      `Plugin ${isPluginEnabled ? "ATIVADO" : "DESATIVADO"} via popup`,
    );

    if (isPluginEnabled) {
      // Se ativado, injeta o CSS e inicia a verificação
      injectTailwindStyles();
      contentLogger.log("Buscando vídeos após ativação...");
      handleStateCheck();
    } else {
      contentLogger.log("Removendo modal...");
      // Se desativado, remove o CSS e o modal se existir
      removeTailwindStyles();
      if (reactRoot) {
        reactRoot.unmount();
        reactRoot = null;
        const rootDiv = document.getElementById("focototal-react-app-root");
        if (rootDiv) {
          rootDiv.remove();
        }
      }
      currentVideoSrc = null;
    }
  }
});
