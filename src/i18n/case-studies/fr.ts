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
    title: "Hello bank!, de la migration Orange Bank au programme anti-churn",
    summary:
      "Product Owner chez Hello bank! (BNP Paribas)\u00a0: 5 projets en 3 ans, de la migration des clients Orange Bank à l'intégration d'un outil de facturation électronique, en Agile SAFe.",
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
      tools: "Agile SAFe, Adobe Analytics, Contentsquare, AEM, tests A/B",
      team: "POs BNP (épargne, crédit, bourse), équipe data, CRO Lead, IT, Compliance, Legal",
    },
    context: [
      "Hello bank! est la banque 100 % mobile du groupe BNP Paribas. J'y ai été Product Owner / Product Manager de 2023 à 2026, sur l'espace client connecté, sur le mobile et le web.",
      "5 projets en 3 ans, de la migration des clients vers l'application jusqu'à l'intégration d'outils métier, sur un socle technique commun à BNP Paribas et Hello bank!.",
    ],
    problem: {
      intro:
        "Trois enjeux se sont succédé\u00a0: accueillir les clients d'Orange Bank, les garder, et tenir une nouvelle obligation réglementaire.",
      points: [
        "Migration Orange Bank\u00a0: 100 000 clients perdus, dont 80 000 clôtures liées à la migration.",
        "Un problème de dormance autour de la prime de 180 €.",
        "L'obligation de facturation électronique à tenir pour septembre 2026.",
      ],
    },
    role: [
      {
        title: "Pilotage de la migration",
        text: "Parcours app-only de migration Orange Bank → Hello bank! piloté en 3 mois, de la vision à la mise en production, avec reporting au COPIL et au CODIR.",
      },
      {
        title: "Backlog en Agile SAFe",
        text: "Priorisation du backlog sur le socle technique commun BNP/Hello bank!, en binôme avec les POs BNP épargne, crédit et bourse.",
      },
      {
        title: "Conformité",
        text: "Intégration d'un outil de facturation électronique avec le partenaire OneUp, en coordination avec l'IT, la Compliance et le Legal.",
      },
      {
        title: "Programme anti-churn",
        text: "Nudges in-app et tests A/B avec l'équipe data et le CRO Lead, suivi des KPIs d'engagement et de churn.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Cadrer la migration",
          text: "Vision, découpage et planning du parcours app-only, validés en COPIL puis en CODIR.",
        },
        {
          title: "Prioriser en SAFe",
          text: "Un backlog partagé avec les POs BNP pour avancer sur un socle technique commun sans se bloquer.",
        },
        {
          title: "Comprendre les départs",
          text: "Croiser les retours du terrain (support, conseillers) avec les données d'Adobe Analytics et de Contentsquare.",
        },
        {
          title: "Concevoir et tester",
          text: "Nudges in-app et parcours repensés, validés par des tests A/B avec l'équipe data.",
        },
        {
          title: "Sécuriser la conformité",
          text: "Facturation électronique intégrée avec OneUp avant l'échéance réglementaire, avec l'IT, la Compliance et le Legal.",
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
        { value: "+20\u00a0%", label: "Conversion" },
        { value: "+100K", label: "Nouveaux clients" },
        { value: "+10\u00a0%", label: "Engagement sur l'app" },
        { value: "-20\u00a0%", label: "Sollicitations du service client" },
      ],
      points: [
        "Migration app-only livrée en 3 mois.",
        "Churn en baisse constante grâce aux nudges et aux tests A/B.",
        "Collaboration renforcée entre UX, data, CRO, IT et Compliance.",
      ],
    },
    learnings: [
      "Le churn se traite dans les parcours autant que dans les offres.",
      "Sur un socle partagé, le binôme avec les autres POs compte autant que le backlog lui-même.",
      "Une échéance réglementaire se pilote comme un produit\u00a0: cadrage, jalons, recette.",
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
      "Catenda édite une plateforme SaaS de collaboration BIM pour le BTP\u00a0: les acteurs d'un chantier partagent et commentent les maquettes numériques du bâtiment.",
      "Le projet portait sur le web design, une nouvelle charte graphique et un site multilingue (catenda.com/fr).",
    ],
    problem: {
      intro:
        "Présenter un produit technique à des publics variés, dans plusieurs langues, avec une identité visuelle renouvelée.",
    },
    role: [
      {
        title: "Cadrage",
        text: "Recueil des besoins et définition du périmètre\u00a0: pages, langues, gabarits.",
      },
      {
        title: "Web design",
        text: "Web design du site, sur la base de la nouvelle charte graphique.",
      },
      {
        title: "Pilotage",
        text: "Planning, coordination entre design, développement et client, suivi des validations.",
      },
      {
        title: "Site multilingue et recette",
        text: "Mise en place du site multilingue, dont la version française, et recette avant mise en ligne.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Cadrer",
          text: "Aligner le périmètre, les langues et le planning avec le client.",
        },
        {
          title: "Décliner la charte",
          text: "Appliquer la nouvelle identité : couleurs, typographies, ton.",
        },
        {
          title: "Produire le multilingue",
          text: "Organiser les contenus et les versions linguistiques.",
        },
        {
          title: "Recetter et livrer",
          text: "Vérifier chaque version avant la mise en ligne.",
        },
      ],
    },
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
    impact: {
      points: [
        "Une identité visuelle renouvelée et cohérente sur tout le site.",
        "Un site multilingue livré, dont la version française.",
      ],
    },
    learnings: [
      "Un produit technique se vend mieux montré qu'expliqué\u00a0: les visuels produit portent le message.",
      "En multilingue, on fige l'arborescence avant de traduire, pas après.",
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
    title: "Orange Money, une stratégie digitale sur 4 marchés",
    summary:
      "Consultante stratégie digitale et AMOA\u00a0: définition et déploiement from scratch de la stratégie digitale d'Orange Money sur 4 marchés à forte croissance, en Afrique et au Moyen-Orient.",
    period: "2017 – 2020",
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
      role: "Consultante stratégie digitale / AMOA",
      period: "2017 – 2020",
      tools: "",
      team: "Environ 60 personnes\u00a0: Marketing, IT, Compliance, opérateurs partenaires et équipes locales",
    },
    context: [
      "Orange Money est le service de paiement mobile du groupe Orange, présent dans plus de 26 pays. J'intervenais comme consultante en stratégie digitale et AMOA auprès de la Direction Stratégie Digitale.",
      "Mission\u00a0: définir et déployer from scratch la stratégie digitale d'Orange Money sur 4 marchés à forte croissance, en Afrique et au Moyen-Orient.",
    ],
    problem: {
      intro:
        "Lancer un service de paiement mobile dans 4 pays, c'est tenir 4 cadres réglementaires, 4 écosystèmes de partenaires et autant d'équipes locales.",
      points: [
        "Une conformité réglementaire propre à chaque marché.",
        "Des opérateurs partenaires et des équipes locales à coordonner, marché par marché.",
        "Des parcours digitaux à concevoir de bout en bout\u00a0: acquisition, virement, recharge.",
      ],
    },
    role: [
      {
        title: "Stratégie digitale",
        text: "Définition et déploiement from scratch de la stratégie digitale d'Orange Money sur 4 marchés.",
      },
      {
        title: "Cadrage métier",
        text: "Recueil des besoins avec le Marketing, l'IT et la Compliance, et conformité réglementaire propre à chaque marché.",
      },
      {
        title: "Parcours et acquisition",
        text: "Conception des parcours digitaux end-to-end (acquisition, virement, recharge), landing pages et pilotage des campagnes SEO par marché.",
      },
      {
        title: "Pilotage et gouvernance",
        text: "Coordination des opérateurs partenaires et des équipes locales, recette, suivi des KPIs de performance et reporting au CODIR.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Cadrer marché par marché",
          text: "Besoins métier, contraintes réglementaires et partenaires opérateurs, pays par pays.",
        },
        {
          title: "Concevoir les parcours",
          text: "Acquisition, virement et recharge pensés de bout en bout, déclinés pour chaque marché.",
        },
        {
          title: "Déployer",
          text: "Coordination des équipes locales et des opérateurs jusqu'au lancement.",
        },
        {
          title: "Mesurer et arbitrer",
          text: "Recette, KPIs de performance et arbitrages en CODIR.",
        },
      ],
    },
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
    impact: {
      stats: [
        { value: "4", label: "Marchés lancés en 12 mois" },
        { value: "+30\u00a0%", label: "Chiffre d'affaires vs N-1" },
        { value: "26", label: "Pays où le groupe est présent" },
      ],
      points: [
        "Lancement sur 4 marchés à forte croissance en 12 mois.",
        "+30\u00a0% de chiffre d'affaires par rapport à l'année précédente.",
        "Une gouvernance outillée\u00a0: recette, KPIs de performance et reporting CODIR.",
      ],
    },
    learnings: [
      "Un déploiement multi-pays se gagne marché par marché\u00a0: même produit, cadrages différents.",
      "Impliquer la Compliance dès le cadrage évite de reconstruire les parcours après coup.",
    ],
  },
];
