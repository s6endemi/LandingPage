"use client";

import React from 'react';
import Link from 'next/link';

export default function Impressum() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="text-3xl font-[650] text-gray-900 tracking-tighter-plus mb-8">Impressum</h1>
      
      <div className="space-y-8 text-gray-600 font-[450]">
        <section className="space-y-4">
          <h2 className="text-xl font-[550] text-gray-800 tracking-tight-plus">Angaben gemäß § 5 TMG</h2>
          <p>Eren Demir<br />
            Glasstraße, 7a<br />
            50823 Köln<br />
            Deutschland
          </p>
          
          <p className="pt-2"><strong className="font-[550]">Hinweis:</strong><br />
            Athly befindet sich derzeit in der Entwicklungsphase. Diese Website dient der Vorstellung des Projekts und dem Aufbau einer Interessentenliste.
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-[550] text-gray-800 tracking-tight-plus">Kontakt</h2>
          <p>E-Mail: info@athly.de</p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-[550] text-gray-800 tracking-tight-plus">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Eren Demir<br />
            Glasstraße, 7a<br />
            50823 Köln<br />
            Deutschland
          </p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-[550] text-gray-800 tracking-tight-plus">Streitschlichtung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-[#9bc539] hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-[550] text-gray-800 tracking-tight-plus">Haftung für Inhalte</h2>
          <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
          <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-[550] text-gray-800 tracking-tight-plus">Haftung für Links</h2>
          <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p>
          <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-[550] text-gray-800 tracking-tight-plus">Urheberrecht</h2>
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
          <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>
        </section>
      </div>
      
      <div className="mt-12">
        <Link 
          href="/" 
          className="inline-flex items-center font-[550] text-[#9bc539] hover:text-[#8ab42d] transition-colors duration-200"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}