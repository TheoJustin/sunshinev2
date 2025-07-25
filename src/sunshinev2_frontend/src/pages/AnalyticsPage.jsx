import { useState, useEffect } from 'react';
import { Brain, Moon, Sun } from 'lucide-react';
import { DUMMY_HISTORICAL_DATA, DUMMY_COIN_LIST } from '../constants/graph';

const cryptoRecommendations = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    prediction: 100315.0390625,
    link: "/logos/Bitcoin.png"
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    prediction: 1878.9078369140625,
    link: "/logos/eth.svg"
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    prediction: 169.88856506347656,
    link: "/logos/solana.png"
  },
  {
    symbol: 'ADA',
    name: 'Cardano',
    prediction: 0.723859965801239,
    link: "/logos/cardano.png"
  },
  {
    symbol: 'MATIC',
    name: 'Polygon',
    prediction: 0.24037639796733856,
    link: "/logos/matic.png"
  },
  {
    symbol: 'DOT',
    name: 'Polkadot',
    prediction: 4.068361282348633,
    link: "/logos/polkadot.png"
  },
  {
    symbol: 'LINK',
    name: 'Chainlink',
    prediction: 16.365209579467773,
    link: "/logos/chainlink.png"
  },
  {
    symbol: 'AVAX',
    name: 'Avalanche',
    prediction: 21.866544723510742,
    link: "/logos/avalanche.png"
  },
];

export default function CryptoAnalytics() {
  const [darkMode, setDarkMode] = useState(false);

  const updatedRecommendations = cryptoRecommendations.map(crypto => {
    const coinInfo = DUMMY_COIN_LIST.find(c => c.symbol === crypto.symbol);
    const historicalData = coinInfo ? DUMMY_HISTORICAL_DATA[coinInfo.id] : [];
    const currentDataPoint = historicalData?.find(d => d.x === '0');
    const currentPrice = currentDataPoint ? currentDataPoint.y : 0;
    const percentageChange =
      currentPrice !== 0 ? ((crypto.prediction - currentPrice) / currentPrice) * 100 : 0;

    return {
      ...crypto,
      currentPrice: currentPrice,
      percentageChange: percentageChange,
    };
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              {/* <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div> */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {updatedRecommendations.map(crypto => (
            <div
              key={crypto.symbol}
              className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl dark:shadow-slate-900/50 dark:hover:shadow-slate-900/70 transition-all duration-300 p-6 border border-slate-200/50 dark:border-slate-700/50 hover:scale-105 cursor-pointer"
            >
              {/* Header */}
              <div className="flex gap-4 mb-4">
                <img
                  src={crypto.link}
                  alt={`${crypto.name} logo`}
                  className="m-0 w-12 h-12 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                />
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
                  <div className=" bg-blue-500/10 dark:bg-blue-400/10 rounded-full px-2">
                    {/* <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" /> */}
                    <div>i</div>
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    AI Prediction
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    ${crypto.prediction.toLocaleString()}
                  </p>
                  <span
                    className={`text-lg font-bold ${crypto.percentageChange > 0
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : 'text-red-500 dark:text-red-400'
                      }`}
                  >
                    {crypto.percentageChange > 0 ? '+' : ''}
                    {crypto.percentageChange.toFixed(2)}%
                  </span>
                </div>

                {/* Prediction Bar */}
                <div className="mt-3">
                  <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${crypto.percentageChange > 0
                          ? 'bg-gradient-to-r from-emerald-400 to-emerald-600'
                          : 'bg-gradient-to-r from-red-400 to-red-600'
                        }`}
                      style={{
                        width: `${Math.min(Math.abs(crypto.percentageChange), 100)}%`,
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
  );
}