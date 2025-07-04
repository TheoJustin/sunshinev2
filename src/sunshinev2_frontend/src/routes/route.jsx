import LandingPage from '../pages/LandingPage'
import NewsPage from '../pages/NewsPage'

export const ROUTES = [
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/news',
    element: <NewsPage />,
  },
]
