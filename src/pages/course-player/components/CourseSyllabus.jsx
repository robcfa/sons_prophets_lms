import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseSyllabus = ({ 
  courseData, 
  currentLessonId, 
  onLessonSelect, 
  isCollapsed, 
  onToggleCollapse 
}) => {
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    // Simulate completed lessons from localStorage or API
    const mockCompletedLessons = new Set([
      'intro-1', 'intro-2', 'context-1', 'context-2'
    ]);
    setCompletedLessons(mockCompletedLessons);

    // Auto-expand module containing current lesson
    if (currentLessonId && courseData?.modules) {
      courseData.modules.forEach((module, moduleIndex) => {
        if (module.lessons.some(lesson => lesson.id === currentLessonId)) {
          setExpandedModules(prev => new Set([...prev, moduleIndex]));
        }
      });
    }
  }, [currentLessonId, courseData]);

  const toggleModule = (moduleIndex) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleIndex)) {
        newSet.delete(moduleIndex);
      } else {
        newSet.add(moduleIndex);
      }
      return newSet;
    });
  };

  const calculateModuleProgress = (module) => {
    const totalLessons = module.lessons.length;
    const completedCount = module.lessons.filter(lesson => 
      completedLessons.has(lesson.id)
    ).length;
    return Math.round((completedCount / totalLessons) * 100);
  };

  const getLessonIcon = (lessonType) => {
    switch (lessonType) {
      case 'video':
        return 'Play';
      case 'text':
        return 'FileText';
      case 'quiz':
        return 'HelpCircle';
      default:
        return 'BookOpen';
    }
  };

  if (!courseData) {
    return (
      <div className="h-full bg-surface border-r border-subtle flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="text-text-muted animate-spin mx-auto mb-2" />
          <p className="text-text-secondary font-body">Loading syllabus...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full bg-surface border-r border-subtle transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-full'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-subtle bg-background">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="font-heading font-heading-semibold text-text-primary text-lg truncate">
                {courseData.title}
              </h2>
              <p className="text-sm text-text-secondary font-body mt-1">
                {courseData.modules?.length || 0} modules • {
                  courseData.modules?.reduce((total, module) => total + module.lessons.length, 0) || 0
                } lessons
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="p-2 flex-shrink-0"
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={16} 
            />
          </Button>
        </div>
      </div>

      {/* Collapsed State */}
      {isCollapsed && (
        <div className="p-2 space-y-2">
          {courseData.modules?.map((module, moduleIndex) => (
            <div
              key={moduleIndex}
              className="w-8 h-8 bg-primary-100 rounded flex items-center justify-center cursor-pointer hover:bg-primary-200 transition-color"
              onClick={() => toggleModule(moduleIndex)}
              title={module.title}
            >
              <span className="text-xs font-heading font-heading-semibold text-primary">
                {moduleIndex + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Expanded State */}
      {!isCollapsed && (
        <div className="flex-1 overflow-y-auto">
          {/* Course Progress */}
          <div className="p-4 bg-primary-50 border-b border-subtle">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-body font-body-semibold text-text-primary">
                Course Progress
              </span>
              <span className="text-sm font-data text-primary">
                {Math.round((completedLessons.size / (courseData.modules?.reduce((total, module) => total + module.lessons.length, 0) || 1)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(completedLessons.size / (courseData.modules?.reduce((total, module) => total + module.lessons.length, 0) || 1)) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Modules List */}
          <div className="p-2">
            {courseData.modules?.map((module, moduleIndex) => (
              <div key={moduleIndex} className="mb-2">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(moduleIndex)}
                  className="w-full flex items-center justify-between p-3 bg-background hover:bg-primary-50 rounded-lg transition-color group"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <Icon 
                        name={expandedModules.has(moduleIndex) ? "ChevronDown" : "ChevronRight"} 
                        size={16} 
                        className="text-text-secondary group-hover:text-primary transition-color" 
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h3 className="font-body font-body-semibold text-text-primary text-sm truncate">
                        Module {moduleIndex + 1}: {module.title}
                      </h3>
                      <p className="text-xs text-text-secondary font-body mt-1">
                        {module.lessons.length} lessons • {calculateModuleProgress(module)}% complete
                      </p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-data text-primary">
                        {calculateModuleProgress(module)}%
                      </span>
                    </div>
                  </div>
                </button>

                {/* Module Progress Bar */}
                <div className="mx-3 mt-2 mb-3">
                  <div className="w-full bg-surface rounded-full h-1">
                    <div 
                      className="bg-accent h-1 rounded-full transition-all duration-300"
                      style={{ width: `${calculateModuleProgress(module)}%` }}
                    />
                  </div>
                </div>

                {/* Lessons List */}
                {expandedModules.has(moduleIndex) && (
                  <div className="ml-6 space-y-1">
                    {module.lessons.map((lesson, lessonIndex) => {
                      const isCompleted = completedLessons.has(lesson.id);
                      const isCurrent = lesson.id === currentLessonId;
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onLessonSelect(lesson)}
                          className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-color text-left group ${
                            isCurrent 
                              ? 'bg-primary text-primary-foreground shadow-soft-sm' 
                              : 'hover:bg-primary-50'
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {isCompleted ? (
                              <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center">
                                <Icon name="Check" size={12} className="text-white" />
                              </div>
                            ) : (
                              <Icon 
                                name={getLessonIcon(lesson.type)} 
                                size={16} 
                                className={isCurrent ? 'text-primary-foreground' : 'text-text-secondary group-hover:text-primary'} 
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-body truncate ${
                              isCurrent ? 'text-primary-foreground font-body-semibold' : 'text-text-primary'
                            }`}>
                              {lesson.title}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs font-caption capitalize ${
                                isCurrent ? 'text-primary-foreground opacity-80' : 'text-text-muted'
                              }`}>
                                {lesson.type}
                              </span>
                              {lesson.duration && (
                                <>
                                  <span className={`text-xs ${
                                    isCurrent ? 'text-primary-foreground opacity-60' : 'text-text-muted'
                                  }`}>•</span>
                                  <span className={`text-xs font-caption ${
                                    isCurrent ? 'text-primary-foreground opacity-80' : 'text-text-muted'
                                  }`}>
                                    {lesson.duration}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          {isCurrent && (
                            <div className="flex-shrink-0">
                              <Icon name="Play" size={14} className="text-primary-foreground" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSyllabus;