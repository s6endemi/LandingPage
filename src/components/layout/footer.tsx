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
          
          {/* Navigation und Links */}
          <div className="grid grid-cols-2 gap-8">
            {/* Hauptnavigation */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                Navigation
              </h3>
              <ul className="space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-[#9bc539] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Rechtliche Links */}
            <div>
              <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4">
                Rechtliches
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-sm text-gray-500 hover:text-[#9bc539] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="flex items-center bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                <path d="M17.5649 12.355C17.5077 9.76338 19.6093 8.29941 19.7199 8.22823C18.4854 6.4334 16.5788 6.1776 15.9032 6.15936C14.1977 5.97612 12.5694 7.16648 11.7031 7.16648C10.8184 7.16648 9.4932 6.17753 8.0592 6.21014C6.2443 6.24276 4.56727 7.26908 3.64684 8.86193C1.74989 12.1027 3.17334 16.9299 5.0055 19.4683C5.91332 20.715 6.97709 22.1246 8.36719 22.0594C9.71434 21.9889 10.2148 21.1694 11.8444 21.1694C13.4573 21.1694 13.9252 22.0594 15.3421 22.0237C16.8073 21.9889 17.7241 20.7422 18.6046 19.4866C19.639 18.0534 20.0527 16.6508 20.0711 16.5918C20.0343 16.5796 17.6283 15.6033 17.5649 12.355Z"/>
                <path d="M15.0461 4.19201C15.7891 3.25866 16.2948 1.97542 16.1597 0.673828C15.0707 0.72374 13.7237 1.42678 12.9438 2.33359C12.2539 3.14091 11.6396 4.4636 11.793 5.72222C12.9991 5.80602 14.2847 5.1132 15.0461 4.19201Z"/>
              </svg>
              <div className="text-xs">
                <div className="text-gray-300">Download on the</div>
                <div className="text-sm font-semibold leading-none">App Store</div>
              </div>
            </a>
            
            <a 
              href="#" 
              className="flex items-center bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2" fill="currentColor">
                <path d="M3.60001 2.66074C3.40376 2.872 3.26136 3.1373 3.18301 3.41077C3.10466 3.68424 3.09208 3.9777 3.14601 4.26074C3.63601 6.89074 5.01601 10.8907 7.64601 14.2607C8.33601 15.2107 9.16601 16.1807 10.116 17.0707C10.116 17.0707 11.366 16.0707 12.496 15.1807C12.0198 14.7584 11.5816 14.2979 11.186 13.8007C10.2062 12.5904 9.36844 11.2772 8.68601 9.88074C7.37601 7.31074 6.73601 4.98074 6.66601 3.42074C6.66601 3.42074 6.64601 3.23074 6.72601 3.09074C6.80601 2.95074 6.96601 2.91074 6.96601 2.91074C8.24601 2.53074 9.53601 2.21074 10.836 1.94074L12.096 1.67074L3.60601 2.66074H3.60001ZM14.686 1.18074L14.376 1.22074L13.546 1.33074C13.546 1.33074 14.456 2.79074 14.886 4.74074C15.326 6.69074 15.216 8.55074 15.216 8.55074L16.926 6.85074C16.926 6.85074 17.006 5.33074 16.596 3.72074C16.196 2.11074 15.346 1.30074 14.686 1.18074V1.18074ZM15.366 9.95074C15.366 9.95074 13.746 11.4007 13.066 11.9907C13.066 11.9907 13.246 12.2307 13.556 12.5607C13.866 12.8907 14.336 13.3007 14.756 13.6507C16.476 12.2107 17.306 11.4907 17.306 11.4907C17.306 11.4907 16.546 10.5507 15.376 9.95074H15.366ZM13.006 18.3307L12.646 18.8907C13.5161 19.5172 14.4525 20.0414 15.436 20.4507C18.188 21.7833 21.1996 22.4818 24.266 22.5007V20.3807C21.5192 20.3236 18.832 19.576 16.436 18.1907C15.4151 17.5867 14.4526 16.882 13.556 16.0907L13.016 18.3307H13.006Z"/>
              </svg>
              <div className="text-xs">
                <div className="text-gray-300">GET IT ON</div>
                <div className="text-sm font-semibold leading-none">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}