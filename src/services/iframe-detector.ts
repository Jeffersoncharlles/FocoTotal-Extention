import { VIDEO_PLATFORM_PATTERNS } from "../config/video-platforms";
import { contentLogger } from "../config/logger";
import type {
  IframeVideoInfo,
  IframeDetectorConfig,
  IframeDimensions,
} from "./iframe-detector.types";
import { VideoPlatform } from "./iframe-detector.types";

/**
 * Configurações padrão para o detector de iframes
 */
const DEFAULT_CONFIG: Required<IframeDetectorConfig> = {
  minWidth: 400,
  minHeight: 300,
  excludeHidden: true,
};

/**
 * Detecta a plataforma de vídeo baseado na URL do iframe
 *
 * @param url - URL do iframe a ser analisada
 * @returns Nome da plataforma detectada ou 'unknown' se não identificada
 */
export function detectPlatformFromUrl(url: string): string {
  if (!url) {
    return VideoPlatform.Unknown;
  }

  for (const platform of VIDEO_PLATFORM_PATTERNS) {
    for (const pattern of platform.urlPatterns) {
      if (pattern.test(url)) {
        contentLogger.log(
          `🎯 Plataforma detectada: ${platform.name} (URL: ${url})`,
        );
        return platform.name;
      }
    }
  }

  contentLogger.log(`❓ Plataforma não identificada: ${url}`);
  return VideoPlatform.Unknown;
}

/**
 * Calcula as dimensões reais de um iframe
 *
 * @param iframe - Elemento iframe a ser medido
 * @returns Objeto com width, height e area calculada
 */
export function calculateIframeDimensions(
  iframe: HTMLIFrameElement,
): IframeDimensions {
  const rect = iframe.getBoundingClientRect();

  let width = rect.width;
  let height = rect.height;

  // Se getBoundingClientRect retornar 0, tenta pegar dos atributos ou estilo
  if (width === 0 || height === 0) {
    width = iframe.width ? Number.parseInt(iframe.width) : 0;
    height = iframe.height ? Number.parseInt(iframe.height) : 0;

    // Últma tentativa: computed style
    if (width === 0 || height === 0) {
      const computed = getComputedStyle(iframe);
      width = Number.parseFloat(computed.width) || 0;
      height = Number.parseFloat(computed.height) || 0;
    }
  }

  const area = width * height;

  return { width, height, area };
}

/**
 * Verifica se um iframe está visível na página
 *
 * @param iframe - Elemento iframe a ser verificado
 * @returns true se o iframe está visível, false caso contrário
 */
export function isIframeVisible(iframe: HTMLIFrameElement): boolean {
  const computed = getComputedStyle(iframe);

  // Verifica propriedades CSS que podem ocultar o elemento
  if (computed.display === "none") {
    return false;
  }

  if (computed.visibility === "hidden") {
    return false;
  }

  if (Number.parseFloat(computed.opacity) === 0) {
    return false;
  }

  // Verifica se tem dimensões válidas
  const dimensions = calculateIframeDimensions(iframe);
  if (dimensions.width === 0 || dimensions.height === 0) {
    return false;
  }

  return true;
}

/**
 * Verifica se um elemento é um container adequado para um player de vídeo
 *
 * Valida propriedades CSS e dimensões para garantir que o container
 * é apropriado para renderizar o botão de fullscreen
 *
 * @param element - Elemento a ser validado
 * @returns true se o elemento é adequado, false caso contrário
 */
export function isValidVideoContainer(element: HTMLElement): boolean {
  const computed = getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  // Verifica se está visível
  if (computed.display === "none" || computed.visibility === "hidden") {
    return false;
  }

  // Verifica dimensões mínimas (deve ser grande o suficiente para ser um player)
  if (rect.height < 200 || rect.width < 300) {
    return false;
  }

  return true;
}

/**
 * Encontra o melhor container para um iframe de vídeo
 *
 * Procura por elementos pais que sejam containers apropriados para o player.
 * Suporta detecção por classes, IDs e atributos data-* (ex: data-testid="embed-container"
 * usado pelo Cosmos/Anhanguera).
 *
 * @param iframe - Elemento iframe
 * @returns Elemento container ou o parentElement do iframe
 */
export function findVideoContainer(iframe: HTMLIFrameElement): HTMLElement {
  let currentElement: HTMLElement | null = iframe.parentElement;

  // Percorre até 5 níveis acima procurando por um container adequado
  let levels = 0;
  const maxLevels = 5;

  while (currentElement && levels < maxLevels) {
    const className = currentElement.className || "";
    const id = currentElement.id || "";

    // 🆕 Verifica atributos data-* (ex: data-testid="embed-container" do Cosmos/Anhanguera)
    const dataTestId = currentElement.getAttribute("data-testid") || "";
    const dataContainer = currentElement.getAttribute("data-container") || "";
    const dataVideoContainer =
      currentElement.getAttribute("data-video-container") || "";
    const dataPlayer = currentElement.getAttribute("data-player") || "";

    // Procura por classes/IDs/atributos que indiquem container de vídeo/player
    const videoKeywords = [
      "video",
      "player",
      "embed",
      "media",
      "iframe-container",
      "player-wrapper",
      "container", // 🆕 Adiciona "container" para pegar data-testid="embed-container"
    ];

    const hasVideoKeyword = videoKeywords.some(
      (keyword) =>
        className.toLowerCase().includes(keyword) ||
        id.toLowerCase().includes(keyword) ||
        dataTestId.toLowerCase().includes(keyword) ||
        dataContainer.toLowerCase().includes(keyword) ||
        dataVideoContainer.toLowerCase().includes(keyword) ||
        dataPlayer.toLowerCase().includes(keyword),
    );

    if (hasVideoKeyword) {
      // Log detalhado do container encontrado
      contentLogger.log(
        `📦 Container encontrado: ${currentElement.tagName}.${className || id || dataTestId}`,
      );
      contentLogger.log(`  - Classes: "${className}"`);
      contentLogger.log(`  - ID: "${id}"`);
      contentLogger.log(`  - data-testid: "${dataTestId}"`);
      contentLogger.log(`  - data-container: "${dataContainer}"`);
      contentLogger.log(
        `  - Dimensões: ${currentElement.getBoundingClientRect().width}x${currentElement.getBoundingClientRect().height}`,
      );

      return currentElement;
    }

    currentElement = currentElement.parentElement;
    levels++;
  }

  // Se não encontrou, retorna o parent direto ou body como fallback
  contentLogger.log(
    "⚠️ Nenhum container específico encontrado, usando parent direto como fallback",
  );
  return iframe.parentElement || document.body;
}

/**
 * Busca todos os iframes de vídeo válidos na página
 *
 * @param config - Configurações opcionais para filtragem
 * @returns Array de iframes que são potencialmente players de vídeo
 */
export function getVideoIframes(
  config?: IframeDetectorConfig,
): HTMLIFrameElement[] {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const allIframes = Array.from(document.querySelectorAll("iframe"));

  contentLogger.log(`🔍 Encontrados ${allIframes.length} iframes no total`);

  const videoIframes = allIframes.filter((iframe) => {
    const src = iframe.src || iframe.getAttribute("data-src") || "";

    // Deve ter um src válido
    if (!src) {
      return false;
    }

    // Verifica se é plataforma de vídeo
    const platform = detectPlatformFromUrl(src);
    if (platform === VideoPlatform.Unknown) {
      return false;
    }

    // Verifica visibilidade se configurado
    if (finalConfig.excludeHidden && !isIframeVisible(iframe)) {
      contentLogger.log(
        `👻 Iframe oculto ignorado: ${src.substring(0, 50)}...`,
      );
      return false;
    }

    // Verifica dimensões mínimas
    const dimensions = calculateIframeDimensions(iframe);
    if (
      dimensions.width < finalConfig.minWidth ||
      dimensions.height < finalConfig.minHeight
    ) {
      contentLogger.log(
        `📏 Iframe muito pequeno ignorado: ${dimensions.width}x${dimensions.height} (min: ${finalConfig.minWidth}x${finalConfig.minHeight})`,
      );
      return false;
    }

    return true;
  });

  contentLogger.log(
    `✅ ${videoIframes.length} iframes de vídeo válidos encontrados`,
  );

  return videoIframes;
}

/**
 * Detecta o vídeo principal da página
 *
 * Estratégia: O vídeo com maior área visível é considerado o principal.
 * Isso filtra thumbnails, vídeos recomendados e outros elementos pequenos.
 *
 * @param config - Configurações opcionais para detecção
 * @returns Informações do vídeo principal ou null se não encontrado
 */
export function detectPrimaryVideoIframe(
  config?: IframeDetectorConfig,
): IframeVideoInfo | null {
  const videoIframes = getVideoIframes(config);

  if (videoIframes.length === 0) {
    contentLogger.log("❌ Nenhum iframe de vídeo encontrado na página");
    return null;
  }

  // Mapeia cada iframe para um objeto com suas informações
  const iframesInfo: IframeVideoInfo[] = videoIframes.map((iframe) => {
    const src = iframe.src || iframe.getAttribute("data-src") || "";
    const platform = detectPlatformFromUrl(src);
    const dimensions = calculateIframeDimensions(iframe);
    const isVisible = isIframeVisible(iframe);
    const container = findVideoContainer(iframe);

    return {
      iframe,
      src,
      platform,
      container,
      dimensions,
      isVisible,
      isPrimaryVideo: false, // Será definido após ordenação
    };
  });

  // Ordena por área (maior primeiro)
  iframesInfo.sort((a, b) => b.dimensions.area - a.dimensions.area);

  // O primeiro (maior) é o vídeo principal
  const primaryVideo = iframesInfo[0];
  primaryVideo.isPrimaryVideo = true;

  contentLogger.log(
    `🎬 Vídeo principal detectado: ${primaryVideo.platform} (${primaryVideo.dimensions.width}x${primaryVideo.dimensions.height}, área: ${primaryVideo.dimensions.area}px²)`,
  );
  contentLogger.log(`📍 URL: ${primaryVideo.src}`);

  // Log dos outros vídeos encontrados (para debug)
  if (iframesInfo.length > 1) {
    contentLogger.log(
      `ℹ️ Outros ${iframesInfo.length - 1} vídeos encontrados (ignorados):`,
    );
    iframesInfo.slice(1).forEach((info, index) => {
      contentLogger.log(
        `  ${index + 1}. ${info.platform} - ${info.dimensions.width}x${info.dimensions.height} (${info.dimensions.area}px²)`,
      );
    });
  }

  return primaryVideo;
}
