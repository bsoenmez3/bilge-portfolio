'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Linkedin, Github, Rocket, ChevronDown, Binary, Mail, 
  CheckCircle2, ExternalLink, Monitor, Shield, Zap, 
  Sword, BookOpen, Layers, X, Plane, Leaf, Heart, 
  Music, Camera, Youtube, Circle, Database, Network
} from 'lucide-react';

// --- TYPES ---
interface Project {
  id: string;
  title: string;
  tech: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  link: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  tech: string;
  tasks: string[];
}

// --- DATA CONFIGURATION ---
const content = {
  en: {
    name: "Bilge Sönmez",
    sub: "B.Sc. Informatik Graduate from KIT (April 2026). Specializing in Backend Architectures and Clean Code.",
    thesis: "Bachelor's Thesis: Quantitative Trustworthiness Analysis of Autonomous Systems",
    eduTitle: "Academic Foundation",
    githubTitle: "Engineering Labs",
    expTitle: "Professional Journey",
    footer: "© 2026 Bilge Sönmez — Karlsruhe",
    cta: "Let's Work Together!",
    swipeText: "Swipe & Click for details",
    viewDetails: "View Details",
    viewRepo: "View Repository",
    highlightsTitle: "Key Engineering Highlights",
    
    kitName: "Karlsruhe Institute of Technology (KIT)",
    kabatasName: "Kabataş Erkek High School",
    
    klausurHighlight: "Project Highlight",
    kaDesc: "An enterprise-grade examination management system built at KIT. Focused on bridging the gap between digital question management and physical exam production through automated LaTeX workflows.",
    kaF1Title: "Automated LaTeX",
    kaF1Desc: "Dynamic PDF generation from question pools with complex mathematical formulas.",
    kaF2Title: "Role Management",
    kaF2Desc: "Granular access control using Shibboleth Identity Provider for academic security.",
    kaF3Title: "ORM Architecture",
    kaF3Desc: "High-performance data persistence layer using Java JPA and PostgreSQL.",
    kaF4Title: "Quality Assurance",
    kaF4Desc: "Systematic testing covering unit, integration, and UI levels (SUS analysis).",
    kaTechTitle: "Technical Lifecycle",
    kaMetric1: "Backend Reliability",
    kaMetric2: "Code Coverage",
    kaMetric3: "Test Scenarios",
    kaMetric4: "Persistence",
    kaGalleryTitle: "System Interfaces",
    kaGalleryHint: "Hover to expand gallery",

    // --- THESIS ARCHITECTURE SECTION ---
    thesisSectionHighlight: "Bachelor's Thesis",
    thesisSectionTitle: "Autonomous Systems Hybrid Fusion Framework",
    thesisSectionDesc: "A novel hybrid fusion framework integrating probabilistic Vehicle-to-Infrastructure (V2I) data with evidential on-board sensors. Built to safely resolve conflict and quantify epistemic uncertainty in autonomous perception using Dempster-Shafer Theory.",
    thesisF1Title: "Evidence-Core Expansion",
    thesisF1Desc: "Extended an open-source Java library to handle complex evidential reasoning and dynamic Basic Belief Assignments (BBA).",
    thesisF2Title: "Epistemic Uncertainty",
    thesisF2Desc: "Explicitly modeling the mathematical difference between pure ignorance and conflicting ambiguity.",
    thesisF3Title: "Yager's Combination",
    thesisF3Desc: "Implemented safe evidence fusion to strictly prevent overconfidence in high-conflict traffic scenarios.",
    thesisF4Title: "OvR to BBA Conversion",
    thesisF4Desc: "Engineered modular converters transforming uncalibrated Machine Learning (One-vs-Rest) scores into reliable evidence.",

    volunteeringTitle: "Community & Impact",
    volunteering: [
      { org: "Best Buddies International", role: "School Program Coordinator & Captain", period: "2016 – 2018", desc: "Led a team of 50 volunteers as Turkey chapter captain. Advocated for people with autism and Down syndrome.", tag: "Social Inclusion" },
      { org: "Istanbul Youth Platform", role: "Volunteer & Small Hands Big Dreams", period: "2017 – 2018", desc: "Expanded the vision of students from socio-economically disadvantaged neighborhoods through workshops and mentoring.", tag: "Youth Leadership" },
      { org: "Steptember NL", role: "Coordinator of Volunteers", period: "Sep 2017", desc: "Coordinated volunteers for a global 28-day challenge raising funds to support people living with cerebral palsy.", tag: "Health" },
      { org: "Dreams Academy", role: "Student Volunteer", period: "2016 – 2018", desc: "Spent meaningful time with children with intellectual disabilities, supporting their integration through art and education.", tag: "Education" },
    ],

    hobbiesTitle: "Beyond the Code",
    hobbiesSub: "The human behind the engineer.",
    hobbies: [
      { icon: <Plane size={20} />, name: "Travelling", desc: "Collecting new perspectives one city at a time." },
      { icon: <Leaf size={20} />, name: "Yoga & Meditation", desc: "Stillness as a counterbalance to complex systems." },
      { icon: <Heart size={20} />, name: "Dancing", desc: "Movement as a form of creative expression." },
      { icon: <Music size={20} />, name: "Piano & Guitar", desc: "Two instruments, one language." },
      { icon: <Camera size={20} />, name: "Photography", desc: "Framing the world through a different lens." },
      { icon: <Youtube size={20} />, name: "Educational YouTube", desc: "Creating videos that make learning accessible." },
    ],
    
    kitDesc: "Focused on Autonomous Systems, Safety, and Software Engineering.",
    kitExtras: "Supplementary subjects in Business Administration (BWL): Management and Marketing, Consumer Behavior, Finance and Accounting.",
    kabatasDesc: "Graduated top 0.03% nationally. Developed foundation in leadership and analytical thinking.",
    languagesTitle: "Communication Stack",
    languages: [
      { name: "Turkish", level: "Native", info: "Mother tongue, cultural root.", color: "from-red-500 to-orange-500", dots: 5 },
      { name: "German", level: "B2 - C1 Proficiency", info: "Academic & business fluency.", color: "from-amber-400 to-yellow-600", dots: 4 },
      { name: "English", level: "B2 - C1 Proficiency", info: "Global tech standard.", color: "from-blue-500 to-indigo-600", dots: 4 },
      { name: "Spanish", level: "Elementary", info: "Learning to sing in Spanish :)", color: "from-emerald-400 to-teal-500", dots: 1 }
    ],
    
    experiences: [
      { 
        company: "Fraunhofer IOSB", 
        role: "Student Assistant", 
        period: "Jan 2026 – Present", 
        tech: "Python · Django · Docker · REST APIs",
        tasks: [
          "Backend development for a Deep Learning tool", 
          "Video-Based Safety and Assistance Systems", 
          "Data processing and RESTful API architecture"
        ] 
      },
      { 
        company: "1&1 Mail & Media", 
        role: "Working Student", 
        period: "Jul 2022 – Sep 2025", 
        tech: "Java · SonarQube · CI/CD · Jira · Automation",
        tasks: [
          "Collaborated with senior engineers & testers in Agile teams (Daily Stand-ups, Retrospectives)", 
          "Implemented security requirements and resolved SonarQube code quality issues", 
          "Managed CI/CD pipeline adjustments, endpoint migrations, and automated test coverage"
        ] 
      },
      { 
        company: "TECO Research Group · KIT", 
        role: "Software Developer Intern", 
        period: "May 2023 – Sep 2023", 
        tech: "Java · TypeScript · Python · LaTeX",
        tasks: [
          "Developed 'KlausurAutomator' to automate and simplify digital exam creation", 
          "Collaborated in a team of 5 to streamline teacher workloads and increase productivity", 
          "Full-stack development and LaTeX workflow automation"
        ] 
      }
    ],
    projects: [
      { 
        id: "runa", title: "Monster Hunter: Runa’s Strive", tech: "Java / OOP / CLI", 
        shortDesc: "A strategic turn-based RPG with complex deck management and class-based combat.",
        fullDesc: "Developed as an intensive 1-week project, this turn-based RPG delivers a highly strategic gameplay experience through a clean CLI.",
        highlights: ["Class Diversity: Warrior, Mage, or Paladin decks.", "Strategic Heal: Discard cards to recover health.", "Modular Design: Clean separation of game logic and UI."],
        link: "https://github.com/bsoenmez3/RunasStriveRPG" 
      },
      { 
        id: "scholar", title: "Scholar Management System", tech: "Java / Clean Code", 
        shortDesc: "Advanced academic system utilizing Inheritance, Polymorphism, and SRP.",
        fullDesc: "A robust OOP management tool that calculates researcher g-index, analyzes article similarity via Jaccard index, and formats bibliographies (APA/ACM).",
        highlights: ["Deep Inheritance: Structured hierarchy for Publications and Venues.", "Single Responsibility: Formatting decoupled from data models.", "Data Integrity: Regex-based validation for metadata."],
        link: "https://github.com/bsoenmez3/ScholarSystem" 
      },
      { 
        id: "trust", title: "Autonomous Systems Hybrid Fusion Framework", tech: "Java / Evidence-Core / Math", 
        shortDesc: "Reliability framework for autonomous systems using Java and Dempster-Shafer Theory.",
        fullDesc: "Based on my Bachelor's thesis, this project expands the open-source Java library 'evidence-core' to evaluate the trustworthiness of autonomous systems. It introduces a hybrid fusion framework using Dempster-Shafer Theory (DST) to integrate probabilistic Vehicle-to-Infrastructure (V2I) data with evidential on-board sensor data. The system safely handles conflicting and ambiguous evidence using Yager's combination rule.",
        highlights: [
          "Evidence-Core Expansion: Extended a Java library for evidential reasoning.", 
          "DST & Yager's Rule: Modeled epistemic uncertainty and ambiguity, avoiding overconfidence in conflicting scenarios.", 
          "Hybrid Sensor Fusion: Developed modular converters to transform probabilistic inputs and machine learning One-vs-Rest (OvR) scores into Basic Belief Assignments (BBAs)."
        ]
      },
      { 
       id: "producer-consumer", 
       title: "Multi-threaded Producer-Consumer Simulation", 
       tech: "Java / Concurrency", 
       shortDesc: "A multi-threaded Java simulation demonstrating thread synchronization and shared resource management.",
       fullDesc: "This project simulates the classic Producer-Consumer synchronization problem using multi-threading. It demonstrates how to handle shared resources in a concurrent environment, utilizing intrinsic locks and inter-thread communication mechanisms like wait() and notifyAll(). The system ensures thread-safe operations as producers generate data into a shared buffer and consumers concurrently remove it for processing.",
       highlights: [
       "Thread Synchronization: Leveraged wait() and notifyAll() for effective inter-thread communication and state management.", 
       "Shared Resource Control: Built a robust, thread-safe Buffer to manage concurrent data access without race conditions.", 
       "Concurrency Architecture: Structured application flow with dedicated Producer and Consumer threads managed via a central application runner."
       ],
       link: "https://github.com/bsoenmez3/ProducerConsumerProblem" 
      },
      { 
        id: "haskell", title: "Mini Projects in Haskell", tech: "Haskell / Functional", 
        shortDesc: "A collection of mini-projects exploring the functional programming paradigm.",
        fullDesc: "Developed to explore and master functional programming paradigms using Haskell. Focuses on immutability, pure functions, and strong type systems to solve algorithmic challenges.",
        highlights: [
          "Pure Functions: Implementing complex logic without side effects.", 
          "Recursion & Higher-Order Functions: Heavy use of map, fold, and filter.", 
          "Custom Data Types: Leveraging Haskell's algebraic data types."
        ],
        link: "https://github.com/bsoenmez3/HaskellProblems" 
      }
    ]
  },
  de: {
    name: "Bilge Sönmez",
    sub: "B.Sc. Informatik Absolventin am KIT (April 2026). Spezialisiert auf Backend-Architekturen und Clean Code.",
    thesis: "Bachelorarbeit: Quantitative Vertrauenswürdigkeitsanalyse autonomer Systeme",
    eduTitle: "Akademischer Hintergrund",
    githubTitle: "Engineering Labs",
    expTitle: "Beruflicher Werdegang",
    footer: "© 2026 Bilge Sönmez — Karlsruhe",
    cta: "Lassen Sie uns zusammenarbeiten!",
    swipeText: "Wischen & Klicken für Details",
    viewDetails: "Details ansehen",
    viewRepo: "Repository ansehen",
    highlightsTitle: "Technische Highlights",
    
    kitName: "Karlsruher Institut für Technologie (KIT)",
    kabatasName: "Kabataş Erkek Gymnasium",

    klausurHighlight: "Projekt-Highlight",
    kaDesc: "Ein hochschulweites Klausur-Management-System, entwickelt am KIT. Konzipiert, um die Lücke zwischen digitaler Fragenverwaltung und physischer Klausurerstellung durch automatisierte LaTeX-Workflows zu schließen.",
    kaF1Title: "Automatisierte LaTeX-Erstellung",
    kaF1Desc: "Dynamische PDF-Generierung aus Fragenpools mit komplexen mathematischen Formeln.",
    kaF2Title: "Rollenmanagement",
    kaF2Desc: "Detaillierte Zugriffskontrolle über den Shibboleth Identity Provider für akademische Sicherheit.",
    kaF3Title: "ORM-Architektur",
    kaF3Desc: "Hochleistungsorientierte Datenpersistenzschicht mit Java JPA und PostgreSQL.",
    kaF4Title: "Qualitätssicherung",
    kaF4Desc: "Systematisches Testing auf Unit-, Integrations- und UI-Ebene (SUS-Analyse).",
    kaTechTitle: "Technischer Lebenszyklus",
    kaMetric1: "Backend-Zuverlässigkeit",
    kaMetric2: "Testabdeckung",
    kaMetric3: "Test-Szenarien",
    kaMetric4: "Persistenz",
    kaGalleryTitle: "System-Schnittstellen",
    kaGalleryHint: "Hovern zum Erweitern der Galerie",

    // --- THESIS ARCHITECTURE SECTION (DE) ---
    thesisSectionHighlight: "Bachelorarbeit",
    thesisSectionTitle: "Autonomous Systems Hybrid Fusion Framework",
    thesisSectionDesc: "Ein neuartiges hybrides Fusions-Framework zur Integration probabilistischer Vehicle-to-Infrastructure (V2I) Daten mit Bordsensoren. Entwickelt zur sicheren Konfliktauflösung und Quantifizierung epistemischer Unsicherheit mithilfe der Dempster-Shafer-Theorie.",
    thesisF1Title: "Evidence-Core Erweiterung",
    thesisF1Desc: "Erweiterung einer Open-Source-Java-Bibliothek für komplexes evidentielles Schließen und dynamische Basic Belief Assignments (BBA).",
    thesisF2Title: "Epistemische Unsicherheit",
    thesisF2Desc: "Explizite mathematische Modellierung des Unterschieds zwischen reinem Unwissen und widersprüchlicher Mehrdeutigkeit.",
    thesisF3Title: "Yagers Kombinationsregel",
    thesisF3Desc: "Sichere Beweisfusion implementiert, um falsche Sicherheit in hochkonfliktären Verkehrsszenarien strikt zu verhindern.",
    thesisF4Title: "OvR zu BBA Konvertierung",
    thesisF4Desc: "Entwicklung modularer Konverter, die unkalibrierte Machine-Learning-Scores in verlässliche Evidenz umwandeln.",

    volunteeringTitle: "Gemeinschaft & Engagement",
    volunteering: [
      { org: "Best Buddies International", role: "Schulprogramm-Koordinatorin & Kapitänin", period: "2016 – 2018", desc: "Leitete ein Team von 50 Freiwilligen. Eingesetzt für Menschen mit Autismus und Down-Syndrom.", tag: "Soziale Inklusion" },
      { org: "Istanbuler Jugendplattform", role: "Freiwillige", period: "2017 – 2018", desc: "Horizont von Schülern aus sozioökonomisch benachteiligten Stadtteilen erweitert.", tag: "Jugendführung" },
      { org: "Steptember NL", role: "Koordinatorin der Freiwilligen", period: "Sep 2017", desc: "Koordinierte Freiwillige für eine globale Challenge zur Unterstützung von Menschen mit Zerebralparese.", tag: "Gesundheit" },
      { org: "Traumakademie", role: "Studentische Freiwillige", period: "2016 – 2018", desc: "Unterstützte die soziale Integration von Kindern mit Behinderungen durch Kunst und Bildung.", tag: "Bildung" },
    ],

    hobbiesTitle: "Jenseits des Codes",
    hobbiesSub: "Der Mensch hinter der Ingenieurin.",
    hobbies: [
      { icon: <Plane size={20} />, name: "Reisen", desc: "Neue Perspektiven, eine Stadt nach der anderen." },
      { icon: <Leaf size={20} />, name: "Yoga & Meditation", desc: "Stille als Gegengewicht zu komplexen Systemen." },
      { icon: <Heart size={20} />, name: "Tanzen", desc: "Bewegung als kreative Ausdrucksform." },
      { icon: <Music size={20} />, name: "Klavier & Gitarre", desc: "Zwei Instrumente, eine Sprache." },
      { icon: <Camera size={20} />, name: "Fotografie", desc: "Die Welt durch eine andere Linse betrachten." },
      { icon: <Youtube size={20} />, name: "YouTube-Bildungskanal", desc: "Videos erstellen, die Lernen zugänglich machen." },
    ],

    kitDesc: "Fokus auf autonome Systeme, Sicherheit und Software Engineering.",
    kitExtras: "Ergänzungsfächer in BWL: Management und Marketing, Konsumentenverhalten, Finanzierung und Rechnungswesen.",
    kabatasDesc: "Abschluss unter den besten 0,03% landesweit. Fundament in Führung und analytischem Denken aufgebaut.",
    languagesTitle: "Sprachkompetenz",
    languages: [
      { name: "Türkisch", level: "Muttersprache", info: "Muttersprache, kulturelle Wurzel.", color: "from-red-500 to-orange-500", dots: 5 },
      { name: "Deutsch", level: "B2 - C1 Niveau", info: "Akademische & geschäftliche Sicherheit.", color: "from-amber-400 to-yellow-600", dots: 4 },
      { name: "Englisch", level: "B2 - C1 Niveau", info: "Globaler Tech-Standard.", color: "from-blue-500 to-indigo-600", dots: 4 },
      { name: "Spanisch", level: "Grundkenntnisse", info: "Lerne gerade auf Spanisch zu singen :)", color: "from-emerald-400 to-teal-500", dots: 1 }
    ],
    
    experiences: [
      { 
        company: "Fraunhofer IOSB", 
        role: "Studentische Hilfskraft (HiWi)", 
        period: "Jan 2026 – Heute", 
        tech: "Python · Django · Docker · REST APIs",
        tasks: [
          "Backend-Entwicklung für ein Deep-Learning-Tool", 
          "Videobasierte Sicherheits- und Assistenzsysteme", 
          "Datenverarbeitung und RESTful API-Architektur"
        ] 
      },
      { 
        company: "1&1 Mail & Media", 
        role: "Werkstudentin", 
        period: "Jul 2022 – Sep 2025", 
        tech: "Java · SonarQube · CI/CD · Jira · Automation",
        tasks: [
          "Zusammenarbeit mit Senior Devs & Testern in agilen Teams (Daily Stand-ups, Retrospectives)", 
          "Umsetzung von Sicherheitsanforderungen & Behebung von SonarQube-Issues", 
          "CI/CD-Pipeline-Anpassungen, Endpoint-Migrationen und automatisierte Tests"
        ] 
      },
      { 
        company: "TECO Research Group · KIT", 
        role: "Software-Praktikantin", 
        period: "Mai 2023 – Sep 2023", 
        tech: "Java · TypeScript · Python · LaTeX",
        tasks: [
          "Entwicklung des 'KlausurAutomators' zur digitalen Prüfungsautomatisierung", 
          "Zusammenarbeit im 5er-Team zur Reduzierung des Lehrkräfte-Workloads", 
          "Full-Stack-Entwicklung & LaTeX-Workflow-Automatisierung"
        ] 
      }
    ],
    projects: [
      { 
        id: "runa", title: "Monster Hunter: Runa’s Strive", tech: "Java / OOP / CLI", 
        shortDesc: "Ein rundenbasiertes RPG mit Deck-Management und klassenbasiertem Kampf.",
        fullDesc: "Entwickelt als 1-wöchiges Intensivprojekt. Spieler navigieren durch Level und verwalten Fähigkeiten strategisch über ein CLI.",
        highlights: ["Klassenvielfalt: Krieger, Magier oder Paladin.", "Strategisches Heilen: Karten abwerfen für HP.", "Modulare Architektur: Saubere Logik-Trennung."],
        link: "https://github.com/bsoenmez3/RunasStriveRPG" 
      },
      { 
        id: "scholar", title: "Scholar Management System", tech: "Java / Clean Code", 
        shortDesc: "Fortschrittliches System, das Vererbung und Polymorphismus nutzt.",
        fullDesc: "Berechnet den g-Index von Forschern, analiziert Artikelähnlichkeit und formatiert Bibliografien (APA/ACM).",
        highlights: ["Vererbung: Strukturierte Hierarchie für Publikationen.", "SRP: Formatierung von Datenmodellen entkoppelt.", "Validierung: Regex-basierte Metadaten-Prüfung."],
        link: "https://github.com/bsoenmez3/ScholarSystem" 
      },
      { 
        id: "trust", 
        title: "Autonomous Systems Hybrid Fusion Framework", 
        tech: "Java / Evidence-Core / Math", 
        shortDesc: "Zuverlässigkeits-Framework für autonome Systeme basierend auf Java und der Dempster-Shafer-Theorie.", 
        fullDesc: "Basierend auf meiner Bachelorarbeit erweitert dieses Projekt die Open-Source-Java-Bibliothek 'evidence-core' zur Bewertung der Vertrauenswürdigkeit autonomer Systeme. Es führt ein hybrides Fusion-Framework ein, das die Dempster-Shafer-Theorie (DST) nutzt, um probabilistische Vehicle-to-Infrastructure (V2I) Daten mit evidenzbasierten On-Board-Sensordaten zu integrieren. Das System bewältigt widersprüchliche und mehrdeutige Evidenzen sicher unter Anwendung der Yager-Kombinationsregel.", 
        highlights: [ 
          "Evidence-Core Erweiterung: Ausbau einer Java-Bibliothek für evidentielles Schließen (Evidential Reasoning).", 
          "DST & Yagers Regel: Modellierung epistemischer Unsicherheit und Ambiguität zur Vermeidung von Overconfidence in Konfliktszenarien.", 
          "Hybride Sensorfusion: Entwicklung modularer Konverter zur Transformation von probabilistischen Eingaben und Machine Learning One-vs-Rest (OvR) Scores in Basic Belief Assignments (BBAs)." 
        ] 
      },
      { 
       id: "producer-consumer", 
        title: "Multi-threaded Producer-Consumer Simulation", 
        tech: "Java / Concurrency", 
        shortDesc: "Eine Multithread-Java-Simulation, die Thread-Synchronisation und die Verwaltung gemeinsamer Ressourcen demonstriert.",
        fullDesc: "Dieses Projekt simuliert das klassische Erzeuger-Verbraucher-Problem (Producer-Consumer) mittels Multithreading. Es zeigt, wie gemeinsame Ressourcen in einer nebenläufigen Umgebung gehandhabt werden, unter Verwendung von intrinsischen Locks und Inter-Thread-Kommunikationsmechanismen wie wait() und notifyAll(). Das System gewährleistet threadsichere Operationen, während Erzeuger (Producers) Daten in einem gemeinsamen Puffer ablegen und Verbraucher (Consumers) diese gleichzeitig zur Verarbeitung entnehmen.",
        highlights: [
          "Thread-Synchronisation: Nutzung von wait() und notifyAll() für eine effektive Inter-Thread-Kommunikation und Zustandsverwaltung.", 
          "Ressourcenkontrolle: Entwicklung eines robusten, threadsicheren Puffers zur Verwaltung von simultanen Datenzugriffen ohne Race Conditions.", 
          "Concurrency-Architektur: Strukturierter Anwendungsablauf mit dedizierten Producer- und Consumer-Threads, gesteuert durch eine zentrale Hauptanwendung."
        ],
        link: "https://github.com/bsoenmez3/ProducerConsumerProblem" 
},
      { 
        id: "haskell", title: "Mini Projects in Haskell", tech: "Haskell / Functional", 
        shortDesc: "Eine Sammlung von Mini-Projekten zur Erkundung des funktionalen Programmierparadigmas.",
        fullDesc: "Entwickelt, um funktionale Programmierparadigmen mit Haskell zu erforschen und zu meistern. Konzentriert sich auf Immutabilität, reine Funktionen und strenge Typsysteme zur Lösung algorithmischer Herausforderungen.",
        highlights: [
          "Reine Funktionen: Implementierung komplexer Logik ohne Seiteneffekte.", 
          "Rekursion & Funktionen höherer Ordnung: Starker Einsatz von map, fold und filter.", 
          "Eigene Datentypen: Nutzung algebraischer Datentypen in Haskell."
        ],
        link: "https://github.com/bsoenmez3/HaskellProblems" 
      }
    ]
  }
};

const projectIcons: Record<string, React.ReactNode> = {
  runa: <Sword size={24} />,
  scholar: <BookOpen size={24} />,
  trust: <Shield size={24} />,
  haskell: <Binary size={24} />,
  "producer-consumer": <Database size={24} /> 
};

const experienceIcons = [<Rocket size={20} />, <Shield size={20} />, <Layers size={20} />];

export default function BilgePortfolio() {
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const t = content[lang];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (activeProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeProject]);

  return (
    <div 
      className="bg-[#F4F7FA] text-[#1A1A1A] selection:bg-indigo-100 overflow-x-hidden relative"
      style={{ fontFamily: "'DM Sans', -apple-system, sans-serif" }}
    >
      {/* YENİ VE DÜZ FONT: Inter eklendi, Space Grotesk kaldırıldı */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif-custom { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; }
        .font-tech { font-family: 'Inter', sans-serif; font-weight: 500; letter-spacing: -0.02em; }
      `}</style>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[100]" style={{ scaleX }} />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#F4F7FA]/70 backdrop-blur-md border-b border-black/5">
        <span className="font-semibold text-lg tracking-tight lowercase">{t.name.replace(' ', '.')}</span>
        <button 
          onClick={() => setLang(lang === 'en' ? 'de' : 'en')} 
          className="text-[10px] font-bold tracking-[0.2em] border border-black/10 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all uppercase"
        >
          {lang}
        </button>
      </nav>

      {/* HERO */}
      <section className="h-screen flex flex-col justify-center items-center px-6 text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
            <img 
              src="/images/profile.jpg" 
              alt={t.name} 
              className="w-full h-full object-cover" 
              onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Bilge+Sonmez&background=6366f1&color=fff'; }} 
            />
          </div>
          <h1 className="text-6xl md:text-[9rem] tracking-tight mb-6 text-[#111] font-tech font-semibold">{t.name}</h1>
          <p className="text-lg md:text-2xl text-black/40 font-light max-w-2xl mx-auto italic leading-relaxed">{t.sub}</p>
        </motion.div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 opacity-20"><ChevronDown size={24} /></motion.div>
      </section>

      {/* EDUCATION */}
      <section className="py-20 relative">
        <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-24 text-center">{t.eduTitle}</h2>
        <WaveSection img="/images/kit.jpg" title={t.kitName} year="2020 — 2026" desc={t.kitDesc} extras={t.kitExtras} />
        <WaveSection img="/images/kabatas.jpg" title={t.kabatasName} year="2015 — 2020" desc={t.kabatasDesc} reverse />
      </section>

      {/* THESIS BANNER */}
      <section className="py-40 px-6 bg-white border-y border-black/5 relative shadow-[0_0_50px_rgba(0,0,0,0.02)]">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center">
            <Zap size={32} className="mx-auto mb-8 text-indigo-600 opacity-40" />
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-8 leading-tight italic font-tech text-[#111]">"{t.thesis}"</h2>
            <div className="h-1 w-20 bg-indigo-600 mx-auto opacity-20"></div>
          </div>
        </Reveal>
      </section>

      {/* EXPERIENCE - PLACED BEFORE PROJECTS */}
      <section className="py-40 bg-[#0A0A0A] text-white relative">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal><h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-40 text-center font-tech">{t.expTitle}</h2></Reveal>
          <div className="relative border-l border-white/10 ml-4 md:ml-20 space-y-40">
            {t.experiences.map((exp: Experience, index: number) => (
              <TimelineItem key={index} {...exp} icon={experienceIcons[index]} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS (GITHUB SLIDER) - PLACED AFTER EXPERIENCE */}
      <section className="py-40 bg-[#F4F7FA] overflow-hidden relative border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-tech text-[#111]">{t.githubTitle}</h2>
          <span className="text-black/20 font-bold text-[10px] uppercase tracking-widest hidden md:block">{t.swipeText}</span>
        </div>
        <motion.div drag="x" dragConstraints={{ left: -1200, right: 0 }} className="flex gap-8 px-6 cursor-grab active:cursor-grabbing pb-10">
          {t.projects.map((project: Project, idx: number) => (
            <motion.div key={idx} className="min-w-[350px] md:min-w-[450px] bg-white border border-black/5 p-12 rounded-[50px] shadow-sm hover:shadow-2xl transition-all group flex flex-col">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                {projectIcons[project.id]}
              </div>
              <h3 className="text-2xl font-medium mb-2 tracking-tight font-tech text-[#111]">{project.title}</h3>
              <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-6">{project.tech}</p>
              <p className="text-black/40 font-light mb-10 h-24 italic leading-relaxed">"{project.shortDesc}"</p>
              <div className="mt-auto">
                <button 
                  onClick={() => setActiveProject(project)} 
                  className="px-6 py-3 bg-[#F4F7FA] border border-black/5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  {t.viewDetails}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* KLAUSURAUTOMATOR - PLACED AFTER PROJECTS */}
      <section className="py-40 bg-white border-b border-black/5 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-indigo-600 font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block italic">
                  {t.klausurHighlight}
                </span>
                <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 uppercase leading-none font-tech text-[#111]">
                  Klausur<br/>Automator
                </h2>
                <p className="text-lg text-black/60 font-light leading-relaxed mb-12 italic">
                  {t.kaDesc}
                </p>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-8 bg-[#F4F7FA] rounded-[32px] border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Binary className="text-indigo-600 mb-4" size={28} />
                  <h4 className="font-bold text-lg mb-2 tracking-tight">{t.kaF1Title}</h4>
                  <p className="text-sm text-black/50 font-light leading-relaxed">{t.kaF1Desc}</p>
                </div>
                <div className="p-8 bg-[#F4F7FA] rounded-[32px] border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Shield className="text-indigo-600 mb-4" size={28} />
                  <h4 className="font-bold text-lg mb-2 tracking-tight">{t.kaF2Title}</h4>
                  <p className="text-sm text-black/50 font-light leading-relaxed">{t.kaF2Desc}</p>
                </div>
                <div className="p-8 bg-[#F4F7FA] rounded-[32px] border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <Layers className="text-indigo-600 mb-4" size={28} />
                  <h4 className="font-bold text-lg mb-2 tracking-tight">{t.kaF3Title}</h4>
                  <p className="text-sm text-black/50 font-light leading-relaxed">{t.kaF3Desc}</p>
                </div>
                <div className="p-8 bg-[#F4F7FA] rounded-[32px] border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CheckCircle2 className="text-indigo-600 mb-4" size={28} />
                  <h4 className="font-bold text-lg mb-2 tracking-tight">{t.kaF4Title}</h4>
                  <p className="text-sm text-black/50 font-light leading-relaxed">{t.kaF4Desc}</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <Reveal>
                <div className="bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20">
                  <Monitor className="absolute -right-8 -top-8 w-48 h-48 opacity-10 rotate-12" />
                  <h3 className="text-2xl font-medium mb-8 tracking-tight font-tech">{t.kaTechTitle}</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest text-indigo-100">
                        <span>{t.kaMetric1}</span>
                        <span>98%</span>
                      </div>
                      <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '98%' }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-white" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest text-indigo-100">
                        <span>{t.kaMetric2}</span>
                        <span>85%</span>
                      </div>
                      <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} className="h-full bg-white" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-3xl font-medium italic font-tech">10+</div>
                      <div className="text-[9px] uppercase opacity-70 tracking-[0.2em] mt-1">{t.kaMetric3}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-medium italic font-tech">JPA</div>
                      <div className="text-[9px] uppercase opacity-70 tracking-[0.2em] mt-1">{t.kaMetric4}</div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal>
                <div className="bg-[#F4F7FA] rounded-[40px] p-10 border border-black/5 group">
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 mb-6 block">{t.kaGalleryTitle}</h4>
                  <div className="flex -space-x-8 hover:space-x-2 transition-all duration-500 ease-out py-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <motion.div 
                        key={num}
                        whileHover={{ scale: 1.2, zIndex: 50, y: -10 }}
                        initial={{ rotate: Math.random() * 10 - 5 }}
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-[3px] border-white shadow-xl flex-shrink-0 cursor-zoom-in transition-transform duration-300 bg-white"
                      >
                        <img 
                          src={`/images/klausur${num}.jpg`} 
                          alt={`Klausurautomator Interface ${num}`} 
                          className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800'; }}
                        />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-xs text-black/30 font-light mt-4 italic">{t.kaGalleryHint}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* THESIS ARCHITECTURE REVEAL SECTION (YIRTILARAK AÇILAN RESİM EFEKTİ) */}
      <ThesisArchitectureSection t={t} />

      {/* VOLUNTEERING */}
      <section className="py-40 bg-white border-y border-black/5 overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-tech text-[#111]">{t.volunteeringTitle}</h2>
            <p className="text-black/40 font-light italic mt-4 text-xl">{t.volunteeringSub}</p>
          </div>
          <span className="text-black/20 font-bold text-[10px] uppercase tracking-widest hidden md:block">{t.swipeText}</span>
        </div>
        <motion.div drag="x" dragConstraints={{ left: -1200, right: 0 }} className="flex gap-6 px-6 cursor-grab active:cursor-grabbing pb-10">
          {t.volunteering.map((v: any, i: number) => (
            <motion.div key={i} className="min-w-[300px] md:min-w-[360px] bg-[#F4F7FA] border border-black/5 p-10 rounded-[40px] shadow-sm hover:shadow-xl hover:bg-white transition-all group flex flex-col">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-indigo-600 mb-4 bg-indigo-50 border border-indigo-100/50 inline-block px-3 py-1.5 rounded-full w-max">
                {v.tag}
              </span>
              <h3 className="text-2xl font-medium mb-2 tracking-tight font-tech text-[#111]">{v.org}</h3>
              <p className="text-black/50 italic text-sm mb-4">{v.role}</p>
              <p className="text-indigo-400 font-bold text-[10px] uppercase tracking-widest mb-6">{v.period}</p>
              <p className="text-black/60 font-light leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* HOBBIES */}
      <section className="py-40 bg-[#F4F7FA] relative">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-4 font-tech text-[#111]">{t.hobbiesTitle}</h2>
                <p className="text-black/40 font-light italic text-xl">{t.hobbiesSub}</p>
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col">
            {t.hobbies.map((h: any, i: number) => (
              <Reveal key={i}>
                <div className="group grid grid-cols-[auto_1fr] md:grid-cols-[auto_1fr_auto] items-center gap-6 md:gap-10 py-8 border-b border-black/5 hover:pl-6 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                    {h.icon}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-medium tracking-tight font-tech text-[#111]">{h.name}</h3>
                  <p className="text-black/50 font-light italic md:text-right max-w-sm leading-relaxed">{h.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LANGUAGES */}
      <section className="py-40 bg-white relative border-y border-black/5 shadow-[0_0_50px_rgba(0,0,0,0.02)]">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6 font-tech text-[#111]">{t.languagesTitle}</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {t.languages.map((langItem: any, i: number) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="relative group p-10 rounded-[40px] bg-[#F4F7FA] border border-black/5 overflow-hidden transition-all hover:shadow-2xl hover:bg-white">
                <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${langItem.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
                <div className="relative z-10">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 block mb-2">{langItem.level}</span>
                  <h3 className="text-3xl font-medium tracking-tight mb-4 font-tech text-[#111]">{langItem.name}</h3>
                  <p className="text-sm text-black/40 font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{langItem.info}</p>
                </div>
                <div className="absolute bottom-10 left-10 flex gap-1">
                  {[1, 2, 3, 4, 5].map((dot) => (
                    <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= langItem.dots ? 'bg-indigo-600' : 'bg-black/5'}`} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-32 text-center bg-[#F4F7FA] relative">
        <Reveal>
          <p className="text-indigo-600 font-bold mb-4 uppercase tracking-[0.3em] text-[10px]">{t.cta}</p>
          <h2 className="text-2xl md:text-5xl font-medium tracking-tight mb-12 italic font-tech text-[#111] hover:text-indigo-600 transition-colors cursor-pointer">
            sonmezbilge@gmail.com
          </h2>
          <div className="flex justify-center gap-10 mb-20 opacity-40 hover:opacity-100 transition-opacity">
            <a href="https://linkedin.com/in/bilge-sonmez/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform text-[#111]"><Linkedin size={28} /></a>
            <a href="https://github.com/bsoenmez3" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition-transform text-[#111]"><Github size={28} /></a>
            <a href="mailto:sonmezbilge@gmail.com" className="hover:scale-125 transition-transform text-[#111]"><Mail size={28} /></a>
          </div>
          <p className="text-[10px] font-bold tracking-[0.6em] text-black/20 uppercase">{t.footer}</p>
        </Reveal>
      </footer>

      {/* MODAL */}
      <AnimatePresence>
        {activeProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 md:p-6" onClick={() => setActiveProject(null)}>
            <motion.div 
              initial={{ y: 50, scale: 0.95 }} 
              animate={{ y: 0, scale: 1 }} 
              exit={{ y: 20, scale: 0.95 }} 
              className="bg-white rounded-[40px] max-w-2xl w-full max-h-[85vh] overflow-y-auto p-10 md:p-14 relative shadow-2xl" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setActiveProject(null)} 
                aria-label="Close modal"
                className="absolute top-8 right-8 w-10 h-10 bg-[#F4F7FA] rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="text-indigo-600 mb-6">{projectIcons[activeProject.id]}</div>
              <h2 className="text-4xl font-medium tracking-tight mb-2 font-tech text-[#111]">{activeProject.title}</h2>
              <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-8">{activeProject.tech}</p>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-10 italic">{activeProject.fullDesc}</p>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-6">{t.highlightsTitle}</h3>
              <ul className="space-y-4 mb-12">
                {activeProject.highlights.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-black/70">
                    <CheckCircle2 size={20} className="shrink-0 text-indigo-500 mt-0.5 opacity-50" />
                    <span className="font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <a 
                href={activeProject.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors w-full md:w-auto justify-center"
              >
                {t.viewRepo} <ExternalLink size={16} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WaveSection({ img, title, year, desc, extras, reverse = false }: any) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  return (
    <div ref={ref} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 px-6 max-w-7xl mx-auto mb-48 relative`}>
      <div className="flex-1 w-full aspect-[16/10] overflow-hidden rounded-[40px] relative border border-black/5 bg-[#F4F7FA] shadow-lg">
        <motion.img 
          style={{ y }} 
          src={img} 
          alt={title}
          className="absolute inset-0 w-full h-[130%] object-cover scale-110" 
        />
      </div>
      <div className="flex-1 space-y-5">
        <span className="text-indigo-600 font-bold text-[10px] tracking-widest uppercase">{year}</span>
        <h3 className="text-4xl md:text-5xl font-medium tracking-tight leading-none font-tech text-[#111]">{title}</h3>
        <p className="text-black/50 font-light italic text-xl leading-relaxed">{desc}</p>
        {extras && (
          <div className="inline-block px-5 py-3 mt-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
            <p className="text-indigo-900/70 font-medium text-sm leading-relaxed flex items-start gap-2">
              <Layers size={16} className="mt-0.5 shrink-0 opacity-50" />{extras}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TimelineItem({ company, role, period, tech, tasks, icon }: any) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative pl-8 md:pl-20 group">
      <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-indigo-600 group-hover:scale-150 transition-transform shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10">{icon}</div>
        <span className="text-indigo-400 font-bold tracking-widest text-[10px] uppercase">{period}</span>
      </div>
      <h3 className="text-4xl md:text-5xl font-medium mb-2 tracking-tight group-hover:text-indigo-400 transition-colors font-tech text-white">{company}</h3>
      <p className="text-xl text-white/50 italic mb-3 font-light">{role}</p>
      <p className="text-indigo-300/80 font-bold text-[10px] uppercase tracking-widest mb-8">{tech}</p>
      <ul className="space-y-4 max-w-2xl">
        {tasks.map((task: string, i: number) => (
          <li key={i} className="flex items-start gap-4 text-white/40 hover:text-white/80 transition-colors duration-300">
            <CheckCircle2 size={18} className="mt-1 shrink-0 text-indigo-500/30" />
            <span className="font-light text-lg">{task}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// -----------------------------------------------------------
// DAHA YAVAŞ, GECİKMELİ VE ZARİF AÇILAN MİMARİ BÖLÜMÜ
// -----------------------------------------------------------
function ThesisArchitectureSection({ t }: { t: any }) {
  const ref = useRef(null);
  
  // Animasyon ekranın %70'inden başlar, tepeye çıkana kadar devam eder.
  const { scrollYProgress: rawProgress } = useScroll({ target: ref, offset: ["start 70%", "end start"] });
  
  // Yavaşça yaylanma efekti.
  const scrollYProgress = useSpring(rawProgress, { stiffness: 60, damping: 20 });
  
  // Resimlerin dışarı doğru açılma değerleri
  const xLeft = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "-100%"]);
  const xRight = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);
  
  // YAZININ GÖRÜNÜRLÜĞÜ GÜNCELLENDİ (opacity 0.15'te başlıyor, resim kaydıkça yazı zaten belirmiş oluyor)
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const textScale = useTransform(scrollYProgress, [0.2, 0.6], [0.95, 1]);

  return (
    <section ref={ref} className="py-40 bg-white border-b border-black/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] flex items-center justify-center mb-20 rounded-[40px]">

          {/* 1. GİZLİ YAZI: En altta duruyor. Resim yarılıp açılınca bu yazı ortaya çıkacak. */}
          <motion.div 
            className="absolute z-0 flex flex-col items-center justify-center text-center max-w-4xl px-6"
            style={{ opacity: textOpacity, scale: textScale }}
          >
            <span className="text-indigo-600 font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block italic">
              {t.thesisSectionHighlight}
            </span>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6 uppercase leading-none font-tech text-[#111]">
              {t.thesisSectionTitle}
            </h2>
            <p className="text-base md:text-lg text-black/60 font-light leading-relaxed italic">
              {t.thesisSectionDesc}
            </p>
          </motion.div>

          {/* 2. RESMİN SOL YARISI */}
          <motion.div 
            className="absolute inset-0 w-full h-full z-10 bg-[#F4F7FA] flex items-center justify-center rounded-[40px] shadow-2xl"
            style={{ 
              clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)', 
              x: xLeft 
            }}
          >
            <img 
              src="/images/architecture.jpg" 
              alt="Autonomous Trust Labs Architecture Left" 
              className="w-full h-full object-cover md:object-contain p-2 md:p-8"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000'; }}
            />
            {/* Ortadaki kesik çizgi gölgesi */}
            <div className="absolute top-0 right-1/2 bottom-0 w-px bg-black/10 shadow-[2px_0_10px_rgba(0,0,0,0.15)]" />
          </motion.div>

          {/* 3. RESMİN SAĞ YARISI */}
          <motion.div 
            className="absolute inset-0 w-full h-full z-10 bg-[#F4F7FA] flex items-center justify-center rounded-[40px] shadow-2xl"
            style={{ 
              clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)', 
              x: xRight 
            }}
          >
            <img 
              src="/images/architecture.jpg" 
              alt="Autonomous Trust Labs Architecture Right" 
              className="w-full h-full object-cover md:object-contain p-2 md:p-8"
              onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000'; }}
            />
            {/* Ortadaki kesik çizgi gölgesi */}
            <div className="absolute top-0 left-1/2 bottom-0 w-px bg-black/10 shadow-[-2px_0_10px_rgba(0,0,0,0.15)]" />
          </motion.div>

        </div>

        {/* Kilit Mimari Özellikler (Alt Kartlar) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <Database size={28} />, title: t.thesisF1Title, desc: t.thesisF1Desc },
            { icon: <Shield size={28} />, title: t.thesisF2Title, desc: t.thesisF2Desc },
            { icon: <Network size={28} />, title: t.thesisF3Title, desc: t.thesisF3Desc },
            { icon: <Binary size={28} />, title: t.thesisF4Title, desc: t.thesisF4Desc },
          ].map((feature, i) => (
            <Reveal key={i}>
              <div className="p-8 bg-[#F4F7FA] rounded-[32px] border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-indigo-600 mb-4">{feature.icon}</div>
                <h4 className="font-bold text-lg mb-2 tracking-tight text-[#111] font-tech">{feature.title}</h4>
                <p className="text-sm text-black/50 font-light leading-relaxed">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function Reveal({ children }: any) {
  return <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>{children}</motion.div>;
}