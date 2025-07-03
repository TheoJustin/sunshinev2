import React from 'react';
import { motion, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { theme } from '../../lib/theme';

export function Hero({ scrollY }) {
  const springConfig = { damping: 15, stiffness: 100 };
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Use separate spring configs for smoother animations
  const scaleSpring = useSpring(scale, { damping: 30, stiffness: 100 });
  const opacitySpring = useSpring(opacity, { damping: 25, stiffness: 90 });

  return (
    <header className="relative flex flex-col items-center justify-center min-h-[90vh] py-12 px-4 text-center">
      <motion.div
        className="space-y-6 max-w-4xl mx-auto"
        style={{ 
          scale: scaleSpring,
          opacity: opacitySpring
        }}
      >
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1 
              className={`text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${theme.gradients.primary} pb-2`}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
            >
              SignalScribe
            </motion.h1>
          </motion.div>
        </AnimatePresence>
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Predict. Trade. Prosper. Your intelligent crypto companion for next-generation trading insights.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <HeroButton href="#features" variant="primary">
            Get Started
            <motion.svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </motion.svg>
          </HeroButton>
          <HeroButton href="#demo" variant="secondary">
            View Demo
            <motion.svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </motion.svg>
          </HeroButton>
        </motion.div>
      </motion.div>
    </header>
  );
}

function HeroButton({ href, variant = "primary", children }) {
  const baseClasses = "group px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center";
  const variants = {
    primary: `bg-gradient-to-r ${theme.gradients.primary} shadow-lg hover:shadow-orange-500/25`,
    secondary: "bg-white/10 backdrop-blur-sm hover:bg-white/15"
  };

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  );
} 