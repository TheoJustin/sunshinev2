import React from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../lib/theme'
import { DemoPreview } from './demo/DemoPreview'

export function Demo() {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  }

  return (
    <section
      id="demo"
      className="relative py-32 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h2
            className={`text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r ${theme.gradients.primary}`}
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            Experience the Power
          </motion.h2>
          <DemoPreview />
        </motion.div>
      </div>
    </section>
  )
}
