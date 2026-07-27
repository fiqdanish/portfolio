import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App.jsx'
import { spring } from './lib/motion'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* §4 spring by default everywhere; §14 respect prefers-reduced-motion globally */}
    <MotionConfig reducedMotion="user" transition={spring}>
      <App />
    </MotionConfig>
  </StrictMode>,
)
