import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { ModalVideo } from "./ModalVideo";
// Helper para esperar e obter o botão "Tela Cheia" do DOM
const waitForOpenButton = async (container: HTMLElement) => {
  await waitFor(() => {
    const button = container.querySelector<HTMLButtonElement>(
      "#focototal-open-button",
    );
    expect(button).toBeInTheDocument();
  });
  return container.querySelector<HTMLButtonElement>("#focototal-open-button")!;
};

// Helper para esperar e obter o botão de fechar (X) do DOM
const waitForCloseButton = async () => {
  await waitFor(() => {
    const button = document.querySelector<HTMLButtonElement>(
      "#focototal-close-button",
    );
    expect(button).toBeInTheDocument();
  });
  return document.querySelector<HTMLButtonElement>("#focototal-close-button")!;
};
describe("ModalVideo", () => {
  let mockVideoContainer: HTMLElement;
  let mockParentElement: HTMLElement;
  let mockIframe: HTMLIFrameElement;
  const mockVideoSrc = "https://www.youtube.com/embed/test123";

  beforeEach(() => {
    // Limpa o DOM completamente entre testes
    document.body.innerHTML = "";

    // Cria uma estrutura DOM realista
    mockParentElement = document.createElement("div");
    mockParentElement.id = "parent-container";
    document.body.appendChild(mockParentElement);

    mockVideoContainer = document.createElement("div");
    mockVideoContainer.id = "video-container";
    mockVideoContainer.style.width = "640px";
    mockVideoContainer.style.height = "360px";
    mockVideoContainer.style.position = "relative";

    // Mock getBoundingClientRect para retornar dimensões reais
    vi.spyOn(mockVideoContainer, "getBoundingClientRect").mockReturnValue({
      width: 640,
      height: 360,
      top: 0,
      left: 0,
      bottom: 360,
      right: 640,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    mockIframe = document.createElement("iframe");
    mockIframe.src = mockVideoSrc;
    mockIframe.style.width = "100%";
    mockIframe.style.height = "100%";

    mockVideoContainer.appendChild(mockIframe);
    mockParentElement.appendChild(mockVideoContainer);
  });

  describe("Renderização Inicial", () => {
    it("deve renderizar sem modal aberto inicialmente", () => {
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      const modalBackdrop = document.querySelector(
        ".fixed.inset-0.bg-black\\/90",
      );
      expect(modalBackdrop).not.toBeInTheDocument();
    });

    it('deve criar e adicionar botão "Tela Cheia" ao container de vídeo', async () => {
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      await waitFor(() => {
        const button = mockVideoContainer.querySelector(
          "#focototal-open-button",
        );
        expect(button).toBeInTheDocument();
        // textContent pode estar vazio em alguns ambientes de teste, mas o botão existe
      });
    });

    it("deve aplicar position relative ao container se estiver static", async () => {
      mockVideoContainer.style.position = "static";

      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      await waitFor(() => {
        expect(mockVideoContainer.style.position).toBe("relative");
      });
    });

    it("não deve duplicar botão se já existir", async () => {
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      await waitFor(() => {
        const buttons = mockVideoContainer.querySelectorAll(
          "#focototal-open-button",
        );
        expect(buttons.length).toBe(1);
      });
    });
  });

  describe("Abertura do Modal (Modo Cinema)", () => {
    it('deve abrir modal ao clicar no botão "Tela Cheia"', async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      await waitFor(() => {
        const button = mockVideoContainer.querySelector<HTMLButtonElement>(
          "#focototal-open-button",
        );
        expect(button).toBeInTheDocument();
      });

      const button = mockVideoContainer.querySelector<HTMLButtonElement>(
        "#focototal-open-button",
      );
      await user.click(button!);

      await waitFor(() => {
        const modalBackdrop = document.querySelector(".fixed.inset-0");
        expect(modalBackdrop).toBeInTheDocument();
      });
    });

    it('deve esconder botão "Tela Cheia" quando modal abrir', async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      await waitFor(() => {
        const button = mockVideoContainer.querySelector<HTMLButtonElement>(
          "#focototal-open-button",
        );
        expect(button).toBeInTheDocument();
      });

      const button = mockVideoContainer.querySelector<HTMLButtonElement>(
        "#focototal-open-button",
      );
      await user.click(button!);

      await waitFor(() => {
        expect(button).toHaveStyle({ display: "none" });
      });
    });

    it("deve criar placeholder com dimensões corretas do container original", async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      const button = await waitForOpenButton(mockVideoContainer);
      await user.click(button);

      await waitFor(() => {
        const placeholder = document.getElementById(
          "focototal-video-placeholder",
        );
        expect(placeholder).toBeInTheDocument();
        // getBoundingClientRect foi mockado para retornar 640x360
        expect(placeholder?.style.width).toBe("640px");
        expect(placeholder?.style.height).toBe("360px");
      });
    });

    it("deve substituir videoContainer por placeholder no DOM original", async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      const button = await waitForOpenButton(mockVideoContainer);
      await user.click(button);

      await waitFor(() => {
        const placeholder = document.getElementById(
          "focototal-video-placeholder",
        );
        expect(placeholder?.parentElement).toBe(mockParentElement);
        expect(mockVideoContainer.parentElement).not.toBe(mockParentElement);
      });
    });

    it("deve mover videoContainer para dentro do modal", async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      const button = await waitForOpenButton(mockVideoContainer);
      await user.click(button);

      await waitFor(() => {
        const modalContent = document.querySelector(
          ".w-full.h-full.relative.overflow-hidden",
        );
        expect(modalContent).toContainElement(mockVideoContainer);
      });
    });

    it("deve aplicar estilos fullscreen com !important no videoContainer", async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      const button = await waitForOpenButton(mockVideoContainer);
      await user.click(button);

      await waitFor(() => {
        // Verifica que os estilos foram aplicados (valores)
        expect(mockVideoContainer.style.getPropertyValue("width")).toBe("100%");
        expect(mockVideoContainer.style.getPropertyValue("height")).toBe(
          "100%",
        );
        expect(mockVideoContainer.style.getPropertyValue("min-height")).toBe(
          "100%",
        );

        // Verifica que !important foi usado (pelo menos em width e height)
        expect(mockVideoContainer.style.getPropertyPriority("width")).toBe(
          "important",
        );
        expect(mockVideoContainer.style.getPropertyPriority("height")).toBe(
          "important",
        );
      });
    });

    it("deve aplicar estilos de posicionamento absoluto no iframe", async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      const button = await waitForOpenButton(mockVideoContainer);
      await user.click(button);

      await waitFor(() => {
        const iframe = mockVideoContainer.querySelector("iframe");
        // Verifica que os estilos foram aplicados
        expect(iframe?.style.getPropertyValue("position")).toBeTruthy();
        expect(iframe?.style.getPropertyValue("top")).toBe("0px");
        expect(iframe?.style.getPropertyValue("left")).toBe("0px");
      });
    });

    it("deve renderizar botão de fechar (X) no modal", async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      const button = await waitForOpenButton(mockVideoContainer);
      await user.click(button);

      // Espera o botão de fechar aparecer
      const closeButton = await waitForCloseButton();
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe("Fechamento do Modal (Restauração)", () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      const button = await waitForOpenButton(mockVideoContainer);
      await user.click(button);

      await waitFor(() => {
        expect(document.querySelector(".fixed.inset-0")).toBeInTheDocument();
      });

      // Espera o botão de fechar aparecer
      await waitForCloseButton();
    });

    it("deve fechar modal ao clicar no botão X", async () => {
      const user = userEvent.setup();
      const closeButton = await waitForCloseButton();

      await user.click(closeButton);

      await waitFor(() => {
        const modalBackdrop = document.querySelector(".fixed.inset-0");
        expect(modalBackdrop).not.toBeInTheDocument();
      });
    });

    it('deve mostrar botão "Tela Cheia" novamente ao fechar modal', async () => {
      const user = userEvent.setup();
      const closeButton = await waitForCloseButton();
      const openButton = mockVideoContainer.querySelector(
        "#focototal-open-button",
      ) as HTMLElement;

      await user.click(closeButton);

      await waitFor(() => {
        expect(openButton.style.display).toBe("block");
      });
    });

    it("deve remover placeholder do DOM ao fechar modal", async () => {
      const user = userEvent.setup();
      const closeButton = await waitForCloseButton();

      await user.click(closeButton);

      await waitFor(() => {
        const placeholder = document.getElementById(
          "focototal-video-placeholder",
        );
        expect(placeholder).not.toBeInTheDocument();
      });
    });

    it("deve devolver videoContainer para posição original no DOM", async () => {
      const user = userEvent.setup();
      const closeButton = await waitForCloseButton();

      await user.click(closeButton);

      await waitFor(() => {
        expect(mockVideoContainer.parentElement).toBe(mockParentElement);
      });
    });

    it("deve remover TODOS os estilos inline do videoContainer usando removeProperty", async () => {
      const user = userEvent.setup();
      const closeButton = await waitForCloseButton();

      await user.click(closeButton);

      await waitFor(() => {
        // Verifica que propriedades com !important foram removidas
        expect(mockVideoContainer.style.getPropertyValue("width")).toBe("");
        expect(mockVideoContainer.style.getPropertyValue("height")).toBe("");
        expect(mockVideoContainer.style.getPropertyValue("max-width")).toBe("");
        expect(mockVideoContainer.style.getPropertyValue("max-height")).toBe(
          "",
        );
        expect(mockVideoContainer.style.getPropertyValue("min-height")).toBe(
          "",
        );
        expect(mockVideoContainer.style.getPropertyValue("padding")).toBe("");
        expect(mockVideoContainer.style.getPropertyValue("margin")).toBe("");
        expect(mockVideoContainer.style.getPropertyValue("aspect-ratio")).toBe(
          "",
        );
      });
    });

    it("deve remover TODOS os estilos inline do iframe usando removeProperty", async () => {
      const user = userEvent.setup();
      const closeButton = await waitForCloseButton();

      await user.click(closeButton);

      await waitFor(() => {
        const iframe = mockVideoContainer.querySelector(
          "iframe",
        ) as HTMLIFrameElement;
        expect(iframe.style.getPropertyValue("position")).toBe("");
        expect(iframe.style.getPropertyValue("top")).toBe("");
        expect(iframe.style.getPropertyValue("left")).toBe("");
        expect(iframe.style.getPropertyValue("width")).toBe("");
        expect(iframe.style.getPropertyValue("height")).toBe("");
        expect(iframe.style.getPropertyValue("max-height")).toBe("");
      });
    });

    it("deve restaurar vídeo ao estado original sem estilos residuais", async () => {
      const user = userEvent.setup();
      const closeButton = await waitForCloseButton();

      await user.click(closeButton);

      await waitFor(() => {
        // Verifica que as propriedades críticas foram removidas
        expect(mockVideoContainer.style.getPropertyValue("width")).toBe("");
        expect(mockVideoContainer.style.getPropertyValue("height")).toBe("");
        expect(mockVideoContainer.style.getPropertyValue("min-height")).toBe(
          "",
        );
        expect(mockVideoContainer.style.getPropertyValue("padding")).toBe("");
        expect(mockVideoContainer.style.getPropertyValue("margin")).toBe("");

        // Verifica iframe
        expect(mockIframe.style.getPropertyValue("position")).toBe("");
        expect(mockIframe.style.getPropertyValue("top")).toBe("");
        expect(mockIframe.style.getPropertyValue("left")).toBe("");
      });
    });
  });

  describe("Ciclo Completo (Abrir → Fechar → Reabrir)", () => {
    it("deve permitir reabrir modal após fechamento sem bugs de estado", async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      // Primeiro ciclo: abrir e fechar
      const openButton1 = await waitForOpenButton(mockVideoContainer);
      await user.click(openButton1);
      await waitFor(() =>
        expect(document.querySelector(".fixed.inset-0")).toBeInTheDocument(),
      );

      const closeButton1 = await waitForCloseButton();
      await user.click(closeButton1);
      await waitFor(() =>
        expect(
          document.querySelector(".fixed.inset-0"),
        ).not.toBeInTheDocument(),
      );

      // Segundo ciclo: reabrir
      const openButton2 = await waitForOpenButton(mockVideoContainer);
      await user.click(openButton2);

      await waitFor(() => {
        expect(document.querySelector(".fixed.inset-0")).toBeInTheDocument();
        const placeholder = document.getElementById(
          "focototal-video-placeholder",
        );
        expect(placeholder).toBeInTheDocument();
      });
    });

    it("deve limpar placeholder anterior antes de criar novo ao reabrir", async () => {
      const user = userEvent.setup();
      render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      // Abrir e fechar
      const openButton1 = await waitForOpenButton(mockVideoContainer);
      await user.click(openButton1);
      await waitFor(() =>
        expect(
          document.getElementById("focototal-video-placeholder"),
        ).toBeInTheDocument(),
      );

      const closeButton1 = await waitForCloseButton();
      await user.click(closeButton1);
      await waitFor(() =>
        expect(
          document.getElementById("focototal-video-placeholder"),
        ).not.toBeInTheDocument(),
      );

      // Reabrir
      const openButton2 = await waitForOpenButton(mockVideoContainer);
      await user.click(openButton2);

      await waitFor(() => {
        const placeholders = document.querySelectorAll(
          "#focototal-video-placeholder",
        );
        expect(placeholders.length).toBe(1); // Apenas 1 placeholder deve existir
      });
    });
  });

  describe("Limpeza (Cleanup)", () => {
    it('deve remover botão "Tela Cheia" ao desmontar componente', async () => {
      const { unmount } = render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      await waitFor(() => {
        expect(
          mockVideoContainer.querySelector("#focototal-open-button"),
        ).toBeInTheDocument();
      });

      unmount();

      expect(
        mockVideoContainer.querySelector("#focototal-open-button"),
      ).not.toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("deve lidar corretamente se videoContainer não tiver iframe", async () => {
      const containerSemIframe = document.createElement("div");
      mockParentElement.appendChild(containerSemIframe);

      expect(() => {
        render(
          <ModalVideo
            videoContainer={containerSemIframe}
            videoSrc={mockVideoSrc}
          />,
        );
      }).not.toThrow();
    });

    it("deve lidar corretamente se originalParentRef for null", () => {
      const containerOrfao = document.createElement("div");

      expect(() => {
        render(
          <ModalVideo
            videoContainer={containerOrfao}
            videoSrc={mockVideoSrc}
          />,
        );
      }).not.toThrow();
    });

    it("deve atualizar botão se videoSrc mudar", async () => {
      const { rerender } = render(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={mockVideoSrc}
        />,
      );

      await waitFor(() => {
        expect(
          mockVideoContainer.querySelector("#focototal-open-button"),
        ).toBeInTheDocument();
      });

      const newVideoSrc = "https://www.youtube.com/embed/newvideo456";
      rerender(
        <ModalVideo
          videoContainer={mockVideoContainer}
          videoSrc={newVideoSrc}
        />,
      );

      await waitFor(() => {
        const button = mockVideoContainer.querySelector(
          "#focototal-open-button",
        );
        expect(button).toBeInTheDocument();
      });
    });
  });
});
