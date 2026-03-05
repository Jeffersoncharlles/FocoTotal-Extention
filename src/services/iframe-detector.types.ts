/**
 * Plataformas de vídeo suportadas
 */
export const VideoPlatform = {
  YouTube: "youtube",
  Vimeo: "vimeo",
  Hotmart: "hotmart",
  Rocketseat: "rocketseat",
  Estacio: "estacio",
  Unianhanguera: "unianhanguera",
  Anhanguera: "anhanguera",
  Wistia: "wistia",
  Vidyard: "vidyard",
  Generic: "generic",
  Unknown: "unknown",
} as const;

export type VideoPlatformType =
  (typeof VideoPlatform)[keyof typeof VideoPlatform];

/**
 * Dimensões calculadas de um iframe
 */
export interface IframeDimensions {
  width: number;
  height: number;
  area: number;
}

/**
 * Informações sobre um iframe de vídeo detectado
 */
export interface IframeVideoInfo {
  /** Referência ao elemento iframe */
  iframe: HTMLIFrameElement;
  /** URL do iframe */
  src: string;
  /** Plataforma detectada */
  platform: string;
  /** Container pai do iframe */
  container: HTMLElement;
  /** Dimensões calculadas do iframe */
  dimensions: IframeDimensions;
  /** Se o iframe está visível na página */
  isVisible: boolean;
  /** Se este é identificado como o vídeo principal da página */
  isPrimaryVideo: boolean;
}

/**
 * Configurações para o detector de iframes
 */
export interface IframeDetectorConfig {
  /** Largura mínima para considerar um iframe como vídeo principal (default: 400) */
  minWidth?: number;
  /** Altura mínima para considerar um iframe como vídeo principal (default: 300) */
  minHeight?: number;
  /** Excluir iframes ocultos da detecção (default: true) */
  excludeHidden?: boolean;
}

/**
 * Padrão de detecção de plataforma de vídeo
 */
export interface VideoPlatformPattern {
  /** Nome da plataforma */
  name: string;
  /** Patterns de URL para identificar a plataforma */
  urlPatterns: RegExp[];
  /** Seletores CSS específicos para a plataforma (opcional) */
  iframeSelectors?: string[];
}
