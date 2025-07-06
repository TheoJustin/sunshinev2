import LandingPage from '../pages/LandingPage'
import NewsPage from '../pages/NewsPage'
import PredictionPage from '../pages/PredictionPage'

export const ROUTES = [
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/news',
    element: <NewsPage />
  },
  {
    path: '/predictions',
    element: <PredictionPage />
  }
]
