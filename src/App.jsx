import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import IndustryEngagement from './components/IndustryEngagement'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BinaryRain from './components/BinaryRain'
import ScrollTopButton from './components/ScrollTopButton'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Falling binary backdrop (z-0, behind everything). */}
      <BinaryRain />

      {/* All content sits above the backdrop. */}
      <div className="relative z-10">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
                     focus:bg-rust focus:text-term-bg focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>

        <Nav />

        <main id="main">
          <Hero />
          <About />
          <Projects />
          <Certifications />
          <IndustryEngagement />
          <Contact />
        </main>

        <Footer />
      </div>

      <ScrollTopButton />
    </div>
  )
}

export default App
