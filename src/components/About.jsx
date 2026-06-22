import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Briefcase } from 'lucide-react'

const facts = [
  {
    icon: GraduationCap,
    label: 'Education',
    title: 'Universiti Teknologi Malaysia',
    sub: 'B.Sc. Computer Science (Data Engineering) · Faculty of Computing',
    meta: 'CGPA 3.94 · Expected to Graduate at 2027',
  },
  {
    icon: MapPin,
    label: 'Based in',
    title: 'Puchong, Selangor',
    sub: 'Open to relocation for the right role',
    meta: 'Available for internships now',
  },
  {
    icon: GraduationCap,
    label: 'Academic standing',
    title: 'CGPA 3.94 / 4.00',
    sub: 'Faculty of Computing · Universiti Teknologi Malaysia',
    meta: 'Consistent across the Data Engineering programme',
  },
  {
    icon: Briefcase,
    label: 'Leadership',
    title: 'PERSAKA — External Affairs Lead',
    sub: 'Faculty of Computing student society',
    meta: 'Sept 2024 – July 2025',
  },
]

const skills = [
  { group: 'Cloud & Pipelines', items: ['Azure Data Factory', 'Databricks', 'Synapse Analytics', 'ADLS Gen2', 'AWS Foundation'] },
  { group: 'Processing',        items: ['Apache Spark', 'Apache Kafka', 'Polars', 'Pandas', 'Python multiprocessing'] },
  { group: 'BI & Visualizations', items: ['Power BI', 'Alteryx Designer', 'Matplotlib', 'Seaborn'] },
  { group: 'Languages',         items: ['Python', 'SQL (MySQL)', 'Dart', 'C', 'C++', 'Java'] },
  { group: 'Tooling',           items: ['GitHub', 'SAP Build Apps', 'VS Code'] },
]

export default function About() {
  return (
    <section id="about" className="py-20 border-t border-rule">
      <p className="section-label">[ 01 · about ]</p>
      <h2 className="heading-display text-3xl sm:text-5xl mb-6">About me</h2>

      <div className="grid lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-3 space-y-5 text-paper leading-relaxed">
          <p className="text-lg">
            I'm a Data Engineering undergraduate at the Faculty of Computing, UTM,
            with a 3.94 CGPA and a habit of taking projects further than the
            marking rubric asks. My work spans the full data path from
            web-scale ingestion and cloud orchestration to dimensional modeling
            and BI delivery.
          </p>
          <p className="text-silver italic">
            What I enjoy most is the part where messy, unreliable data becomes
            something you can actually trust — scraping 150,000+ car listings and
            wrestling them into a clean dataset, or designing a star schema that
            makes a tangled business process finally make sense. I like the
            engineering discipline behind it: making things fast, making them
            reliable, and making them hold up when the data is bigger or uglier
            than expected.
          </p>
          <p className="text-silver italic">
            Outside the technical work, I lead the External Affairs team at PERSAKA,
            my faculty's computer science society, where I've learned things a code
            editor can't — how to coordinate people, deliver under a deadline, and
            represent a team in external communications. I'm now looking for a data
            engineering or analytics internship where I can turn raw data into
            reliable systems and put all of this to work.
          </p>
        </div>

        <div className="lg:col-span-2 space-y-3">
          {facts.map(({ icon: Icon, label, title, sub, meta }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-ink-2 p-5 rounded border-l-2 border-azure hover:border-gold transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon size={14} className="text-silver" />
                <p className="font-mono text-xs text-silver uppercase tracking-wider">
                  {label}
                </p>
              </div>
              <p className="font-display text-lg mb-1">{title}</p>
              <p className="text-sm text-paper mb-1">{sub}</p>
              <p className="text-xs text-silver">{meta}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Skills matrix */}
      <div>
        <p className="font-mono text-xs text-silver uppercase tracking-wider mb-4">
          Technical stack
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {skills.map((g) => (
            <div key={g.group}>
              <h3 className="font-display text-base text-gold mb-2">{g.group}</h3>
              <ul className="text-sm text-paper space-y-1">
                {g.items.map((item) => (
                  <li key={item} className="font-mono text-[0.85rem]">
                    <span className="text-silver">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
