import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIVerseAssistant = ({ isOpen, onToggle, currentLesson }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: 1,
          type: 'assistant',
          content: `Hello! I'm your AI verse assistant. I can help you understand biblical passages, provide context, and answer questions about ${currentLesson?.title || 'your current lesson'}. What would you like to explore?`,
          timestamp: new Date()
        }
      ]);
    }
  }, [currentLesson, messages.length]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, currentLesson);
      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput, lesson) => {
    const input = userInput.toLowerCase();
    
    // Context-aware responses based on lesson content
    if (input.includes('context') || input.includes('background')) {
      return `Great question about context! Understanding the historical and cultural background is crucial for interpreting prophetic literature. \n\nFor ${lesson?.title || 'this lesson'}, consider:\n\n• **Historical Setting**: When was this written and what was happening in Israel/Judah?\n• **Audience**: Who was the original audience and what were their circumstances?\n• **Literary Context**: How does this passage fit within the broader book and biblical narrative?\n\nWould you like me to elaborate on any of these aspects?`;
    }
    
    if (input.includes('prophet') || input.includes('prophecy')) {
      return `Prophets served as God's messengers, speaking both to their immediate context and pointing toward future fulfillment. Here are key principles for understanding prophetic literature:\n\n• **Dual Fulfillment**: Many prophecies had both immediate and future applications\n• **Covenant Context**: Prophets called people back to covenant faithfulness\n• **Literary Forms**: Prophecies use various literary devices like metaphor, symbolism, and apocalyptic imagery\n\nWhat specific aspect of prophecy would you like to explore further?`;
    }
    
    if (input.includes('application') || input.includes('apply') || input.includes('today')) {
      return `Excellent question about application! While prophetic messages were given to specific historical situations, they contain timeless principles:\n\n• **God's Character**: What does this reveal about God's justice, mercy, and faithfulness?\n• **Human Nature**: How does this address universal human tendencies and needs?\n• **Spiritual Principles**: What enduring truths can guide our relationship with God?\n\nFor practical application, ask: How does this challenge my understanding of faithfulness? What hope does it offer for difficult circumstances?`;
    }
    
    if (input.includes('interpret') || input.includes('meaning') || input.includes('understand')) {
      return `Biblical interpretation requires careful attention to several factors:\n\n**1. Literary Context**: Read the surrounding passages\n**2. Historical Context**: Understand the original setting\n**3. Grammatical Analysis**: Pay attention to the original language structure\n**4. Theological Context**: Consider how it fits with broader biblical themes\n**5. Practical Application**: How does this apply to life today?\n\nRemember: Scripture interprets Scripture. Let clearer passages help illuminate more difficult ones. What specific passage are you working to understand?`;
    }
    
    if (input.includes('study') || input.includes('method') || input.includes('how')) {
      return `Here's a practical approach for studying prophetic literature:\n\n**Step 1**: Read the entire book for overview\n**Step 2**: Identify the historical setting and audience\n**Step 3**: Note key themes and repeated phrases\n**Step 4**: Study specific passages in detail\n**Step 5**: Look for connections to other biblical books\n**Step 6**: Consider both historical and future applications\n\nTools that help: Study Bible, concordance, biblical atlas, and commentaries. Would you like specific recommendations for any of these resources?`;
    }
    
    // Default responses for common theological topics
    const responses = [
      `That's a thoughtful question! In studying Old Testament prophecy, it's important to remember that God's messages through the prophets addressed both immediate concerns and future hope.\n\nThe prophets called people to:\n• Repentance and covenant faithfulness\n• Social justice and care for the marginalized\n• Trust in God's sovereignty even in difficult times\n\nHow does this connect to what you're learning in ${lesson?.title || 'your current lesson'}?`,
      
      `Great observation! The prophetic books are rich with theological insights. Consider how this passage reveals:\n\n• **God's Character**: His justice, mercy, and faithfulness\n• **Human Responsibility**: Our call to obedience and faith\n• **Divine Plan**: How God works through history\n\nWhat specific aspect would you like to explore deeper?`,
      
      `That's an excellent question for biblical study! When approaching prophetic literature, remember:\n\n• Prophecy often has both immediate and future fulfillment\n• Symbolic language requires careful interpretation\n• Historical context is crucial for understanding\n• The ultimate goal is knowing God better\n\nWould you like me to help you work through a specific passage?`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const suggestedQuestions = [
    "What\'s the historical context of this passage?",
    "How do I apply this to my life today?",
    "What does this reveal about God's character?",
    "Can you explain this prophetic imagery?",
    "How does this connect to the New Testament?"
  ];

  if (!isOpen) {
    return (
      <Button
        variant="primary"
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-1000 rounded-full w-14 h-14 shadow-soft-lg hover-lift"
      >
        <Icon name="MessageCircle" size={24} />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-1000 bg-card rounded-lg shadow-soft-lg border border-subtle transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-subtle bg-primary-50 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="MessageCircle" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-heading-semibold text-text-primary text-sm">
              AI Verse Assistant
            </h3>
            <p className="text-xs text-text-secondary font-caption">
              Biblical insights & guidance
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1"
          >
            <Icon name={isMinimized ? "Maximize2" : "Minimize2"} size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="p-1"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-80">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] ${
                    message.type === 'user' ?'bg-primary text-primary-foreground' :'bg-surface text-text-primary'
                  } rounded-lg p-3`}>
                    <p className="text-sm font-body whitespace-pre-line">
                      {message.content}
                    </p>
                    <p className={`text-xs mt-2 ${
                      message.type === 'user' ?'text-primary-foreground opacity-70' :'text-text-muted'
                    }`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-surface text-text-primary rounded-lg p-3">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-text-muted rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-text-muted font-caption mb-2">
                Try asking:
              </p>
              <div className="flex flex-wrap gap-1">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="text-xs bg-primary-50 text-primary px-2 py-1 rounded-full hover:bg-primary-100 transition-color"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-subtle">
            <div className="flex items-end space-x-2">
              <div className="flex-1">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask about biblical context, interpretation, or application..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isTyping}
                  className="text-sm"
                />
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="px-3 py-2"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AIVerseAssistant;