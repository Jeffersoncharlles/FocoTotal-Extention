// ========================================
// LOGGER CONFIGURATION
// ========================================
//
// Para ATIVAR os logs em tempo de desenvolvimento:
//   1. Mude DEBUG_MODE para true
//   2. Faça build com: pnpm run build
//   3. Recarregue a extensão no Chrome
//   4. Abra DevTools (F12) na aba onde a extensão está ativa
//   5. Veja os logs com prefixo [FocoTotal]
//
// Os logs aparecerão com:
//   - 🎬 para content script e modal
//   - 📱 para popup
//
// Para DESATIVAR os logs:
//   1. Mude DEBUG_MODE de volta para false
//   2. Faça build novamente
//

const DEBUG_MODE = false; // Set to true to enable logs

type LogLevel = "log" | "warn" | "error" | "info";

interface LoggerConfig {
  prefix: string;
  emoji?: string;
}

class Logger {
  private enabled: boolean;
  private prefix: string;
  private emoji: string;

  constructor(config: LoggerConfig) {
    this.enabled = DEBUG_MODE;
    this.prefix = config.prefix;
    this.emoji = config.emoji || "📝";
  }

  private buildMessage(message: string): string {
    return `${this.emoji} [${this.prefix}] ${message}`;
  }

  private print(level: LogLevel, message: string, data?: unknown) {
    if (!this.enabled) return;

    const formattedMessage = this.buildMessage(message);
    if (data !== undefined) {
      console[level](formattedMessage, data);
    } else {
      console[level](formattedMessage);
    }
  }

  info(message: string, data?: unknown) {
    this.print("info", message, data);
  }

  log(message: string, data?: unknown) {
    this.print("log", message, data);
  }

  warn(message: string, data?: unknown) {
    this.print("warn", message, data);
  }

  error(message: string, data?: unknown) {
    this.print("error", message, data);
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

// Criar instâncias de logger para diferentes módulos
export const contentLogger = new Logger({
  prefix: "FocoTotal",
  emoji: "🎬",
});

export const modalLogger = new Logger({
  prefix: "FocoTotal",
  emoji: "🎬",
});

export const popupLogger = new Logger({
  prefix: "FocoTotal Popup",
  emoji: "📱",
});

export { Logger, DEBUG_MODE };
