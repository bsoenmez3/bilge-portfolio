'use client';

import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Linkedin, Github, Rocket, ChevronDown, Binary, Mail,
  CheckCircle, ExternalLink, Monitor, Shield,
  Sword, BookOpen, Layers, X, Plane, Leaf, Heart,
  Music, Camera, Youtube, Database, ZoomIn, GripHorizontal,
  Users, Star, Sparkles, Award, Globe
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
    heroMeta: 'M.Sc. Computer Science Master student at KIT.',
    thesis: "Bachelor's Thesis: Quantitative Trustworthiness Analysis of Autonomous Systems",
    eduTitle: 'Academic Foundation',
    githubTitle: 'Technical Projects',
    expTitle: 'Professional Journey',
    footer: '© 2026 Bilge Sönmez — Karlsruhe',
    thankYou: 'Thank you for checking my portfolio.',
    cta: "Let's Work Together!",
    swipeText: 'Swipe & Click for details',
    viewDetails: 'View Details',
    viewRepo: 'View Repository',
    highlightsTitle: 'Key Engineering Highlights',
    oneAndOneYearsBadge: '+3 Years',
    oneAndOneTeamPhotoAlt: '1&1 team photo',

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
    kitMasterExtras: '',
    kabatasDesc: 'Graduated top 0.03% nationally. Developed foundation in leadership and analytical thinking. 1 year German language prep program (2015—2016) before starting at KIT.',
    
    languagesTitle: 'Communication Stack',
    languages: [
      { name: 'Turkish', level: 'Native', info: 'Mother tongue, cultural root.', color: 'from-red-500 to-orange-500', dots: 5 },
      { name: 'English', level: 'B2 - C1 Proficiency', info: 'Global tech standard.', color: 'from-blue-500 to-indigo-600', dots: 4 },
      { name: 'German', level: 'B2 - C1 Proficiency', info: 'Academic & business fluency.', color: 'from-amber-400 to-yellow-600', dots: 4 },
      { name: 'Spanish', level: 'Elementary', info: 'Learning to sing in Spanish :)', color: 'from-emerald-400 to-teal-500', dots: 1 },
    ],

    recommendationTitle: "Executive Endorsement",
    recommendationAuthor: "Matthias Hüller",
    recommendationRole: "Engineering Manager @ 1&1 Mail & Media",
    recommendationNoteLabel: 'Letter of Recommendation',
    recommendationHint: 'Open a note on the right to read each focus area.',
    recommendationPanelLabel: 'Reading Notes',
    recommendationExpandClosed: 'Click to expand',
    recommendationExpandOpen: 'Expanded',
    terminalDragHint: 'Drag panel',
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
        role: 'Working Student',
        period: 'Jul 2022 – Sep 2025',
        tech: 'Java · SonarQube · CI/CD · Jira',
        image: '/images/1and1.jpg',
        tasks: [
          'Implement security requirements in software applications and resolve code quality issues with SonarQube in line with internal security processes.',
          'Support infrastructural changes, CI/CD pipeline adjustments and endpoint migrations.',
          'Update technical dependencies in test automation projects and implement automated test cases for strong coverage.',
          'Create and maintain test plans prepare clear test reports.',
        ],
        takeaway: 'Regularly participated in Scrum rituals, especially daily stand-ups and retrospectives, alongside security, testing, and delivery workflows.',
      },
      {
        company: 'TECO Research Group',
        role: 'Full-Stack Developer Intern',
        period: 'May 2023 – Sep 2023',
        tech: 'Java · TypeScript · LaTeX Workflow',
        image: '/images/teco.jpg',
        tasks: [
          'Was part of the "KlausurAutomator" project, helping automate digital exam creation.',
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
    heroMeta: 'M.Sc. Informatik Masterstudentin am KIT.',
    thesis: 'Bachelorarbeit: Quantitative Vertrauenswürdigkeitsanalyse autonomer Systeme',
    eduTitle: 'Akademischer Hintergrund',
    githubTitle: 'Technische Projekte',
    expTitle: 'Beruflicher Werdegang',
    footer: '© 2026 Bilge Sönmez — Karlsruhe',
    thankYou: 'Thank you for checking my portfolio.',
    cta: 'Lassen Sie uns zusammenarbeiten!',
    swipeText: 'Wischen & Klicken für Details',
    viewDetails: 'Details ansehen',
    viewRepo: 'Repository ansehen',
    highlightsTitle: 'Technische Highlights',
    oneAndOneYearsBadge: '+3 Jahre',
    oneAndOneTeamPhotoAlt: '1&1 Teamfoto',

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
    kitMasterExtras: '',
    kabatasDesc: 'Abschluss unter den besten 0,03% landesweit. Fundament in Führung und analytischem Denken aufgebaut. 1 Jahr Deutschkurse (2015—2016) vor dem KIT-Studium.',
    
    languagesTitle: 'Sprachkompetenz',
    languages: [
      { name: 'Türkisch', level: 'Muttersprache', info: 'Muttersprache, kulturelle Wurzel.', color: 'from-red-500 to-orange-500', dots: 5 },
      { name: 'Englisch', level: 'B2 - C1 Niveau', info: 'Globaler Tech-Standard.', color: 'from-blue-500 to-indigo-600', dots: 4 },
      { name: 'Deutsch', level: 'B2 - C1 Niveau', info: 'Akademische & geschäftliche Sicherheit.', color: 'from-amber-400 to-yellow-600', dots: 4 },
      { name: 'Spanisch', level: 'Grundkenntnisse', info: 'Lerne gerade auf Spanisch zu singen :)', color: 'from-emerald-400 to-teal-500', dots: 1 },
    ],

    recommendationTitle: "Executive Endorsement",
    recommendationAuthor: "Matthias Hüller",
    recommendationRole: "Engineering Manager @ 1&1 Mail & Media",
    recommendationNoteLabel: 'Empfehlungsschreiben',
    recommendationHint: 'Rechts eine Karte aufklappen, um den jeweiligen Fokus zu lesen.',
    recommendationPanelLabel: 'Lesenotizen',
    recommendationExpandClosed: 'Zum Aufklappen klicken',
    recommendationExpandOpen: 'Geoeffnet',
    terminalDragHint: 'Panel ziehen',
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
        role: 'Werkstudentin',
        period: 'Jul 2022 – Sep 2025',
        tech: 'Java · SonarQube · CI/CD · Jira',
        image: '/images/1and1.jpg',
        tasks: [
          'Umsetzung von Sicherheitsanforderungen in Softwareanwendungen und Behebung von Codequalitaetsproblemen mit SonarQube gemaess interner Security-Prozesse.',
          'Unterstuetzung infrastruktureller Aenderungen, einschliesslich Anpassungen an CI/CD-Pipelines und Endpoint-Migrationen.',
          'Aktualisierung technischer Abhaengigkeiten in Testautomatisierungsprojekten sowie Implementierung automatisierter Testfaelle fuer starke Testabdeckung.',
          'Erstellung und Pflege von Testplaenen, Vorbereitung klarer Testberichte.',
        ],
        takeaway: 'Regelmaessige Teilnahme an Scrum-Ritualen, insbesondere Dailys und Retrospektiven, neben Security-, Testing- und Delivery-Aufgaben.',
      },
      {
        company: 'TECO Research Group',
        role: 'Full-Stack Developer Praktikantin',
        period: 'Mai 2023 – Sep 2023',
        tech: 'Java · TypeScript · LaTeX Workflow',
        image: '/images/teco.jpg',
        tasks: [
          'Mitarbeit am "KlausurAutomator" zur Automatisierung digitaler Klausurerstellung.',
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

type PortfolioLocale = keyof typeof content;
type PortfolioContent = (typeof content)[PortfolioLocale];
type RecommendationTab = PortfolioContent['recommendationTabs'][number];

const LANGUAGE_BAR_WIDTH_CLASS_MAP: Record<number, string> = {
  1: 'w-1/5',
  2: 'w-2/5',
  3: 'w-3/5',
  4: 'w-4/5',
  5: 'w-full',
};

export default function BilgePortfolio() {
  const [lang, setLang] = useState<PortfolioLocale>('en');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentSection, setCurrentSection] = useState('HOME');
  const [time, setTime] = useState<string>(() => new Date().toLocaleTimeString());
  
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [activeRecTab, setActiveRecTab] = useState<number | null>(null);
  const [hoveredRecTab, setHoveredRecTab] = useState<number | null>(null);

  const t = content[lang];
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroGridY = useTransform(scrollYProgress, [0, 0.22], [0, 68]);
  const heroGlowY = useTransform(scrollYProgress, [0, 0.22], [0, 38]);

  useEffect(() => {
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
      const ids = ['education', 'experience', 'projects', 'volunteering', 'personality-stack', 'recommendation'];
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
      className="portfolio-page bg-[linear-gradient(180deg,#fafdff_0%,#f1f6fc_8%,#e4edf7_18%,#cfdbea_30%,#9eafc4_44%,#65748b_58%,#435062_72%,#313946_84%,#272e37_100%)] text-[#1A1A1A] selection:bg-indigo-100 overflow-x-hidden relative"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(17,24,39,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.14)_1px,transparent_1px)] [background-size:30px_30px]" />
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.08}
        whileDrag={{ scale: 1.02, cursor: 'grabbing' }}
        className="fixed bottom-6 left-6 z-[60] hidden lg:block pointer-events-auto cursor-grab"
      >
        <div className="bg-black/90 backdrop-blur-md text-[#00FF41] font-mono text-[10px] p-4 rounded-xl border border-white/10 shadow-2xl w-64 select-none">
          <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/40" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
              <div className="w-2 h-2 rounded-full bg-green-500/40" />
            </div>
            <div className="flex items-center gap-2 text-white/35 uppercase tracking-[0.22em] text-[8px]">
              <GripHorizontal size={12} />
              <span>{t.terminalDragHint}</span>
            </div>
          </div>
          <div className="space-y-1 pointer-events-none">
            <p className="opacity-40">[{time || '...'}]</p>
            <p className="text-indigo-400 font-bold animate-pulse">&gt; {currentSection}</p>
            <p className="text-white/40">&gt; LANG: {lang.toUpperCase()}</p>
            <p className="text-white/20 truncate">&gt; KIT_KARLSRUHE_CONNECTED</p>
          </div>
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif-custom { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; }
        .font-tech { font-family: 'Inter', sans-serif; font-weight: 500; letter-spacing: -0.02em; }
        .font-label { font-family: 'Inter', sans-serif; font-weight: 600; letter-spacing: 0.22em; }
      `}</style>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[100]" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-50 px-8 py-5 flex justify-between items-center bg-[linear-gradient(180deg,rgba(255,255,255,0.72)_0%,rgba(244,248,253,0.52)_100%)] backdrop-blur-xl border-b border-white/35 shadow-[0_8px_30px_rgba(148,163,184,0.14)]">
        <span className="font-semibold text-lg tracking-tight lowercase text-slate-900/90">{t.name.replace(' ', '.')}</span>
        <button
          onClick={() => setLang(lang === 'en' ? 'de' : 'en')}
          className="text-[10px] font-bold tracking-[0.2em] border border-slate-900/10 bg-white/45 text-slate-800 px-4 py-2 rounded-full hover:bg-slate-950 hover:text-white transition-all uppercase shadow-sm"
        >
          {lang}
        </button>
      </nav>

      <section className="h-screen flex flex-col justify-center items-center px-6 text-center relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.12] pointer-events-none"
          style={{ y: heroGridY }}
        >
          <div className="absolute inset-0 [background-image:linear-gradient(rgba(37,99,235,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
        </motion.div>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: heroGlowY }}
        >
          <div className="absolute left-1/2 top-[18%] h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-400/20 blur-3xl" />
          <div className="absolute right-[18%] top-[28%] h-48 w-48 rounded-full bg-cyan-300/12 blur-3xl" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
          <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white">
            <Image
              src="/images/profile.jpg"
              alt={t.name}
              fill
              priority
              sizes="(min-width: 768px) 160px, 128px"
              className="object-cover"
            />
          </div>
          <h1 className="text-6xl md:text-[9rem] tracking-tight mb-6 text-[#111] font-tech font-semibold">{t.name}</h1>
          <p className="text-[1.02rem] md:text-[1.35rem] text-black/58 font-light max-w-2xl mx-auto leading-[1.75]">{t.sub}</p>
          <p className="mt-2 text-[1.02rem] md:text-[1.35rem] text-black/58 font-light max-w-2xl mx-auto leading-[1.75]">{t.heroMeta}</p>
        </motion.div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 opacity-20">
          <ChevronDown size={24} />
        </motion.div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent via-[rgba(231,239,247,0.68)] to-[rgba(241,246,252,0.96)] pointer-events-none" />
      </section>

      <section id="education" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(17,24,39,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(17,24,39,0.12)_1px,transparent_1px)] [background-size:30px_30px] pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(241,246,252,0.84)] via-[rgba(241,246,252,0.42)] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[rgba(126,141,161,0.06)] to-[rgba(126,141,161,0.08)] pointer-events-none" />
        <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-700/70 mb-24 text-center">{t.eduTitle}</h2>
        <WaveSection
          img="/images/kit.jpg"
          title={t.kitName}
          desc={
            <>
              <div className="font-semibold">{t.kitMasterDegree}</div>
              <div className="text-xs text-indigo-600 font-label uppercase">{t.kitMasterYear}</div>
              <div className="font-semibold mt-4">{t.kitBachelorDegree}</div>
              <div className="text-xs text-indigo-600 font-label uppercase">{t.kitBachelorYear}</div>
            </>
          }
          extras={[t.kitMasterExtras, t.kitBachelorExtras].filter(Boolean)}
        />
        <WaveSection img="/images/kabatas.jpg" title={t.kabatasName} year="2015 — 2020" desc={t.kabatasDesc} />
      </section>

      <section id="experience" className="py-32 relative overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(126,141,161,0.08)_28%,rgba(108,122,141,0.14)_100%)] backdrop-blur-[2px]">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 via-white/4 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[rgba(108,122,141,0.08)] to-[rgba(108,122,141,0.14)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-24">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-4 font-tech text-slate-950">{t.expTitle}</h2>
            </div>
          </Reveal>

          <div className="relative">
            <div className="hidden lg:block absolute top-[40px] left-[16%] right-[16%] h-px border-t border-dashed border-indigo-200/70 z-0" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 relative z-10 items-start">
              {t.experiences.map((exp: Experience, index: number) => (
                <Reveal key={index}>
                  {(() => {
                    const glowClass = exp.company === 'Fraunhofer IOSB'
                      ? 'group-hover:bg-cyan-400/14'
                      : exp.company === '1&1 Mail & Media'
                        ? 'group-hover:bg-amber-400/12'
                        : 'group-hover:bg-indigo-500/14';
                    const cardHoverClass = exp.company === 'Fraunhofer IOSB'
                      ? 'hover:shadow-[0_24px_64px_rgba(34,211,238,0.18)]'
                      : exp.company === '1&1 Mail & Media'
                        ? 'hover:shadow-[0_24px_64px_rgba(251,191,36,0.16)]'
                        : 'hover:shadow-[0_24px_64px_rgba(79,70,229,0.2)]';
                    const radialGlowClass = exp.company === 'Fraunhofer IOSB'
                      ? 'group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_38%)]'
                      : exp.company === '1&1 Mail & Media'
                        ? 'group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.18),transparent_38%)]'
                        : 'group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.16),transparent_38%)]';

                    return (
                  <div className="relative group flex flex-col items-center lg:items-start self-start">
                    <div className={`absolute inset-x-4 top-24 bottom-4 rounded-[36px] bg-transparent blur-3xl transition-all duration-500 opacity-0 pointer-events-none ${glowClass}`} />
                    <div className="relative z-10 flex justify-center lg:justify-start mb-8">
                      <div className="w-20 h-20 bg-white/90 border-[4px] border-slate-200/80 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-indigo-50 transition-all duration-300 overflow-hidden">
                        {exp.image ? (
                          <Image
                            src={exp.image} 
                            alt={`${exp.company} logo`} 
                            fill
                            sizes="80px"
                            className="object-contain p-2 rounded-full"
                          />
                        ) : (
                          <div className="text-indigo-600">
                            {EXPERIENCE_ICONS[index]}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`relative z-10 bg-[linear-gradient(180deg,rgba(15,23,42,0.94)_0%,rgba(10,15,26,0.98)_100%)] border border-white/8 rounded-[32px] p-7 w-full text-left hover:bg-[linear-gradient(180deg,rgba(26,38,66,0.98)_0%,rgba(10,15,26,1)_100%)] ${cardHoverClass} transition-all duration-500 hover:-translate-y-1 flex flex-col text-white overflow-hidden`}>
                      <div className={`absolute inset-0 opacity-0 transition-opacity duration-500 pointer-events-none ${radialGlowClass}`} />
                      <span className="text-indigo-300 font-label text-[10px] uppercase block mb-3">{exp.period}</span>
                      <h3 className="text-2xl font-bold tracking-tight mb-1 text-white font-tech leading-tight">{exp.company}</h3>
                      <p className="text-white/70 mb-4 font-medium">{exp.role}</p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {exp.tech.split('·').map((t, i) => (
                          <span key={i} className="px-3 py-1 bg-white/8 border border-white/10 text-[9px] font-bold uppercase tracking-widest text-indigo-100/80 rounded-full">
                            {t.trim()}
                          </span>
                        ))}
                      </div>

                      {exp.company === '1&1 Mail & Media' && (
                        <div className="mb-5 space-y-3">
                          <div className="relative overflow-hidden rounded-[28px] border border-amber-200 bg-gradient-to-r from-amber-100 via-orange-50 to-white px-6 py-4 shadow-lg shadow-amber-100/60">
                            <div className="absolute right-0 top-0 h-20 w-20 translate-x-6 -translate-y-6 rounded-full bg-amber-300/30 blur-2xl" />
                            <p className="text-[1.7rem] md:text-[2rem] font-semibold tracking-tight font-tech text-[#111]">{t.oneAndOneYearsBadge}</p>
                          </div>

                          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/95 shadow-lg shadow-black/20">
                            <div className="relative h-44 w-full">
                              <Image
                                src="/images/team.jpg"
                                alt={t.oneAndOneTeamPhotoAlt}
                                fill
                                sizes="(min-width: 1024px) 33vw, 100vw"
                                className="object-cover object-center"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      <ul className="space-y-3 mb-6">
                        {exp.tasks.map((task: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-white/72 hover:text-white transition-colors text-sm">
                            <CheckCircle size={16} className="mt-0.5 shrink-0 text-indigo-300" />
                            <span className="font-light leading-relaxed">{task}</span>
                          </li>
                        ))}
                      </ul>

                      {exp.company === 'TECO Research Group' && (
                        <a
                          href="#klausur-automator"
                          className="group/cta relative mb-6 block overflow-hidden rounded-[28px] border border-sky-200/40 bg-gradient-to-br from-slate-700 via-slate-600 to-sky-600 p-6 text-white shadow-xl shadow-slate-900/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/25"
                        >
                          <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-white/10 blur-2xl" />
                          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-100/85">{t.kaLinkEyebrow}</p>
                          <p className="max-w-xs text-lg font-semibold leading-snug tracking-tight font-tech">{t.kaLinkTitle}</p>
                          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white transition-all duration-300 group-hover/cta:bg-white group-hover/cta:text-slate-700">
                            <span>{t.kaLinkCta}</span>
                            <ExternalLink size={14} />
                          </div>
                        </a>
                      )}

                      <div className="bg-white/6 border border-white/10 rounded-2xl p-5">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-2">Key Takeaway</p>
                        <p className="text-white/84 font-medium italic text-sm leading-relaxed">&quot;{exp.takeaway}&quot;</p>
                      </div>
                    </div>
                  </div>
                    );
                  })()}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="klausur-automator" className="py-40 relative scroll-mt-24 overflow-hidden bg-[linear-gradient(180deg,rgba(108,122,141,0.14)_0%,rgba(141,155,174,0.12)_36%,rgba(126,140,160,0.16)_100%)] backdrop-blur-[2px]">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(108,122,141,0.12)] via-[rgba(108,122,141,0.05)] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[rgba(126,140,160,0.08)] to-[rgba(126,140,160,0.16)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
              <Reveal>
                <span className="text-indigo-700 font-label text-[10px] uppercase mb-4 block">{t.klausurHighlight}</span>
                <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 uppercase leading-none font-tech text-[#111]">
                  Klausur<br />Automator
                </h2>
                  <p className="text-[1rem] md:text-[1.08rem] text-slate-800/74 font-light leading-[1.8] mb-12 max-w-3xl">{t.kaDesc}</p>
              </Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: Binary, title: t.kaF1Title, desc: t.kaF1Desc },
                  { Icon: Shield, title: t.kaF2Title, desc: t.kaF2Desc },
                  { Icon: Layers, title: t.kaF3Title, desc: t.kaF3Desc },
                  { Icon: CheckCircle, title: t.kaF4Title, desc: t.kaF4Desc },
                ].map(({ Icon, title, desc }, i) => (
                  <div key={i} className="p-8 bg-[#eef3f9] rounded-[32px] border border-slate-900/8 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <Icon className="text-indigo-600 mb-4" size={28} />
                    <h4 className="font-bold text-lg mb-2 tracking-tight text-slate-900">{title}</h4>
                    <p className="text-sm text-slate-700/80 font-light leading-relaxed">{desc}</p>
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
                          <Image
                            src={`/images/klausur${num}.jpg`}
                            alt={`Klausurautomator Interface ${num}`}
                            fill
                            sizes="(min-width: 768px) 96px, 80px"
                            className="object-cover"
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

      <section id="projects" className="py-32 relative overflow-hidden bg-[linear-gradient(180deg,rgba(126,140,160,0.16)_0%,rgba(90,104,122,0.2)_40%,rgba(74,88,108,0.24)_100%)] backdrop-blur-[1px]">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(126,140,160,0.12)] via-[rgba(126,140,160,0.04)] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[rgba(74,88,108,0.12)] to-[rgba(74,88,108,0.24)] pointer-events-none" />
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
                  <p className="text-[1rem] md:text-[1.08rem] text-black/55 font-light leading-[1.8] mb-10 flex-1 max-w-2xl">
                    &quot;{t.projects[activeProjectIndex].shortDesc}&quot;
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
      
      {/* --- COMMUNITY & IMPACT SECTION (YENİLENMİŞ) --- */}
      <section id="volunteering" className="py-24 px-6 relative overflow-hidden bg-[linear-gradient(180deg,rgba(32,38,48,0.52)_0%,rgba(34,40,49,0.58)_34%,rgba(32,38,48,0.52)_100%)]">
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px]" />
        {/* Arka plan süslemeleri */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-600/10 rounded-full blur-[100px] -z-10" />

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col mb-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-indigo-400 mb-2"
            >
              <Users size={18} />
              <span className="tracking-widest uppercase text-sm">{t.volunteeringTitle}</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white/50">
              {t.volunteeringSub}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.volunteering.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="group relative bg-slate-950/88 border border-white/10 p-5 rounded-[28px] backdrop-blur-sm hover:bg-slate-900/95 hover:border-indigo-400/50 hover:shadow-[0_22px_60px_rgba(99,102,241,0.16)] transition-all overflow-hidden"
              >
                {/* Neon Glow Efekti */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="absolute top-0 left-6 h-16 w-px bg-gradient-to-b from-indigo-300/90 to-transparent" />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400 group-hover:scale-110 transition-transform">
                      <Star size={20} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-label text-white/40 uppercase tracking-[0.18em]">
                      {item.period}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 text-white group-hover:text-indigo-200 transition-colors">{item.org}</h3>
                  <p className="text-xs text-indigo-300 font-medium mb-3">{item.role}</p>
                  <p className="text-sm text-white/78 leading-relaxed mb-4">
                    {item.desc}
                  </p>
                  
                  <div className="inline-block px-3 py-1 rounded-full bg-white/8 border border-white/12 text-[10px] font-bold text-white/90">
                    # {item.tag}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PERSONALITY & SKILLS (BEYOND THE CODE + COMMUNICATION STACK BİRLEŞİK) --- */}
      <section id="personality-stack" className="py-24 px-6 relative overflow-hidden bg-[linear-gradient(180deg,rgba(32,38,48,0.52)_0%,rgba(30,35,44,0.66)_34%,rgba(30,35,44,0.72)_100%)]">
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-[rgba(30,35,44,0.4)] to-[rgba(30,35,44,0.72)] pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            
            {/* SOL TARAF: BEYOND THE CODE */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-7 rounded-[32px] border border-white/10 bg-slate-950/88 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)]"
            >
              <div>
                <div className="flex items-center gap-2 text-rose-400 mb-2 uppercase text-sm font-label">
                  <Sparkles size={18} />
                  <span>{t.hobbiesTitle}</span>
                </div>
                <h3 className="text-3xl font-bold mb-4 text-white">{t.hobbiesSub}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {t.hobbies.map((hobby, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-4 p-4 min-h-[78px] bg-slate-900/85 border border-white/8 rounded-xl hover:border-rose-500/30 hover:bg-rose-950/40 transition-all group"
                  >
                    <div className="text-rose-400 group-hover:rotate-12 transition-transform">
                      {HOBBY_ICON_MAP[hobby.name] || <Heart size={20} />}
                    </div>
                    <span className="text-sm font-medium text-white/80 group-hover:text-white">{hobby.name}</span>
                  </motion.div>
                ))}
              </div>
              
            </motion.div>

            {/* SAĞ TARAF: COMMUNICATION STACK */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 rounded-[32px] border border-white/10 bg-slate-950/88 p-8 shadow-[0_24px_80px_rgba(2,6,23,0.45)]"
            >
              <div>
                <div className="flex items-center gap-2 text-cyan-400 mb-2 uppercase text-sm font-label">
                  <Globe size={18} />
                  <span>{t.languagesTitle}</span>
                </div>
                <h3 className="text-3xl font-tech font-semibold tracking-tight mb-4 text-white">Polyglot Mindset</h3>
              </div>

              <div className="space-y-4">
                {t.languages.map((lang, idx) => (
                  <div key={idx} className="relative p-5 bg-slate-900/85 border border-white/8 rounded-2xl overflow-hidden group">
                    {/* Progress Background */}
                    <div 
                      className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${lang.color} ${LANGUAGE_BAR_WIDTH_CLASS_MAP[lang.dots]} opacity-30 group-hover:opacity-100 transition-all`}
                    />
                    
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h4 className="font-bold text-lg text-white">{lang.name}</h4>
                        <p className="text-xs text-white/65">{lang.info}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs font-label px-2 py-1 rounded bg-gradient-to-r ${lang.color} text-black`}>
                          {lang.level}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-1.5 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i}
                          className={`h-1.5 w-full rounded-full transition-all duration-700 ${
                            i < lang.dots ? `bg-gradient-to-r ${lang.color}` : 'bg-white/10'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ... (Footer ve diğer kısımlar buraya gelecek) */}
      <section id="recommendation" className="py-32 text-white relative overflow-hidden bg-[linear-gradient(180deg,rgba(30,35,44,0.72)_0%,rgba(29,34,42,0.8)_34%,rgba(28,33,41,0.84)_100%)]">
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[rgba(30,35,44,0.2)] via-[rgba(30,35,44,0.08)] to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-6">
              <Reveal>
                <div className="relative overflow-hidden rounded-[36px] border border-amber-200/30 bg-[#f4ead8] text-slate-900 shadow-[0_26px_90px_rgba(0,0,0,0.28)]">
                  <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(120,53,15,0.16)_1px,transparent_1px)] [background-size:100%_34px]" />
                  <div className="absolute right-8 top-0 h-20 w-20 -translate-y-8 rotate-12 rounded-b-[28px] bg-[#ead8ba] shadow-lg" />
                  <div className="relative z-10 p-7 md:p-8">
                    <div className="flex items-center justify-between gap-4 border-b border-amber-900/10 pb-5 mb-8">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-amber-800/70">{t.recommendationNoteLabel}</p>
                        <p className="mt-2 text-sm text-slate-700/70 font-medium">{t.recommendationTitle}</p>
                      </div>
                      <div className="text-right text-[10px] uppercase tracking-[0.24em] text-slate-500/70">
                        <p>2025</p>
                      </div>
                    </div>

                    <div className="text-amber-900/70 mb-6">
                      <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 21L16.411 14.603C18.805 14.603 21 12.8 21 9C21 5.2 18.195 3 14.603 3C10.798 3 8 5.6 8 10H11.2C11.2 7.8 12.8 6.2 14.603 6.2C16.406 6.2 17.8 7.6 17.8 9C17.8 10.4 16.406 11.4 14.603 11.4H13V14.603L14.017 21ZM4.017 21L6.411 14.603C8.805 14.603 11 12.8 11 9C11 5.2 8.195 3 4.603 3C0.798 3 0 5.6 0 10H3.2C3.2 7.8 4.8 6.2 6.603 6.2C8.406 6.2 9.8 7.6 9.8 9C9.8 10.4 8.406 11.4 6.603 11.4H5V14.603L4.017 21Z" />
                      </svg>
                    </div>

                    <h2 className="text-[1rem] md:text-[1.18rem] font-light leading-[1.8] text-slate-900/88 mb-8 max-w-xl">
                      &quot;{t.recommendationQuote}&quot;
                    </h2>

                    <div className="pt-6 border-t border-amber-900/10">
                      <p className="text-slate-900 font-tech tracking-tight text-lg">{t.recommendationAuthor}</p>
                      <p className="text-amber-900/70 text-sm font-label mt-1">{t.recommendationRole}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal>
                <div className="rounded-[32px] border border-white/10 bg-slate-950/70 p-4 backdrop-blur-sm shadow-[0_18px_60px_rgba(2,6,23,0.28)]">
                  <div className="flex items-center justify-between gap-4 px-4 pb-4 pt-2 border-b border-white/10 mb-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-200/75">{t.recommendationPanelLabel}</p>
                      <p className="mt-2 text-[0.98rem] text-white/64 font-light leading-[1.75]">{t.recommendationHint}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-indigo-300">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                  {t.recommendationTabs.map((tab: RecommendationTab, i: number) => (
                    <div key={i} className="mb-2 last:mb-0">
                      <button
                        onClick={() => setActiveRecTab(i)}
                        onMouseEnter={() => setHoveredRecTab(i)}
                        onMouseLeave={() => setHoveredRecTab((current) => (current === i ? null : current))}
                        className={`w-full text-left px-5 py-5 rounded-[24px] transition-all duration-300 flex items-center justify-between gap-4 ${
                          activeRecTab === i ? 'bg-indigo-600/90 text-white shadow-lg' : 'text-white/70 bg-white/[0.03] hover:bg-white/8 hover:text-white border border-transparent hover:border-white/10'
                        }`}
                      >
                        <div>
                          <span className="font-bold uppercase tracking-[0.18em] text-[11px] block">{tab.label}</span>
                          <span className={`mt-2 block text-sm ${activeRecTab === i ? 'text-white/75' : 'text-white/50'}`}>
                            {activeRecTab === i ? t.recommendationExpandOpen : t.recommendationExpandClosed}
                          </span>
                        </div>
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
                            <div className="px-6 py-5 text-white/80 font-light leading-[1.8] text-[1rem] md:text-[1.05rem]">
                              {tab.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {activeRecTab !== i && hoveredRecTab === i && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -4, height: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pb-4 pt-1 text-white/54 text-[0.95rem] font-light leading-[1.75]">
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

      <footer className="py-32 text-center text-white relative overflow-hidden bg-[linear-gradient(180deg,rgba(28,33,41,0.84)_0%,rgba(27,32,39,0.9)_36%,#272e37_100%)]">
        <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px]" />
        <Reveal>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
            <p className="mb-4 text-sm text-white/58 font-light tracking-[0.02em]">{t.thankYou}</p>
            <p className="text-indigo-600 font-bold mb-4 uppercase tracking-[0.3em] text-[10px]">{t.cta}</p>
            <motion.h2
              className="text-2xl md:text-5xl font-medium tracking-tight mb-12 italic font-tech text-white hover:text-indigo-300 transition-colors cursor-pointer"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              sonmezbilge@gmail.com
            </motion.h2>
            <motion.div className="flex justify-center gap-10 mb-20" whileHover={{ opacity: 1 }} initial={{ opacity: 0.4 }} transition={{ duration: 0.3 }}>
              <motion.a href="https://linkedin.com/in/bilge-sonmez/" target="_blank" rel="noopener noreferrer" className="text-white" whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}>
                <Linkedin size={28} />
              </motion.a>
              <motion.a href="https://github.com/bsoenmez3" target="_blank" rel="noopener noreferrer" className="text-white" whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}>
                <Github size={28} />
              </motion.a>
              <motion.a href="mailto:sonmezbilge@gmail.com" className="text-white" whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}>
                <Mail size={28} />
              </motion.a>
            </motion.div>
            <motion.p className="text-[10px] font-bold tracking-[0.6em] text-white/30 uppercase" initial={{ opacity: 0 }} whileInView={{ opacity: 0.5 }} transition={{ delay: 0.3 }}>
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
              <p className="text-[1rem] md:text-[1.08rem] text-black/60 font-light leading-[1.8] mb-10 max-w-2xl">{activeProject.fullDesc}</p>
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
        <div className="text-black/55 font-light text-[1rem] md:text-[1.08rem] leading-[1.8] space-y-2">{desc}</div>
        {extras && (
          <div className="space-y-3 mt-5">
            {(Array.isArray(extras) ? extras : [extras]).map((e, i) => (
              <p key={i} className="text-black/55 font-light text-[1rem] md:text-[1.08rem] leading-[1.8] max-w-xl">
                {e}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ThesisArchitectureSection({ t }: { t: PortfolioContent }) {
  const [isZoomed, setIsZoomed] = useState(false);

  const isDe = t.eduTitle === 'Akademischer Hintergrund';
  const zoomHintText = isDe 
    ? "Klicken Sie hier, um die Architektur meiner Java-Implementierung zur Erweiterung der evidence-core-Bibliothek zu vergrößern." 
    : "Click to view the architecture blueprint of my Java implementation extending the evidence-core library.";

  return (
    <section className="py-32 bg-[linear-gradient(180deg,rgba(74,88,108,0.24)_0%,rgba(48,58,73,0.42)_34%,rgba(32,38,48,0.52)_100%)] relative overflow-hidden backdrop-blur-[1px]">
      <div className="absolute inset-0 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:30px_30px] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.14),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[rgba(32,38,48,0.12)] to-[rgba(32,38,48,0.52)] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative">

        <div className="mb-16 md:mb-20 pt-10">
          <Reveal>
            <span className="text-indigo-200 font-bold tracking-[0.4em] text-[10px] uppercase mb-4 block italic">
              {t.thesisSectionHighlight}
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 uppercase leading-none font-tech text-white max-w-3xl">
              {t.thesisSectionTitle}
            </h2>
            <p className="text-[1rem] md:text-[1.08rem] text-white/82 font-light max-w-3xl leading-[1.8]">
              {t.thesisSectionDesc}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          <div className="lg:col-span-7 w-full relative group">
            <Reveal>
              <div 
                onClick={() => setIsZoomed(true)}
                className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#dfe8f3] rounded-[32px] border border-white/10 shadow-xl overflow-hidden cursor-zoom-in group"
              >
                <Image
                  src="/images/architecture.jpg"
                  alt="Architecture Diagram"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover md:object-contain p-4 md:p-8 pb-24 md:pb-28 group-hover:scale-[1.02] transition-transform duration-700 ease-out"
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

          <div className="lg:col-span-5 w-full">
            <Reveal>
              <div className="rounded-[28px] border border-white/10 bg-slate-950/72 px-6 py-7 shadow-lg shadow-black/10">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-indigo-200/65 mb-4">
                  Thesis Focus
                </p>
                <div className="space-y-5">
                  <div>
                    <h4 className="font-bold tracking-tight font-tech text-white mb-2">{t.thesisF1Title}</h4>
                    <p className="text-white/72 font-light leading-[1.75] text-[0.98rem]">{t.thesisF1Desc}</p>
                  </div>
                  <div>
                    <h4 className="font-bold tracking-tight font-tech text-white mb-2">{t.thesisF2Title}</h4>
                    <p className="text-white/72 font-light leading-[1.75] text-[0.98rem]">{t.thesisF2Desc}</p>
                  </div>
                  <div>
                    <h4 className="font-bold tracking-tight font-tech text-white mb-2">{t.thesisF3Title}</h4>
                    <p className="text-white/72 font-light leading-[1.75] text-[0.98rem]">{t.thesisF3Desc}</p>
                  </div>
                  <div>
                    <h4 className="font-bold tracking-tight font-tech text-white mb-2">{t.thesisF4Title}</h4>
                    <p className="text-white/72 font-light leading-[1.75] text-[0.98rem]">{t.thesisF4Desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
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
                alt="Architecture Diagram Zoomed"
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