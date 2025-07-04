import { motion } from 'framer-motion'

export function NewsCard({ news }) {
  return (
    <motion.a
      href={news.url}
      className="group relative flex items-center gap-4 p-4 rounded-xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500/50 to-purple-500/50" />

      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={news.image}
          alt={news.headline}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-2 text-sm">
          <span className="text-orange-400 font-medium">{news.source}</span>
          <span className="w-1 h-1 rounded-full bg-gray-600" />
          <span className="text-gray-400">{news.date}</span>
        </div>
        <h3 className="text-base font-semibold text-gray-100 group-hover:text-orange-500 transition-colors duration-300 mb-1 line-clamp-2">
          {news.headline}
        </h3>
        <div className="flex items-center text-orange-500 text-sm">
          <span>Read article</span>
          <span className="ml-1">→</span>
        </div>
      </div>
    </motion.a>
  )
}
