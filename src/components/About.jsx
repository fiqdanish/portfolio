import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Briefcase, FileDown } from 'lucide-react'
import SectionHeader from './SectionHeader'

const facts = [
  {
    icon: GraduationCap,
    label: 'education',
    title: 'Universiti Teknologi Malaysia',
    sub: 'B.Sc. Computer Science (Data Engineering) · Faculty of Computing',
    meta: 'CGPA 3.94 · Expected to graduate 2027',
  },
  {
    icon: MapPin,
    label: 'based_in',
    title: 'Puchong, Selangor',
    sub: 'Open to relocation for the right role',
    meta: 'Not available at the moment due to internship',
  },
  {
    icon: GraduationCap,
    label: 'standing',
    title: 'CGPA 3.94 / 4.00',
    sub: 'Faculty of Computing · UTM',
    meta: 'Consistent across the Data Engineering programme',
  },
  {
    icon: Briefcase,
    label: 'leadership',
    title: 'PERSAKA — External Affairs Lead',
    sub: "Faculty of Computing student society",
    meta: 'Sept 2024 – July 2025',
  },
]

const skills = [
  { group: 'cloud_&_pipelines', items: ['Azure Data Factory', 'Databricks', 'Synapse Analytics', 'ADLS Gen2', 'AWS Foundation'] },
  { group: 'processing', items: ['Apache Spark', 'Apache Kafka', 'Polars', 'Pandas', 'Python multiprocessing'] },
  { group: 'bi_&_visualization', items: ['Power BI', 'Alteryx Designer', 'Matplotlib', 'Seaborn'] },
  { group: 'languages', items: ['Python', 'SQL (MySQL)', 'Dart', 'C', 'C++', 'Java'] },
  { group: 'tooling', items: ['GitHub', 'SAP Build Apps', 'VS Code'] },
]

const bio = [
  "I'm a Data Engineering undergraduate at the Faculty of Computing, UTM, with a 3.94 CGPA and a habit of taking projects further than the marking rubric asks. My work spans the full data path — from web-scale ingestion and cloud orchestration to dimensional modeling and BI delivery.",
  "What I enjoy most is the part where messy, unreliable data becomes something you can actually trust — scraping 150,000+ car listings into a clean dataset, or designing a dimensional model that makes a tangled business process finally make sense. I like the engineering discipline behind it: making things fast, reliable, and able to hold up when the data is bigger or uglier than expected.",
  "Outside the technical work, I lead the External Affairs team at PERSAKA, my faculty's computer science society — where I've learned things a code editor can't: coordinating people, delivering under a deadline, and representing a team. I'm now looking for a data engineering or analytics internship to put all of this to work.",
]

export default function About() {
  return (
    <section id="about" className="container-page border-t border-term-line py-20">
      <SectionHeader
        index="[01]"
        log="initializing_profile..."
        title="about"
        comment="who I am, in plain text."
        command="cat ~/about.md"
      />

      <div className="grid gap-10 lg:grid-cols-5">
        {/* readme / bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="panel p-6 lg:col-span-3"
        >
          <p className="comment text-xs mb-4">// readme.md</p>
          <div className="space-y-4 text-sm leading-relaxed text-fg/90">
            {bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </motion.div>

        {/* fact cards */}
        <div className="space-y-3 lg:col-span-2">
          {facts.map(({ icon: Icon, label, title, sub, meta }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="panel panel-hover border-l-2 border-l-rust p-4"
            >
              <div className="mb-1.5 flex items-center gap-2">
                <Icon size={13} className="text-rust" />
                <p className="font-mono text-xs text-muted">{label}:</p>
              </div>
              <p className="font-mono text-sm font-bold text-fg">{title}</p>
              <p className="mt-0.5 text-xs text-fg/80">{sub}</p>
              <p className="mt-1 font-mono text-[0.7rem] text-muted">{meta}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* competency layers */}
      <p className="comment mt-14 mb-4 text-sm">// competencies</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <motion.div
            key={g.group}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: (i % 3) * 0.06 }}
            className="panel p-4"
          >
            <h3 className="mb-3 font-mono text-sm text-rust">{g.group}</h3>
            <ul className="space-y-1.5">
              {g.items.map((item) => (
                <li key={item} className="font-mono text-[0.8rem] text-fg/85">
                  <span className="text-rust/60">›</span> {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
