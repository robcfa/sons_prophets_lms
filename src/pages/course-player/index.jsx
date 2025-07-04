import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import CourseSyllabus from './components/CourseSyllabus';
import LessonContent from './components/LessonContent';
import AIVerseAssistant from './components/AIVerseAssistant';
import ProgressTracker from './components/ProgressTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CoursePlayer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [courseData, setCourseData] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [syllabusCollapsed, setSyllabusCollapsed] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get course and lesson IDs from URL params
  const courseId = searchParams.get('course') || 'biblical-hermeneutics';
  const lessonId = searchParams.get('lesson');

  useEffect(() => {
    // Simulate fetching course data
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        
        // Mock course data
        const mockCourseData = {
          id: 'biblical-hermeneutics',
          title: 'Biblical Hermeneutics: Interpreting God\'s Word',
          description: 'A comprehensive study of biblical interpretation principles and methods for understanding Scripture in its proper context.',
          instructor: 'Dr. Sarah Mitchell',
          duration: '8 weeks',
          difficulty: 'Intermediate',
          modules: [
            {
              id: 'intro',
              title: 'Introduction to Hermeneutics',
              description: 'Foundational principles of biblical interpretation',
              lessons: [
                {
                  id: 'intro-1',
                  title: 'What is Biblical Hermeneutics?',
                  type: 'video',
                  duration: '15 min',
                  description: 'An introduction to the science and art of biblical interpretation',
                  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  transcript: `Welcome to Biblical Hermeneutics. In this lesson, we'll explore what hermeneutics means and why it's essential for proper Bible study.\n\nHermeneutics comes from the Greek word 'hermeneuein,' meaning 'to interpret' or 'to explain.' It's both a science and an art - a science because it follows established principles, and an art because it requires wisdom and discernment.\n\nThe goal of hermeneutics is to understand what the biblical authors intended to communicate to their original audiences, and then apply those truths to our lives today.`
                },
                {
                  id: 'intro-2',title: 'Historical Development of Interpretation',type: 'text',duration: '20 min',description: 'Tracing the history of biblical interpretation from ancient times to today',
                  content: `<h2>The Evolution of Biblical Interpretation</h2><p>Throughout church history, different approaches to biblical interpretation have emerged, each reflecting the cultural and theological context of its time.</p><h3>Early Church Period</h3><p>The early church fathers developed foundational principles that continue to influence interpretation today...</p>`
                },
                {
                  id: 'intro-3',title: 'Knowledge Check: Hermeneutics Basics',type: 'quiz',duration: '10 min',description: 'Test your understanding of basic hermeneutical concepts',
                  questions: [
                    {
                      id: 'q1',type: 'multiple-choice',question: 'What does the term "hermeneutics" mean?',
                      options: [
                        'The study of ancient languages','The science and art of biblical interpretation','The history of the Bible','The translation of biblical texts'
                      ],
                      correctAnswer: 'The science and art of biblical interpretation',explanation: 'Hermeneutics comes from the Greek word meaning "to interpret" and refers to the principles and methods used to understand biblical texts.'
                    },
                    {
                      id: 'q2',type: 'true-false',question: 'The primary goal of hermeneutics is to make the Bible relevant to modern readers.',correctAnswer: 'False',explanation: 'While application is important, the primary goal is to understand what the biblical authors intended to communicate to their original audiences.'
                    },
                    {
                      id: 'q3',type: 'short-answer',question: 'Why is understanding the original context important for biblical interpretation?',correctAnswer: 'context',explanation: 'Understanding the original context helps us grasp what the author intended to communicate and prevents misinterpretation.'
                    }
                  ]
                }
              ]
            },
            {
              id: 'context',title: 'Understanding Context',description: 'The importance of historical, cultural, and literary context',
              lessons: [
                {
                  id: 'context-1',title: 'Historical Context in Biblical Interpretation',type: 'video',duration: '18 min',description: 'Understanding the historical background of biblical texts',videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                  transcript: `Historical context is crucial for proper biblical interpretation. When we understand the historical circumstances surrounding a biblical text, we can better grasp its meaning and significance.\n\nConsider the book of Jeremiah. Without understanding the political turmoil of Judah's final years, the Babylonian threat, and the religious apostasy of the people, we cannot fully appreciate Jeremiah's prophetic messages.\n\nHistorical context includes understanding the political situation, social customs, economic conditions, and religious practices of the time.`
                },
                {
                  id: 'context-2',title: 'Cultural and Literary Context',type: 'text',duration: '25 min',description: 'Exploring cultural backgrounds and literary forms in Scripture',
                  content: `<h2>The Importance of Cultural Context</h2><p>The Bible was written in ancient Near Eastern cultures that differ significantly from our modern Western context. Understanding these cultural differences is essential for proper interpretation.</p><h3>Literary Context</h3><p>Every biblical passage exists within a larger literary context. We must consider the genre, structure, and flow of thought within the book...</p>`
                },
                {
                  id: 'context-3',title: 'Contextual Analysis Exercise',type: 'quiz',duration: '15 min',description: 'Practice identifying and analyzing different types of context',
                  questions: [
                    {
                      id: 'q4',type: 'multiple-choice',question: 'Which type of context refers to the circumstances surrounding when a text was written?',
                      options: [
                        'Literary context','Historical context','Cultural context','Theological context'
                      ],
                      correctAnswer: 'Historical context',explanation: 'Historical context refers to the specific time period, events, and circumstances when the biblical text was written.'
                    },
                    {
                      id: 'q5',type: 'true-false',question: 'Cultural context is less important than historical context for biblical interpretation.',correctAnswer: 'False',explanation: 'Both cultural and historical contexts are equally important for understanding the original meaning of biblical texts.'
                    }
                  ]
                }
              ]
            },
            {
              id: 'genres',title: 'Biblical Genres and Literary Forms',description: 'Understanding different types of biblical literature',
              lessons: [
                {
                  id: 'genres-1',title: 'Narrative Literature in the Bible',type: 'video',duration: '22 min',description: 'Interpreting biblical narratives and historical accounts',videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
                },
                {
                  id: 'genres-2',title: 'Poetry and Wisdom Literature',type: 'text',duration: '30 min',description: 'Understanding Hebrew poetry, Psalms, and wisdom books'
                },
                {
                  id: 'genres-3',title: 'Prophetic and Apocalyptic Literature',type: 'video',duration: '25 min',description: 'Interpreting prophetic messages and apocalyptic visions'
                }
              ]
            }
          ]
        };

        setCourseData(mockCourseData);
        
        // Set initial lesson if specified in URL, otherwise use first lesson
        if (lessonId) {
          const lesson = findLessonById(mockCourseData, lessonId);
          if (lesson) {
            setCurrentLesson(lesson);
          } else {
            // Lesson not found, redirect to first lesson
            const firstLesson = mockCourseData.modules[0]?.lessons[0];
            if (firstLesson) {
              setCurrentLesson(firstLesson);
              setSearchParams({ course: courseId, lesson: firstLesson.id });
            }
          }
        } else {
          // No lesson specified, use first lesson
          const firstLesson = mockCourseData.modules[0]?.lessons[0];
          if (firstLesson) {
            setCurrentLesson(firstLesson);
            setSearchParams({ course: courseId, lesson: firstLesson.id });
          }
        }

        // Simulate completed lessons
        setCompletedLessons(new Set(['intro-1', 'intro-2', 'context-1']));
        
      } catch (err) {
        setError('Failed to load course data. Please try again.');
        console.error('Error loading course:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, lessonId, setSearchParams]);

  const findLessonById = (courseData, lessonId) => {
    for (const module of courseData.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  };

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setSearchParams({ course: courseId, lesson: lesson.id });
  };

  const handleLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
    
    // Auto-advance to next lesson after completion
    setTimeout(() => {
      handleNextLesson();
    }, 1500);
  };

  const handleNextLesson = () => {
    if (!courseData?.modules || !currentLesson) return;
    
    for (let moduleIndex = 0; moduleIndex < courseData.modules.length; moduleIndex++) {
      const module = courseData.modules[moduleIndex];
      const lessonIndex = module.lessons.findIndex(lesson => lesson.id === currentLesson.id);
      
      if (lessonIndex !== -1) {
        // Check if there's a next lesson in current module
        if (lessonIndex < module.lessons.length - 1) {
          const nextLesson = module.lessons[lessonIndex + 1];
          handleLessonSelect(nextLesson);
          return;
        }
        // Check if there's a next module
        if (moduleIndex < courseData.modules.length - 1) {
          const nextLesson = courseData.modules[moduleIndex + 1].lessons[0];
          handleLessonSelect(nextLesson);
          return;
        }
      }
    }
    
    // No more lessons - course complete
    console.log('Course completed!');
  };

  const handlePrevLesson = () => {
    if (!courseData?.modules || !currentLesson) return;
    
    for (let moduleIndex = 0; moduleIndex < courseData.modules.length; moduleIndex++) {
      const module = courseData.modules[moduleIndex];
      const lessonIndex = module.lessons.findIndex(lesson => lesson.id === currentLesson.id);
      
      if (lessonIndex !== -1) {
        // Check if there's a previous lesson in current module
        if (lessonIndex > 0) {
          const prevLesson = module.lessons[lessonIndex - 1];
          handleLessonSelect(prevLesson);
          return;
        }
        // Check if there's a previous module
        if (moduleIndex > 0) {
          const prevModule = courseData.modules[moduleIndex - 1];
          const prevLesson = prevModule.lessons[prevModule.lessons.length - 1];
          handleLessonSelect(prevLesson);
          return;
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <BreadcrumbTrail />
        
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <h2 className="font-heading font-heading-semibold text-text-primary text-xl mb-2">
              Loading Course
            </h2>
            <p className="text-text-secondary font-body">
              Preparing your learning experience...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <BreadcrumbTrail />
        
        <div className="flex items-center justify-center h-96">
          <div className="text-center max-w-md">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
            <h2 className="font-heading font-heading-semibold text-text-primary text-xl mb-2">
              Unable to Load Course
            </h2>
            <p className="text-text-secondary font-body mb-6">
              {error}
            </p>
            <div className="space-x-4">
              <Button
                variant="primary"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/course-catalog')}
              >
                Back to Catalog
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <GlobalHeader />
      <PrimaryNavigation />
      <BreadcrumbTrail />
      
      <div className="flex h-[calc(100vh-140px)]">
        {/* Course Syllabus Sidebar */}
        <div className={`transition-all duration-300 ${
          syllabusCollapsed ? 'w-12' : 'w-80'
        } flex-shrink-0 hidden md:block`}>
          <CourseSyllabus
            courseData={courseData}
            currentLessonId={currentLesson?.id}
            onLessonSelect={handleLessonSelect}
            isCollapsed={syllabusCollapsed}
            onToggleCollapse={() => setSyllabusCollapsed(!syllabusCollapsed)}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex">
            {/* Lesson Content */}
            <div className="flex-1 min-w-0">
              <LessonContent
                lesson={currentLesson}
                onLessonComplete={handleLessonComplete}
                onNextLesson={handleNextLesson}
                onPrevLesson={handlePrevLesson}
              />
            </div>

            {/* Progress Tracker Sidebar */}
            <div className="w-80 flex-shrink-0 p-4 hidden lg:block">
              <ProgressTracker
                courseData={courseData}
                currentLessonId={currentLesson?.id}
                completedLessons={completedLessons}
                onLessonSelect={handleLessonSelect}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Syllabus Toggle */}
      <div className="md:hidden fixed bottom-20 left-4 z-1000">
        <Button
          variant="primary"
          onClick={() => setSyllabusCollapsed(!syllabusCollapsed)}
          className="rounded-full w-12 h-12 shadow-soft-lg"
        >
          <Icon name="List" size={20} />
        </Button>
      </div>

      {/* Mobile Syllabus Overlay */}
      {!syllabusCollapsed && (
        <div className="md:hidden fixed inset-0 z-1100 bg-black bg-opacity-50">
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[90vw]">
            <CourseSyllabus
              courseData={courseData}
              currentLessonId={currentLesson?.id}
              onLessonSelect={(lesson) => {
                handleLessonSelect(lesson);
                setSyllabusCollapsed(true);
              }}
              isCollapsed={false}
              onToggleCollapse={() => setSyllabusCollapsed(true)}
            />
          </div>
        </div>
      )}

      {/* AI Verse Assistant */}
      <AIVerseAssistant
        isOpen={aiAssistantOpen}
        onToggle={() => setAiAssistantOpen(!aiAssistantOpen)}
        currentLesson={currentLesson}
      />
    </div>
  );
};

export default CoursePlayer;