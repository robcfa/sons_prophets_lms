import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import Button from '../../components/ui/Button';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';

import FilterPanel from './components/FilterPanel';
import FilterChips from './components/FilterChips';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import CourseGrid from './components/CourseGrid';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState({});

  // Mock course data
  const mockCourses = [
    {
      id: 'intro-biblical-prophecy',
      title: 'Introduction to Biblical Prophecy',
      description: 'Explore the foundational principles of biblical prophecy and learn to understand prophetic literature in its historical and theological context.',
      instructor: 'Dr. Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop',
      difficulty: 'Beginner',
      duration: 180, // minutes
      rating: 4.8,
      enrollmentCount: 1247,
      lessonCount: 12,
      topics: ['prophecy', 'interpretation'],
      createdAt: new Date('2024-01-15')
    },
    {
      id: 'major-prophets-overview',
      title: 'Major Prophets: Isaiah, Jeremiah, Ezekiel',
      description: 'Deep dive into the major prophetic books of the Old Testament, examining their historical context, literary structure, and theological themes.',
      instructor: 'Prof. Michael Chen',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop',
      difficulty: 'Intermediate',
      duration: 480, // minutes
      rating: 4.9,
      enrollmentCount: 892,
      lessonCount: 24,
      topics: ['major-prophets', 'historical'],
      createdAt: new Date('2024-02-01')
    },
    {
      id: 'minor-prophets-study',
      title: 'Minor Prophets: Voices of Warning and Hope',
      description: 'Study the twelve minor prophets and their powerful messages of judgment, restoration, and hope for God\'s people.',
      instructor: 'Dr. David Williams',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=225&fit=crop',
      difficulty: 'Intermediate',
      duration: 360, // minutes
      rating: 4.7,
      enrollmentCount: 634,
      lessonCount: 18,
      topics: ['minor-prophets', 'interpretation'],
      createdAt: new Date('2024-01-20')
    },
    {
      id: 'messianic-prophecy',
      title: 'Messianic Prophecy in the Old Testament',
      description: 'Examine the prophetic passages that point to the coming Messiah and their fulfillment in the New Testament.',
      instructor: 'Rev. Mary Thompson',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=225&fit=crop',
      difficulty: 'Advanced',
      duration: 300, // minutes
      rating: 4.9,
      enrollmentCount: 456,
      lessonCount: 15,
      topics: ['messianic', 'prophecy'],
      createdAt: new Date('2024-03-01')
    },
    {
      id: 'prophetic-interpretation',
      title: 'Principles of Prophetic Interpretation',
      description: 'Learn the hermeneutical principles essential for understanding and interpreting prophetic literature correctly.',
      instructor: 'Dr. Sarah Johnson',
      thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=225&fit=crop',
      difficulty: 'Advanced',
      duration: 240, // minutes
      rating: 4.6,
      enrollmentCount: 378,
      lessonCount: 10,
      topics: ['interpretation', 'prophecy'],
      createdAt: new Date('2024-02-15')
    },
    {
      id: 'daniel-revelation',
      title: 'Apocalyptic Literature: Daniel and Revelation',
      description: 'Explore the apocalyptic visions of Daniel and their connection to the book of Revelation in the New Testament.',
      instructor: 'Prof. Michael Chen',
      thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=225&fit=crop',
      difficulty: 'Advanced',
      duration: 420, // minutes
      rating: 4.8,
      enrollmentCount: 523,
      lessonCount: 21,
      topics: ['prophecy', 'interpretation'],
      createdAt: new Date('2024-01-10')
    }
  ];

  // Mock enrolled courses and progress
  const mockEnrolledCourses = ['intro-biblical-prophecy', 'major-prophets-overview'];
  const mockCourseProgress = {
    'intro-biblical-prophecy': 75,
    'major-prophets-overview': 45
  };

  // Mock course statistics for filters
  const courseStats = {
    topics: {
      prophecy: 4,
      majorProphets: 1,
      minorProphets: 1,
      messianic: 1,
      historical: 1,
      interpretation: 4
    },
    difficulty: {
      beginner: 1,
      intermediate: 2,
      advanced: 3
    },
    instructors: {
      drSarahJohnson: 2,
      profMichaelChen: 2,
      drDavidWilliams: 1,
      revMaryThompson: 1
    },
    duration: {
      short: 1,
      medium: 3,
      long: 2
    }
  };

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setEnrolledCourses(mockEnrolledCourses);
      setCourseProgress(mockCourseProgress);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters and search
    let filtered = [...courses];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply category filters
    Object.entries(activeFilters).forEach(([category, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        filtered = filtered.filter(course => {
          switch (category) {
            case 'topic':
              return values.some(value => course.topics.includes(value));
            case 'difficulty':
              return values.includes(course.difficulty.toLowerCase());
            case 'instructor':
              const instructorKey = course.instructor.toLowerCase().replace(/[^a-z]/g, '');
              return values.some(value => value.replace(/[^a-z]/g, '') === instructorKey);
            case 'duration':
              if (values.includes('short')) return course.duration < 120;
              if (values.includes('medium')) return course.duration >= 120 && course.duration <= 480;
              if (values.includes('long')) return course.duration > 480;
              return true;
            default:
              return true;
          }
        });
      }
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return b.enrollmentCount - a.enrollmentCount;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'duration-short':
          return a.duration - b.duration;
        case 'duration-long':
          return b.duration - a.duration;
        default: // relevance
          return 0;
      }
    });

    setFilteredCourses(filtered);
  }, [courses, searchTerm, activeFilters, sortBy]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFiltersChange = (newFilters) => {
    setActiveFilters(newFilters);
  };

  const handleRemoveFilter = (category, value) => {
    const newFilters = { ...activeFilters };
    if (newFilters[category]) {
      newFilters[category] = newFilters[category].filter(v => v !== value);
      if (newFilters[category].length === 0) {
        delete newFilters[category];
      }
    }
    setActiveFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setActiveFilters({});
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((total, filterArray) => {
      return total + (Array.isArray(filterArray) ? filterArray.length : 0);
    }, 0);
  };

  return (
    <>
      <Helmet>
        <title>Course Catalog - Sons Prophets LMS</title>
        <meta name="description" content="Discover and enroll in Old Testament prophecy courses. Browse our comprehensive catalog of theological education courses with expert instructors." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <BreadcrumbTrail />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-heading font-heading-bold text-text-primary mb-2">
                  Course Catalog
                </h1>
                <p className="text-text-secondary font-body">
                  Discover comprehensive Old Testament prophecy courses designed to deepen your understanding of biblical prophecy.
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm font-body text-text-secondary">
                  {filteredCourses.length} of {courses.length} courses
                </span>
              </div>
            </div>
          </div>

          {/* Search and Controls */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <SearchBar onSearch={handleSearch} />
              </div>
              
              <div className="flex items-center space-x-3">
                {/* Filter Toggle Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                  iconName="Filter"
                  iconPosition="left"
                >
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </Button>

                {/* Sort Dropdown */}
                <SortDropdown currentSort={sortBy} onSortChange={handleSortChange} />
              </div>
            </div>

            {/* Active Filter Chips */}
            <FilterChips
              activeFilters={activeFilters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
          </div>

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <FilterPanel
                filters={activeFilters}
                onFiltersChange={handleFiltersChange}
                isOpen={true}
                onClose={() => {}}
                courseStats={courseStats}
              />
            </div>

            {/* Course Grid */}
            <div className="flex-1 min-w-0">
              <CourseGrid
                courses={filteredCourses}
                loading={loading}
                enrolledCourses={enrolledCourses}
                courseProgress={courseProgress}
              />
            </div>
          </div>

          {/* Mobile Filter Panel */}
          <FilterPanel
            filters={activeFilters}
            onFiltersChange={handleFiltersChange}
            isOpen={showFilters}
            onClose={() => setShowFilters(false)}
            courseStats={courseStats}
          />
        </main>
      </div>
    </>
  );
};

export default CourseCatalog;