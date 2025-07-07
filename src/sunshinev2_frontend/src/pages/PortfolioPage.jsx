import { useWallet } from '../contexts/WalletContext'

const PortfolioPage = () => {
  const { isConnected, account, ethBalance, connectWallet, disconnectWallet, isLoading } =
    useWallet()

  return (
    <div>
      <h1>Portfolio</h1>
      {isConnected && (
        <div className="text-sm text-gray-300">
          <div>Balance: {ethBalance.toFixed(8)} ETH</div>
          <div>
            Account: {account?.slice(0, 6)}...{account?.slice(-4)}
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioPage
