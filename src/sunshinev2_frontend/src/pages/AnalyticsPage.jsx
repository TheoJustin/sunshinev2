import { useState, useEffect } from 'react'
import { Brain, Moon, Sun } from 'lucide-react'

const cryptoRecommendations = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    currentPrice: 43250,
    prediction: 87,
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    currentPrice: 2580,
    prediction: 34,
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    currentPrice: 98.5,
    prediction: -12,
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    currentPrice: 0.48,
    prediction: 56,
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    currentPrice: 0.85,
    prediction: 23,
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    currentPrice: 7.2,
    prediction: -8,
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    currentPrice: 14.8,
    prediction: 41,
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    currentPrice: 36.2,
    prediction: 19,
  },
]

export default function CryptoAnalytics() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (!darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                AI Crypto Predictions
              </h1>
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Next week predictions powered by AI
            </p>
          </div>

          {/* Dark Mode Toggle - Pure Tailwind Button */}
          <button
            onClick={toggleDarkMode}
            className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-yellow-500" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            )}
          </button>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cryptoRecommendations.map(crypto => (
            <div
              key={crypto.symbol}
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70 transition-all duration-300 p-6 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 cursor-pointer"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  {crypto.symbol.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {crypto.symbol}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{crypto.name}</p>
                </div>
              </div>

              {/* Current Price */}
              <div className="mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  ${crypto.currentPrice.toLocaleString()}
                </p>
              </div>

              {/* AI Prediction */}
              <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 rounded-xl p-4 border border-slate-200/50 dark:border-slate-600/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1 bg-blue-500/10 dark:bg-blue-400/10 rounded-lg">
                    <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    AI Prediction
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-2xl font-bold ${
                      crypto.prediction > 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-500 dark:text-red-400'
                    }`}
                  >
                    {crypto.prediction > 0 ? '+' : ''}
                    {crypto.prediction}%
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">next week</span>
                </div>

                {/* Prediction Bar */}
                <div className="mt-3">
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        crypto.prediction > 0
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{
                        width: `${Math.min(Math.abs(crypto.prediction), 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Predictions are generated by AI and should not be considered as financial advice
          </p>
        </div>
      </div>
    </div>
  )
}
