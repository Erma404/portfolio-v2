import type { CaseStudy } from "@/lib/case-studies";

// English case studies, translated from the French source (src/i18n/case-studies/fr.ts).
// Content rule: only facts confirmed by Ernestine.

export const caseStudiesEn: CaseStudy[] = [
  {
    slug: "stefcos",
    client: "Stefcos",
    title: "Stefcos, an e-commerce site with its own order back-office",
    summary:
      "Online store for a cosmetics brand for Black and mixed-race skin, built with Claude Code, plus a dashboard that replaces manual order re-entry.",
    period: "2026",
    kind: "Product builder",
    tint: "from-[#f6d9c4] via-[#e9b48f] to-[#b8743f]",
    cover: {
      src: "/img/works/stefcos/admin-dashboard.jpg",
      width: 1920,
      height: 1200,
      alt: "Stefcos admin dashboard: today's orders, revenue in FCFA and courier availability",
      frame: "browser",
    },
    meta: {
      role: "Product builder",
      period: "Dashboard delivered in April 2026",
      tools: "Claude Code, React, TypeScript, Supabase, Resend, GitHub Actions",
      team: "Me, Claude Code, the brand's assistant (main user)",
    },
    context: [
      "Stefcos is a cosmetics brand for Black and mixed-race skin, based in Lomé, Togo. The site presents the store, the brand philosophy and a journal, and takes orders online.",
      "The site was built with Claude Code and deploys automatically to GitHub Pages through GitHub Actions. An admin dashboard was added in April 2026.",
    ],
    problem: {
      intro:
        "Orders came in through WhatsApp Business. The assistant re-entered them one by one in a Google Sheet connected through Apps Script, which also tracked deliveries and couriers.",
      points: [
        "Every order was entered twice: in WhatsApp, then in the spreadsheet.",
        "Tracking lived in a tool separate from the site, with no overview of the business.",
        "No consolidated metrics: revenue, orders awaiting payment or out for delivery.",
      ],
    },
    role: [
      {
        title: "Product framing",
        text: "Defining the need, prioritizing features, designing the ordering and admin journeys.",
      },
      {
        title: "Architecture",
        text: "Choosing the stack: React and TypeScript for the front end, Supabase for authentication, database, row-level security and storage, Resend for emails.",
      },
      {
        title: "Steering Claude Code",
        text: "Writing the prompts, breaking the work down, reviewing the generated code at every step.",
      },
      {
        title: "Testing and evolution",
        text: "Functional testing before every release, then all the technical evolution of the product over time.",
      },
    ],
    approach: {
      intro:
        "AI writes the code; the product work stays the same: understand real usage, break it down, validate.",
      steps: [
        {
          title: "Observe the existing flow",
          text: "Start from the assistant's real workflow: WhatsApp, spreadsheet, couriers. The dashboard had to mirror her habits, not impose new ones.",
        },
        {
          title: "Build the store",
          text: "A site in React 18, TypeScript, Vite, React Router, Tailwind, shadcn/ui and TanStack Query, continuously deployed to GitHub Pages.",
        },
        {
          title: "Add the back-office",
          text: "Authentication, database and row-level security rules on Supabase; transactional emails with Resend.",
        },
        {
          title: "Test and iterate",
          text: "Testing before every release, then improvements for the assistant, who manages orders day to day.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/stefcos/home.jpg",
        width: 1440,
        height: 900,
        alt: "Stefcos home page: “Éclat naturel”, skincare for Black and mixed-race skin",
        frame: "browser",
        caption: "The online store",
      },
      {
        src: "/img/works/stefcos/boutique.jpg",
        width: 1440,
        height: 900,
        alt: "Stefcos catalog with category filters and prices in FCFA",
        frame: "browser",
        caption: "The catalog, filtered by category",
      },
      {
        src: "/img/works/stefcos/admin-commandes.jpg",
        width: 1920,
        height: 1200,
        alt: "Back-office Orders tab: search and filters by status, payment and period",
        frame: "browser",
        caption: "Orders: search, filters, creation and editing",
      },
      {
        src: "/img/works/stefcos/admin-coursiers.jpg",
        width: 1920,
        height: 1200,
        alt: "Couriers tab: area, availability and number of deliveries per courier",
        frame: "browser",
        caption: "Couriers and availability",
      },
    ],
    impact: {
      intro: "Order tracking now lives inside the site, in three tabs.",
      points: [
        "Key metrics and revenue in FCFA: today, this month, total, average basket.",
        "Orders: search, filters by status, payment and period, creation and editing.",
        "Couriers: area, availability and today's deliveries.",
        "No more re-entering orders in a separate spreadsheet.",
      ],
    },
    learnings: [
      "With AI, the bottleneck is no longer writing code but framing well: a vague prompt produces a vague product.",
      "A good back-office mirrors the user's existing habits before adding new ones.",
      "Owning the architecture and security (row-level rules, authentication) is still human work.",
    ],
  },
  {
    slug: "certiphy",
    client: "Certiphy",
    title: "Certiphy, a bilingual redesign built to be found",
    summary:
      "Website redesign for an anti-deepfake certification platform: designed on Lovable, shipped on WordPress to stay indexable, with an SEO audit and GEO work.",
    period: "2026",
    kind: "Product builder & project manager",
    tint: "from-[#e4f5c4] via-[#b9e36a] to-[#1f4b5a]",
    cover: {
      src: "/img/works/certiphy/home-en.jpg",
      width: 1440,
      height: 840,
      alt: "Certiphy home page: “Take back control of your creations”",
      frame: "browser",
    },
    meta: {
      role: "Product builder and project manager",
      period: "February to April 2026",
      tools: "Lovable, WordPress, SEO audit, Bing Webmaster Tools",
      team: "Me and the founder, Catherine Verdun",
    },
    context: [
      "Certiphy is a tamper-proof certification platform: it protects creative work and digital identity against deepfakes, impersonation and plagiarism. It serves creators, agencies, brands, media and photographers.",
      "The original site ran on WordPress. The goal: a new bilingual version in French and English, clearer about the offer, without losing the visibility already earned.",
    ],
    problem: {
      intro:
        "Redesigning a site means risking its search rankings. And the existing site sent mixed signals.",
      points: [
        "The product's former name, “Identisafe”, still appeared on the site.",
        "A redesign without a redirect plan breaks existing links and tanks rankings.",
        "A site rendered in the browser with React, like Lovable sites, is poorly read by Google and AI answer engines.",
      ],
    },
    role: [
      {
        title: "Design and build",
        text: "Designing the new version on Lovable, iterating quickly with the founder, then migrating it to the existing WordPress site.",
      },
      {
        title: "SEO audit",
        text: "A report delivered to the founder before the migration: page-by-page analysis, 12 strategic keywords, migration checklist and action plan.",
      },
      {
        title: "Migration",
        text: "WordPress URL structure, 301 redirect plan, on-page SEO setup, fixing naming inconsistencies.",
      },
      {
        title: "GEO",
        text: "Getting the site indexed on Bing, an index used by several AI answer engines.",
      },
    ],
    approach: {
      intro:
        "Lovable as the design workshop, WordPress as the production site.",
      steps: [
        {
          title: "Design fast on Lovable",
          text: "Iterate quickly on the new version with the founder.",
        },
        {
          title: "Hit the limit",
          text: "A Lovable site is a React app rendered in the browser: Google and AI engines barely see its content. Keeping it in production meant having a beautiful, invisible site.",
        },
        {
          title: "Move it to WordPress",
          text: "Carry the result over to the existing WordPress site, which serves directly indexable HTML, keeping the domain and the site's history.",
        },
        {
          title: "Secure the migration",
          text: "301 redirects, on-page SEO, English version, then Bing indexing.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/certiphy/home-long.jpg",
        width: 1440,
        height: 2520,
        alt: "Certiphy home page in French, from the hero to the threats and solution sections",
        frame: "browser",
        caption: "The French home page",
      },
      {
        src: "/img/works/certiphy/home-fr.jpg",
        width: 1440,
        height: 840,
        alt: "French version of the Certiphy site: “Reprenez le contrôle de vos créations”",
        frame: "browser",
        caption: "The French hero",
      },
    ],
    impact: {
      stats: [
        { value: "58 → 74", label: "SEO score out of 100" },
        { value: "12", label: "Strategic keywords targeted" },
        { value: "FR / EN", label: "Bilingual site" },
      ],
      points: [
        "Project started in February, site delivered in April.",
        "Site indexed on Bing, so readable by several AI answer engines.",
        "Domain and site history preserved.",
      ],
    },
    learnings: [
      "A prototyping tool isn't necessarily a production tool: choosing a stack also means checking it can be indexed.",
      "SEO is prepared before the migration, not after: the audit and redirect plan are part of the framing.",
      "GEO starts with simple basics: being indexed where AI engines look.",
    ],
  },
  {
    slug: "hello-bank",
    client: "Hello bank!",
    title:
      "Hello bank!, from the Orange Bank migration to an anti-churn program",
    summary:
      "Product Owner at Hello bank! (BNP Paribas): 5 projects in 3 years, from migrating Orange Bank customers to integrating an e-invoicing tool, in Agile SAFe.",
    period: "2023 – 2026",
    kind: "Product Owner / Product Manager",
    tint: "from-[#dfe6ff] via-[#8fa3f5] to-[#1d3ec9]",
    cover: {
      src: "/img/works/hello-bank/app-cartes.avif",
      width: 1560,
      height: 1515,
      alt: "Hello bank! app: checking account and Hello Prime card",
      frame: "plain",
    },
    meta: {
      role: "Product Owner / Product Manager",
      period: "2023 – 2026",
      tools: "Agile SAFe, Adobe Analytics, Contentsquare, AEM, A/B testing",
      team: "BNP POs (savings, credit, trading), data team, CRO Lead, IT, Compliance, Legal",
    },
    context: [
      "Hello bank! is the 100% mobile bank of the BNP Paribas group. I was Product Owner / Product Manager there from 2023 to 2026, on the logged-in customer area, on mobile and web.",
      "5 projects in 3 years, from moving customers to the app to integrating business tools, on a technical platform shared by BNP Paribas and Hello bank!.",
    ],
    problem: {
      intro:
        "Three challenges followed one another: welcoming Orange Bank's customers, keeping them, and meeting a new regulatory obligation.",
      points: [
        "Orange Bank migration: 100,000 customers lost, including 80,000 closures linked to the migration.",
        "A dormancy problem around the €180 bonus.",
        "The e-invoicing obligation to meet by September 2026.",
      ],
    },
    role: [
      {
        title: "Migration lead",
        text: "App-only migration journey from Orange Bank to Hello bank! delivered in 3 months, from vision to production, reporting to the steering and executive committees.",
      },
      {
        title: "Backlog in Agile SAFe",
        text: "Backlog prioritization on the shared BNP/Hello bank! platform, paired with the BNP savings, credit and trading POs.",
      },
      {
        title: "Compliance",
        text: "Integrating an e-invoicing tool with partner OneUp, coordinating IT, Compliance and Legal.",
      },
      {
        title: "Anti-churn program",
        text: "In-app nudges and A/B tests with the data team and the CRO Lead, tracking engagement and churn KPIs.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Frame the migration",
          text: "Vision, scope and planning of the app-only journey, approved by the steering then executive committee.",
        },
        {
          title: "Prioritize in SAFe",
          text: "A backlog shared with the BNP POs to move forward on a common platform without blocking each other.",
        },
        {
          title: "Understand the departures",
          text: "Cross field feedback (support, advisors) with data from Adobe Analytics and Contentsquare.",
        },
        {
          title: "Design and test",
          text: "In-app nudges and redesigned journeys, validated through A/B tests with the data team.",
        },
        {
          title: "Secure compliance",
          text: "E-invoicing integrated with OneUp ahead of the regulatory deadline, with IT, Compliance and Legal.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/hello-bank/compte.avif",
        width: 494,
        height: 1000,
        alt: "Checking account screen in the Hello bank! app",
        frame: "plain",
        caption: "The logged-in customer area",
      },
      {
        src: "/img/works/hello-bank/offre-prime.avif",
        width: 952,
        height: 1186,
        alt: "Hello Prime offer shown in the app",
        frame: "plain",
        caption: "Personalized nudge: the Hello Prime offer",
      },
    ],
    impact: {
      stats: [
        { value: "+20%", label: "Conversion" },
        { value: "+100K", label: "New customers" },
        { value: "+10%", label: "App engagement" },
        { value: "-20%", label: "Customer service contacts" },
      ],
      points: [
        "App-only migration delivered in 3 months.",
        "Churn steadily decreasing thanks to nudges and A/B tests.",
        "Stronger collaboration between UX, data, CRO, IT and Compliance.",
      ],
    },
    learnings: [
      "Churn is fixed in the journeys as much as in the offers.",
      "On a shared platform, pairing with the other POs matters as much as the backlog itself.",
      "A regulatory deadline is run like a product: framing, milestones, testing.",
    ],
  },
  {
    slug: "catenda",
    client: "Catenda",
    title: "Catenda, a multilingual website for a construction SaaS",
    summary:
      "New visual identity and multilingual website for a SaaS publisher of BIM collaboration software.",
    period: "2023",
    kind: "Digital project manager",
    tint: "from-[#d9f7df] via-[#8fdca0] to-[#14532d]",
    cover: {
      src: "/img/works/catenda/site-open-way.avif",
      width: 2048,
      height: 1087,
      alt: "Catenda website: “the open way”, new visual identity",
      frame: "plain",
    },
    meta: {
      role: "Digital project manager",
      period: "June 2023",
      tools: "",
      team: "",
    },
    context: [
      "Catenda publishes a SaaS platform for BIM collaboration in construction: everyone on a project shares and comments on the building's digital models.",
      "The project covered web design, a new visual identity and a multilingual website (catenda.com/fr).",
    ],
    problem: {
      intro:
        "Presenting a technical product to varied audiences, in several languages, with a refreshed visual identity.",
    },
    role: [
      {
        title: "Framing",
        text: "Gathering requirements and defining the scope: pages, languages, templates.",
      },
      {
        title: "Web design",
        text: "Web design of the site, based on the new visual identity.",
      },
      {
        title: "Project management",
        text: "Planning, coordinating design, development and the client, tracking approvals.",
      },
      {
        title: "Multilingual site and testing",
        text: "Setting up the multilingual site, including the French version, and testing before launch.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Frame",
          text: "Align scope, languages and planning with the client.",
        },
        {
          title: "Apply the identity",
          text: "Roll out the new identity: colors, typography, tone.",
        },
        {
          title: "Build the multilingual site",
          text: "Organize content and language versions.",
        },
        {
          title: "Test and ship",
          text: "Check every version before going live.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/catenda/site-collaborate.avif",
        width: 2880,
        height: 1528,
        alt: "Catenda “Collaborate with models” page",
        frame: "plain",
        caption: "Showcasing collaboration around models",
      },
      {
        src: "/img/works/catenda/laptop.avif",
        width: 779,
        height: 456,
        alt: "Catenda platform on a laptop",
        frame: "plain",
        caption: "The platform on desktop",
      },
      {
        src: "/img/works/catenda/mobile.avif",
        width: 2160,
        height: 2160,
        alt: "Catenda mobile app",
        frame: "plain",
        caption: "And on mobile",
      },
    ],
    impact: {
      points: [
        "A refreshed, consistent visual identity across the whole site.",
        "A multilingual site delivered, including the French version.",
      ],
    },
    learnings: [
      "A technical product sells better shown than explained: product visuals carry the message.",
      "In a multilingual project, lock the site map before translating, not after.",
    ],
  },
  {
    slug: "saint-gobain",
    client: "Saint-Gobain",
    title: "Saint-Gobain, redesigning a corporate website",
    summary:
      "Full redesign of the corporate website: 130+ pages and 20+ custom WordPress templates, from framing to launch.",
    period: "2022",
    kind: "Digital project manager",
    tint: "from-[#e1e8f5] via-[#9fb3d9] to-[#2b3f6b]",
    cover: {
      src: "/img/works/saint-gobain/tablette.avif",
      width: 1110,
      height: 820,
      alt: "New Saint-Gobain website shown on a tablet",
      frame: "photo",
    },
    meta: {
      role: "Digital project manager",
      period: "January 2022",
      tools: "WordPress, ACF, Monday.com, Microsoft Teams",
      team: "Product Designer, developers, business units",
    },
    context: [
      "A full redesign of Saint-Gobain's corporate website, serving several audiences: B2B, B2C and partners.",
      "Goals: modernize the site, improve navigation and strengthen the brand identity.",
    ],
    problem: {
      intro:
        "A corporate site has to speak to very different audiences without any of them getting lost.",
      points: [
        "130+ pages to organize into a readable architecture.",
        "Content owned by several business units.",
        "Varied layout needs, covered by reusable templates.",
      ],
    },
    role: [
      {
        title: "Requirements gathering",
        text: "Workshops with the business units.",
      },
      {
        title: "Architecture and wireframes",
        text: "Site map of 130+ pages and wireframes done by me, then UI mockups by the Product Designer.",
      },
      {
        title: "Project management",
        text: "Planning and tracking on Monday.com, coordinating developers, weekly steering meetings with the client on Teams.",
      },
      {
        title: "Acceptance testing",
        text: "Functional testing of the templates and content validation before launch.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Frame",
          text: "Workshops with the business units to list each audience's needs.",
        },
        {
          title: "Structure",
          text: "Full site map and wireframes for the key templates.",
        },
        {
          title: "Build",
          text: "20+ custom templates developed with WordPress and ACF.",
        },
        {
          title: "Test and ship",
          text: "Testing every template, validating content, going live.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/saint-gobain/sitemap.png",
        width: 2254,
        height: 1150,
        alt: "Saint-Gobain site map: home, products and solutions, innovation, careers, media, sustainability",
        frame: "plain",
        caption: "The 130+ page site map",
      },
      {
        src: "/img/works/saint-gobain/laptop-actualites.webp",
        width: 1112,
        height: 820,
        alt: "Saint-Gobain group news page on a laptop",
        frame: "photo",
        caption: "Group news",
      },
      {
        src: "/img/works/saint-gobain/mobile-chantier.webp",
        width: 1108,
        height: 832,
        alt: "Insights section of the Saint-Gobain site on a smartphone, on a construction site",
        frame: "photo",
        caption: "The Insights section on mobile",
      },
      {
        src: "/img/works/saint-gobain/mobile-insights.webp",
        width: 1108,
        height: 826,
        alt: "Construction professional browsing the Saint-Gobain site on her phone",
        frame: "photo",
        caption: "A site built for professionals, in the field too",
      },
    ],
    impact: {
      stats: [
        { value: "130+", label: "Pages in the new architecture" },
        { value: "20+", label: "Custom templates" },
      ],
      points: [
        "A modernized site, with navigation designed around each audience.",
        "Reusable templates for future pages.",
      ],
    },
    learnings: [
      "On a 130-page site, the site map is the real deliverable: everything else follows from it.",
      "Short weekly steering meetings prevent big surprises during testing.",
    ],
  },
  {
    slug: "orange-money",
    client: "Orange Money",
    title: "Orange Money, a digital strategy across 4 markets",
    summary:
      "Digital strategy consultant and business analyst (AMOA): defined and rolled out Orange Money's digital strategy from scratch across 4 high-growth markets in Africa and the Middle East.",
    period: "2017 – 2020",
    kind: "Business analyst (AMOA)",
    tint: "from-[#ffe2c7] via-[#ff9a4d] to-[#e8590c]",
    cover: {
      src: "/img/works/orange-money/campagne.avif",
      width: 2048,
      height: 2048,
      alt: "Orange Money Africa campaign: 0 FCFA on transfers with the app",
      frame: "plain",
    },
    meta: {
      role: "Digital strategy consultant / Business analyst (AMOA)",
      period: "2017 – 2020",
      tools: "",
      team: "About 60 people: Marketing, IT, Compliance, partner operators and local teams",
    },
    context: [
      "Orange Money is the Orange group's mobile payment service, present in more than 26 countries. I worked as a digital strategy consultant and business analyst (AMOA) for the Digital Strategy Department.",
      "The mission: define and roll out Orange Money's digital strategy from scratch across 4 high-growth markets in Africa and the Middle East.",
    ],
    problem: {
      intro:
        "Launching a mobile payment service in 4 countries means handling 4 regulatory frameworks, 4 partner ecosystems and as many local teams.",
      points: [
        "Regulatory compliance specific to each market.",
        "Partner operators and local teams to coordinate, market by market.",
        "End-to-end digital journeys to design: acquisition, transfers, top-ups.",
      ],
    },
    role: [
      {
        title: "Digital strategy",
        text: "Defined and rolled out Orange Money's digital strategy from scratch across 4 markets.",
      },
      {
        title: "Business framing",
        text: "Gathered requirements with Marketing, IT and Compliance, and handled each market's regulatory compliance.",
      },
      {
        title: "Journeys and acquisition",
        text: "Designed end-to-end digital journeys (acquisition, transfers, top-ups), landing pages and SEO campaigns per market.",
      },
      {
        title: "Delivery and governance",
        text: "Coordinated partner operators and local teams, acceptance testing, performance KPIs and executive committee reporting.",
      },
    ],
    approach: {
      steps: [
        {
          title: "Frame market by market",
          text: "Business needs, regulatory constraints and partner operators, country by country.",
        },
        {
          title: "Design the journeys",
          text: "Acquisition, transfers and top-ups designed end to end, adapted to each market.",
        },
        {
          title: "Roll out",
          text: "Coordinating local teams and operators through launch.",
        },
        {
          title: "Measure and decide",
          text: "Acceptance testing, performance KPIs and executive committee decisions.",
        },
      ],
    },
    gallery: [
      {
        src: "/img/works/orange-money/app.avif",
        width: 323,
        height: 389,
        alt: "Orange Money app: balance and latest transactions",
        frame: "plain",
        caption: "The Orange Money app",
      },
      {
        src: "/img/works/orange-money/onboarding.avif",
        width: 1034,
        height: 776,
        alt: "Welcome screens of the Orange Money app",
        frame: "plain",
        caption: "Onboarding in the app",
      },
    ],
    impact: {
      stats: [
        { value: "4", label: "Markets launched in 12 months" },
        { value: "+30%", label: "Revenue vs prior year" },
        { value: "26", label: "Countries where the group operates" },
      ],
      points: [
        "Launched in 4 high-growth markets within 12 months.",
        "+30% revenue compared with the previous year.",
        "Structured governance: acceptance testing, performance KPIs and executive reporting.",
      ],
    },
    learnings: [
      "A multi-country rollout is won market by market: same product, different framing.",
      "Bringing Compliance in at the framing stage avoids rebuilding journeys later.",
    ],
  },
];
