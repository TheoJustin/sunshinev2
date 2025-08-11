import { useState, useEffect } from 'react'
import { sunshinev2_chat, createActor } from 'declarations/sunshinev2_chat'
import { useAuth } from '@ic-reactor/react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { RiCloseLine, RiSearchLine } from '@remixicon/react'

export default function BrowseGroupsModal({ onClose, onSuccess }) {
  const { identity } = useAuth()
  const [availableGroups, setAvailableGroups] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(null)

  useEffect(() => {
    loadAvailableGroups()
  }, [searchTerm])

  const loadAvailableGroups = async () => {
    try {
      setLoading(true)
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      const principal = identity.getPrincipal()
      
      const result = await actor.getAllUnjoinedGroups(searchTerm || 'Group', principal)
      
      if (result.ok) {
        setAvailableGroups(result.ok)
      } else {
        setAvailableGroups([])
      }
    } catch (error) {
      console.error('Error loading available groups:', error)
      setAvailableGroups([])
    } finally {
      setLoading(false)
    }
  }

  const joinGroup = async (group) => {
    try {
      setJoining(group[2])
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      const principal = identity.getPrincipal()
      
      const result = await actor.addGroupMember(principal, group[2])
      
      if (result.ok) {
        onSuccess()
        onClose()
      }
    } catch (error) {
      console.error('Error joining group:', error)
    } finally {
      setJoining(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl bg-gray-800 border-gray-700 max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Browse Groups</h3>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <RiCloseLine size={20} />
            </Button>
          </div>

          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              placeholder="Search groups..."
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : availableGroups.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              No groups available to join
            </div>
          ) : (
            <div className="space-y-3">
              {availableGroups.map((group) => (
                <Card
                  key={group[2]}
                  className="p-4 bg-gray-700 border-gray-600 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={group[3] || '/logo.svg'}
                        alt={group[0]}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-medium text-white">{group[0]}</h4>
                        <p className="text-sm text-gray-400">{group[1]}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => joinGroup(group)}
                      disabled={joining === group[2]}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {joining === group[2] ? 'Joining...' : 'Join'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}