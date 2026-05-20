"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface Dachdecker {
  name: string;
  email: string;
  website: string;
  location: string;
  notes: string;
  meister: boolean;
}

const DACHDECKER_DATA: Dachdecker[] = [
  { name: "VK-Dach", email: "info@vk-dach.de", website: "https://vk-dach.de", location: "Bonn", notes: "Meisterbetrieb für Steil- & Flachdächer", meister: true },
  { name: "Eckhard Behm Bedachungen", email: "info@behm-dach.de", website: "https://behm-dach.de", location: "Bonn", notes: "Dachdeckermeister, Fassaden & Abdichtungen", meister: true },
  { name: "Wiegel Bedachungen", email: "info@wdach.de", website: "https://wdach.de", location: "Bonn", notes: "Zuverlässiger lokaler Bedachungsbetrieb", meister: false },
  { name: "Dachdeckerei Schönenberg", email: "dachdeckerei-ms@web.de", website: "https://xn--dachdeckerei-schnenberg-nlc.de", location: "Bonn", notes: "Dachdeckerei & Meisterbetrieb", meister: true },
  { name: "Schröder Bedachungstechnik GmbH", email: "mail@msdach.de", website: "https://msdach.de", location: "Bonn", notes: "Spezialisiert auf moderne Bedachungstechnik", meister: false },
  { name: "Sido Bedachungen", email: "info@sido-bedachungen.de", website: "https://sido-bedachungen.de", location: "Bonn", notes: "Komplette Dachlösungen & Notdienst", meister: false },
  { name: "beda bedachungsartikel & Co. KG", email: "bonn@beda-dach.de", website: "https://beda-dach.de", location: "Bonn", notes: "Bedachungsfachhandel / Lieferant (Niederlassung Bonn)", meister: false },
  { name: "LB Bedachungen Bonn", email: "lb-bedachungen@netcologne.de", website: "https://lb-bedachungenbonn.de", location: "Bonn", notes: "Dachreparaturen & Wartungsarbeiten", meister: false },
  { name: "Peter Kühlem jun. GmbH", email: "info@dachdecker-kuehlem.de", website: "https://dachdecker-kuehlem.de", location: "Bonn", notes: "Traditioneller Meisterbetrieb für Dacharbeiten", meister: true },
  { name: "Dachdeckerei Ditscheid", email: "kontakt@dachdecker-ditscheid.de", website: "https://dachdecker-ditscheid.de", location: "Bonn", notes: "Philip Ditscheid Dachdeckermeister", meister: true },
  { name: "Alexander Märtens", email: "kontakt@am-dach.de", website: "https://am-dach.de", location: "Bonn", notes: "Dachdeckermeisterbetrieb", meister: true },
  { name: "Bedachungen Meier", email: "dachdeckermeier@gmx.net", website: "https://dachdecker-in-bornheim.de", location: "Bornheim", notes: "Dachdeckermeisterbetrieb in Bornheim", meister: true },
  { name: "Daniel Spürkel Bedachungen", email: "info@spürkel-bedachung.de", website: "https://xn--sprkel-bedachung-kzb.de", location: "Bornheim", notes: "Zertifizierter Meisterbetrieb", meister: true },
  { name: "Peter Brings GmbH", email: "info@brings-dachdecker.de", website: "https://brings-dachdecker.de", location: "Bornheim", notes: "Kompetenter Partner für Steil- & Flachdach", meister: false },
  { name: "Steeg Bedachungen GmbH", email: "mail@steeg-bedachung.de", website: "https://steeg-bedachung.de", location: "Alfter", notes: "Traditioneller Familienbetrieb in Alfter", meister: false },
  { name: "Bedachungstechnik Kurenbach", email: "info@kurenbach.de", website: "https://dachdecker-koenigswinter.de", location: "Königswinter", notes: "Bedachungstechnik & Flachdachisolierung", meister: false },
  { name: "DachTec Klaus Wilhelm GmbH", email: "info@dachtec.de", website: "https://dachtec.de", location: "Königswinter", notes: "Dächer, Fassaden, Solartechnik in Bonn & Bad Honnef", meister: false },
  { name: "Zimmerei & Bedachungen Peter Kossmann", email: "info@peter-kossmann.de", website: "https://peter-kossmann.de", location: "Siegburg", notes: "Zimmerei, Holzbau & Dachdeckerei im Großraum Bonn", meister: false },
  { name: "Andreas Vianden", email: "info@rinnenflitzer.de", website: "https://rinnenflitzer.de", location: "Siegburg", notes: "Spenglerei & Dachrinnenservice ('Rinnenflitzer')", meister: false },
  { name: "RSB Rhein-Sieg-Bedachungen GmbH", email: "info@rhein-sieg-bedachungen.de", website: "https://rhein-sieg-bedachungen.de", location: "Troisdorf", notes: "Großer, regionaler Fachbetrieb für Dach & Wand", meister: false },
  { name: "Bedachungen Bitz", email: "info@bedachungen-bitz.de", website: "https://bedachungen-bitz.de", location: "Troisdorf", notes: "Qualität am Dach, Steil- & Flachdächer", meister: false },
  { name: "Fritz Bedachungen", email: "info@fritz-bedachungen.de", website: "https://fritz-bedachungen.de", location: "Troisdorf", notes: "Aktiv in Lohmar, Siegburg, Troisdorf & Köln/Bonn", meister: false },
  { name: "Wörner Bedachungen", email: "info@bedachungen-woerner.de", website: "https://bedachungen-woerner.de", location: "Siegburg", notes: "Ihr Meisterbetrieb für Bedachungen", meister: true },
  { name: "Dachdecker Dieter Sailer", email: "info@sailer-dach.de", website: "https://sailer-dach.de", location: "Hennef", notes: "Dachdeckerarbeiten & Bauklempnerei", meister: false },
  { name: "Klaus Mundorf Bedachungs GmbH", email: "kontakt@mundorf-gmbh.de", website: "https://meindachdecker.de", location: "Niederkassel", notes: "Familiengeführter Innungsfachbetrieb", meister: false },
  { name: "Hemmersbach Bedachungs GmbH", email: "info@hemmersbach-gmbh.de", website: "https://hemmersbach-gmbh.de", location: "Andere", notes: "Regionale Bedachungs GmbH (Waldbröl)", meister: false },
  { name: "Alex Fey Bedachungen", email: "mail@fey-bedachungen.de", website: "https://fey-bedachungen.de", location: "Meckenheim", notes: "Meisterbetrieb für moderne Bedachungen", meister: true },
  { name: "Hein & Knott Meisterbetrieb", email: "info@hein-knott.de", website: "https://hein-knott.de", location: "Meckenheim", notes: "Meisterbetrieb für Dach & Fassadengestaltung", meister: true },
  { name: "Niels Deiters Bedachungen GmbH", email: "info@deiters-bedachungen.gmbh", website: "https://deiters-bedachungen.de", location: "Meckenheim", notes: "Kompetentes Team für Altbausanierungen & Reparaturen", meister: false },
  { name: "Andreas Gilles Bedachungen", email: "info@gillesdaecher.de", website: "https://gillesdaecher.de", location: "Meckenheim", notes: "Traditionelle Dachdeckerarbeiten", meister: false },
  { name: "Dachhandwerk Pokorny", email: "info@dachhandwerk-pokorny.de", website: "https://dachhandwerk-pokorny.de", location: "Rheinbach", notes: "Hochwertiges Dachhandwerk & Reparaturen", meister: false },
  { name: "Heinrich Reitz Bedachungen GmbH", email: "service@reitz-bedachungen.de", website: "https://reitz-bedachungen.de", location: "Rheinbach", notes: "Energieeffizienzberater & Dachmeisterbetrieb", meister: true },
  { name: "Rolf Zavelberg Bedachungen", email: "info@r-zavelberg.de", website: "https://r-zavelberg.de", location: "Rheinbach", notes: "Langjährige Erfahrung bei Dacharbeiten", meister: false },
  { name: "Sellab Dachdeckermeister", email: "info@dachdeckermeister-sellab.de", website: "https://dachdeckermeister-sellab.de", location: "Rheinbach", notes: "Ihr Dachdeckermeister in Rheinbach", meister: true },
  { name: "Achim Weber Bedachungen", email: "kontakt@achim-weber-bedachungen.de", website: "https://achim-weber-bedachungen.de", location: "Rheinbach", notes: "Lokaler Spezialist für Steil- & Flachdach", meister: false },
  { name: "Manfred Felten Bedachungen", email: "felten.bedachungen@gmail.com", website: "https://felten-bedachungen.de", location: "Swisttal", notes: "Individuelle Dachlösungen", meister: false },
  { name: "Bedachungen Wall", email: "info@bedachungen-wall.de", website: "https://bedachungen-wall.de", location: "Swisttal", notes: "Zuverlässiger Dachdecker-Service", meister: false },
  { name: "Bedachungen Alexander Eichhorn GmbH", email: "info@bedachungen-eichhorn.de", website: "https://bedachungen-eichhorn.de", location: "Wachtberg", notes: "Steildächer, Flachdächer & Schieferarbeiten", meister: false },
  { name: "Stephan Michael Bedachungen", email: "info@sm-dach.de", website: "https://sm-dach.de", location: "Wachtberg", notes: "Dachmeisterbetrieb in Wachtberg", meister: true },
  { name: "Tobias Schlug Bedachungen", email: "info@bedachungen-schlug.de", website: "https://bedachungen-schlug.de", location: "Wachtberg", notes: "Nachhaltige Isolierung & Holzarbeiten", meister: false },
  { name: "Dachwerk-Direkt", email: "ab.dachwerk@gmail.com", website: "https://dachwerk-direkt.de", location: "Hennef", notes: "Moderne Flachdächer & Abdichtungstechnik", meister: false },
  { name: "Schultz Bedachungen", email: "osb-hennef@web.de", website: "https://bedachungen-schultz.de", location: "Hennef", notes: "Erfahrener Partner für Dach- & Holzarbeiten", meister: false },
  { name: "Weingarten Bedachungen", email: "info@weingarten-bedachungen.de", website: "https://weingarten-bedachungen.de", location: "Lohmar", notes: "Photovoltaik- & Dachspezialist", meister: false },
  { name: "Kröll Bedachungen GmbH", email: "info@kroell-bedachungen.de", website: "https://kroell-bedachungen.de", location: "Lohmar", notes: "Moderne Dachsysteme & Holzbau", meister: false },
  { name: "Arno Bedachungen", email: "info@arnobedachungen.de", website: "https://arnobedachungen.de", location: "Lohmar", notes: "Ihr Dachdecker im Großraum Köln/Bonn", meister: false },
  { name: "Reinhardt Dachtechnik GmbH", email: "reinhardt-dachtechnik-gmbh@t-online.de", website: "https://reinhardt-dachtechnik.de", location: "Eitorf", notes: "Erfahrener Innungsfachbetrieb seit Generationen", meister: false },
  { name: "Popp Dachbau", email: "info@dachbau-popp.de", website: "https://dachbau-popp.de", location: "Sankt Augustin", notes: "Spezialisiert auf Flachdachabdichtung", meister: false },
  { name: "Schüller GmbH Franz-Willi Bedachungsbetrieb", email: "info@dachdecker-schueller.de", website: "https://dachdecker-schueller.de", location: "Sankt Augustin", notes: "Traditioneller Handwerksmeisterbetrieb", meister: true },
  { name: "Arno Müller Dachdecker Meisterbetrieb", email: "info@arno-mueller-dachdecker.de", website: "https://arno-mueller-dachdecker.de", location: "Sankt Augustin", notes: "Ausbildungs- & Meisterbetrieb", meister: true },
  { name: "PP Dachdesign", email: "info@pp-dachdesign.de", website: "https://pp-dachdesign.de", location: "Sankt Augustin", notes: "Design- & Architekturdächer", meister: false },
  { name: "Bedachungen Dengel", email: "info@bedachungen-dengel.de", website: "https://bedachungen-dengel.de", location: "Sankt Augustin", notes: "Sanierungen & Sturmschäden", meister: false },
  { name: "Dächer von Klein", email: "info@daecher-von-klein.de", website: "https://daecher-von-klein.de", location: "Bad Honnef", notes: "Experte für Schiefereindeckungen & Denkmalschutz", meister: false },
];

export default function DachdeckerClient() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("Alle");

  // Extract unique cities for filter buttons
  const cities = useMemo(() => {
    const allCities = DACHDECKER_DATA.map((d) => d.location);
    return ["Alle", ...Array.from(new Set(allCities))].sort((a, b) => {
      if (a === "Alle") return -1;
      if (b === "Alle") return 1;
      return a.localeCompare(b);
    });
  }, []);

  // Filter lists based on search and selected city
  const filteredData = useMemo(() => {
    return DACHDECKER_DATA.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.notes.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === "Alle" || d.location === selectedCity;
      return matchesSearch && matchesCity;
    });
  }, [search, selectedCity]);

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

          {/* Quick Filters Info */}
          <div className="hidden md:flex items-center text-xs text-gray-500">
            Filtern Sie nach Städten für schnelle Ergebnisse.
          </div>
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
          {filteredData.map((d, index) => (
            <div
              key={`${d.name}-${index}`}
              className="bg-gray-900 border border-gray-800 hover:border-indigo-600/70 transition-all rounded-xl p-5 flex flex-col justify-between group shadow-md"
            >
              <div>
                {/* Badge and Location */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
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
                      🏆 Meisterbetrieb
                    </span>
                  )}
                </div>

                {/* Company Name */}
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {d.name}
                </h3>

                {/* Notes */}
                <p className="text-gray-400 text-sm mt-2 line-clamp-2 min-h-[2.5rem]">
                  {d.notes}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-4 border-t border-gray-950 flex gap-2.5">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
