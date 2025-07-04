import { useState } from 'react';
import { sunshinev2_backend } from 'declarations/sunshinev2_backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import { AgentProvider } from '@ic-reactor/react';

function App() {
  return (
    <div className='min-h-screen bg-[#0B1120]'>
      <AgentProvider withProcessEnv>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<LandingPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AgentProvider>
    </div>
  );
}

export default App;
