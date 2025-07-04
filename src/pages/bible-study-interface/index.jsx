import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import GlobalHeader from '../../components/ui/GlobalHeader';
import PrimaryNavigation from '../../components/ui/PrimaryNavigation';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import BookChapterVersePicker from './components/BookChapterVersePicker';
import BiblicalTextDisplay from './components/BiblicalTextDisplay';
import CommentaryPanel from './components/CommentaryPanel';
import AIVerseAssistant from './components/AIVerseAssistant';
import BookmarkManager from './components/BookmarkManager';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BibleStudyInterface = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [isAIExpanded, setIsAIExpanded] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState({});
  const [mobileActivePanel, setMobileActivePanel] = useState('text'); // picker, text, commentary
  const [studySession, setStudySession] = useState({
    startTime: new Date(),
    versesRead: 0,
    notesAdded: 0
  });

  useEffect(() => {
    // Load saved study session from localStorage
    const savedSession = localStorage.getItem('bible-study-session');
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      setSelectedBook(parsed.book);
      setSelectedChapter(parsed.chapter);
      setSelectedVerse(parsed.verse);
    }

    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem('bible-bookmarks');
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }

    // Load notes from localStorage
    const savedNotes = localStorage.getItem('bible-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    // Save current selection to localStorage
    if (selectedBook && selectedChapter) {
      localStorage.setItem('bible-study-session', JSON.stringify({
        book: selectedBook,
        chapter: selectedChapter,
        verse: selectedVerse
      }));
    }
  }, [selectedBook, selectedChapter, selectedVerse]);

  useEffect(() => {
    // Save bookmarks to localStorage
    localStorage.setItem('bible-bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    // Save notes to localStorage
    localStorage.setItem('bible-notes', JSON.stringify(notes));
  }, [notes]);

  const handleSelectionChange = (selection) => {
    setSelectedBook(selection.book);
    setSelectedChapter(selection.chapter);
    setSelectedVerse(selection.verse);
    
    // Update study session stats
    if (selection.verse) {
      setStudySession(prev => ({
        ...prev,
        versesRead: prev.versesRead + 1
      }));
    }
  };

  const handleVerseSelect = (verse) => {
    setSelectedVerse(verse);
  };

  const handleAddBookmark = (book, chapter, verse) => {
    const newBookmark = {
      id: Date.now(),
      book,
      chapter,
      verse,
      dateAdded: new Date(),
      note: '',
      tags: []
    };
    
    setBookmarks(prev => [...prev, newBookmark]);
  };

  const handleRemoveBookmark = (bookmarkId) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  };

  const handleUpdateBookmark = (bookmarkId, updates) => {
    setBookmarks(prev => 
      prev.map(b => b.id === bookmarkId ? { ...b, ...updates } : b)
    );
  };

  const handleAddNote = (book, chapter, verse, note) => {
    const key = `${book}-${chapter}-${verse}`;
    setNotes(prev => ({
      ...prev,
      [key]: note
    }));
    
    setStudySession(prev => ({
      ...prev,
      notesAdded: prev.notesAdded + 1
    }));
  };

  const handleToggleAI = () => {
    setIsAIExpanded(!isAIExpanded);
  };

  const handleMobilePanelChange = (panel) => {
    setMobileActivePanel(panel);
  };

  const getStudySessionDuration = () => {
    const now = new Date();
    const diff = now - studySession.startTime;
    const minutes = Math.floor(diff / 60000);
    return minutes;
  };

  return (
    <>
      <Helmet>
        <title>Bible Study Interface - Sons Prophets LMS</title>
        <meta name="description" content="Comprehensive biblical text exploration with commentary integration and AI-powered contextual assistance for deep theological study." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <GlobalHeader />
        <PrimaryNavigation />
        <BreadcrumbTrail />

        {/* Study Session Stats Bar */}
        <div className="bg-primary-50 border-b border-primary-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="font-data text-primary-700">
                  {getStudySessionDuration()} min
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Eye" size={16} className="text-primary" />
                <span className="font-data text-primary-700">
                  {studySession.versesRead} verses
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="PenTool" size={16} className="text-primary" />
                <span className="font-data text-primary-700">
                  {studySession.notesAdded} notes
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBookmarks(true)}
                className="text-primary hover:bg-primary-100"
              >
                <Icon name="Bookmark" size={16} className="mr-1" />
                Bookmarks ({bookmarks.length})
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-0 min-h-[calc(100vh-200px)]">
            {/* Left Panel - Book/Chapter/Verse Picker */}
            <div className="lg:col-span-3">
              <BookChapterVersePicker
                onSelectionChange={handleSelectionChange}
                selectedBook={selectedBook}
                selectedChapter={selectedChapter}
                selectedVerse={selectedVerse}
              />
            </div>

            {/* Center Panel - Biblical Text Display */}
            <div className="lg:col-span-6">
              <BiblicalTextDisplay
                selectedBook={selectedBook}
                selectedChapter={selectedChapter}
                selectedVerse={selectedVerse}
                onVerseSelect={handleVerseSelect}
                onAddBookmark={handleAddBookmark}
                bookmarks={bookmarks}
                notes={notes}
                onAddNote={handleAddNote}
              />
            </div>

            {/* Right Panel - Commentary */}
            <div className="lg:col-span-3">
              <CommentaryPanel
                selectedBook={selectedBook}
                selectedChapter={selectedChapter}
                selectedVerse={selectedVerse}
              />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Panel Navigation */}
            <div className="bg-surface border-b border-subtle">
              <div className="flex">
                <Button
                  variant={mobileActivePanel === 'picker' ? 'primary' : 'ghost'}
                  onClick={() => handleMobilePanelChange('picker')}
                  className="flex-1 rounded-none border-r border-subtle"
                >
                  <Icon name="Book" size={16} className="mr-1" />
                  Navigator
                </Button>
                <Button
                  variant={mobileActivePanel === 'text' ? 'primary' : 'ghost'}
                  onClick={() => handleMobilePanelChange('text')}
                  className="flex-1 rounded-none border-r border-subtle"
                >
                  <Icon name="FileText" size={16} className="mr-1" />
                  Text
                </Button>
                <Button
                  variant={mobileActivePanel === 'commentary' ? 'primary' : 'ghost'}
                  onClick={() => handleMobilePanelChange('commentary')}
                  className="flex-1 rounded-none"
                >
                  <Icon name="MessageSquare" size={16} className="mr-1" />
                  Commentary
                </Button>
              </div>
            </div>

            {/* Mobile Panel Content */}
            <div className="min-h-[calc(100vh-300px)]">
              {mobileActivePanel === 'picker' && (
                <BookChapterVersePicker
                  onSelectionChange={handleSelectionChange}
                  selectedBook={selectedBook}
                  selectedChapter={selectedChapter}
                  selectedVerse={selectedVerse}
                />
              )}
              
              {mobileActivePanel === 'text' && (
                <BiblicalTextDisplay
                  selectedBook={selectedBook}
                  selectedChapter={selectedChapter}
                  selectedVerse={selectedVerse}
                  onVerseSelect={handleVerseSelect}
                  onAddBookmark={handleAddBookmark}
                  bookmarks={bookmarks}
                  notes={notes}
                  onAddNote={handleAddNote}
                />
              )}
              
              {mobileActivePanel === 'commentary' && (
                <CommentaryPanel
                  selectedBook={selectedBook}
                  selectedChapter={selectedChapter}
                  selectedVerse={selectedVerse}
                />
              )}
            </div>
          </div>
        </div>

        {/* AI Verse Assistant */}
        <AIVerseAssistant
          selectedBook={selectedBook}
          selectedChapter={selectedChapter}
          selectedVerse={selectedVerse}
          isExpanded={isAIExpanded}
          onToggle={handleToggleAI}
        />

        {/* Bookmark Manager Modal */}
        <BookmarkManager
          isOpen={showBookmarks}
          onClose={() => setShowBookmarks(false)}
          bookmarks={bookmarks}
          onAddBookmark={handleAddBookmark}
          onRemoveBookmark={handleRemoveBookmark}
          onUpdateBookmark={handleUpdateBookmark}
        />

        {/* Mobile Bottom Spacing for AI Assistant */}
        <div className="lg:hidden h-20"></div>
      </div>
    </>
  );
};

export default BibleStudyInterface;