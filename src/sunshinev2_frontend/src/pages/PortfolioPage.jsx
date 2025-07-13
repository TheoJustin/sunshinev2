'use client'

import { useWallet } from '../contexts/WalletContext'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Wallet, Loader2, RefreshCw, ChevronDown } from 'lucide-react'

const PortfolioPage = () => {
  const { isConnected, account, ethBalance, connectWallet, disconnectWallet, isLoading } =
    useWallet()

  const ethToUsd = ethBalance ? (Number.parseFloat(ethBalance) * 2500).toFixed(2) : '0.00'

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-md mx-auto">
        {!isConnected ? (
          <Card className="bg-gray-800 border-gray-700 text-center py-12">
            <CardContent className="space-y-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Connect Your Wallet</h3>
                <p className="text-gray-400 mb-6">
                  Please connect your wallet to view your portfolio
                </p>
                <Button
                  onClick={connectWallet}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6 space-y-6">
              {/* Top Row */}
              <div className="flex items-center justify-between">
                <span className="text-gray-300 font-medium">USD</span>
                <div className="text-gray-300 font-mono text-sm">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </div>
              </div>

              {/* Ethereum Section */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <span className="text-white font-medium">Ethereum</span>
                <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
              </div>

              {/* Balance Display */}
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold text-white">${ethToUsd}</div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>

              {/* ETH Balance */}
              <div className="text-gray-400 text-sm">{ethBalance?.toFixed(8)} ETH</div>

              {/* Disconnect Button */}
              <div className="pt-4 border-t border-gray-700">
                <Button
                  onClick={disconnectWallet}
                  variant="ghost"
                  className="w-full text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Disconnect Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default PortfolioPage
