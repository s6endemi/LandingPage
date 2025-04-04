"use server";

import { supabase } from "./supabase";
import { Resend } from "resend";
import { trackCTAClick, trackSignupSuccess, trackDuplicateSignup, trackSignupError, trackEvent } from "@/lib/analytics";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email validation
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

type WaitlistResult = {
  success: boolean;
  error?: string;
  existingEmail?: boolean;
  participantNumber?: number;
};

/**
 * Core server action for waitlist submission
 * Combines validation, analytics, database operations, and email sending
 */
export async function submitToWaitlist(formData: FormData): Promise<WaitlistResult> {
  const email = formData.get("email") as string;
  const source = (formData.get("source") as string) || "hero";

  // Email validation
  if (!isValidEmail(email)) {
    trackEvent("invalid_email", source, { email_length: email.length });
    return {
      success: false,
      error: "Bitte gib eine gültige E-Mail-Adresse ein.",
      participantNumber: 0,
    };
  }

  // Track CTA click
  trackCTAClick(source);

  try {
    // Core waitlist operations
    const result = await addEmailToWaitlist(email, source);

    if (result.success) {
      // Track successful signup
      trackSignupSuccess(source, email, result.participantNumber ?? 0);
    } else {
      if (result.existingEmail) {
        // Track duplicate email
        trackDuplicateSignup(source, email);
      } else {
        // Track general error
        trackSignupError(source, result.error ?? "Ein unbekannter Fehler ist aufgetreten.");
      }
    }

    return result;
  } catch (error) {
    console.error("Submission error:", error);

    // Track unexpected error
    trackSignupError(source, "Unexpected error");

    return {
      success: false,
      error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.",
      participantNumber: 0,
    };
  }
}

/**
 * Alternative function for direct submissions (not using FormData)
 * Used for components that already have email value extracted
 */
export async function submitToWaitlistDirect(email: string, source: string = "unspecified"): Promise<WaitlistResult> {
  // Email validation
  if (!isValidEmail(email)) {
    trackEvent("invalid_email", source, { email_length: email.length });
    return {
      success: false,
      error: "Bitte gib eine gültige E-Mail-Adresse ein.",
      participantNumber: 0,
    };
  }

  // Track CTA click
  trackCTAClick(source);

  try {
    // Core waitlist operations
    const result = await addEmailToWaitlist(email, source);

    if (result.success) {
      // Track successful signup
      trackSignupSuccess(source, email, result.participantNumber ?? 0);
    } else {
      if (result.existingEmail) {
        // Track duplicate email
        trackDuplicateSignup(source, email);
      } else {
        // Track general error
        trackSignupError(source, result.error ?? "Ein unbekannter Fehler ist aufgetreten.");
      }
    }

    return result;
  } catch (error) {
    console.error("Direct submission error:", error);

    // Track unexpected error
    trackSignupError(source, "Unexpected error");

    return {
      success: false,
      error: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.",
      participantNumber: 0,
    };
  }
}

/**
 * Core function to add an email to the waitlist
 * This handles the database operations and email sending
 */
async function addEmailToWaitlist(email: string, source: string = "unspecified"): Promise<WaitlistResult> {
  try {
    // Check if email already exists
    const { data: existingEmails } = await supabase.from("waitlist_new").select("email").eq("email", email);

    if (existingEmails && existingEmails.length > 0) {
      return {
        success: false,
        error: "Diese Email ist bereits registriert",
        existingEmail: true,
        participantNumber: await getParticipantCount(),
      };
    }

    // Create new entry
    const { data, error } = await supabase.from("waitlist_new").insert([
      {
        email,
        source,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    // Get participant count for response and email
    const participantNumber = await getParticipantCount();

    // Send confirmation email
    await sendConfirmationEmail(email, participantNumber);

    return {
      success: true,
      participantNumber,
    };
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    return {
      success: false,
      error: "Entschuldigung, bei der Anmeldung ist ein Fehler aufgetreten.",
    };
  }
}

/**
 * Function to get current participant count
 */
export async function getCurrentParticipantCount(): Promise<number> {
  return await getParticipantCount();
}

/**
 * Helper function to determine participant count with offset
 */
async function getParticipantCount(): Promise<number> {
  try {
    // Fixed offset - start counting from this value
    const PARTICIPANT_OFFSET = 252;

    const { count, error } = await supabase.from("waitlist_new").select("*", { count: "exact", head: true });

    if (error) throw error;

    // Real participant count plus fixed offset
    return (count ?? 0) + PARTICIPANT_OFFSET;
  } catch (error) {
    console.error("Error getting participant count:", error);
    return 252 + Math.floor(Math.random() * 10); // Fallback with a base of 252
  }
}

/**
 * Function to send confirmation email using Resend
 */
async function sendConfirmationEmail(email: string, participantNumber: number): Promise<boolean> {
  try {
    const { data, error } = await resend.emails.send({
      from: "Athly Team <info@athly.de>",
      to: email,
      subject: "Willkommen bei Athly - Danke für deine Anmeldung!",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://athly.de/logo.png" alt="Athly Logo" style="height: 60px; margin-bottom: 20px;">
          </div>
          
          <div style="background-color: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e5e7eb;">
            <h1 style="color: #333; font-size: 24px; font-weight: 600; margin-bottom: 20px; text-align: center;">Du bist dabei!</h1>
            
            <p style="margin-bottom: 15px; line-height: 1.6;">Hallo,</p>
            
            <p style="margin-bottom: 15px; line-height: 1.6;">
              vielen Dank für deine Anmeldung bei Athly! Wir haben deine E-Mail-Adresse erhalten und werden dich informieren, 
              sobald dein exklusiver Zugang bereit ist.
            </p>
            
            <p style="margin-bottom: 15px; line-height: 1.6;">
              <strong>Du bist Teilnehmer #${participantNumber}</strong> auf unserer Warteliste und erhältst:
            </p>
            
            <ul style="margin-bottom: 25px; padding-left: 20px; line-height: 1.6;">
              <li style="margin-bottom: 10px;"><strong>30% Rabatt</strong> auf dein Athly-Abonnement</li>
              <li style="margin-bottom: 10px;"><strong>Zwei Wochen Premium-Coaching kostenlos</strong></li>
              <li>Frühzeitigen Zugang zu allen Funktionen</li>
            </ul>
            
            <p style="margin-bottom: 25px; line-height: 1.6;">
              Wir arbeiten mit Hochdruck daran, Athly für dich bereit zu machen. Sobald wir starten, 
              erhältst du eine weitere E-Mail mit allen Details zum Zugang.
            </p>
            
            <div style="text-align: center; margin-top: 30px; margin-bottom: 30px;">
              <a href="https://athly.de" style="background-color: #8FBC29; color: white; text-decoration: none; padding: 12px 25px; border-radius: 8px; font-weight: 500; display: inline-block;">
                Mehr über Athly erfahren
              </a>
            </div>
            
            <p style="margin-bottom: 15px; line-height: 1.6;">
              Hast du Fragen? Antworte einfach auf diese E-Mail oder kontaktiere uns unter <a href="mailto:support@athly.de" style="color: #8FBC29; text-decoration: none;">support@athly.de</a>.
            </p>
            
            <p style="margin-bottom: 25px; line-height: 1.6;">
              Sportliche Grüße,<br>
              Dein Athly-Team
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; font-size: 12px; color: #666;">
            <p>© 2023 Athly GmbH. Alle Rechte vorbehalten.</p>
            <p>
              <a href="https://athly.de/datenschutz" style="color: #666; margin-right: 10px;">Datenschutz</a>
              <a href="https://athly.de/impressum" style="color: #666;">Impressum</a>
            </p>
            <p style="margin-top: 10px;">
              Du erhältst diese E-Mail, weil du dich für die Warteliste von Athly angemeldet hast.<br>
              Wenn du keine weiteren E-Mails erhalten möchtest, klicke bitte <a href="https://athly.de/unsubscribe?email=${encodeURIComponent(email)}" style="color: #666;">hier</a>.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending confirmation email:", error);
      return false;
    }

    console.log("Confirmation email sent successfully");
    return true;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    return false;
  }
}
