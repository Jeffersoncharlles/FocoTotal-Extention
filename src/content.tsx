import React from "react";
import ReactDOM from "react-dom/client";
import { ModalVideo } from "./components/ModalVideo";
import "./index.css";

export const PLATFORM_SELECTORS = [
  ".show-content",
  ".page__media",
  ".plyr__video-wrapper",
  '[data-testid="embed-container"]',
];

let currentVideoSrc: string | null = null; // Guarda o SRC do vídeo atual
let reactRoot: ReactDOM.Root | null = null; // Guarda a referência da nossa raiz React

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
    </React.StrictMode>
  );
}

// Função principal que verifica o estado do vídeo na página
function handleStateCheck() {
  for (const platformSelector of PLATFORM_SELECTORS) {
    const videoContainer = document.querySelector(platformSelector);
    if (videoContainer) {
      const iframe = videoContainer.querySelector("iframe");
      // biome-ignore lint/complexity/useOptionalChain: <explanation>
      if (iframe && iframe.src) {
        renderApp(videoContainer as HTMLElement, iframe.src);
        const newSrc = iframe.src;
        if (newSrc !== currentVideoSrc) {
          renderApp(videoContainer as HTMLElement, newSrc);
        }
      }
    }
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

// Executa a verificação uma vez no início
handleStateCheck();
