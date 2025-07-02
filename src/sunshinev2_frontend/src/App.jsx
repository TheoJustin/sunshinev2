import { useState } from 'react';
import { sunshinev2_backend } from 'declarations/sunshinev2_backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import { AgentProvider, useQueryCall, useUpdateCall } from '@ic-reactor/react';

function App() {

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-teal-50'>
      <AgentProvider withProcessEnv>
        <BrowserRouter>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AgentProvider>
    </div>
  );
}

export default App;
