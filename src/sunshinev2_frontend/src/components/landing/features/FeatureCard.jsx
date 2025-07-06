import React from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../../lib/theme'

export function FeatureCard({ feature }) {
  return (
    <motion.div
      className="cursor-pointer group p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-orange-500/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{
        y: -8,
        backgroundColor: theme.colors.background.cardHover,
        transition: {
          duration: 0.2,
          ease: 'easeOut',
          backgroundColor: {
            duration: 0.15,
          },
        },
      }}
    >
      <motion.div
        className="flex flex-col items-center text-center space-y-4"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div className="w-12 h-12 text-orange-500">
          {React.createElement(feature.icon, { className: 'w-full h-full' })}
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-100">{feature.title}</h3>
        <p className="text-gray-400">{feature.description}</p>
      </motion.div>
    </motion.div>
  )
}
