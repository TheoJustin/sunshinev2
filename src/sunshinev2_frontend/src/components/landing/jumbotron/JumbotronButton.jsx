import { motion } from 'framer-motion'
import { theme } from '../../../lib/theme'

export function JumbotronButton({ href, variant = 'primary', children }) {
  const baseClasses =
    'group px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center'
  const variants = {
    primary: `bg-gradient-to-r ${theme.gradients.primary} shadow-lg hover:shadow-orange-500/25`,
    secondary: 'bg-white/10 hover:bg-white/15',
  }

  return (
    <motion.a
      href={href}
      className={`${baseClasses} ${variants[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.a>
  )
}
