import type { CaseStudy } from "@/lib/case-studies";

// French case studies. Content rule: only facts confirmed by Ernestine.

export const caseStudiesFr: CaseStudy[] = [
  {
    slug: "stefcos",
    client: "Stefcos",
    title: "Stefcos, un e-commerce avec son back-office de commandes",
    summary:
      "Boutique en ligne d'une marque de cosmétiques pour peaux noires et métissées, construite avec Claude Code, et tableau de bord qui remplace la ressaisie manuelle des commandes.",
    period: "2026",
    kind: "Product builder",
    tint: "from-[#f6d9c4] via-[#e9b48f] to-[#b8743f]",
    cover: {
      src: "/img/works/stefcos/admin-dashboard.jpg",
      width: 1920,
      height: 1200,
      alt: "Tableau de bord d'administration Stefcos : commandes du jour, chiffre d'affaires en FCFA et disponibilité des coursiers",
      frame: "browser",
    },
    meta: {
      role: "Product builder",
      period: "Tableau de bord livré en avril 2026",
      tools: "Claude Code, React, TypeScript, Supabase, Resend, GitHub Actions",
      team: "Moi, Claude Code, l'assistante de la marque (utilisatrice principale)",
    },
    context: [
      "Stefcos est une marque de cosmétiques pour peaux noires et métissées, basée à Lomé. Le site présente la boutique, la philosophie de la marque et un journal, et prend les commandes en ligne.",
      "Le site a été construit avec Claude Code et se déploie automatiquement sur GitHub Pages via GitHub Actions. Un tableau de bord d'administration s'y est ajouté en avril 2026.",
    ],
    problem: {
      intro:
        "Les commandes arrivaient par WhatsApp Business. L'assistante les ressaisissait une à une dans un Google Sheet relié par Apps Script, qui servait aussi au suivi des livraisons et des coursiers.",
      points: [
        "Chaque commande était saisie deux fois : dans WhatsApp, puis dans le tableur.",
        "Le suivi vivait dans un outil séparé du site, sans vue d'ensemble de l'activité.",
        "Aucun indicateur consolidé : chiffre d'affaires, commandes en attente de paiement ou en livraison.",
      ],
    },
    role: [
      {
        title: "Cadrage produit",
        text: "Définition du besoin, priorisation des fonctionnalités, parcours de commande et d'administration.",
      },
      {
        title: "Architecture",
        text: "Choix de la stack : React et TypeScript pour le front, Supabase pour l'authentification, la base de données, la sécurité par ligne et le stockage, Resend pour les emails.",
      },
      {
        title: "Pilotage de Claude Code",
        text: "Rédaction des prompts, découpage du travail, revue du code généré à chaque étape.",
      },
      {
        title: "Recette et évolution",
        text: "Tests fonctionnels avant chaque mise en ligne, puis toute l'évolution technique du produit dans la durée.",
      },
    ],
    approach: {
      intro:
        "L'IA génère le code ; le travail produit reste le même : comprendre l'usage réel, découper, valider.",
      steps: [
        {
          title: "Observer le flux existant",
          text: "Partir du circuit réel de l'assistante : WhatsApp, tableur, coursiers. Le tableau de bord devait reprendre ses gestes, pas en imposer de nouveaux.",
        },
        {
          title: "Construire la boutique",
          text: "Site en React 18, TypeScript, Vite, React Router, Tailwind, shadcn/ui et TanStack Query, déployé en continu sur GitHub Pages.",
        },
        {
          title: "Ajouter le back-office",
          text: "Authentification, base de données et règles de sécurité par ligne sur Supabase ; emails transactionnels avec Resend.",
        },
        {
          title: "Recetter et faire évoluer",
          text: "Recette avant chaque mise en ligne, puis évolutions pour l'assistante, qui gère les commandes au quotidien.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/stefcos/home.jpg",
        width: 1440,
        height: 900,
        alt: "Page d'accueil Stefcos : « Éclat naturel », soins pour peaux noires et métissées",
        frame: "browser",
        caption: "La boutique en ligne",
      },
      {
        src: "/img/works/stefcos/boutique.jpg",
        width: 1440,
        height: 900,
        alt: "Catalogue Stefcos avec filtres par catégorie et prix en FCFA",
        frame: "browser",
        caption: "Le catalogue, filtré par catégorie",
      },
      {
        src: "/img/works/stefcos/admin-commandes.jpg",
        width: 1920,
        height: 1200,
        alt: "Onglet Commandes du back-office : recherche, filtres par statut, paiement et période",
        frame: "browser",
        caption: "Commandes : recherche, filtres, création et modification",
      },
      {
        src: "/img/works/stefcos/admin-coursiers.jpg",
        width: 1920,
        height: 1200,
        alt: "Onglet Coursiers : zone, disponibilité et nombre de livraisons par coursier",
        frame: "browser",
        caption: "Coursiers et disponibilités",
      },
    ],
    impact: {
      intro:
        "Le suivi des commandes vit désormais dans le site, en trois onglets.",
      points: [
        "Indicateurs clés et chiffre d'affaires en FCFA : du jour, du mois, total, panier moyen.",
        "Commandes : recherche, filtres par statut, paiement et période, création et modification.",
        "Coursiers : zone, disponibilité et livraisons du jour.",
        "Fin de la ressaisie dans un tableur séparé.",
      ],
    },
    learnings: [
      "Avec l'IA, le goulot d'étranglement n'est plus d'écrire le code mais de bien cadrer : un prompt vague produit un produit vague.",
      "Un back-office réussi reprend les gestes existants de l'utilisatrice avant d'en ajouter.",
      "Garder la main sur l'architecture et la sécurité (règles par ligne, authentification) reste un travail humain.",
    ],
  },
  {
    slug: "certiphy",
    client: "Certiphy",
    title: "Certiphy, une refonte bilingue pensée pour être trouvée",
    summary:
      "Refonte du site d'une plateforme de certification anti-deepfake : conçue sur Lovable, livrée sur WordPress pour rester indexable, avec un audit SEO et un travail GEO.",
    period: "2026",
    kind: "Product builder & chef de projet",
    tint: "from-[#e4f5c4] via-[#b9e36a] to-[#1f4b5a]",
    cover: {
      src: "/img/works/certiphy/home-fr.jpg",
      width: 1440,
      height: 840,
      alt: "Page d'accueil Certiphy : « Reprenez le contrôle de vos créations »",
      frame: "browser",
    },
    meta: {
      role: "Product builder et chef de projet",
      period: "Février à avril 2026",
      tools: "Lovable, WordPress, audit SEO, Bing Webmaster Tools",
      team: "Moi et la fondatrice, Catherine Verdun",
    },
    context: [
      "Certiphy est une plateforme de certification infalsifiable : elle protège les créations et l'identité numérique contre les deepfakes, l'usurpation et le plagiat. Elle s'adresse aux créateurs, agences, marques, médias et photographes.",
      "Le site d'origine tournait sur WordPress. Objectif : une nouvelle version bilingue français et anglais, plus claire sur l'offre, sans perdre la visibilité acquise.",
    ],
    problem: {
      intro:
        "Refaire un site, c'est risquer de perdre son référencement. Et le site existant envoyait des signaux incohérents.",
      points: [
        "L'ancien nom du produit, « Identisafe », apparaissait encore sur le site.",
        "Une refonte sans plan de redirections casse les liens existants et fait chuter le référencement.",
        "Un site construit en React côté navigateur, comme ceux de Lovable, est mal lu par Google et par les moteurs de réponse IA.",
      ],
    },
    role: [
      {
        title: "Conception et build",
        text: "Conception de la nouvelle version sur Lovable, itérations rapides avec la fondatrice, puis migration sur le WordPress existant.",
      },
      {
        title: "Audit SEO",
        text: "Rapport remis à la fondatrice avant migration : analyse page par page, 12 mots-clés stratégiques, checklist de migration et plan d'action.",
      },
      {
        title: "Migration",
        text: "Architecture des URLs WordPress, plan de redirections 301, configuration SEO on-page, correction des incohérences de nom.",
      },
      {
        title: "GEO",
        text: "Indexation du site sur Bing, un index utilisé par plusieurs moteurs de réponse IA.",
      },
    ],
    approach: {
      intro:
        "Lovable comme atelier de conception, WordPress comme site de production.",
      steps: [
        {
          title: "Concevoir vite sur Lovable",
          text: "Itérer rapidement sur la nouvelle version avec la fondatrice.",
        },
        {
          title: "Constater la limite",
          text: "Un site Lovable est une application React affichée dans le navigateur : Google et les moteurs IA en voient très mal le contenu. Le garder en production, c'était avoir un beau site invisible.",
        },
        {
          title: "Reporter sur WordPress",
          text: "Reporter le résultat sur le WordPress existant, qui sert du HTML directement indexable, en conservant le domaine et l'historique du site.",
        },
        {
          title: "Sécuriser la migration",
          text: "Redirections 301, SEO on-page, version anglaise, puis indexation sur Bing.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/certiphy/home-long.jpg",
        width: 1440,
        height: 2520,
        alt: "Page d'accueil Certiphy en français, du hero à la section menaces et solution",
        frame: "browser",
        caption: "La page d'accueil en français",
      },
      {
        src: "/img/works/certiphy/home-en.jpg",
        width: 1440,
        height: 840,
        alt: "Version anglaise du site Certiphy : « Take back control of your creations »",
        frame: "browser",
        caption: "La version anglaise",
      },
    ],
    impact: {
      stats: [
        { value: "58 → 74", label: "Score SEO sur 100" },
        { value: "12", label: "Mots-clés stratégiques ciblés" },
        { value: "FR / EN", label: "Site bilingue" },
      ],
      points: [
        "Projet lancé en février, site livré en avril.",
        "Site indexé sur Bing, donc lisible par plusieurs moteurs de réponse IA.",
        "Domaine et historique du site conservés.",
      ],
    },
    learnings: [
      "Un outil de prototypage n'est pas forcément un outil de production : le choix de la stack se juge aussi à l'indexabilité.",
      "Le SEO se prépare avant la migration, pas après : l'audit et le plan de redirections font partie du cadrage.",
      "Le GEO commence par des bases simples : être indexé là où les moteurs IA vont chercher.",
    ],
  },
  {
    slug: "hello-bank",
    client: "Hello bank!",
    title: "Hello bank!, réduire le churn par les parcours",
    summary:
      "Product Owner / Product Manager sur l'espace client de la banque mobile de BNP Paribas : programme anti-churn, tests A/B et refonte du Hub Découvrir.",
    period: "2023 – 2026",
    kind: "Product Owner / Product Manager",
    tint: "from-[#dfe6ff] via-[#8fa3f5] to-[#1d3ec9]",
    cover: {
      src: "/img/works/hello-bank/app-cartes.avif",
      width: 1560,
      height: 1515,
      alt: "Application Hello bank! : compte de chèque et carte Hello Prime",
      frame: "plain",
    },
    meta: {
      role: "Product Owner / Product Manager",
      period: "2023 – 2026",
      tools: "Adobe Analytics, Contentsquare, AEM, tests A/B",
      team: "Product designers, développeurs, CRO Lead, équipes relation client",
    },
    context: [
      "Hello bank! est la banque 100 % mobile du groupe BNP Paribas. J'y étais Product Owner / Product Manager sur l'espace client connecté, sur le mobile et le web.",
      "Ma mission principale : réduire le départ des clients grâce à des parcours plus intelligents et des incitations personnalisées.",
    ],
    problem: {
      intro: "La banque faisait face à une vague de départs.",
      points: [
        "100 000 clients perdus, dont 80 000 clôtures liées à la migration Orange Bank.",
        "Un problème de dormance autour de la prime de 180 €.",
      ],
    },
    role: [
      {
        title: "Discovery",
        text: "Entretiens avec les stakeholders (COO, conseillers relation client, support) et ateliers pour cartographier les points de friction.",
      },
      {
        title: "Stratégie et roadmap",
        text: "Roadmap du programme anti-churn, priorisation des fonctionnalités à fort impact, alignement des initiatives CRO avec les guidelines UX.",
      },
      {
        title: "Co-design",
        text: "Ateliers avec les product designers pour construire des parcours stratégiques, comme le parcours de clôture de compte intelligent.",
      },
      {
        title: "Delivery et mesure",
        text: "User stories, coordination des équipes design, dev et CRO ; tests A/B avec le CRO Lead et suivi des KPIs.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Comprendre les départs",
          text: "Croiser les retours du terrain (support, conseillers) avec les données d'Adobe Analytics et de Contentsquare.",
        },
        {
          title: "Prioriser",
          text: "Roadmap anti-churn centrée sur les leviers à plus fort impact : clôture, dormance, engagement.",
        },
        {
          title: "Concevoir et tester",
          text: "Incitations personnalisées sur mobile et web, parcours de clôture repensé, validés par des tests A/B.",
        },
        {
          title: "Refondre le Hub Découvrir",
          text: "Refonte du Hub Découvrir de l'espace client.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/hello-bank/compte.avif",
        width: 494,
        height: 1000,
        alt: "Écran compte de chèque de l'application Hello bank!",
        frame: "plain",
        caption: "L'espace client connecté",
      },
      {
        src: "/img/works/hello-bank/offre-prime.avif",
        width: 952,
        height: 1186,
        alt: "Offre Hello Prime affichée dans l'application",
        frame: "plain",
        caption: "Incitation personnalisée : l'offre Hello Prime",
      },
    ],
    impact: {
      stats: [
        { value: "-20 %", label: "Sollicitations du service client après livraison" },
      ],
      points: [
        "Meilleure rétention grâce aux incitations mobile et web.",
        "Collaboration renforcée entre UX, acquisition et CRO.",
        "Un cadre UX réutilisable pour les parcours suivants.",
      ],
    },
    learnings: [
      "Le churn se traite dans les parcours autant que dans les offres.",
      "Les équipes support voient les frictions avant les dashboards : les écouter tôt fait gagner des sprints.",
      "Un test A/B bien posé tranche les débats plus vite qu'une réunion.",
    ],
  },
  {
    slug: "catenda",
    client: "Catenda",
    title: "Catenda, un site multilingue pour un SaaS du BTP",
    summary:
      "Nouvelle charte graphique et site multilingue pour un éditeur SaaS de collaboration BIM.",
    period: "2023",
    kind: "Chef de projet digital",
    tint: "from-[#d9f7df] via-[#8fdca0] to-[#14532d]",
    cover: {
      src: "/img/works/catenda/site-open-way.avif",
      width: 2048,
      height: 1087,
      alt: "Site Catenda : « the open way », nouvelle charte graphique",
      frame: "plain",
    },
    meta: {
      role: "Chef de projet digital",
      period: "Juin 2023",
      tools: "",
      team: "",
    },
    context: [
      "Catenda édite une plateforme SaaS de collaboration BIM pour le BTP : les acteurs d'un chantier partagent et commentent les maquettes numériques du bâtiment.",
      "Le projet portait sur le web design, une nouvelle charte graphique et un site multilingue (catenda.com/fr).",
    ],
    role: [
      {
        title: "Web design",
        text: "Web design du site, sur la base de la nouvelle charte graphique.",
      },
      {
        title: "Site multilingue",
        text: "Mise en place d'un site multilingue, dont la version française (catenda.com/fr).",
      },
    ],
    gallery: [
      {
        src: "/img/works/catenda/site-collaborate.avif",
        width: 2880,
        height: 1528,
        alt: "Page Catenda « Collaborate with models »",
        frame: "plain",
        caption: "Mettre en avant la collaboration autour des maquettes",
      },
      {
        src: "/img/works/catenda/laptop.avif",
        width: 779,
        height: 456,
        alt: "Plateforme Catenda sur ordinateur portable",
        frame: "plain",
        caption: "La plateforme sur ordinateur",
      },
      {
        src: "/img/works/catenda/mobile.avif",
        width: 2160,
        height: 2160,
        alt: "Application mobile Catenda",
        frame: "plain",
        caption: "Et sur mobile",
      },
    ],
  },
  {
    slug: "saint-gobain",
    client: "Saint-Gobain",
    title: "Saint-Gobain, la refonte d'un site corporate",
    summary:
      "Refonte complète du site corporate : plus de 130 pages et plus de 20 templates sur mesure sous WordPress, du cadrage à la mise en ligne.",
    period: "2022",
    kind: "Chef de projet digital",
    tint: "from-[#e1e8f5] via-[#9fb3d9] to-[#2b3f6b]",
    cover: {
      src: "/img/works/saint-gobain/tablette.avif",
      width: 1110,
      height: 820,
      alt: "Nouveau site Saint-Gobain affiché sur une tablette",
      frame: "photo",
    },
    meta: {
      role: "Chef de projet digital",
      period: "Janvier 2022",
      tools: "WordPress, ACF, Monday.com, Microsoft Teams",
      team: "Product Designer, développeurs, business units",
    },
    context: [
      "Refonte complète du site corporate de Saint-Gobain, avec plusieurs publics à servir : B2B, B2C et partenaires.",
      "Objectifs : moderniser le site, améliorer la navigation et renforcer l'identité de marque.",
    ],
    problem: {
      intro:
        "Un site corporate doit parler à des publics très différents sans que chacun s'y perde.",
      points: [
        "Plus de 130 pages à organiser dans une architecture lisible.",
        "Des contenus portés par plusieurs business units.",
        "Des besoins de mise en page variés, couverts par des templates réutilisables.",
      ],
    },
    role: [
      {
        title: "Recueil des besoins",
        text: "Ateliers avec les business units.",
      },
      {
        title: "Architecture et wireframes",
        text: "Arborescence de plus de 130 pages et wireframes réalisés par moi, puis maquettes UI par le Product Designer.",
      },
      {
        title: "Pilotage",
        text: "Planning et suivi sur Monday.com, coordination des développeurs, comités hebdomadaires avec le client sur Teams.",
      },
      {
        title: "Recette",
        text: "Recette fonctionnelle des templates et validation des contenus avant la mise en ligne.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Cadrer",
          text: "Ateliers avec les business units pour recenser les besoins de chaque public.",
        },
        {
          title: "Structurer",
          text: "Arborescence complète et wireframes des gabarits clés.",
        },
        {
          title: "Produire",
          text: "Plus de 20 templates sur mesure développés sous WordPress et ACF.",
        },
        {
          title: "Recetter et livrer",
          text: "Recette de chaque template, validation des contenus, mise en ligne.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/saint-gobain/sitemap.png",
        width: 2254,
        height: 1150,
        alt: "Arborescence du site Saint-Gobain : accueil, produits et solutions, innovation, carrières, médias, développement durable",
        frame: "plain",
        caption: "L'arborescence de plus de 130 pages",
      },
      {
        src: "/img/works/saint-gobain/laptop-actualites.webp",
        width: 1112,
        height: 820,
        alt: "Page des actualités du groupe Saint-Gobain sur ordinateur portable",
        frame: "photo",
        caption: "Les actualités du groupe",
      },
      {
        src: "/img/works/saint-gobain/mobile-chantier.webp",
        width: 1108,
        height: 832,
        alt: "Rubrique Insights du site Saint-Gobain sur smartphone, sur un chantier",
        frame: "photo",
        caption: "La rubrique Insights sur mobile",
      },
      {
        src: "/img/works/saint-gobain/mobile-insights.webp",
        width: 1108,
        height: 826,
        alt: "Professionnelle du BTP consultant le site Saint-Gobain sur son téléphone",
        frame: "photo",
        caption: "Un site pensé pour les professionnels, aussi sur le terrain",
      },
    ],
    impact: {
      stats: [
        { value: "130+", label: "Pages dans la nouvelle architecture" },
        { value: "20+", label: "Templates sur mesure" },
      ],
      points: [
        "Un site modernisé, avec une navigation pensée par public.",
        "Des templates réutilisables pour les futures pages.",
      ],
    },
    learnings: [
      "Sur un site de 130 pages, l'arborescence est le vrai livrable : tout le reste en découle.",
      "Des comités hebdomadaires courts évitent les grosses surprises en recette.",
    ],
  },
  {
    slug: "orange-money",
    client: "Orange Money",
    title: "Orange Money, l'acquisition digitale en Afrique de l'Ouest",
    summary:
      "AMOA à la Direction Stratégie Digitale : landing pages, SEO, parcours d'acquisition et gouvernance CODIR, au sein d'une équipe d'environ 60 personnes.",
    period: "2018",
    kind: "AMOA",
    tint: "from-[#ffe2c7] via-[#ff9a4d] to-[#e8590c]",
    cover: {
      src: "/img/works/orange-money/campagne.avif",
      width: 2048,
      height: 2048,
      alt: "Campagne Orange Money Afrique : 0 FCFA sur vos envois avec l'application",
      frame: "plain",
    },
    meta: {
      role: "AMOA, Direction Stratégie Digitale",
      period: "2018",
      tools: "",
      team: "Équipe d'environ 60 personnes",
    },
    context: [
      "Orange Money est le service de paiement mobile d'Orange en Afrique. J'intervenais en AMOA auprès de la Direction Stratégie Digitale, sur la stratégie digitale et l'acquisition en Afrique de l'Ouest.",
    ],
    role: [
      {
        title: "Acquisition",
        text: "Landing pages et parcours d'acquisition de l'application.",
      },
      {
        title: "SEO",
        text: "Visibilité des pages Orange Money dans les moteurs de recherche.",
      },
      {
        title: "Gouvernance",
        text: "Préparation et suivi des arbitrages en CODIR.",
      },
    ],
    gallery: [
      {
        src: "/img/works/orange-money/app.avif",
        width: 323,
        height: 389,
        alt: "Application Orange Money : solde et dernières opérations",
        frame: "plain",
        caption: "L'application Orange Money",
      },
      {
        src: "/img/works/orange-money/onboarding.avif",
        width: 1034,
        height: 776,
        alt: "Écrans d'accueil de l'application Orange Money",
        frame: "plain",
        caption: "Parcours d'accueil dans l'application",
      },
    ],
  },
];
