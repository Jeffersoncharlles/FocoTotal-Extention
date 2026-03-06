import type { VideoPlatformPattern } from "../services/iframe-detector.types";
import { VideoPlatform } from "../services/iframe-detector.types";

/**
 * Lista de padrões de URL para detecção de plataformas de vídeo
 *
 * Inclui plataformas internacionais e brasileiras de ensino/vídeo
 */
export const VIDEO_PLATFORM_PATTERNS: VideoPlatformPattern[] = [
  {
    name: VideoPlatform.YouTube,
    urlPatterns: [
      /youtube\.com\/embed/i,
      /youtube-nocookie\.com\/embed/i,
      /youtu\.be/i,
    ],
  },
  {
    name: VideoPlatform.Vimeo,
    urlPatterns: [/player\.vimeo\.com\/video/i, /vimeo\.com\/video/i],
  },
  {
    name: VideoPlatform.Hotmart,
    urlPatterns: [
      /player\.hotmart\.com/i,
      /app\.hotmart\.com\/video/i,
      /hotmart\.com\/player/i,
    ],
  },
  {
    name: VideoPlatform.Rocketseat,
    urlPatterns: [
      /app\.rocketseat\.com\.br/i,
      /platform\.rocketseat\.com\.br/i,
      /rocketseat\.com\.br.*\/player/i,
    ],
  },
  {
    name: VideoPlatform.Estacio,
    urlPatterns: [
      /estacio\.br/i,
      /webaula\.estacio\.br/i,
      /ava\.estacio\.br/i,
      /portal\.estacio\.br.*\/player/i,
    ],
  },
  {
    name: VideoPlatform.Unianhanguera,
    urlPatterns: [
      /unianhanguera\.edu\.br/i,
      /ava\.unianhanguera\.edu\.br/i,
      /aluno\.unianhanguera\.edu\.br/i,
    ],
  },
  {
    name: VideoPlatform.Anhanguera,
    urlPatterns: [
      /anhanguera\.com/i,
      /ava\.anhanguera\.com/i,
      /aluno\.anhanguera\.com/i,
      /kroton\.platosedu\.io/i,
    ],
  },
  {
    name: VideoPlatform.Wistia,
    urlPatterns: [/fast\.wistia\.net\/embed\/iframe/i, /wistia\.com\/embed/i],
  },
  {
    name: VideoPlatform.Vidyard,
    urlPatterns: [/play\.vidyard\.com/i, /vidyard\.com\/embed/i],
  },
  {
    name: VideoPlatform.Generic,
    urlPatterns: [/\/player/i, /\/embed/i, /\/video/i, /\/watch/i],
  },
];
