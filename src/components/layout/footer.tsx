"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  // Hauptnavigationslinks
  const navigationLinks = [{ name: "Features", href: "#features" }];

  // Essenzielle rechtliche Links - aktualisiert
  const legalLinks = [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "AGB", href: "/agb" },
  ];

  // Social Media Links - Twitter entfernt, Instagram und LinkedIn Links aktualisiert
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/athly_de?igsh=MTg1MjMwZzBseWZm",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/athlyde/",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo, Tagline und Adresse */}
          <div className="flex flex-col">
            <div className="flex items-center mb-4">
              {/* Aktualisiertes Athly Logo */}
              <div className="h-8 w-8 mr-2 relative">
                <Image src="/icons/athly.svg" alt="Athly Logo" fill className="object-contain" />
              </div>
              <span className="text-xl font-[650] text-gray-800 tracking-tight-plus">ATHLY</span>
            </div>

            <p className="text-sm text-gray-500 mb-4 max-w-xs font-[450] leading-relaxed">
              Dein personalisierter KI-Trainings- und Ernährungscoach für maximale Fitness und optimale Ergebnisse.
            </p>

            <p className="text-sm text-gray-500 font-[450]">
              <a href="mailto:info@athly.de" className="hover:text-[#9bc539] transition-colors duration-200">
                info@athly.de
              </a>
            </p>
          </div>

          {/* Rechtliche Links und Navigation */}
          <div>
            <h3 className="text-sm font-[550] text-gray-800 uppercase tracking-wide mb-4">Links</h3>

            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#9bc539] transition-colors duration-200 font-[450]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <h3 className="text-sm font-[550] text-gray-800 uppercase tracking-wide mt-6 mb-4">Rechtliches</h3>

            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#9bc539] transition-colors duration-200 font-[450]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}

              {/* Cookie-Einstellungen Button */}
              <li>
                <button
                  onClick={() =>
                    window.openCookieSettings
                      ? window.openCookieSettings()
                      : alert("Cookie-Einstellungen werden geladen...")
                  }
                  className="text-sm text-gray-500 hover:text-[#9bc539] transition-colors duration-200 font-[450] bg-transparent border-none p-0 cursor-pointer"
                >
                  Cookie-Einstellungen
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter und Social Links */}
          <div>
            <h3 className="text-sm font-[550] text-gray-800 uppercase tracking-wide mb-4">Bleib in Kontakt</h3>

            {/* Newsletter Signup */}
            <p className="text-sm text-gray-500 mb-4 font-[450] leading-relaxed">
              Erhalte Updates zu neuen Features und Fitness-Tipps.
            </p>

            <form className="mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Deine E-Mail"
                  className="px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-800 
                    placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9bc539] focus:border-[#9bc539] font-[450]"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#9bc539] text-white font-[550] tracking-tight rounded-lg hover:bg-[#8ab42d] transition-colors duration-200"
                >
                  Anmelden
                </button>
              </div>
            </form>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#9bc539] transition-colors duration-200"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright und App-Badges */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0 font-[450]">
            © {new Date().getFullYear()} Athly. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
}
