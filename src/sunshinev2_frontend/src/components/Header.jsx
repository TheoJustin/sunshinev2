import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { Brain } from 'lucide-react'
import { sunshinev2_backend } from '../../../declarations/sunshinev2_backend'
import { canisterId as IICanisterId } from '../../../declarations/internet_identity'
import { ActorProvider, CandidAdapterProvider, useAuth, useQueryCall } from '@ic-reactor/react'
import { theme } from '../lib/theme'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  let actor = sunshinev2_backend
  const nav = useNavigate()
  const { login, logout, authenticated, identity, loginError } = useAuth({
    onLoginSuccess: principal => {
      console.log(`Logged in as ${principal}`)
    },
    onLoginError: error => console.error(`Login failed: ${error}`),
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogin = async () => {
    let IIUrl =
      process.env.DFX_NETWORK === 'ic'
        ? 'https://identity.ic0.app/#authorize'
        : `http://${IICanisterId}.localhost:4943/`

    try {
      await login({
        identityProvider: IIUrl,
      })
    } catch (error) {
      console.log(error)
    }

    return false
  }

  const handleLogout = async () => {
    try {
      await logout()
      nav('/')
      window.location.reload()
    } catch (error) {
      console.error('Logout error: ', error)
    }
  }

  const greet = async () => {
    const greeting = await actor.greet()
    console.log(greeting)
  }

  return (
    <motion.nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0B1120]/95 backdrop-blur-md' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div
              className={`w-8 h-8 bg-gradient-to-r ${theme.gradients.primary} rounded-lg flex items-center justify-center`}
            >
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span
              className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme.gradients.primary}`}
            >
              SignalScribe
            </span>
          </motion.div>
          <div className="hidden md:flex items-center space-x-8">
            {['Features', 'Analytics', 'Predictions', 'News'].map(item => (
              <motion.a
                key={item}
                href={`/${item === 'Features' ? `#${item.toLowerCase()}` : item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors font-medium relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <motion.div
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r ${theme.gradients.primary}`}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={authenticated ? handleLogout : handleLogin}
                className={`bg-gradient-to-r ${theme.gradients.primary} text-white border-0 hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300`}
              >
                {authenticated ? 'Logout' : 'Login'}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={greet}
                className="bg-white/10 backdrop-blur-sm text-white border-0 hover:bg-white/20 transition-all duration-300"
              >
                Connect Wallet
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Header
