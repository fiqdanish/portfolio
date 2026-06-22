// =============================================================
// PROJECTS DATA
// =============================================================
// Each project has a `reflection` object with 4 keys matching
// the SECP3843 rubric. Fill these in with your own words before
// submission. Use a single empty string to leave a slot blank.
// =============================================================

export const projects = [
  {
    id: 'ppg-medallion',
    title: 'PPG Coatings RA and IRM Pipeline',
    course: 'Special Topic in Data Engineering · Industry Project',
    semester: 'Sem II 2025/26',
    status: 'Delivered', // 'Delivered' | 'In-progress' | 'Draft'
    featured: true,
    role: 'Pipeline engineering & dimensional modeling',
    summary:
      "End-to-end medallion architecture (bronze → silver → gold) for PPG's inventory data, built with Azure Data Factory, Azure Data Lake Gen 2, and Synapse Analytics. Galaxy schema with fact_inventory_status and fact_sales_order as the central fact tables, surfaced through Power BI.",
    stack: ['Azure', 'ADF', 'Databricks', 'Synapse', 'Power BI', 'Star Schema'],
    metadata: {
      Framework: 'Medallion (Bronze / Silver / Gold)',
      Modeling: 'Galaxy schema',
      Output: 'Curated gold-layer tables + BI dashboards',
      Role: 'Team Leader',
    },
    links: {
      repo: 'https://github.com/fiqdanish/ppg-data-pipeline'
    },
    reflection: {
      context: 'PPG is a global coatings manufacturer running operations across multiple regions, and the challenge our team was given was real: their inventory data was scattered across source systems with no unified analytical layer on top of it. The medallion architecture was the right answer because it separates concerns cleanly — bronze preserves the raw source truth, silver enforces quality and conformity, gold delivers business-ready data for reporting. Without that structure, any Power BI dashboard built on top would be inheriting every inconsistency from the source.',
      approach: 'My ownership was the ADF layer — the ingestion and orchestration piece that moves data from source into the bronze layer and triggers the downstream Databricks transformations. I configured the pipelines, set up the Self-Hosted Integration Runtime (SHIR) to bridge the on-premises source with Azure, integrated Key Vault for credential management so no secrets were hardcoded into the pipeline, and handled the Parquet output format that Databricks reads from ADLS Gen2. The team handled the Databricks silver transformations and the Synapse gold layer, which fed into the star schema centered on fact_inventory_status. The pipeline ran successfully end-to-end — bronze ingestion through to Power BI.',
      outcomes: 'The pipeline ran end-to-end successfully, which validated the architecture decisions made early in the project. What I had flag as a challenge rather than a blocker: ADF pipeline design is deceptively simple to start and increasingly complex to get right. The difference between a pipeline that runs once and a pipeline that handles failures gracefully, retries correctly, and logs meaningfully is significant. Our pipeline works — but if I am honest, it is more fragile than a production system should be. Error handling and retry logic were the parts we treated as secondary concerns that I treat as primary next time.',
      learning: 'If I redesigned the pipeline structure today, I had spend more time upfront on the orchestration design — specifically how parent and child pipelines are separated, where parameterization lives, and how failures at each layer surface to the monitoring layer. We built it somewhat linearly as we learned, which meant early decisions got inherited by later stages rather than being deliberately designed. The broader lesson is that a medallion architecture is only as clean as the contracts between its layers — bronze to silver to gold each need explicit expectations about schema, data types, and null handling, not just implicit ones. That is the design discipline I carry into the next pipeline project.',
    },
  },

  {
    id: 'carlist-scraping',
    title: 'carlist.my - Web Scraping Pipeline',
    course: 'High Performance Data Processing',
    semester: 'Sem II 2025/26',
    status: 'Delivered',
    featured: true,
    role: 'Solo',
    summary:
      'A scraping pipeline that pulled 150,000+ vehicle listings from carlist.my using Playwright The same dataset later transformed and anchored a benchmark study by performing empirical comparison of three Python data-processing strategies on the dataset.',
    stack: ['Python', 'Playwright', 'Pandas', 'Polars', 'Multiprocessing'],
    metadata: {
      Records: '150,000+ car listings',
      Output: 'Benchmark report + visualizations',
      Conclusion: 'Polars ~10× faster',
      Role: 'HPC Specialist',
    },
    links: {
      repo: 'https://github.com/fiqdanish/carlist-scraper',
      diagram: '',
    },
    reflection: {
      context: 'Used-car listings in Malaysia are spread across thousands of pages, with messy raw data — prices like "RM 63,999", mileage as ranges like "75 – 80K KM", locations crammed into one string. This project built a full pipeline around that: scrape a large dataset, clean it, and then answer a practical question — at ~150,000 rows, which data-processing approach actually pays off? The intuitive answer (add more CPU cores) turns out to be wrong, and proving that with real numbers is the point.',
      approach: 'Ihree stages: an asynchronous scraper with concurrency control, retries, and resumable progress to collect ~150k listings; a regex-based cleaning pipeline that normalized prices, mileage, seller types, and locations into a tidy dataset; and a benchmark running the same workload (load → filter → feature-engineering → aggregation) through three engines — single-threaded pandas, Python multiprocessing, and Polars — each measured for time, memory, CPU, and throughput.',
      outcomes: 'Polars won decisively — about 10× faster than pandas using half the memory. The most instructive result was a failure: multiprocessing was actually slower than the serial baseline while using the most memory. At this scale, the overhead of splitting data, spawning workers, and merging results outweighs the compute being parallelized — so the "obvious" optimization was a net loss.',
      learning: 'This reinforced choosing the right tool for the data scale instead of reaching for parallelism by default. Next time I will make the three pipelines strictly identical for a fairer comparison, and repeat the benchmark across a range of dataset sizes to find the crossover point where parallel and distributed approaches finally overtake a fast single-machine engine — since one data size only shows half the story.',
    },
  },

  {
    id: 'spark-etl-census',
    title: 'Spark ETL Pipeline — Brazilian National Education Census',
    course: 'Special Topic in Data Engineering',
    semester: 'Sem II 2025/26',
    status: 'Delivered',
    featured: false,
    role: 'Solo',
    summary:
      'Distributed ETL pipeline on the Brazilian Censo Escolar dataset using Apache Spark. Star schema centered on fact_censo_escolar, with conformed dimensions for school, location, and time.',
    stack: ['Apache Spark', 'Python', 'Docker', 'PostgreSQL', 'ETL'],
    metadata: {
      Engine: 'Apache Spark',
      Modeling: 'Star schema',
      Output: 'ETL report + fact/dim tables',
    },
    links: {
      repo: 'https://github.com/fiqdanish/spark-etl-censo-escolar',
    },
    reflection: { context: '', approach: '', outcomes: '', learning: '' },
  },

  {
    id: 'cell-towers',
    title: 'Cell Towers Worldwide — Big Data Processing',
    course: 'High Performance Data Processing',
    semester: 'Sem II 2025/26',
    status: 'Delivered',
    featured: false,
    role: 'Solo',
    summary:
      '~1.46 GB dataset processed in Google Colab with persistent Google Drive storage. Implemented five big-data strategies and wrote a full comparative markdown report.',
    stack: ['Pandas', 'Dask', 'Polars', 'Google Colab'],
    metadata: {
      Dataset: '~1.46 GB',
      Tools: 'Pandas · Dask · Polars',
      Strategies: '5 big-data techniques',
      Output: 'Comparative report',
    },
    links: { repo: 'https://github.com/fiqdanish/celltowers-bigdata-processing' },
    reflection: { context: '', approach: '', outcomes: '', learning: '' },
  },

    {
    id: 'flutter-attendance',
    title: 'eHadir - Attendance Management System',
    course: 'Application Development · Industry Project',
    semester: 'Sem II 2025/26',
    status: 'In-progress',
    featured: true,
    role: 'Group · Module Owner',
    summary:
      'Group proposal for a mobile attendance system. My modules: Taking Attendance and Report Discipline Issue.',
    stack: ['Flutter', 'Dart', 'Mobile'],
    metadata: {
      Stakeholder: 'IKM Johor Bahru',
      Deliverable: 'Proposaal + complete system',
      Role: 'Team Leader'
    },
    links: { demo: ' https://ehadir-beta.vercel.app/' },
    reflection: { context: '', approach: '', outcomes: '', learning: '' },
  },

  {
    id: 'esdm-housingallocation',
    title: 'Automatic University Housing Allocation System',
    course: 'Enterprise System Design Modelling · Industry Project',
    semester: 'Sem I 2025/26',
    status: 'Delivered',
    featured: true,
    role: 'Solo',
    summary:
      'An automated university student housing allocation platform designed to replace manual processes with an optimized low-code matching logic engine.',
    stack: ['SAP Build Apps', 'JavaScript'],
    metadata: {
      Stakeholder: 'Universiti Tun Hussein Onn',
      Deliverable: 'Complete system + documentation',
      Technology: 'Low-code development'
    },
    links: { repo: 'https://github.com/fiqdanish/university-automatic-housing-allocation-system',
      platform: 'SAP Build Apps (internal)'
     },
    reflection: { context: '', approach: '', outcomes: '', learning: '' },
  },

  {
    id: 'co2-emissions',
    title: 'Vehicle CO₂ Emission Analysis',
    course: 'Data Analytics Programming',
    semester: 'Sem II 2024/25',
    status: 'Delivered',
    featured: false,
    role: 'Solo',
    summary:
      'Exploratory data analysis on vehicle emissions, with Matplotlib and Seaborn visualizations identifying patterns across engine sizes, fuel types, and manufacturer segments to identify highest and lowest emmision of carbon dioxide by brands',
    stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
    metadata: {
      Type: 'Exploratory Data Analysis',
      Visualization: 'Matplotlib · Seaborn',
      Output: 'EDA report with insights',
    },
    links: { repo: 'https://github.com/fiqdanish/vehicle-co2-analysis' },
    reflection: { context: '', approach: '', outcomes: '', learning: '' },
  },

  {
    id: 'student-svm',
    title: 'Student Performance Machine Learning Analysis',
    course: 'Data Mining',
    semester: 'Sem II 2024/25',
    status: 'Delivered',
    featured: false,
    role: 'Solo',
    summary:
      'Supervised machine learning classification predicting student exam scores from demographic and academic features, with feature engineering and model tuning.',
    stack: ['Python', 'Machine Learning', 'scikit-learn', 'SVM', 'Feature Engineering'],
    metadata: {
      Algorithm: 'SVM (RBF kernel)',
      Library: 'scikit-learn',
      Output: 'Trained classifier + evaluation report',
    },
    links: { repo: 'https://github.com/fiqdanish/student-performance-ml' },
    reflection: { context: '', approach: '', outcomes: '', learning: '' },
  },

]

// All unique tech tags, useful for filtering
export const allTechTags = [
  ...new Set(projects.flatMap((p) => p.stack)),
].sort()
