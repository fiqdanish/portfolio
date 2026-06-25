import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import IndustryEngagement from './components/IndustryEngagement'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PipelineThread from './components/PipelineThread'
import AnimatedBackground from './components/AnimatedBackground'
import GlassFilter from './components/GlassFilter'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Animated, cursor-reactive WebGL backdrop (z-0, behind the content). */}
      <AnimatedBackground />
      {/* Light scrim so text stays legible over the brightest cursor glow,
          while the moving light still blooms through the glass. */}
      <div aria-hidden="true" className="fixed inset-0 z-0 bg-ink/20" />
      {/* SVG displacement filter that the .glass utilities refract through. */}
      <GlassFilter />

      {/* All content sits above the backdrop. */}
      <div className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                     focus:bg-paper focus:text-ink focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>

        <Nav />
        <PipelineThread />

        <main id="main" className="container-page">
          <Hero />
          <About />
          <Projects />
          <Certifications />
          <IndustryEngagement />
          <Contact />
        </main>

        <Footer />
      </div>

      <CustomCursor />
    </div>
  )
}

export default App
