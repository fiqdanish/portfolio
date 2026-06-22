// =============================================================
// INDUSTRY ENGAGEMENT
// =============================================================

export const industryEngagements = [
  {
    id: 'izeno-talk',
    type: 'Industry Talk',
    title: 'iZeno — Data & AI in Production',
    host: 'iZeno',
    date: 'May 26',
    location: 'Universiti Teknologi Malaysia',
    speakers: ['iZeno Team'],
    topics: ['Agentic AI', 'Retrieval-Augmented Generation (RAG)', 'Conversational BI', 'Production-Grade Data & AI', 'Scalability & Monitoring', 'Data Quality & Security',],
    summary:
      'Session covering practical Agentic AI architectures, the production realities of RAG systems, and emerging patterns in Conversational Business Intelligence.',
    reflection: {
      takeaway: 'Technical skills are the floor, not the ceiling. What separates a working prototype from a system that survives in production is everything around the model: scalability, data quality, monitoring, and security. That framing changed how I think about which skills to invest in next.',
      surprise: 'How much of AI in production is actually data engineering work. The model itself is often the smallest part — the surrounding pipeline, observability layer, and data quality checks carry most of the weight.',
      application: 'When I work on the PPG Medallion project and future pipelines, I will treat scalability and data quality as first-class design concerns from the start, not bolt-ons. The silver and gold layers are where this matters most — if quality isnt enforced there, every dashboard downstream inherits the problems.',
      questions: 'How does iZeno scope a RAG project data quality requirements before building? What does their production monitoring stack look like for LLM-powered features?',
    },
    links: {
      linkedinPost: 'https://www.linkedin.com/posts/afiqdanish279_dataandai-izeno-dataengineering-activity-7461332957702725632-1RuE?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEhVKSkBUIpyes-eN5AK8PdrN-CY-RscCsY',
    },
  },
  {
    id: 'ppg-visit',
    type: 'Industry Visit',
    title: 'PPG Global Technology Center Visit',
    host: 'PPG',
    date: 'April 26',
    location: 'Glenmarie, Shah Alam',
    speakers: ['PPG Team'],
    topics: ['SAP & Enterprise IT', 'Data Analytics Teams', 'Manufacturing Process Flow', 'Medallion Architecture', 'Internship Insights',],
    summary:
      'Visit to PPG  Digital IT Malaysia Technology Center in Glenmarie, covering the data analytics and SAP teams, the company end-to-end process flow from raw materials to final delivery, and a preview of the Medallion Architecture case study our team will be taking on.',
    reflection: {
      takeaway: 'Seeing how SAP and the data analytics teams sit inside a real manufacturing company connected the dots between what I study and how it actually gets applied. The full process flow from raw materials to final delivery isnt abstract once you watch a real company run on it.',
      surprise: 'How closely the data layer mirrors the physical operations — every step in the manufacturing flow has data behind it, which made Medallion Architecture feel less like a textbook pattern and more like the obvious answer to a real operational need.',
      application: 'Our upcoming project is a PPG case study built on Medallion Architecture, so everything from this visit — the process flow, how SAP feeds the analytics layer, how the data team is structured — feeds directly into how I approach the bronze/silver/gold design.',
      questions: 'How does PPG handle data quality between the SAP and analytics layers? What did the interning seniors learn fastest once they started? What is the team split between batch and streaming workloads?',
    },
    links: {
      linkedinPost: 'https://www.linkedin.com/posts/afiqdanish279_futuredataengineer-learningjourney-ppg-activity-7447896188043075585-_e5G?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEhVKSkBUIpyes-eN5AK8PdrN-CY-RscCsY',
    },
  },
  {
    id: 'uthm-visit',
    type: 'Industry Visit',
    title: 'UTHM Digital Visit',
    host: 'UTHM',
    date: 'December 25',
    location: 'Universiti Tun Hussein Onn Malaysia',
    speakers: ['UTHM Digital Team'],
    topics: ['Digital Transformation',
    'Enterprise Systems',
    'IT Infrastructure',
    'Academic Operations',
    'Administrative Workflows'],
    summary:
      'Field visit to UTHM Digital Centre as part of the enterprise system project, observing how IT infrastructure and enterprise systems support a university day-to-day academic and administrative operations.',
    reflection: {
      takeaway: 'Enterprise systems are visible mostly when they fail. Seeing UTHM Digital Centre made the invisible parts visible — the systems that quietly carry course registration, finance, HR, and student records every day. Digital transformation is not a project you finish but it is a posture you maintain.',
      surprise: 'How much intentional planning sits behind what looks like routine operations.',
      application: 'The visit reframed my enterprise system coursework as a real engineering discipline rather than an abstract topic. When I work on data pipelines for an organisation, I now think more about how the data layer connects to the operational systems above it, not just the analytics layer below.',
      questions: 'What was UTHM hardest integration decision during their transformation? How do they balance vendor solutions vs. in-house development?',
    },
    links: {
      linkedinPost: 'https://www.linkedin.com/posts/afiqdanish279_industrialvisit-learningexperience-digitaltransformation-activity-7407290382809468928-pBoe?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEhVKSkBUIpyes-eN5AK8PdrN-CY-RscCsY',
    },
  },
  {
    id: 'ppg-talk',
    type: 'Industry Talk',
    title: 'PPG — SAP Enterprise Architecture & ERP in Global Operations',
    host: 'ppg',
    date: 'November 2025',
    location: 'Universiti Teknologi Malaysia',
    speakers: ['Mr Patrick Thong (SAP CoE Operation Stream Lead, APAC)',
    'Ms Sui Chin',],
    topics: ['SAP Workstreams',
    'Demand to Replenish (D2R)',
    'Order to Cash (O2C)',
    'Procure to Pay (P2P)',
    'Record to Report (R2R)',
    'Cloud SAP · AI & IoT Integration',
    'ERP Career Paths & Job Security',],
    summary:
      'Session covering practical Agentic AI architectures, the production realities of RAG systems, and emerging patterns in Conversational Business Intelligence.',
    reflection: {
      takeaway: 'What this talk made concrete — and what my own reflection at the time captured — is that SAP is not a software tool, it is the connective tissue of a global operation. Every cycle Mr Patrick described (D2R, O2C, P2P, R2R) is essentially a data pipeline with business semantics on top: inventory signals trigger replenishment, customer orders trigger cash flows, supplier invoices trigger payments, financial data triggers compliance reporting. Seen that way, ERP and data engineering are not separate disciplines — they are the same problem at different layers of the stack.',
      surprise: 'The framing of SAP as a career path with strong job security — not just a technical skill — was something I had not considered before this talk. Mr Patrick made the point that global dependence on SAP means the demand for people who understand both functional and technical dimensions is structurally high and unlikely to disappear. That argument landed differently after the PPG Global Technology Center visit, where I could actually see the SAP and data analytics teams sitting alongside each other.',
      application: 'This talk directly shaped how I approach the PPG industry project. Understanding the four SAP cycles — especially D2R and R2R — gave me a clearer picture of what the data in our Medallion pipeline actually represents. The bronze layer is not just raw data; it is the output of operational SAP processes. The gold layer that feeds Power BI is essentially what R2R (Record to Report) is trying to achieve. Knowing that context changes how I had design the schema and what I had treat as a critical field vs. a supplementary one.',
      questions: 'How does PPG data engineering team consume SAP output — direct database extracts, SAP APIs, or event streams? ',
    },
    links: {
      linkedinPost: 'https://www.linkedin.com/posts/afiqdanish279_ppg-sap-erp-activity-7396168380443115520-wyUu?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEhVKSkBUIpyes-eN5AK8PdrN-CY-RscCsY',
    },
  },
  {
    id: 'credence-talk',
    type: 'Industry Talk',
    title: 'Credence (TM Subsidiary) — System Development & The Data Engineer Path',
    host: 'Credence — a Telekom Malaysia subsidiary',
    date: 'January 2024',
    location: 'Universiti Teknologi Malaysia',
    speakers: ['Ms Qistina Batrisyia binti Azman Shah'],
    topics: [
      'System Development Life Cycle',
      'BI & Visualization',
      'Workflow Orchestration (Airflow · Spark · DAGs)',
      'Data Engineering Languages (Python · SQL · Bash)',
      'Skills Required to Become a Data Engineer'
    ],
    summary:
      "Talk by Ms Qistina Batrisyia from Credence — TM's cloud and digital services subsidiary — covering Credence's tooling stack (Tableau, Power BI, Airflow, Spark, Python, SQL, Bash), the SDLC framework they apply to client projects, and what the role of a data engineer actually looks like day to day.",
    reflection: {
      takeaway:
        "Hearing the actual stack a working data engineer uses — Airflow and Spark for orchestration, Tableau and Power BI for the consumer layer, Python and SQL holding everything together — collapsed the gap between 'topics in a syllabus' and 'tools that ship real work.' My biggest takeaway, which I wrote down at the time, was that succeeding in this field needs three things together: problem-solving, communication with clients, and the willingness to keep learning. I still believe that, but I'd add a fourth now: the discipline to follow a system through end-to-end, not just the part that's interesting.",

      surprise:
        "Credence had only been founded in July 2022, yet it was already operating across cloud advisory, infrastructure migration, SaaS, and analytics — the full 'insights to infrastructure' spread. Coming from a coursework view of the industry, I'd assumed scope this wide took decades to build. Seeing it built that fast inside an established parent (TM) reframed how I think about where opportunity actually sits — not always in the oldest or the newest companies, but in the new arms of established ones.",

      application:
        "This was the talk that first put Airflow and Spark on my radar as things to learn properly, not just recognize. Two years on, both showed up in my HPDP coursework and the PPG Medallion project — Spark for the ETL on the Brazilian Census dataset, and the same orchestration thinking baked into how ADF pipelines are structured. The tool list from this talk basically became a checklist I worked through during the rest of the degree.",

      questions:
        "What does the handoff look like between their data engineering and BI teams? For a fresh graduate joining today, which part of their stack would they expect a junior to own first?",
    },
    links: {
      linkedinPost: 'https://www.linkedin.com/posts/afiqdanish279_credence-talk-report-activity-7153414785336754177-gW1t?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEhVKSkBUIpyes-eN5AK8PdrN-CY-RscCsY',
    },
  },
  {
    id: 'petronas-visit',
    type: 'Industry Visit',
    title: 'Petronas Visit',
    host: 'Petronas',
    date: 'November 2023',
    location: 'ExxonMobil Tower, Kuala Lumpur',
    speakers: ['Mr Roman Kvaska', 'Mr Ninderjit Singh'],
    topics: [
      'IT Infrastructure at Scale',
      'Cybersecurity by Department',
      'Software Engineering Skills',
      'Career Advice & Job Hunting',
      'Tech Stack for Data Management',
    ],
    summary:
      "Visit to Petronas at the ExxonMobil Tower, with sessions from Head of Software Engineering Roman Kvaska and infrastructure specialist Ninderjit Singh — covering how Petronas manages its global IT infrastructure, embeds cybersecurity teams at the department level, and what they actually look for when hiring engineers.",
    reflection: {
      takeaway:
        "The detail that stuck with me from Mr Ninderjit's session was that Petronas runs a cybersecurity team inside each individual department rather than in one central security silo. That structure means the people protecting the data are the same people who understand what the data does — a design decision with real implications for how I think about data access control and governance in pipeline work. Mr Roman's framing of the job hunt was equally memorable: consistency and passion matter as much as technical skill. At the time I wrote that down and moved on. Looking back now, I think what he actually meant is that technical skill gets you the interview — everything else determines whether you last.",

      surprise:
        "Petronas' position on AI replacing engineers was more measured than I expected from a company that size. Mr Roman's argument wasn't that AI is overhyped, but that human accuracy, contextual judgment, and emotional intelligence are genuinely hard to replace in engineering decisions — especially in an industry where a bad call has physical consequences. In 2022 that felt reassuring. In 2026, with Agentic AI in production, I'd push back harder on it — but the underlying point about judgment vs. automation still holds.",

      application:
        "This visit was the first time I saw cybersecurity framed as a data engineering concern rather than a separate IT function. That connection became relevant later when working on the PPG Medallion project — particularly around Key Vault integration and controlling who can access which layer of the pipeline. The 'security per department' model Petronas described is essentially what role-based access control in Azure tries to replicate at the architecture level.",

      questions:
        "How has Petronas' stance on AI in engineering decisions shifted since 2022? How does their per-department cybersecurity model handle cross-department data sharing? What does their data engineering team's stack look like at the pipeline layer — is it Spark-based, cloud-native, or something custom?",
    },
    links: {
      linkedinPost: 'https://www.linkedin.com/posts/afiqdanish279_newsletter-petronas-huawei-activity-7153388512224886784-cr0E?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEhVKSkBUIpyes-eN5AK8PdrN-CY-RscCsY',
    },
  },
  {
    id: 'huawei-visit',
    type: 'Industry Visit',
    title: 'Huawei Visit',
    host: 'Huawei Malaysia',
    date: 'November 2023',
    location: 'Huawei Customer Solution Innovation Centre, Kuala Lumpur',
    speakers: ["Huawei Malaysia's Technical Team"],
    topics: [
      '5G Infrastructure',
      'HarmonyOS & Huawei Cloud',
      'Smart Education Technology',
      'Renewable Energy',
      'Intelligent Wind Power Network Solution',
    ],
    summary:
      "Visit to Huawei's Customer Solution Innovation Centre in KL, covering their product range from server infrastructure and Huawei Cloud to smart boards, EV chargers, and the Intelligent Wind Power Network Solution — alongside frank discussion about the geopolitical and cybersecurity challenges the company navigates.",
    reflection: {
      takeaway:
        "What I didn't expect from Huawei was the breadth — the same company building 5G infrastructure is also building EV chargers, solar panels, and smart classroom boards. The connective thread is real-time data: every product generates it, transmits it, or acts on it. Seeing that scope in one building reframed how I think about what 'data infrastructure' means at the enterprise level — it isn't just databases and pipelines, it's the physical layer underneath everything.",

      surprise:
        "The Intelligent Wind Power Network Solution stood out — not because renewable energy is surprising, but because the feature they highlighted was real-time data backhaul. A wind farm producing telemetry that feeds back into a central monitoring system is, structurally, the same engineering problem as a manufacturing plant feeding inventory data into a medallion pipeline. The domain is different, the data engineering pattern is identical. That connection wasn't obvious to me before the visit.",

      application:
        "The geopolitical dimension of the visit — Huawei navigating trade restrictions while maintaining global infrastructure — planted an early awareness that the technology decisions companies make are never purely technical. Cloud provider selection, data residency, vendor lock-in: all of these have political and regulatory dimensions that a data engineer working at a multinational has to understand. That awareness has quietly shaped how I think about cloud architecture decisions, particularly around Azure vs AWS trade-offs in a Malaysian enterprise context.",

      questions:
        "How does Huawei Cloud position itself against AWS and Azure in Southeast Asia specifically? What does the data pipeline look like behind the Intelligent Wind Power Network Solution — batch or streaming? How do they handle data sovereignty requirements across the different countries their infrastructure operates in?",
    },
    links: {
      linkedinPost: 'https://www.linkedin.com/posts/afiqdanish279_newsletter-petronas-huawei-activity-7153388512224886784-cr0E?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEhVKSkBUIpyes-eN5AK8PdrN-CY-RscCsY',
    },
  },
]
