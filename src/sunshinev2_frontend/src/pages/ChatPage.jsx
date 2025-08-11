import { useState, useEffect } from 'react'
import { useAgent, useAuth } from '@ic-reactor/react'
import ChatSidebar from '../components/chat/ChatSidebar'
import ChatWindow from '../components/chat/ChatWindow'
import ChatTest from '../components/chat/ChatTest'
import { Card } from '../components/ui/card'

export default function ChatPage() {
  const { identity, authenticated } = useAuth()
  const [selectedChat, setSelectedChat] = useState(null)
  const [chatType, setChatType] = useState('group') // 'group' or 'friend'
  const [groups, setGroups] = useState([])
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authenticated && identity) {
      loadChats()
    }
  }, [authenticated, identity])

  const loadChats = async () => {
    try {
      setLoading(true)
      
      const { createActor, sunshinev2_chat: defaultActor } = await import('declarations/sunshinev2_chat')
      const sunshinev2_chat = defaultActor || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      
      const principal = identity.getPrincipal()
      console.log('Loading chats for principal:', principal.toString())
      
      // Load groups
      const groupsResult = await sunshinev2_chat.getAllGroups('', principal)
      console.log('Groups result:', groupsResult)
      if (groupsResult.ok) {
        setGroups(groupsResult.ok)
      } else {
        console.error('Groups error:', groupsResult.err)
      }

      // Load friends
      const friendsResult = await sunshinev2_chat.getAllAvailableFriends('', principal)
      console.log('Friends result:', friendsResult)
      if (friendsResult.ok) {
        setFriends(friendsResult.ok)
      } else {
        console.error('Friends error:', friendsResult.err)
      }
    } catch (error) {
      console.error('Error loading chats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChatSelect = (chat, type) => {
    setSelectedChat(chat)
    setChatType(type)
  }

  if (!authenticated || !identity) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="p-8 bg-gray-800 border-gray-700">
          <p className="text-white">Please connect your wallet to access chat</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#0B1120]">
      <ChatSidebar
        groups={groups}
        friends={friends}
        onChatSelect={handleChatSelect}
        selectedChat={selectedChat}
        chatType={chatType}
        loading={loading}
        onRefresh={loadChats}
      />
      <div className="flex-1">
        {selectedChat ? (
          <ChatWindow
            chat={selectedChat}
            chatType={chatType}
            identity={identity}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="space-y-4">
              <Card className="p-8 bg-gray-800 border-gray-700">
                <p className="text-gray-400">Select a chat to start messaging</p>
              </Card>
              <ChatTest />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}