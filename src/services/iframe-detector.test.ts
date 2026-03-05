import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  detectPlatformFromUrl,
  calculateIframeDimensions,
  isIframeVisible,
  getVideoIframes,
  detectPrimaryVideoIframe,
  findVideoContainer,
} from "./iframe-detector";
import { VideoPlatform } from "./iframe-detector.types";

describe("iframe-detector", () => {
  beforeEach(() => {
    // Limpa o DOM antes de cada teste
    document.body.innerHTML = "";
  });

  describe("detectPlatformFromUrl", () => {
    it("deve detectar YouTube com diferentes variações de URL", () => {
      expect(
        detectPlatformFromUrl("https://www.youtube.com/embed/abc123"),
      ).toBe(VideoPlatform.YouTube);
      expect(
        detectPlatformFromUrl("https://www.youtube-nocookie.com/embed/abc123"),
      ).toBe(VideoPlatform.YouTube);
      expect(detectPlatformFromUrl("https://youtu.be/abc123")).toBe(
        VideoPlatform.YouTube,
      );
    });

    it("deve detectar Vimeo", () => {
      expect(
        detectPlatformFromUrl("https://player.vimeo.com/video/123456"),
      ).toBe(VideoPlatform.Vimeo);
      expect(detectPlatformFromUrl("https://vimeo.com/video/123456")).toBe(
        VideoPlatform.Vimeo,
      );
    });

    it("deve detectar Hotmart", () => {
      expect(detectPlatformFromUrl("https://player.hotmart.com/abc")).toBe(
        VideoPlatform.Hotmart,
      );
      expect(detectPlatformFromUrl("https://app.hotmart.com/video/123")).toBe(
        VideoPlatform.Hotmart,
      );
    });

    it("deve detectar Rocketseat", () => {
      expect(
        detectPlatformFromUrl("https://app.rocketseat.com.br/course/123"),
      ).toBe(VideoPlatform.Rocketseat);
      expect(
        detectPlatformFromUrl("https://platform.rocketseat.com.br/player"),
      ).toBe(VideoPlatform.Rocketseat);
    });

    it("deve detectar Estácio", () => {
      expect(detectPlatformFromUrl("https://webaula.estacio.br/player")).toBe(
        VideoPlatform.Estacio,
      );
      expect(detectPlatformFromUrl("https://ava.estacio.br/video")).toBe(
        VideoPlatform.Estacio,
      );
    });

    it("deve detectar Unianhanguera", () => {
      expect(
        detectPlatformFromUrl("https://ava.unianhanguera.edu.br/player"),
      ).toBe(VideoPlatform.Unianhanguera);
      expect(
        detectPlatformFromUrl("https://aluno.unianhanguera.edu.br/video"),
      ).toBe(VideoPlatform.Unianhanguera);
    });

    it("deve detectar Anhanguera", () => {
      expect(detectPlatformFromUrl("https://ava.anhanguera.com/player")).toBe(
        VideoPlatform.Anhanguera,
      );
      expect(detectPlatformFromUrl("https://aluno.anhanguera.com/video")).toBe(
        VideoPlatform.Anhanguera,
      );
    });

    it("deve detectar Wistia", () => {
      expect(
        detectPlatformFromUrl("https://fast.wistia.net/embed/iframe/abc123"),
      ).toBe(VideoPlatform.Wistia);
    });

    it("deve detectar Vidyard", () => {
      expect(detectPlatformFromUrl("https://play.vidyard.com/abc123")).toBe(
        VideoPlatform.Vidyard,
      );
    });

    it("deve detectar URLs genéricas de vídeo", () => {
      expect(detectPlatformFromUrl("https://example.com/player/123")).toBe(
        VideoPlatform.Generic,
      );
      expect(detectPlatformFromUrl("https://example.com/embed/video")).toBe(
        VideoPlatform.Generic,
      );
      expect(detectPlatformFromUrl("https://example.com/video/watch")).toBe(
        VideoPlatform.Generic,
      );
    });

    it("deve retornar 'unknown' para URLs não relacionadas a vídeo", () => {
      expect(detectPlatformFromUrl("https://google.com")).toBe(
        VideoPlatform.Unknown,
      );
      expect(detectPlatformFromUrl("https://example.com/about")).toBe(
        VideoPlatform.Unknown,
      );
    });

    it("deve retornar 'unknown' para URL vazia ou inválida", () => {
      expect(detectPlatformFromUrl("")).toBe(VideoPlatform.Unknown);
    });
  });

  describe("calculateIframeDimensions", () => {
    it("deve calcular dimensões corretamente usando getBoundingClientRect", () => {
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      // Mock getBoundingClientRect
      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const dimensions = calculateIframeDimensions(iframe);

      expect(dimensions.width).toBe(800);
      expect(dimensions.height).toBe(450);
      expect(dimensions.area).toBe(360000);
    });

    it("deve usar atributos width/height como fallback", () => {
      const iframe = document.createElement("iframe");
      iframe.width = "640";
      iframe.height = "360";
      document.body.appendChild(iframe);

      // Mock getBoundingClientRect retornando 0
      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const dimensions = calculateIframeDimensions(iframe);

      expect(dimensions.width).toBe(640);
      expect(dimensions.height).toBe(360);
      expect(dimensions.area).toBe(230400);
    });

    it("deve calcular área corretamente", () => {
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 1920,
        height: 1080,
        top: 0,
        left: 0,
        bottom: 1080,
        right: 1920,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const dimensions = calculateIframeDimensions(iframe);

      expect(dimensions.area).toBe(2073600); // 1920 * 1080
    });
  });

  describe("isIframeVisible", () => {
    it("deve retornar true para iframe visível", () => {
      const iframe = document.createElement("iframe");
      iframe.style.width = "800px";
      iframe.style.height = "450px";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      expect(isIframeVisible(iframe)).toBe(true);
    });

    it("deve retornar false para iframe com display:none", () => {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.width = "800px";
      iframe.style.height = "450px";
      document.body.appendChild(iframe);

      expect(isIframeVisible(iframe)).toBe(false);
    });

    it("deve retornar false para iframe com visibility:hidden", () => {
      const iframe = document.createElement("iframe");
      iframe.style.visibility = "hidden";
      iframe.style.width = "800px";
      iframe.style.height = "450px";
      document.body.appendChild(iframe);

      expect(isIframeVisible(iframe)).toBe(false);
    });

    it("deve retornar false para iframe com opacity:0", () => {
      const iframe = document.createElement("iframe");
      iframe.style.opacity = "0";
      iframe.style.width = "800px";
      iframe.style.height = "450px";
      document.body.appendChild(iframe);

      expect(isIframeVisible(iframe)).toBe(false);
    });

    it("deve retornar false para iframe com dimensões zero", () => {
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      expect(isIframeVisible(iframe)).toBe(false);
    });
  });

  describe("findVideoContainer", () => {
    it("deve encontrar container com classe relacionada a vídeo", () => {
      const container = document.createElement("div");
      container.className = "video-player-wrapper";
      const iframe = document.createElement("iframe");
      container.appendChild(iframe);
      document.body.appendChild(container);

      const foundContainer = findVideoContainer(iframe);

      expect(foundContainer).toBe(container);
      expect(foundContainer.className).toBe("video-player-wrapper");
    });

    it("deve encontrar container com ID relacionado a player", () => {
      const container = document.createElement("div");
      container.id = "main-player";
      const iframe = document.createElement("iframe");
      container.appendChild(iframe);
      document.body.appendChild(container);

      const foundContainer = findVideoContainer(iframe);

      expect(foundContainer).toBe(container);
    });

    it("deve retornar parentElement se não encontrar container específico", () => {
      const parent = document.createElement("div");
      parent.className = "some-random-class";
      const iframe = document.createElement("iframe");
      parent.appendChild(iframe);
      document.body.appendChild(parent);

      const foundContainer = findVideoContainer(iframe);

      expect(foundContainer).toBe(parent);
    });

    it("deve buscar até 5 níveis acima", () => {
      const level5 = document.createElement("div");
      level5.className = "video-container";
      const level4 = document.createElement("div");
      const level3 = document.createElement("div");
      const level2 = document.createElement("div");
      const level1 = document.createElement("div");
      const iframe = document.createElement("iframe");

      level5.appendChild(level4);
      level4.appendChild(level3);
      level3.appendChild(level2);
      level2.appendChild(level1);
      level1.appendChild(iframe);
      document.body.appendChild(level5);

      const foundContainer = findVideoContainer(iframe);

      expect(foundContainer).toBe(level5);
    });
  });

  describe("getVideoIframes", () => {
    it("deve retornar array vazio quando não há iframes", () => {
      const iframes = getVideoIframes();
      expect(iframes).toEqual([]);
    });

    it("deve filtrar iframes sem src", () => {
      const iframe = document.createElement("iframe");
      document.body.appendChild(iframe);

      const iframes = getVideoIframes();
      expect(iframes).toEqual([]);
    });

    it("deve filtrar iframes de plataformas não relacionadas a vídeo", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://google.com/maps/embed";
      document.body.appendChild(iframe);

      const iframes = getVideoIframes();
      expect(iframes).toEqual([]);
    });

    it("deve retornar iframes de plataformas de vídeo válidas", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/abc123";
      iframe.style.width = "800px";
      iframe.style.height = "450px";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const iframes = getVideoIframes();
      expect(iframes).toHaveLength(1);
      expect(iframes[0]).toBe(iframe);
    });

    it("deve filtrar iframes ocultos quando excludeHidden é true", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/abc123";
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      const iframes = getVideoIframes({ excludeHidden: true });
      expect(iframes).toEqual([]);
    });

    it("deve filtrar iframes menores que dimensões mínimas", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/abc123";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 120,
        height: 90,
        top: 0,
        left: 0,
        bottom: 90,
        right: 120,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const iframes = getVideoIframes({
        minWidth: 400,
        minHeight: 300,
      });

      expect(iframes).toEqual([]);
    });

    it("deve permitir configurar dimensões mínimas customizadas", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/abc123";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 300,
        height: 200,
        top: 0,
        left: 0,
        bottom: 200,
        right: 300,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const iframes = getVideoIframes({
        minWidth: 200,
        minHeight: 150,
      });

      expect(iframes).toHaveLength(1);
    });
  });

  describe("detectPrimaryVideoIframe", () => {
    it("deve retornar null quando não há iframes de vídeo", () => {
      const result = detectPrimaryVideoIframe();
      expect(result).toBeNull();
    });

    it("deve detectar o iframe de vídeo único como principal", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/abc123";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const result = detectPrimaryVideoIframe();

      expect(result).not.toBeNull();
      expect(result?.iframe).toBe(iframe);
      expect(result?.isPrimaryVideo).toBe(true);
      expect(result?.platform).toBe(VideoPlatform.YouTube);
      expect(result?.dimensions.width).toBe(800);
      expect(result?.dimensions.height).toBe(450);
    });

    it("deve selecionar o iframe maior quando há múltiplos vídeos", () => {
      // Iframe pequeno (thumbnail)
      const smallIframe = document.createElement("iframe");
      smallIframe.src = "https://www.youtube.com/embed/small";
      smallIframe.id = "small";
      document.body.appendChild(smallIframe);

      vi.spyOn(smallIframe, "getBoundingClientRect").mockReturnValue({
        width: 120,
        height: 90,
        top: 0,
        left: 0,
        bottom: 90,
        right: 120,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      // Iframe grande (vídeo principal)
      const largeIframe = document.createElement("iframe");
      largeIframe.src = "https://www.youtube.com/embed/large";
      largeIframe.id = "large";
      document.body.appendChild(largeIframe);

      vi.spyOn(largeIframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const result = detectPrimaryVideoIframe({
        minWidth: 100,
        minHeight: 80,
      });

      expect(result).not.toBeNull();
      expect(result?.iframe.id).toBe("large");
      expect(result?.isPrimaryVideo).toBe(true);
      expect(result?.dimensions.area).toBe(360000); // 800 * 450
    });

    it("deve incluir informações completas do vídeo detectado", () => {
      const container = document.createElement("div");
      container.className = "video-player";
      const iframe = document.createElement("iframe");
      iframe.src = "https://player.vimeo.com/video/123456";
      container.appendChild(iframe);
      document.body.appendChild(container);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 640,
        height: 360,
        top: 0,
        left: 0,
        bottom: 360,
        right: 640,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const result = detectPrimaryVideoIframe();

      expect(result).not.toBeNull();
      expect(result?.iframe).toBe(iframe);
      expect(result?.src).toBe("https://player.vimeo.com/video/123456");
      expect(result?.platform).toBe(VideoPlatform.Vimeo);
      expect(result?.container).toBe(container);
      expect(result?.isVisible).toBe(true);
      expect(result?.isPrimaryVideo).toBe(true);
    });
  });

  describe("Brazilian Platforms Detection", () => {
    it("deve detectar corretamente plataforma Rocketseat", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://app.rocketseat.com.br/node/course/video/123";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const result = detectPrimaryVideoIframe();

      expect(result).not.toBeNull();
      expect(result?.platform).toBe(VideoPlatform.Rocketseat);
    });

    it("deve detectar corretamente plataforma Estácio", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://webaula.estacio.br/player/123";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const result = detectPrimaryVideoIframe();

      expect(result).not.toBeNull();
      expect(result?.platform).toBe(VideoPlatform.Estacio);
    });

    it("deve detectar corretamente plataforma Unianhanguera", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://ava.unianhanguera.edu.br/video/player";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const result = detectPrimaryVideoIframe();

      expect(result).not.toBeNull();
      expect(result?.platform).toBe(VideoPlatform.Unianhanguera);
    });

    it("deve detectar corretamente plataforma Anhanguera", () => {
      const iframe = document.createElement("iframe");
      iframe.src = "https://ava.anhanguera.com/player";
      document.body.appendChild(iframe);

      vi.spyOn(iframe, "getBoundingClientRect").mockReturnValue({
        width: 800,
        height: 450,
        top: 0,
        left: 0,
        bottom: 450,
        right: 800,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      });

      const result = detectPrimaryVideoIframe();

      expect(result).not.toBeNull();
      expect(result?.platform).toBe(VideoPlatform.Anhanguera);
    });
  });
});
