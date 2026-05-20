"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

interface Dachdecker {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  location: string;
  notes: string;
  meister: boolean;
  rating?: number;
  reviewsCount?: number;
}

const DACHDECKER_DATA: Dachdecker[] = [
  { name: "VK-Dach", email: "info@vk-dach.de", website: "https://vk-dach.de", location: "Bonn", notes: "Meisterbetrieb für Steil- & Flachdächer", meister: true, rating: 4.8, reviewsCount: 24 },
  { name: "Eckhard Behm Bedachungen", email: "info@behm-dach.de", website: "https://behm-dach.de", location: "Bonn", notes: "Dachdeckermeister, Fassaden & Abdichtungen", meister: true, rating: 4.7, reviewsCount: 38 },
  { name: "Wiegel Bedachungen", email: "info@wdach.de", website: "https://wdach.de", location: "Bonn", notes: "Zuverlässiger lokaler Bedachungsbetrieb", meister: false, rating: 4.3, reviewsCount: 12 },
  { name: "Dachdeckerei Schönenberg", email: "dachdeckerei-ms@web.de", website: "https://xn--dachdeckerei-schnenberg-nlc.de", location: "Bonn", notes: "Dachdeckerei & Meisterbetrieb", meister: true, rating: 4.9, reviewsCount: 41 },
  { name: "Schröder Bedachungstechnik GmbH", email: "mail@msdach.de", website: "https://msdach.de", location: "Bonn", notes: "Spezialisiert auf moderne Bedachungstechnik", meister: false, rating: 4.6, reviewsCount: 19 },
  { name: "Sido Bedachungen", email: "info@sido-bedachungen.de", website: "https://sido-bedachungen.de", location: "Bonn", notes: "Komplette Dachlösungen & Notdienst", meister: false, rating: 4.4, reviewsCount: 32 },
  { name: "beda bedachungsartikel & Co. KG", email: "bonn@beda-dach.de", website: "https://beda-dach.de", location: "Bonn", notes: "Bedachungsfachhandel / Lieferant (Niederlassung Bonn)", meister: false, rating: 4.5, reviewsCount: 15 },
  { name: "LB Bedachungen Bonn", email: "lb-bedachungen@netcologne.de", website: "https://lb-bedachungenbonn.de", location: "Bonn", notes: "Dachreparaturen & Wartungsarbeiten", meister: false, rating: 4.2, reviewsCount: 8 },
  { name: "Peter Kühlem jun. GmbH", email: "info@dachdecker-kuehlem.de", website: "https://dachdecker-kuehlem.de", location: "Bonn", notes: "Traditioneller Meisterbetrieb für Dacharbeiten", meister: true, rating: 4.8, reviewsCount: 56 },
  { name: "Dachdeckerei Ditscheid", email: "kontakt@dachdecker-ditscheid.de", website: "https://dachdecker-ditscheid.de", location: "Bonn", notes: "Philip Ditscheid Dachdeckermeister", meister: true, rating: 4.7, reviewsCount: 29 },
  { name: "Alexander Märtens", email: "kontakt@am-dach.de", website: "https://am-dach.de", location: "Bonn", notes: "Dachdeckermeisterbetrieb", meister: true, rating: 4.6, reviewsCount: 17 },
  { name: "Bedachungen Meier", email: "dachdeckermeier@gmx.net", website: "https://dachdecker-in-bornheim.de", location: "Bornheim", notes: "Dachdeckermeisterbetrieb in Bornheim", meister: true, rating: 4.5, reviewsCount: 22 },
  { name: "Daniel Spürkel Bedachungen", email: "info@spürkel-bedachung.de", website: "https://xn--sprkel-bedachung-kzb.de", location: "Bornheim", notes: "Zertifizierter Meisterbetrieb", meister: true, rating: 4.9, reviewsCount: 34 },
  { name: "Peter Brings GmbH", email: "info@brings-dachdecker.de", website: "https://brings-dachdecker.de", location: "Bornheim", notes: "Kompetenter Partner für Steil- & Flachdach", meister: false, rating: 4.1, reviewsCount: 16 },
  { name: "Steeg Bedachungen GmbH", email: "mail@steeg-bedachung.de", website: "https://steeg-bedachung.de", location: "Alfter", notes: "Traditioneller Familienbetrieb in Alfter", meister: false, rating: 4.4, reviewsCount: 27 },
  { name: "Bedachungstechnik Kurenbach", email: "info@kurenbach.de", website: "https://dachdecker-koenigswinter.de", location: "Königswinter", notes: "Bedachungstechnik & Flachdachisolierung", meister: false, rating: 4.3, reviewsCount: 14 },
  { name: "DachTec Klaus Wilhelm GmbH", email: "info@dachtec.de", website: "https://dachtec.de", location: "Königswinter", notes: "Dächer, Fassaden, Solartechnik in Bonn & Bad Honnef", meister: false, rating: 4.6, reviewsCount: 51 },
  { name: "Zimmerei & Bedachungen Peter Kossmann", email: "info@peter-kossmann.de", website: "https://peter-kossmann.de", location: "Siegburg", notes: "Zimmerei, Holzbau & Dachdeckerei im Großraum Bonn", meister: false, rating: 4.7, reviewsCount: 33 },
  { name: "Andreas Vianden", email: "info@rinnenflitzer.de", website: "https://rinnenflitzer.de", location: "Siegburg", notes: "Spenglerei & Dachrinnenservice ('Rinnenflitzer')", meister: false, rating: 4.8, reviewsCount: 21 },
  { name: "RSB Rhein-Sieg-Bedachungen GmbH", email: "info@rhein-sieg-bedachungen.de", website: "https://rhein-sieg-bedachungen.de", location: "Troisdorf", notes: "Großer, regionaler Fachbetrieb für Dach & Wand", meister: false, rating: 4.5, reviewsCount: 68 },
  { name: "Bedachungen Bitz", email: "info@bedachungen-bitz.de", website: "https://bedachungen-bitz.de", location: "Troisdorf", notes: "Qualität am Dach, Steil- & Flachdächer", meister: false, rating: 4.2, reviewsCount: 11 },
  { name: "Fritz Bedachungen", email: "info@fritz-bedachungen.de", website: "https://fritz-bedachungen.de", location: "Troisdorf", notes: "Aktiv in Lohmar, Siegburg, Troisdorf & Köln/Bonn", meister: false, rating: 4.6, reviewsCount: 25 },
  { name: "Wörner Bedachungen", email: "info@bedachungen-woerner.de", website: "https://bedachungen-woerner.de", location: "Siegburg", notes: "Ihr Meisterbetrieb für Bedachungen", meister: true, rating: 4.9, reviewsCount: 47 },
  { name: "Dachdecker Dieter Sailer", email: "info@sailer-dach.de", website: "https://sailer-dach.de", location: "Hennef", notes: "Dachdeckerarbeiten & Bauklempnerei", meister: false, rating: 4.3, reviewsCount: 9 },
  { name: "Klaus Mundorf Bedachungs GmbH", email: "kontakt@mundorf-gmbh.de", website: "https://meindachdecker.de", location: "Niederkassel", notes: "Familiengeführter Innungsfachbetrieb", meister: false, rating: 4.7, reviewsCount: 62 },
  { name: "Hemmersbach Bedachungs GmbH", email: "info@hemmersbach-gmbh.de", website: "https://hemmersbach-gmbh.de", location: "Andere", notes: "Regionale Bedachungs GmbH (Waldbröl)", meister: false, rating: 4.4, reviewsCount: 18 },
  { name: "Alex Fey Bedachungen", email: "mail@fey-bedachungen.de", website: "https://fey-bedachungen.de", location: "Meckenheim", notes: "Meisterbetrieb für moderne Bedachungen", meister: true, rating: 4.8, reviewsCount: 36 },
  { name: "Hein & Knott Meisterbetrieb", email: "info@hein-knott.de", website: "https://hein-knott.de", location: "Meckenheim", notes: "Meisterbetrieb für Dach & Fassadengestaltung", meister: true, rating: 4.7, reviewsCount: 28 },
  { name: "Niels Deiters Bedachungen GmbH", email: "info@deiters-bedachungen.gmbh", website: "https://deiters-bedachungen.de", location: "Meckenheim", notes: "Kompetentes Team für Altbausanierungen & Reparaturen", meister: false, rating: 4.5, reviewsCount: 43 },
  { name: "Andreas Gilles Bedachungen", email: "info@gillesdaecher.de", website: "https://gillesdaecher.de", location: "Meckenheim", notes: "Traditionelle Dachdeckerarbeiten", meister: false, rating: 4.3, reviewsCount: 15 },
  { name: "Dachhandwerk Pokorny", email: "info@dachhandwerk-pokorny.de", website: "https://dachhandwerk-pokorny.de", location: "Rheinbach", notes: "Hochwertiges Dachhandwerk & Reparaturen", meister: false, rating: 4.9, reviewsCount: 39 },
  { name: "Heinrich Reitz Bedachungen GmbH", email: "service@reitz-bedachungen.de", website: "https://reitz-bedachungen.de", location: "Rheinbach", notes: "Energieeffizienzberater & Dachmeisterbetrieb", meister: true, rating: 4.8, reviewsCount: 54 },
  { name: "Rolf Zavelberg Bedachungen", email: "info@r-zavelberg.de", website: "https://r-zavelberg.de", location: "Rheinbach", notes: "Langjährige Erfahrung bei Dacharbeiten", meister: false, rating: 4.4, reviewsCount: 13 },
  { name: "Sellab Dachdeckermeister", email: "info@dachdeckermeister-sellab.de", website: "https://dachdeckermeister-sellab.de", location: "Rheinbach", notes: "Ihr Dachdeckermeister in Rheinbach", meister: true, rating: 4.7, reviewsCount: 31 },
  { name: "Achim Weber Bedachungen", email: "kontakt@achim-weber-bedachungen.de", website: "https://achim-weber-bedachungen.de", location: "Rheinbach", notes: "Lokaler Spezialist für Steil- & Flachdach", meister: false, rating: 4.2, reviewsCount: 7 },
  { name: "Manfred Felten Bedachungen", email: "felten.bedachungen@gmail.com", website: "https://felten-bedachungen.de", location: "Swisttal", notes: "Individuelle Dachlösungen", meister: false, rating: 4.6, reviewsCount: 19 },
  { name: "Bedachungen Wall", email: "info@bedachungen-wall.de", website: "https://bedachungen-wall.de", location: "Swisttal", notes: "Zuverlässiger Dachdecker-Service", meister: false, rating: 4.3, reviewsCount: 11 },
  { name: "Bedachungen Alexander Eichhorn GmbH", email: "info@bedachungen-eichhorn.de", website: "https://bedachungen-eichhorn.de", location: "Wachtberg", notes: "Steildächer, Flachdächer & Schieferarbeiten", meister: false, rating: 4.5, reviewsCount: 26 },
  { name: "Stephan Michael Bedachungen", email: "info@sm-dach.de", website: "https://sm-dach.de", location: "Wachtberg", notes: "Dachmeisterbetrieb in Wachtberg", meister: true, rating: 4.8, reviewsCount: 37 },
  { name: "Tobias Schlug Bedachungen", email: "info@bedachungen-schlug.de", website: "https://bedachungen-schlug.de", location: "Wachtberg", notes: "Nachhaltige Isolierung & Holzarbeiten", meister: false, rating: 4.4, reviewsCount: 16 },
  { name: "Dachwerk-Direkt", email: "ab.dachwerk@gmail.com", website: "https://dachwerk-direkt.de", location: "Hennef", notes: "Moderne Flachdächer & Abdichtungstechnik", meister: false, rating: 4.6, reviewsCount: 23 },
  { name: "Schultz Bedachungen", email: "osb-hennef@web.de", website: "https://bedachungen-schultz.de", location: "Hennef", notes: "Erfahrener Partner für Dach- & Holzarbeiten", meister: false, rating: 4.2, reviewsCount: 12 },
  { name: "Weingarten Bedachungen", email: "info@weingarten-bedachungen.de", website: "https://weingarten-bedachungen.de", location: "Lohmar", notes: "Photovoltaik- & Dachspezialist", meister: false, rating: 4.7, reviewsCount: 45 },
  { name: "Kröll Bedachungen GmbH", email: "info@kroell-bedachungen.de", website: "https://kroell-bedachungen.de", location: "Lohmar", notes: "Moderne Dachsysteme & Holzbau", meister: false, rating: 4.5, reviewsCount: 31 },
  { name: "Arno Bedachungen", email: "info@arnobedachungen.de", website: "https://arnobedachungen.de", location: "Lohmar", notes: "Ihr Dachdecker im Großraum Köln/Bonn", meister: false, rating: 4.3, reviewsCount: 14 },
  { name: "Reinhardt Dachtechnik GmbH", email: "reinhardt-dachtechnik-gmbh@t-online.de", website: "https://reinhardt-dachtechnik.de", location: "Eitorf", notes: "Erfahrener Innungsfachbetrieb seit Generationen", meister: false, rating: 4.6, reviewsCount: 29 },
  { name: "Popp Dachbau", email: "info@dachbau-popp.de", website: "https://dachbau-popp.de", location: "Sankt Augustin", notes: "Spezialisiert auf Flachdachabdichtung", meister: false, rating: 4.4, reviewsCount: 21 },
  { name: "Schüller GmbH Franz-Willi Bedachungsbetrieb", email: "info@dachdecker-schueller.de", website: "https://dachdecker-schueller.de", location: "Sankt Augustin", notes: "Traditioneller Handwerksmeisterbetrieb", meister: true, rating: 4.8, reviewsCount: 58 },
  { name: "Arno Müller Dachdecker Meisterbetrieb", email: "info@arno-mueller-dachdecker.de", website: "https://arno-mueller-dachdecker.de", location: "Sankt Augustin", notes: "Ausbildungs- & Meisterbetrieb", meister: true, rating: 4.7, reviewsCount: 42 },
  { name: "PP Dachdesign", email: "info@pp-dachdesign.de", website: "https://pp-dachdesign.de", location: "Sankt Augustin", notes: "Design- & Architekturdächer", meister: false, rating: 4.5, reviewsCount: 17 },
  { name: "Bedachungen Dengel", email: "info@bedachungen-dengel.de", website: "https://bedachungen-dengel.de", location: "Sankt Augustin", notes: "Sanierungen & Sturmschäden", meister: false, rating: 4.2, reviewsCount: 8 },
  { name: "Dächer von Klein", email: "info@daecher-von-klein.de", website: "https://daecher-von-klein.de", location: "Bad Honnef", notes: "Experte für Schiefereindeckungen & Denkmalschutz", meister: false, rating: 4.8, reviewsCount: 35 },
  { name: "Abdichtungstechnik Bedachungen Bytyqi", phone: "0228 35037550", location: "Bonn", notes: "Spezialisiert auf Abdichtungstechnik und Bedachungen im Raum Bad Godesberg.", meister: false, rating: 5.0, reviewsCount: 1 },
  { name: "Krumtünger GmbH", phone: "02227 2751", location: "Bornheim", notes: "Traditionelle Dachdeckerei, Bauspenglerei und Zimmerei in Bornheim-Merten.", meister: false, rating: 0.0, reviewsCount: 0 },
  { name: "Schlebusch Bedachungen", phone: "0228 92616456", location: "Bonn", notes: "Zuverlässige Dachdeckerei für Dachsanierungen, Reparaturen und Holzarbeiten.", meister: false, rating: 0.0, reviewsCount: 0 },
  { name: "Reuter und Grommes GmbH", phone: "0228 281795", location: "Bonn", notes: "Klassischer Dachdecker-Innungsbetrieb in Bonn-Ippendorf.", meister: false, rating: 0.0, reviewsCount: 0 },
  { name: "Andreas Schildgen A.S. Bedachungen", phone: "0228 857760", location: "Bonn", notes: "Dachdecker- und Zimmererarbeiten, Dachausbau und Wärmeschutz in Bonn-Mehlem.", meister: false, rating: 0.0, reviewsCount: 0 },
  { name: "Michael Becker Bedachungen", phone: "0228 3692670", location: "Alfter", notes: "Zuverlässiger Dachdeckerbetrieb in Alfter für Reparaturarbeiten und Kleinstreparaturen.", meister: false, rating: 5.0, reviewsCount: 2 },
];

export default function DachdeckerClient() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("Alle");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Load from localStorage on mount (hydration safe)
  useEffect(() => {
    const saved = localStorage.getItem("dachdecker_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e);
      }
    }
  }, []);

  // Sync to localStorage and state
  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(name);
      const next = isFav ? prev.filter((n) => n !== name) : [...prev, name];
      localStorage.setItem("dachdecker_favorites", JSON.stringify(next));
      return next;
    });
  };

  // Extract unique cities for filter buttons
  const cities = useMemo(() => {
    const allCities = DACHDECKER_DATA.map((d) => d.location);
    return ["Alle", ...Array.from(new Set(allCities))].sort((a, b) => {
      if (a === "Alle") return -1;
      if (b === "Alle") return 1;
      return a.localeCompare(b);
    });
  }, []);

  // Filter lists based on search, selected city and favorites, and sort favorites first
  const filteredData = useMemo(() => {
    const filtered = DACHDECKER_DATA.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.notes.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === "Alle" || d.location === selectedCity;
      const matchesOnlyFavorites = !showOnlyFavorites || favorites.includes(d.name);
      return matchesSearch && matchesCity && matchesOnlyFavorites;
    });

    // Sort: favorites always first, otherwise maintain original array order
    return [...filtered].sort((a, b) => {
      const aFav = favorites.includes(a.name);
      const bFav = favorites.includes(b.name);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [search, selectedCity, showOnlyFavorites, favorites]);

  // Statistics
  const meisterCount = useMemo(() => {
    return filteredData.filter((d) => d.meister).length;
  }, [filteredData]);

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Back to Homepage */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Zurück zur Übersicht
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-teal-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Dachdecker-Verzeichnis Bonn & Rhein-Sieg
          </h1>
          <p className="text-gray-400 mt-2 text-base max-w-2xl">
            Übersicht von {DACHDECKER_DATA.length} Dachdeckerfachbetrieben, Zimmereien und qualifizierten Meisterbetrieben im Großraum Bonn und Umgebung.
          </p>
        </div>

        {/* Stats Pill */}
        <div className="flex gap-3 justify-center sm:justify-start">
          <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Gefunden</div>
            <div className="text-xl font-bold text-white mt-0.5">{filteredData.length}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Meisterbetriebe</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5">{meisterCount}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Favoriten</div>
            <div className="text-xl font-bold text-rose-500 mt-0.5">{favorites.length}</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8 shadow-xl">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search Box */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Suche nach Name, Ort, Spezialisierung..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-11 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Favorites Filter Toggle */}
          <button
            onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
              showOnlyFavorites
                ? "bg-rose-950/40 border-rose-500 text-rose-400 shadow-md shadow-rose-950/20"
                : "bg-gray-950 border-gray-800 text-gray-400 hover:text-white hover:border-gray-700"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill={showOnlyFavorites ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={2}
              className={`w-4 h-4 transition-transform ${showOnlyFavorites ? "text-rose-500 scale-110" : "text-gray-500 hover:text-rose-500"}`}
            >
              <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9c-.04-.033-.08-.066-.12-.1-.847-.688-2.537-2.09-2.537-4.223 0-1.89 1.488-3.5 3.5-3.5 1.486 0 2.413.805 2.766 1.258.353-.453 1.28-1.258 2.766-1.258 2.012 0 3.5 1.61 3.5 3.5 0 2.133-1.69 3.535-2.537 4.223-.04.034-.08.067-.12.1a22.09 22.09 0 01-2.582 1.9 20.738 20.738 0 01-1.162.682l-.019.01-.005.003h-.002z" />
            </svg>
            <span>Nur Favoriten ({favorites.length})</span>
          </button>
        </div>

        {/* City Filter Pills */}
        <div>
          <div className="text-xs text-gray-400 mb-2 font-medium">Städte & Regionen:</div>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedCity === city
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-950/50"
                    : "bg-gray-950 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-white"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Dachdecker */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-2xl text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 mx-auto mb-4 text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
          <p className="text-lg font-medium">Keine Betriebe gefunden.</p>
          <p className="text-sm text-gray-600 mt-1">
            Passen Sie Ihre Suche oder Ihren Stadtfilter an.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredData.map((d, index) => {
            const isFav = favorites.includes(d.name);
            return (
              <div
                key={`${d.name}-${index}`}
                className={`bg-gray-900 border transition-all duration-300 rounded-xl p-5 flex flex-col justify-between group shadow-md ${
                  isFav
                    ? "border-rose-500/40 shadow-rose-950/10 bg-gradient-to-b from-gray-900 to-rose-950/10 hover:border-rose-500/80 hover:shadow-rose-950/20"
                    : "border-gray-800 hover:border-indigo-600/70"
                }`}
              >
                <div>
                  {/* Badge and Location / Heart */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-950 border border-gray-800 text-teal-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5 mr-1"
                        >
                          <path
                            fillRule="evenodd"
                            d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.776 11.776 0 0 0 .758.433 8.682 8.682 0 0 0 .281.14l.018.008.006.003ZM10 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {d.location}
                      </span>

                      {d.meister && (
                        <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-950/50 border border-amber-800/60 text-amber-400">
                          🏆 Meister
                        </span>
                      )}

                      {isFav && (
                        <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-850 text-rose-450">
                          ❤️ Favorit
                        </span>
                      )}
                    </div>

                    {/* Heart button */}
                    <button
                      onClick={() => toggleFavorite(d.name)}
                      className={`p-1.5 rounded-lg border transition-all duration-200 active:scale-95 ${
                        isFav
                          ? "bg-rose-950/40 border-rose-500/40 text-rose-500 hover:bg-rose-900/40 hover:text-rose-400"
                          : "bg-gray-950 border-gray-800 text-gray-500 hover:text-rose-500 hover:border-gray-700"
                      }`}
                      aria-label="Favorisieren"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill={isFav ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={2}
                        className="w-4 h-4"
                      >
                        <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9c-.04-.033-.08-.066-.12-.1-.847-.688-2.537-2.09-2.537-4.223 0-1.89 1.488-3.5 3.5-3.5 1.486 0 2.413.805 2.766 1.258.353-.453 1.28-1.258 2.766-1.258 2.012 0 3.5 1.61 3.5 3.5 0 2.133-1.69 3.535-2.537 4.223-.04.034-.08.067-.12.1a22.09 22.09 0 01-2.582 1.9 20.738 20.738 0 01-1.162.682l-.019.01-.005.003h-.002z" />
                      </svg>
                    </button>
                  </div>

                {/* Company Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {d.name}
                </h3>

                {/* Reviews */}
                {d.reviewsCount !== undefined && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className={`w-3 h-3 ${
                            i < Math.floor(d.rating || 0)
                              ? "text-amber-400"
                              : "text-gray-700"
                          }`}
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.6 3.102-1.196 4.622c-.21.81.67 1.45 1.378.98L10 15.34l4.17 2.682c.708.47 1.587-.17 1.378-.98l-1.196-4.622 3.6-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    {d.reviewsCount > 0 ? (
                      <span className="text-[10px] font-medium text-gray-400">
                        {d.rating?.toFixed(1)} ({d.reviewsCount} Google-{d.reviewsCount === 1 ? "Bewertung" : "Bewertungen"})
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-gray-500 italic">
                        Keine Google-Bewertungen
                      </span>
                    )}
                  </div>
                )}

                {/* Notes */}
                <p className="text-gray-400 text-sm mt-2 line-clamp-2 min-h-[2.5rem]">
                  {d.notes}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-gray-950 flex gap-2.5">
                {d.email ? (
                  <a
                    href={`mailto:${d.email}`}
                    className="flex-1 bg-gray-950 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white transition-all text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                    E-Mail
                  </a>
                ) : d.phone ? (
                  <a
                    href={`tel:${d.phone}`}
                    className="flex-1 bg-gray-950 hover:bg-emerald-950/40 border border-gray-800 hover:border-emerald-850 text-emerald-400 hover:text-emerald-300 transition-all text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.187-4.165-7-7l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                      />
                    </svg>
                    Anrufen
                  </a>
                ) : (
                  <span className="flex-1 bg-gray-950 border border-gray-900 text-gray-600 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-not-allowed">
                    Kein Kontakt
                  </span>
                )}

                {d.website ? (
                  <a
                    href={d.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-indigo-900/40 hover:bg-indigo-600/80 border border-indigo-800 hover:border-indigo-500 text-indigo-300 hover:text-white transition-all text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 0 1 8.716 2.253M12 3a9.004 9.004 0 0 0-8.716 2.253M12 12h.008v.008H12V12Z"
                      />
                    </svg>
                    Website
                  </a>
                ) : (
                  <span className="flex-1 bg-gray-950/40 border border-gray-900/60 text-gray-500 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-not-allowed select-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-3.5 h-3.5 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                      />
                    </svg>
                    Keine Website
                  </span>
                )}
              </div>
            </div>
          );
        })}
        </div>
      )}
    </div>
  );
}
