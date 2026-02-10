import { useState, useEffect, useRef, type FC } from "react";
import { createPortal } from "react-dom";
import { useVideoModalManager } from "../hooks/useVideoModalManager";
import { modalLogger } from "../config/logger";

interface ModalVideoProps {
  videoContainer: HTMLElement;
  videoSrc: string;
}

export const ModalVideo: FC<ModalVideoProps> = ({
  videoContainer,
  videoSrc,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const originalParentRef = useRef<HTMLElement | null>(null);

  // Efeito 1: Gerenciador de Botão e de Estado (Reset)
  useEffect(() => {
    if (!videoContainer) return;
    setIsModalOpen(false);
    originalParentRef.current = videoContainer.parentElement;

    const openButton = document.createElement("button");
    openButton.innerText = "Tela Cheia";
    openButton.id = "focototal-open-button";
    // Tailwind classes para visual + inline para posicionamento
    openButton.className =
      "px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold border-0 rounded-lg cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all active:scale-95 shadow-lg hover:shadow-xl";
    openButton.style.position = "absolute";
    openButton.style.top = "15px";
    openButton.style.right = "15px";
    openButton.style.zIndex = "2147483640";
    openButton.onclick = () => setIsModalOpen(true);

    if (getComputedStyle(videoContainer).position === "static") {
      videoContainer.style.position = "relative";
    }

    // Apenas adiciona o botão se ele não existir
    if (!videoContainer.querySelector("#focototal-open-button")) {
      modalLogger.log("Botão 'Tela Cheia' adicionado ao container");
      videoContainer.appendChild(openButton);
    } else {
      modalLogger.log("Botão 'Tela Cheia' já existe no container");
    }

    return () => {
      if (openButton && openButton.parentElement) {
        modalLogger.log("Removendo botão 'Tela Cheia'");
        openButton.remove();
      }
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

  // EFEITO 4: Criar botão X como elemento DOM quando modal abre
  useEffect(() => {
    if (!isModalOpen) return;

    const closeButton = document.createElement("button");
    closeButton.id = "focototal-close-button";
    closeButton.innerHTML = "✕";
    // Tailwind classes para o visual
    closeButton.className =
      "w-12 h-12 bg-red-600 text-white font-bold rounded-full cursor-pointer hover:bg-red-700 transition-all active:scale-90 shadow-lg hover:shadow-xl flex items-center justify-center text-2xl border-2 border-white";
    // Apenas posicionamento em inline
    closeButton.style.position = "fixed";
    closeButton.style.top = "15px";
    closeButton.style.right = "15px";
    closeButton.style.zIndex = "2147483647";
    closeButton.onclick = () => setIsModalOpen(false);

    document.body.appendChild(closeButton);
    modalLogger.log("Botão fechar adicionado ao DOM");

    return () => {
      const btn = document.getElementById("focototal-close-button");
      if (btn) {
        btn.remove();
        modalLogger.log("Botão fechar removido do DOM");
      }
    };
  }, [isModalOpen]);

  // O JSX do modal, agora com centralização via flexbox
  return (
    <>
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[2147483640] p-4">
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
