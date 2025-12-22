import { X } from "lucide-react";
import { useState, useEffect, useRef, type FC } from "react";
import { createPortal } from "react-dom";

interface ModalVideoProps {
  videoContainer: HTMLElement;
  videoSrc: string;
}

const PLACEHOLDER_ID = "focototal-video-placeholder";

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

  // EFEITO 2: O Movedor de DOM com ajuste de Estilo
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
        videoContainer.style.setProperty("padding", "0", "important"); // MUITO IMPORTANTE
        videoContainer.style.setProperty("margin", "0", "important");
        videoContainer.style.setProperty("aspect-ratio", "auto", "important"); // Quebra o 16:9 fixo

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
        // ==============================================================================
      }
    } else {
      // Mostra o botão "Tela Cheia" novamente quando o modal fecha
      if (openButton) openButton.style.display = "block";

      const placeholder = document.getElementById(PLACEHOLDER_ID);
      if (placeholder && placeholder.parentElement) {
        // Devolve o vídeo ao placeholder
        placeholder.parentElement.replaceChild(videoContainer, placeholder);
        placeholder.remove();

        // ======================= LIMPEZA DE ESTILO ADICIONADA AQUI =======================
        // Remove os estilos inline para que o vídeo volte ao normal
        videoContainer.style.width = "";
        videoContainer.style.height = "";
        const iframe = videoContainer.querySelector("iframe");
        if (iframe) {
          iframe.style.width = "";
          iframe.style.height = "";
        }
        // ===============================================================================
      }
    }
  }, [isModalOpen, videoContainer]);

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
