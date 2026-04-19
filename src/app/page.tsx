'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Linkedin, Github, Rocket, ChevronDown, Binary, Mail,
  CheckCircle, ExternalLink, Monitor, Shield, Zap,
  Sword, BookOpen, Layers, X, Plane, Leaf, Heart,
  Music, Camera, Youtube, Database, Network, Terminal, GitMerge, ZoomIn, ZoomOut
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  tech: string;
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  link?: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  tech: string;
  tasks: string[];
  takeaway: string;
  image?: string; 
}

const PROJECT_ICON_MAP: Record<string, React.ReactNode> = {
  runa: <Sword size={24} />,
  scholar: <BookOpen size={24} />,
  trust: <Shield size={24} />,
  haskell: <Binary size={24} />,
  'producer-consumer': <Database size={24} />,
};

const EXPERIENCE_ICONS: React.ReactNode[] = [
  <Rocket key="r" size={24} />,
  <Shield key="s" size={24} />,
  <Layers key="l" size={24} />,
];

const HOBBY_ICON_MAP: Record<string, React.ReactNode> = {
  Travelling: <Plane size={20} />,
  Reisen: <Plane size={20} />,
  'Yoga & Meditation': <Leaf size={20} />,
  Dancing: <Heart size={20} />,
  Tanzen: <Heart size={20} />,
  'Piano & Guitar': <Music size={20} />,
  'Klavier & Gitarre': <Music size={20} />,
  Photography: <Camera size={20} />,
  Fotografie: <Camera size={20} />,
  'Educational YouTube': <Youtube size={20} />,
  'YouTube-Bildungskanal': <Youtube size={20} />,
};

const content = {
  en: {
    name: 'Bilge Sönmez',
    sub: 'B.Sc. Informatik Graduate from KIT (March 2026).',
    thesis: "Bachelor's Thesis: Quantitative Trustworthiness Analysis of Autonomous Systems",
    eduTitle: 'Academic Foundation',
    githubTitle: 'Technical Projects',
    expTitle: 'Professional Journey',
    footer: '© 2026 Bilge Sönmez — Karlsruhe',
    cta: "Let's Work Together!",
    swipeText: 'Swipe & Click for details',
    viewDetails: 'View Details',
    viewRepo: 'View Repository',
    highlightsTitle: 'Key Engineering Highlights',
    oneAndOneYearsBadge: '+3 Years',
    oneAndOneTeamPhotoAlt: '1&1 team photo',
    oneAndOneTeamPhotoCaption: 'Inside the team that shaped my engineering discipline',

    kitName: 'Karlsruhe Institute of Technology (KIT)',
    kabatasName: 'Kabataş Erkek High School',

    klausurHighlight: 'Project Highlight',
    kaDesc:
      'An enterprise-grade examination management system built at KIT. Focused on bridging the gap between digital question management and physical exam production through automated LaTeX workflows.',
    kaF1Title: 'Automated LaTeX',
    kaF1Desc: 'Dynamic PDF generation from question pools with complex mathematical formulas.',
    kaF2Title: 'Role Management',
    kaF2Desc: 'Granular access control using Shibboleth Identity Provider for academic security.',
    kaF3Title: 'ORM Architecture',
    kaF3Desc: 'High-performance data persistence layer using Java JPA and PostgreSQL.',
    kaF4Title: 'Quality Assurance',
    kaF4Desc: 'Systematic testing covering unit, integration, and UI levels (SUS analysis).',
    kaTechTitle: 'Technical Lifecycle',
    kaMetric1: 'Backend Reliability',
    kaMetric2: 'Code Coverage',
    kaMetric3: 'Test Scenarios',
    kaMetric4: 'Persistence',
    kaGalleryTitle: 'System Interfaces',
    kaGalleryHint: 'Hover to expand gallery',
    kaLinkEyebrow: 'Built During TECO',
    kaLinkTitle: 'Want to see the Klausur Automator project I built at TECO?',
    kaLinkCta: 'Click here to jump to the project showcase',

    thesisSectionHighlight: "Bachelor's Thesis",
    thesisSectionTitle: 'Autonomous Systems Hybrid Fusion Framework',
    thesisSectionDesc:
      'A novel hybrid fusion framework integrating probabilistic Vehicle-to-Infrastructure (V2I) data with evidential on-board sensors. Built to safely resolve conflict and quantify epistemic uncertainty in autonomous perception using Dempster-Shafer Theory.',
    thesisF1Title: 'Evidence-Core Expansion',
    thesisF1Desc: 'Extended an open-source Java library to handle complex evidential reasoning and dynamic Basic Belief Assignments (BBA).',
    thesisF2Title: 'Epistemic Uncertainty',
    thesisF2Desc: 'Explicitly modeling the mathematical difference between pure ignorance and conflicting ambiguity.',
    thesisF3Title: "Yager's Combination",
    thesisF3Desc: 'Implemented safe evidence fusion to strictly prevent overconfidence in high-conflict traffic scenarios.',
    thesisF4Title: 'OvR to BBA Conversion',
    thesisF4Desc: 'Engineered modular converters transforming uncalibrated Machine Learning (One-vs-Rest) scores into reliable evidence.',

    volunteeringTitle: 'Community & Impact',
    volunteeringSub: 'Social responsibility and leadership through volunteering.',
    volunteering: [
      {
        org: 'Best Buddies International',
        role: 'School Program Coordinator & Captain',
        period: '2016 – 2018',
        desc: 'Led a team of 50 volunteers as Turkey chapter captain. Advocated for people with autism and Down syndrome.',
        tag: 'Social Inclusion',
      },
      {
        org: 'Istanbul Youth Platform',
        role: 'Volunteer & Small Hands Big Dreams',
        period: '2017 – 2018',
        desc: 'Expanded the vision of students from socio-economically disadvantaged neighborhoods through workshops and mentoring.',
        tag: 'Youth Leadership',
      },
      {
        org: 'Steptember NL',
        role: 'Coordinator of Volunteers',
        period: 'Sep 2017',
        desc: 'Coordinated volunteers for a global 28-day challenge raising funds to support people living with cerebral palsy.',
        tag: 'Health',
      },
      {
        org: 'Dreams Academy',
        role: 'Student Volunteer',
        period: '2016 – 2018',
        desc: 'Spent meaningful time with children with intellectual disabilities, supporting their integration through art and education.',
        tag: 'Education',
      },
    ],

    hobbiesTitle: 'Beyond the Code',
    hobbiesSub: 'My hobbies:',
    hobbies: [
      { name: 'Travelling' },
      { name: 'Yoga & Meditation' },
      { name: 'Dancing' },
      { name: 'Piano & Guitar' },
      { name: 'Photography' },
      { name: 'Educational YouTube' },
    ],

    kitMasterDegree: 'M.Sc. in Computer Science',
    kitBachelorDegree: 'B.Sc. in Computer Science',
    kitBachelorYear: 'Nov 2020 — March 2026',
    kitBachelorExtras: 'Supplementary subjects in Business Administration (BWL): Management and Marketing, Consumer Behavior, Finance and Accounting.',
    kitMasterYear: 'April 2026 — Present',
    kitMasterDesc: 'Advanced study in Computer Science with specialization in autonomous systems and applied machine learning.',
    kitMasterExtras: "Building on bachelor's foundation with focus on distributed systems, safety-critical software, and AI applications.",
    kabatasDesc: 'Graduated top 0.03% nationally. Developed foundation in leadership and analytical thinking. 1 year German language prep program (2015—2016) before starting at KIT.',
    
    languagesTitle: 'Communication Stack',
    languages: [
      { name: 'Turkish', level: 'Native', info: 'Mother tongue, cultural root.', color: 'from-red-500 to-orange-500', dots: 5 },
      { name: 'German', level: 'B2 - C1 Proficiency', info: 'Academic & business fluency.', color: 'from-amber-400 to-yellow-600', dots: 4 },
      { name: 'English', level: 'B2 - C1 Proficiency', info: 'Global tech standard.', color: 'from-blue-500 to-indigo-600', dots: 4 },
      { name: 'Spanish', level: 'Elementary', info: 'Learning to sing in Spanish :)', color: 'from-emerald-400 to-teal-500', dots: 1 },
    ],

    recommendationTitle: "Executive Endorsement",
    recommendationAuthor: "Matthias Hüller",
    recommendationRole: "Engineering Manager @ 1&1 Mail & Media",
    recommendationQuote: "Bilge combines technical talent with a professional attitude and strong interpersonal skills. She has consistently impressed with her dedication, intelligence, and positive attitude. I have no doubt that she will be a valuable asset to any team fortunate enough to have her.",
    recommendationTabs: [
      { id: "ethic", label: "Work Ethic", content: "Consistent dedication, intelligence, and positive attitude. Exceptional contributions despite part-time work schedule." },
      { id: "skills", label: "Technical Skills", content: "Technical Mastery in Java, Spring ecosystem, GitLab, JIRA, and strict security compliance." },
      { id: "leadership", label: "Leadership", content: "Demonstrated strong leadership potential, suited for Product Owner & Technical Product Manager roles." }
    ],

    experiences: [
      {
        company: 'Fraunhofer IOSB',
        role: 'Full-Stack Developer (Student Assistant)',
        period: 'Jan 2026 – Present',
        tech: 'Python · Django · TypeScript · Docker · REST APIs',
        image: '/images/fraunhofer.jpg',
        tasks: [
          'Contribute to the backend and frontend development of a Deep Learning annotation platform for processing video-based safety data.',
          'Design and implement RESTful APIs and Django-based services that connect annotation workflows, data pipelines, and user-facing interfaces.',
          'Contribute ideas for technical improvements and new platform features to strengthen the system architecture, usability, and long-term maintainability.',
        ],
        takeaway: 'Strengthening my ability to turn research-oriented machine learning workflows into robust, production-ready full-stack systems.',
      },
      {
        company: '1&1 Mail & Media',
        role: 'Agile Software Engineer (Working Student)',
        period: 'Jul 2022 – Sep 2025',
        tech: 'Java · SonarQube · CI/CD · Jira',
        image: '/images/1and1.jpg',
        tasks: [
          'Fortified enterprise systems by resolving complex SonarQube security and code quality vulnerabilities.',
          'Orchestrated CI/CD pipeline adjustments and API endpoint migrations with zero downtime.',
          'Collaborated cross-functionally within Agile sprints (Scrum) to deliver high-impact features alongside senior devs.',
        ],
        takeaway: 'Worked closely within an approximately 10-person team of software engineers and testers, actively participated in recurring team ceremonies, gained a practical understanding of how strong teams operate, internalized Scrum as a working philosophy, and continuously expanded my skills through a wide range of tasks.',
      },
      {
        company: 'TECO Research Group',
        role: 'Full-Stack Developer Intern',
        period: 'May 2023 – Sep 2023',
        tech: 'Java · TypeScript · LaTeX Workflow',
        image: '/images/teco.jpg',
        tasks: [
          'Spearheaded the "KlausurAutomator" project, automating digital exam creation from scratch.',
          'Reduced faculty workload significantly by streamlining complex document generation processes.',
          'Drove full-stack development within a fast-paced 5-person team, taking ownership of critical UI/UX features.',
        ],
        takeaway: 'Developed a strong product mindset by turning a critical administrative bottleneck into a seamless automated solution.',
      },
    ] as Experience[],

    projects: [
      {
        id: 'runa',
        title: "Monster Hunter: Runa's Strive",
        tech: 'Java / OOP / CLI',
        shortDesc: 'A strategic turn-based RPG with complex deck management and class-based combat.',
        fullDesc: 'Developed as an intensive 1-week project, this turn-based RPG delivers a highly strategic gameplay experience through a clean CLI.',
        highlights: ['Class Diversity: Warrior, Mage, or Paladin decks.', 'Strategic Heal: Discard cards to recover health.', 'Modular Design: Clean separation of game logic and UI.'],
        link: 'https://github.com/bsoenmez3/RunasStriveRPG',
      },
      {
        id: 'scholar',
        title: 'Scholar Management System',
        tech: 'Java / Clean Code',
        shortDesc: 'Advanced academic system utilizing Inheritance, Polymorphism, and SRP.',
        fullDesc: 'A robust OOP management tool that calculates researcher g-index, analyzes article similarity via Jaccard index, and formats bibliographies (APA/ACM).',
        highlights: ['Deep Inheritance: Structured hierarchy for Publications and Venues.', 'Single Responsibility: Formatting decoupled from data models.', 'Data Integrity: Regex-based validation for metadata.'],
        link: 'https://github.com/bsoenmez3/ScholarSystem',
      },
      {
        id: 'trust',
        title: 'Autonomous Systems Hybrid Fusion Framework',
        tech: 'Java / Evidence-Core / Math',
        shortDesc: 'Reliability framework for autonomous systems using Java and Dempster-Shafer Theory.',
        fullDesc: "Based on my Bachelor's thesis, this project expands the open-source Java library 'evidence-core' to evaluate the trustworthiness of autonomous systems. It introduces a hybrid fusion framework using Dempster-Shafer Theory (DST) to integrate probabilistic Vehicle-to-Infrastructure (V2I) data with evidential on-board sensor data.",
        highlights: ['Evidence-Core Expansion: Extended a Java library for evidential reasoning.', "DST & Yager's Rule: Modeled epistemic uncertainty and ambiguity.", 'Hybrid Sensor Fusion: Developed modular converters.'],
      },
      {
        id: 'producer-consumer',
        title: 'Multi-threaded Producer-Consumer Simulation',
        tech: 'Java / Concurrency',
        shortDesc: 'A multi-threaded Java simulation demonstrating thread synchronization and shared resource management.',
        fullDesc: 'This project simulates the classic Producer-Consumer synchronization problem using multi-threading. It demonstrates how to handle shared resources in a concurrent environment, utilizing intrinsic locks and inter-thread communication mechanisms.',
        highlights: ['Thread Synchronization: Leveraged wait() and notifyAll().', 'Shared Resource Control: Built a robust, thread-safe Buffer without race conditions.', 'Concurrency Architecture: Structured application flow with dedicated Producer and Consumer threads.'],
        link: 'https://github.com/bsoenmez3/ProducerConsumerProblem',
      },
      {
        id: 'haskell',
        title: 'Mini Projects in Haskell',
        tech: 'Haskell / Functional',
        shortDesc: 'A collection of mini-projects exploring the functional programming paradigm.',
        fullDesc: 'Developed to explore and master functional programming paradigms using Haskell. Focuses on immutability, pure functions, and strong type systems to solve algorithmic challenges.',
        highlights: ['Pure Functions: Implementing complex logic without side effects.', 'Recursion & Higher-Order Functions: Heavy use of map, fold, and filter.', 'Custom Data Types: Leveraging Haskells algebraic data types.'],
        link: 'https://github.com/bsoenmez3/HaskellProblems',
      },
    ] as Project[],
  },

  de: {
    name: 'Bilge Sönmez',
    sub: 'B.Sc. Informatik Absolventin am KIT (März 2026).',
    thesis: 'Bachelorarbeit: Quantitative Vertrauenswürdigkeitsanalyse autonomer Systeme',
    eduTitle: 'Akademischer Hintergrund',
    githubTitle: 'Technische Projekte',
    expTitle: 'Beruflicher Werdegang',
    footer: '© 2026 Bilge Sönmez — Karlsruhe',
    cta: 'Lassen Sie uns zusammenarbeiten!',
    swipeText: 'Wischen & Klicken für Details',
    viewDetails: 'Details ansehen',
    viewRepo: 'Repository ansehen',
    highlightsTitle: 'Technische Highlights',
    oneAndOneYearsBadge: '+3 Jahre',
    oneAndOneTeamPhotoAlt: '1&1 Teamfoto',
    oneAndOneTeamPhotoCaption: 'Einblick in das Team, das meine Engineering-Disziplin geprägt hat',

    kitName: 'Karlsruher Institut für Technologie (KIT)',
    kabatasName: 'Kabataş Erkek Gymnasium',

    klausurHighlight: 'Projekt-Highlight',
    kaDesc: 'Ein hochschulweites Klausur-Management-System, entwickelt am KIT. Konzipiert, um die Lücke zwischen digitaler Fragenverwaltung und physischer Klausurerstellung durch automatisierte LaTeX-Workflows zu schließen.',
    kaF1Title: 'Automatisierte LaTeX-Erstellung',
    kaF1Desc: 'Dynamische PDF-Generierung aus Fragenpools mit komplexen mathematischen Formeln.',
    kaF2Title: 'Rollenmanagement',
    kaF2Desc: 'Detaillierte Zugriffskontrolle über den Shibboleth Identity Provider für akademische Sicherheit.',
    kaF3Title: 'ORM-Architektur',
    kaF3Desc: 'Hochleistungsorientierte Datenpersistenzschicht mit Java JPA und PostgreSQL.',
    kaF4Title: 'Qualitätssicherung',
    kaF4Desc: 'Systematisches Testing auf Unit-, Integrations- und UI-Ebene (SUS-Analyse).',
    kaTechTitle: 'Technischer Lebenszyklus',
    kaMetric1: 'Backend-Zuverlässigkeit',
    kaMetric2: 'Testabdeckung',
    kaMetric3: 'Test-Szenarien',
    kaMetric4: 'Persistenz',
    kaGalleryTitle: 'System-Schnittstellen',
    kaGalleryHint: 'Hovern zum Erweitern der Galerie',
    kaLinkEyebrow: 'Entstanden bei TECO',
    kaLinkTitle: 'Möchten Sie das Klausur-Automator-Projekt sehen, das ich bei TECO entwickelt habe?',
    kaLinkCta: 'Hier klicken, um direkt zur Projektvorstellung zu springen',

    thesisSectionHighlight: 'Bachelorarbeit',
    thesisSectionTitle: 'Autonomous Systems Hybrid Fusion Framework',
    thesisSectionDesc: 'Ein neuartiges hybrides Fusions-Framework zur Integration probabilistischer Vehicle-to-Infrastructure (V2I) Daten mit Bordsensoren. Entwickelt zur sicheren Konfliktauflösung und Quantifizierung epistemischer Unsicherheit mithilfe der Dempster-Shafer-Theorie.',
    thesisF1Title: 'Evidence-Core Erweiterung',
    thesisF1Desc: 'Erweiterung einer Open-Source-Java-Bibliothek für komplexes evidentielles Schließen und dynamische Basic Belief Assignments (BBA).',
    thesisF2Title: 'Epistemische Unsicherheit',
    thesisF2Desc: 'Explizite mathematische Modellierung des Unterschieds zwischen reinem Unwissen und widersprüchlicher Mehrdeutigkeit.',
    thesisF3Title: 'Yagers Kombinationsregel',
    thesisF3Desc: 'Sichere Beweisfusion implementiert, um falsche Sicherheit in hochkonfliktären Verkehrsszenarien strikt zu verhindern.',
    thesisF4Title: 'OvR zu BBA Konvertierung',
    thesisF4Desc: 'Entwicklung modularer Konverter, die unkalibrierte Machine-Learning-Scores in verlässliche Evidenz umwandeln.',

    volunteeringTitle: 'Gemeinschaft & Engagement',
    volunteeringSub: 'Soziale Verantwortung und Führung durch ehrenamtliches Engagement.',
    volunteering: [
      {
        org: 'Best Buddies International',
        role: 'Schulprogramm-Koordinatorin & Kapitänin',
        period: '2016 – 2018',
        desc: 'Leitete ein Team von 50 Freiwilligen. Eingesetzt für Menschen mit Autismus und Down-Syndrom.',
        tag: 'Soziale Inklusion',
      },
      {
        org: 'Istanbuler Jugendplattform',
        role: 'Freiwillige',
        period: '2017 – 2018',
        desc: 'Horizont von Schülern aus sozioökonomisch benachteiligten Stadtteilen erweitert.',
        tag: 'Jugendführung',
      },
      {
        org: 'Steptember NL',
        role: 'Koordinatorin der Freiwilligen',
        period: 'Sep 2017',
        desc: 'Koordinierte Freiwillige für eine globale Challenge zur Unterstützung von Menschen mit Zerebralparese.',
        tag: 'Gesundheit',
      },
      {
        org: 'Traumakademie',
        role: 'Studentische Freiwillige',
        period: '2016 – 2018',
        desc: 'Unterstützte die soziale Integration von Kindern mit Behinderungen durch Kunst und Bildung.',
        tag: 'Bildung',
      },
    ],

    hobbiesTitle: 'Jenseits des Codes',
    hobbiesSub: 'Meine Hobbies:',
    hobbies: [
      { name: 'Reisen' },
      { name: 'Yoga & Meditation' },
      { name: 'Tanzen' },
      { name: 'Klavier & Gitarre' },
      { name: 'Fotografie' },
      { name: 'YouTube-Bildungskanal' },
    ],

    kitMasterDegree: 'M.Sc. in Informatik',
    kitBachelorDegree: 'B.Sc. in Informatik',
    kitBachelorYear: '2020 — 2026',
    kitBachelorExtras: 'Ergänzungsfächer in BWL: Management und Marketing, Konsumentenverhalten, Finanzierung und Rechnungswesen.',
    kitMasterYear: 'April 2026 — Heute',
    kitMasterDesc: 'Vertieftes Studium der Informatik mit Spezialisierung auf autonome Systeme und angewandtes Machine Learning.',
    kitMasterExtras: 'Aufbauend auf dem Bachelor-Fundament mit Fokus auf verteilte Systeme, sicherheitskritische Software und KI-Anwendungen.',
    kabatasDesc: 'Abschluss unter den besten 0,03% landesweit. Fundament in Führung und analytischem Denken aufgebaut. 1 Jahr Deutschkurse (2015—2016) vor dem KIT-Studium.',
    
    languagesTitle: 'Sprachkompetenz',
    languages: [
      { name: 'Türkisch', level: 'Muttersprache', info: 'Muttersprache, kulturelle Wurzel.', color: 'from-red-500 to-orange-500', dots: 5 },
      { name: 'Deutsch', level: 'B2 - C1 Niveau', info: 'Akademische & geschäftliche Sicherheit.', color: 'from-amber-400 to-yellow-600', dots: 4 },
      { name: 'Englisch', level: 'B2 - C1 Niveau', info: 'Globaler Tech-Standard.', color: 'from-blue-500 to-indigo-600', dots: 4 },
      { name: 'Spanisch', level: 'Grundkenntnisse', info: 'Lerne gerade auf Spanisch zu singen :)', color: 'from-emerald-400 to-teal-500', dots: 1 },
    ],

    recommendationTitle: "Executive Endorsement",
    recommendationAuthor: "Matthias Hüller",
    recommendationRole: "Engineering Manager @ 1&1 Mail & Media",
    recommendationQuote: "Bilge verbindet technisches Talent mit einer professionellen Haltung und starken zwischenmenschlichen Fähigkeiten. Sie hat mich und mein Team mit ihrer Hingabe, Intelligenz und positiven Einstellung konsistent beeindruckt.",
    recommendationTabs: [
      { id: "ethic", label: "Arbeitsethik", content: "Konsistente Hingabe, Intelligenz und positive Einstellung. Außergewöhnliche Beiträge trotz Teilzeitarbeit." },
      { id: "skills", label: "Fachkompetenz", content: "Technische Meisterschaft in Java, Spring-Ökosystem, GitLab, JIRA und Sicherheitskonformität." },
      { id: "leadership", label: "Führung", content: "Zeigte starkes Führungspotenzial, hervorragend geeignet für Product Owner & Technical Product Manager Rollen." }
    ],

    experiences: [
      {
        company: 'Fraunhofer IOSB',
        role: 'Full-Stack Developer (HiWi)',
        period: 'Jan 2026 – Heute',
        tech: 'Python · Django · TypeScript · Docker · REST APIs',
        image: '/images/fraunhofer.jpg',
        tasks: [
          'Mitarbeit an der Backend- und Frontend-Entwicklung einer Deep-Learning-Annotationsplattform zur Verarbeitung videobasierter Sicherheitsdaten.',
          'Konzeption und Implementierung von RESTful APIs sowie Django-basierten Services zur Verbindung von Annotations-Workflows, Datenpipelines und Benutzeroberflächen.',
          'Einbringen technischer Verbesserungsvorschläge und neuer Funktionen, um Architektur, Usability und langfristige Wartbarkeit des Systems gezielt weiterzuentwickeln.',
        ],
        takeaway: 'Ich vertiefe meine Fähigkeit, forschungsnahe Machine-Learning-Workflows in robuste, produktionsreife Full-Stack-Systeme zu überführen.',
      },
      {
        company: '1&1 Mail & Media',
        role: 'Agile Software Engineer (Werkstudentin)',
        period: 'Jul 2022 – Sep 2025',
        tech: 'Java · SonarQube · CI/CD · Jira',
        image: '/images/1and1.jpg',
        tasks: [
          'Stärkung von Enterprise-Systemen durch Behebung komplexer SonarQube-Sicherheits- und Qualitäts-Vulnerabilities.',
          'Anpassung von CI/CD-Pipelines und Migration von API-Endpunkten ohne Ausfallzeiten.',
          'Funktionsübergreifende Zusammenarbeit in agilen Sprints (Scrum) zur Bereitstellung geschäftskritischer Features.',
        ],
        takeaway: 'Aktive Mitarbeit in einem rund 10-köpfigen Team aus Software Engineers und Testern, regelmäßige Beteiligung an teamweiten Meetings, ein unmittelbarer Einblick in die Funktionsweise eines starken Teams, ein tiefes Verständnis der Scrum-Philosophie sowie kontinuierliche Weiterentwicklung durch vielfältige Aufgaben.',
      },
      {
        company: 'TECO Research Group',
        role: 'Full-Stack Developer Praktikantin',
        period: 'Mai 2023 – Sep 2023',
        tech: 'Java · TypeScript · LaTeX Workflow',
        image: '/images/teco.jpg',
        tasks: [
          'Leitung der Entwicklung des "KlausurAutomators" zur Automatisierung digitaler Klausurerstellung von Grund auf.',
          'Signifikante Reduzierung des administrativen Arbeitsaufwands für Lehrkräfte durch Prozessoptimierung.',
          'Full-Stack-Entwicklung in einem agilen 5-köpfigen Team mit Verantwortung für kritische UI-Features.',
        ],
        takeaway: 'Entwicklung eines starken Product-Mindsets durch die Lösung eines echten administrativen Engpasses.',
      },
    ] as Experience[],

    projects: [
      {
        id: 'runa',
        title: "Monster Hunter: Runa's Strive",
        tech: 'Java / OOP / CLI',
        shortDesc: 'Ein rundenbasiertes RPG mit Deck-Management und klassenbasiertem Kampf.',
        fullDesc: 'Entwickelt als 1-wöchiges Intensivprojekt. Spieler navigieren durch Level und verwalten Fähigkeiten strategisch über ein CLI.',
        highlights: ['Klassenvielfalt: Krieger, Magier oder Paladin.', 'Strategisches Heilen: Karten abwerfen für HP.', 'Modulare Architektur: Saubere Logik-Trennung.'],
        link: 'https://github.com/bsoenmez3/RunasStriveRPG',
      },
      {
        id: 'scholar',
        title: 'Scholar Management System',
        tech: 'Java / Clean Code',
        shortDesc: 'Fortschrittliches System, das Vererbung und Polymorphismus nutzt.',
        fullDesc: 'Berechnet den g-Index von Forschern, analiziert Artikelähnlichkeit und formatiert Bibliografien (APA/ACM).',
        highlights: ['Vererbung: Strukturierte Hierarchie für Publikationen.', 'SRP: Formatierung von Datenmodellen entkoppelt.', 'Validierung: Regex-basierte Metadaten-Prüfung.'],
        link: 'https://github.com/bsoenmez3/ScholarSystem',
      },
      {
        id: 'trust',
        title: 'Autonomous Systems Hybrid Fusion Framework',
        tech: 'Java / Evidence-Core / Math',
        shortDesc: 'Zuverlässigkeits-Framework für autonome Systeme basierend auf Java und der Dempster-Shafer-Theorie.',
        fullDesc: "Basierend auf meiner Bachelorarbeit erweitert dieses Projekt die Open-Source-Java-Bibliothek 'evidence-core' zur Bewertung der Vertrauenswürdigkeit autonomer Systeme.",
        highlights: ['Evidence-Core Erweiterung: Ausbau einer Java-Bibliothek für evidentielles Schließen.', 'DST & Yagers Regel: Modellierung epistemischer Unsicherheit zur Vermeidung von Overconfidence.', 'Hybride Sensorfusion: Modulare Konverter für OvR-Scores zu Basic Belief Assignments.'],
      },
      {
        id: 'producer-consumer',
        title: 'Multi-threaded Producer-Consumer Simulation',
        tech: 'Java / Concurrency',
        shortDesc: 'Eine Multithread-Java-Simulation, die Thread-Synchronisation demonstriert.',
        fullDesc: 'Dieses Projekt simuliert das klassische Erzeuger-Verbraucher-Problem mittels Multithreading. Es zeigt, wie gemeinsame Ressourcen in einer nebenläufigen Umgebung gehandhabt werden.',
        highlights: ['Thread-Synchronisation: Nutzung von wait() und notifyAll() für Inter-Thread-Kommunikation.', 'Ressourcenkontrolle: Threadsicherer Puffer ohne Race Conditions.', 'Concurrency-Architektur: Dedizierte Producer- und Consumer-Threads.'],
        link: 'https://github.com/bsoenmez3/ProducerConsumerProblem',
      },
      {
        id: 'haskell',
        title: 'Mini Projects in Haskell',
        tech: 'Haskell / Functional',
        shortDesc: 'Eine Sammlung von Mini-Projekten zur Erkundung des funktionalen Programmierparadigmas.',
        fullDesc: 'Entwickelt, um funktionale Programmierparadigmen mit Haskell zu erforschen. Konzentriert sich auf Immutabilität, reine Funktionen und strenge Typsysteme.',
        highlights: ['Reine Funktionen: Implementierung komplexer Logik ohne Seiteneffekte.', 'Rekursion & Funktionen höherer Ordnung: Starker Einsatz von map, fold und filter.', 'Eigene Datentypen: Nutzung algebraischer Datentypen in Haskell.'],
        link: 'https://github.com/bsoenmez3/HaskellProblems',
      },
    ] as Project[],
  },
};

export default function BilgePortfolio() {
  const [lang, setLang] = useState<'en' | 'de'>('en');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentSection, setCurrentSection] = useState('HOME');
  const [time, setTime] = useState<string>(''); 
  
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeVolunteerIndex, setActiveVolunteerIndex] = useState(0);
  const [activeRecTab, setActiveRecTab] = useState(0);

  const t = content[lang];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeProject) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [activeProject]);

  useEffect(() => {
    const handleScroll = () => {
      const ids = ['education', 'experience', 'projects', 'recommendation', 'volunteering', 'languages'];
      let activeId = 'HOME';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight / 2) {
          activeId = id.toUpperCase();
        }
      }
      if (window.scrollY < 100) activeId = 'HOME';
      setCurrentSection(activeId);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="portfolio-page bg-[#F4F7FA] text-[#1A1A1A] selection:bg-indigo-100 overflow-x-hidden relative"
    >
      <div className="fixed bottom-6 left-6 z-[60] hidden lg:block pointer-events-none">
        <div className="bg-black/90 backdrop-blur-md text-[#00FF41] font-mono text-[10px] p-4 rounded-xl border border-white/10 shadow-2xl w-64">
          <div className="flex gap-1.5 mb-3">
            <div className="w-2 h-2 rounded-full bg-red-500/40" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
            <div className="w-2 h-2 rounded-full bg-green-500/40" />
          </div>
          <div className="space-y-1">
            <p className="opacity-40">[{time || '...'}]</p>
            <p className="text-indigo-400 font-bold animate-pulse">&gt; {currentSection}</p>
            <p className="text-white/40">&gt; LANG: {lang.toUpperCase()}</p>
            <p className="text-white/20 truncate">&gt; KIT_KARLSRUHE_CONNECTED</p>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif-custom { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; }
        .font-tech { font-family: 'Inter', sans-serif; font-weight: 500; letter-spacing: -0.02em; }
      `}</style>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[100]" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-[#F4F7FA]/70 backdrop-blur-md border-b border-black/5">
        <span className="font-semibold text-lg tracking-tight lowercase">{t.name.replace(' ', '.')}</span>
        <button
          onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
          className="text-[10px] font-bold tracking-[0.2em] border border-black/10 px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all uppercase"
        >
          {lang}
        </button>
      </nav>

      <section className="h-screen flex flex-col justify-center items-center px-6 text-center relative">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
            <img
              src="/images/profile.jpg"
              alt={t.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://ui-avatars.com/api/?name=Bilge+Sonmez&background=6366f1&color=fff';
              }}
            />
          </div>
          <h1 className="text-6xl md:text-[9rem] tracking-tight mb-6 text-[#111] font-tech font-semibold">{t.name}</h1>
          <p className="text-lg md:text-2xl text-black/40 font-light max-w-2xl mx-auto italic leading-relaxed">{t.sub}</p>
        </motion.div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 opacity-20">
          <ChevronDown size={24} />
        </motion.div>
      </section>

      <section id="education" className="py-20 relative">
        <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40 mb-24 text-center">{t.eduTitle}</h2>
        <WaveSection
          img="/images/kit.jpg"
          title={t.kitName}
          desc={
            <>
              <div className="font-semibold">{t.kitMasterDegree}</div>
              <div className="text-xs text-indigo-600 font-mono tracking-[0.2em] uppercase">{t.kitMasterYear}</div>
              <div className="font-semibold mt-4">{t.kitBachelorDegree}</div>
              <div className="text-xs text-indigo-600 font-mono tracking-[0.2em] uppercase">{t.kitBachelorYear}</div>
            </>
          }
          extras={[t.kitMasterExtras, t.kitBachelorExtras]}
        />
        <WaveSection img="/images/kabatas.jpg" title={t.kabatasName} year="2015 — 2020" desc={t.kabatasDesc} />
      </section>

      <section id="experience" className="py-32 bg-white relative border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 font-tech text-[#111]">{t.expTitle}</h2>
            </div>
          </Reveal>

          <div className="relative">
            <div className="hidden lg:block absolute top-[40px] left-[16%] right-[16%] h-[2px] border-t-2 border-dashed border-indigo-200 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10">
              {t.experiences.map((exp: Experience, index: number) => (
                <Reveal key={index}>
                  <div className="relative group flex flex-col items-center lg:items-start">
                    <div className="w-20 h-20 bg-white border-[4px] border-[#F4F7FA] rounded-full flex items-center justify-center shadow-xl mb-8 relative z-10 group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-300 overflow-hidden">
                      {exp.image ? (
                        <img 
                          src={exp.image} 
                          alt={`${exp.company} logo`} 
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement?.insertAdjacentHTML('beforeend', '');
                          }}
                        />
                      ) : (
                        <div className="text-indigo-600">
                          {EXPERIENCE_ICONS[index]}
                        </div>
                      )}
                    </div>

                    <div className="bg-[#F4F7FA] border border-black/5 rounded-[32px] p-8 w-full text-left hover:bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                      <span className="text-indigo-600 font-mono tracking-[0.2em] text-[10px] uppercase block mb-3">{exp.period}</span>
                      <h3 className="text-2xl font-bold tracking-tight mb-1 text-[#111] font-tech leading-tight">{exp.company}</h3>
                      <p className="text-black/50 italic mb-4 font-medium">{exp.role}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {exp.tech.split('·').map((t, i) => (
                          <span key={i} className="px-3 py-1 bg-white border border-black/5 text-[9px] font-bold uppercase tracking-widest text-indigo-900/60 rounded-full">
                            {t.trim()}
                          </span>
                        ))}
                      </div>

                      {exp.company === '1&1 Mail & Media' && (
                        <div className="mb-8 space-y-5">
                          <div className="relative overflow-hidden rounded-[28px] border border-amber-200 bg-gradient-to-r from-amber-100 via-orange-50 to-white px-6 py-5 shadow-lg shadow-amber-100/60">
                            <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-amber-300/30 blur-2xl" />
                            <p className="text-3xl md:text-4xl font-semibold tracking-tight font-tech text-[#111]">{t.oneAndOneYearsBadge}</p>
                            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-amber-700">1&amp;1 Mail &amp; Media</p>
                          </div>

                          <div className="overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-lg shadow-black/5">
                            <img
                              src="/images/team.jpg"
                              alt={t.oneAndOneTeamPhotoAlt}
                              className="block h-48 w-full object-cover object-center"
                              loading="eager"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="border-t border-black/5 px-5 py-4 bg-[#FCFCFD]">
                              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/35">1&amp;1 Team</p>
                              <p className="mt-2 text-sm font-medium text-black/60">{t.oneAndOneTeamPhotoCaption}</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <ul className="space-y-3 mb-8 flex-1">
                        {exp.tasks.map((task: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-black/60 hover:text-black/90 transition-colors text-sm">
                            <CheckCircle size={16} className="mt-0.5 shrink-0 text-indigo-400" />
                            <span className="font-light leading-relaxed">{task}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.company === 'TECO Research Group' && (
                        <a
                          href="#klausur-automator"
                          className="group/cta relative mb-8 block overflow-hidden rounded-[28px] border border-indigo-200 bg-gradient-to-br from-indigo-600 via-indigo-500 to-cyan-500 p-6 text-white shadow-xl shadow-indigo-600/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-600/25"
                        >
                          <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-white/10 blur-2xl" />
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-100">{t.kaLinkEyebrow}</p>
                          <p className="max-w-xs text-lg font-semibold leading-snug tracking-tight font-tech">{t.kaLinkTitle}</p>
                          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 group-hover/cta:bg-white group-hover/cta:text-indigo-600">
                            <span>{t.kaLinkCta}</span>
                            <ExternalLink size={14} />
                          </div>
                        </a>
                      )}

                      <div className="mt-auto bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">Key Takeaway</p>
                        <p className="text-indigo-900/80 font-medium italic text-sm leading-relaxed">"{exp.takeaway}"</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="klausur-automator" className="py-40 bg-white border-b border-black/5 relative scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-indigo-600 font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block italic">{t.klausurHighlight}</span>
                <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 uppercase leading-none font-tech text-[#111]">
                  Klausur<br />Automator
                </h2>
                <p className="text-lg text-black/60 font-light leading-relaxed mb-12 italic">{t.kaDesc}</p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: Binary, title: t.kaF1Title, desc: t.kaF1Desc },
                  { Icon: Shield, title: t.kaF2Title, desc: t.kaF2Desc },
                  { Icon: Layers, title: t.kaF3Title, desc: t.kaF3Desc },
                  { Icon: CheckCircle, title: t.kaF4Title, desc: t.kaF4Desc },
                ].map(({ Icon, title, desc }, i) => (
                  <div key={i} className="p-8 bg-[#F4F7FA] rounded-[32px] border border-black/5 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <Icon className="text-indigo-600 mb-4" size={28} />
                    <h4 className="font-bold text-lg mb-2 tracking-tight">{title}</h4>
                    <p className="text-sm text-black/50 font-light leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <Reveal>
                <div className="bg-indigo-600 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20">
                  <Monitor className="absolute -right-8 -top-8 w-48 h-48 opacity-10 rotate-12" />
                  <h3 className="text-2xl font-medium mb-8 tracking-tight font-tech">{t.kaTechTitle}</h3>
                  <div className="space-y-6">
                    {[
                      { label: t.kaMetric1, value: '98%', width: '98%', delay: 0 },
                      { label: t.kaMetric2, value: '85%', width: '85%', delay: 0.2 },
                    ].map(({ label, value, width, delay }) => (
                      <div key={label}>
                        <div className="flex justify-between mb-2 text-xs font-bold uppercase tracking-widest text-indigo-100">
                          <span>{label}</span>
                          <span>{value}</span>
                        </div>
                        <div className="h-1.5 bg-black/20 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width }}
                            transition={{ duration: 1.5, ease: 'easeOut', delay }}
                            className="h-full bg-white"
                          />
                        </div>
                      </div>
                    ))}
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
                    {[1, 2, 3, 4, 5].map((num, index) => {
                      const rotations = [-4, 3, -2, 5, -3];
                      return (
                        <motion.div
                          key={num}
                          whileHover={{ scale: 1.2, zIndex: 50, y: -10 }}
                          initial={{ rotate: rotations[index] }}
                          className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-[3px] border-white shadow-xl flex-shrink-0 cursor-zoom-in transition-transform duration-300 bg-white"
                        >
                          <img
                            src={`/images/klausur${num}.jpg`}
                            alt={`Klausurautomator Interface ${num}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800';
                            }}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-black/30 font-light mt-4 italic">{t.kaGalleryHint}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="py-32 bg-[#F4F7FA] relative border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-tech text-[#111]">{t.githubTitle}</h2>
            <span className="text-black/20 font-bold text-[10px] uppercase tracking-widest hidden md:block">Select to preview</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 min-h-[400px]">
            <div className="lg:col-span-5 flex flex-col gap-2">
              {t.projects.map((project: Project, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setActiveProjectIndex(idx)}
                  className={`w-full text-left px-6 py-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                    activeProjectIndex === idx 
                      ? 'bg-white border-indigo-200 shadow-md' 
                      : 'bg-transparent border-transparent hover:bg-white/50 hover:border-black/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`transition-colors ${activeProjectIndex === idx ? 'text-indigo-600' : 'text-black/40 group-hover:text-indigo-400'}`}>
                      {PROJECT_ICON_MAP[project.id]}
                    </div>
                    <div>
                      <h3 className={`font-medium font-tech tracking-tight transition-colors ${activeProjectIndex === idx ? 'text-indigo-600' : 'text-[#111]'}`}>
                        {project.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown size={16} className={`transition-transform duration-300 ${activeProjectIndex === idx ? '-rotate-90 text-indigo-600' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 text-black/20'}`} />
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProjectIndex}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[40px] p-10 md:p-14 border border-black/5 shadow-xl h-full flex flex-col relative overflow-hidden"
                >
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-50 pointer-events-none" />
                  
                  <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-4">
                    {t.projects[activeProjectIndex].tech}
                  </p>
                  <h3 className="text-3xl font-medium tracking-tight font-tech text-[#111] mb-6">
                    {t.projects[activeProjectIndex].title}
                  </h3>
                  <p className="text-black/50 font-light italic text-lg leading-relaxed mb-10 flex-1">
                    "{t.projects[activeProjectIndex].shortDesc}"
                  </p>
                  
                  <div>
                    <button
                      onClick={() => setActiveProject(t.projects[activeProjectIndex])}
                      className="px-8 py-4 bg-[#111] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors w-full md:w-auto text-center"
                    >
                      {t.viewDetails}
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <ThesisArchitectureSection t={t} />

      <section id="volunteering" className="py-32 bg-white border-y border-black/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight font-tech text-[#111]">{t.volunteeringTitle}</h2>
              <p className="text-black/40 font-light italic mt-4 text-xl">{t.volunteeringSub}</p>
            </div>
          </Reveal>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
            {t.volunteering.map((v: any, i: number) => (
              <button
                key={i}
                onClick={() => setActiveVolunteerIndex(i)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeVolunteerIndex === i 
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-600/20' 
                    : 'bg-[#F4F7FA] text-black/40 border-black/5 hover:bg-white hover:border-black/10'
                }`}
              >
                {v.tag}
              </button>
            ))}
          </div>

          <div className="relative min-h-[250px] bg-[#F4F7FA] rounded-[40px] p-10 border border-black/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVolunteerIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center max-w-2xl mx-auto"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm mb-6">
                  <Heart size={24} />
                </div>
                <h3 className="text-3xl font-medium mb-2 tracking-tight font-tech text-[#111]">
                  {t.volunteering[activeVolunteerIndex].org}
                </h3>
                <p className="text-indigo-500 font-mono text-[10px] tracking-[0.2em] uppercase mb-6">
                  {t.volunteering[activeVolunteerIndex].role} • {t.volunteering[activeVolunteerIndex].period}
                </p>
                <p className="text-black/60 font-light text-lg leading-relaxed italic">
                  {t.volunteering[activeVolunteerIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F4F7FA] relative">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-12 text-center">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-2 font-tech text-[#111]">{t.hobbiesTitle}</h2>
              <p className="text-black/40 font-light italic text-base">{t.hobbiesSub}</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {t.hobbies.map((h: { name: string }, i: number) => (
              <Reveal key={i}>
                <div className="group p-5 rounded-[24px] bg-white border border-black/5 hover:shadow-lg hover:border-indigo-100 transition-all duration-300 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                    {HOBBY_ICON_MAP[h.name] ?? <Zap size={20} />}
                  </div>
                  <h3 className="text-base md:text-lg font-medium tracking-tight font-tech text-[#111]">{h.name}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="languages" className="py-24 bg-white relative border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-12 font-tech text-[#111] text-center md:text-left">{t.languagesTitle}</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.languages.map((langItem: any, i: number) => (
              <Reveal key={i}>
                <motion.div whileHover={{ y: -5 }} className="relative group p-6 rounded-[24px] bg-[#F4F7FA] border border-black/5 overflow-hidden transition-all hover:shadow-lg hover:bg-white h-full flex flex-col justify-between">
                  <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${langItem.color} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />
                  <div className="relative z-10 mb-6">
                    <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-black/30 block mb-2">{langItem.level}</span>
                    <h3 className="text-xl font-medium tracking-tight mb-2 font-tech text-[#111]">{langItem.name}</h3>
                    <p className="text-xs text-black/40 font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">{langItem.info}</p>
                  </div>
                  <div className="flex gap-1 mt-auto">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div key={dot} className={`w-1 h-1 rounded-full ${dot <= langItem.dots ? 'bg-indigo-600' : 'bg-black/5'}`} />
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="recommendation" className="py-32 bg-[#0A0A0A] text-white relative border-b border-black/5 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            <div className="lg:col-span-7">
              <Reveal>
                <div className="text-indigo-500 mb-8">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.411 14.603C18.805 14.603 21 12.8 21 9C21 5.2 18.195 3 14.603 3C10.798 3 8 5.6 8 10H11.2C11.2 7.8 12.8 6.2 14.603 6.2C16.406 6.2 17.8 7.6 17.8 9C17.8 10.4 16.406 11.4 14.603 11.4H13V14.603L14.017 21ZM4.017 21L6.411 14.603C8.805 14.603 11 12.8 11 9C11 5.2 8.195 3 4.603 3C0.798 3 0 5.6 0 10H3.2C3.2 7.8 4.8 6.2 6.603 6.2C8.406 6.2 9.8 7.6 9.8 9C9.8 10.4 8.406 11.4 6.603 11.4H5V14.603L4.017 21Z" />
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-light italic leading-relaxed text-white/90 mb-10 font-serif-custom">
                  "{t.recommendationQuote}"
                </h2>
                <div>
                  <p className="text-white font-tech tracking-tight text-xl">{t.recommendationAuthor}</p>
                  <p className="text-indigo-400 text-sm font-mono tracking-wider mt-1">{t.recommendationRole}</p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal>
                <div className="bg-white/5 border border-white/10 rounded-[32px] p-2 backdrop-blur-sm">
                  {t.recommendationTabs.map((tab: any, i: number) => (
                    <div key={i}>
                      <button
                        onClick={() => setActiveRecTab(i)}
                        className={`w-full text-left px-6 py-5 rounded-[24px] transition-all duration-300 flex items-center justify-between ${
                          activeRecTab === i ? 'bg-indigo-600 text-white shadow-lg' : 'text-white/50 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className="font-bold uppercase tracking-widest text-[10px]">{tab.label}</span>
                        {activeRecTab === i ? <ChevronDown size={16} /> : <CheckCircle size={16} className="opacity-50" />}
                      </button>
                      
                      <AnimatePresence>
                        {activeRecTab === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 py-5 text-white/70 font-light leading-relaxed text-sm">
                              {tab.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      <footer className="py-32 text-center bg-[#F4F7FA] relative">
        <Reveal>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-indigo-600 font-bold mb-4 uppercase tracking-[0.3em] text-[10px]">{t.cta}</p>
            <motion.h2
              className="text-2xl md:text-5xl font-medium tracking-tight mb-12 italic font-tech text-[#111] hover:text-indigo-600 transition-colors cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              sonmezbilge@gmail.com
            </motion.h2>
            <motion.div className="flex justify-center gap-10 mb-20" whileHover={{ opacity: 1 }} initial={{ opacity: 0.4 }} transition={{ duration: 0.3 }}>
              <motion.a href="https://linkedin.com/in/bilge-sonmez/" target="_blank" rel="noopener noreferrer" className="text-[#111]" whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}>
                <Linkedin size={28} />
              </motion.a>
              <motion.a href="https://github.com/bsoenmez3" target="_blank" rel="noopener noreferrer" className="text-[#111]" whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}>
                <Github size={28} />
              </motion.a>
              <motion.a href="mailto:sonmezbilge@gmail.com" className="text-[#111]" whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}>
                <Mail size={28} />
              </motion.a>
            </motion.div>
            <motion.p className="text-[10px] font-bold tracking-[0.6em] text-black/20 uppercase" initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} transition={{ delay: 0.3 }}>
              {t.footer}
            </motion.p>
          </motion.div>
        </Reveal>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 md:p-6"
            onClick={() => setActiveProject(null)}
          >
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
              <div className="text-indigo-600 mb-6">{PROJECT_ICON_MAP[activeProject.id]}</div>
              <h2 className="text-4xl font-medium tracking-tight mb-2 font-tech text-[#111]">{activeProject.title}</h2>
              <p className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest mb-8">{activeProject.tech}</p>
              <p className="text-lg text-black/60 font-light leading-relaxed mb-10 italic">{activeProject.fullDesc}</p>
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-black/40 mb-6">{t.highlightsTitle}</h3>
              <ul className="space-y-4 mb-12">
                {activeProject.highlights.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-4 text-black/70">
                    <CheckCircle size={20} className="shrink-0 text-indigo-500 mt-0.5 opacity-50" />
                    <span className="font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              {activeProject.link && (
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors w-full md:w-auto justify-center"
                >
                  {t.viewRepo} <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WaveSection({ img, title, year, desc, extras }: {
  img: string;
  title: string;
  year?: string;
  desc: React.ReactNode;
  extras?: string | string[];
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <div ref={ref} className="flex flex-col md:flex-row items-center gap-16 px-6 max-w-7xl mx-auto mb-48 relative">
      <div className="flex-1 w-full aspect-[16/10] overflow-hidden rounded-[40px] relative border border-black/5 bg-[#F4F7FA] shadow-lg">
        <motion.img style={{ y }} src={img} alt={title} className="absolute inset-0 w-full h-[130%] object-cover scale-110" />
      </div>
      <div className="flex-1 space-y-5">
        {year && <span className="text-indigo-600 font-mono text-xs tracking-[0.2em] uppercase">{year}</span>}
        <h3 className="text-4xl md:text-5xl font-medium tracking-tight leading-none font-tech text-[#111]">{title}</h3>
        <div className="text-black/50 font-light italic text-xl leading-relaxed space-y-2">{desc}</div>
        {extras && (
          <div className="space-y-3 mt-4">
            {(Array.isArray(extras) ? extras : [extras]).map((e, i) => (
              <div key={i} className="inline-block px-5 py-3 bg-indigo-50/50 border border-indigo-100 rounded-2xl">
                <p className="text-indigo-900/70 font-medium text-sm leading-relaxed flex items-start gap-2">
                  <Layers size={16} className="mt-0.5 shrink-0 opacity-50" />
                  {e}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ThesisArchitectureSection({ t }: { t: any }) {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const features = [
    { icon: <Database size={20} />, title: t.thesisF1Title, desc: t.thesisF1Desc },
    { icon: <Shield size={20} />, title: t.thesisF2Title, desc: t.thesisF2Desc },
    { icon: <Network size={20} />, title: t.thesisF3Title, desc: t.thesisF3Desc },
    { icon: <Binary size={20} />, title: t.thesisF4Title, desc: t.thesisF4Desc },
  ];

  const isDe = t.eduTitle === 'Akademischer Hintergrund';
  const zoomHintText = isDe 
    ? "Klicken Sie hier, um die Architektur meiner Java-Implementierung zur Erweiterung der evidence-core-Bibliothek zu vergrößern." 
    : "Click to view the architecture blueprint of my Java implementation extending the evidence-core library.";

  return (
    <section className="py-32 bg-[#F4F7FA] border-b border-black/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">

        <div className="mb-16 md:mb-20 pt-10">
          <Reveal>
            <span className="text-indigo-600 font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block italic">
              {t.thesisSectionHighlight}
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 uppercase leading-none font-tech text-[#111] max-w-3xl">
              {t.thesisSectionTitle}
            </h2>
            <p className="text-base md:text-lg text-black/50 font-light italic max-w-3xl leading-relaxed">
              {t.thesisSectionDesc}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-7 w-full relative group">
            <Reveal>
              <div 
                onClick={() => setIsZoomed(true)}
                className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#E8EEF5] rounded-[32px] border border-black/5 shadow-xl overflow-hidden cursor-zoom-in group"
              >
                <div className="blueprint-grid absolute inset-0 opacity-[0.04] pointer-events-none" />
                
                <img 
                  src="/images/architecture.jpg" 
                  alt="Architecture Blueprint" 
                  className="absolute inset-0 w-full h-full object-cover md:object-contain p-4 md:p-8 pb-24 md:pb-28 group-hover:scale-105 transition-transform duration-700 ease-out" 
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000'; }} 
                />

                <div className="absolute bottom-4 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/10 rounded-[20px] p-4 flex items-center gap-4 text-white shadow-2xl transition-all duration-300 group-hover:bg-black group-hover:translate-y-[-4px]">
                  <div className="w-10 h-10 shrink-0 bg-indigo-500/20 border border-indigo-500/30 rounded-full flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <ZoomIn size={20} />
                  </div>
                  <p className="text-xs md:text-sm font-light leading-relaxed text-white/90">
                    {zoomHintText}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 w-full space-y-3">
            <Reveal>
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40">
                  Core Components
                </span>
              </div>
            </Reveal>

            {features.map((feature, i) => (
              <Reveal key={i}>
                <div 
                  className={`border rounded-[24px] overflow-hidden transition-all duration-500 ${
                    activeFeature === i 
                      ? 'bg-white border-indigo-200 shadow-lg' 
                      : 'bg-transparent border-black/5 hover:border-black/10 hover:bg-white/50'
                  }`}
                >
                  <button
                    onClick={() => setActiveFeature(activeFeature === i ? -1 : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl transition-colors duration-300 ${activeFeature === i ? 'bg-indigo-50 text-indigo-600' : 'text-black/40'}`}>
                        {feature.icon}
                      </div>
                      <h4 className={`font-bold tracking-tight font-tech transition-colors duration-300 ${activeFeature === i ? 'text-indigo-600' : 'text-[#111]'}`}>
                        {feature.title}
                      </h4>
                    </div>
                    <ChevronDown size={18} className={`transition-transform duration-500 ${activeFeature === i ? '-rotate-180 text-indigo-600' : 'text-black/20'}`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeFeature === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="h-px w-full bg-black/5 mb-4" />
                          <p className="text-black/60 font-light leading-relaxed text-sm italic">
                            {feature.desc}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isZoomed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsZoomed(false)}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
            >
              <button
                onClick={() => setIsZoomed(false)}
                title="Close zoomed image"
                aria-label="Close zoomed image"
                className="absolute top-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors z-10"
              >
                <X size={24} />
              </button>
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                src="/images/architecture.jpg"
                alt="Architecture Blueprint Zoomed"
                className="w-full max-w-6xl max-h-[90vh] object-contain rounded-2xl shadow-2xl"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2000'; }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
      {children}
    </motion.div>
  );
}