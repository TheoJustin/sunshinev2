import { useState } from 'react'
import { sunshinev2_chat, createActor } from 'declarations/sunshinev2_chat'
import { useAuth } from '@ic-reactor/react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { RiCloseLine } from '@remixicon/react'

export default function CreateGroupModal({ onClose, onSuccess }) {
  const { identity } = useAuth()
  const [formData, setFormData] = useState({
    groupName: '',
    description: '',
    imageUrl: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.groupName.trim()) return

    try {
      setLoading(true)
      const principal = identity.getPrincipal()
      
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      
      const result = await actor.createGroup(
        formData.groupName,
        principal,
        formData.description,
        formData.imageUrl || 'https://via.placeholder.com/100'
      )

      console.log('Create group result:', result)
      if ('ok' in result) {
        onSuccess()
        onClose()
      } else {
        console.error('Failed to create group:', result.err)
      }
    } catch (error) {
      console.error('Error creating group:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Create Group</h3>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              <RiCloseLine size={20} />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Group Name *
              </label>
              <input
                type="text"
                value={formData.groupName}
                onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter group name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="Enter group description"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="ghost"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!formData.groupName.trim() || loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Creating...' : 'Create Group'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}