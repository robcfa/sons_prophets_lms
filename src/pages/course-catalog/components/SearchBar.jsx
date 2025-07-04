import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const SearchBar = ({ onSearch, placeholder = "Search courses, topics, instructors..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'course', title: 'Introduction to Biblical Prophecy', category: 'Course' },
    { type: 'course', title: 'Major Prophets: Isaiah, Jeremiah, Ezekiel', category: 'Course' },
    { type: 'course', title: 'Minor Prophets Overview', category: 'Course' },
    { type: 'topic', title: 'Messianic Prophecy', category: 'Topic' },
    { type: 'topic', title: 'Prophetic Interpretation', category: 'Topic' },
    { type: 'topic', title: 'Historical Context', category: 'Topic' },
    { type: 'instructor', title: 'Dr. Sarah Johnson', category: 'Instructor' },
    { type: 'instructor', title: 'Prof. Michael Chen', category: 'Instructor' },
    { type: 'instructor', title: 'Dr. David Williams', category: 'Instructor' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current && 
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      
      // Simulate API call delay
      const timer = setTimeout(() => {
        const filtered = mockSuggestions.filter(suggestion =>
          suggestion.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 6)); // Limit to 6 suggestions
        setIsLoading(false);
        setShowSuggestions(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsLoading(false);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (term = searchTerm) => {
    if (term.trim()) {
      onSearch(term.trim());
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    handleSearch(suggestion.title);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch('');
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'course':
        return 'BookOpen';
      case 'topic':
        return 'Tag';
      case 'instructor':
        return 'User';
      default:
        return 'Search';
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
        />
        <Input
          type="search"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-10 py-3 w-full bg-surface border border-subtle rounded-lg text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-color"
        />
        
        {/* Loading Spinner or Clear Button */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          {isLoading ? (
            <Icon name="Loader2" size={16} className="text-text-secondary animate-spin" />
          ) : searchTerm && (
            <button
              onClick={handleClearSearch}
              className="text-text-secondary hover:text-text-primary transition-color p-1"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-soft-lg border border-subtle z-50 max-h-80 overflow-y-auto"
        >
          <div className="p-2">
            <div className="flex items-center justify-between px-3 py-2 text-xs font-caption text-text-muted">
              <span>Suggestions</span>
              <span>{suggestions.length} results</span>
            </div>
            
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 hover:bg-surface rounded-lg transition-color text-left"
              >
                <Icon 
                  name={getSuggestionIcon(suggestion.type)} 
                  size={16} 
                  className="text-primary flex-shrink-0" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body text-text-primary truncate">
                    {suggestion.title}
                  </p>
                  <p className="text-xs font-caption text-text-secondary">
                    {suggestion.category}
                  </p>
                </div>
                <Icon name="ArrowUpRight" size={14} className="text-text-muted flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {showSuggestions && suggestions.length === 0 && searchTerm && !isLoading && (
        <div 
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card rounded-lg shadow-soft-lg border border-subtle z-50"
        >
          <div className="p-6 text-center">
            <Icon name="Search" size={32} className="text-text-muted mx-auto mb-2" />
            <p className="text-text-secondary font-body mb-1">No suggestions found</p>
            <p className="text-sm text-text-muted font-body">
              Try searching for courses, topics, or instructors
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;