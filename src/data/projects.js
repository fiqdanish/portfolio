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
    reflection: { 
      context: 'This project builds an end-to-end ETL pipeline for Brazil Censo Escolar (school census) covering 2010–2021. Raw government census data is valuable but practically unusable — twelve years of large, messy CSV files. The pipeline turns that into a clean star schema in PostgreSQL, so questions like "how many schools have internet, by state and year?" become a simple query instead of a data-wrangling ordeal.', 
      approach: 'The pipeline runs in focused stages: download the yearly ZIPs from INEP in parallel, convert the CSVs to Parquet with Spark, model the data into dimension and fact tables, and load it into PostgreSQL — with a Docker stack of Postgres, Metabase, and Adminer to query and visualize the result. Key decisions were Spark for the data volume, a star schema for clean analytics, and a config-driven design so adding a dimension is a one-line change.', 
      outcomes: 'he config-driven schema worked well and kept the modelling code short and extensible. The real obstacles were environment issues: running Spark on Windows (needing HADOOP_HOME and file:/// path handling), setting driver memory via an env var before the JVM starts (a .config() call silently does nothing), disabling SSL verification for Brazil untrusted government certificates, and catching that the CSVs were iso-8859-1 with semicolon delimiters — which would have corrupted the Portuguese text if missed.', 
      learning: 'This maps onto the course data-engineering and warehousing outcomes. With more time I will orchestrate the stages with Airflow instead of running scripts by hand, move the hardcoded DB password into environment variables, and add data-quality checks plus idempotency so re-runs do not duplicate fact rows.' },
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
    reflection: { 
      context: 'This project tackled a real big-data problem: processing a 1.46 GB cell tower dataset (13.38 million rows across Asia) that pushes well past the comfortable limits of everyday tools. It matters because data at this scale appears constantly in telecommunications and network infrastructure work, and knowing how to handle files that strain or exceed available memory is a core skill for anyone moving from coursework into real data engineering.', 
      approach: 'I benchmarked three libraries — Pandas as the familiar baseline, Dask for its Pandas-like API and parallel partitioning, and Polars for its Rust-based speed — across five big-data strategies: loading less data, chunking, data type optimisation, sampling, and parallel processing. A custom measure_performance decorator automatically tracked execution time, memory peak, and DataFrame size for every run, auto-saving results to Google Drive so nothing was lost between Colab sessions. This setup made it possible to compare all libraries fairly on the same operations.', 
      outcomes: 'Polars clearly came out ahead, averaging around 21.7 seconds versus roughly 40 seconds for both Pandas and Dask, and producing the most compact DataFrames thanks to its Apache Arrow columnar format. Data type optimisation and loading fewer columns delivered the biggest memory savings. The surprise was that Dask did not always beat Pandas — on simple operations like "Load Less Data" its partition-management overhead made it dramatically slower (54.8s vs 2.1s), showing that parallelism only pays off when the workload is heavy enough to justify the coordination cost. A real limitation surfaced too: tracemalloc could not measure Polars memory because Rust manages memory outside Python, reading as near-zero.', 
      learning: 'This maps onto the course big-data handling and scalability outcomes. If I repeated it, I should use a substantially larger dataset to genuinely stress the libraries and expose advantages that a 1.46 GB file is too small to reveal. I will also lean harder into managing Colab session and memory limits from the start, and explore proper memory profiling tools that can see past Python into Rust, so the Polars comparison would be complete rather than partially blind.' },
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
      'A mobile attendance management system. Designed to collect student attendance records and have other features such as reporting and booking module.',
    stack: ['Flutter', 'Dart', 'Mobile'],
    metadata: {
      Stakeholder: 'IKM Johor Bahru',
      Deliverable: 'Proposaal + complete system',
      Role: 'Team Leader'
    },
    links: { 
      repo: 'https://github.com/chohjingyia23cs0296/eHadir',
      demo: ' https://ehadir-beta.vercel.app/' 
    },
    reflection: { 
      context: 'Attendance-taking and discipline reporting in colleges are still largely manual and paper-based, which is slow, error-prone, and hard to track in real time. eHadir matters because it digitises that whole flow — scheduling, attendance, and discipline reports — into one platform that lecturers and program heads can actually rely on day to day.', 
      approach: 'I built eHadir as a cross-platform Flutter application backed by Firebase. I chose Cloud Firestore for its real-time database so attendance and reports update instantly, Firebase Auth for secure role-based sign-in, and Riverpod for clean state management. This stack let me ship to web, mobile, and desktop from a single codebase without having to build and maintain my own server.', 
      outcomes: 'The role-based access (Pensyarah, Ketua Program, Ketua Jabatan) and the schedule-booking conflict prevention — which stops the same room being double-booked at the same time — came together well, as did wiring attendance directly into each schedule card so lecturers could mark students without switching screens. What did not come as easily was getting the Firestore data models and security rules right; I underestimated that part and had to rework the structure more than once before it held up.', 
      learning: 'I should plan the data structure and user roles properly up front instead of refactoring them midway, add offline support and automated tests, and lock down a consistent UI before piling on features. This maps directly to the course outcome of applying solid software design and database principles — building something that is maintainable, not just something that works.' },
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
      platform: 'SAP Build Apps'
     },
    reflection: { 
      context: 'This project mattered because UTHM, despite migrating most of its academic, administrative, and support systems to a new platform, still suffers from fragmented and only partially integrated systems — resulting in duplicated data, inconsistent workflows, and slower service delivery. Without a structured enterprise architecture approach, the university strategic ICT goals remain hard to achieve, which made designing a proper, well-aligned architecture a genuinely worthwhile problem to solve.', 
      approach: 'I started by analyzing UTHM existing systems and mapping the enterprise architecture in both AS-IS and TO-BE states, then scoped down to one focused sub-system — the Room Allocation Engine for hostel management. I modelled it thoroughly through use case, activity, sequence, ERD, and class diagrams before building it on SAP Build, a low-code platform chosen because it let us turn the design into a working application rapidly without heavy hand-coding, with SAP Analytics Cloud handling reporting and BI.', 
      outcomes: 'The modelling-first discipline paid off — having clear use cases and diagrams made the actual build in SAP Build far smoother, and strong team collaboration (equal contribution, active discussion, and progress tracked on GitHub) kept the report well-organized and on schedule. What was harder was getting the auto-allocation and conflict-checking logic to behave correctly within the constraints of a low-code environment, and bridging the gap between the broad EA vision and what could realistically be implemented in a single sub-system.', 
      learning: 'I would narrow the scope earlier and invest more time validating the allocation rules and data model up front, before building. This course ultimately maps to understanding how individual systems must fit into a larger, well-aligned enterprise architecture rather than being built in isolation — a mindset I would apply more deliberately and from the very start of future system design work.' },
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
    reflection: { 
      context: 'This project matters because cars are one of the biggest contributors to CO2 emissions, and understanding which makers and models pollute the most can help buyers, regulators, and manufacturers make greener choices. We took a large Malaysian car registration dataset (over 263,000 records) and combined it with a fuel consumption dataset to figure out the real-world emissions footprint of the cars actually on the road. The goal was to turn two separate, messy datasets into one clean source of insight about car emissions.', 
      approach: 'We built the project in Python using pandas for data cleaning and wrangling, and scikit-learn, matplotlib, and seaborn for analysis and visualization. The key decision was to merge the two datasets on normalized maker, model, and fuel type — we lowercased text, stripped whitespace, and mapped fuel codes (like X, Z, D, E) to readable categories so the records would actually match. After cleaning out missing values and duplicates, we grouped emissions by maker and model to rank the highest and lowest polluters, then applied K-Means clustering (with the elbow method to pick K=3) to group cars into emission tiers and visualized them with bar and scatter plots.', 
      outcomes: 'he biggest obstacle was matching the two datasets — out of 263,578 records, only about 8,000 survived the merge because makers, models, and fuel types were written inconsistently across the two files. Normalizing the text and building fuel-code mappings was what finally got the join to work, though we lost a lot of data in the process. We also hit small inconsistencies between our own versions of the code (for example, fuel code "E" was mapped to "ethanol" in one script but "electric" in another, and one script summed unrelated fuel columns together), which taught us to keep our cleaning logic consistent. Picking the right number of clusters was tricky too, so we leaned on the elbow method instead of guessing.', 
      learning: 'This project maps directly to the data preparation, aggregation, and machine learning topics from the course. Next time I would improve the merge by using fuzzy matching instead of exact string matching, so we should keep far more than 8,000 records. I would also cluster on multiple features (like fuel consumption and engine size together) rather than just average CO2, and lock down a single shared cleaning script from the start so all team members work from the same logic and avoid the small contradictions we ran into.' },
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
    reflection: { 
      context: 'Student success depends on many overlapping factors — study hours, attendance, parental involvement, resources, motivation. This project turns that vague question into a measurable one: can we predict student outcomes from these background features?', 
      approach: 'I built a Python (pandas + scikit-learn) pipeline that cleans the data (dropping missing values, duplicates, and impossible scores), bins continuous variables, and encodes categorical ones (label + ordinal). I then trained three SVM classifiers (RBF kernel, balanced weights) — one each for exam score, motivation level, and access to resources — with standardized features and full evaluation metrics plus a confusion-matrix heatmap.', 
      outcomes: 'The shared cleaned-CSV setup made the three insights consistent and easy to extend. The main struggle was class imbalance, which I handled with class_weight=balanced and stratified splits, using weighted F1 and the confusion matrix to see where the model failed. The harder limit was weak feature correlation — even a tuned SVM was capped by the data signal, not the algorithm.', 
      learning: 'Mapping to the course outcomes (preprocessing, classification, evaluation), I would compare SVM against other models, tune hyperparameters with GridSearchCV, use cross-validation instead of a single split, and apply feature selection or SMOTE to train on signal rather than noise.' },
  },

]

// All unique tech tags, useful for filtering
export const allTechTags = [
  ...new Set(projects.flatMap((p) => p.stack)),
].sort()
