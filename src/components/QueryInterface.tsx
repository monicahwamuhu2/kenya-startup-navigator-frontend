'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface QueryResponse {
  answer: string
  confidence: number
  processing_time: number
  sources: string[]
  suggested_follow_ups: string[]
  timestamp: string
}

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  confidence?: number
  sources?: string[]
  followUps?: string[]
}

export default function QueryInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (question: string) => {
    if (!question.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: question,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Use your Render backend URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://startup-navigator-backend-new.onrender.com'
      
      console.log('Making request to:', `${apiUrl}/api/v1/query`) // Debug log
      
      const response = await fetch(`${apiUrl}/api/v1/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question })
      })

      console.log('Response status:', response.status) // Debug log

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: QueryResponse = await response.json()
      console.log('Response data:', data) // Debug log

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.answer,
        timestamp: new Date(),
        confidence: data.confidence,
        sources: data.sources,
        followUps: data.suggested_follow_ups
      }

      setMessages(prev => [...prev, aiMessage])

    } catch (error) {
      console.error('API Error:', error) // Debug log
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I apologize, but I encountered an error connecting to the AI service. Please try again in a moment. Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(inputValue)
    }
  }

  const suggestedQuestions = [
    "How do I raise seed funding for my fintech startup in Kenya?",
    "Which accelerators should I apply to in Nairobi?",
    "How do I register my business in Kenya?",
    "What VCs invest in agritech startups?",
    "What are the legal requirements for fintech in Kenya?"
  ]

  // Africa Map SVG Component - Optimized for mobile
  const AfricaMap = () => (
    <svg
      viewBox="0 0 1000 1000"
      className="absolute inset-0 w-full h-full opacity-3 sm:opacity-5"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Simplified Africa outline */}
      <path
        d="M500 100 C 600 120, 700 200, 750 300 C 800 400, 820 500, 800 600 C 780 700, 750 800, 700 850 C 600 900, 500 920, 400 900 C 300 880, 200 800, 150 700 C 100 600, 120 500, 140 400 C 160 300, 200 200, 300 150 C 400 120, 450 100, 500 100 Z"
        fill="url(#africaGradient)"
        stroke="#1f2937"
        strokeWidth="2"
      />
      
      {/* Kenya highlighted - Smaller on mobile */}
      <circle
        cx="650"
        cy="450"
        r="25"
        fill="#dc2626"
        stroke="#ffffff"
        strokeWidth="2"
        className="animate-pulse"
      />
      
      {/* Subtle grid lines */}
      <defs>
        <linearGradient id="africaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1f2937" stopOpacity="0.1"/>
          <stop offset="100%" stopColor="#374151" stopOpacity="0.2"/>
        </linearGradient>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#374151" strokeWidth="1" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"/>
    </svg>
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 overflow-hidden">
      
      {/* Africa Map Background */}
      <div className="absolute inset-0">
        <AfricaMap />
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10 flex flex-col h-screen">
        
        {/* Mobile-Responsive Header */}
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
        >
          <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Kenya Flag Colors - Responsive sizing */}
                  <div className="flex gap-0.5 sm:gap-1">
                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-black rounded-sm"></div>
                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-red-600 rounded-sm"></div>
                    <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-green-600 rounded-sm"></div>
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      Kenya Startup Navigator
                    </h1>
                    <p className="text-gray-600 text-xs sm:text-sm hidden sm:block">
                      AI-powered guidance for East Africa&apos;s startup ecosystem
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Mobile-optimized status indicators */}
              <div className="flex items-center gap-2 sm:gap-6">
                <div className="flex items-center gap-1 sm:gap-2 bg-green-100 text-green-800 rounded-full px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium">
                  <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="hidden sm:inline">AI Online</span>
                  <span className="sm:hidden">AI</span>
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium hidden md:block">
                  Powered by Groq AI
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Messages Area - Mobile optimized */}
        <div className="flex-1 overflow-hidden relative">
          <div className="h-full overflow-y-auto p-2 sm:p-4 lg:p-6">
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              
              {/* Welcome Card - Mobile responsive */}
              {messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="text-center py-4 sm:py-8"
                >
                  <div className="bg-white/80 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-white/50 relative overflow-hidden">
                    
                    {/* Decorative stripe */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-black to-green-500"></div>
                    
                    <div className="mb-4 sm:mb-6">
                      <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
                        Welcome to Kenya&apos;s Startup Ecosystem
                      </h2>
                      <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
                        Your intelligent guide to navigating Kenya&apos;s vibrant startup landscape. 
                        Get expert insights on funding, accelerators, regulations, and market opportunities.
                      </p>
                    </div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-xs sm:text-sm font-semibold text-gray-800 mb-3 sm:mb-4">
                        Popular startup questions:
                      </p>
                      
                      {/* Mobile-first grid layout */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-3">
                        {suggestedQuestions.map((question, index) => (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            onClick={() => handleSubmit(question)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group text-left p-3 sm:p-4 bg-white/60 hover:bg-white/80 rounded-lg sm:rounded-xl text-xs sm:text-sm text-gray-800 transition-all duration-300 border border-gray-200/50 hover:border-gray-300 shadow-sm hover:shadow-md backdrop-blur-sm"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-red-500 rounded-full mt-2 group-hover:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                              <span className="flex-1 leading-relaxed">
                                {question}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Message Bubbles - Mobile responsive */}
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[90%] sm:max-w-3xl relative ${message.type === 'user' ? 'ml-4 sm:ml-12' : 'mr-4 sm:mr-12'}`}>
                      
                      {/* User Message - Mobile optimized */}
                      {message.type === 'user' ? (
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-md p-3 sm:p-4 shadow-lg">
                          <div className="whitespace-pre-wrap leading-relaxed text-sm sm:text-base">{message.content}</div>
                          <div className="text-blue-100 text-xs mt-2 opacity-75">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      ) : (
                        /* AI Message - Mobile responsive */
                        <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl rounded-bl-md p-4 sm:p-6 shadow-lg relative">
                          
                          {/* AI Indicator - Responsive sizing */}
                          <div className="absolute -top-2 -left-2 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center shadow-md">
                            <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full flex items-center justify-center">
                              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-800 rounded-full"></div>
                            </div>
                          </div>
                          
                          <div className="ml-1 sm:ml-2">
                            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm sm:text-base">
                              {message.content}
                            </div>
                            
                            {/* AI Metadata - Mobile responsive */}
                            {message.type === 'ai' && (
                              <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                                
                                {/* Confidence Score - Mobile friendly */}
                                {message.confidence && (
                                  <div className="flex items-center gap-2 sm:gap-3">
                                    <span className="text-xs sm:text-sm font-medium text-gray-600 flex-shrink-0">Confidence:</span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2 overflow-hidden">
                                      <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${message.confidence * 100}%` }}
                                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                                        className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 sm:h-2 rounded-full"
                                      />
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-green-700 flex-shrink-0">
                                      {Math.round(message.confidence * 100)}%
                                    </span>
                                  </div>
                                )}

                                {/* Sources - Mobile responsive */}
                                {message.sources && message.sources.length > 0 && (
                                  <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2">
                                    <span className="text-xs sm:text-sm font-medium text-gray-600 flex-shrink-0">Sources:</span>
                                    <div className="flex flex-wrap gap-1">
                                      {message.sources.map((source, idx) => (
                                        <span key={idx} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md border">
                                          {source}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Follow-up Questions - Mobile optimized */}
                                {message.followUps && message.followUps.length > 0 && (
                                  <div className="space-y-2 sm:space-y-3">
                                    <p className="text-xs sm:text-sm font-medium text-gray-700">
                                      Related questions:
                                    </p>
                                    <div className="space-y-2">
                                      {message.followUps.map((followUp, idx) => (
                                        <motion.button
                                          key={idx}
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 1 + idx * 0.1 }}
                                          onClick={() => handleSubmit(followUp)}
                                          whileHover={{ scale: 1.01 }}
                                          whileTap={{ scale: 0.99 }}
                                          className="block w-full text-left text-xs sm:text-sm p-2 sm:p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 transition-all duration-200 border border-gray-200 hover:border-gray-300"
                                        >
                                          <div className="flex items-start gap-2">
                                            <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                            <span className="leading-relaxed">{followUp}</span>
                                          </div>
                                        </motion.button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            <div className="text-gray-400 text-xs mt-3 sm:mt-4">
                              {message.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Loading Indicator - Mobile responsive */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start mr-4 sm:mr-12"
                >
                  <div className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-2xl rounded-bl-md p-4 sm:p-6 shadow-lg relative">
                    <div className="absolute -top-2 -left-2 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center shadow-md">
                      <div className="w-3 sm:w-4 h-3 sm:h-4 bg-white rounded-full flex items-center justify-center">
                        <motion.div 
                          className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-800 rounded-full"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        />
                      </div>
                    </div>
                    <div className="ml-1 sm:ml-2 flex items-center gap-2 sm:gap-3">
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gray-400 rounded-full"
                            animate={{ 
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              delay: i * 0.3
                            }}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 text-xs sm:text-sm">
                        <span className="hidden sm:inline">Analyzing Kenya&apos;s startup ecosystem...</span>
                        <span className="sm:hidden">Analyzing...</span>
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>

        {/* Input Area - Mobile optimized */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-lg"
        >
          <div className="max-w-4xl mx-auto p-3 sm:p-4 lg:p-6">
            <div className="relative">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Kenya's startup ecosystem, funding opportunities, regulations..."
                className="w-full resize-none rounded-lg sm:rounded-xl border-2 border-gray-200 bg-white/80 backdrop-blur-sm px-3 sm:px-4 py-3 sm:py-4 pr-12 sm:pr-16 text-sm sm:text-base text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 min-h-[50px] sm:min-h-[60px] max-h-[120px] sm:max-h-[200px] transition-all duration-200 shadow-sm"
                rows={1}
                disabled={isLoading}
              />
              
              <motion.button
                onClick={() => handleSubmit(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg className="w-4 sm:w-5 h-4 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 gap-1 sm:gap-0">
              <span className="order-2 sm:order-1">Press Enter to send, Shift+Enter for new line</span>
              <span className="font-medium order-1 sm:order-2">Powered by Groq AI</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}