export const BASE = import.meta.env.BASE_URL;

export const profile = {
  name: 'Yug Jain',
  role: 'Enterprise Client Partner',
  roleLine: 'pre-sales through renewal',
  location: 'Mumbai, India',
  email: 'yugrjain@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yugjain',
  calendar: 'https://calendar.app.google/3yNWBXCxBVos8ufr8',
  resume: `${BASE}Yug-Jain-Executive-Resume.pdf`,
  /** Set true to re-enable the résumé download links. */
  resumeEnabled: false,
  avatar: `${BASE}yug-avatar.webp`,
  status: ['Pre-sales → delivery → expansion', 'Open to US · UK · Ireland', 'Remote & relocation ready'],
};

export const quotes = {
  closing: {
    text: 'The purpose of computing is insight, not numbers.',
    who: 'Richard Hamming',
    source: 'Numerical Methods for Scientists and Engineers, 1962',
  },
  synthesizer: {
    text: 'Simplicity is prerequisite for reliability.',
    who: 'Edsger W. Dijkstra',
  },
};

export type Role = {
  n: string;
  company: string;
  role: string;
  tag: string;
  impact: string;
  years: string;
  summary: string;
  bullets?: string[];
  stats?: { k: string; v: string }[];
};

export const roles: Role[] = [
  {
    n: '01',
    company: 'NTT DATA North America',
    role: 'Client Partner & Customer Success Manager',
    tag: '$1.0M ARR portfolio · US accounts',
    impact: '$1.0M → $1.3M ARR · 80%+ GRR',
    years: '2022 — Present',
    summary:
      'Dual mandate across delivery governance and commercial growth for a $1.0M ARR Salesforce & MuleSoft enterprise portfolio spanning North American REITs, Fortune 500 consumer goods, InsurTech, wealth management and retail.',
    bullets: [
      'Co-owned the early-stage cycle with the account executive — discovery, solution framing, SOW and commercial structuring — then carried the same accounts through delivery and expansion.',
      'Expanded the portfolio from $1.0M to $1.3M ARR through consultative upselling, multi-year extensions and adjacent MuleSoft integration change orders.',
      'Sustained an 80%+ gross retention baseline across multi-year contracts, steering executive committees with client VPs, CIOs and Enterprise Architects.',
      'Closed tight feedback loops between US enterprise stakeholders and technical delivery squads to mitigate implementation risk early.',
    ],
    stats: [
      { k: '+30%', v: 'ARR expansion' },
      { k: '80%+', v: 'Gross retention' },
      { k: '$1.0M', v: 'Portfolio ARR' },
    ],
  },
  {
    n: '02',
    company: 'Deepstash',
    role: 'Customer Success Manager',
    tag: 'First B2B enterprise account',
    impact: 'First B2B motion · activation rebuild',
    years: '2020 — 2022',
    summary:
      'Built the company’s first B2B corporate motion alongside a consumer product with a large install base — turning enterprise onboarding into a repeatable, measured path to first value.',
    bullets: [
      'Compressed enterprise onboarding cycles by 50% by rebuilding the activation path around customer milestones rather than product features.',
      'Pioneered the first B2B corporate team contracts, moving from consumer-only revenue to multi-seat agreements.',
    ],
    stats: [{ k: '1st', v: 'B2B contract motion' }],
  },
  {
    n: '03',
    company: 'Office Pulse · CoWorkingOps · WorkAmp',
    role: 'Customer Success Specialist & Operations Manager',
    tag: 'Workplace & coworking software',
    impact: '25+ enterprise accounts · ops to CS',
    years: '2016 — 2020',
    summary:
      'Ran customer success and operations across 25+ enterprise accounts in workplace and coworking software, where delivery friction and adoption were the same conversation.',
  },
];

export const howIWork = [
  {
    n: '00',
    label: 'Pre-sales',
    title: 'Shape the deal so it can be delivered',
    body:
      'Discovery, solution framing and the SOW with the AE — the accounts I inherit are ones I helped scope.',
  },
  {
    n: '01',
    label: 'First 30 days',
    title: 'Diagnose before you promise',
    body: 'Contract forensics, telemetry audit and a listening tour with every executive sponsor.',
  },
  {
    n: '02',
    label: 'Days 31–60',
    title: 'Put a governance cadence around it',
    body: 'A steering charter that separates sprint noise from board-level outcomes.',
  },
  {
    n: '03',
    label: 'Days 61–90',
    title: 'Turn delivery trust into revenue',
    body: 'Whitespace mapped to their roadmap, renewals opened 120 days early.',
  },
  {
    n: '04',
    label: 'Handover',
    title: 'Make the account survive me',
    body: 'Playbooks and a decision log the next owner can run without re-learning the account.',
  },
];

export type Advisory = {
  name: string;
  type: string;
  headline: string;
  blurb: string;
  clients?: string[];
  stats?: { k: string; v: string }[];
  problem: string;
  systems: { title: string; body: string }[];
  outcome: string;
};

export const advisoryTag = 'Advisory mandate';

export const advisory: Advisory[] = [
  {
    name: 'Firework',
    type: 'Video commerce',
    headline: 'Enterprise adoption, telemetry-driven QBRs & net revenue retention',
    blurb:
      'Advised leadership on structuring customer success operations for Tier-1 accounts, automating telemetry reporting so QBRs argued from evidence instead of spreadsheets.',
    clients: ['Samsung', 'Unilever', 'Titan', 'Bajaj Finserv'],
    stats: [
      { k: '4', v: 'Flagship logos' },
      { k: '−65%', v: 'QBR prep effort' },
      { k: 'Closed-loop', v: 'Telemetry → roadmap' },
    ],
    problem:
      'Following Series B expansion, Firework signed marquee multinational consumer and financial brands. But post-sales onboarding and executive business reviews still relied on manual spreadsheet pulls, making it hard to prove ROI velocity to C-suite merchandising and digital transformation buyers during renewal windows.',
    systems: [
      {
        title: 'Automated usage telemetry pipelines',
        body:
          'Structured data aggregation workflows that translated raw video engagement, livestream conversion events and SDK load performance into executive-ready health dashboards.',
      },
      {
        title: 'Value-realization QBR blueprint',
        body:
          'Replaced generic feature-update decks with commercial impact briefs anchored on GMV lift, dwell-time benchmarks and category-specific conversion baselines.',
      },
      {
        title: 'Voice-of-customer escalation protocol',
        body:
          'A weighted prioritisation matrix linking Tier-1 renewal and expansion ARR directly to product and mobile SDK engineering sprints.',
      },
    ],
    outcome:
      'A repeatable enterprise governance cadence across flagship accounts, arming commercial leadership with real-time adoption proof points that protected baseline ARR and unlocked multi-brand regional rollouts.',
  },
  {
    name: 'HumanX',
    type: 'Enterprise product studio',
    headline: 'End-to-end sales cycles, executive governance & design–dev orchestration',
    blurb:
      'Led full-cycle sales from prospecting to contract onboarding and long-term retention, bridging design and engineering squads on mission-critical enterprise platforms.',
    clients: ['Bangalore Airport (BIAL)', 'Amazon SmartBiz', 'SBI MF — InvesTap NXT', 'Seclore', 'Times Network'],
    stats: [
      { k: '5', v: 'Marquee logos' },
      { k: 'Full-cycle', v: 'Sales + retention' },
      { k: 'Design ↔ dev', v: 'Cross-squad flow' },
    ],
    problem:
      'High-velocity enterprise product studios need rigorous leadership across the whole commercial lifecycle: sourcing Tier-1 institutional clients and scoping cross-disciplinary squads. Flagship accounts demanded white-glove executive relationship management, zero-defect client communication, and a seamless bridge between UX designers and backend engineers.',
    systems: [
      {
        title: 'Full-cycle commercial & account leadership',
        body:
          'Spearheaded the entire sales cycle from lead identification and C-suite discovery to contract onboarding and multi-year retention, consistently meeting or exceeding revenue targets.',
      },
      {
        title: 'Design ↔ development bridge',
        body:
          'Synthesized the operational requirements of flagship clients (SBI MF InvesTap NXT, BIAL passenger flows), removing friction between creative and engineering squads across concurrent high-priority initiatives.',
      },
      {
        title: 'Executive communications & QA rigour',
        body:
          'Owned direct relationships with senior client executives, proofread every client-facing deliverable to institutional standards, and ran proactive satisfaction frameworks.',
      },
    ],
    outcome:
      'Secured and delivered high-stakes digital product mandates for Bangalore Airport, Amazon SmartBiz, Seclore, Times Network and SBI Mutual Fund — accelerating time-to-market and sustaining elevated retention across Tier-1 accounts.',
  },
  {
    name: 'Zoftware',
    type: 'B2B SaaS aggregation',
    headline: 'Marketplace onboarding frameworks & lifecycle health scoring',
    blurb:
      'Architected onboarding playbooks and lifecycle health models for SMB and mid-market software aggregation — high volume without losing the white-glove tier.',
    stats: [
      { k: '3-track', v: 'Segmented onboarding' },
      { k: 'Behavioural', v: 'Health scoring' },
      { k: '30-60-90', v: 'Playbook standard' },
    ],
    problem:
      'A B2B software discovery and aggregation ecosystem serving thousands of vendors and buyers needed a scalable post-onboarding framework that could separate high-intent accounts from self-serve cohorts without bloating headcount.',
    systems: [
      {
        title: 'Segmented onboarding tracks',
        body:
          'Distinct high-touch, tech-touch and automated lifecycle paths based on buyer ACV potential and category intent.',
      },
      {
        title: 'Behavioural health-scoring engine',
        body:
          'Leading indicators of platform stickiness — shortlist creation, vendor comparison depth, RFPs initiated — used to trigger proactive outreach before accounts went dormant.',
      },
      {
        title: 'Playbook standardisation',
        body:
          'Modular playbooks for 30-60-90 day customer milestones, enabling rapid ramp-up for new customer success hires.',
      },
    ],
    outcome:
      'A foundational post-sales operating system able to handle high-volume marketplace liquidity while preserving white-glove advisory for high-value enterprise buyers.',
  },
  {
    name: 'SmartKarrot',
    type: 'CS intelligence SaaS',
    headline: 'Automation adoption playbooks & cross-team revenue cadences',
    blurb:
      'Designed onboarding playbooks that got customers to automated value faster, compressing time-to-value across client teams.',
    stats: [
      { k: 'Week 2', v: 'First health signals' },
      { k: 'Plug-and-play', v: 'Automation recipes' },
      { k: 'Chartered', v: 'Sales → CS handoff' },
    ],
    problem:
      'Customer intelligence platforms face an ironic challenge: buyers purchase sophisticated health-scoring and automation modules, then stall during implementation because of dirty CRM data and unclear ownership between RevOps and CS.',
    systems: [
      {
        title: 'Minimum viable telemetry onboarding',
        body:
          'Restructured implementation to launch with three core health signals in week two instead of waiting months for a perfect data-warehouse integration.',
      },
      {
        title: 'Automation adoption recipes',
        body:
          'Plug-and-play workflow templates for renewal forecasting, champion-change alerts and product-adoption dips.',
      },
      {
        title: 'Sales-to-CS handoff governance',
        body:
          'A mandatory commercial charter capturing pre-sales executive success criteria inside the post-sales onboarding workspace.',
      },
    ],
    outcome:
      'Materially lower implementation stall rates, with client CS leaders able to demonstrate measurable workflow automation ROI inside their first quarter.',
  },
];

export const metrics = [
  {
    k: '+30%',
    v: 'ARR expansion',
    note: '$1.0M → $1.3M at NTT DATA',
  },
  {
    k: '80%+',
    v: 'Gross retention',
    note: 'Multi-year contracts',
  },
  {
    k: '50%',
    v: 'Faster onboarding',
    note: 'Deepstash · activation redesign',
  },
];

export const certifications = [
  { org: 'Salesforce', items: ['AI Associate', 'Associate'] },
  { org: 'HubSpot', items: ['Sales Software', 'Inbound Sales'] },
];

export type Testimonial = {
  badge: string;
  quote: string;
  /** null until the person is named and consents — renders no name line. */
  name: string | null;
  role: string;
  company: string;
  href?: string;
};

export const testimonials: Testimonial[] = [
  {
    badge: '+30% portfolio ARR',
    quote:
      'Yug holds the room with enterprise VPs during Steering Committee negotiations, then pivots to diagnosing Salesforce and MuleSoft dependencies with engineering leads.',
    name: null,
    role: 'Enterprise delivery & practice leadership',
    company: 'NTT DATA North America portfolio · $1.0M+ ARR',
  },
  {
    badge: 'Samsung · Unilever · Titan',
    quote:
      'He replaced reactive check-ins with telemetry-backed QBRs that directly protected multi-brand renewals across our Tier-1 logos.',
    name: null,
    role: 'Executive leadership',
    company: 'Series B enterprise SaaS · video commerce',
  },
  {
    badge: 'First B2B motion',
    quote:
      'Most CSMs manage tickets; Yug builds systems — 50% faster onboarding and our first B2B corporate contracts.',
    name: null,
    role: 'Product & commercial leadership',
    company: 'High-growth B2B SaaS & operations',
  },
];

export type Essay = {
  n: string;
  short: string;
  read: string;
  kicker: string;
  tags: string[];
  title: string;
  dek: string;
  thesis: string;
  sections: { h: string; body: string }[];
  rule: string;
};

export const essays: Essay[] = [
  {
    n: '01',
    short: 'The post-telemetry QBR',
    read: '3 min read',
    kicker: 'Q4 executive brief',
    tags: ['Executive governance', 'Applied AI', 'Enterprise QBRs'],
    title: 'The post-telemetry QBR: synthesizing insight over 60-slide decks',
    dek: 'Why C-suite sponsors in New York and London tune out backward-looking ticket reviews — and how to run a 25-minute steering committee that drives expansion.',
    thesis:
      'The traditional 60-slide Quarterly Business Review is dead. Enterprise CIOs and VPs do not have 60 minutes to watch a CSM read out historical support ticket volumes and uptime percentages they already receive by automated email.',
    sections: [
      {
        h: 'The symptom: data rich, insight starved',
        body:
          'Across $1.0M+ ARR Salesforce and MuleSoft accounts, the main cause of executive disengagement isn’t poor technical delivery — it’s cognitive overload. When Client Partners show up to a steering committee with 40 slides of JIRA burn-downs and API call graphs, they force the executive sponsor to do the translation work between technical output and board-level outcomes.',
      },
      {
        h: 'The shift: a three-page decision brief',
        body:
          'Every executive review compresses into three high-signal artifacts. The value ledger quantifies cycle-time compression, revenue protected or OpEx retired since the last gate. The risk radar surfaces architectural or organisational blockers that need C-suite air cover. The commercial horizon maps upcoming business initiatives to adjacent platform capabilities.',
      },
      {
        h: 'Where applied AI changes the game',
        body:
          'Structured LLM synthesis over raw escalations, sprint retrospectives and middleware logs strips away roughly 80% of manual deck preparation. Instead of twelve hours formatting charts, the Client Partner spends that time pressure-testing the commercial narrative and pre-aligning with technical champions before the meeting starts.',
      },
    ],
    rule: 'Never use an executive meeting to report the weather. Prove the baseline asynchronously, and reserve live C-suite bandwidth for resource allocation, risk mitigation and expansion.',
  },
  {
    n: '02',
    short: 'Churn defence to expansion',
    read: '4 min read',
    kicker: 'Revenue architecture',
    tags: ['Net revenue retention', 'MuleSoft & Salesforce', 'Account expansion'],
    title: 'From churn defence to expansion signals in enterprise SaaS',
    dek: 'How operating with an engineering mindset turns routine middleware and CRM governance into a +30% ARR expansion engine.',
    thesis:
      'Most post-sales teams treat retention and expansion as separate motions — playing defence for ten months, then pitching an upsell 60 days before renewal. In complex enterprise architectures, they are the same discipline.',
    sections: [
      {
        h: 'Expansion lives inside the architecture',
        body:
          'Across enterprise accounts in North American REITs, InsurTech, consumer goods and wealth management, the strongest expansion signals rarely come from a cold sales call. They emerge inside delivery: an API rate limit approaching threshold, a newly acquired subsidiary needing ERP-to-Salesforce synchronisation, a manual claims workflow begging for orchestration.',
      },
      {
        h: 'The consultative change-order motion',
        body:
          'Expanding a $1.0M portfolio by 30% requires training delivery squads and architects to recognise commercial triggers without feeling like salespeople. Structured solution architecture reviews mid-contract frame capacity extensions as risk mitigation for the client’s own roadmap deadlines.',
      },
      {
        h: 'Protecting the 80%+ gross retention floor',
        body:
          'You earn the right to expand only when core delivery is bulletproof. That means multi-threaded relationships across the client’s VP of Engineering, Enterprise Architect and business-unit owner — so a single champion departure never jeopardises the baseline.',
      },
    ],
    rule: 'When a Client Partner understands the system architecture as deeply as the contract, upselling stops feeling like a pitch and starts feeling like roadmap alignment.',
  },
  {
    n: '03',
    short: 'The delivery–commercial divide',
    read: '3 min read',
    kicker: 'Operating philosophy',
    tags: ['Global operations', 'Client partner model', 'Systems thinking'],
    title: 'Bridging the delivery–commercial divide',
    dek: 'Lessons from ten years operating across US, UK, UAE and Indian enterprise corridors.',
    thesis:
      'The most expensive failure mode in enterprise B2B is the air gap between what account executives promise in New York or London and what global engineering squads actually build.',
    sections: [
      {
        h: 'Why pure relationship managers fail technical buyers',
        body:
          'Modern enterprise buyers — especially CIOs and VPs of platform engineering — have no patience for a relationship manager who takes notes and promises to check with the technical team. An engineering foundation and dual Salesforce / AI certifications mean integration bottlenecks get diagnosed live on the call.',
      },
      {
        h: 'Synchronising global timezone corridors',
        body:
          'Operating across US East and West, UK and India is a structural advantage when orchestrated deliberately. Architectural triage and build verification run during the IST/GMT morning overlap; clean, decision-ready executive options land during London and New York hours. The client experiences a 24-hour execution engine.',
      },
    ],
    rule: 'True enterprise partnership happens when the person accountable for the commercial P&L also speaks the native language of the engineers building the product.',
  },
];

export const elsewhere = [
  { label: 'LinkedIn', handle: '/in/yugjain', href: profile.linkedin, icon: 'linkedin' },
  { label: 'Email', handle: 'yugrjain@gmail.com', href: `mailto:${profile.email}`, icon: 'mail' },
  { label: 'Book 15 minutes', handle: 'Google Calendar', href: profile.calendar, icon: 'calendar' },
  {
    label: 'Résumé',
    handle: profile.resumeEnabled ? 'PDF · 2 pages' : 'PDF · on request',
    href: profile.resume,
    icon: 'file',
    disabled: !profile.resumeEnabled,
  },
];

/* Silent pattern player — the fingerstyle figure, no audio. */
export const song = {
  title: 'Stop This Train',
  artist: 'John Mayer',
  note: 'Percussive fingerstyle. Silent here, so you can read.',
  bpm: 92,
  pattern: [
    ['T', '', '', ''],
    ['', 'i', '', 'm'],
    ['', '', 'slap', ''],
    ['', 'm', '', 'i'],
  ] as string[][],
};

export const pitch = [
  { x: 50, y: 8, role: 'Striker', note: 'Owns the outcome. Owns the renewal.' },
  {
    x: 22,
    y: 38,
    role: 'Left half-space',
    note: 'Finds the lane nobody else is watching — expansion whitespace.',
  },
  {
    x: 50,
    y: 46,
    role: 'Central midfield',
    note: 'Where I actually play: between delivery and commercial, setting the tempo.',
  },
  {
    x: 78,
    y: 38,
    role: 'Right half-space',
    note: 'Overloads. Multi-threading an account with a second champion.',
  },
  {
    x: 50,
    y: 74,
    role: 'Deep-lying pivot',
    note: 'The 80% retention floor. Nothing else works if this is soft.',
  },
];

export const coffee = {
  title: 'Inverted AeroPress, 4-day split',
  blurb:
    'Single-origin, 200°F, inverted. Then a disciplined four-day resistance split — because governance cadence needs the same consistency.',
  steps: [
    { label: 'Invert & dose', note: '18g, medium-fine. Rinse the filter.' },
    { label: 'Bloom & steep', note: '60g water, 30s bloom, then top to 220g.' },
    { label: 'Press slow', note: 'Flip, press for 30 seconds. Stop at the hiss.' },
  ],
};

export const sectionNotes = {
  advisory: 'four mandates,\nsame posture',
  proof: 'the numbers,\nas I track them',
  play: 'yes, the guitar\nis real',
};
