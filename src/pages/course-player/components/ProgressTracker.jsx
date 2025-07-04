import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressTracker = ({ courseData, currentLessonId, completedLessons, onLessonSelect }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);

  useEffect(() => {
    // Track session time
    setSessionStart(Date.now());
    
    const interval = setInterval(() => {
      if (sessionStart) {
        setTimeSpent(Math.floor((Date.now() - sessionStart) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionStart]);

  const calculateOverallProgress = () => {
    if (!courseData?.modules) return 0;
    
    const totalLessons = courseData.modules.reduce((total, module) => 
      total + module.lessons.length, 0
    );
    
    return totalLessons > 0 ? Math.round((completedLessons.size / totalLessons) * 100) : 0;
  };

  const calculateModuleProgress = (module) => {
    const totalLessons = module.lessons.length;
    const completedCount = module.lessons.filter(lesson => 
      completedLessons.has(lesson.id)
    ).length;
    return Math.round((completedCount / totalLessons) * 100);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getNextLesson = () => {
    if (!courseData?.modules || !currentLessonId) return null;
    
    for (let moduleIndex = 0; moduleIndex < courseData.modules.length; moduleIndex++) {
      const module = courseData.modules[moduleIndex];
      const lessonIndex = module.lessons.findIndex(lesson => lesson.id === currentLessonId);
      
      if (lessonIndex !== -1) {
        // Check if there's a next lesson in current module
        if (lessonIndex < module.lessons.length - 1) {
          return module.lessons[lessonIndex + 1];
        }
        // Check if there's a next module
        if (moduleIndex < courseData.modules.length - 1) {
          return courseData.modules[moduleIndex + 1].lessons[0];
        }
      }
    }
    return null;
  };

  const getEstimatedTimeRemaining = () => {
    if (!courseData?.modules) return 0;
    
    let totalMinutes = 0;
    courseData.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        if (!completedLessons.has(lesson.id)) {
          // Extract minutes from duration string (e.g., "15 min", "1h 30m")
          const duration = lesson.duration || '10 min';
          const minutes = duration.includes('h') 
            ? parseInt(duration.split('h')[0]) * 60 + (parseInt(duration.split('h')[1]?.replace('m', '')) || 0)
            : parseInt(duration.replace('min', '').replace('m', '')) || 10;
          totalMinutes += minutes;
        }
      });
    });
    
    return totalMinutes;
  };

  const overallProgress = calculateOverallProgress();
  const nextLesson = getNextLesson();
  const estimatedTimeRemaining = getEstimatedTimeRemaining();

  return (
    <div className="bg-background border border-subtle rounded-lg shadow-soft-sm">
      {/* Header */}
      <div className="p-4 border-b border-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={20} className="text-primary" />
            <h3 className="font-heading font-heading-semibold text-text-primary">
              Progress Tracker
            </h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="p-1"
          >
            <Icon name={showDetails ? "ChevronUp" : "ChevronDown"} size={16} />
          </Button>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body font-body-semibold text-text-primary">
            Course Progress
          </span>
          <span className="text-sm font-data text-primary">
            {overallProgress}%
          </span>
        </div>
        <div className="w-full bg-surface rounded-full h-3 mb-4">
          <div 
            className="bg-primary h-3 rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${overallProgress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-20 animate-pulse-gentle"></div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-lg font-data text-primary">
              {completedLessons.size}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Completed
            </div>
          </div>
          <div className="text-center p-3 bg-surface rounded-lg">
            <div className="text-lg font-data text-accent">
              {courseData?.modules?.reduce((total, module) => total + module.lessons.length, 0) - completedLessons.size || 0}
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Remaining
            </div>
          </div>
        </div>

        {/* Session Info */}
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span className="font-caption">Session time: {formatTime(timeSpent)}</span>
          <span className="font-caption">
            Est. remaining: {Math.floor(estimatedTimeRemaining / 60)}h {estimatedTimeRemaining % 60}m
          </span>
        </div>
      </div>

      {/* Detailed Progress */}
      {showDetails && (
        <div className="border-t border-subtle">
          {/* Module Progress */}
          <div className="p-4">
            <h4 className="font-body font-body-semibold text-text-primary mb-3">
              Module Progress
            </h4>
            <div className="space-y-3">
              {courseData?.modules?.map((module, index) => {
                const moduleProgress = calculateModuleProgress(module);
                const isCurrentModule = module.lessons.some(lesson => lesson.id === currentLessonId);
                
                return (
                  <div 
                    key={index}
                    className={`p-3 rounded-lg border transition-color ${
                      isCurrentModule 
                        ? 'border-primary bg-primary-50' :'border-subtle bg-surface'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-body text-text-primary">
                        {module.title}
                      </span>
                      <span className="text-sm font-data text-primary">
                        {moduleProgress}%
                      </span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${moduleProgress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-text-muted">
                      <span>
                        {module.lessons.filter(lesson => completedLessons.has(lesson.id)).length} / {module.lessons.length} lessons
                      </span>
                      {isCurrentModule && (
                        <span className="text-primary font-caption">Current</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next Lesson */}
          {nextLesson && (
            <div className="p-4 border-t border-subtle bg-accent-50">
              <h4 className="font-body font-body-semibold text-text-primary mb-2">
                Up Next
              </h4>
              <button
                onClick={() => onLessonSelect(nextLesson)}
                className="w-full flex items-center space-x-3 p-3 bg-background hover:bg-accent-100 rounded-lg transition-color text-left group"
              >
                <Icon 
                  name={nextLesson.type === 'video' ? 'Play' : nextLesson.type === 'quiz' ? 'HelpCircle' : 'FileText'} 
                  size={16} 
                  className="text-accent group-hover:text-accent-600" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-text-primary truncate">
                    {nextLesson.title}
                  </p>
                  <p className="text-xs text-text-secondary font-caption">
                    {nextLesson.type} • {nextLesson.duration}
                  </p>
                </div>
                <Icon name="ArrowRight" size={16} className="text-accent group-hover:text-accent-600" />
              </button>
            </div>
          )}

          {/* Achievement Preview */}
          <div className="p-4 border-t border-subtle">
            <h4 className="font-body font-body-semibold text-text-primary mb-2">
              Achievement Progress
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-surface rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-warning" />
                  <span className="text-sm font-body text-text-primary">
                    Course Completion
                  </span>
                </div>
                <span className="text-sm font-data text-warning">
                  {overallProgress}%
                </span>
              </div>
              
              <div className="flex items-center justify-between p-2 bg-surface rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="Target" size={16} className="text-success" />
                  <span className="text-sm font-body text-text-primary">
                    Consistent Learner
                  </span>
                </div>
                <span className="text-sm font-data text-success">
                  {Math.min(Math.floor(timeSpent / 300), 7)}/7 days
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressTracker;