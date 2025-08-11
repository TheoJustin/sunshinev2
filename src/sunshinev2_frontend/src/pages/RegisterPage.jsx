import { useState } from 'react'
import { useAuth } from '@ic-reactor/react'
import { useNavigate } from 'react-router-dom'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { sunshinev2_backend, createActor } from 'declarations/sunshinev2_backend'

export default function RegisterPage() {
  const { identity, authenticated } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
    profilePicture: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    if (!authenticated || !identity) {
      alert('Please login first')
      return
    }

    if (!formData.name || !formData.email) {
      alert('Name and email are required')
      return
    }

    try {
      setLoading(true)
      
      const backendActor = sunshinev2_backend || createActor('u6s2n-gx777-77774-qaaba-cai', { 
        agentOptions: { identity } 
      })
      
      const principal = identity.getPrincipal()
      
      const success = await backendActor.register(
        principal,
        formData.name,
        formData.email,
        formData.dateOfBirth || '1990-01-01',
        formData.profilePicture || 'https://via.placeholder.com/100'
      )
      
      if (success) {
        alert('Registration successful!')
        navigate('/chat')
      } else {
        alert('Registration failed or user already exists')
      }
      
    } catch (error) {
      console.error('Registration error:', error)
      alert(`Error: ${error.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 bg-gray-800 border-gray-700 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">Access Denied</h2>
          <p className="text-gray-300 text-center mb-6">
            Please login with Internet Identity to register
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Go to Home
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <Card className="p-8 bg-gray-800 border-gray-700 max-w-md mx-auto w-full">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Complete Registration</h2>
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Profile Picture URL
            </label>
            <input
              type="url"
              name="profilePicture"
              value={formData.profilePicture}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/your-photo.jpg"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 mt-6"
          >
            {loading ? 'Registering...' : 'Complete Registration'}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/chat')}
            className="text-gray-400 hover:text-white"
          >
            Skip for now
          </Button>
        </div>
      </Card>
    </div>
  )
}