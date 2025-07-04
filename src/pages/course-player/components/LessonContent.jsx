import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LessonContent = ({ lesson, onLessonComplete, onNextLesson, onPrevLesson }) => {
  const [videoProgress, setVideoProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    // Reset states when lesson changes
    setQuizAnswers({});
    setQuizSubmitted(false);
    setVideoProgress(0);
  }, [lesson?.id]);

  const handleVideoProgress = (e) => {
    const video = e.target;
    const progress = (video.currentTime / video.duration) * 100;
    setVideoProgress(progress);
  };

  const handleVideoEnd = () => {
    onLessonComplete(lesson.id);
  };

  const handlePlaybackSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleBookmark = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const newBookmark = {
        id: Date.now(),
        time: currentTime,
        title: `Bookmark at ${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}`,
        lessonId: lesson.id
      };
      setBookmarks(prev => [...prev, newBookmark]);
    }
  };

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    // Calculate score and provide feedback
    const correctAnswers = lesson.questions?.filter(q => 
      quizAnswers[q.id] === q.correctAnswer
    ).length || 0;
    const totalQuestions = lesson.questions?.length || 0;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    
    if (score >= 70) {
      onLessonComplete(lesson.id);
    }
  };

  const renderVideoLesson = () => (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden shadow-soft-lg">
        <video
          ref={videoRef}
          className="w-full aspect-video"
          controls
          onTimeUpdate={handleVideoProgress}
          onEnded={handleVideoEnd}
          src={lesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
        >
          Your browser does not support the video tag.
        </video>
        
        {/* Video Controls Overlay */}
        <div className="absolute bottom-4 right-4 flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className="bg-black bg-opacity-50 text-white hover:bg-opacity-70"
          >
            <Icon name="Bookmark" size={16} />
          </Button>
          
          <div className="relative">
            <select
              value={playbackSpeed}
              onChange={(e) => handlePlaybackSpeedChange(parseFloat(e.target.value))}
              className="bg-black bg-opacity-50 text-white text-sm rounded px-2 py-1 border-none outline-none"
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
      </div>

      {/* Video Progress */}
      <div className="bg-surface rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-body font-body-semibold text-text-primary">
            Video Progress
          </span>
          <span className="text-sm font-data text-primary">
            {Math.round(videoProgress)}%
          </span>
        </div>
        <div className="w-full bg-background rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${videoProgress}%` }}
          />
        </div>
      </div>

      {/* Bookmarks */}
      {bookmarks.length > 0 && (
        <div className="bg-surface rounded-lg p-4">
          <h3 className="font-heading font-heading-semibold text-text-primary mb-3">
            Bookmarks
          </h3>
          <div className="space-y-2">
            {bookmarks.map((bookmark) => (
              <button
                key={bookmark.id}
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = bookmark.time;
                  }
                }}
                className="flex items-center space-x-3 p-2 bg-background hover:bg-primary-50 rounded-lg transition-color w-full text-left"
              >
                <Icon name="Bookmark" size={16} className="text-accent" />
                <span className="text-sm font-body text-text-primary">
                  {bookmark.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Transcript Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setShowTranscript(!showTranscript)}
          className="flex items-center space-x-2"
        >
          <Icon name="FileText" size={16} />
          <span>{showTranscript ? 'Hide' : 'Show'} Transcript</span>
        </Button>
      </div>

      {/* Transcript */}
      {showTranscript && (
        <div className="bg-surface rounded-lg p-4">
          <h3 className="font-heading font-heading-semibold text-text-primary mb-3">
            Transcript
          </h3>
          <div className="prose prose-sm max-w-none">
            <p className="text-text-secondary font-body leading-relaxed">
              {lesson.transcript || `Welcome to this lesson on ${lesson.title}. In this comprehensive study, we will explore the historical context, theological significance, and practical applications of the prophetic messages found in the Old Testament.\n\nThe prophets served as God's messengers to His people, calling them to repentance, warning of judgment, and offering hope for restoration. Understanding their messages requires careful attention to the historical circumstances in which they ministered.\n\nAs we progress through this lesson, we'll examine specific passages, their original context, and their relevance for believers today. Take notes and feel free to pause the video to reflect on the material presented.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderTextLesson = () => (
    <div className="space-y-6">
      {/* Font Size Controls */}
      <div className="flex items-center justify-between bg-surface rounded-lg p-4">
        <span className="text-sm font-body font-body-semibold text-text-primary">
          Text Size
        </span>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            disabled={fontSize <= 12}
          >
            <Icon name="Minus" size={16} />
          </Button>
          <span className="text-sm font-data text-text-primary w-8 text-center">
            {fontSize}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            disabled={fontSize >= 24}
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
      </div>

      {/* Text Content */}
      <div className="bg-background rounded-lg p-6 shadow-soft-sm">
        <div 
          className="prose prose-lg max-w-none"
          style={{ fontSize: `${fontSize}px` }}
        >
          <h1 className="font-heading text-text-primary mb-6">
            {lesson.title}
          </h1>
          
          <div className="text-text-primary leading-relaxed space-y-4">
            {lesson.content ? (
              <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            ) : (
              <>
                <p>
                  The prophetic literature of the Old Testament represents one of the most significant and challenging portions of Scripture. These books contain messages from God delivered through His chosen servants to the people of Israel and Judah during critical periods of their history.
                </p>
                
                <h2 className="font-heading text-text-primary mt-8 mb-4">
                  Understanding Prophetic Context
                </h2>
                
                <p>
                  To properly interpret prophetic literature, we must understand the historical, cultural, and theological context in which these messages were delivered. The prophets spoke to specific situations, addressing immediate concerns while also pointing toward future fulfillment.
                </p>
                
                <blockquote className="border-l-4 border-primary pl-4 italic text-text-secondary bg-primary-50 p-4 rounded-r-lg">
                  "Surely the Sovereign Lord does nothing without revealing his plan to his servants the prophets." - Amos 3:7
                </blockquote>
                
                <h2 className="font-heading text-text-primary mt-8 mb-4">
                  Key Themes in Prophetic Literature
                </h2>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Covenant Faithfulness:</strong> Calling God's people back to their covenant obligations</li>
                  <li><strong>Social Justice:</strong> Condemning oppression and advocating for the marginalized</li>
                  <li><strong>Divine Judgment:</strong> Warning of consequences for disobedience</li>
                  <li><strong>Hope and Restoration:</strong> Promising future blessing and redemption</li>
                  <li><strong>Messianic Expectation:</strong> Pointing toward the coming Messiah</li>
                </ul>
                
                <h2 className="font-heading text-text-primary mt-8 mb-4">
                  Practical Application
                </h2>
                
                <p>
                  While the prophetic messages were delivered to ancient audiences, they contain timeless principles that apply to believers today. We must learn to distinguish between specific historical fulfillments and ongoing spiritual principles.
                </p>
                
                <p>
                  As you study these texts, ask yourself: What does this passage teach about God's character? How does it challenge my understanding of faithfulness? What hope does it offer for difficult circumstances?
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Completion Button */}
      <div className="flex justify-center">
        <Button
          variant="primary"
          onClick={() => onLessonComplete(lesson.id)}
          className="px-8"
        >
          Mark as Complete
        </Button>
      </div>
    </div>
  );

  const renderQuizLesson = () => (
    <div className="space-y-6">
      <div className="bg-surface rounded-lg p-6">
        <h2 className="font-heading font-heading-semibold text-text-primary text-xl mb-2">
          {lesson.title}
        </h2>
        <p className="text-text-secondary font-body mb-6">
          Test your understanding of the lesson material. You need 70% or higher to pass.
        </p>

        {lesson.questions?.map((question, index) => (
          <div key={question.id} className="mb-8 p-4 bg-background rounded-lg">
            <h3 className="font-body font-body-semibold text-text-primary mb-4">
              {index + 1}. {question.question}
            </h3>

            {question.type === 'multiple-choice' && (
              <div className="space-y-2">
                {question.options?.map((option, optionIndex) => (
                  <label
                    key={optionIndex}
                    className="flex items-center space-x-3 p-3 bg-surface hover:bg-primary-50 rounded-lg cursor-pointer transition-color"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={quizAnswers[question.id] === option}
                      onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                      disabled={quizSubmitted}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-text-primary font-body">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'true-false' && (
              <div className="space-y-2">
                {['True', 'False'].map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-3 p-3 bg-surface hover:bg-primary-50 rounded-lg cursor-pointer transition-color"
                  >
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option}
                      checked={quizAnswers[question.id] === option}
                      onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                      disabled={quizSubmitted}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-text-primary font-body">{option}</span>
                  </label>
                ))}
              </div>
            )}

            {question.type === 'short-answer' && (
              <Input
                type="text"
                placeholder="Enter your answer..."
                value={quizAnswers[question.id] || ''}
                onChange={(e) => handleQuizAnswer(question.id, e.target.value)}
                disabled={quizSubmitted}
                className="w-full"
              />
            )}

            {/* Show feedback after submission */}
            {quizSubmitted && (
              <div className={`mt-4 p-3 rounded-lg ${
                quizAnswers[question.id] === question.correctAnswer
                  ? 'bg-success-50 border border-success-200' :'bg-error-50 border border-error-200'
              }`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Icon 
                    name={quizAnswers[question.id] === question.correctAnswer ? "CheckCircle" : "XCircle"} 
                    size={16} 
                    className={quizAnswers[question.id] === question.correctAnswer ? "text-success" : "text-error"} 
                  />
                  <span className={`text-sm font-body font-body-semibold ${
                    quizAnswers[question.id] === question.correctAnswer ? "text-success" : "text-error"
                  }`}>
                    {quizAnswers[question.id] === question.correctAnswer ? "Correct!" : "Incorrect"}
                  </span>
                </div>
                {question.explanation && (
                  <p className="text-sm text-text-secondary font-body">
                    {question.explanation}
                  </p>
                )}
                {quizAnswers[question.id] !== question.correctAnswer && (
                  <p className="text-sm text-text-secondary font-body mt-1">
                    Correct answer: {question.correctAnswer}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Submit Button */}
        {!quizSubmitted && (
          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={handleQuizSubmit}
              disabled={Object.keys(quizAnswers).length < (lesson.questions?.length || 0)}
              className="px-8"
            >
              Submit Quiz
            </Button>
          </div>
        )}

        {/* Results */}
        {quizSubmitted && (
          <div className="bg-primary-50 rounded-lg p-4 text-center">
            <h3 className="font-heading font-heading-semibold text-primary text-lg mb-2">
              Quiz Results
            </h3>
            <p className="text-text-primary font-body mb-4">
              You scored {Math.round(((lesson.questions?.filter(q => quizAnswers[q.id] === q.correctAnswer).length || 0) / (lesson.questions?.length || 1)) * 100)}% 
              ({lesson.questions?.filter(q => quizAnswers[q.id] === q.correctAnswer).length || 0} out of {lesson.questions?.length || 0} correct)
            </p>
            {((lesson.questions?.filter(q => quizAnswers[q.id] === q.correctAnswer).length || 0) / (lesson.questions?.length || 1)) * 100 >= 70 ? (
              <div className="flex items-center justify-center space-x-2 text-success">
                <Icon name="CheckCircle" size={20} />
                <span className="font-body font-body-semibold">Passed! Lesson completed.</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-error">
                <Icon name="XCircle" size={20} />
                <span className="font-body font-body-semibold">You need 70% to pass. Please review and try again.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const renderLessonContent = () => {
    switch (lesson?.type) {
      case 'video':
        return renderVideoLesson();
      case 'text':
        return renderTextLesson();
      case 'quiz':
        return renderQuizLesson();
      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Icon name="AlertCircle" size={48} className="text-text-muted mx-auto mb-4" />
              <p className="text-text-secondary font-body">
                Unknown lesson type: {lesson?.type}
              </p>
            </div>
          </div>
        );
    }
  };

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Icon name="BookOpen" size={48} className="text-text-muted mx-auto mb-4" />
          <p className="text-text-secondary font-body">
            Select a lesson from the syllabus to begin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Lesson Header */}
      <div className="bg-background border-b border-subtle p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name={lesson.type === 'video' ? 'Play' : lesson.type === 'quiz' ? 'HelpCircle' : 'FileText'} size={20} className="text-primary" />
              <span className="text-sm font-caption text-text-secondary capitalize">
                {lesson.type} Lesson
              </span>
              {lesson.duration && (
                <>
                  <span className="text-text-muted">•</span>
                  <span className="text-sm font-caption text-text-secondary">
                    {lesson.duration}
                  </span>
                </>
              )}
            </div>
            <h1 className="font-heading font-heading-semibold text-text-primary text-2xl">
              {lesson.title}
            </h1>
            {lesson.description && (
              <p className="text-text-secondary font-body mt-2">
                {lesson.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {renderLessonContent()}
      </div>

      {/* Navigation Footer */}
      <div className="bg-surface border-t border-subtle p-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={onPrevLesson}
            className="flex items-center space-x-2"
          >
            <Icon name="ChevronLeft" size={16} />
            <span>Previous</span>
          </Button>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Icon name="MessageCircle" size={16} />
              <span>Ask AI Assistant</span>
            </Button>
          </div>
          
          <Button
            variant="primary"
            onClick={onNextLesson}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <Icon name="ChevronRight" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LessonContent;