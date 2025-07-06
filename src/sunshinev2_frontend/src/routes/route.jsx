import * as path from 'path'
import LandingPage from '../pages/LandingPage'
import NewsPage from '../pages/NewsPage'
import PredictionPage from '../pages/PredictionPage'
import PortfolioPage from '../pages/PortfolioPage'

export const ROUTES = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/news',
    element: <NewsPage />,
  },
  {
    path: '/predictions',
    element: <PredictionPage />,
  },
  {
    path: '/portfolio',
    element: <PortfolioPage />,
  },
]
