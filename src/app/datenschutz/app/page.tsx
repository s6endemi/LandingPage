const Datenschutz = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Datenschutzerklärung</h1>

      <p>
        <strong>Gültig ab: 01. März 2025</strong>
      </p>

      <p>
        Diese Datenschutzrichtlinie erläutert, wie Athly (im Folgenden als "wir" oder "uns" bezeichnet) Ihre
        personenbezogenen Daten im Zusammenhang mit Ihrer Nutzung unserer Anwendung Athly (die "App") sammelt,
        speichert, verwendet und schützt. In dieser Richtlinie werden außerdem Ihre Rechte in Bezug auf Ihre
        personenbezogenen Daten und die Vorgehensweisen erläutert, mit denen wir Ihre Privatsphäre schützen.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">1. Von uns erhobene personenbezogene Daten</h2>

      <p>
        Wir erheben verschiedene Kategorien von personenbezogenen Daten, die sich in von Ihnen bereitgestellte Daten und
        automatisch erhobene Daten unterteilen lassen.
      </p>

      <h3 className="text-lg font-semibold mt-4 mb-1">Von Ihnen bereitgestellte personenbezogene Daten:</h3>

      <ul>
        <li>
          <strong>Allgemeine Angaben:</strong> Hierzu gehören Ihr Vor- und Nachname, Ihr Geburtstag, Ihr Geschlecht
          (optional), Ihre Größe und Ihr Gewicht. Diese Daten sind notwendig, um Ihnen grundlegende Funktionen der App
          bereitzustellen.
        </li>
        <li>
          <strong>Aktivitätsdaten und Trainingsinformationen:</strong> Alle Trainingsdaten, Aktivitätsaufzeichnungen und
          jegliche Informationen, die Sie in die App eingeben, wie z.B. Trainingspläne, Fortschrittsdaten, Notizen und
          Feedback. Diese Daten werden primär lokal auf Ihrem Endgerät gespeichert.
        </li>
        <li>
          <strong>Kommunikationsinformationen:</strong> Wenn Sie über Supportkanäle mit uns kommunizieren, erfassen und
          verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und den Inhalt aller von Ihnen gesendeten Nachrichten.
        </li>
        <li>
          <strong>Gespräche mit dem KI-Assistenten:</strong> Wenn Sie unseren KI-Assistenten in der App verwenden,
          werden sämtliche Konversationen und Eingaben an Google Gemini (im Folgenden als "KI-Assistent-Anbieter"
          bezeichnet) zur Verarbeitung gesendet. Bitte beachten Sie die Datenschutzbestimmungen von Google Gemini für
          diese Datenverarbeitung.
        </li>
      </ul>

      <h3 className="text-lg font-semibold mt-4 mb-1">Automatisch erhobene personenbezogene Daten:</h3>
      <ul>
        <li>
          <strong>Protokolldaten:</strong> Dabei handelt es sich um Informationen, die Ihr Gerät automatisch sendet,
          wenn Sie die App nutzen. Hierzu gehören die IP-Adresse, Gerätetyp, Betriebssystemversion sowie Datum und
          Uhrzeit Ihres Zugriffs.
        </li>
        <li>
          <strong>Nutzungsdetails:</strong> Dazu gehören die von Ihnen verwendeten Funktionen und Ihre Aktionen
          innerhalb der App, wie z.B. die Nutzung des KI-Assistenten, die Aufzeichnung von Trainingseinheiten, die
          Navigation innerhalb der App und ähnliche Interaktionen.
        </li>
        <li>
          <strong>Geräteinformationen:</strong> Dazu gehören Modell und Typ Ihres Geräts, eindeutige Gerätekennungen und
          Informationen zum Betriebssystem.
        </li>
        <li>
          <strong>Details zu Ihren In-App-Käufen:</strong> Hierzu gehören Angaben zum Zeitpunkt bestimmter Einkäufe und
          Ihre Abonnementdetails, falls zutreffend.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">2. Zwecke der Verarbeitung</h2>

      <p>Wir verarbeiten Ihre personenbezogenen Daten für folgende Zwecke:</p>

      <ul>
        <li>
          <strong>Bereitstellung und Aufrechterhaltung der App-Dienste:</strong> Dies umfasst die Personalisierung von
          Trainingsplänen, die Ermöglichung der Nutzung des KI-Assistenten und die Bereitstellung aller Kernfunktionen
          der App.
        </li>
        <li>
          <strong>Verbesserung und Weiterentwicklung der App:</strong> Wir analysieren Nutzungsdaten, um die App zu
          verbessern, neue Funktionen zu entwickeln und das Nutzererlebnis zu optimieren.
        </li>
        <li>
          <strong>Kundensupport:</strong> Um Ihnen bei Fragen und Problemen behilflich zu sein und auf Ihre Anfragen zu
          antworten.
        </li>
        <li>
          <strong>Bearbeitung von Zahlungen:</strong> Zur Abwicklung von In-App-Käufen und Abonnements über Stripe.
        </li>
        <li>
          <strong>Kommunikation bezüglich der Dienste:</strong> Um Ihnen wichtige Informationen zur App zu senden, wie
          z.B. Service-E-Mails, Aktualisierungen der Datenschutzrichtlinie oder Nutzungsbedingungen.
        </li>
        <li>
          <strong>Missbrauchsprävention und Sicherheit:</strong> Um die Sicherheit der App zu gewährleisten und
          Missbrauch zu verhindern.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">3. Rechtsgrundlagen für die Verarbeitung</h2>

      <p>Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Basis der folgenden Rechtsgrundlagen:</p>

      <ul>
        <li>
          <strong>Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Die Verarbeitung Ihrer allgemeinen Angaben,
          Aktivitätsdaten und Nutzungsdetails ist erforderlich, um Ihnen die App-Dienste gemäß den Nutzungsbedingungen
          bereitzustellen.
        </li>
        <li>
          <strong>Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Die Nutzung des KI-Assistenten und die damit
          verbundene Übermittlung Ihrer Konversationen an Google Gemini erfolgt auf Grundlage Ihrer ausdrücklichen
          Einwilligung, die Sie im Rahmen der Nutzungsbedingungen erteilen. Sie können diese Einwilligung jederzeit
          widerrufen, indem Sie die Nutzung des KI-Assistenten einstellen.
        </li>
        <li>
          <strong>Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):</strong> Die Verarbeitung von Protokolldaten,
          Nutzungsdetails und Geräteinformationen zur Verbesserung der App, zur Fehlerbehebung und zur Gewährleistung
          der Sicherheit der App basiert auf unserem berechtigten Interesse, eine funktionierende und sichere App
          anzubieten. Ebenso basiert die Verarbeitung von Daten zur Zahlungsabwicklung über Stripe auf unserem
          berechtigten Interesse, sichere und effiziente Zahlungsmethoden anzubieten.
        </li>
        <li>
          <strong>Gesetzliche Verpflichtung (Art. 6 Abs. 1 lit. c DSGVO):</strong> In Einzelfällen kann die Verarbeitung
          von Daten erforderlich sein, um gesetzlichen Verpflichtungen nachzukommen, beispielsweise im Rahmen von
          Auskunftsersuchen von Behörden.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">4. Datenschutzrechte</h2>

      <p>Sie haben als Nutzer der Athly-App folgende Datenschutzrechte:</p>

      <ul>
        <li>
          <strong>Recht auf Auskunft (Art. 15 DSGVO):</strong> Sie haben das Recht, Auskunft über die von uns
          verarbeiteten personenbezogenen Daten zu erhalten.
        </li>
        <li>
          <strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, unrichtige personenbezogene
          Daten berichtigen zu lassen.
        </li>
        <li>
          <strong>Recht auf Löschung (Art. 17 DSGVO):</strong> Sie haben das Recht, die Löschung Ihrer personenbezogenen
          Daten zu verlangen, sofern die gesetzlichen Voraussetzungen erfüllt sind.
        </li>
        <li>
          <strong>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO):</strong> Sie haben das Recht, die
          Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen, z.B. wenn die Richtigkeit der Daten
          bestritten wird.
        </li>
        <li>
          <strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, Ihre personenbezogenen
          Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten und an einen anderen
          Verantwortlichen zu übertragen.
        </li>
        <li>
          <strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie haben das Recht, gegen die Verarbeitung Ihrer
          personenbezogenen Daten zu widersprechen, soweit die Verarbeitung auf einem berechtigten Interesse beruht.
        </li>
        <li>
          <strong>Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO):</strong> Sie haben das Recht, eine erteilte
          Einwilligung jederzeit zu widerrufen. Der Widerruf der Einwilligung berührt nicht die Rechtmäßigkeit der
          aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung.
        </li>
        <li>
          <strong>Beschwerderecht bei einer Aufsichtsbehörde (Art. 77 DSGVO):</strong> Sie haben das Recht, sich bei
          einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten durch uns zu
          beschweren.
        </li>
      </ul>

      <p>
        Um Ihre Datenschutzrechte auszuüben, können Sie uns unter den im Abschnitt "Kontakt" angegebenen Kontaktdaten
        erreichen.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">5. Aufbewahrung personenbezogener Daten</h2>

      <ul>
        <li>
          <strong>Lokale Daten:</strong> Aktivitätsdaten und Trainingsinformationen, die lokal auf Ihrem Gerät
          gespeichert werden, verbleiben dort, bis Sie die App deinstallieren oder die Daten innerhalb der App löschen.
        </li>
        <li>
          <strong>Externe Daten (Google Gemini):</strong> Die Aufbewahrungsdauer der an Google Gemini übermittelten
          Chat-Konversationen richtet sich nach den Datenschutzbestimmungen von Google Gemini. Wir haben hierauf keinen
          direkten Einfluss. Bitte informieren Sie sich in den Datenschutzbestimmungen von Google Gemini über die
          dortigen Aufbewahrungsfristen.
        </li>
        <li>
          <strong>Nutzerdaten (Athly-Server):</strong> Ihre allgemeinen Angaben und andere extern verarbeitete
          Nutzerdaten werden grundsätzlich so lange gespeichert, wie Ihr Konto aktiv ist und für die in dieser
          Datenschutzerklärung genannten Zwecke erforderlich. Nach Löschung Ihres Kontos werden diese Daten vollständig
          gelöscht, es sei denn, eine längere Aufbewahrung ist aufgrund gesetzlicher Aufbewahrungspflichten oder zur
          Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich.
        </li>
      </ul>

      <h2 className="text-xl font-semibold mt-8 mb-2">6. Sicherheitsmaßnahmen</h2>

      <p>
        <strong>Hinweis:</strong> Athly nimmt den Schutz Ihrer personenbezogenen Daten ernst.{" "}
        <strong>
          Aktuell sind jedoch noch keine umfassenden technischen und organisatorischen Sicherheitsmaßnahmen
          implementiert, um Ihre Daten angemessen zu schützen.
        </strong>{" "}
        Wir arbeiten daran, geeignete Maßnahmen zu implementieren, um Ihre Daten vor unbefugtem Zugriff, Verlust,
        Missbrauch oder Zerstörung zu schützen. Sobald entsprechende Sicherheitsmaßnahmen implementiert sind, werden wir
        diese Datenschutzerklärung entsprechend aktualisieren.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">7. Weitergabe personenbezogener Daten</h2>

      <p>Wir geben Ihre personenbezogenen Daten nur in den nachfolgend beschriebenen Fällen an Dritte weiter:</p>

      <ul>
        <li>
          <strong>KI-Assistent (Google Gemini):</strong> Zur Bereitstellung des KI-Chat-Features werden Ihre
          Chat-Konversationen an Google Gemini übermittelt.
        </li>
        <li>
          <strong>Zahlungsabwickler (Stripe):</strong> Zur Abwicklung von Zahlungen geben wir die für die
          Zahlungsabwicklung erforderlichen Daten an Stripe weiter.
        </li>
        <li>
          <strong>Hosting-Anbieter:</strong> Wir nutzen Hosting-Dienste von Supabase, um die App und zugehörige Daten zu
          hosten.
        </li>
        <li>
          <strong>Rechtliche Verpflichtungen:</strong> In bestimmten Fällen können wir verpflichtet sein, Ihre
          personenbezogenen Daten an Behörden oder Gerichte weiterzugeben, wenn dies gesetzlich vorgeschrieben ist.
        </li>
      </ul>

      <p>
        Eine Weitergabe Ihrer personenbezogenen Daten an Dritte zu Werbezwecken oder ähnlichen kommerziellen Zwecken
        erfolgt nicht.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">8. Kinder</h2>

      <p>
        Unsere App richtet sich nicht an Kinder unter 18 Jahren und ist nicht für deren Nutzung bestimmt. Wenn Sie
        Kenntnis davon erhalten, dass ein Kind unter 18 Jahren unsere App nutzt, kontaktieren Sie uns bitte umgehend,
        damit wir die erforderlichen Maßnahmen ergreifen können, um die Daten des Kindes zu löschen.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">9. Änderungen dieser Datenschutzerklärung</h2>

      <p>
        Wir behalten uns vor, diese Datenschutzerklärung von Zeit zu Zeit zu ändern oder zu aktualisieren. Die jeweils
        aktuelle Version wird in der App veröffentlicht. Wesentliche Änderungen, die Ihre Rechte beeinträchtigen können,
        werden Ihnen rechtzeitig mitgeteilt, z.B. per In-App-Benachrichtigung oder E-Mail.
      </p>

      <h2 className="text-xl font-semibold mt-8 mb-2">10. Kontakt</h2>

      <p>Für Fragen oder Anliegen zum Datenschutz in Zusammenhang mit unserer App können Sie sich an uns wenden:</p>

      <p>
        Athly
        <br />
        Eren Demir
        <br />
        Glasstraße, 7a
        <br />
        50823 Köln
        <br />
        Deutschland
        <br />
        E-Mail: info@athly.de
      </p>
    </div>
  );
};

export default Datenschutz;
