/**
 * ChatWidget Component
 * Version: 2.0.0
 * Last Updated: 2024-11-24
 * 
 * RAG Chatbot interface for querying VCF 9.0 documentation.
 * Connects to local FastAPI backend on http://localhost:8000
 */
import { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Loader2 } from 'lucide-react'

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your VCF 9.0 documentation assistant. Ask me anything about VMware Cloud Foundation 9.0, and I\'ll search through the documentation to help you.',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const API_URL = 'http://localhost:8000'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userMessage.content }),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      
      const assistantMessage = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources || [],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      
      let errorMessage = ''
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        errorMessage = `❌ Cannot connect to backend server.

Please start the backend service:
1. Open a terminal
2. Navigate to: rag_service folder
3. Run: uvicorn main:app --reload

Or use the startup script: rag_service/start_backend.bat (Windows) or start_backend.sh (Mac/Linux)

Make sure:
✓ Python virtual environment is activated
✓ FAISS index exists (run: python ingest.py)
✓ Ollama is running with llama3.2 model loaded`
      } else if (error.message.includes('API error: 503')) {
        errorMessage = `⚠️ Backend service is starting up or resources are not loaded.

Please check:
1. Is Ollama running? (ollama serve)
2. Is the model downloaded? (ollama pull llama3.2)
3. Does the FAISS index exist? (run: python ingest.py)`
      } else {
        errorMessage = `❌ Error: ${error.message}

Please check:
- Backend is running on http://localhost:8000
- Ollama is running with llama3.2 model
- Check browser console for details`
      }
      
      const errorMsg = {
        role: 'assistant',
        content: errorMessage,
        timestamp: new Date(),
        isError: true
      }
      setMessages(prev => [...prev, errorMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hello! I\'m your VCF 9.0 documentation assistant. Ask me anything about VMware Cloud Foundation 9.0, and I\'ll search through the documentation to help you.',
        timestamp: new Date()
      }
    ])
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors z-50 min-h-[56px] min-w-[56px] flex items-center justify-center"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-md h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200 md:max-w-md md:h-[600px]">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <h3 className="font-semibold text-base">VCF 9.0 Assistant</h3>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-white hover:text-gray-200 text-sm px-2 py-1 rounded transition-colors"
                title="Clear chat"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : message.isError
                      ? 'bg-red-50 text-red-800 border border-red-200'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-300">
                      <p className="text-xs text-gray-500 mb-1">Sources:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {message.sources.map((source, idx) => (
                          <li key={idx} className="truncate">
                            {source.split('/').pop()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-[80%]">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Local AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about VCF 9.0..."
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-base min-h-[44px] max-h-32"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Ollama (Local AI)
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWidget

