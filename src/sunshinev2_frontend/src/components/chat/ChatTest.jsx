import { useState } from 'react'
import { useAuth } from '@ic-reactor/react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { sunshinev2_chat, createActor } from 'declarations/sunshinev2_chat'
import { sunshinev2_backend, createActor as createBackendActor } from 'declarations/sunshinev2_backend'

export default function ChatTest() {
  const { identity, authenticated } = useAuth()
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    if (!authenticated || !identity) {
      setResult('Please login first')
      return
    }

    try {
      setLoading(true)
      
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      
      const principal = identity.getPrincipal()
      
      // Test whoami function
      const whoami = await actor.whoami()
      setResult(`Connected! Your principal: ${whoami.toString()}`)
      
      // Test getting groups
      const groups = await actor.getAllGroups('', principal)
      console.log('Groups result:', groups)
      
    } catch (error) {
      console.error('Test error:', error)
      setResult(`Error: ${error.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  const registerUser = async () => {
    if (!authenticated || !identity) {
      setResult('Please login first')
      return
    }

    try {
      setLoading(true)
      
      const backendActor = sunshinev2_backend || createBackendActor('u6s2n-gx777-77774-qaaba-cai', { agentOptions: { identity } })
      
      const principal = identity.getPrincipal()
      
      const success = await backendActor.register(
        principal,
        'Test User',
        'test@example.com',
        '1990-01-01',
        'https://via.placeholder.com/100'
      )
      
      if (success) {
        setResult('User registered successfully!')
      } else {
        setResult('User already registered or registration failed')
      }
      
    } catch (error) {
      console.error('Registration error:', error)
      setResult(`Error: ${error.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  const browseGroups = async () => {
    if (!authenticated || !identity) {
      setResult('Please login first')
      return
    }

    try {
      setLoading(true)
      
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      
      const principal = identity.getPrincipal()
      
      // Search for groups with a common term to find available groups
      const result = await actor.getAllUnjoinedGroups('Group', principal)
      console.log('Available groups:', result)
      
      if (result.ok && result.ok.length > 0) {
        const groupsList = result.ok.map(group => `${group[0]} - ${group[1]}`).join('\n')
        setResult(`Available groups:\n${groupsList}`)
      } else {
        setResult('No groups available to join')
      }
      
    } catch (error) {
      console.error('Browse groups error:', error)
      setResult(`Error: ${error.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  const joinFirstGroup = async () => {
    if (!authenticated || !identity) {
      setResult('Please login first')
      return
    }

    try {
      setLoading(true)
      
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      
      const principal = identity.getPrincipal()
      
      // Get available groups
      const groupsResult = await actor.getAllUnjoinedGroups('Group', principal)
      
      if (groupsResult.ok && groupsResult.ok.length > 0) {
        const firstGroup = groupsResult.ok[0]
        const groupId = firstGroup[2] // group id
        
        // Join the first available group
        const joinResult = await actor.addGroupMember(principal, groupId)
        
        if (joinResult.ok) {
          setResult(`Successfully joined group: ${firstGroup[0]}`)
        } else {
          setResult(`Failed to join group: ${joinResult.err}`)
        }
      } else {
        setResult('No groups available to join')
      }
      
    } catch (error) {
      console.error('Join group error:', error)
      setResult(`Error: ${error.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  const generateDummyGroups = async () => {
    if (!authenticated || !identity) {
      setResult('Please login first')
      return
    }

    try {
      setLoading(true)
      
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      
      const principal = identity.getPrincipal()
      
      const result = await actor.generateDummyGroup(principal)
      console.log('Dummy groups result:', result)
      
      if (result.ok !== undefined) {
        setResult('Dummy groups created successfully!')
      } else {
        setResult(`Error creating dummy groups: ${result.err}`)
      }
      
    } catch (error) {
      console.error('Dummy groups error:', error)
      setResult(`Error: ${error.message || error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-gray-800 border-gray-700 max-w-md mx-auto mt-8">
      <h3 className="text-lg font-semibold text-white mb-4">Chat Connection Test [Live Demo Only]</h3>
      
      <div className="space-y-2">
        <Button
          onClick={testConnection}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {loading ? 'Testing...' : 'Test Connection'}
        </Button>
        
        <Button
          onClick={registerUser}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {loading ? 'Registering...' : 'Quick Register User'}
        </Button>
        
        <Button
          onClick={browseGroups}
          disabled={loading}
          className="w-full bg-yellow-600 hover:bg-yellow-700"
        >
          {loading ? 'Browsing...' : 'Browse Available Groups'}
        </Button>
        
        <Button
          onClick={joinFirstGroup}
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700"
        >
          {loading ? 'Joining...' : 'Join First Available Group'}
        </Button>
        
        <Button
          onClick={generateDummyGroups}
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          {loading ? 'Creating...' : 'Create Dummy Groups'}
        </Button>
      </div>
      
      {result && (
        <div className="p-3 bg-gray-700 rounded text-white text-sm">
          {result}
        </div>
      )}
    </Card>
  )
}