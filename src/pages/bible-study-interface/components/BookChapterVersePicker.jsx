import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const BookChapterVersePicker = ({ onSelectionChange, selectedBook, selectedChapter, selectedVerse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBook, setExpandedBook] = useState(selectedBook || null);
  const [expandedChapter, setExpandedChapter] = useState(selectedChapter || null);

  // Old Testament books with chapter counts
  const oldTestamentBooks = [
    { name: 'Genesis', chapters: 50, key: 'genesis' },
    { name: 'Exodus', chapters: 40, key: 'exodus' },
    { name: 'Leviticus', chapters: 27, key: 'leviticus' },
    { name: 'Numbers', chapters: 36, key: 'numbers' },
    { name: 'Deuteronomy', chapters: 34, key: 'deuteronomy' },
    { name: 'Joshua', chapters: 24, key: 'joshua' },
    { name: 'Judges', chapters: 21, key: 'judges' },
    { name: 'Ruth', chapters: 4, key: 'ruth' },
    { name: '1 Samuel', chapters: 31, key: '1-samuel' },
    { name: '2 Samuel', chapters: 24, key: '2-samuel' },
    { name: '1 Kings', chapters: 22, key: '1-kings' },
    { name: '2 Kings', chapters: 25, key: '2-kings' },
    { name: '1 Chronicles', chapters: 29, key: '1-chronicles' },
    { name: '2 Chronicles', chapters: 36, key: '2-chronicles' },
    { name: 'Ezra', chapters: 10, key: 'ezra' },
    { name: 'Nehemiah', chapters: 13, key: 'nehemiah' },
    { name: 'Esther', chapters: 10, key: 'esther' },
    { name: 'Job', chapters: 42, key: 'job' },
    { name: 'Psalms', chapters: 150, key: 'psalms' },
    { name: 'Proverbs', chapters: 31, key: 'proverbs' },
    { name: 'Ecclesiastes', chapters: 12, key: 'ecclesiastes' },
    { name: 'Song of Solomon', chapters: 8, key: 'song-of-solomon' },
    { name: 'Isaiah', chapters: 66, key: 'isaiah' },
    { name: 'Jeremiah', chapters: 52, key: 'jeremiah' },
    { name: 'Lamentations', chapters: 5, key: 'lamentations' },
    { name: 'Ezekiel', chapters: 48, key: 'ezekiel' },
    { name: 'Daniel', chapters: 12, key: 'daniel' },
    { name: 'Hosea', chapters: 14, key: 'hosea' },
    { name: 'Joel', chapters: 3, key: 'joel' },
    { name: 'Amos', chapters: 9, key: 'amos' },
    { name: 'Obadiah', chapters: 1, key: 'obadiah' },
    { name: 'Jonah', chapters: 4, key: 'jonah' },
    { name: 'Micah', chapters: 7, key: 'micah' },
    { name: 'Nahum', chapters: 3, key: 'nahum' },
    { name: 'Habakkuk', chapters: 3, key: 'habakkuk' },
    { name: 'Zephaniah', chapters: 3, key: 'zephaniah' },
    { name: 'Haggai', chapters: 2, key: 'haggai' },
    { name: 'Zechariah', chapters: 14, key: 'zechariah' },
    { name: 'Malachi', chapters: 4, key: 'malachi' }
  ];

  // Mock verse counts for chapters (simplified - in real app would be more detailed)
  const getVerseCount = (bookKey, chapter) => {
    const verseCounts = {
      'genesis': { 1: 31, 2: 25, 3: 24, 4: 26, 5: 32 },
      'exodus': { 1: 22, 2: 25, 3: 22, 4: 31, 5: 23 },
      'isaiah': { 1: 31, 2: 22, 3: 26, 4: 6, 5: 30 }
    };
    return verseCounts[bookKey]?.[chapter] || 25; // Default to 25 verses
  };

  const filteredBooks = oldTestamentBooks.filter(book =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookSelect = (book) => {
    if (expandedBook === book.key) {
      setExpandedBook(null);
      setExpandedChapter(null);
    } else {
      setExpandedBook(book.key);
      setExpandedChapter(null);
      onSelectionChange({ book: book.key, bookName: book.name, chapter: null, verse: null });
    }
  };

  const handleChapterSelect = (chapter) => {
    if (expandedChapter === chapter) {
      setExpandedChapter(null);
    } else {
      setExpandedChapter(chapter);
      const book = oldTestamentBooks.find(b => b.key === expandedBook);
      onSelectionChange({ 
        book: expandedBook, 
        bookName: book.name, 
        chapter, 
        verse: null 
      });
    }
  };

  const handleVerseSelect = (verse) => {
    const book = oldTestamentBooks.find(b => b.key === expandedBook);
    onSelectionChange({ 
      book: expandedBook, 
      bookName: book.name, 
      chapter: expandedChapter, 
      verse 
    });
  };

  return (
    <div className="h-full flex flex-col bg-surface border-r border-subtle">
      {/* Header */}
      <div className="p-4 border-b border-subtle bg-background">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-3">
          Bible Navigator
        </h2>
        
        {/* Search */}
        <div className="relative">
          <Icon 
            name="Search" 
            size={16} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
          <Input
            type="search"
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 text-sm"
          />
        </div>
      </div>

      {/* Navigation Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Books List */}
        <div className="p-2">
          {filteredBooks.map((book) => (
            <div key={book.key} className="mb-1">
              <Button
                variant="ghost"
                onClick={() => handleBookSelect(book)}
                className={`w-full justify-between text-left p-3 rounded-lg transition-all ${
                  expandedBook === book.key 
                    ? 'bg-primary-100 text-primary border border-primary-200' :'hover:bg-primary-50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Book" size={16} />
                  <span className="font-body text-sm">{book.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-muted">{book.chapters} ch</span>
                  <Icon 
                    name="ChevronRight" 
                    size={16} 
                    className={`transform transition-transform ${
                      expandedBook === book.key ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </Button>

              {/* Chapters */}
              {expandedBook === book.key && (
                <div className="ml-4 mt-2 space-y-1">
                  <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => (
                      <Button
                        key={chapter}
                        variant="ghost"
                        size="sm"
                        onClick={() => handleChapterSelect(chapter)}
                        className={`text-xs p-2 ${
                          expandedChapter === chapter
                            ? 'bg-secondary-100 text-secondary border border-secondary-200' :'hover:bg-secondary-50'
                        }`}
                      >
                        {chapter}
                      </Button>
                    ))}
                  </div>

                  {/* Verses */}
                  {expandedChapter && (
                    <div className="mt-3 p-3 bg-accent-50 rounded-lg border border-accent-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-body font-semibold text-accent-700">
                          {book.name} {expandedChapter}
                        </span>
                        <span className="text-xs text-accent-600">
                          {getVerseCount(book.key, expandedChapter)} verses
                        </span>
                      </div>
                      <div className="grid grid-cols-5 gap-1 max-h-32 overflow-y-auto">
                        {Array.from({ length: getVerseCount(book.key, expandedChapter) }, (_, i) => i + 1).map((verse) => (
                          <Button
                            key={verse}
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerseSelect(verse)}
                            className={`text-xs p-1 ${
                              selectedVerse === verse
                                ? 'bg-accent text-white' :'hover:bg-accent-100 text-accent-700'
                            }`}
                          >
                            {verse}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Access */}
      <div className="p-4 border-t border-subtle bg-background">
        <div className="text-xs font-caption text-text-muted mb-2">Quick Access</div>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setExpandedBook('psalms');
              onSelectionChange({ book: 'psalms', bookName: 'Psalms', chapter: null, verse: null });
            }}
            className="text-xs"
          >
            <Icon name="Music" size={14} className="mr-1" />
            Psalms
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setExpandedBook('isaiah');
              onSelectionChange({ book: 'isaiah', bookName: 'Isaiah', chapter: null, verse: null });
            }}
            className="text-xs"
          >
            <Icon name="Crown" size={14} className="mr-1" />
            Isaiah
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookChapterVersePicker;