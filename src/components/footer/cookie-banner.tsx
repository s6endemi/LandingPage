"use client";

import React, { useState, useEffect } from "react";

// Typen für Cookie-Einstellungen
type CookieSettings = {
  necessary: boolean; // Notwendige Cookies (immer true)
  analytics: boolean; // Analytische Cookies
  marketing: boolean; // Marketing Cookies
};

// Window Typenerweiterung für globale Funktion
declare global {
  interface Window {
    openCookieSettings?: () => void; // Optional machen, damit wir es löschen können
  }
}

export const CookieBanner = () => {
  // State für die Sichtbarkeit des Banners und des Settings-Modals
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Cookie-Einstellungen
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  // Cookie-Einstellungen beim Start laden
  useEffect(() => {
    // Globale Funktion zum Öffnen der Cookie-Einstellungen
    window.openCookieSettings = () => setShowSettings(true);

    // Prüfen, ob Cookie-Einstellungen bereits gespeichert sind
    const savedSettings = localStorage.getItem("cookieSettings");

    if (savedSettings) {
      // Wenn Einstellungen vorhanden, nicht mehr anzeigen
      setCookieSettings(JSON.parse(savedSettings));
    } else {
      // Wenn keine Einstellungen vorhanden, Banner anzeigen
      setShowBanner(true);
    }

    // Cleanup
    return () => {
      window.openCookieSettings = undefined;
    };
  }, []);

  // Speichern der Cookie-Einstellungen
  const saveCookieSettings = (settings: CookieSettings) => {
    localStorage.setItem("cookieSettings", JSON.stringify(settings));
    setCookieSettings(settings);
    setShowBanner(false);
    setShowSettings(false);

    // Hier könntest du Code hinzufügen, um Tracking-Skripte basierend auf den Einstellungen zu aktivieren/deaktivieren
  };

  // Alle Cookies akzeptieren
  const acceptAllCookies = () => {
    const allAccepted: CookieSettings = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    saveCookieSettings(allAccepted);
  };

  // Nur notwendige Cookies akzeptieren
  const acceptNecessaryCookies = () => {
    const onlyNecessary: CookieSettings = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    saveCookieSettings(onlyNecessary);
  };

  // Benutzerdefinierte Einstellungen speichern
  const saveCustomSettings = () => {
    saveCookieSettings(cookieSettings);
  };

  // Toggle für einzelne Cookie-Kategorien
  const toggleCookieSetting = (key: keyof CookieSettings) => {
    if (key === "necessary") return; // Necessary kann nicht geändert werden

    setCookieSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Wenn weder Banner noch Einstellungen angezeigt werden sollen, nichts rendern
  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-lg font-[550] text-gray-800 mb-2">Wir respektieren deine Privatsphäre</h2>
                <p className="text-sm text-gray-600 mb-2">
                  Wir verwenden Cookies, um dein Erlebnis auf unserer Website zu verbessern, relevante Werbung
                  anzuzeigen und Websiteanalysen durchzuführen. Durch die weitere Nutzung dieser Website stimmst du
                  unserer
                  <a href="/datenschutz" className="text-[#9bc539] hover:underline ml-1">
                    Datenschutzerklärung
                  </a>{" "}
                  zu.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm font-[550] text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Einstellungen
                </button>
                <button
                  onClick={acceptNecessaryCookies}
                  className="px-4 py-2 text-sm font-[550] text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Nur notwendige
                </button>
                <button
                  onClick={acceptAllCookies}
                  className="px-4 py-2 text-sm font-[550] text-white bg-[#9bc539] rounded-lg hover:bg-[#8ab42d] transition-colors"
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Einstellungen Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-[550] text-gray-800">Cookie-Einstellungen</h2>
            </div>

            {/* Modal Body */}
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-6">
                Hier kannst du festlegen, welche Cookies wir verwenden dürfen. Notwendige Cookies werden für die
                grundlegenden Funktionen der Website benötigt.
              </p>

              {/* Cookie Kategorien */}
              <div className="space-y-4">
                {/* Notwendige Cookies - immer aktiviert */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-[550] text-gray-800">Notwendige Cookies</h3>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={cookieSettings.necessary}
                        disabled
                        className="sr-only peer"
                        id="necessary"
                      />
                      <label
                        htmlFor="necessary"
                        className="cursor-not-allowed flex items-center h-6 w-11 rounded-full bg-[#9bc539] peer-focus:outline-none"
                      >
                        <span className="inline-block h-5 w-5 rounded-full bg-white translate-x-5 transition"></span>
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Diese Cookies sind für die grundlegenden Funktionen der Website unerlässlich und können nicht
                    deaktiviert werden.
                  </p>
                </div>

                {/* Analytische Cookies */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-[550] text-gray-800">Analytische Cookies</h3>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={cookieSettings.analytics}
                        onChange={() => toggleCookieSetting("analytics")}
                        className="sr-only peer"
                        id="analytics"
                      />
                      <label
                        htmlFor="analytics"
                        className="cursor-pointer flex items-center h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#9bc539] peer-focus:outline-none"
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white transition ${cookieSettings.analytics ? "translate-x-5" : "translate-x-1"}`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Diese Cookies helfen uns, die Nutzung unserer Website zu verstehen und zu verbessern, indem sie
                    anonyme Informationen sammeln.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-[550] text-gray-800">Marketing Cookies</h3>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={cookieSettings.marketing}
                        onChange={() => toggleCookieSetting("marketing")}
                        className="sr-only peer"
                        id="marketing"
                      />
                      <label
                        htmlFor="marketing"
                        className="cursor-pointer flex items-center h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#9bc539] peer-focus:outline-none"
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white transition ${cookieSettings.marketing ? "translate-x-5" : "translate-x-1"}`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    Diese Cookies werden verwendet, um dir relevante Werbung anzuzeigen und dein Browsing-Erlebnis zu
                    personalisieren.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 flex flex-col sm:flex-row gap-2 justify-end">
              <button
                onClick={() => {
                  setShowSettings(false);
                  setShowBanner(true);
                }}
                className="px-4 py-2 text-sm font-[550] text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={acceptNecessaryCookies}
                className="px-4 py-2 text-sm font-[550] text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Nur notwendige
              </button>
              <button
                onClick={acceptAllCookies}
                className="px-4 py-2 text-sm font-[550] text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Alle akzeptieren
              </button>
              <button
                onClick={saveCustomSettings}
                className="px-4 py-2 text-sm font-[550] text-white bg-[#9bc539] rounded-lg hover:bg-[#8ab42d] transition-colors"
              >
                Einstellungen speichern
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
