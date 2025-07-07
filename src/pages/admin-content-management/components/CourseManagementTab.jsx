import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { safeArray, safeProp, safeFilter } from '../../../utils/safeObjectUtils';

const CourseManagementTab = ({ onAIWizardOpen }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    // Mock course data with safe defaults
    const mockCourses = [
      {
        id: 'course-1',
        title: 'Introduction to Old Testament Prophecy',
        description: 'Foundational course covering the major and minor prophets of the Old Testament.',
        status: 'published',
        modules: 12,
        lessons: 48,
        enrollments: 156,
        lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        author: 'Dr. Sarah Mitchell',
        category: 'Prophecy',
        difficulty: 'Beginner',
        estimatedHours: 24,
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop'
      },
      {
        id: 'course-2',
        title: 'The Book of Isaiah: Messianic Prophecies',
        description: 'Deep dive into Isaiah\'s prophetic writings and their messianic implications.',
        status: 'draft',
        modules: 8,
        lessons: 32,
        enrollments: 0,
        lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        author: 'Rev. Michael Thompson',
        category: 'Prophecy',
        difficulty: 'Intermediate',
        estimatedHours: 18,
        thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop'
      },
      {
        id: 'course-3',
        title: 'Ezekiel and Daniel: Apocalyptic Literature',
        description: 'Understanding the symbolic and prophetic language of Ezekiel and Daniel.',
        status: 'published',
        modules: 10,
        lessons: 40,
        enrollments: 89,
        lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        author: 'Dr. Rachel Cohen',
        category: 'Prophecy',
        difficulty: 'Advanced',
        estimatedHours: 30,
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop'
      },
      {
        id: 'course-4',
        title: 'The Twelve Minor Prophets',
        description: 'Comprehensive study of the twelve minor prophets and their historical context.',
        status: 'archived',
        modules: 15,
        lessons: 60,
        enrollments: 234,
        lastModified: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        author: 'Prof. David Williams',
        category: 'Prophecy',
        difficulty: 'Intermediate',
        estimatedHours: 36,
        thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop'
      }
    ];
    setCourses(mockCourses);
  }, []);

  const handleDragEnd = (result) => {
    if (!result?.destination) return;

    const items = Array.from(safeArray(courses));
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCourses(items);
  };

  const handleCourseSelect = (courseId) => {
    if (!courseId) return;
    
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on courses:`, selectedCourses);
    setSelectedCourses([]);
    setShowBulkActions(false);
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-text-muted text-white';
    
    const colors = {
      published: 'bg-success-100 text-success-700',
      draft: 'bg-warning-100 text-warning-700',
      archived: 'bg-text-muted text-white'
    };
    return colors[status] || 'bg-text-muted text-white';
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'bg-text-muted text-white';
    
    const colors = {
      Beginner: 'bg-accent-100 text-accent-700',
      Intermediate: 'bg-primary-100 text-primary-700',
      Advanced: 'bg-secondary-100 text-secondary-700'
    };
    return colors[difficulty] || 'bg-text-muted text-white';
  };

  const filteredCourses = safeFilter(courses, course => {
    const title = safeProp(course, 'title', '').toLowerCase();
    const description = safeProp(course, 'description', '').toLowerCase();
    const status = safeProp(course, 'status', '');
    
    const matchesSearch = title.includes(searchTerm.toLowerCase()) ||
                         description.includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="primary"
            iconName="Sparkles"
            onClick={onAIWizardOpen}
          >
            AI Course Creator
          </Button>
          <Button variant="secondary" iconName="Plus">
            New Course
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCourses.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-body text-primary-700">
              {selectedCourses.length} course{selectedCourses.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('publish')}>
                Publish
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('archive')}>
                Archive
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('delete')}>
                Delete
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedCourses([])}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Course List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="courses">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {safeArray(filteredCourses).map((course, index) => {
                const courseId = safeProp(course, 'id');
                const courseTitle = safeProp(course, 'title', 'Untitled Course');
                const courseDescription = safeProp(course, 'description', 'No description');
                const status = safeProp(course, 'status', 'unknown');
                const difficulty = safeProp(course, 'difficulty', 'Unknown');
                const author = safeProp(course, 'author', 'Unknown Author');
                const lastModified = safeProp(course, 'lastModified');
                const modules = safeProp(course, 'modules', 0);
                const lessons = safeProp(course, 'lessons', 0);
                const enrollments = safeProp(course, 'enrollments', 0);
                const estimatedHours = safeProp(course, 'estimatedHours', 0);
                const thumbnail = safeProp(course, 'thumbnail', '/assets/images/no_image.png');

                return (
                  <Draggable key={courseId || index} draggableId={courseId || `course-${index}`} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`bg-card border border-subtle rounded-lg p-6 hover:shadow-soft-md transition-all ${
                          snapshot.isDragging ? 'shadow-soft-lg' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {/* Drag Handle */}
                          <div
                            {...provided.dragHandleProps}
                            className="mt-2 text-text-muted hover:text-text-primary cursor-grab"
                          >
                            <Icon name="GripVertical" size={20} />
                          </div>

                          {/* Course Thumbnail */}
                          <div className="w-20 h-20 bg-surface rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={thumbnail}
                              alt={courseTitle}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/assets/images/no_image.png';
                              }}
                            />
                          </div>

                          {/* Course Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-heading font-heading-semibold text-text-primary text-lg mb-1">
                                  {courseTitle}
                                </h3>
                                <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                                  {courseDescription}
                                </p>
                              </div>
                              
                              <div className="flex items-center gap-2 ml-4">
                                <input
                                  type="checkbox"
                                  checked={selectedCourses.includes(courseId)}
                                  onChange={() => handleCourseSelect(courseId)}
                                  className="w-4 h-4 text-primary border-subtle rounded focus:ring-primary"
                                />
                              </div>
                            </div>

                            {/* Course Meta */}
                            <div className="flex flex-wrap items-center gap-4 mb-3">
                              <span className={`px-2 py-1 text-xs font-caption rounded-full ${getStatusColor(status)}`}>
                                {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'}
                              </span>
                              <span className={`px-2 py-1 text-xs font-caption rounded-full ${getDifficultyColor(difficulty)}`}>
                                {difficulty}
                              </span>
                              <span className="text-xs text-text-secondary">
                                By {author}
                              </span>
                              <span className="text-xs text-text-secondary">
                                Modified {lastModified ? lastModified.toLocaleDateString() : 'Unknown'}
                              </span>
                            </div>

                            {/* Course Stats */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
                              <div className="flex items-center gap-1">
                                <Icon name="BookOpen" size={16} />
                                <span>{modules} modules</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Play" size={16} />
                                <span>{lessons} lessons</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Users" size={16} />
                                <span>{enrollments} enrolled</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Clock" size={16} />
                                <span>{estimatedHours}h estimated</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCourse(course)}
                            >
                              <Icon name="Edit" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="Eye" size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {safeArray(filteredCourses).length === 0 && (
        <div className="text-center py-12">
          <Icon name="BookOpen" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="font-heading font-heading-semibold text-text-primary mb-2">
            No courses found
          </h3>
          <p className="text-text-secondary mb-4">
            {searchTerm || filterStatus !== 'all' ?'Try adjusting your search or filter criteria.' :'Get started by creating your first course.'
            }
          </p>
          <Button variant="primary" iconName="Plus" onClick={onAIWizardOpen}>
            Create Course with AI
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseManagementTab;