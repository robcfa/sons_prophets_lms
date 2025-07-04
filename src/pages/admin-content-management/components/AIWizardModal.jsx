import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AIWizardModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: 'prophecy',
    difficulty: 'beginner',
    estimatedHours: 12,
    learningObjectives: [],
    topics: [],
    moduleCount: 6,
    lessonCount: 24
  });
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState(null);

  const steps = [
    { id: 1, title: 'Course Overview', description: 'Basic course information' },
    { id: 2, title: 'Learning Objectives', description: 'Define what students will learn' },
    { id: 3, title: 'Content Structure', description: 'Organize modules and lessons' },
    { id: 4, title: 'AI Generation', description: 'Generate course content' },
    { id: 5, title: 'Review & Finalize', description: 'Review and customize content' }
  ];

  const handleInputChange = (field, value) => {
    setCourseData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayAdd = (field, value) => {
    if (value.trim()) {
      setCourseData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
    }
  };

  const handleArrayRemove = (field, index) => {
    setCourseData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleGenerate = async () => {
    setGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockGeneratedContent = {
      modules: [
        {
          id: 1,
          title: 'Introduction to Prophecy',
          description: 'Understanding the role and purpose of prophets in the Old Testament',
          lessons: [
            { id: 1, title: 'What is Prophecy?', type: 'video', duration: '15:00' },
            { id: 2, title: 'The Prophetic Office', type: 'text', duration: '10:00' },
            { id: 3, title: 'Types of Prophetic Literature', type: 'quiz', duration: '5:00' }
          ]
        },
        {
          id: 2,
          title: 'Major Prophets Overview',
          description: 'Survey of Isaiah, Jeremiah, Ezekiel, and Daniel',
          lessons: [
            { id: 4, title: 'Isaiah: The Messianic Prophet', type: 'video', duration: '20:00' },
            { id: 5, title: 'Jeremiah: The Weeping Prophet', type: 'text', duration: '15:00' },
            { id: 6, title: 'Ezekiel: Visions and Symbols', type: 'video', duration: '18:00' },
            { id: 7, title: 'Daniel: Prophecy and Apocalyptic', type: 'text', duration: '12:00' }
          ]
        }
      ],
      assessments: [
        { id: 1, title: 'Prophetic Literature Quiz', type: 'multiple-choice', questions: 10 },
        { id: 2, title: 'Major Prophets Essay', type: 'essay', wordCount: 500 }
      ],
      resources: [
        { id: 1, title: 'Prophetic Timeline Chart', type: 'pdf' },
        { id: 2, title: 'Hebrew Pronunciation Guide', type: 'audio' }
      ]
    };
    
    setGeneratedContent(mockGeneratedContent);
    setGenerating(false);
    setCurrentStep(5);
  };

  const handleComplete = () => {
    onComplete({
      ...courseData,
      generatedContent
    });
    onClose();
    // Reset wizard
    setCurrentStep(1);
    setCourseData({
      title: '',
      description: '',
      category: 'prophecy',
      difficulty: 'beginner',
      estimatedHours: 12,
      learningObjectives: [],
      topics: [],
      moduleCount: 6,
      lessonCount: 24
    });
    setGeneratedContent(null);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
          Course Title *
        </label>
        <Input
          type="text"
          value={courseData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="e.g., Introduction to Old Testament Prophecy"
        />
      </div>

      <div>
        <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
          Course Description *
        </label>
        <textarea
          value={courseData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe what this course covers and who it's for..."
          rows={4}
          className="w-full px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
            Category
          </label>
          <select
            value={courseData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className="w-full px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="prophecy">Prophecy</option>
            <option value="theology">Theology</option>
            <option value="history">Biblical History</option>
            <option value="languages">Biblical Languages</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
            Difficulty Level
          </label>
          <select
            value={courseData.difficulty}
            onChange={(e) => handleInputChange('difficulty', e.target.value)}
            className="w-full px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
          Estimated Hours
        </label>
        <Input
          type="number"
          value={courseData.estimatedHours}
          onChange={(e) => handleInputChange('estimatedHours', parseInt(e.target.value))}
          min="1"
          max="100"
        />
      </div>
    </div>
  );

  const renderStep2 = () => {
    const [newObjective, setNewObjective] = useState('');

    return (
      <div className="space-y-6">
        <div>
          <h3 className="font-heading font-heading-semibold text-text-primary mb-4">
            Learning Objectives
          </h3>
          <p className="text-text-secondary mb-4">
            Define what students will be able to do after completing this course.
          </p>
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            value={newObjective}
            onChange={(e) => setNewObjective(e.target.value)}
            placeholder="e.g., Identify the major themes in prophetic literature"
            className="flex-1"
          />
          <Button
            variant="secondary"
            onClick={() => {
              handleArrayAdd('learningObjectives', newObjective);
              setNewObjective('');
            }}
            disabled={!newObjective.trim()}
          >
            Add
          </Button>
        </div>

        {courseData.learningObjectives.length > 0 && (
          <div className="space-y-2">
            {courseData.learningObjectives.map((objective, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-surface rounded-lg">
                <Icon name="Target" size={16} className="text-primary flex-shrink-0" />
                <span className="flex-1 text-text-primary">{objective}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleArrayRemove('learningObjectives', index)}
                  className="p-1"
                >
                  <Icon name="X" size={14} />
                </Button>
              </div>
            ))}
          </div>
        )}

        {courseData.learningObjectives.length === 0 && (
          <div className="text-center py-8 text-text-secondary">
            <Icon name="Target" size={32} className="mx-auto mb-2 opacity-50" />
            <p>No learning objectives added yet</p>
          </div>
        )}
      </div>
    );
  };

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-heading-semibold text-text-primary mb-4">
          Content Structure
        </h3>
        <p className="text-text-secondary mb-4">
          Configure how your course content will be organized.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
            Number of Modules
          </label>
          <Input
            type="number"
            value={courseData.moduleCount}
            onChange={(e) => handleInputChange('moduleCount', parseInt(e.target.value))}
            min="1"
            max="20"
          />
          <p className="text-xs text-text-secondary mt-1">
            Modules are major course sections
          </p>
        </div>

        <div>
          <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
            Total Lessons
          </label>
          <Input
            type="number"
            value={courseData.lessonCount}
            onChange={(e) => handleInputChange('lessonCount', parseInt(e.target.value))}
            min="1"
            max="100"
          />
          <p className="text-xs text-text-secondary mt-1">
            Individual learning units within modules
          </p>
        </div>
      </div>

      <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon name="Lightbulb" size={20} className="text-accent-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-body font-body-semibold text-accent-800 mb-1">
              AI Recommendation
            </h4>
            <p className="text-sm text-accent-700">
              Based on your {courseData.estimatedHours}-hour course, we recommend {Math.ceil(courseData.estimatedHours / 2)} modules 
              with {Math.ceil(courseData.estimatedHours * 2)} lessons for optimal learning progression.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Sparkles" size={32} className="text-primary" />
        </div>
        <h3 className="font-heading font-heading-semibold text-text-primary text-xl mb-2">
          AI Course Generation
        </h3>
        <p className="text-text-secondary mb-6">
          Our AI will create a comprehensive course structure based on your specifications.
        </p>
      </div>

      <div className="bg-surface border border-subtle rounded-lg p-6">
        <h4 className="font-body font-body-semibold text-text-primary mb-4">
          Generation Summary
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-text-secondary">Course Title:</span>
            <span className="text-text-primary font-body-semibold">{courseData.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Difficulty:</span>
            <span className="text-text-primary capitalize">{courseData.difficulty}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Modules:</span>
            <span className="text-text-primary">{courseData.moduleCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Lessons:</span>
            <span className="text-text-primary">{courseData.lessonCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Learning Objectives:</span>
            <span className="text-text-primary">{courseData.learningObjectives.length}</span>
          </div>
        </div>
      </div>

      {generating ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h4 className="font-body font-body-semibold text-text-primary mb-2">
            Generating Course Content...
          </h4>
          <p className="text-text-secondary">
            This may take a few moments while our AI creates your course structure.
          </p>
        </div>
      ) : (
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleGenerate}
            iconName="Sparkles"
          >
            Generate Course Content
          </Button>
        </div>
      )}
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckCircle" size={32} className="text-success-600" />
        </div>
        <h3 className="font-heading font-heading-semibold text-text-primary text-xl mb-2">
          Course Generated Successfully!
        </h3>
        <p className="text-text-secondary mb-6">
          Review the generated content and make any necessary adjustments.
        </p>
      </div>

      {generatedContent && (
        <div className="space-y-4">
          <div className="bg-card border border-subtle rounded-lg p-4">
            <h4 className="font-body font-body-semibold text-text-primary mb-3">
              Generated Modules ({generatedContent.modules.length})
            </h4>
            <div className="space-y-3">
              {generatedContent.modules.map((module) => (
                <div key={module.id} className="bg-surface rounded-lg p-3">
                  <h5 className="font-body font-body-semibold text-text-primary mb-1">
                    {module.title}
                  </h5>
                  <p className="text-sm text-text-secondary mb-2">
                    {module.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted">
                    <span>{module.lessons.length} lessons</span>
                    <span>
                      {module.lessons.reduce((total, lesson) => {
                        const [minutes] = lesson.duration.split(':');
                        return total + parseInt(minutes);
                      }, 0)} minutes total
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card border border-subtle rounded-lg p-4">
              <h4 className="font-body font-body-semibold text-text-primary mb-3">
                Assessments ({generatedContent.assessments.length})
              </h4>
              <div className="space-y-2">
                {generatedContent.assessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center gap-2">
                    <Icon name="FileText" size={16} className="text-primary" />
                    <span className="text-sm text-text-primary">{assessment.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-subtle rounded-lg p-4">
              <h4 className="font-body font-body-semibold text-text-primary mb-3">
                Resources ({generatedContent.resources.length})
              </h4>
              <div className="space-y-2">
                {generatedContent.resources.map((resource) => (
                  <div key={resource.id} className="flex items-center gap-2">
                    <Icon name="Paperclip" size={16} className="text-accent" />
                    <span className="text-sm text-text-primary">{resource.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1300 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-soft-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-subtle">
          <div>
            <h2 className="font-heading font-heading-semibold text-text-primary text-xl">
              AI Course Creator
            </h2>
            <p className="text-text-secondary">
              Step {currentStep} of {steps.length}: {steps.find(s => s.id === currentStep)?.title}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-surface">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body-semibold ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-text-muted text-white'
                }`}>
                  {currentStep > step.id ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-text-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-subtle">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
            disabled={currentStep === 1 || generating}
          >
            Previous
          </Button>
          
          <div className="flex gap-2">
            {currentStep < 4 && (
              <Button
                variant="primary"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={
                  (currentStep === 1 && (!courseData.title || !courseData.description)) ||
                  (currentStep === 2 && courseData.learningObjectives.length === 0)
                }
              >
                Next
              </Button>
            )}
            
            {currentStep === 5 && (
              <Button
                variant="primary"
                onClick={handleComplete}
                iconName="Check"
              >
                Create Course
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWizardModal;