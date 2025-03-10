"use client";

import React from 'react';
import Link from 'next/link';

export function Footer() {
  // Essenzielle rechtliche Links
  const legalLinks = [
    { name: 'Impressum', href: '/impressum' },
    { name: 'Datenschutz', href: '/datenschutz' },
    { name: 'AGB', href: '/agb' }
  ];

  // Einfache Social Media Links (optional)
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
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo und Copyright */}
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <div className="mr-2">
                <svg className="h-6 w-6 text-[#9bc539]" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 3L33 30H3L18 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M18 12L25.5 25H10.5L18 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-800">ATHLY</span>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Athly. Alle Rechte vorbehalten.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            {/* Rechtliche Links */}
            <div className="flex space-x-6 mb-4">
              {legalLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href}
                  className="text-sm text-gray-500 hover:text-[#9bc539] transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Social Media Icons (optional) */}
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
      </div>
    </footer>
  );
}