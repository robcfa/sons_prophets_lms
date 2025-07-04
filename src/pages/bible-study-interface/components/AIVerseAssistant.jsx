import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIVerseAssistant = ({ selectedBook, selectedChapter, selectedVerse, isExpanded, onToggle }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Generate contextual suggested questions based on selected passage
    if (selectedBook && selectedChapter) {
      const suggestions = generateSuggestedQuestions(selectedBook, selectedChapter, selectedVerse);
      setSuggestedQuestions(suggestions);
    }
  }, [selectedBook, selectedChapter, selectedVerse]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const generateSuggestedQuestions = (book, chapter, verse) => {
    const questionTemplates = {
      'genesis': [
        "What is the theological significance of this creation account?",
        "How does this passage relate to modern scientific understanding?",
        "What does this teach us about God's character?",
        "How should this influence our understanding of humanity\'s purpose?"
      ],
      'psalms': [
        "What is the historical context of this psalm?",
        "How can I apply this psalm to my personal prayer life?",
        "What literary devices are used in this passage?",
        "How does this psalm point to Christ?"
      ],
      'isaiah': [
        "How is this prophecy fulfilled in the New Testament?",
        "What was the original audience\'s understanding of this passage?",
        "How does this passage relate to the Messiah?",
        "What comfort does this offer to believers today?"
      ]
    };

    const general = [
      "Can you explain the cultural context of this passage?",
      "What are the key theological themes here?",
      "How does this connect to other parts of Scripture?",
      "What practical applications can I draw from this?"
    ];

    return questionTemplates[book] || general;
  };

  const getMockAIResponse = (question, context) => {
    const responses = {
      'theological significance': `This passage carries profound theological weight. In the context of ${context.book} ${context.chapter}${context.verse ? `:${context.verse}` : ''}, we see several key themes:\n\n1. **Divine Sovereignty**: God's absolute authority and control over creation and history\n2. **Covenant Relationship**: The special relationship between God and His people\n3. **Redemptive Purpose**: How this passage fits into God's overall plan of salvation\n\nThe original Hebrew/Greek text reveals additional layers of meaning that enhance our understanding of God's character and His intentions for humanity.`,
      
      'historical context': `The historical setting of ${context.book} ${context.chapter} is crucial for proper interpretation:\n\n**Time Period**: This was written during a time of significant political and spiritual upheaval\n**Audience**: The original recipients were facing specific challenges that this passage addressed\n**Cultural Background**: Understanding ancient Near Eastern customs helps illuminate the meaning\n\nArchaeological discoveries have confirmed many details mentioned in this passage, lending credibility to the biblical account and helping us understand the daily life of people in that era.`,
      
      'practical application': `This passage offers several practical applications for modern believers:\n\n**Personal Growth**: How this challenges us to grow in faith and character\n**Community Life**: Ways this should impact our relationships with others\n**Worship and Prayer**: How this enriches our spiritual practices\n**Daily Living**: Practical ways to live out these truths\n\nThe timeless principles found here transcend cultural boundaries and speak directly to contemporary issues we face today.`
    };

    // Simple keyword matching for demo purposes
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('significance') || lowerQuestion.includes('theological')) {
      return responses['theological significance'];
    } else if (lowerQuestion.includes('context') || lowerQuestion.includes('historical')) {
      return responses['historical context'];
    } else if (lowerQuestion.includes('apply') || lowerQuestion.includes('practical')) {
      return responses['practical application'];
    }

    return `Thank you for your question about ${context.book} ${context.chapter}${context.verse ? `:${context.verse}` : ''}. This is a rich passage with multiple layers of meaning.\n\nBased on careful exegesis and theological scholarship, this text reveals important truths about God's character, His relationship with humanity, and His redemptive plan. The original language contains nuances that deepen our understanding.\n\nWould you like me to explore any specific aspect of this passage in more detail?`;
  };

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const context = {
        book: selectedBook,
        chapter: selectedChapter,
        verse: selectedVerse
      };

      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        content: getMockAIResponse(message, context),
        timestamp: new Date(),
        context: context
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTimestamp = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          variant="primary"
          onClick={onToggle}
          className="rounded-full w-14 h-14 shadow-soft-lg hover-lift"
        >
          <Icon name="MessageCircle" size={24} />
        </Button>
        {selectedBook && selectedChapter && (
          <div className="absolute -top-2 -left-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={12} className="text-white" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-subtle shadow-soft-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-subtle">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-text-primary">
              AI Verse Assistant
            </h3>
            {selectedBook && selectedChapter && (
              <p className="text-sm text-text-secondary">
                Studying {selectedBook.charAt(0).toUpperCase() + selectedBook.slice(1).replace('-', ' ')} {selectedChapter}
                {selectedVerse && `:${selectedVerse}`}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Icon name="RotateCcw" size={16} />
          </Button>
          <Button variant="ghost" size="sm" onClick={onToggle} className="p-2">
            <Icon name="Minimize2" size={16} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="h-80 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="MessageCircle" size={48} className="text-text-muted mx-auto mb-4" />
            <h4 className="font-heading font-semibold text-text-primary mb-2">
              Ask me about this passage
            </h4>
            <p className="text-text-secondary font-body mb-4">
              I can help explain theological concepts, historical context, and practical applications.
            </p>
            
            {/* Suggested Questions */}
            {suggestedQuestions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-caption text-text-muted">Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {suggestedQuestions.slice(0, 3).map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedQuestion(question)}
                      className="text-xs max-w-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user' ?'bg-primary text-white' :'bg-surface border border-subtle'
                  }`}
                >
                  {message.type === 'ai' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Icon name="Sparkles" size={14} className="text-primary" />
                      <span className="text-xs font-caption text-text-muted">
                        AI Assistant
                      </span>
                    </div>
                  )}
                  
                  <div className="whitespace-pre-wrap text-sm font-body">
                    {message.content}
                  </div>
                  
                  <div className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-primary-200' : 'text-text-muted'
                  }`}>
                    {formatTimestamp(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-surface border border-subtle rounded-lg px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Loader2" size={16} className="animate-spin text-primary" />
                    <span className="text-sm font-body text-text-secondary">
                      Analyzing passage...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-subtle">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Ask about this passage..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
              className="pr-12"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestedQuestion("What is the main theme of this passage?")}
              className="text-xs"
            >
              <Icon name="Lightbulb" size={12} className="mr-1" />
              Main Theme
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleSuggestedQuestion("How can I apply this to my life?")}
              className="text-xs"
            >
              <Icon name="Heart" size={12} className="mr-1" />
              Application
            </Button>
          </div>
          
          <div className="text-xs text-text-muted font-caption">
            Press Enter to send
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIVerseAssistant;