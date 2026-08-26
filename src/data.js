/* =========================================================
   PORTFOLIO DATA. Valentinus
   ========================================================= */

export const PROFILE = {
  name: 'Valentinus Javier Darren Sebastian',
  bio: 'I\'m a computing graduate from the University of Greenwich, building at the intersection of product thinking and technical delivery. Originally from Indonesia, now based in London; I design and build software that is legible to every stakeholder in the room.',
  location: 'London, UK',
  availability: 'Open to graduate roles, 2026',
  languages: 'Indonesian (Native) · English (Professional) · Mandarin Chinese (HSK 3) · Hokkien (Conversational)',
  context: 'When I\'m not shipping, I\'m coordinating professional events at Deloitte\'s community network, sketching interface ideas in Figma, or reading about decision systems and behavioural economics.',
}

export const EDUCATION = [
  {
    degree: 'BSc (Hons) Computing',
    institution: 'University of Greenwich',
    location: 'London, UK',
    year: '2025 – 2026',
    distinction: 'First Class (Predicted)',
  },
  {
    degree: 'BTEC Higher National Diploma in Computing',
    institution: 'UniSadhuGuna International College',
    location: 'Tangerang, Indonesia',
    year: '2023 – 2025',
    distinction: 'Summa Cum Laude · GPA 4.0 · Valedictorian & Best Graduate',
  },
]

export const EXPERIENCE = [
  {
    label: 'Community & Events',
    role: 'Event Logistics & Social Media Coordinator',
    org: 'Deloitte Professional Community',
    dates: '2025 – Present',
    location: 'London, UK',
    bullets: [
      'Coordinating end-to-end logistics for professional development events, managing timelines and stakeholder expectations across concurrent workstreams',
      'Scheduling and producing social media content to grow engagement across the Deloitte Professional Community network',
      'Building relationships with senior professionals across consulting and finance sectors in London',
    ],
  },
  {
    label: 'Professional',
    role: 'IoT Developer',
    org: 'PT Persita Tangerang Raya',
    dates: '2025',
    location: 'Tangerang, Indonesia',
    bullets: [
      'Built a real-time smart waste monitoring system using Arduino C++ and 3 ultrasonic sensors, automating bin capacity tracking and eliminating manual inspection cycles entirely',
      'Engineered threshold-based alert logic that replaced periodic manual checks with sub-second automated notifications',
      'Delivered as a working prototype, demonstrated live to municipal stakeholders',
    ],
  },
  {
    label: 'Professional',
    role: 'Web Developer',
    org: 'PT Citra Sukses Ekapratama',
    dates: '2025',
    location: 'Indonesia',
    bullets: [
      'Developed and deployed a production-ready Shopify e-commerce platform supporting 40+ product listings with full payment gateway integration',
      'Redesigned navigation and information architecture across 6 pages, improving cross-device usability on both desktop and mobile',
      'Managed full project lifecycle: discovery, design, build, and client handover',
    ],
  },
]

export const SKILLS = [
  { cat: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'React Native', 'Vite'] },
  { cat: 'Backend', items: ['Node.js', 'Python', 'Express', 'REST APIs', 'JWT Auth'] },
  { cat: 'Data', items: ['PostgreSQL', 'Oracle SQL', 'Data Modelling'] },
  { cat: 'Design', items: ['Figma', 'Wireframing', 'Information Architecture', 'User-Centred Design'] },
  { cat: 'AI / ML', items: ['Gemini API', 'LLM Integration', 'Prompt Engineering'] },
  { cat: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Agile', 'DSDM', 'MoSCoW', 'Jira', 'Notion'] },
]

/* ---------------------------------------------------------
   FEATURED PROJECTS, full case study data
   --------------------------------------------------------- */

export const PROJECTS = [
  {
    num: '01',
    slug: 'toss',
    name: 'Toss',
    kind: 'Final Year Project · University of Greenwich',
    context: {
      desc: 'AI web app that closes the gap between "I have ingredients" and "I know what to cook". Submitted as a core MVP inside a fixed 126-hour final year project timebox, then carried past the deadline into the deployed product running today',
      type: 'Final Year Project · DSDM Agile · MVP shipped, then extended post-submission',
      year: '2025',
      team: 'Solo',
    },
    role: {
      title: 'Full-Stack Developer & Product Designer',
      responsibilities: [
        'Sole developer and designer: system architecture through to pixel-level UI. Every Must and Should requirement shipped inside a fixed 126-hour DSDM timebox with no scope slip',
        'Ran MoSCoW prioritisation across 6 timeboxes, turning the food waste problem into a backlog with measurable acceptance criteria, and deliberately deferred 2 Won’t features rather than let scope drift',
        'Evaluated the build against Nielsen’s 10 usability heuristics and benchmarked against 2 established recipe apps, then kept going after submission, rebuilding both the input and recommendation models in response to what that evaluation exposed',
      ],
      decisions: [
        'Ranked by expiry rather than keyword relevance; the product had to act on the decision to cook, not the recipe lookup, so the ingredient closest to spoiling drives everything downstream',
        'Shipped a single recommendation in the MVP to kill choice paralysis, then replaced it after evaluation showed the opposite failure: with nothing to compare against, one suggestion reads as arbitrary rather than confident. The deployed product offers three, each pre-assigned a role, so the user picks a posture instead of auditing a list',
        'Collapsed structured ingredient entry into one natural-language field backed by voice and camera capture: the cost of telling the system what you have, not the size of the recipe corpus, was what stood between a full fridge and a decision',
      ],
    },
    strategic: {
      lead: 'UK households waste £730 worth of food per year, not because they buy too much, but because they can\'t decide what to make with what they already have. Toss attacks the decision gap, not the shopping list.',
      stats: [
        { n: '126h', c: 'Full product delivered within fixed DSDM timebox: all Must and Should requirements shipped, 2 Won\'t features deferred by design' },
        { n: '6', c: 'MoSCoW-managed timeboxes: zero requirement scope creep across the full development cycle' },
        { n: '3', c: 'Ranked suggestions per session, each pre-assigned a role (most urgent, balanced, stretch) so the choice stays bounded' },
      ],
    },
    process: [
      { n: '01', title: 'Discover', desc: 'Framed the problem as decision friction rather than recipe discovery, through competitive benchmarking against 2 established recipe apps and structured user interviews. The gap was never a lack of recipes; it was the moment of standing at an open fridge with no answer' },
      { n: '02', title: 'Define', desc: 'Applied MoSCoW across ingredient capture, recommendation output and expiry ranking as the algorithm’s primary sort key. Wrote functional and non-functional requirements with measurable acceptance criteria so "done" was arguable against evidence, not taste' },
      { n: '03', title: 'Build', desc: '6 DSDM timeboxes inside a fixed 126-hour window. All Must and Should requirements shipped on schedule; 2 Won’t features deferred as a deliberate product call, not a missed deadline' },
      { n: '04', title: 'Validate', desc: 'Evaluated against Nielsen’s 10 usability heuristics. The most useful finding worked against my own design: a single recommendation did remove choice paralysis, but with nothing to compare it to, users had no way to judge whether the system had actually understood them' },
      { n: '05', title: 'Extend', desc: 'Carried the product past the submission deadline and acted on that finding. Rebuilt the output as three role-labelled options, collapsed ingredient capture into a single natural-language field with voice and photo input, and added an explicit transparency layer' },
      { n: '06', title: 'Ship', desc: 'Deployed to production and still live. The MVP proved the thesis under a hard constraint; the deployed version is what the evaluation said it needed to become' },
    ],
    interface: {
      intro: 'The MVP bet everything on removing choice. The deployed product makes a sharper bet: keep the decision small, but never make it opaque. The system still does the ranking; it just shows its working, and lets you argue with it in plain English.',
      features: [
        {
          n: 'UX / 01',
          title: 'Ingredient capture that costs nothing',
          desc: 'One free-text field that takes how people actually talk ("half a courgette, some leftover chickpeas"), with voice and camera capture beside it and one-tap chips for everything already in your pantry. Structured multi-step entry was the MVP approach; it turned out to be the tax that stopped people using it at all.',
          ux: 'Friction removed at the door',
          endpoints: [
            { m: 'POST', p: '/api/pantry/items', c: 'parse' },
            { m: 'GET', p: '/api/pantry', c: 'expiry sort' },
          ],
          note: 'Everything captured lands in one pantry banded by urgency (<b>within 72h</b>, this week, long-keep), and that banding is the sort key the recommender reads from.',
        },
        {
          n: 'UX / 02',
          title: 'Three options, three roles',
          desc: 'Not a ranked list to evaluate: three suggestions with the comparison already done. Most Urgent, Balanced Pick, Stretch Cook, each quantified by how much of your pantry it uses and how many expiring items it rescues. The user picks a posture for the evening; the system still picks the recipe.',
          ux: 'One decision, not twelve',
          endpoints: [
            { m: 'POST', p: '/api/recipes/generate', c: 'Gemini' },
            { m: 'POST', p: '/api/recipes/refine', c: 'Gemini' },
          ],
          note: 'Google <b>Gemini 2.5 Flash</b> with expiry-prioritised prompting. Three is deliberate, enough to make the recommendation feel reasoned rather than arbitrary, few enough that comparing them is not a task.',
        },
        {
          n: 'UX / 03',
          title: 'Showing the model’s working',
          desc: 'Every generated recipe carries an explicit AI transparency notice, tags each ingredient as yours or model-added, and will state in plain language which expiring items it prioritised and why. If the answer is wrong you refine it by saying so: "make it vegetarian", or "use less butter".',
          ux: 'Trust made checkable',
          endpoints: [
            { m: 'GET', p: '/api/recipes/:id', c: 'rationale' },
            { m: 'POST', p: '/api/recipes/:id/save', c: 'saved' },
          ],
          note: 'This layer exists because of the heuristic evaluation, not in spite of it. The fix for "why should I believe this?" was never a better recipe, it was a visible reason.',
        },
      ],
    },
    visuals: [
      { label: 'Pantry dashboard', alt: 'Toss home dashboard: a personalised greeting names the two ingredients closest to expiry, alongside a pantry count, an expiring-within-72h badge, and "Tonight\'s Big Three" ranked recipe cards labelled Most Urgent, Balanced Pick and Stretch Cook', src: '/projects/toss/dashboard.webp' },
      { label: 'Tonight\'s Big Three', alt: 'The three ranked suggestions, each carrying a plain-English rationale and “Uses 8 from pantry / Saves 2 expiring” badges, above a natural-language input that also accepts voice and camera entry plus one-tap pantry chips', src: '/projects/toss/big-three.webp' },
      { label: 'Recipe detail', alt: 'Generated recipe with an explicit AI Transparency Notice and every ingredient tagged as either “Your ingredient” or “AI added”, so the user can always see what the model introduced versus what they already had', src: '/projects/toss/recipe-detail.webp' },
      { label: 'Why this recipe', alt: 'The reasoning panel expanded: the system states which expiring items it prioritised and why, followed by controls to regenerate or refine the recipe in plain language', src: '/projects/toss/why-this-recipe.webp' },
      { label: 'Expiry-sorted pantry', alt: 'Pantry sorted by what to use first, with counts split across 72-hour, this-week and long-keep bands, a “Use these soon” rescue prompt that seeds a generation, and per-item days-left chips', src: '/projects/toss/pantry.webp' },
      { label: 'Expiry timeline & preferences', alt: 'The weekly expiry timeline beside the optional preferences panel expanded: cuisine style, ingredient exclusions, cooking confidence and a strict pantry-only toggle, all collapsed by default', src: '/projects/toss/expiry-preferences.webp' },
    ],
    architecture: {
      build: 'live',
      manifestLabel: 'stack manifest',
      rows: [
        { k: 'Frontend', v: '<span class="tk">React 18</span> · <span class="tk">Vite</span> · <span class="tk">CSS3</span>: responsive, component-driven UI' },
        { k: 'Backend', v: '<span class="tk">Node.js</span> · <span class="tk">Express</span> · REST API · <span class="tk">JWT</span> Bearer token auth' },
        { k: 'AI Layer', v: '<span class="tk">Google Gemini 2.5 Flash</span> · expiry-prioritised prompt engineering' },
        { k: 'Data', v: '<span class="tk">PostgreSQL</span> · recipe corpus · user pantry schema' },
        { k: 'Schema', v: 'users · pantry_items · recipes · expiry_dates <span class="cm">(fk: user_id)</span>' },
        { k: 'Methodology', v: '<span class="tk">DSDM</span> · 6 timeboxes · <span class="tk">MoSCoW</span> · 126h fixed window' },
      ],
      links: [
        { label: 'Source ↗', href: 'https://github.com/vjdarren' },
        { label: 'Live Demo ↗', href: 'https://toss-psi.vercel.app/' },
      ],
    },
    reflection: {
      worked: 'The DSDM timebox did more for the product than for the schedule. A hard 126 hours forced MoSCoW to be honest, and deferring 2 Won’t features was cheaper than half-building them. The expiry-first ranking was the right core bet; it survived every later rewrite untouched.',
      differently: 'I built before I validated. All of the input handling was finished before I had evidence about what capture actually cost people, and the recommendation model was settled before heuristic evaluation told me a lone suggestion reads as arbitrary. Both findings arrived late enough that acting on them meant rebuilding after submission rather than iterating inside a timebox. I would now spend an early timebox on evaluation and treat its output as a requirement.',
      next: 'Mobile-first rebuild with a shared household pantry, so the person who buys the food and the person who cooks it are looking at the same list. Impact tracking that reports items rescued and spend recovered per week; the product currently asks users to take the food waste benefit on faith. Longer term, supermarket loyalty integration to seed the pantry automatically and remove the last of the input cost.',
    },
  },
  {
    num: '02',
    slug: 'bookaro',
    name: 'Bookaro',
    kind: 'HCI Coursework · University of Greenwich',
    context: {
      desc: 'Evidence-based HCI design of a gamified reading app for children aged 6–10 that turns reading into an interactive quest using progress tracking, mascot feedback, and reward-based challenges',
      type: 'Academic · COMP1649 Human-Computer Interaction',
      year: '2025–2026',
      team: 'Solo',
    },
    role: {
      title: 'UX Researcher & Interaction Designer',
      responsibilities: [
        'Conducted an annotated literature review of 6 peer-reviewed HCI and educational technology papers, grounding every design decision in empirical evidence rather than assumption',
        'Designed and prototyped a complete mid-fidelity interaction model in Axure RP 11 across 9 screens, applying Norman\'s 5 design principles systematically throughout the interface',
        'Proposed and designed a mixed-methods A/B research study to validate the core hypothesis: that emotional mascot feedback and visible progress indicators significantly improve reading motivation in children',
      ],
      decisions: [
        'Delayed badge reward animation by one second after quiz completion. Testing revealed that immediate pop-ups short-circuited the sense of achievement; the deliberate pause created a more emotionally satisfying transition aligned with emotional interaction design principles (Bai et al., 2022)',
        'Simplified bottom navigation from 7 to 4 elements after internal review revealed that icon density was increasing cognitive load for the target age group, a direct application of Norman\'s constraints principle',
      ],
    },
    strategic: {
      lead: 'National Literacy Trust data shows a consistent decline in reading for pleasure among children, with digital entertainment competing for the same attention window. Bookaro reframes the problem: reading isn\'t failing because books are boring, it\'s failing because the digital reading experience doesn\'t meet children where they are.',
      stats: [
        { n: '6', c: 'Peer-reviewed papers: evidence base across gamification, HCI, and educational technology' },
        { n: '9', c: 'Screens: fully interactive Axure RP 11 mid-fidelity prototype covering the complete user journey from splash to reward' },
        { n: '5', c: 'Norman design principles applied and documented across every screen: visibility, feedback, constraints, consistency, affordance' },
      ],
    },
    process: [
      { n: '01', title: 'Research', desc: 'Annotated bibliography of 6 peer-reviewed papers across Self-Determination Theory, gamified literacy, and emotional interaction design for children; every design assumption mapped to a specific citation' },
      { n: '02', title: 'Conceptualise', desc: 'Defined 5 guiding design assumptions based on literature; mapped core interactions using Rogers, Sharp & Preece\'s interaction typology; developed a 5-frame emotional-arc storyboard before touching the prototype tool' },
      { n: '03', title: 'Prototype', desc: 'Built mid-fidelity prototype in Axure RP 11 across 9 screens with interactive transitions, animated mascot feedback loops, and visible progress mechanics' },
      { n: '04', title: 'Iterate', desc: 'Two documented iterations: reduced bottom navigation from 7 to 4 elements to lower cognitive load; introduced 1-second badge animation delay to strengthen the emotional effort-to-reward transition' },
      { n: '05', title: 'Propose Study', desc: 'Designed a rigorous mixed-methods A/B research study for 6–10 child participants using the ACTIF framework: task observation, emoji-based Likert scales, and structured post-session interviews' },
    ],
    interface: {
      intro: 'The core design challenge: an interface for users who didn\'t choose to be there. Every friction point (selecting a book, understanding a word, finishing a chapter) had to be replaced with a moment of delight without overwhelming young readers cognitively.',
      features: [
        {
          n: 'UX / 01',
          title: 'Emotional feedback architecture',
          desc: 'The owl mascot delivers contextual, effort-specific encouragement at every milestone: word lookups, page completions, quiz results. Feedback is never generic. Warm pastel palette and large rounded typography maintain emotional comfort without overstimulating. Micro-animations are purposefully brief and reward-proportionate.',
          ux: 'Every interaction affirmed, never ignored',
          endpoints: [
            { m: 'SDT', p: 'Autonomy · Competence · Relatedness', c: 'theory' },
            { m: 'UX', p: 'Warm palette · Rounded type', c: 'comfort' },
          ],
          note: '<b>Self-Determination Theory</b> applied: each mascot interaction reinforces competence and autonomy without introducing competitive pressure.',
        },
        {
          n: 'UX / 02',
          title: 'Gamified progress without pressure',
          desc: 'Daily quests, XP bars, streaks, and collectible badges build intrinsic motivation grounded in Self-Determination Theory (autonomy, competence, relatedness) without leaderboards or rankings that create external pressure. The "Today\'s Quest" card surfaces one clear, achievable goal on the home screen, eliminating decision paralysis before a single page is read.',
          ux: 'Autonomy · Competence · Relatedness',
          endpoints: [
            { m: 'UX', p: 'Today\'s Quest card', c: 'home' },
            { m: 'UX', p: 'Badge unlock screen', c: '+1s delay' },
          ],
          note: 'Badge animation delayed by <b>1 second</b> after testing: premature delivery shortcut the emotional arc; the pause creates a more satisfying reward moment.',
        },
      ],
    },
    visuals: [
      { label: 'Reading zone, vocabulary', alt: 'Reading screen with a tapped vocabulary word ("Fleeting") opening a child-readable definition card, alongside a persistent reading tip from the owl mascot explaining the interaction', src: '/projects/bookaro/reading-vocabulary.webp' },
      { label: 'Reading zone: encouragement', alt: 'Reading screen mid-story with page progress along the top, illustrated scene on the right, and a mascot speech bubble praising the reader: the low-stakes encouragement loop', src: '/projects/bookaro/reading-encouragement.webp' },
      { label: 'Gamification loop', alt: 'Three screens showing the reward loop end to end: progress dashboard with level, coins and streak; a "Badge Unlocked" celebration; and a quiz-complete screen awarding coins and XP', src: '/projects/bookaro/gamification.webp' },
      { label: 'Home, library and profile', alt: 'Three core navigation screens: home with Today\'s Quest and recommended books, the searchable book library, and the profile screen with badges earned and parental controls', src: '/projects/bookaro/home-library.webp' },
    ],
    architecture: {
      build: 'mid-fi',
      manifestLabel: 'design manifest',
      rows: [
        { k: 'Prototype', v: '<span class="tk">Axure RP 11</span>, interactive mid-fidelity with transitions and micro-interactions' },
        { k: 'Screens', v: '9: Splash · Home · Library · Reading · Vocabulary Pop-up · Quiz · Quiz Complete · Badge Unlocked · Progress · Profile' },
        { k: 'Framework', v: '<span class="tk">Norman\'s 5 principles</span> · <span class="tk">Self-Determination Theory</span> · Flow Theory' },
        { k: 'Evidence Base', v: '6 peer-reviewed papers: Li & Chu (2020), Wang et al. (2024), Schiele et al. (2024), Liu et al. (2024), Bai et al. (2022), Chen (2022)' },
        { k: 'Proposed Study', v: '<span class="tk">A/B mixed-methods</span> · 6–10 participants aged 6–10 · ACTIF framework · emoji Likert scales + structured interview' },
      ],
      links: [
        { label: 'Axure Prototype ↗', href: '#' },
      ],
    },
    reflection: {
      worked: 'Grounding every design decision in literature made iteration faster and more defensible. When a choice was questioned during peer review, I could cite a specific paper rather than intuition. The 5-frame storyboard proved its value: defining the emotional arc before prototyping prevented the common trap of designing for function before feeling.',
      differently: 'I initially designed from adult cognitive assumptions. It was only after re-reading child-computer interaction literature that I realised my early navigation imposed adult mental models on young users. Starting with child-specific HCI research before general UX principles would have saved significant rework.',
      next: 'Build the working React Native prototype; integrate an adaptive reading level system that adjusts vocabulary support based on word-lookup frequency per session; conduct the proposed A/B study with real child participants to validate the emotional feedback hypothesis empirically.',
    },
  },
]

/* ---------------------------------------------------------
   GRID PROJECTS, tier 2 (execution) and tier 3 (analysis)
   --------------------------------------------------------- */

export const GRID_PROJECTS = [
  {
    slug: 'keraton',
    name: 'Keraton',
    subtitle: 'Royal Heritage Visitor Application',
    year: '2024',
    typeTag: 'Academic · Best Application Development Project · UIC College',
    tier: 2,
    stack: ['Flutter', 'Node.js', 'Express.js', 'REST API', 'Agile'],
    desc: 'Full mobile app for Keraton Yogyakarta, one of Indonesia\'s most significant royal heritage sites. Covers user authentication, news module, event calendar with save and share, QR-code ticketing (domestic/foreign/adult/child), and profile management. UAT conducted with Keraton team representatives across multiple devices.',
    metric: 'Passed full UAT · 5 core modules shipped · Best Application Development Project',
    problem: 'Keraton Yogyakarta receives thousands of local and international visitors each year: yet its information systems ran on printed materials, manual ticketing, and limited digital presence. Keraton is the digital bridge between one of Indonesia\'s most significant royal heritage sites and the modern visitor.',
    overview: 'A full cross-platform mobile application built in Flutter with a Node.js/Express backend. Covers the complete visitor journey: secure account creation, a live news and updates feed, a detailed event calendar with save-and-share, QR-code entry ticketing (domestic/foreign, adult/child categorisation), and a personalised profile. User Acceptance Testing conducted with Keraton team representatives across multiple devices. Delivered using Agile methodology with 2-week sprint cycles.',
    myRole: {
      title: 'Lead Developer & Requirements Analyst',
      bullets: [
        'Authored the full Software Design Document including functional requirements, non-functional requirements, and risk/mitigation register',
        'Built the complete Flutter application across 5 modules with Node.js/Express RESTful backend; user authentication, content management, event scheduling, QR-based ticketing, and profile management',
        'Conducted User Acceptance Testing with Keraton team representatives across smartphones and tablets; iterated on UI design based on structured feedback before final delivery',
      ],
      decisions: [
        'Chose Flutter over React Native after benchmarking both for UI-intensive feature performance. Flutter\'s widget system was better suited for the custom cultural aesthetic required',
        'Implemented QR-code ticketing with domestic/foreign and adult/child categorisation to address the specific inefficiencies Keraton stakeholders identified in manual ticketing processes',
      ],
    },
    whatBuilt: [
      'User authentication: secure sign-up/login, JWT-based session management, profile editing',
      'News module, real-time articles from Keraton team with save-to-personal-list and share functionality',
      'Event calendar: full event listings with descriptions, dates, highlight images, and user save/share',
      'Ticketing system: QR-code entry with domestic/foreign pricing, adult/child categorisation, and "My Tickets" purchase history',
      'Support & settings: FAQ, Contact Us form, notification preferences, language settings',
    ],
    outcome: 'Passed full UAT with Keraton team representatives, all 5 core modules signed off across multiple device types',
    manifestRows: [
      { k: 'Platform', v: '<span class="tk">Flutter</span>, cross-platform iOS/Android' },
      { k: 'Backend', v: '<span class="tk">Node.js</span> · <span class="tk">Express.js</span> · RESTful API' },
      { k: 'Methodology', v: '<span class="tk">Agile</span> · 2-week sprints · peer review · UAT' },
      { k: 'Outcome', v: 'Passed full UAT · Best Application Development Project' },
    ],
    visuals: [
      { label: 'Welcome screen', alt: 'Keraton app welcome screen running on iOS, full-bleed photography of the palace gate guardian statue behind a card carrying the wordmark, tagline and the sign-up / log-in entry points', src: '/projects/keraton/welcome-screen.webp' },
    ],
  },
  {
    slug: 'jejakbaduy',
    name: 'JejakBaduy',
    subtitle: 'Cultural Tourism Website. Real Client Delivery',
    year: '2024',
    typeTag: 'Academic · Real Client (JejakBaduy Travel Agency · Best Website Dev) UIC College',
    tier: 2,
    stack: ['HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'PHP', 'MySQL'],
    desc: 'Full website for a real Baduy cultural tourism travel agency, 10 pages including a custom PHP/MySQL CMS for the client to update content independently. Load tested at 20 concurrent users. SEO implementation across all pages.',
    metric: '420ms avg load under 20-user load · Real client delivery · Best Website Development Project',
    problem: 'JejakBaduy is a travel agency specialising in immersive tours to the Baduy region, one of Indonesia\'s most preserved cultural areas. The brief: build a website that captures that cultural gravity while giving the agency full control over their own content.',
    overview: 'A complete multi-page website built from scratch for a real client. 10 pages covering the full visitor journey: home, trip packages (private and public, 1-day and 2-day), package details, About Baduy cultural context, About Us, gallery, blog, and contact. Includes a fully custom PHP/MySQL CMS enabling the client to manage all content independently. SEO implementation across all pages. Load tested at 20 concurrent users with 420ms average load time. Responsive design via Bootstrap across mobile, tablet, and desktop.',
    myRole: {
      title: 'Full-Stack Web Developer & UI Designer',
      bullets: [
        'Designed the complete site architecture across 10 pages, creating wireframes and high-fidelity mockups before development, validating layout and visual identity against the cultural brief',
        'Built the full front-end using HTML5, CSS3, Bootstrap, and JavaScript; implemented the back-end using PHP and MySQL with a custom-built CMS enabling the client to manage all content without developer involvement',
        'Implemented SEO best practices across all pages and conducted performance testing under concurrent load, achieving 420ms average load time with zero server crashes',
      ],
      decisions: [
        'Built a custom CMS over using a third-party platform to give the client a lightweight, purpose-built interface matching their specific content types, without the overhead of a general-purpose CMS',
        'Applied cultural imagery and colour language throughout to reflect the visual identity of the Baduy region, prioritising authenticity over generic tourism web conventions',
      ],
    },
    whatBuilt: [
      'Homepage: hero section, featured tours, cultural introduction, CTA',
      'Trip packages listing: private/public tours, 1-day/2-day filters',
      'Package detail pages: itinerary, pricing, booking CTA',
      'About Baduy, cultural education section for prospective visitors',
      'Gallery, responsive image gallery with lightbox',
      'Blog, article publishing with CMS integration',
      'Custom CMS: admin login (PHP session-secured), content management for all pages, session timeout and injection protection',
    ],
    outcome: '420ms average load time under 20-user concurrent load, delivered to real client with full CMS handover',
    manifestRows: [
      { k: 'Frontend', v: '<span class="tk">HTML5</span> · <span class="tk">CSS3</span> · <span class="tk">Bootstrap</span> · <span class="tk">JavaScript</span>' },
      { k: 'Backend', v: '<span class="tk">PHP</span> · <span class="tk">MySQL</span>' },
      { k: 'CMS', v: 'Custom-built PHP/MySQL admin panel with session security' },
      { k: 'SEO', v: 'Meta descriptions · keyword tags · image alt text' },
      { k: 'Testing', v: 'Load testing, 20 concurrent users · 420ms avg response' },
      { k: 'Outcome', v: 'Best Website Development Project · Real client delivery' },
    ],
    manifestLinks: [
      { label: 'Live Site ↗', href: 'https://jejakbaduy.site.je' },
      { label: 'Source ↗', href: 'https://github.com/vjdarren/jejakbaduy' },
    ],
    visuals: [
      { label: 'Homepage', alt: 'JejakBaduy homepage hero, full-bleed photography of a traditional Baduy dwelling with the trip enquiry call to action and an Indonesian-language value proposition beneath', src: '/projects/jejakbaduy/homepage.webp' },
      { label: 'Trip package detail', alt: 'Open-trip package page: pricing, meeting point, and an itemised list of what the two-day/one-night trip includes, with a sticky quick-link sidebar for the longer page', src: '/projects/jejakbaduy/trip-packages.webp' },
      { label: 'About Baduy', alt: 'Cultural context page: visitor rules presented as a two-column do/don’t checklist, followed by an editorial section on Baduy customs and ritual', src: '/projects/jejakbaduy/about-baduy.webp' },
      { label: 'Photo gallery', alt: 'Gallery page, responsive masonry grid of trip photography with lightbox viewing', src: '/projects/jejakbaduy/gallery.webp' },
      { label: 'Responsive layout', alt: 'The homepage rendered at iPhone 14 Pro Max width in device emulation, showing the Bootstrap breakpoint behaviour and collapsed navigation', src: '/projects/jejakbaduy/responsive.webp' },
      { label: 'Load test results', alt: 'JMeter load test output, 20 concurrent simulated users against the live homepage, reporting per-user click times and an aggregate time-spent figure with a 0.00% error rate', src: '/projects/jejakbaduy/load-test.webp' },
    ],
  },
  {
    slug: 'libra',
    name: 'Libra',
    subtitle: 'Requirements Analysis of a £390M Government IT Failure',
    year: '2025–2026',
    typeTag: 'Academic · COMP1787 Requirements Management',
    tier: 3,
    stack: [],
    desc: 'Critical analysis of the Libra magistrates\' courts IT project, £146M bid, £390M actual cost. Root cause analysis, MoSCoW requirements written from scratch, stakeholder mapping, and JAD + DSDM proposed as alternatives.',
    metric: '£244M cost overrun analysed · MoSCoW requirements framework applied · JAD + DSDM proposed as remedies',
    problem: 'The Libra magistrates\' courts IT project is one of the most extensively documented government IT failures in UK history, a £146M bid that became a £390M liability. The Committee of Public Accounts described it as among the worst PFI projects ever seen. The root cause wasn\'t technology. It was requirements.',
    approach: 'Analysed primary sources including the National Audit Office and Public Accounts Committee reports to establish the factual timeline and decision chain. Applied requirements engineering frameworks to diagnose failure at each phase: procurement commitment before requirements validation, single-bidder lock-in, and scope instability under fixed-price contract. Wrote a complete alternative requirements specification from scratch. MoSCoW-prioritised functional requirements with per-requirement rationale drawn from real stakeholder perspectives (Legal Adviser, Finance Officer, Court Manager, Policy Official), and scalability-focused non-functional requirements. JAD workshops and DSDM iterative delivery evaluated as the structural remedies that would have prevented the overrun.',
    findings: 'The root cause was committing to a fixed-price, single-bidder procurement contract before redesigning business processes or validating user needs structurally. Scope instability and contractual lock-in were the inevitable result. JAD workshops across representative court types (bringing business users, IT professionals, and decision-makers together before procurement) would have surfaced the operational diversity that made a one-size-fits-all system impossible. DSDM iterative delivery governance would have provided structured checkpoints to catch scope drift before it became irreversible. Staff distrust of formal systems was a known social risk that was never addressed in the requirements process.',
    reflection: 'This analysis sharpened what requirements engineering actually protects against, not just technical ambiguity, but organisational, social, and procurement risk. A £244M overrun is the cost of skipping stakeholder alignment.',
    visuals: [
      { label: 'MoSCoW requirements', alt: 'Functional requirements table. FR1 to FR3 with MoSCoW prioritisation and a per-requirement rationale traced back to a named stakeholder role (Legal Adviser, Finance Officer, Policy Official)', src: '/projects/libra/moscow-requirements.webp' },
      { label: 'Non-functional requirements', alt: 'Non-functional requirements table, availability, authentication and performance targets each stated as a measurable threshold with the justification for that specific number', src: '/projects/libra/nfr-requirements.webp' },
    ],
  },
  {
    slug: 'ptcitra',
    name: 'PT Citra',
    subtitle: 'E-Commerce Strategy & Platform. Real Client',
    year: '2025',
    typeTag: 'Professional · Real Client: PT Citra Sukses Ekapratama, Indonesia',
    tier: 2,
    stack: ['Shopify', 'HTML5', 'CSS3', 'JavaScript'],
    desc: 'End-to-end e-commerce transformation: business model analysis, competitor review, product strategy, digital marketing plan, and full Shopify build. 40+ product listings, full payment gateway, 6-page navigation redesign for desktop and mobile.',
    metric: '40+ products live · Full payment gateway · End-to-end client delivery',
    problem: 'PT Citra Sukses Ekapratama had the products, the customers, and the ambition, but no online presence. This wasn\'t just a build; it was a full e-commerce transformation: business model analysis, competitive landscape, pricing strategy, digital marketing plan, and a production-ready Shopify platform, delivered from discovery to handover.',
    overview: 'End-to-end e-commerce transformation for a real Indonesian business. Produced a complete strategic foundation: mission, vision, value proposition, competitive analysis, product and pricing strategy, digital marketing roadmap, and financial projections, before a single line was written. The Shopify platform was then built to spec: 40+ product listings, full payment gateway integration, and a redesigned 6-page information architecture tested for usability on desktop and mobile.',
    myRole: {
      title: 'E-Commerce Consultant & Developer',
      bullets: [
        'Conducted company and competitive analysis to define the e-commerce strategy, including business model selection, pricing approach, digital marketing channels, and logistics plan, producing a written strategy document before any development began',
        'Built and configured the complete Shopify platform: product catalogue (40+ listings), payment gateway integration, navigation redesign across 6 pages, and cross-device usability improvements',
        'Managed the full project lifecycle from initial client brief through discovery, strategy, design, implementation, testing, and handover documentation',
      ],
      decisions: [
        'Chose Shopify over custom-built after a structured platform evaluation weighing cost, security, maintenance burden, and time-to-market, documented the trade-offs explicitly for the client',
        'Prioritised navigation and information architecture redesign over visual refresh: competitive analysis showed the primary drop-off point was checkout friction, not brand perception',
      ],
    },
    whatBuilt: [
      'E-commerce strategy document: business model, competitive positioning, pricing, digital marketing, logistics, financial projections',
      'Shopify platform: 40+ product listings with full category structure, payment gateway (multi-method), inventory management',
      'Navigation redesign, 6-page IA overhaul reducing checkout path to 2 steps',
      'Cross-device optimisation, desktop and mobile usability tested and confirmed',
      'Client handover: documentation, admin training, and ongoing content management guidance',
    ],
    outcome: '40+ products live with full payment gateway, delivered to real client as a production-ready platform from Day 1',
    manifestRows: [
      { k: 'Platform', v: '<span class="tk">Shopify</span>' },
      { k: 'Frontend', v: '<span class="tk">HTML5</span> · <span class="tk">CSS3</span> · <span class="tk">JavaScript</span> · Liquid templating' },
      { k: 'Payment', v: 'Payment gateway integration (multi-method)' },
      { k: 'Methodology', v: 'Discovery → Strategy → Design → Build → Handover' },
      { k: 'Outcome', v: '40+ products live · Real client · Full payment processing from Day 1' },
    ],
    visuals: [
      { label: 'Storefront homepage', alt: 'PT Citra Shopify storefront: hero banner with the industrial-tooling positioning, partner brand marks, and a proven-bestsellers product strip below the fold', src: '/projects/ptcitra/storefront.webp' },
      { label: 'Product catalogue', alt: 'Catalogue page: 16 products in a filterable grid with availability, price and category filters and alphabetical sorting, priced in IDR', src: '/projects/ptcitra/product-listing.webp' },
      { label: 'Mobile and checkout', alt: 'Mobile catalogue alongside a completed DOKU payment confirmation, the responsive layout and the payment-gateway integration at the end of the purchase path', src: '/projects/ptcitra/mobile-checkout.webp' },
      { label: 'TOWS strategy matrix', alt: 'TOWS matrix from the accompanying strategy analysis: S-O, W-O, S-T and W-T strategies mapping the storefront build to specific competitive moves', src: '/projects/ptcitra/tows-strategy.webp' },
    ],
  },
  {
    slug: 'airbnb-ml',
    name: 'Airbnb ML',
    subtitle: 'Machine Learning Price Prediction Pipeline',
    year: '2025–2026',
    typeTag: 'Academic · COMP1861 Machine Learning',
    tier: 3,
    stack: ['Python', 'pandas', 'scikit-learn', 'Linear Regression', 'Random Forest'],
    desc: 'End-to-end ML pipeline on the AB_NYC_2019 dataset. Full EDA, missing value handling, outlier removal, feature engineering, categorical encoding, and feature scaling. Linear Regression vs Random Forest comparison with MAE as primary metric.',
    metric: 'Linear Regression vs Random Forest comparison · Full EDA and feature engineering pipeline',
    problem: 'Airbnb listing prices vary by neighbourhood, room type, availability, review recency, and dozens of other signals. The question: can a machine learning pipeline trained on 48,000+ New York City listings accurately predict price from features alone, and which model generalises better?',
    approach: 'End-to-end pipeline on the AB_NYC_2019 dataset (48,895 NYC listings). EDA covering distribution plots, correlation heatmaps, and price-vs-categorical box plots. Missing value imputation for reviews_per_month and last_review; IQR-based outlier removal; feature engineering including days_since_last_review extraction from raw date strings. One-hot encoding of categorical features; StandardScaler applied to numerical features. Linear Regression as interpretable baseline and Random Forest Regressor for non-linear pattern capture, both trained on identical preprocessed feature sets. MAE chosen as primary evaluation metric for its direct interpretability in a pricing context.',
    findings: 'Random Forest outperformed Linear Regression on MAE, capturing non-linear relationships between neighbourhood, room type, and price that a linear model cannot represent. However, Linear Regression remained more interpretable, coefficient values provided clear directional signals about which features drive price, making it more suitable for stakeholder explanation. Feature engineering (particularly days_since_last_review) contributed meaningfully above raw features alone. The most important lesson was the gap between model accuracy and model utility: a lower MAE doesn\'t automatically mean a better model, the interpretability vs. performance trade-off depends entirely on who uses the output and for what decision.',
    reflection: 'I\'d add cross-validation folds and a hyperparameter search, a single train/test split underestimates variance in sparse neighbourhood groups.',
    methods: [
      { k: 'Language', v: '<span class="tk">Python</span>' },
      { k: 'Libraries', v: '<span class="tk">pandas</span> · <span class="tk">NumPy</span> · <span class="tk">scikit-learn</span> · <span class="tk">Matplotlib</span> · <span class="tk">Seaborn</span>' },
      { k: 'Models', v: '<span class="tk">Linear Regression</span> · <span class="tk">Random Forest Regressor</span>' },
      { k: 'Dataset', v: 'AB_NYC_2019: 48,895 Airbnb listings, NYC' },
      { k: 'Metric', v: 'MAE (Mean Absolute Error)' },
    ],
    methodLinks: [
      { label: 'Notebook ↗', href: '#' },
    ],
    visuals: [
      { label: 'Price distribution', alt: 'Price distribution histogram after filtering listings above $500, the right-skewed shape that motivated outlier removal before training', src: '/projects/airbnb-ml/price-distribution.webp' },
      { label: 'Correlation heatmap', alt: 'Feature correlation matrix across the numerical variables, with annotated coefficients showing how weakly price correlates with any single feature', src: '/projects/airbnb-ml/correlation-heatmap.webp' },
      { label: 'Feature importance', alt: 'Top 20 features by Random Forest importance: room type (entire home/apartment) dominates, followed by longitude and latitude, making location the second-order driver', src: '/projects/airbnb-ml/feature-importance.webp' },
      { label: 'Predicted vs actual', alt: 'Predicted-versus-actual price scatter for Linear Regression and Random Forest side by side against the perfect-prediction line, showing where each model degrades at the high end', src: '/projects/airbnb-ml/model-comparison.webp' },
    ],
  },
  {
    slug: 'cybershield',
    name: 'CyberShield',
    subtitle: 'NLP Cyberbullying Detection System',
    year: '2025–2026',
    typeTag: 'Academic · COMP1921 Advanced Topics in Data Science and AI',
    tier: 3,
    stack: ['Python', 'scikit-learn', 'TF-IDF', 'Gradio'],
    desc: 'Prototype cyberbullying detection system for social media text. 6-category classifier using TF-IDF with bigrams. Deployed as an interactive Gradio interface. Ethical analysis included: explainability trade-offs, cultural bias, and responsible deployment guidelines.',
    metric: '81% overall accuracy · F1=0.97 for ethnicity detection · Gradio interactive prototype',
    problem: 'Traditional content moderation is slow, inconsistent, and unscalable. CyberShield is a prototype NLP classification system that detects cyberbullying across 6 categories in Twitter text, with interpretability and ethical accountability built in from the start, not added as an afterthought.',
    approach: 'End-to-end NLP pipeline on a Cyberbullying Tweets dataset. Text cleaned via lowercasing, punctuation removal, stopword filtering, and tokenisation. TF-IDF vectorisation with unigrams and bigrams to capture short semantic patterns. Multi-class classification across 6 categories: ethnicity, religion, age, gender, other cyberbullying, and not cyberbullying. Evaluated using classification report, confusion matrix, and per-class F1 scores. Top TF-IDF weighted features extracted per class to surface what signals drive predictions, making the model auditable rather than opaque. Deployed as a Gradio interactive prototype with real-time text classification. Dedicated ethical analysis covering explainability trade-offs, cultural bias in western-centric training data, and responsible deployment constraints.',
    findings: '81% overall accuracy (macro F1: 0.81). Explicit hate categories performed strongly (ethnicity F1=0.97, religion F1=0.95, age F1=0.96) because direct hate language is reliably detectable by lexical features. Ambiguous categories performed lower: not_cyberbullying F1=0.55, other_cyberbullying F1=0.59: sarcasm, irony, and coded language fall outside TF-IDF\'s context window. The model is suitable for flagging explicit content for priority review; automated disciplinary actions without human oversight are explicitly out of scope.',
    reflection: 'I\'d extend to transformer-based embeddings to handle sarcasm and context-dependent language, the places where bag-of-words representations systematically fail.',
    methods: [
      { k: 'Language', v: '<span class="tk">Python</span>' },
      { k: 'Libraries', v: '<span class="tk">scikit-learn</span> · <span class="tk">pandas</span> · <span class="tk">NLTK</span> · <span class="tk">Matplotlib</span>' },
      { k: 'Method', v: '<span class="tk">TF-IDF</span> with bigrams · Multi-class classification' },
      { k: 'Interface', v: '<span class="tk">Gradio</span>, interactive real-time classification prototype' },
      { k: 'Evaluation', v: 'Accuracy · Precision · Recall · F1 (macro avg) · Confusion matrix' },
    ],
    methodLinks: [
      { label: 'Notebook ↗', href: '#' },
    ],
    visuals: [
      { label: 'Classification report', alt: 'Per-class precision, recall and F1 across the six categories, strong on ethnicity (0.97) and religion (0.95), notably weaker on the two ambiguous classes, at 0.81 overall accuracy on 9,539 samples', src: '/projects/cybershield/classification-report.webp' },
      { label: 'Confusion matrix', alt: 'Confusion matrix showing where the classifier actually fails, the bulk of the error is mutual confusion between not_cyberbullying and other_cyberbullying rather than across the targeted-harassment classes', src: '/projects/cybershield/confusion-matrix.webp' },
      { label: 'Gradio prototype', alt: 'Interactive Gradio demo: free-text input returning the cleaned text, predicted class and a confidence score, with a flag control for disputed predictions', src: '/projects/cybershield/gradio-interface.webp' },
      { label: 'Top TF-IDF terms', alt: 'Highest-weighted TF-IDF terms per class, exposing exactly which tokens drive each prediction so the model can be audited rather than trusted blindly', src: '/projects/cybershield/top-features.webp' },
    ],
  },
  {
    slug: 'smartbin',
    name: 'SmartBin',
    subtitle: 'IoT Waste Monitoring System. Deployed at PT Persita',
    year: '2025',
    typeTag: 'Professional · Real Client. PT Persita Tangerang Raya',
    tier: 2,
    stack: ['Arduino C++', 'ESP8266', 'HC-SR04', 'Telegram Bot API'],
    desc: 'End-to-end IoT smart bin system deployed at a real stadium. Touchless servo lid, RGB LED fill-level indicators, and real-time Telegram notifications with debouncing and auto-reconnect. Built across two prototype iterations verified over 72 hours continuous operation.',
    metric: '98% message delivery · ±2% fill accuracy · 72h continuous operation',
    problem: 'PT Persita\'s stadium had a problem familiar to every large venue: bins overflowing during events, manual inspection cycles that couldn\'t keep pace with crowd density, and no real-time visibility for facilities staff. SmartBin replaced guesswork with data.',
    overview: 'A deployed IoT smart waste monitoring system built for PT Persita\'s stadium facility. Two-sensor architecture on an ESP8266 microcontroller: Sensor A monitors fill level in real time (0–100% from ultrasonic distance, 5-point rolling average for noise reduction), Sensor B triggers a touchless servo lid via hand-proximity detection. RGB LED status display (green/yellow/red by threshold). Real-time Telegram Bot notifications with 10-second debouncing, automatic WiFi reconnection, and 3-attempt message retry logic. Built across two full prototype iterations and piloted on a staffed campus reception desk before the venue install, so the unit was validated in continuous real-world use rather than bench conditions. Final system ran 72 hours continuously with 98% message delivery.',
    myRole: {
      title: 'IoT Systems Developer',
      bullets: [
        'Designed the complete hardware architecture (ESP8266 microcontroller, dual HC-SR04 ultrasonic sensors, servo motor, RGB LED array) and produced the full circuit and pin configuration documentation',
        'Wrote all firmware in Arduino C++ including fill-level monitoring, touchless lid automation, Telegram Bot cloud integration, and automatic WiFi reconnection logic',
        'Conducted two full prototype iterations with 3 real users in the live stadium environment, collecting structured feedback and implementing targeted fixes, moving from unstable initial prototype to 99%+ reliability in the final build',
      ],
      decisions: [
        'Implemented a 5-point rolling average on Sensor A readings to eliminate noise from angle variation and bin shape; this single change moved fill-level accuracy from unstable to ±2%',
        'Added 10-second debouncing on Telegram notifications after initial testing revealed message spam from sensor fluctuations was frustrating users and eroding trust in the system',
      ],
    },
    whatBuilt: [
      'Fill level monitoring: ultrasonic distance → percentage conversion, 5-point rolling average, 3-state RGB LED (green ≤49%, yellow 50–79%, red ≥80%)',
      'Touchless lid automation: proximity detection via Sensor B, servo motor 0°–180°, <500ms response, non-blocking millis() timing',
      'Telegram Bot alerting: real-time push notifications on state change, 10-second debounce, 3-attempt retry, WiFi status included in message',
      'Reliability systems: automatic WiFi reconnection every 30 seconds, graceful degradation, error logging',
    ],
    outcome: '98% Telegram delivery rate · ±2% fill accuracy · <500ms lid response · 72-hour uptime · Campus pilot, then deployment at PT Persita stadium',
    manifestRows: [
      { k: 'MCU', v: '<span class="tk">ESP8266</span> (NodeMCU)' },
      { k: 'Sensors', v: '<span class="tk">HC-SR04</span> ultrasonic (×2) · Servo motor · RGB LEDs' },
      { k: 'Firmware', v: '<span class="tk">Arduino C++</span> · millis() non-blocking · 5-point rolling average' },
      { k: 'Cloud', v: '<span class="tk">Telegram Bot API</span> · WiFiClientSecure · UniversalTelegramBot' },
      { k: 'Testing', v: '72-hour continuous deployment · 3 real users · 2 iterations' },
      { k: 'Outcome', v: '98% delivery rate · ±2% accuracy · &lt;500ms response · Real deployment' },
    ],
    visuals: [
      { label: 'Hardware assembly', alt: 'The build as assembled: ESP8266 NodeMCU and HC-SR04 ultrasonic sensors wired on a breadboard beside the bin, and the servo and wiring mounted inside the lid', src: '/projects/smartbin/hardware-setup.webp' },
      { label: 'Campus pilot', alt: 'The finished unit running as a pilot on a staffed campus reception desk ahead of the venue install, RGB status indicator and ultrasonic sensor visible on the housing, with a colleague working alongside it', src: '/projects/smartbin/live-deployment.webp' },
      { label: 'Telegram notifications', alt: 'Live Telegram Bot feed: repeated status updates reporting fill percentage, measured distance, capacity state and WiFi connectivity, which is how staff are alerted', src: '/projects/smartbin/telegram-notification.webp' },
      { label: 'System architecture', alt: 'System block diagram: ESP8266 NodeMCU at the centre driving the ultrasonic sensors, lid servo, RGB status LEDs and Telegram Bot API, with the maintenance team as the end consumer', src: '/projects/smartbin/system-diagram.webp' },
    ],
  },
  {
    slug: 'crp',
    name: 'AI Overview',
    subtitle: 'User Trust & Accuracy Research. Google\'s AI Search',
    year: '2025',
    typeTag: 'Academic · Computing Research Project · UIC College',
    tier: 3,
    stack: [],
    desc: 'Mixed-methods research study (n=50) on Google\'s AI Overview feature: examines how AI-generated search summaries impact user experience and what accuracy, bias, and transparency concerns they raise. Quantitative analysis in SPSS; qualitative coding in NVivo.',
    metric: 'n=50 · Mixed-methods (SPSS + NVivo) · t-test, ANOVA, and regression analysis',
    problem: 'Google\'s AI Overview surfaces AI-generated summaries directly in search results, before any organic links. The efficiency gain is real. So is the risk. This study investigates whether AI-generated search summaries actually improve user experience, and what accuracy, bias, and transparency concerns they introduce into everyday information retrieval.',
    approach: 'Structured online survey (n=50) across three demographic groups (high school students, university students, and working professionals) combined with in-depth qualitative interviews. Quantitative data analysed in SPSS using descriptive statistics, independent t-tests, one-way ANOVA, Pearson correlation, and multiple regression. Qualitative data thematically coded in NVivo. Hypotheses: H1. AI Overview significantly enhances user experience through efficient, accessible results; H2: AI Overview raises concerns about accuracy, bias, and transparency that influence user trust.',
    findings: 'Both hypotheses were supported. AI Overview significantly enhances perceived search efficiency; users found it faster and less cognitively demanding for straightforward queries. However, concerns about accuracy and bias were consistently present across all demographic groups, particularly among working professionals who cited instances of outdated or oversimplified information presented with unearned confidence. Transparency was identified as the critical gap: users struggled to assess how AI Overview determined relevance and whether its sources were current. Efficiency gains and trust concerns coexist, the design implication is clear: AI sourcing and recency must be surfaced, not hidden.',
    reflection: 'The most valuable lesson: choosing the right statistical test matters, using ANOVA vs t-test is a claim about what kind of comparison you\'re making, and getting it wrong invalidates your findings.',
    methods: [
      { k: 'Survey', v: 'Structured online questionnaire, n=50 across 3 demographic groups' },
      { k: 'Quantitative', v: '<span class="tk">SPSS</span>: descriptive stats, t-test, ANOVA, Pearson correlation, multiple regression' },
      { k: 'Qualitative', v: '<span class="tk">NVivo</span>, thematic coding of interview transcripts' },
      { k: 'Ethics', v: 'Research ethics approval obtained before data collection' },
      { k: 'Sample', v: 'High school students · University students · Working professionals' },
    ],
    visuals: [
      { label: 'Variable framework', alt: 'The study design, exposure to Google’s AI Overview as independent variable and perceived usefulness as dependent, mediated by trust in AI-generated content and moderated by accuracy, bias and transparency concerns', src: '/projects/crp/variable-framework.webp' },
      { label: 'Descriptive statistics', alt: 'SPSS descriptive output for trust in search results after noticing AI summaries, mean 7.58 on a 10-point scale with the accompanying frequency distribution and histogram', src: '/projects/crp/spss-descriptive.webp' },
      { label: 'ANOVA results', alt: 'One-way ANOVA with Levene’s homogeneity test and effect sizes, comparing trust in AI-summary accuracy across groups, non-significant at p = .903, with a near-zero eta-squared', src: '/projects/crp/anova-results.webp' },
      { label: 'NVivo thematic coding', alt: 'NVivo project map for the RO1 theme "Interaction Ease": child codes drawn from interview transcripts covering formatting, scan-ability, effort saved and the trade-off against depth', src: '/projects/crp/nvivo-themes.webp' },
    ],
  },
]
