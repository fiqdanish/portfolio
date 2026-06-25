import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import IndustryEngagement from './components/IndustryEngagement'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PipelineThread from './components/PipelineThread'

function App() {
  return (
    <div className="relative min-h-screen">
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
  )
}

export default App
