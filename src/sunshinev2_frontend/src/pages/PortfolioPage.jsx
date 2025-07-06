import React, { useState, useEffect } from 'react'

const PortfolioPage = () => {
  const [balances, setBalances] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        if (!window.ic?.plug) {
          throw new Error('Plug not installed')
        }

        const connected = await window.ic.plug.isConnected()
        if (!connected) {
          const ok = await window.ic.plug.requestConnect({ whitelist: [] })
          if (!ok) throw new Error('User rejected Plug connection')
        } else if (!window.ic.plug.agent) {
          await window.ic.plug.createAgent({ whitelist: [] })
        }

        const result = await window.ic.plug.requestBalances()
        setBalances(result)
      } catch (err) {
        setError(err.message)
      }
    }

    fetchBalances()
  }, [])

  if (error) return <div>Error: {error}</div>
  if (balances.length === 0) return <div>Loading balances...</div>

  return (
    <div>
      <h1>Portfolio</h1>
      <ul>
        {balances.map((b, i) => (
          <li key={i}>
            {b.name || b.symbol}: {b.balance} {b.symbol}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PortfolioPage
