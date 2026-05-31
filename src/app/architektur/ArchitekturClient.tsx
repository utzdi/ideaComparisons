"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";

interface Architekt {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  location: string;
  notes: string;
}

const ARCHITEKTUR_DATA: Architekt[] = [
  // === BONN ===
  { name: "Grotegut Architektur GmbH", email: "info@grotegut.de", phone: "+49 228 76382950", website: "https://www.grotegut.de", location: "Bonn", notes: "Wohnbau, Sanierung, Umbau, Anbau, Denkmalsanierung, energetische Sanierung" },
  { name: "Architekturbüro Pfeifer", email: "info@architekt-pfeifer.de", phone: "+49 228 2425721", website: "https://www.architekt-pfeifer.de", location: "Bonn", notes: "Denkmalgerechte Sanierung, Umbau, Innenraumgestaltung, Neubau" },
  { name: "Architekturbüro Piotrowski", email: "info@architekten-piotrowski.de", phone: "+49 228 356001", website: "https://www.architekten-bonn.de", location: "Bonn", notes: "Sanierung, Restaurierung von Baudenkmälern, Wohn- und Geschäftsbauten" },
  { name: "Architekturbüro Kraume-Bettin", email: "info@kraume-bettin-architekten.com", phone: "+49 228 9653410", website: "https://www.kraume-bettin-architekten.com", location: "Bonn", notes: "Wohnbau, Gewerbebau, Sanierung, Neubau" },
  { name: "sgp HACHTEL | BAUER GmbH", email: "info@sgp-architekten.de", phone: "+49 228 9259870", website: "https://www.sgp-architekten.de", location: "Bonn", notes: "Wohnbau, Gewerbebau, öffentliche Bauten, Architekten BDA" },
  { name: "Kuhbus Architekten Planungsges. mbH", email: "info@kuhbus-architekten.de", phone: "+49 228 98144000", website: "https://www.kuhbus-architekten.de", location: "Bonn", notes: "Sanierung, Umbau, Projektentwicklung, nachhaltige Architektur" },
  { name: "Lindholm Architekten PartGmbB", email: "buero@lindholm-architekten.de", phone: "+49 228 35094477", website: "https://www.lindholm-architekten.de", location: "Bonn", notes: "Sanierung von Bestandsgebäuden, Bauen im Denkmalkontext, Innenarchitektur" },
  { name: "Beyss Architekten GmbH", email: "office@beyss-architekten.de", phone: "+49 228 94554520", website: "https://www.beyss-architekten.de", location: "Bonn", notes: "Architektur & Generalplanung, individuelles Projektmanagement" },
  { name: "BN Architekten GmbH", email: "bn@bn-a.de", phone: "+49 228 249977", website: "https://www.bn-a.de", location: "Bonn", notes: "Wohnbau, Gewerbebau, öffentliche Bauten" },
  { name: "HOORMANN + KLEIN Architekten", email: "info@hoormann.de", phone: "+49 228 469063", website: "https://www.hoormann.de", location: "Bonn", notes: "Neubau, Anbau, Bauen im Bestand, Sanierung, Kindergärten" },
  { name: "Koenigs Rütter Architekten", email: "architekten@koenigs-ruetter.de", phone: "+49 228 9695120", website: "https://www.koenigs-ruetter.de", location: "Bonn", notes: "Modernisierung, Brandschutzsanierung, Denkmalpflege, Schulen, Kitas" },
  { name: "Offermanns Architekten GbR", email: "info@offermanns-architekten.de", phone: "+49 228 280780", website: "https://www.offermanns-architekten.de", location: "Bonn", notes: "Umbau, Modernisierung von Wohnhäusern, Einzelhandel, Ärztehäuser" },
  { name: "Architekturbüro Karyakos", email: "info@karyakos.com", phone: "+49 176 30393287", website: "https://www.karyakos.com", location: "Bonn", notes: "Nachhaltige und zukunftsorientierte Architektur, Brandschutzkonzepte" },
  { name: "Fischer | Summerer Architekten", email: "info@fischer-summerer.de", phone: "+49 2632 9891680", website: "https://www.fischer-summerer.de", location: "Bonn", notes: "Wohnbau, Gewerbebau, Neubau, Sanierung" },
  { name: "Architekturbüro Gradias", email: "gradias@gradias-architekt.de", website: "https://www.gradias-architekt.de", location: "Bonn", notes: "Architektur, Planung und Beratung" },
  { name: "Martini Architekten BDA", email: "office@martini-architekten.de", phone: "+49 228 9280080", website: "https://www.martini-architekten.de", location: "Bonn", notes: "Architektur BDA, Wohn- und Gewerbebau, öffentliche Bauten" },
  { name: "SCHUMACHER + WILLEKE ARCHITEKTEN", email: "kontakt@architekt-bonn.de", phone: "+49 228 409739-0", website: "https://www.architekt-bonn.de", location: "Bonn", notes: "Neubau, Umbau, Sanierung, Innenarchitektur" },
  { name: "Bungarten Architekten PartGmbB", email: "buero@bungartenarchitekten.de", phone: "+49 2225 83438-0", website: "https://www.bungartenarchitekten.de", location: "Bonn", notes: "Wohnbau, Gewerbebau, öffentliche Bauten" },
  { name: "Paul Martini Architektur", phone: "+49 228 90905040", location: "Bonn", notes: "Architektur BDA, Wohn- und Gewerbebau" },

  // === BORNHEIM ===
  { name: "Architekturbüro Sylvia Fröbel", email: "info@architektur-froebel.de", phone: "+49 2222 9776320", website: "https://www.architektur-froebel.de", location: "Bornheim", notes: "Ganzheitliche Betreuung von Planung bis Inneneinrichtung" },
  { name: "POGGEL ARCHITEKTEN", email: "info@poggel-architekten.de", phone: "+49 2227 9279966", website: "https://www.poggel-architekten.de", location: "Bornheim", notes: "Energieberatung, Wohnungsbau, Denkmalsanierung" },
  { name: "Architekt Helmut Görgen", email: "info@architekt-goergen.de", phone: "+49 2227 9337095", website: "https://www.architekt-goergen.de", location: "Bornheim", notes: "Barrierefreies Bauen, seniorengerechtes Wohnen, Wertgutachten" },
  { name: "NEUNWERK Architekten", email: "info@neunwerk.de", phone: "+49 2222 99611-0", website: "https://www.neunwerk.de", location: "Bornheim", notes: "Geschosswohnungsbau, Bauleitung, Neubau" },

  // === ALFTER ===
  { name: "Architekten Rosiny-Moos", email: "architekten@rosiny-moos.de", phone: "+49 2222 935252", website: "https://www.rosiny-moos.de", location: "Alfter", notes: "Individuelle Planungen, Wohnbauten, Denkmalschutz, ökologisches Bauen" },
  { name: "Hergarten Architekt", email: "post@helmuthergarten.de", phone: "+49 2222 5049", website: "https://www.hergartenarchitekt.de", location: "Alfter", notes: "Wohnbau, Planung und Beratung" },

  // === KÖNIGSWINTER ===
  { name: "Architekturbüro Joachim Beisel", email: "info@beisel-architekten.de", phone: "+49 2223 90690", website: "https://www.beisel-architekten.de", location: "Königswinter", notes: "Wohnungsbau, Gewerbe- und Industriebauten" },
  { name: "Fröde Architektur", email: "info@froede-architektur.de", phone: "+49 2223 2993060", website: "https://www.froede-architektur.de", location: "Königswinter", notes: "Lebensraumgestaltung, Umbau, Neubau" },
  { name: "BASIS | Bureau für Baukunst", email: "office@basis-baukunst.de", phone: "+49 173 5420118", website: "https://www.basis-baukunst.de", location: "Königswinter", notes: "Fokus auf Ästhetik, Funktion und Nachhaltigkeit" },
  { name: "Sandner Architekten", email: "info@sandner-architekten.de", phone: "+49 2223 9009850", website: "https://www.sandner-architekten.de", location: "Königswinter", notes: "Denkmalpflege, Restaurierung, Naturstein-Fachplanung, Projektsteuerung" },

  // === BAD HONNEF ===
  { name: "Architekturbüro Claus Hohendorf", email: "post@architekt-hohendorf.de", phone: "+49 2224 9899634", website: "https://www.architekt-hohendorf.de", location: "Bad Honnef", notes: "Neubau, Sanierung, Umbau und Beratung" },

  // === TROISDORF ===
  { name: "Architekturbüro Kneutgen", email: "info@kneutgen.de", phone: "+49 2241 8843-0", website: "https://www.kneutgen.de", location: "Troisdorf", notes: "Alle Leistungsphasen HOAI, Gutachten, Schall-/Wärmeschutz" },
  { name: "Walter Knipp Architekt", email: "knipp-spich@t-online.de", phone: "+49 2241 401111", website: "https://www.knipp-architekt.de", location: "Troisdorf", notes: "Planung und Bauqualität, seit 1990 tätig" },
  { name: "Architekturbüro Uerdingen GmbH", email: "info@architekt-uerdingen.de", phone: "+49 2241 42025", website: "https://www.architekt-uerdingen.de", location: "Troisdorf", notes: "Vom Einfamilienhaus bis Bürohaus" },

  // === SIEGBURG ===
  { name: "Architektur & Mensch", email: "m.kreidler@architektur-und-mensch.de", phone: "+49 2241 55952", website: "https://www.architektur-und-mensch.de", location: "Siegburg", notes: "Raumkonzept bis Umsetzung, Modernisierung, Sanierung" },
  { name: "PONT Architektur", website: "https://www.pont-architektur.de", location: "Siegburg", notes: "Neubauten, Sanierungsmaßnahmen, Projektsteuerung" },
  { name: "Gregor Mlynarski Architekt", phone: "+49 2241 66748", website: "https://www.architekt-siegburg.de", location: "Siegburg", notes: "Wohnungsbau, Gewerbebau, Umbau, Denkmalpflege" },

  // === SANKT AUGUSTIN ===
  { name: "Gehret Architektur", email: "info@gehret-architektur.de", phone: "+49 2241 9056274", website: "https://www.gehret-architektur.de", location: "Sankt Augustin", notes: "Architektur, Schall-/Wärmeschutz, Energieberatung" },
  { name: "Frings Architekten", phone: "+49 2241 332656", location: "Sankt Augustin", notes: "Innenausbau, Messe- und Ladenbau, barrierefreies Bauen" },

  // === NIEDERKASSEL ===
  { name: "Architekturbüro Lambert Nöbel", phone: "+49 2208 4003", location: "Niederkassel", notes: "Neubau (Büro-, Wohn- und kirchliche Bauten), Sanierung" },

  // === HENNEF ===
  { name: "merten architektur+design", email: "mail@merten-ad.de", phone: "+49 2242 96962-0", website: "https://www.merten-ad.de", location: "Hennef", notes: "Architektur und Design, Neubau, Umbau" },
  { name: "Dittrich Architekten", email: "info@dittrich-architekten.de", phone: "+49 2242 9333678", website: "https://www.dittrich-architekten.de", location: "Hennef", notes: "Wohnbau, Gewerbebau, Neubau und Sanierung" },
  { name: "Volker Rischko Architekt", phone: "+49 2242 905558", website: "https://www.architekt-rischko.de", location: "Hennef", notes: "Wohnbau, Planung und Beratung" },

  // === MECKENHEIM ===
  { name: "Architektur & Ingenieur Büro Baedorf", email: "info@architekt-baedorf.de", phone: "+49 2225 2576", location: "Meckenheim", notes: "Architektur und Ingenieurleistungen, Wohnbau" },
  { name: "Architekturbüro Renate Fahrenberger", email: "info@fahrenberger-rheinland.de", phone: "+49 172 6752723", website: "https://www.fahrenberger-rheinland.de", location: "Meckenheim", notes: "Wohnbau, Planung und Beratung" },

  // === RHEINBACH ===
  { name: "Architekturbüro Mühlenbock", email: "bernd@muehlenbock.de", phone: "+49 2226 889490", website: "https://www.muehlenbock.de", location: "Rheinbach", notes: "Wohnbau, Neubau und Sanierung" },

  // === WACHTBERG ===
  { name: "Schneider & Klose Architekten", email: "info@schneider-klose.de", phone: "+49 228 4447000", website: "https://www.schneider-klose.de", location: "Wachtberg", notes: "Wohnbau, Gewerbebau, Neubau und Sanierung" },
  { name: "NC Architekten Nicolaus-Chatterjee GbR", email: "info@nc-architekten.de", phone: "+49 228 38769284", website: "https://www.nc-architekten.de", location: "Wachtberg", notes: "Wohnbau, Neubau und Sanierung" },

  // === SWISTTAL ===
  { name: "GÖHLER und PARTNER ARCHITEKTEN", email: "architektgoehler@t-online.de", phone: "+49 2226 907604", website: "http://www.architektgoehler.de", location: "Swisttal", notes: "Wohnbau, Gewerbebau, Planung und Beratung" },

  // === LOHMAR ===
  { name: "Bruckner Architekten", email: "ambruckner@t-online.de", phone: "+49 2206 84665", location: "Lohmar", notes: "Wohnbau, Neubau und Sanierung" },
  { name: "Architektur- und Ingenieurbüro Latus", email: "info@architekt-latus.de", phone: "+49 2206 3797", website: "https://www.architekt-latus.de", location: "Lohmar", notes: "Architektur und Ingenieurleistungen, Wohnbau" },

  // === EITORF ===
  { name: "AHRchitektur", email: "info@AHRchitektur.com", phone: "+49 2243 9003317", website: "https://www.ahrchitektur.com", location: "Eitorf", notes: "Wohnbau, Neubau und Sanierung" },
];

export default function ArchitekturClient() {
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("Alle");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("architektur_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites from localStorage", e);
      }
    }
  }, []);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(name);
      const next = isFav ? prev.filter((n) => n !== name) : [...prev, name];
      localStorage.setItem("architektur_favorites", JSON.stringify(next));
      return next;
    });
  };

  const cities = useMemo(() => {
    const allCities = ARCHITEKTUR_DATA.map((d) => d.location);
    return ["Alle", ...Array.from(new Set(allCities))].sort((a, b) => {
      if (a === "Alle") return -1;
      if (b === "Alle") return 1;
      return a.localeCompare(b);
    });
  }, []);

  const filteredData = useMemo(() => {
    const filtered = ARCHITEKTUR_DATA.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.notes.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase());
      const matchesCity = selectedCity === "Alle" || d.location === selectedCity;
      const matchesFav = !showOnlyFavorites || favorites.includes(d.name);
      return matchesSearch && matchesCity && matchesFav;
    });
    return [...filtered].sort((a, b) => {
      const aFav = favorites.includes(a.name);
      const bFav = favorites.includes(b.name);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });
  }, [search, selectedCity, showOnlyFavorites, favorites]);

  return (
    <div className="max-w-6xl mx-auto w-full">
      {/* Back to Homepage */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Zurück zur Übersicht
        </Link>
      </div>

      {/* Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-violet-400 via-pink-400 to-rose-500 bg-clip-text text-transparent">
            Architektur-Verzeichnis Bonn & Rhein-Sieg
          </h1>
          <p className="text-gray-400 mt-2 text-base max-w-2xl">
            Übersicht von {ARCHITEKTUR_DATA.length} Architekturbüros und Planungsbüros im Großraum Bonn und Umgebung.
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-3 justify-center sm:justify-start">
          <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Gefunden</div>
            <div className="text-xl font-bold text-white mt-0.5">{filteredData.length}</div>
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Suche nach Name, Ort, Spezialisierung..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 pl-11 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-colors text-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-white transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Favorites Toggle */}
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
                    ? "bg-violet-600 text-white shadow-md shadow-violet-950/50"
                    : "bg-gray-950 text-gray-400 border border-gray-800 hover:border-gray-700 hover:text-white"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredData.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-2xl text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 text-gray-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <p className="text-lg font-medium">Keine Büros gefunden.</p>
          <p className="text-sm text-gray-600 mt-1">Passen Sie Ihre Suche oder Ihren Stadtfilter an.</p>
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
                    ? "border-rose-500/40 shadow-rose-950/10 bg-gradient-to-b from-gray-900 to-rose-950/10 hover:border-rose-500/80"
                    : "border-gray-800 hover:border-violet-600/70"
                }`}
              >
                <div>
                  {/* Badge Row */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-gray-950 border border-gray-800 text-violet-400">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 mr-1">
                          <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.776 11.776 0 0 0 .758.433 8.682 8.682 0 0 0 .281.14l.018.008.006.003ZM10 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                        </svg>
                        {d.location}
                      </span>
                      {isFav && (
                        <span className="inline-flex items-center text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-950/60 border border-rose-800/60 text-rose-400">
                          ❤️ Favorit
                        </span>
                      )}
                    </div>

                    {/* Heart button */}
                    <button
                      onClick={() => toggleFavorite(d.name)}
                      className={`p-1.5 rounded-lg border transition-all duration-200 active:scale-95 ${
                        isFav
                          ? "bg-rose-950/40 border-rose-500/40 text-rose-500 hover:bg-rose-900/40"
                          : "bg-gray-950 border-gray-800 text-gray-500 hover:text-rose-500 hover:border-gray-700"
                      }`}
                      aria-label="Favorisieren"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-1.9c-.04-.033-.08-.066-.12-.1-.847-.688-2.537-2.09-2.537-4.223 0-1.89 1.488-3.5 3.5-3.5 1.486 0 2.413.805 2.766 1.258.353-.453 1.28-1.258 2.766-1.258 2.012 0 3.5 1.61 3.5 3.5 0 2.133-1.69 3.535-2.537 4.223-.04.034-.08.067-.12.1a22.09 22.09 0 01-2.582 1.9 20.738 20.738 0 01-1.162.682l-.019.01-.005.003h-.002z" />
                      </svg>
                    </button>
                  </div>

                  {/* Name */}
                  <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors line-clamp-1">
                    {d.name}
                  </h3>

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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                      </svg>
                      E-Mail
                    </a>
                  ) : d.phone ? (
                    <a
                      href={`tel:${d.phone}`}
                      className="flex-1 bg-gray-950 hover:bg-emerald-950/40 border border-gray-800 hover:border-emerald-800 text-emerald-400 hover:text-emerald-300 transition-all text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.187-4.165-7-7l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
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
                      className="flex-1 bg-violet-900/40 hover:bg-violet-600/80 border border-violet-800 hover:border-violet-500 text-violet-300 hover:text-white transition-all text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.004 9.004 0 0 1 8.716 2.253M12 3a9.004 9.004 0 0 0-8.716 2.253" />
                      </svg>
                      Website
                    </a>
                  ) : (
                    <span className="flex-1 bg-gray-950/40 border border-gray-900/60 text-gray-500 text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 cursor-not-allowed select-none">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
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
