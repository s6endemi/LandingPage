"use client";

import React from "react";

// TypeScript Interface für Testimonials
interface Testimonial {
  id: number;
  name: string;
  role: string;
  stars: number;
  text: string;
}

// Props für TestimonialCard
interface TestimonialCardProps {
  testimonial: Testimonial;
}

// Props für TestimonialMarquee
interface TestimonialMarqueeProps {
  className?: string;
}

export function TestimonialMarquee({ className = "" }: TestimonialMarqueeProps) {
  // Testimonial data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah K.",
      role: "Athly Nutzerin seit 4 Monaten",
      stars: 5,
      text: "Endlich schaffe ich es regelmäßig zu trainieren! Mein chaotischer Alltag war immer meine Ausrede - jetzt passt sich Athly einfach an, egal wie mein Tag aussieht.",
    },
    {
      id: 2,
      name: "Michael B.",
      role: "Athly Nutzer seit 3 Monaten",
      stars: 5,
      text: "Hätte nie gedacht, dass ich das sage, aber ich freue mich jetzt aufs Training! In nur 3 Monaten mit Athly mehr erreicht als mit meinem alten Gym-Abo.",
    },
    {
      id: 3,
      name: "Julia M.",
      role: "Athly Nutzerin seit 5 Monaten",
      stars: 5,
      text: "Ein Personal Trainer war für mich nie drin. Mit Athly hab ich jetzt praktisch meinen eigenen Coach in der Tasche - ohne dass mein Konto blutet.",
    },
    {
      id: 4,
      name: "Thomas R.",
      role: "Athly Beta-Tester seit 4 Monaten",
      stars: 4,
      text: "Bin echt überrascht, wie gut die App meine Fortschritte erkennt! Keine 08/15-Übungen mehr, sondern ein Plan, der wirklich zu mir passt.",
    },
    {
      id: 5,
      name: "Anna P.",
      role: "Athly Nutzerin seit 5 Monaten",
      stars: 5,
      text: "Als Vielreisende war regelmäßiges Training ein Ding der Unmöglichkeit. Athly ist jetzt einfach immer dabei - im Hotelzimmer, zuhause oder im Park.",
    },
  ];

  // Funktion zur Erzeugung einer konsistenten Farbe basierend auf dem Namen
  const getColorFromName = (name: string): string => {
    const colors = [
      "#9bc539", // Primärgrün
      "#3B82F6", // Blau
      "#F59E0B", // Orange
      "#8B5CF6", // Lila
      "#EC4899", // Pink
      "#10B981", // Smaragd
    ];

    // Einfaches Hash-Verfahren um aus dem Namen einen Farbindex zu generieren
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Erstelle einen Testimonial Card
  const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
    // Extrahiere den ersten Buchstaben des Namens für den Avatar
    const initial = testimonial.name.charAt(0);

    // Generiere Farbe basierend auf dem Namen
    const color = getColorFromName(testimonial.name);

    return (
      <div key={testimonial.id} className="flex-shrink-0 w-80 mx-3 testimonial-card">
        <div className="bg-gray-50 rounded-xl p-4 h-full shadow-sm border border-gray-100 testimonial-card-inner">
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(testimonial.stars)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>

          <blockquote className="text-gray-700 mb-4 text-sm testimonial-text">
            &quot;{testimonial.text}&quot;
          </blockquote>

          <div className="flex items-center mt-auto">
            {/* Initial-Avatar mit stärkerem Hintergrund und weißen Initialen */}
            <div
              className="w-8 h-8 rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-sm font-medium"
              style={{
                backgroundColor: color, // Volle Farbe für den Hintergrund
                color: "white", // Weiße Initialen
              }}
            >
              {initial}
            </div>
            <div>
              <div className="font-medium text-gray-900 text-sm">{testimonial.name}</div>
              <div className="text-xs text-gray-500">{testimonial.role}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`relative overflow-hidden py-6 ${className}`}>
      {/* Inline-Style für die Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% - 1.5rem));
          }
        }

        .marquee-content {
          display: flex;
          animation: scroll 25s linear infinite;
          will-change: transform;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        /* Optimierte Animation für mobile Geräte */
        @media (max-width: 768px) {
          .testimonial-card {
            width: 260px !important; /* Kleinere Karten auf Mobilgeräten */
            margin-left: 0.5rem !important;
            margin-right: 0.5rem !important;
          }

          .testimonial-card-inner {
            padding: 0.75rem !important;
          }

          .testimonial-text {
            font-size: 0.75rem !important; /* Kleinere Schrift auf Mobilgeräten */
            line-height: 1.2 !important;
            margin-bottom: 0.5rem !important;
          }

          .marquee-content {
            animation-duration: 15s !important;
          }
        }
      `}</style>

      <div className="marquee-outer w-full overflow-hidden">
        <div className="marquee-content">
          {/* Erste Kopie der Testimonials */}
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}

          {/* Zweite Kopie für nahtlosen Scrollen */}
          {testimonials.map((testimonial) => (
            <TestimonialCard key={`duplicate-${testimonial.id}`} testimonial={testimonial} />
          ))}
        </div>
      </div>

      {/* Gradient-Overlays für weiche Kanten */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"></div>
    </div>
  );
}
