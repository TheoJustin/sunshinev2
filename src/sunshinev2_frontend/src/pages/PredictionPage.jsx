'use client'

import { useEffect, useState, useRef } from 'react'
import { Graph } from '../components/prediction/Graph'
import { sunshinev2_prediction } from '../../../declarations/sunshinev2_prediction'
import { LoadingSpinner } from '../components/ui/loading-spinner'
import { TrendingUp, Search, MessageCircle, User, Clock } from 'lucide-react'
import { DUMMY_COIN_LIST, DUMMY_HISTORICAL_DATA } from '../constants/graph'
import { sunshinev2_comment } from '../../../declarations/sunshinev2_comment'
import { AuthClient } from '@dfinity/auth-client'

function PredictionPage() {
  const [inputValue, setInputValue] = useState('')
  const [predictionData, setPredictionData] = useState([])
  const [selectedCoin, setSelectedCoin] = useState('ethereum')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [comments, setComments] = useState([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const cache = useRef(new Map())

  async function fetchPredictions(coin = 'ethereum') {
    if (!coin || typeof coin !== 'string') {
      console.error('Invalid coin parameter:', coin)
      setPredictionData([])
      return
    }

    if (cache.current.has(coin)) {
      setPredictionData(cache.current.get(coin))
      return
    }

    setIsLoading(true)
    try {
      const coinParam = coin ? [coin] : []
      const res = await sunshinev2_prediction.getPredictions(coinParam)
      console.log('API response:', res)

      let parsedData
      try {
        parsedData = JSON.parse(res)
      } catch (parseError) {
        console.error('Error parsing API response:', parseError)
        setPredictionData([])
        return
      }

      const coinData = DUMMY_COIN_LIST.find(c => c.id === parsedData.coin)
      if (!coinData || !Array.isArray(parsedData.predictions)) {
        console.error('Invalid API response format:', parsedData)
        setPredictionData([])
        return
      }

      const historicalData = DUMMY_HISTORICAL_DATA[parsedData.coin] || []
      const predictionDataPoints = parsedData.predictions.map((price, index) => ({
        x: `${index + 1}`,
        y: price,
      }))

      const transformedData = [
        {
          id: coinData.symbol,
          color: coinData.color,
          data: [...historicalData, ...predictionDataPoints],
        },
      ]

      cache.current.set(coin, transformedData)
      setPredictionData(transformedData)
    } catch (error) {
      console.error('Error fetching predictions for', coin, ':', error)
      setPredictionData([])
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchComments(coin) {
    if (!coin) return

    setIsLoadingComments(true)
    try {
      const result = await sunshinev2_comment.getCommentByCoin(coin)
      console.log('Comments response:', result)

      if ('ok' in result && result.ok && Array.isArray(result.ok.comments)) {
        setComments(result.ok.comments) // now expecting an array
      } else {
        setComments([])
      }
    } catch (error) {
      console.error('Error fetching comments for', coin, ':', error)
      setComments([])
    } finally {
      setIsLoadingComments(false)
    }
  }

  useEffect(() => {
    fetchPredictions(selectedCoin)
    fetchComments(selectedCoin)
  }, [selectedCoin])

  const handleCoinSelect = coinId => {
    setSelectedCoin(coinId)
  }

  const filteredCoins = DUMMY_COIN_LIST.filter(
    coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedCoinData = DUMMY_COIN_LIST.find(coin => coin.id === selectedCoin)

  const data =
    !isLoading && predictionData.length > 0
      ? predictionData
      : [
          {
            id: selectedCoinData?.symbol || 'ETH',
            color: selectedCoinData?.color || '#627EEA',
            data: [
              ...(DUMMY_HISTORICAL_DATA[selectedCoin] || DUMMY_HISTORICAL_DATA.ethereum),
              { x: '1', y: 1995.7147216796875 },
              { x: '2', y: 1964.3731689453125 },
              { x: '3', y: 1938.6651611328125 },
              { x: '4', y: 1924.395751953125 },
              { x: '5', y: 1917.40234375 },
              { x: '6', y: 1898.587890625 },
              { x: '7', y: 1878.9078369140625 },
            ],
          },
        ]

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const [allComments, setAllComments] = useState([])
  const [isLoadingAllComments, setIsLoadingAllComments] = useState(false)
  async function fetchAllComments() {
    setIsLoadingAllComments(true)
    try {
      const commentsByCoin = await sunshinev2_comment.getAllComments()
      console.log('All comments:', commentsByCoin)
      setAllComments(commentsByCoin)
    } catch (err) {
      console.error('Error fetching all comments:', err)
      setAllComments([])
    } finally {
      setIsLoadingAllComments(false)
    }
  }
  useEffect(() => {
    fetchAllComments()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!inputValue.trim()) return

    setIsSubmittingComment(true)
    try {
      const authClient = await AuthClient.create()
      const identity = authClient.getIdentity()
      const principal = identity.getPrincipal()
      console.log('Principal:', principal.toText())

      await sunshinev2_comment.createComment(selectedCoin, inputValue)
      setInputValue('') // Clear the input after successful submission

      // Refresh comments after submitting
      const err = await fetchComments(selectedCoin)
      console.log(err)
    } catch (error) {
      console.error('Error submitting comment:', error)
    } finally {
      setIsSubmittingComment(false)
    }
  }

  const formatTimestamp = timestamp => {
    // Adjust this based on your timestamp format
    try {
      const date = new Date(Number(timestamp) / 1000000) // Convert nanoseconds to milliseconds if needed
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
    } catch {
      return 'Recently'
    }
  }

  const formatPrincipal = principal => {
    if (!principal) return 'Anonymous'
    const principalStr = principal.toString()
    return principalStr.length > 10
      ? `${principalStr.slice(0, 8)}...${principalStr.slice(-4)}`
      : principalStr
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        <div className="w-64 h-[calc(100vh-7.5rem)] sticky top-[5.75rem] bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 p-6 overflow-hidden rounded-xl m-7 flex flex-col">
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
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-900/60 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-400/50 hover:border-slate-500/70 transition-all duration-300"
            />
          </div>

          <div className="relative flex-1 min-h-0">
            <div className="space-y-3 h-full overflow-y-auto custom-scrollbar pr-2">
              {filteredCoins.map(coin => (
                <button
                  key={coin.id}
                  onClick={() => handleCoinSelect(coin.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedCoin === coin.id
                      ? 'bg-emerald-500/20 border border-emerald-400/50'
                      : 'bg-slate-700/50 border border-slate-600/50 hover:bg-slate-700/70 hover:border-slate-500/70'
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
                    {selectedCoin === coin.id}
                  </div>
                </button>
              ))}
            </div>
            <div className="absolute -bottom-2 left-0 right-0 h-8 bg-gradient-to-t from-slate-800/90 to-transparent pointer-events-none rounded-b-lg"></div>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-2">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                  style={{ backgroundColor: selectedCoinData?.color || '#F7931A' }}
                >
                  {selectedCoinData?.symbol.charAt(0) || 'B'}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    {selectedCoinData?.name || 'Bitcoin'} Predictions
                  </h1>
                  <p className="text-slate-300">
                    AI-powered price predictions for {selectedCoinData?.symbol || 'BTC'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mb-8 bg-black/80 rounded-2xl shadow-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-slate-400 text-sm flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                  {selectedCoinData?.name} price trends with AI prediction markers
                </p>
                {isLoading && (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner
                      size="w-5 h-5"
                      color="text-gray-400"
                    />
                    <span className="text-gray-400 text-sm">Loading...</span>
                  </div>
                )}
              </div>
              <div className="h-full">
                <Graph
                  data={data}
                  index={DUMMY_HISTORICAL_DATA[selectedCoin]?.length - 1 || 6}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Comment Form */}
              <div className="bg-slate-800/90 rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Market Prediction Analysis</h2>
                  <p className="text-slate-300">
                    Share your analysis and predictions for {selectedCoinData?.id} trends shown
                    above
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="space-y-3">
                    <label
                      htmlFor="prediction-input"
                      className="block text-sm font-semibold text-slate-200"
                    >
                      Enter your prediction or analysis
                    </label>
                    <div className="relative">
                      <textarea
                        id="prediction-input"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder={`Analyze the ${selectedCoinData?.id} chart above and share your predictions for ${selectedCoinData?.symbol} trends...`}
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
                      disabled={!inputValue.trim() || isSubmittingComment}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500
                                 text-white font-semibold rounded-xl
                                 hover:from-emerald-500 hover:to-emerald-400
                                 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-800
                                 disabled:from-slate-600 disabled:to-slate-600 disabled:cursor-not-allowed disabled:opacity-50
                                 transition-all duration-300 ease-in-out
                                 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30
                                 transform hover:scale-105 active:scale-95
                                 flex items-center gap-2"
                    >
                      {isSubmittingComment && (
                        <LoadingSpinner
                          size="w-4 h-4"
                          color="text-white"
                        />
                      )}
                      {isSubmittingComment ? 'Submitting...' : 'Submit Prediction'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Comments Section */}
              <div className="bg-slate-800/90 rounded-2xl shadow-2xl border border-slate-700/50 p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                    Community Predictions
                  </h2>
                  <p className="text-slate-300">
                    See what others are saying about {selectedCoinData?.symbol || 'this coin'}
                  </p>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                  {isLoadingComments ? (
                    <div className="flex items-center justify-center py-8">
                      <LoadingSpinner
                        size="w-6 h-6"
                        color="text-gray-400"
                      />
                      <span className="ml-2 text-gray-400">Loading comments...</span>
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div
                        key={index}
                        className="bg-slate-900/60 rounded-lg p-4 border border-slate-600/50 hover:border-slate-500/70 transition-all duration-200"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-white">
                                {formatPrincipal(comment.user)}
                              </div>
                              <div className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTimestamp(comment.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-slate-200 leading-relaxed">{comment.message}</div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <MessageCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400 mb-2">No predictions yet</p>
                      <p className="text-sm text-slate-500">
                        Be the first to share your analysis for {selectedCoinData?.symbol}!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionPage
