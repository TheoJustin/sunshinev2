import { useState } from 'react'
import { sunshinev2_chat } from 'declarations/sunshinev2_chat'
import { useAuth } from '@ic-reactor/react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { RiCloseLine, RiSearchLine } from '@remixicon/react'

export default function AddFriendModal({ onClose, onSuccess }) {
  const { identity } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [adding, setAdding] = useState(false)

  const searchUsers = async () => {
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      const principal = identity.getPrincipal()
      
      const result = await sunshinev2_chat.getAllUnaddedFriends(searchQuery, principal)
      if (result.ok) {
        setSearchResults(result.ok)
      }
    } catch (error) {
      console.error('Error searching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const addFriend = async (friendPrincipal) => {
    try {
      setAdding(true)
      const principal = identity.getPrincipal()
      
      const result = await sunshinev2_chat.addFriend(principal, friendPrincipal)
      if (result.ok) {
        onSuccess()
        onClose()
      }
    } catch (error) {
      console.error('Error adding friend:', error)
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Add Friend</h3>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <RiCloseLine size={20} />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Search by name..."
                onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
              />
              <Button
                onClick={searchUsers}
                disabled={!searchQuery.trim() || loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <RiSearchLine size={16} />
                )}
              </Button>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2">
              {searchResults.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  {searchQuery ? 'No users found' : 'Search for users to add as friends'}
                </p>
              ) : (
                searchResults.map((user) => (
                  <Card
                    key={user.internet_identity.toString()}
                    className="p-3 bg-gray-700 border-gray-600"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.profileUrl || '/logo.svg'}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-white">{user.name}</h4>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => addFriend(user.internet_identity)}
                        disabled={adding}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        {adding ? 'Adding...' : 'Add'}
                      </Button>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}