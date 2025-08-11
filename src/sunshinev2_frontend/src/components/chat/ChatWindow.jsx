import { useState, useEffect, useRef } from 'react'
import { sunshinev2_chat, createActor } from 'declarations/sunshinev2_chat'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { RiSendPlaneLine } from '@remixicon/react'

export default function ChatWindow({ chat, chatType, identity }) {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (chat) {
      loadMessages()
    }
  }, [chat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadMessages = async () => {
    try {
      setLoading(true)
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      const principal = identity.getPrincipal()
      
      let result
      if (chatType === 'group') {
        result = await actor.getAllChatsAccordingToGroup(chat[2]) // group id
      } else {
        result = await actor.getAllChatsFromFriend(principal, chat[3]) // friend principal
      }

      if (result.ok) {
        setMessages(result.ok)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || sending) return

    try {
      setSending(true)
      const actor = sunshinev2_chat || createActor('ufxgi-4p777-77774-qaadq-cai', { agentOptions: { identity } })
      const principal = identity.getPrincipal()
      
      let result
      if (chatType === 'group') {
        result = await actor.createChat(newMessage, principal, chat[2])
      } else {
        result = await actor.createFriendChat(principal, chat[3], newMessage)
      }

      if (result.ok || result === 'Successfully added chat') {
        setNewMessage('')
        await loadMessages()
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  const formatTime = (timestamp) => {
    const date = new Date(Number(timestamp) / 1000000) // Convert nanoseconds to milliseconds
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const isMyMessage = (messageUser) => {
    return messageUser.toString() === identity.getPrincipal().toString()
  }

  return (
    <div className="flex flex-col h-full bg-gray-800">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center space-x-3">
          <img
            src={chatType === 'group' ? (chat[3] || '/logo.svg') : (chat[1] || '/logo.svg')}
            alt={chat[0]}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-white">{chat[0]}</h3>
            <p className="text-sm text-gray-400">
              {chatType === 'group' ? 'Group Chat' : 'Direct Message'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message, index) => {
            const isMine = isMyMessage(message[3]) // user principal
            return (
              <div
                key={index}
                className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${isMine ? 'order-2' : 'order-1'}`}>
                  {!isMine && (
                    <div className="flex items-center space-x-2 mb-1">
                      <img
                        src={message[4] || '/logo.svg'} // sender pfp
                        alt={message[0]} // sender name
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-400">{message[0]}</span>
                    </div>
                  )}
                  <Card
                    className={`p-3 ${
                      isMine
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                  >
                    <p className="text-sm">{message[1]}</p> {/* message content */}
                    <p className={`text-xs mt-1 ${isMine ? 'text-blue-200' : 'text-gray-400'}`}>
                      {formatTime(message[2])} {/* timestamp */}
                    </p>
                  </Card>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-900">
        <form onSubmit={sendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            disabled={sending}
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || sending}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              <RiSendPlaneLine size={16} />
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}