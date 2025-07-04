import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AINoteSummaryWizard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sessionData, setSessionData] = useState({
    learnerName: '',
    sessionDate: '',
    sessionType: 'individual',
    duration: '',
    topics: '',
    keyPoints: '',
    challenges: '',
    nextSteps: ''
  });
  const [generatedSummary, setGeneratedSummary] = useState('');

  const sessionTypes = [
    { value: 'individual', label: 'Individual Coaching', icon: 'User' },
    { value: 'group', label: 'Group Session', icon: 'Users' },
    { value: 'bible-study', label: 'Bible Study', icon: 'Book' },
    { value: 'discussion', label: 'Discussion Forum', icon: 'MessageSquare' }
  ];

  const handleInputChange = (field, value) => {
    setSessionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockSummary = `## Session Summary - ${sessionData.learnerName}

**Date:** ${sessionData.sessionDate}
**Type:** ${sessionTypes.find(t => t.value === sessionData.sessionType)?.label}
**Duration:** ${sessionData.duration} minutes

### Key Discussion Points
${sessionData.topics}

### Main Insights
${sessionData.keyPoints}

### Challenges Identified
${sessionData.challenges}

### Recommended Next Steps
1. ${sessionData.nextSteps}
2. Continue with assigned reading from current course module
3. Schedule follow-up session to review progress
4. Encourage participation in relevant forum discussions

### AI Recommendations
- Consider assigning supplementary materials on biblical hermeneutics
- Suggest joining the weekly Bible study group for peer interaction
- Recommend focusing on practical application exercises
- Monitor progress on current course assignments

### Action Items
- [ ] Send follow-up resources via email
- [ ] Update learner progress tracking
- [ ] Schedule next coaching session
- [ ] Add notes to learner profile

*This summary was generated using AI assistance and should be reviewed for accuracy.*`;

      setGeneratedSummary(mockSummary);
      setIsGenerating(false);
      setCurrentStep(3);
    }, 2000);
  };

  const handleSaveSummary = () => {
    // Handle saving the summary
    setIsOpen(false);
    setCurrentStep(1);
    setSessionData({
      learnerName: '',
      sessionDate: '',
      sessionType: 'individual',
      duration: '',
      topics: '',
      keyPoints: '',
      challenges: '',
      nextSteps: ''
    });
    setGeneratedSummary('');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Session Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Learner Name
            </label>
            <Input
              type="text"
              placeholder="Enter learner name"
              value={sessionData.learnerName}
              onChange={(e) => handleInputChange('learnerName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Session Date
            </label>
            <Input
              type="date"
              value={sessionData.sessionDate}
              onChange={(e) => handleInputChange('sessionDate', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Session Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              {sessionTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => handleInputChange('sessionType', type.value)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-color ${
                    sessionData.sessionType === type.value
                      ? 'border-primary bg-primary-50 text-primary' :'border-subtle hover:border-primary hover:bg-primary-50'
                  }`}
                >
                  <Icon name={type.icon} size={16} />
                  <span className="text-sm font-body">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Duration (minutes)
            </label>
            <Input
              type="number"
              placeholder="60"
              value={sessionData.duration}
              onChange={(e) => handleInputChange('duration', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Session Details
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Topics Discussed
            </label>
            <textarea
              className="w-full p-3 border border-subtle rounded-lg font-body text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="What topics were covered in this session?"
              value={sessionData.topics}
              onChange={(e) => handleInputChange('topics', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Key Points & Insights
            </label>
            <textarea
              className="w-full p-3 border border-subtle rounded-lg font-body text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="What were the main insights or breakthroughs?"
              value={sessionData.keyPoints}
              onChange={(e) => handleInputChange('keyPoints', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Challenges Identified
            </label>
            <textarea
              className="w-full p-3 border border-subtle rounded-lg font-body text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="What challenges or difficulties were discussed?"
              value={sessionData.challenges}
              onChange={(e) => handleInputChange('challenges', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-body font-semibold text-text-primary mb-2">
              Next Steps & Action Items
            </label>
            <textarea
              className="w-full p-3 border border-subtle rounded-lg font-body text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={3}
              placeholder="What are the recommended next steps?"
              value={sessionData.nextSteps}
              onChange={(e) => handleInputChange('nextSteps', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-heading font-bold text-text-primary mb-4">
          Generated Summary
        </h3>
        <div className="bg-surface border border-subtle rounded-lg p-4 max-h-96 overflow-y-auto">
          <pre className="font-body text-sm text-text-primary whitespace-pre-wrap">
            {generatedSummary}
          </pre>
        </div>
        <div className="flex items-center space-x-2 mt-4 p-3 bg-accent-50 rounded-lg">
          <Icon name="Lightbulb" size={16} className="text-accent" />
          <p className="text-sm font-body text-accent-700">
            Review the generated summary and make any necessary edits before saving.
          </p>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="bg-card rounded-lg border border-subtle p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-accent-50 rounded-lg">
              <Icon name="Brain" size={24} className="text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-bold text-text-primary">
                AI Note Summary Wizard
              </h3>
              <p className="text-sm font-body text-text-secondary">
                Generate comprehensive session summaries with AI assistance
              </p>
            </div>
          </div>
          <Button variant="primary" onClick={() => setIsOpen(true)}>
            <Icon name="Wand2" size={16} className="mr-2" />
            Start Wizard
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg">
            <Icon name="FileText" size={20} className="text-primary" />
            <div>
              <p className="font-body font-semibold text-text-primary text-sm">
                Smart Summaries
              </p>
              <p className="text-xs font-caption text-text-secondary">
                AI-generated session notes
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg">
            <Icon name="Target" size={20} className="text-success" />
            <div>
              <p className="font-body font-semibold text-text-primary text-sm">
                Action Items
              </p>
              <p className="text-xs font-caption text-text-secondary">
                Automatic next steps
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-surface rounded-lg">
            <Icon name="Clock" size={20} className="text-accent" />
            <div>
              <p className="font-body font-semibold text-text-primary text-sm">
                Time Saving
              </p>
              <p className="text-xs font-caption text-text-secondary">
                Reduce admin work
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-1200 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-card rounded-lg border border-subtle w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Brain" size={24} className="text-accent" />
              <h2 className="text-xl font-heading font-bold text-text-primary">
                AI Note Summary Wizard
              </h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="flex items-center space-x-4 mt-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-data ${
                  currentStep >= step
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-surface text-text-muted'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-primary' : 'bg-surface'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>

        <div className="p-6 border-t border-subtle bg-surface">
          <div className="flex items-center justify-between">
            <div>
              {currentStep > 1 && (
                <Button 
                  variant="ghost" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                  disabled={isGenerating}
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Previous
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-3">
              {currentStep < 2 && (
                <Button 
                  variant="primary" 
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!sessionData.learnerName || !sessionData.sessionDate}
                >
                  Next
                  <Icon name="ArrowRight" size={16} className="ml-2" />
                </Button>
              )}
              {currentStep === 2 && (
                <Button 
                  variant="primary" 
                  onClick={handleGenerateSummary}
                  disabled={isGenerating || !sessionData.topics}
                >
                  {isGenerating ? (
                    <>
                      <Icon name="Loader2" size={16} className="mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Icon name="Wand2" size={16} className="mr-2" />
                      Generate Summary
                    </>
                  )}
                </Button>
              )}
              {currentStep === 3 && (
                <Button variant="success" onClick={handleSaveSummary}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Save Summary
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AINoteSummaryWizard;