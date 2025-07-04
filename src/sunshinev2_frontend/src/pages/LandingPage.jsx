import React from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { theme } from '../lib/theme'
import { Hero } from '../components/landing/Hero'
import { Features } from '../components/landing/Features'
import { Demo } from '../components/landing/Demo'
import { Footer } from '../components/landing/Footer'

function LandingPage() {
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const springConfig = { damping: 15, stiffness: 100 }
  const ySpring = useSpring(backgroundY, springConfig)

  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-hidden relative">
      <motion.div
        className={`fixed inset-0 bg-gradient-to-br ${theme.gradients.background}`}
        style={{ opacity: useSpring(useTransform(scrollY, [0, 300], [1, 0]), springConfig) }}
      />
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className={`absolute top-[10%] left-[5%] w-72 h-72 rounded-full blur-3xl ${theme.gradients.glow.primary}`}
          style={{ y: ySpring }}
        />
        <motion.div
          className={`absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full blur-3xl ${theme.gradients.glow.secondary}`}
          style={{ y: useSpring(useTransform(scrollY, [0, 500], [0, 100]), springConfig) }}
        />
      </div>

      <Hero scrollY={scrollY} />
      <Features />
      <Demo />
      <Footer />
    </div>
  )
}

export default LandingPage
