import { supabase } from "./supabase";

export async function addToWaitlist(email, source = "unspecified") {
  try {
    // Prüfen, ob Email bereits existiert
    const { data: existingEmails } = await supabase
      .from("waitlist_new") // GEÄNDERT: neue Tabelle verwenden
      .select("email")
      .eq("email", email);

    if (existingEmails && existingEmails.length > 0) {
      return {
        success: false,
        error: "Diese Email ist bereits registriert",
        existingEmail: true,
        participantNumber: await getParticipantCount(),
      };
    }

    // Neuen Eintrag erstellen
    const { data, error } = await supabase
      .from("waitlist_new") // GEÄNDERT: neue Tabelle verwenden
      .insert([
        {
          email,
          source,
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) throw error;

    return {
      success: true,
      participantNumber: await getParticipantCount(),
    };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return {
      success: false,
      error: "Entschuldigung, bei der Anmeldung ist ein Fehler aufgetreten.",
    };
  }
}

// Funktion um die aktuelle Teilnehmeranzahl zu ermitteln
async function getParticipantCount() {
  try {
    // Fester Offset - starte die Zählung bei diesem Wert
    const PARTICIPANT_OFFSET = 252;

    const { count, error } = await supabase
      .from("waitlist_new") // GEÄNDERT: neue Tabelle verwenden
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    // Echte Teilnehmerzahl plus fester Offset
    return count + PARTICIPANT_OFFSET;
  } catch (error) {
    console.error("Error getting participant count:", error);
    return 252 + Math.floor(Math.random() * 10); // Fallback mit einer Basis von 252
  }
}

export async function getCurrentParticipantCount() {
  return await getParticipantCount();
}
