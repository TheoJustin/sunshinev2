import { useState } from 'react'
import { Graph } from '../components/prediction/Graph'

function PredictionPage() {
  const [inputValue, setInputValue] = useState('')

  const data = [
    {
      id: 'BTC',
      data: [
        { x: '10', y: 50 },
        { x: '11', y: 211 },
        { x: '12', y: 283 },
        { x: '13', y: 1 },
        { x: '14', y: 129 },
        { x: '15', y: 242 },
        { x: '16', y: 274 },
        { x: '17', y: 233 },
        { x: '18', y: 105 },
        { x: '19', y: 2 },
        { x: '20', y: 237 },
        { x: '21', y: 43 },
      ],
    },
    {
      id: 'ETH',
      data: [
        { x: '10', y: 173 },
        { x: '11', y: 187 },
        { x: '12', y: 128 },
        { x: '13', y: 124 },
        { x: '14', y: 198 },
        { x: '15', y: 64 },
        { x: '16', y: 292 },
        { x: '17', y: 174 },
        { x: '18', y: 96 },
        { x: '19', y: 112 },
        { x: '20', y: 171 },
        { x: '21', y: 172 },
      ],
    },
  ]

  const handleInputChange = e => {
    setInputValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log('Input value:', inputValue)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 bg-black/80 rounded-2xl shadow-2xl border border-slate-700/50 p-6">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-white">Market Data Visualization</h3>
            <p className="text-slate-400 text-sm">
              BTC and ETH price trends with prediction marker
            </p>
          </div>
          <Graph data={data} />
        </div>

        <div className="bg-slate-800/90 rounded-2xl shadow-2xl border border-slate-700/50 p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Market Prediction</h2>
            <p className="text-slate-300">
              Share your analysis and predictions for the market trends shown above
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
                  placeholder="Analyze the chart above and share your predictions for BTC and ETH trends..."
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
  )
}

export default PredictionPage
