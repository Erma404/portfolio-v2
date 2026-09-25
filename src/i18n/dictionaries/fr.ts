import type { Dictionary } from "./en";

// Terms from the product world (Backlog, Roadmap, Discovery, Delivery, stakeholders,
// KPIs, A/B testing…) stay in English on purpose: French POs use them as-is.

export const fr: Dictionary = {
  meta: {
    title: "Ernestine Matjabo — Product Manager / Product Owner",
    description:
      "Je conçois des produits digitaux avec stratégie, empathie et impact. Senior Product Manager / Product Owner basée à Paris, disponible partout dans le monde.",
  },

  nav: {
    home: "Accueil",
    work: "Projets",
    about: "À propos",
    cta: "Parlons-en",
    switchTo: "English version",
  },

  hero: {
    name: "Ernestine",
    fullName: "Ernestine Matjabo",
    status: "Disponible",
    titleStart: "Je",
    titleEnd: "des produits qui ont de l'impact",
    pitch:
      "Senior Product Manager avec plus de 10 ans d'expérience dans la création de produits SaaS et grands comptes intégrant l'IA. Je transforme des processus complexes en expériences digitales intuitives et évolutives.",
    badgeWords: [
      { text: "découvre", color: "#F5824F" },
      { text: "construis", color: "#A39EF9" },
      { text: "livre", color: "#5EF956" },
    ],
    doodleHint: "Dessinez ici",
  },

  doodle: {
    select: "Sélection",
    pencil: "Crayon",
    clear: "Tout effacer",
    text: "Texte",
    color: "Changer de couleur",
    undo: "Annuler",
    redo: "Rétablir",
    textPlaceholder: "Écrivez ici…",
  },

  expertise: [
    "Stratégie produit",
    "Roadmap",
    "A/B testing",
    "Recherche utilisateur",
    "Agile / SAFe",
    "Gestion des stakeholders",
    "Priorisation du backlog",
    "Décisions data-driven",
  ],

  whatIDo: {
    eyebrow: "Ce que je fais",
    title: "Comment je donne vie à votre vision produit.",
    nextSlide: "Diapositive suivante",
    services: [
      {
        icon: "target",
        title: "Stratégie produit",
        description:
          "Définir une vision et une roadmap claires, qui équilibrent besoins utilisateurs et résultats business mesurables.",
      },
      {
        icon: "search",
        title: "Discovery et recherche UX",
        description:
          "Entretiens utilisateurs, tests et analyse de données pour repérer les vrais points de friction avant de construire.",
      },
      {
        icon: "flask",
        title: "A/B testing",
        description:
          "Concevoir des expériences, lire les données et transformer les résultats en décisions produit assumées.",
      },
      {
        icon: "briefcase",
        title: "Conseil",
        description:
          "Accompagnement indépendant de grands groupes, PME et startups en Europe et en Afrique : audits, ateliers et appui opérationnel pour débloquer les équipes produit.",
      },
      {
        icon: "loop",
        title: "Delivery agile",
        description:
          "Piloter les sprints et les équipes pluridisciplinaires pour livrer de la valeur par itérations, sans perdre la vue d'ensemble.",
      },
      {
        icon: "people",
        title: "Gestion des stakeholders",
        description:
          "Aligner direction, designers et développeurs sur des priorités communes et une même définition du « terminé ».",
      },
      {
        icon: "bulb",
        title: "Transformation digitale",
        description:
          "Conseiller grands groupes, PME et startups sur leur stratégie digitale, de l'audit à la mise en œuvre.",
      },
      {
        icon: "list",
        title: "Backlog et roadmap",
        description:
          "Prioriser sans concession avec des frameworks comme RICE et MoSCoW pour garder la delivery centrée sur l'impact.",
      },
    ],
  },

  work: {
    eyebrow: "Portfolio",
    title: "Projets choisis",
    viewCase: "Voir le case study",
    more: "Tous les case studies",
  },

  toolsShowcase: {
    eyebrow: "Expertise",
    title: "Je maîtrise les outils qui comptent.",
    logos: ["planner", "jira", "figma", "claude", "contentsquare", "framer"],
    featured: [
      {
        icon: "planner",
        name: "Microsoft Planner",
        color: "#31752F",
        description:
          "Suivi des tâches et des sprints entre équipes, du grooming du backlog aux checklists de mise en production et aux daily.",
      },
      {
        icon: "jira",
        name: "Jira",
        color: "#0052CC",
        description:
          "Planification agile, priorisation du backlog et exécution des sprints sur chaque produit que je livre.",
      },
      {
        icon: "figma",
        name: "Figma",
        color: "#F24E1E",
        description:
          "Relire les parcours, commenter et collaborer directement dans les fichiers de design avec les équipes produit et design.",
      },
      {
        icon: "claude",
        name: "Claude",
        color: "#D97757",
        description:
          "Recherche, rédaction et réflexion produit assistées par l'IA, du brouillon de user story à la synthèse des notes de discovery.",
      },
    ],
  },

  about: {
    eyebrow: "À propos",
    craft: {
      title: "Savoir-faire produit",
      items: [
        { icon: "target", label: "Vision produit" },
        { icon: "search", label: "Discovery" },
        { icon: "map", label: "Roadmap" },
        { icon: "layers", label: "Backlog" },
        { icon: "flask", label: "A/B testing" },
        { icon: "chart", label: "KPIs" },
      ],
    },
    philosophy: {
      title: "Ma posture",
      quote:
        "Je ne pilote pas pour contrôler. Je pilote pour débloquer, aligner et livrer.",
    },
    experience: {
      eyebrow: "Expérience",
      value: "10+",
      label: "ans",
      title: "Des produits qui ont de l'impact",
      description:
        "Vision produit, roadmap et priorisation du backlog : j'arbitre entre besoins utilisateurs et objectifs business mesurables.",
    },
    collaboration: {
      eyebrow: "Collaboration",
      title: "Équipes pluridisciplinaires",
      description:
        "Je fédère design, tech et stakeholders, en France comme à l'international, autour d'objectifs partagés.",
      withLabel: "Avec",
      and: "et",
      roles: [
        { label: "Design", color: "#A39EF9" },
        { label: "Tech", color: "#5EF956" },
      ],
    },
    clients: {
      value: "30+",
      label: "Clients",
      description:
        "Banque, SaaS, paiement mobile et industrie, de la startup au grand groupe.",
    },
    languagesTitle: "Langues",
    languages: [
      { name: "Français", level: 100, label: "Langue maternelle" },
      { name: "Anglais", level: 85, label: "Bilingue" },
      { name: "Espagnol", level: 25, label: "Débutante" },
    ],
    processTitle: "Ma démarche",
    process: [
      { step: "01", title: "Discovery" },
      { step: "02", title: "Cadrage" },
      { step: "03", title: "Delivery" },
      { step: "04", title: "Mesure" },
      { step: "05", title: "Itération" },
    ],
  },

  testimonials: {
    title: "Témoignages",
    headline: "Des produits qui livrent, partout",
    subtitle:
      "Des startups aux grands groupes, un impact concret sur quatre continents.",
    countries: [
      { code: "US", name: "États-Unis", x: 12, y: 28 },
      { code: "FR", name: "France", x: 36, y: 14 },
      { code: "CH", name: "Suisse", x: 64, y: 14 },
      { code: "IN", name: "Inde", x: 88, y: 28 },
      { code: "TG", name: "Togo", x: 18, y: 74 },
      { code: "KE", name: "Kenya", x: 82, y: 72 },
    ],
    // Quotes are kept in the language they were given in.
    items: [
      {
        quote:
          "Working with Ernestine has always been inspiring. She has a rare ability to turn complex business requirements into clear and user-friendly journeys. Her rigor, organizational skills, and ability to listen make her an outstanding project manager who knows how to bring a team together around common goals.",
        author: "Anthony C.",
        role: "SEO Director @ Chanel",
      },
      {
        quote:
          "What I appreciate most about Ernestine is her global vision of projects. She can speak both the technical and business languages, which smooths communication between all stakeholders. Thanks to her, projects move forward efficiently and with a great sense of calm.",
        author: "Damien",
        role: "CEO @ Stefcos",
      },
      {
        quote:
          "The redesign of our website was a large-scale project, with over 130 pages and more than 20 custom templates developed in WordPress. Ernestine managed the entire process, from scoping to launch, ensuring deadlines were met while maintaining outstanding quality. A smooth, professional, and highly effective collaboration.",
        author: "Cédric M.",
        role: "Marketing Director",
      },
    ],
  },

  faq: {
    title: "Questions fréquentes",
    intro:
      "Mon parcours, ma façon de travailler et mes disponibilités, en quelques réponses.",
    items: [
      {
        question: "Quelle est votre expérience de Product Owner dans la banque digitale ?",
        answer:
          "J'ai été Product Owner / Product Manager chez Hello bank! de 2023 à 2026, où j'ai piloté le parcours de banque digitale, de la définition de la roadmap jusqu'à la livraison des features, en conciliant contraintes réglementaires, faisabilité technique et expérience client.",
      },
      {
        question: "Comment abordez-vous la discovery et la recherche utilisateur ?",
        answer:
          "Je croise le qualitatif (entretiens utilisateurs, ateliers) et le quantitatif (analytics, A/B tests) pour identifier les vrais points de friction, puis je traduis ces insights en une roadmap priorisée et testable.",
      },
      {
        question: "Dans quels secteurs avez-vous travaillé comme Product Manager ou consultante ?",
        answer:
          "Banque digitale, paiement mobile, plateformes SaaS, construction et industrie, éducation, auprès de grands groupes, de PME et de startups en Europe, en Afrique et au-delà.",
      },
      {
        question: "Quelles sont vos compétences clés en Product Management ?",
        answer:
          "Vision produit et roadmap, priorisation du backlog, animation d'équipes pluridisciplinaires, recherche utilisateur et alignement des stakeholders, avec toujours le même cap : équilibrer besoins utilisateurs et valeur business mesurable.",
      },
      {
        question: "Êtes-vous ouverte aux opportunités à l'international ?",
        answer:
          "Oui. Je suis basée à Paris et ouverte aux postes en remote ou sur site partout dans le monde, ainsi qu'aux missions de conseil en Europe et en Afrique.",
      },
    ],
  },

  contact: {
    title: "Envie de faire grandir votre produit ?",
    text: "Que vous lanciez un nouveau produit ou que vous fassiez évoluer un produit existant, je peux vous aider. Parlez-moi de votre projet, je reviens vers vous sous 48 h.",
    email: "ernestinemtb@gmail.com",
    linkedin: "https://www.linkedin.com/in/ernestinematjabo",
    whatsapp: "",
    form: {
      name: "Nom",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "Votre email professionnel",
      subject: "Objet",
      subjectPlaceholder: "Objet",
      message: "Message",
      messagePlaceholder: "Écrivez votre message ici",
      submit: "Envoyer via WhatsApp",
      sent: "WhatsApp s'est ouvert avec votre message, il ne reste qu'à l'envoyer.",
      unavailable: "WhatsApp est indisponible pour le moment, écrivez-moi à",
      greeting: "Bonjour Ernestine,",
      subjectLine: "Objet",
    },
  },

  footer: {
    words: ["Construisons", "Imaginons", "Lançons"],
    tagline: "ensemble des produits qui comptent.",
    badge: "• Disponible • Pour vos projets ",
    badgeLabel: "Disponible pour vos projets, m'écrire par email",
    navLabel: "Pied de page",
    links: [
      { label: "Accueil", href: "/" },
      { label: "Projets", href: "/works" },
      { label: "À propos", href: "/about" },
    ],
  },

  aboutPage: {
    metaTitle: "À propos — Ernestine Matjabo",
    metaDescription:
      "Ernestine Matjabo, Product Manager / Product Owner basée à Paris\u00a0: parcours, expériences et façon de travailler.",
    tagName: "Ernestine",
    tagRole: "Product Manager",
    portraitAlt: "Portrait en noir et blanc d'Ernestine Matjabo",
    title: "Bonjour, moi c'est Ernestine.",
    lead: "Product Manager, je transforme des besoins business complexes en produits digitaux clairs et utiles.",
    body: "J'ai construit mon parcours au croisement de la banque digitale, du product management et de l'entrepreneuriat. De la création de ma propre initiative EdTech au pilotage produit dans une grande banque européenne, chaque étape a façonné ma manière d'équilibrer besoins utilisateurs et objectifs business.",
    cta: "Travaillons ensemble",
    stats: [
      { value: "10+", label: "Années d'expérience" },
      { value: "30+", label: "Clients" },
      { value: "4", label: "Continents" },
      { value: "6", label: "Secteurs explorés" },
    ],
    journeyTitle: "Mon parcours",
    journey: [
      {
        marker: "2026",
        period: "2026",
        role: "Product builder et chef de projet",
        org: "Stefcos · Certiphy",
        text: "Livraison d'un e-commerce et de son back-office de commandes, construits avec Claude Code, et d'une refonte de site bilingue prête pour le SEO et la recherche par IA.",
      },
      {
        marker: "2023",
        period: "2023 – 2026",
        role: "Product Owner / Product Manager",
        org: "Hello bank! · BNP Paribas",
        text: "Pilotage du programme anti-churn de l'espace client, de la discovery aux tests A/B\u00a0: -20\u00a0% de sollicitations du service client après livraison.",
      },
      {
        marker: "2022",
        period: "2022 – 2023",
        role: "Chef de projet digital",
        org: "Tactee",
        text: "Pilotage de projets web corporate et SaaS, du cadrage à la mise en ligne\u00a0: ateliers, arborescences, planning, coordination des développeurs et recette.",
      },
      {
        marker: "2018",
        period: "2018",
        role: "AMOA",
        org: "Orange Money",
        text: "Stratégie digitale et acquisition en Afrique de l'Ouest pour la Direction Stratégie Digitale\u00a0: landing pages, SEO et gouvernance CODIR.",
      },
      {
        marker: "2017",
        period: "2017 – 2021",
        role: "Consultante digitale",
        org: "Freelance",
        text: "Accompagnement de grands groupes, PME et startups en Europe et en Afrique sur leur transformation digitale, leur visibilité et leur acquisition.",
      },
      {
        marker: "2017",
        period: "2017 – 2020",
        role: "Fondatrice",
        org: "Eko Education",
        text: "Lancement d'une initiative EdTech et de sa stratégie de croissance digitale\u00a0: branding, campagnes et acquisition.",
      },
    ],
  },

  works: {
    eyebrow: "Case studies",
    title: "Des produits livrés, du cadrage à la mise en ligne.",
    text: "Banque digitale, paiement mobile, SaaS, e-commerce : une sélection de projets où j'ai porté la vision produit, piloté la livraison et mesuré l'impact.",
    metaTitle: "Case studies — Ernestine Matjabo",
    back: "Tous les projets",
    labels: {
      role: "Rôle",
      period: "Période",
      tools: "Outils",
      team: "Équipe",
      context: "Contexte",
      problem: "Le problème",
      myRole: "Mon rôle",
      approach: "Démarche",
      gallery: "Réalisations",
      impact: "Impact",
      learnings: "Enseignements",
      others: "Autres case studies",
      caseStudy: "Case study",
    },
  },
};
