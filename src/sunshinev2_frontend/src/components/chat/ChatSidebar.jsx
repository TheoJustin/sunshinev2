import { useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { RiRefreshLine, RiGroupLine, RiUserLine, RiAddLine, RiSearchLine, RiCheckLine } from '@remixicon/react'
import CreateGroupModal from './CreateGroupModal'
import AddFriendModal from './AddFriendModal'
import BrowseGroupsModal from './BrowseGroupsModal'

export default function ChatSidebar({ 
  groups, 
  friends, 
  onChatSelect, 
  selectedChat, 
  chatType, 
  loading, 
  onRefresh 
}) {
  const [activeTab, setActiveTab] = useState('groups')
  const [showCreateGroup, setShowCreateGroup] = useState(false)
  const [showAddFriend, setShowAddFriend] = useState(false)
  const [showBrowseGroups, setShowBrowseGroups] = useState(false)

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Chat</h2>
          <Button
            onClick={onRefresh}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <RiRefreshLine size={16} />
          </Button>
        </div>
        
        {/* Tabs */}
        <div className="flex space-x-2">
          <Button
            onClick={() => setActiveTab('groups')}
            variant={activeTab === 'groups' ? 'outline' : 'default'}
            size="sm"
            className="flex-1"
          >
            <RiGroupLine size={16} className="mr-1" />
            Groups
          </Button>
          <Button
            onClick={() => setActiveTab('friends')}
            variant={activeTab === 'friends' ? 'outline' : 'default'}
            size="sm"
            className="flex-1"
          >
            <RiUserLine size={16} className="mr-1" />
            Friends
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="p-4">
            <div className="animate-pulse space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-800 rounded"></div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'groups' && (
              <div className="p-2">
                <div className="space-y-2 mb-3">
                  <Button
                    onClick={() => setShowCreateGroup(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <RiAddLine size={16} className="mr-2" />
                    Create Group
                  </Button>
                  <Button
                    onClick={() => setShowBrowseGroups(true)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <RiSearchLine size={16} className="mr-2" />
                    Browse Groups
                  </Button>
                </div>
                
                {groups.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No groups found</p>
                ) : (
                  groups.map((group) => (
                    <Card
                      key={group[2]} // group id
                      className={`p-3 mb-2 cursor-pointer transition-colors ${
                        selectedChat?.[2] === group[2] && chatType === 'group'
                          ? 'bg-blue-600 border-blue-500'
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      }`}
                      onClick={() => onChatSelect(group, 'group')}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={group[3] || '/logo.svg'} // imageUrl
                          alt={group[0]} // groupName
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate flex items-center">
                            {group[0]} {/* groupName */}
                            {group[4] ? <RiCheckLine size={16} className="ml-2 text-green-400 shrink-0" /> : null}
                          </h3>
                          <p className="text-sm text-gray-400 truncate">
                            {group[1] || 'No messages yet'} {/* last message */}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}

            {activeTab === 'friends' && (
              <div className="p-2">
                <Button
                  onClick={() => setShowAddFriend(true)}
                  className="w-full mb-3 bg-green-600 hover:bg-green-700"
                >
                  <RiAddLine size={16} className="mr-2" />
                  Add Friend
                </Button>
                
                {friends.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No friends found</p>
                ) : (
                  friends.map((friend) => (
                    <Card
                      key={friend[3].toString()} // friend principal
                      className={`p-3 mb-2 cursor-pointer transition-colors ${
                        selectedChat?.[3]?.toString() === friend[3].toString() && chatType === 'friend'
                          ? 'bg-green-600 border-green-500'
                          : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                      }`}
                      onClick={() => onChatSelect(friend, 'friend')}
                    >
                      <div className="flex items-center space-x-3">
                        <img
                          src={friend[1] || '/logo.svg'} // profileUrl
                          alt={friend[0]} // name
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-white truncate">
                            {friend[0]} {/* name */}
                          </h3>
                          <p className="text-sm text-gray-400 truncate">
                            {friend[2] || 'No messages yet'} {/* last message */}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showCreateGroup && (
        <CreateGroupModal
          onClose={() => setShowCreateGroup(false)}
          onSuccess={onRefresh}
        />
      )}
      
      {showAddFriend && (
        <AddFriendModal
          onClose={() => setShowAddFriend(false)}
          onSuccess={onRefresh}
        />
      )}
      
      {showBrowseGroups && (
        <BrowseGroupsModal
          onClose={() => setShowBrowseGroups(false)}
          onSuccess={onRefresh}
        />
      )}
    </div>
  )
}