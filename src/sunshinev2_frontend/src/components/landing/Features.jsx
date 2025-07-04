import React from 'react'
import { motion } from 'framer-motion'
import { theme } from '../../lib/theme'
import { WalletIcon, PredictionIcon, AnalyticsIcon } from '../ui/Icons'

const features = [
  {
    icon: WalletIcon,
    title: 'Secure Wallet',
    description:
      'Protect your digital assets with reliable, high-strength encryption designed to ensure privacy and security.',
  },
  {
    icon: PredictionIcon,
    title: 'AI Predictions',
    description:
      'Advanced machine learning algorithms to forecast market movements with precision.',
  },
  {
    icon: AnalyticsIcon,
    title: 'Real-time Analytics',
    description: 'Interactive charts and deep market insights at your fingertips.',
  },
]

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

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      className="cursor-pointer group p-8 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 hover:border-orange-500/50"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        // ease: "eas"
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
