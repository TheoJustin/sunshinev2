import React from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../lib/theme'
import { features } from '../../constants/features'
import { FeatureCard } from './features/FeatureCard'

export function Features() {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] },
  }

  return (
    <section
      id="features"
      className="relative py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className={`text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r ${theme.gradients.primary}`}
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          Future of Crypto Trading
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
