import React from "react";
import ReactDOM from "react-dom/client";
import { ModalVideo } from "../components/ModalVideo";
import { contentLogger } from "../config/logger";

/**
 * Hook para gerenciar a renderização do modal de vídeo
 * 
 * Gerencia o ReactDOM.Root e mantém controle sobre qual vídeo está renderizado
 */
export function useVideoRenderer() {
  let currentVideoSrc: string | null = null;
  let reactRoot: ReactDOM.Root | null = null;

  /**
   * Renderiza o modal de vídeo
   * @returns true se renderizou um novo vídeo, false se já estava renderizado
   */
  function renderVideo(
    videoContainer: HTMLElement,
    videoSrc: string,
  ): boolean {
    // Verifica se é um vídeo novo
    if (videoSrc === currentVideoSrc) {
      contentLogger.log(`ℹ️ Mesmo vídeo já renderizado, ignorando`);
      return false;
    }

    // Se o app ainda não foi criado, crie-o
    if (!reactRoot) {
      const rootDiv = document.createElement("div");
      rootDiv.id = "focototal-react-app-root";
      document.body.appendChild(rootDiv);
      reactRoot = ReactDOM.createRoot(rootDiv);
    }

    currentVideoSrc = videoSrc;

    contentLogger.log(`✨ Renderizando botão de tela cheia...`);
    reactRoot.render(
      <React.StrictMode>
        <ModalVideo videoContainer={videoContainer} videoSrc={videoSrc} />
      </React.StrictMode>,
    );

    return true;
  }

  /**
   * Remove o modal de vídeo e limpa o estado
   */
  function cleanupVideo(): void {
    contentLogger.log("Removendo modal...");

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

  /**
   * Retorna o src do vídeo atualmente renderizado
   */
  function getCurrentVideoSrc(): string | null {
    return currentVideoSrc;
  }

  return {
    renderVideo,
    cleanupVideo,
    getCurrentVideoSrc,
  };
}
