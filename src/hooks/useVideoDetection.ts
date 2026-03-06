import { contentLogger } from "../config/logger";
import { PLATFORM_SELECTORS } from "../config/plataform";
import {
  detectPrimaryVideoIframe,
  isValidVideoContainer,
} from "../services/iframe-detector";

export interface VideoDetectionResult {
  container: HTMLElement;
  src: string;
  success: boolean;
}

export interface UseVideoDetectionConfig {
  useIframeDetector: boolean;
}

/**
 * Hook para detecção de vídeos na página
 *
 * Encapsula as estratégias de detecção:
 * - Método novo: iframe-detector (detecção inteligente)
 * - Método legado: seletores de plataforma (fallback)
 */
export function useVideoDetection(config: UseVideoDetectionConfig) {
  /**
   * 🆕 NOVO MÉTODO: Detecção inteligente de iframe usando iframe-detector
   */
  function detectWithIframeDetector(): VideoDetectionResult | null {
    contentLogger.log("🔍 [IFRAME DETECTOR] Buscando vídeo principal...");

    try {
      const videoInfo = detectPrimaryVideoIframe({
        minWidth: 400,
        minHeight: 300,
        excludeHidden: true,
      });

      if (videoInfo && videoInfo.isPrimaryVideo) {
        contentLogger.log(`🎬 [IFRAME DETECTOR] Vídeo principal encontrado!`);
        contentLogger.log(`  📍 Plataforma: ${videoInfo.platform}`);
        contentLogger.log(
          `  📐 Dimensões: ${videoInfo.dimensions.width}x${videoInfo.dimensions.height} (área: ${videoInfo.dimensions.area}px²)`,
        );
        contentLogger.log(`  🔗 URL: ${videoInfo.src}`);

        // Valida se o container retornado é adequado
        const containerIsValid = isValidVideoContainer(videoInfo.container);

        contentLogger.log(
          `  📦 Container: ${videoInfo.container.tagName}${
            videoInfo.container.className
              ? `.${videoInfo.container.className}`
              : ""
          }${videoInfo.container.id ? `#${videoInfo.container.id}` : ""}`,
        );
        contentLogger.log(
          `  ✅ Container válido: ${containerIsValid ? "SIM" : "NÃO (tentará fallback)"}`,
        );

        // Se container for inválido, tenta buscar com método legado
        if (!containerIsValid) {
          contentLogger.log(
            "🔄 Container inadequado, tentando método legado para buscar container correto...",
          );

          // Tenta encontrar container com seletores legados
          for (const platformSelector of PLATFORM_SELECTORS) {
            const legacyContainer = document.querySelector(platformSelector);
            if (legacyContainer) {
              const iframe = legacyContainer.querySelector("iframe");
              if (iframe && iframe.src === videoInfo.src) {
                contentLogger.log(
                  `✅ [FALLBACK] Container correto encontrado com seletor legado: ${platformSelector}`,
                );
                // Usa o container do método legado
                videoInfo.container = legacyContainer as HTMLElement;
                break;
              }
            }
          }
        }

        return {
          container: videoInfo.container,
          src: videoInfo.src,
          success: true,
        };
      } else {
        contentLogger.log(
          "❌ [IFRAME DETECTOR] Nenhum vídeo principal encontrado",
        );
        return null;
      }
    } catch (error) {
      contentLogger.log("⚠️ [IFRAME DETECTOR] Erro na detecção:", error);
      return null;
    }
  }

  /**
   * 📜 MÉTODO LEGADO: Detecção por seletores de plataforma fixos
   */
  function detectWithLegacySelectors(): VideoDetectionResult | null {
    contentLogger.log("🔍 [LEGADO] Verificando vídeos com seletores...");
    contentLogger.log(
      `Seletores disponíveis: ${PLATFORM_SELECTORS.join(", ")}`,
    );

    let foundContainer = false;
    let foundIframe = false;

    for (const platformSelector of PLATFORM_SELECTORS) {
      const videoContainer = document.querySelector(platformSelector);
      if (videoContainer) {
        foundContainer = true;
        contentLogger.log(`✅ Container encontrado: ${platformSelector}`);
        contentLogger.log(`Container HTML:`, videoContainer);

        const iframe = videoContainer.querySelector("iframe");
        if (iframe) {
          foundIframe = true;
          contentLogger.log(`✅ Iframe encontrado dentro do container`);
          contentLogger.log(`Iframe src: "${iframe.src}"`);

          if (iframe.src) {
            contentLogger.log(
              `🎉 [LEGADO] Vídeo encontrado! Renderizando botão...`,
            );
            return {
              container: videoContainer as HTMLElement,
              src: iframe.src,
              success: true,
            };
          } else {
            contentLogger.log(`⚠️ Iframe encontrado mas sem src`);
          }
        } else {
          contentLogger.log(`❌ Nenhum iframe encontrado dentro do container`);
          // Vamos ver se há um vídeo tag diretamente
          const video = videoContainer.querySelector("video");
          if (video) {
            contentLogger.log(
              `🎥 Tag <video> encontrada (não suportado ainda):`,
              video,
            );
          }
        }
      }
    }

    if (!foundContainer) {
      contentLogger.log(
        `❌ [LEGADO] Nenhum container encontrado com os seletores: ${PLATFORM_SELECTORS.join(
          ", ",
        )}`,
      );
      contentLogger.log(
        "💡 Dica: Abra o DevTools, vá na aba Elements e procure pelo player de vídeo. Anote a classe/id do elemento pai do iframe/video.",
      );
    } else if (!foundIframe) {
      contentLogger.log(
        "⚠️ [LEGADO] Container encontrado mas sem iframe. Verifique se o vídeo usa tag <video> ou <iframe>.",
      );
    }

    return null;
  }

  /**
   * 🎯 FUNÇÃO PRINCIPAL: Detecta vídeo com fallback automático
   *
   * Estratégia:
   * 1. Se useIframeDetector = true, tenta novo método primeiro
   * 2. Se novo método falha, usa método legado como fallback
   * 3. Se useIframeDetector = false, usa apenas método legado
   */
  function detectVideo(): VideoDetectionResult | null {
    contentLogger.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    contentLogger.log("Verificando presença de vídeos na página...");
    contentLogger.log(`URL atual: ${window.location.href}`);

    let result: VideoDetectionResult | null = null;

    if (config.useIframeDetector) {
      // Tenta o novo método primeiro
      result = detectWithIframeDetector();

      if (!result) {
        // Fallback para método legado
        contentLogger.log("🔄 Tentando método legado como fallback...");
        result = detectWithLegacySelectors();
      }
    } else {
      // Usa apenas método legado
      result = detectWithLegacySelectors();
    }

    contentLogger.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    return result;
  }

  return {
    detectVideo,
  };
}
