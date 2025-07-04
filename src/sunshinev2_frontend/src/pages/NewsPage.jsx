import React from 'react'
import { motion } from 'framer-motion'
import { theme } from '../lib/theme'
import { jumboNews, news } from '../constants/news'
import { NewsJumbotron } from '../components/news/NewsJumbotron'
import { NewsCard } from '../components/news/NewsCard'

export default function NewsPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className={`text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r ${theme.gradients.primary}`}
          >
            Crypto News
          </h1>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Stay updated with the latest headlines and developments in the cryptocurrency world.
          </p>
        </motion.div>

        <div className="mb-12">
          <NewsJumbotron news={jumboNews} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {news.map(news => (
            <NewsCard
              key={news.id}
              news={news}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
