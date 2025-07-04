import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

export function Demo() {
  const fadeInUp = {
    initial: { y: 60, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] }
  };

  return (
    <section id="demo" className="relative py-32 px-4">
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
  );
}

function DemoPreview() {
  return (
    <motion.div 
      className="relative aspect-video rounded-xl overflow-hidden bg-[#1A1F35] border border-white/10"
      whileHover={{ scale: 1.01 }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-transparent to-black/20">
        <motion.div 
          className="text-gray-400 flex items-center space-x-3"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.svg 
            className="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </motion.svg>
          <span className="text-lg">Dashboard Preview Coming Soon</span>
        </motion.div>
      </div>
    </motion.div>
  );
} 