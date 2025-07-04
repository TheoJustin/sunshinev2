import React from 'react';
import { motion } from 'framer-motion';
import { theme } from '../../lib/theme';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="relative py-12 px-4 border-t border-white/10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          whileHover={{ scale: 1.05 }}
        >
          <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.gradients.primary}`}>
            SignalScribe
          </span>
        </motion.div>
        <nav className="mt-6 md:mt-0">
          <ul className="flex flex-wrap justify-center gap-8">
            {[
              { label: "Features", href: "#features" },
              { label: "Demo", href: "#demo" },
              { label: "Privacy", href: "#privacy" },
              { label: "Terms", href: "#terms" }
            ].map((link, index) => (
              <motion.li
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 md:mt-0 text-gray-400 text-sm">
          © {currentYear} SignalScribe. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
} 