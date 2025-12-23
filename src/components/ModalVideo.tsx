import { X } from "lucide-react";
import { useState, useEffect, useRef, type FC } from "react";
import { createPortal } from "react-dom";
import { useVideoModalManager } from "../hooks/useVideoModalManager";

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
    openButton.id = "focototal-open-button"; // Damos um ID para poder escondê-lo
    openButton.className = `absolute top-[15px] right-[15px] z-[2147483640] px-4 py-2 bg-black/60 text-white font-bold border border-white rounded-lg cursor-pointer`;
    openButton.onclick = () => setIsModalOpen(true);

    if (getComputedStyle(videoContainer).position === "static") {
      videoContainer.style.position = "relative";
    }

    // Apenas adiciona o botão se ele não existir
    if (!videoContainer.querySelector("#focototal-open-button")) {
      videoContainer.appendChild(openButton);
    }

    return () => {
      if (openButton && openButton.parentElement) {
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

  // O JSX do modal, agora com centralização via flexbox
  return (
    <>
      {isModalOpen &&
        createPortal(
          <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[2147483640] p-4">
            <div className="w-full h-full flex flex-col">
              <div className="w-full flex-shrink-0 flex justify-end items-center py-2">
                {/* ---- APLICAÇÃO DOS ESTILOS INLINE ---- */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  // style={closeButtonStyle}
                  className="block visible opacity-100
         absolute top-[5px] right-[25px] z-[2147483647]
         text-[45px] font-bold text-white dark:text-white leading-[1]
         bg-none border-none p-0 cursor-pointer"
                >
                  <X className="text-white" />
                </button>
              </div>

              <div
                ref={modalContentRef}
                className="w-full h-full relative overflow-hidden"
              >
                {/* O videoContainer será movido para cá */}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
