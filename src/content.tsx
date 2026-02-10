import React from "react";
import ReactDOM from "react-dom/client";
import { ModalVideo } from "./components/ModalVideo";
import { PLATFORM_SELECTORS } from "./config/plataform";
import { contentLogger } from "./config/logger";
import {
  injectTailwindStyles,
  removeTailwindStyles,
} from "./services/css-injector";

// Log inicial para confirmar que o content script foi carregado
contentLogger.log("Content script carregado com sucesso!");
contentLogger.log(`Versão: 2.4.2`);
contentLogger.log(`URL: ${window.location.href}`);

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

// Função principal que verifica o estado do vídeo na página
function handleStateCheck() {
  // Só executa se o plugin estiver ativado
  if (!isPluginEnabled) {
    return;
  }

  contentLogger.log("Verificando presença de vídeos na página...");
  contentLogger.log(`URL atual: ${window.location.href}`);
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
          contentLogger.log(`🎉 Vídeo encontrado! Renderizando botão...`);
          renderApp(videoContainer as HTMLElement, iframe.src);
          const newSrc = iframe.src;
          if (newSrc !== currentVideoSrc) {
            renderApp(videoContainer as HTMLElement, newSrc);
          }
          return; // Encontrou o vídeo, pode sair do loop
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
      `❌ Nenhum container encontrado com os seletores: ${PLATFORM_SELECTORS.join(
        ", ",
      )}`,
    );
    contentLogger.log(
      "💡 Dica: Abra o DevTools, vá na aba Elements e procure pelo player de vídeo. Anote a classe/id do elemento pai do iframe/video.",
    );
  } else if (!foundIframe) {
    contentLogger.log(
      "⚠️ Container encontrado mas sem iframe. Verifique se o vídeo usa tag <video> ou <iframe>.",
    );
  }
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
