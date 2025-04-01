import { supabase } from "./supabase";

/**
 * Tracking-Funktion für allgemeine Events
 *
 * @param {string} eventType - Art des Events (page_view, cta_click, signup, etc.)
 * @param {string} source - Quelle des Events (hero, waitlist-modal, footer-cta)
 * @param {object} metadata - Zusätzliche Metadaten
 * @returns {Promise<object>} - Ergebnis des Trackings
 */
export async function trackEvent(eventType, source, metadata = {}) {
  try {
    // Basis-Geräteinformationen sammeln
    const deviceType = typeof window !== "undefined" ? (window.innerWidth < 768 ? "mobile" : "desktop") : "unknown";

    // UTM-Parameter aus URL extrahieren (falls verfügbar)
    let utmParams = {};
    if (typeof window !== "undefined" && window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      utmParams = {
        utm_source: urlParams.get("utm_source") || null,
        utm_medium: urlParams.get("utm_medium") || null,
        utm_campaign: urlParams.get("utm_campaign") || null,
      };
    }

    // Browser-Informationen sammeln (falls verfügbar)
    let browserInfo = {};
    if (typeof navigator !== "undefined") {
      browserInfo = {
        user_agent: navigator.userAgent,
        language: navigator.language,
      };
    }

    // Vollständiges Event-Objekt erstellen
    const event = {
      event_type: eventType,
      source: source,
      device_type: deviceType,
      created_at: new Date().toISOString(),
      ...utmParams,
      ...browserInfo,
      ...metadata,
    };

    // Debug-Log (kann in Produktion entfernt werden)
    console.log("📊 Tracking event:", eventType, "from", source);

    // Event in Supabase speichern
    const { error } = await supabase.from("waitlist_analytics").insert([event]);

    if (error) {
      console.error("⚠️ Analytics tracking error:", error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err) {
    console.error("⚠️ Failed to track event:", err);
    return { success: false, error: err };
  }
}

/**
 * Tracking für Seitenaufrufe
 *
 * @param {string} page - Name der Seite oder Komponente
 * @returns {Promise<object>} - Ergebnis des Trackings
 */
export function trackPageView(page) {
  // Referrer nur client-seitig erfassen
  const referrer = typeof document !== "undefined" ? document.referrer : null;

  return trackEvent("page_view", page, { referrer });
}

/**
 * Tracking für CTA-Klicks
 *
 * @param {string} ctaSource - Quelle des CTA (hero, waitlist-modal, footer-cta)
 * @returns {Promise<object>} - Ergebnis des Trackings
 */
export function trackCTAClick(ctaSource) {
  return trackEvent("cta_click", ctaSource);
}

/**
 * Tracking für erfolgreiche Anmeldungen
 *
 * @param {string} source - Quelle der Anmeldung
 * @param {string} email - E-Mail-Adresse (wird nur die Domain gespeichert)
 * @param {number} participantNumber - Teilnehmernummer
 * @returns {Promise<object>} - Ergebnis des Trackings
 */
export function trackSignupSuccess(source, email, participantNumber) {
  // Nur Domain speichern, nicht die vollständige E-Mail
  const emailDomain = email.split("@")[1];

  return trackEvent("signup_success", source, {
    email_domain: emailDomain,
    participant_number: participantNumber,
  });
}

/**
 * Tracking für doppelte Anmeldeversuche
 *
 * @param {string} source - Quelle der Anmeldung
 * @param {string} email - E-Mail-Adresse (wird nur die Domain gespeichert)
 * @returns {Promise<object>} - Ergebnis des Trackings
 */
export function trackDuplicateSignup(source, email) {
  // Nur Domain speichern
  const emailDomain = email.split("@")[1];

  return trackEvent("signup_duplicate", source, {
    email_domain: emailDomain,
  });
}

/**
 * Tracking für Anmeldefehler
 *
 * @param {string} source - Quelle der Anmeldung
 * @param {string} errorMessage - Fehlermeldung
 * @returns {Promise<object>} - Ergebnis des Trackings
 */
export function trackSignupError(source, errorMessage) {
  return trackEvent("signup_error", source, {
    error_message: errorMessage,
  });
}
