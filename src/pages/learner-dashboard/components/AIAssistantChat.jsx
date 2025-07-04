import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIAssistantChat = ({ isExpanded, onToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: `Hello! I'm your AI study assistant for Old Testament prophecy. I can help you with:\n\n• Biblical text interpretation\n• Historical context questions\n• Cross-references and connections\n• Study guidance and tips\n\nWhat would you like to explore today?`,
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Great question about ${inputValue.includes('Isaiah') ? 'Isaiah' : inputValue.includes('Ezekiel') ? 'Ezekiel' : inputValue.includes('Daniel') ? 'Daniel' : 'biblical prophecy'}! Let me help you understand this better.\n\nThe passage you're asking about has several key interpretive layers:\n\n1. **Historical Context**: This was written during a specific period in Israel's history\n2. **Literary Context**: Consider the surrounding chapters and themes\n3. **Theological Significance**: How does this connect to God's covenant promises?\n\nWould you like me to elaborate on any of these aspects?`,`That's an excellent theological question! The prophetic literature often uses symbolic language that requires careful interpretation.\n\nHere are some key principles to consider:\n\n• **Literal vs. Figurative**: Determine the genre and intended meaning\n• **Near vs. Far Fulfillment**: Many prophecies have both immediate and future applications\n• **Covenant Context**: How does this relate to God's promises to Israel?\n\nWhat specific verse or passage would you like to explore further?`,
        
        `I can see you're diving deep into prophetic interpretation! This is a complex but rewarding area of study.\n\nFor this particular topic, I'd recommend:\n\n1. Examining the Hebrew text for nuanced meanings\n2. Comparing with parallel passages in other prophetic books\n3. Considering the historical timeline and audience\n\nWould you like me to suggest some specific cross-references or provide more historical background?`
      ];

      const assistantMessage = {
        id: Date.now() + 1,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const quickQuestions = [
    "What does Isaiah 53 mean?",
    "Explain Ezekiel\'s temple vision",
    "Daniel\'s 70 weeks prophecy",
    "Messianic prophecies overview"
  ];

  const handleQuickQuestion = (question) => {
    setInputValue(question);
    if (isExpanded) {
      handleSendMessage();
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-20 md:bottom-6 right-6 z-50">
        <Button
          variant="primary"
          onClick={onToggle}
          className="rounded-full w-14 h-14 shadow-soft-lg hover:shadow-soft-lg hover:scale-110 transition-all duration-200"
        >
          <Icon name="MessageCircle" size={24} />
        </Button>
        
        {/* Quick access bubble */}
        <div className="absolute bottom-16 right-0 bg-card rounded-lg shadow-soft-md border border-subtle p-3 w-64 opacity-0 hover:opacity-100 transition-opacity duration-200">
          <p className="text-sm font-body text-text-primary mb-2">
            Quick AI Assistant
          </p>
          <div className="space-y-1">
            {quickQuestions.slice(0, 2).map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="block w-full text-left text-xs font-body text-text-secondary hover:text-primary transition-color p-1 rounded hover:bg-primary-50"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-96 md:h-[500px] z-50 bg-card md:rounded-xl shadow-soft-lg border border-subtle flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-subtle bg-primary text-white md:rounded-t-xl">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Icon name="Bot" size={18} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-heading-semibold">AI Study Assistant</h3>
            <p className="text-xs text-primary-100">Biblical Prophecy Expert</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="text-white hover:bg-white hover:bg-opacity-20 p-2"
        >
          <Icon name="X" size={18} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${
              message.type === 'user' ?'bg-primary text-white rounded-l-lg rounded-tr-lg' :'bg-surface text-text-primary rounded-r-lg rounded-tl-lg'
            } p-3 shadow-soft-sm`}>
              <p className="text-sm font-body whitespace-pre-line">
                {message.content}
              </p>
              <p className={`text-xs mt-2 ${
                message.type === 'user' ? 'text-primary-100' : 'text-text-muted'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-surface rounded-r-lg rounded-tl-lg p-3 shadow-soft-sm">
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

      {/* Quick Questions */}
      {messages.length === 1 && (
        <div className="px-4 py-2 border-t border-subtle bg-surface">
          <p className="text-xs font-caption text-text-muted mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleQuickQuestion(question)}
                className="text-xs font-body text-primary bg-primary-50 hover:bg-primary-100 px-2 py-1 rounded-full transition-color"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-subtle bg-surface md:rounded-b-xl">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask about biblical prophecy..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="resize-none"
            />
          </div>
          <Button
            variant="primary"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="flex-shrink-0"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantChat;