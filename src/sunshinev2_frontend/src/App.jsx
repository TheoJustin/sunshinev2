import { useState } from 'react'
import { sunshinev2_backend } from 'declarations/sunshinev2_backend'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import { AgentProvider } from '@ic-reactor/react'
import { ROUTES } from './routes/route'
import { WalletProvider } from './contexts/WalletContext'

function App() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <AgentProvider withProcessEnv>
        <WalletProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<RootLayout />}>
                {ROUTES.map(route => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Route>
            </Routes>
          </BrowserRouter>
        </WalletProvider>
      </AgentProvider>
    </div>
  )
}

export default App
