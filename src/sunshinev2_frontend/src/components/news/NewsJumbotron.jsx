import { motion } from 'framer-motion'

export function NewsJumbotron({ news }) {
  return (
    <motion.a
      href={news.url}
      className="group block relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={news.image}
            alt={news.headline}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center space-x-3 mb-3">
            <span className="px-2 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs">
              Featured
            </span>
            <span className="text-gray-400 text-sm">{news.date}</span>
          </div>
          <h2 className="text-xl md:text-3xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors duration-300">
            {news.headline}
          </h2>
          <p className="text-gray-300 text-base md:text-lg max-w-3xl line-clamp-2">
            {news.summary}
          </p>
          <div className="mt-4 flex items-center text-gray-400">
            <span className="text-sm">{news.source}</span>
            <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  )
}
