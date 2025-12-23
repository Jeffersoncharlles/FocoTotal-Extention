import { useEffect, type RefObject } from "react";

const PLACEHOLDER_ID = "focototal-video-placeholder";

interface UseVideoModalManagerProps {
  videoContainer: HTMLElement;
  isModalOpen: boolean;
  modalContentRef: RefObject<HTMLDivElement | null>;
  originalParentRef: RefObject<HTMLElement | null>;
}

/**
 * Hook que gerencia a movimentação do videoContainer entre a página e o modal,
 * aplicando e removendo estilos fullscreen conforme necessário.
 */
export const useVideoModalManager = ({
  videoContainer,
  isModalOpen,
  modalContentRef,
  originalParentRef,
}: UseVideoModalManagerProps) => {
  useEffect(() => {
    if (!originalParentRef.current) return;

    const originalParent = originalParentRef.current;
    const openButton = videoContainer.querySelector<HTMLElement>(
      "#focototal-open-button"
    );

    if (isModalOpen) {
      // Esconde o botão "Tela Cheia" quando o modal está aberto
      if (openButton) openButton.style.display = "none";

      const placeholder = document.createElement("div");
      placeholder.id = PLACEHOLDER_ID;
      const rect = videoContainer.getBoundingClientRect();
      placeholder.style.width = `${rect.width}px`;
      placeholder.style.height = `${rect.height}px`;

      originalParent.replaceChild(placeholder, videoContainer);
      const modalContent = modalContentRef.current;
      if (modalContent) {
        modalContent.appendChild(videoContainer);

        // 1. Resetar o container do vídeo (Remover proporções travadas)
        videoContainer.style.setProperty("width", "100%", "important");
        videoContainer.style.setProperty("height", "100%", "important");
        videoContainer.style.setProperty("max-width", "none", "important");
        videoContainer.style.setProperty("max-height", "none", "important");
        videoContainer.style.setProperty("min-height", "100%", "important");
        videoContainer.style.setProperty("padding", "0", "important");
        videoContainer.style.setProperty("margin", "0", "important");
        videoContainer.style.setProperty("aspect-ratio", "auto", "important");

        // 2. Forçar o iframe a ser absoluto para ignorar paddings do pai
        const iframe = videoContainer.querySelector("iframe");
        if (iframe) {
          iframe.style.setProperty("position", "absolute", "important");
          iframe.style.setProperty("top", "0", "important");
          iframe.style.setProperty("left", "0", "important");
          iframe.style.setProperty("width", "100%", "important");
          iframe.style.setProperty("height", "100%", "important");
          iframe.style.setProperty("max-height", "none", "important");
        }
      }
    } else {
      // Mostra o botão "Tela Cheia" novamente quando o modal fecha
      if (openButton) openButton.style.display = "block";

      const placeholder = document.getElementById(PLACEHOLDER_ID);
      if (placeholder && placeholder.parentElement) {
        // Remove todos os estilos inline antes de devolver o vídeo
        videoContainer.style.removeProperty("width");
        videoContainer.style.removeProperty("height");
        videoContainer.style.removeProperty("max-width");
        videoContainer.style.removeProperty("max-height");
        videoContainer.style.removeProperty("min-height");
        videoContainer.style.removeProperty("padding");
        videoContainer.style.removeProperty("margin");
        videoContainer.style.removeProperty("aspect-ratio");

        const iframe = videoContainer.querySelector("iframe");
        if (iframe) {
          iframe.style.removeProperty("position");
          iframe.style.removeProperty("top");
          iframe.style.removeProperty("left");
          iframe.style.removeProperty("width");
          iframe.style.removeProperty("height");
          iframe.style.removeProperty("max-height");
        }

        // Devolve o vídeo ao placeholder
        placeholder.parentElement.replaceChild(videoContainer, placeholder);
        placeholder.remove();
      }
    }
  }, [isModalOpen, videoContainer, modalContentRef, originalParentRef]);
};
