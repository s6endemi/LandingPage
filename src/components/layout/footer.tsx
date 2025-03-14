"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  // Hauptnavigationslinks
  const navigationLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Preise', href: '#pricing' },
    { name: 'Über uns', href: '#about' },
    { name: 'FAQ', href: '#faq' }
  ];

  // Essenzielle rechtliche Links
  const legalLinks = [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' },
    { name: 'Cookies', href: '/cookies' }
  ];

  // Social Media Links
  const socialLinks = [
    { 
      name: 'Instagram', 
      href: '#', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    { 
      name: 'Twitter', 
      href: '#', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    }
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
                <Image 
                  src="/icons/athly.svg" 
                  alt="Athly Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-gray-800">ATHLY</span>
            </div>
            
            <p className="text-sm text-gray-500 mb-4 max-w-xs">
              Dein personalisierter KI-Trainings- und Ernährungscoach für maximale Fitness und optimale Ergebnisse.
            </p>
            

            
            <p className="text-sm text-gray-500">
              <a href="mailto:info@athly.de" className="hover:text-[#9bc539] transition-colors duration-200">
                info@athly.de
              </a>
            </p>
          </div>
          
          
          {/* Newsletter und Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
              Bleib in Kontakt
            </h3>
            
            {/* Newsletter Signup */}
            <p className="text-sm text-gray-500 mb-4">
              Erhalte Updates zu neuen Features und Fitness-Tipps.
            </p>
            
            <form className="mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Deine E-Mail"
                  className="px-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-800 
                    placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#9bc539] focus:border-[#9bc539]"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-[#9bc539] text-white font-medium rounded-lg hover:bg-[#8ab42d] transition-colors duration-200"
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
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Athly GmbH. Alle Rechte vorbehalten.
          </p>
          
          {/* App Store Badges */}
        </div>
      </div>
    </footer>
  );
}