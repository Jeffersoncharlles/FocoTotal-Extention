import { useState, useEffect, useRef, type FC } from "react";
import { createPortal } from "react-dom";
import { useVideoModalManager } from "../hooks/useVideoModalManager";
import { Button } from "./ui/button";
import { Maximize2, X } from "lucide-react";

interface ModalVideoProps {
  videoContainer: HTMLElement;
  videoSrc: string;
}

export const ModalVideo: FC<ModalVideoProps> = ({
  videoContainer,
  videoSrc,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [buttonContainer, setButtonContainer] = useState<HTMLDivElement | null>(
    null,
  );
  const modalContentRef = useRef<HTMLDivElement>(null);
  const originalParentRef = useRef<HTMLElement | null>(null);

  // Efeito 1: Gerenciador de Botão e de Estado (Reset)
  useEffect(() => {
    if (!videoContainer) return;
    setIsModalOpen(false);
    originalParentRef.current = videoContainer.parentElement;

    // Criar container para o botão de abrir
    const container = document.createElement("div");
    container.id = "focototal-open-button-container";
    container.style.position = "absolute";
    container.style.top = "15px";
    container.style.right = "15px";
    container.style.zIndex = "2147483640";

    // Garantir que o videoContainer tenha position: relative
    if (getComputedStyle(videoContainer).position === "static") {
      videoContainer.style.position = "relative";
    }

    videoContainer.appendChild(container);
    setButtonContainer(container);

    return () => {
      container.remove();
      setButtonContainer(null);
    };
  }, [videoSrc, videoContainer]);

  // EFEITO 2: Gerenciamento do modal e manipulação do DOM
  useVideoModalManager({
    videoContainer,
    isModalOpen,
    modalContentRef,
    originalParentRef,
  });

  // EFEITO 3: Listener para ESC para fechar o modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  return (
    <>
      {buttonContainer &&
        !isModalOpen &&
        createPortal(
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-black  hover:bg-black/90 shadow-lg hover:shadow-xl active:scale-95"
            size="default"
          >
            <Maximize2 className="mr-2 h-4 w-4 text-muted" />
            <p className="text-muted">Tela Cheia</p>
          </Button>,
          buttonContainer,
        )}

      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-2147483640 p-4">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="fixed top-4 right-4 z-2147483647 w-12 h-12 rounded-full bg-red-600 text-white hover:bg-red-700 border-2 border-white shadow-lg"
              size="icon"
              aria-label="Fechar modal de vídeo"
            >
              <X className="h-6 w-6 text-muted" />
            </Button>

            {/* Container do vídeo */}
            <div className="w-full h-full flex flex-col relative">
              <div
                ref={modalContentRef}
                className="w-full h-full relative overflow-hidden"
              >
                {/* O videoContainer será movido para cá */}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
