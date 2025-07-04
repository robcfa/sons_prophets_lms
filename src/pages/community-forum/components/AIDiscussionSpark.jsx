import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIDiscussionSpark = ({ onCreateFromSpark, isVisible }) => {
  const [currentSpark, setCurrentSpark] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sparkHistory, setSparkHistory] = useState([]);

  const theologicalSparks = [
    {
      id: 1,
      question: "How do the prophecies of Isaiah regarding the Messiah connect to the broader narrative of redemption in the Old Testament?",
      category: "biblical-interpretation",
      tags: ["Isaiah", "Messiah", "Prophecy", "Redemption"],
      context: "Exploring the messianic prophecies and their theological significance"
    },
    {
      id: 2,
      question: "What can we learn from the different approaches of the major and minor prophets in delivering God's message to Israel?",
      category: "biblical-interpretation",
      tags: ["Prophets", "Communication", "Israel", "Divine Message"],
      context: "Comparing prophetic styles and their effectiveness"
    },
    {
      id: 3,
      question: "How do the themes of justice and mercy interweave throughout the prophetic books, and what does this teach us about God's character?",
      category: "general",
      tags: ["Justice", "Mercy", "God\'s Character", "Prophetic Themes"],
      context: "Understanding divine attributes through prophetic literature"
    },
    {
      id: 4,
      question: "In what ways do the exile prophecies prepare us to understand the hope of restoration both historically and eschatologically?",
      category: "biblical-interpretation",
      tags: ["Exile", "Restoration", "Eschatology", "Hope"],
      context: "Connecting historical events with future hope"
    },
    {
      id: 5,
      question: "How can modern believers apply the social justice messages found in prophets like Amos and Micah to contemporary issues?",
      category: "general",
      tags: ["Social Justice", "Amos", "Micah", "Modern Application"],
      context: "Bridging ancient prophetic messages with today\'s challenges"
    },
    {
      id: 6,
      question: "What role does covenant theology play in understanding the conditional and unconditional promises made through the prophets?",
      category: "biblical-interpretation",
      tags: ["Covenant", "Promises", "Theology", "Prophetic Literature"],
      context: "Examining the theological framework of prophetic promises"
    }
  ];

  useEffect(() => {
    if (isVisible && !currentSpark) {
      generateNewSpark();
    }
  }, [isVisible]);

  const generateNewSpark = () => {
    setIsGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      const availableSparks = theologicalSparks.filter(
        spark => !sparkHistory.includes(spark.id)
      );
      
      if (availableSparks.length === 0) {
        setSparkHistory([]);
        setCurrentSpark(theologicalSparks[0]);
      } else {
        const randomSpark = availableSparks[Math.floor(Math.random() * availableSparks.length)];
        setCurrentSpark(randomSpark);
        setSparkHistory(prev => [...prev, randomSpark.id]);
      }
      
      setIsGenerating(false);
    }, 1500);
  };

  const handleCreateDiscussion = () => {
    if (currentSpark) {
      onCreateFromSpark({
        title: currentSpark.question,
        content: `I'd love to explore this question: "${currentSpark.question}"\n\n${currentSpark.context}\n\nWhat are your thoughts on this topic?`,
        category: currentSpark.category,
        tags: currentSpark.tags,
        isAIGenerated: true
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-accent-50 to-primary-50 border border-accent-200 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Sparkles" size={20} className="text-accent-foreground" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-heading font-heading-semibold text-accent-700">
              AI Discussion Spark
            </h3>
            <span className="text-xs font-caption bg-accent-100 text-accent-700 px-2 py-1 rounded-full">
              Powered by AI
            </span>
          </div>
          
          {isGenerating ? (
            <div className="flex items-center space-x-3 py-4">
              <Icon name="Loader2" size={20} className="animate-spin text-accent" />
              <span className="text-sm font-body text-text-secondary">
                Generating thought-provoking question...
              </span>
            </div>
          ) : currentSpark ? (
            <div className="space-y-4">
              <p className="text-sm font-body text-text-primary leading-relaxed">
                {currentSpark.question}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {currentSpark.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs font-caption bg-accent-100 text-accent-700 px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <p className="text-xs font-caption text-text-muted">
                  {currentSpark.context}
                </p>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={generateNewSpark}
                    disabled={isGenerating}
                    className="flex items-center space-x-1"
                  >
                    <Icon name="RefreshCw" size={14} />
                    <span>New Spark</span>
                  </Button>
                  
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleCreateDiscussion}
                    className="flex items-center space-x-1"
                  >
                    <Icon name="MessageSquare" size={14} />
                    <span>Start Discussion</span>
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-sm font-body text-text-secondary">
                Unable to generate discussion spark. Please try again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDiscussionSpark;