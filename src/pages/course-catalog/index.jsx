import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import { getUserPlan } from '../../utils/planUtils';
import MobileNav from '../../components/Layout/MobileNav';
import Sidebar from '../../components/Layout/Sidebar';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import CourseGrid from './components/CourseGrid';
import FilterChips from './components/FilterChips';
import Icon from '../../components/AppIcon';
import { safeObjectValues } from '../../utils/safeObjectUtils';

const CourseCatalog = () => {
  const { user, userProfile } = useAuth();
  const userPlan = getUserPlan({ user, userProfile });
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    difficulty: [],
    duration: [],
    instructor: []
  });
  const [sortBy, setSortBy] = useState('newest');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for courses
  useEffect(() => {
    const mockCourses = [
      {
        id: 1,
        title: 'Introduction to Old Testament Prophecy',
        instructor: 'Dr. Sarah Martinez',
        category: 'Prophetic Literature',
        difficulty: 'beginner',
        duration: 8,
        price: 0,
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        rating: 4.8,
        enrolledCount: 1234,
        description: 'A comprehensive introduction to the prophetic books of the Old Testament, covering historical context, literary structure, and theological themes.',
        isNew: true,
        isFeatured: true
      },
      {
        id: 2,
        title: 'Understanding Isaiah: The Servant Songs',
        instructor: 'Prof. Michael Thompson',
        category: 'Isaiah',
        difficulty: 'intermediate',
        duration: 12,
        price: 49.99,
        thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        rating: 4.9,
        enrolledCount: 892,
        description: 'Deep dive into the Servant Songs of Isaiah, exploring their messianic implications and theological significance.',
        isNew: false,
        isFeatured: true
      },
      {
        id: 3,
        title: 'Ezekiel\'s Visions and Their Meaning',
        instructor: 'Pastor David Kim',
        category: 'Ezekiel',
        difficulty: 'advanced',
        duration: 16,
        price: 79.99,
        thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
        rating: 4.7,
        enrolledCount: 567,
        description: 'Explore the complex visions of Ezekiel and their prophetic significance for Israel and the church.',
        isNew: false,
        isFeatured: false
      }
    ];

    setTimeout(() => {
      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = courses;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedFilters.category.length > 0) {
      filtered = filtered.filter(course =>
        selectedFilters.category.includes(course.category)
      );
    }

    // Apply difficulty filter
    if (selectedFilters.difficulty.length > 0) {
      filtered = filtered.filter(course =>
        selectedFilters.difficulty.includes(course.difficulty)
      );
    }

    // Apply duration filter
    if (selectedFilters.duration.length > 0) {
      filtered = filtered.filter(course => {
        const duration = course.duration;
        return selectedFilters.duration.some(filter => {
          switch (filter) {
            case 'short':
              return duration <= 4;
            case 'medium':
              return duration > 4 && duration <= 12;
            case 'long':
              return duration > 12;
            default:
              return false;
          }
        });
      });
    }

    // Apply instructor filter
    if (selectedFilters.instructor.length > 0) {
      filtered = filtered.filter(course =>
        selectedFilters.instructor.includes(course.instructor)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'enrolled':
        filtered.sort((a, b) => b.enrolledCount - a.enrolledCount);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchQuery, selectedFilters, sortBy]);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const removeFilter = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].filter(item => item !== value)
    }));
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      difficulty: [],
      duration: [],
      instructor: []
    });
    setSearchQuery('');
  };

  const getActiveFilterCount = () => {
    return safeObjectValues(selectedFilters || {}).reduce((count, filterArray) => 
      count + (Array.isArray(filterArray) ? filterArray.length : 0), 0);
  };

  return (
    <>
      <Helmet>
        <title>Course Catalog - Sons Prophets LMS</title>
        <meta name="description" content="Browse our comprehensive collection of Old Testament prophecy courses" />
      </Helmet>

      <div className="min-h-screen bg-page">
        <MobileNav plan={userPlan} />
        <div className="flex">
          <Sidebar plan={userPlan} />
          
          <div className="flex-1 flex flex-col">
            <GlobalHeader />
            <PrimaryNavigation />
            <BreadcrumbTrail />

            <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h1 className="text-3xl font-heading font-heading-bold text-primary mb-2">
                  Course Catalog
                </h1>
                <p className="text-secondary font-body">
                  Discover comprehensive courses on Old Testament prophecy and biblical studies
                </p>
              </div>

              {/* Search and Filter Section */}
              <div className="mb-8">
                <div className="flex flex-col lg:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <SearchBar 
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      placeholder="Search courses, instructors, or topics..."
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <SortDropdown
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                    />
                    <button
                      onClick={() => setIsFilterPanelOpen(true)}
                      className="flex items-center px-4 py-2 bg-card border border-divider rounded-lg hover:bg-primary/5 transition-colors"
                    >
                      <Icon name="Filter" size={16} className="mr-2" />
                      Filters
                      {getActiveFilterCount() > 0 && (
                        <span className="ml-2 bg-primary text-white text-xs rounded-full px-2 py-1">
                          {getActiveFilterCount()}
                        </span>
                      )}
                    </button>
                  </div>
                </div>

                {/* Filter Chips */}
                <FilterChips
                  selectedFilters={selectedFilters}
                  onRemoveFilter={removeFilter}
                  onClearAll={clearAllFilters}
                />
              </div>

              {/* Course Grid */}
              <div className="mb-8">
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="card animate-pulse">
                        <div className="bg-divider h-48 rounded-lg mb-4"></div>
                        <div className="space-y-2">
                          <div className="bg-divider h-4 rounded w-3/4"></div>
                          <div className="bg-divider h-4 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <CourseGrid
                    courses={filteredCourses}
                    userPlan={userPlan}
                  />
                )}
              </div>

              {/* No Results */}
              {!isLoading && filteredCourses.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📚</div>
                  <h3 className="text-lg font-heading font-heading-medium text-primary mb-2">
                    No courses found
                  </h3>
                  <p className="text-secondary font-body mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="button bg-primary text-white"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterPanelOpen}
          onClose={() => setIsFilterPanelOpen(false)}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          courses={courses}
        />
      </div>
    </>
  );
};

export default CourseCatalog;