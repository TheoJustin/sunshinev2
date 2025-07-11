"use client"

import { useEffect, useState } from "react"
import { Graph } from "../components/prediction/Graph"
import { sunshinev2_prediction } from "../../../declarations/sunshinev2_prediction"
import { Badge } from "../components/ui/badge"
import { TrendingUp, Activity, Search } from "lucide-react"

const COIN_LIST = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "binancecoin", name: "Binance Coin", symbol: "BNB", color: "#F3BA2F" },
  { id: "cardano", name: "Cardano", symbol: "ADA", color: "#0033AD" },
  { id: "solana", name: "Solana", symbol: "SOL", color: "#9945FF" },
  { id: "polkadot", name: "Polkadot", symbol: "DOT", color: "#E6007A" },
  { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", color: "#C2A633" },
  { id: "avalanche-2", name: "Avalanche", symbol: "AVAX", color: "#E84142" },
  { id: "chainlink", name: "Chainlink", symbol: "LINK", color: "#375BD2" },
  { id: "polygon", name: "Polygon", symbol: "MATIC", color: "#8247E5" },
  { id: "litecoin", name: "Litecoin", symbol: "LTC", color: "#BFBBBB" },
  { id: "uniswap", name: "Uniswap", symbol: "UNI", color: "#FF007A" },
]

function PredictionPage() {
  const [inputValue, setInputValue] = useState("")
  const [predictionData, setPredictionData] = useState([])
  const [selectedCoin, setSelectedCoin] = useState("ethereum")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function fetchPredictions(coin = "ethereum") {
    if (!coin || typeof coin !== "string") {
      console.error("Invalid coin parameter:", coin)
      setPredictionData([])
      return
    }

    setIsLoading(true)
    try {
      const coinParam = coin ? [coin] : []
      const res = await sunshinev2_prediction.getPredictions(coinParam)
      console.log("API response:", res)

      let parsedData
      try {
        parsedData = JSON.parse(res)
      } catch (parseError) {
        console.error("Error parsing API response:", parseError)
        setPredictionData([])
        return
      }

      setPredictionData(parsedData)
    } catch (error) {
      console.error("Error fetching predictions for", coin, ":", error)
      setPredictionData([])
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPredictions(selectedCoin)
  }, [selectedCoin])

  const handleCoinSelect = (coinId) => {
    setSelectedCoin(coinId)
  }

  const filteredCoins = COIN_LIST.filter(
    (coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedCoinData = COIN_LIST.find((coin) => coin.id === selectedCoin)

  // Mock data for demonstration - replace with actual predictionData when available
  const data = [
    {
      id: selectedCoinData?.symbol || "BTC",
      data: [
        { x: "10", y: 50 },
        { x: "11", y: 211 },
        { x: "12", y: 283 },
        { x: "13", y: 1 },
        { x: "14", y: 129 },
        { x: "15", y: 242 },
        { x: "16", y: 274 },
        { x: "17", y: 233 },
        { x: "18", y: 105 },
        { x: "19", y: 2 },
        { x: "20", y: 237 },
        { x: "21", y: 43 },
      ],
    },
  ]

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Input value:", inputValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        <div className="w-80 min-h-screen bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-2">Select Cryptocurrency</h2>
            <p className="text-sm text-slate-400">Choose a coin to view predictions</p>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search coins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 hover:border-slate-500/70 transition-all duration-300"
            />
          </div>

          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {filteredCoins.map((coin) => (
              <button
                key={coin.id}
                onClick={() => handleCoinSelect(coin.id)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${selectedCoin === coin.id
                    ? "bg-emerald-500/20 border-2 border-emerald-400/50"
                    : "bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700/70 hover:border-slate-500/70"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                      style={{ backgroundColor: coin.color }}
                    >
                      {coin.symbol.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{coin.name}</div>
                      <div className="text-sm text-slate-400">{coin.symbol}</div>
                    </div>
                  </div>
                  {selectedCoin === coin.id && (
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/50">
                      <Activity className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  style={{ backgroundColor: selectedCoinData?.color || "#F7931A" }}
                >
                  {selectedCoinData?.symbol.charAt(0) || "B"}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{selectedCoinData?.name || "Bitcoin"} Predictions</h1>
                  <p className="text-slate-300">AI-powered price predictions for {selectedCoinData?.symbol || "BTC"}</p>
                </div>
              </div>
            </div>

            <div className="mb-8 bg-black/80 rounded-2xl shadow-2xl border border-slate-700/50 p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <span>Market Data Visualization</span>
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {selectedCoinData?.name} price trends with AI prediction markers
                  </p>
                </div>
                {isLoading && (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-400/50">Loading...</Badge>
                )}
              </div>
              <div className="h-full">
                <Graph data={data} />
              </div>
            </div>

            <div className="bg-slate-800/90 rounded-2xl shadow-2xl border border-slate-700/50 p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Market Prediction Analysis</h2>
                <p className="text-slate-300">
                  Share your analysis and predictions for {selectedCoinData?.name} trends shown above
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <label htmlFor="prediction-input" className="block text-sm font-semibold text-slate-200">
                    Enter your prediction or analysis
                  </label>
                  <div className="relative">
                    <textarea
                      id="prediction-input"
                      value={inputValue}
                      onChange={handleInputChange}
                      placeholder={`Analyze the ${selectedCoinData?.name} chart above and share your predictions for ${selectedCoinData?.symbol} trends...`}
                      rows={6}
                      className="w-full px-6 py-4 text-lg bg-slate-900/60 border border-slate-600/50 rounded-xl
                               text-white placeholder-slate-400
                               focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50
                               hover:border-slate-500/70 hover:bg-slate-900/80
                               transition-all duration-300 ease-in-out
                               shadow-lg shadow-black/20 resize-none
                               leading-relaxed"
                    />
                    <div className="absolute bottom-3 right-4 text-xs text-slate-500">
                      {inputValue.length} characters
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500
                             text-white font-semibold rounded-xl
                             hover:from-emerald-500 hover:to-emerald-400
                             focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-800
                             disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed disabled:opacity-50
                             transition-all duration-300 ease-in-out
                             shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
                             transform hover:scale-105 active:scale-95"
                  >
                    Submit Prediction
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionPage