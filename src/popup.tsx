import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// eslint-disable-next-line react-refresh/only-export-components
function PopupApp() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carrega o estado salvo
    chrome.storage.sync.get(
      ["pluginEnabled"],
      (result: { pluginEnabled?: boolean }) => {
        setIsEnabled(result.pluginEnabled ?? false);
        setLoading(false);
      }
    );
  }, []);

  const togglePlugin = async () => {
    const newState = !isEnabled;
    setIsEnabled(newState);

    // Salva o estado
    await chrome.storage.sync.set({ pluginEnabled: newState });

    // Notifica os content scripts ativos sobre a mudança
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "togglePlugin",
        enabled: newState,
      });
    }
  };

  if (loading) {
    return (
      <div className="w-64 p-4 bg-background text-foreground">
        <div className="flex items-center justify-center">
          <span>Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-64 p-4 bg-background text-foreground">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">FocoTotal</h2>
          <div className="flex items-center space-x-2">
            <label
              htmlFor="plugin-toggle"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {isEnabled ? "Ativado" : "Desativado"}
            </label>
            <button
              id="plugin-toggle"
              type="button"
              onClick={togglePlugin}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full
                transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                ${
                  isEnabled
                    ? "bg-primary focus:ring-primary"
                    : "bg-gray-200 focus:ring-gray-400"
                }
              `}
              aria-checked={isEnabled}
              role="switch"
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${isEnabled ? "translate-x-6" : "translate-x-1"}
                `}
              />
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          {isEnabled
            ? "O modo cinema está ativo. A tela cheia será aplicada aos vídeos compatíveis."
            : "Ative o plugin para usar o modo cinema em vídeos."}
        </p>
      </div>
    </div>
  );
}

// Renderiza o popup
const root = document.getElementById("popup-root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <PopupApp />
    </React.StrictMode>
  );
}
