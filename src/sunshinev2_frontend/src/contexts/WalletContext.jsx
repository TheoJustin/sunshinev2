import { createContext, useContext, useState, useEffect } from 'react'

const WalletContext = createContext()

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}

export const WalletProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState(null)
  const [ethBalance, setEthBalance] = useState(0)
  const [chainId, setChainId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    checkConnection()
  }, [])

  const checkConnection = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          setIsConnected(true)
          await updateBalanceAndChain(accounts[0])
        }
      }
    } catch (error) {
      console.error('Error checking connection:', error)
    }
  }

  const updateBalanceAndChain = async address => {
    try {
      const balance = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest'],
      })
      setEthBalance(parseInt(balance, 16) / 1e18)

      const chain = await window.ethereum.request({ method: 'eth_chainId' })
      setChainId(chain)
    } catch (error) {
      console.error('Error updating balance and chain:', error)
    }
  }

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('MetaMask is not installed. Please install the MetaMask extension first.')
        window.open('https://metamask.io/download/', '_blank')
        return
      }

      setIsLoading(true)

      const requestedAccounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      const connectedAccount = requestedAccounts[0]
      setAccount(connectedAccount)
      setIsConnected(true)

      await updateBalanceAndChain(connectedAccount)

      console.log('Connected to MetaMask:', connectedAccount)
    } catch (error) {
      console.error('Error connecting to MetaMask:', error)

      if (error.code === 4001) {
        console.log('User rejected the connection request')
      } else if (error.code === -32002) {
        alert(
          'MetaMask is already processing a connection request. Please check your MetaMask extension.',
        )
      } else {
        alert(`Failed to connect to MetaMask: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
    setEthBalance(0)
    setChainId(null)
  }

  const refreshBalance = async () => {
    if (account) {
      await updateBalanceAndChain(account)
    }
  }

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = accounts => {
        if (accounts.length === 0) {
          disconnectWallet()
        } else {
          setAccount(accounts[0])
          updateBalanceAndChain(accounts[0])
        }
      }

      const handleChainChanged = chainId => {
        setChainId(chainId)
        if (account) {
          updateBalanceAndChain(account)
        }
      }

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [account])

  const value = {
    isConnected,
    account,
    ethBalance,
    chainId,
    isLoading,
    connectWallet,
    disconnectWallet,
    refreshBalance,
  }

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
}

export const UpdatedHeader = () => {
  const { isConnected, account, ethBalance, connectWallet, disconnectWallet, isLoading } =
    useWallet()

  const handleConnectWallet = () => {
    connectWallet()
  }

  const handleLogout = () => {
    disconnectWallet()
  }

  return (
    <div className="flex items-center space-x-4">
      {isConnected && (
        <div className="text-sm text-gray-300">
          <div>Balance: {ethBalance.toFixed(4)} ETH</div>
          <div>
            Account: {account?.slice(0, 6)}...{account?.slice(-4)}
          </div>
        </div>
      )}

      <Button
        onClick={handleConnectWallet}
        disabled={isLoading}
        className="bg-white/10 text-white border-0 hover:bg-white/20 transition-all duration-300"
      >
        {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Connect Wallet'}
      </Button>
    </div>
  )
}
