import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const BookmarkManager = ({ isOpen, onClose, bookmarks, onAddBookmark, onRemoveBookmark, onUpdateBookmark }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [newTags, setNewTags] = useState('');

  // Mock bookmarks data
  const mockBookmarks = [
    {
      id: 1,
      book: 'genesis',
      bookName: 'Genesis',
      chapter: 1,
      verse: 1,
      text: 'In the beginning God created the heavens and the earth.',
      note: 'Foundation verse for understanding God as Creator',
      tags: ['creation', 'theology', 'fundamental'],
      dateAdded: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      color: 'yellow'
    },
    {
      id: 2,
      book: 'psalms',
      bookName: 'Psalms',
      chapter: 23,
      verse: 1,
      text: 'The Lord is my shepherd, I lack nothing.',
      note: 'Comfort and assurance in God\'s provision',
      tags: ['comfort', 'trust', 'provision'],
      dateAdded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      color: 'blue'
    },
    {
      id: 3,
      book: 'isaiah',
      bookName: 'Isaiah',
      chapter: 53,
      verse: 5,
      text: 'But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.',
      note: 'Prophecy of Christ\'s sacrificial death',
      tags: ['prophecy', 'messiah', 'salvation'],
      dateAdded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      color: 'red'
    },
    {
      id: 4,
      book: 'psalms',
      bookName: 'Psalms',
      chapter: 119,
      verse: 105,
      text: 'Your word is a lamp for my feet, a light on my path.',
      note: 'God\'s word provides guidance and direction',
      tags: ['guidance', 'scripture', 'wisdom'],
      dateAdded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      color: 'green'
    }
  ];

  const [allBookmarks, setAllBookmarks] = useState(mockBookmarks);

  // Get all unique tags
  const allTags = [...new Set(allBookmarks.flatMap(b => b.tags))];

  // Filter and sort bookmarks
  const filteredBookmarks = allBookmarks
    .filter(bookmark => {
      const matchesSearch = 
        bookmark.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.note.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.bookName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTag = selectedTag === 'all' || bookmark.tags.includes(selectedTag);
      
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return b.dateAdded - a.dateAdded;
        case 'oldest':
          return a.dateAdded - b.dateAdded;
        case 'book':
          return a.bookName.localeCompare(b.bookName) || a.chapter - b.chapter || a.verse - b.verse;
        default:
          return 0;
      }
    });

  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark);
    setNewNote(bookmark.note);
    setNewTags(bookmark.tags.join(', '));
  };

  const handleSaveEdit = () => {
    if (editingBookmark) {
      const updatedBookmark = {
        ...editingBookmark,
        note: newNote,
        tags: newTags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      
      setAllBookmarks(prev => 
        prev.map(b => b.id === editingBookmark.id ? updatedBookmark : b)
      );
      
      setEditingBookmark(null);
      setNewNote('');
      setNewTags('');
    }
  };

  const handleDeleteBookmark = (bookmarkId) => {
    setAllBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  };

  const formatDate = (date) => {
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  const getColorClass = (color) => {
    const colors = {
      yellow: 'bg-yellow-100 border-yellow-300',
      blue: 'bg-blue-100 border-blue-300',
      red: 'bg-red-100 border-red-300',
      green: 'bg-green-100 border-green-300',
      purple: 'bg-purple-100 border-purple-300'
    };
    return colors[color] || colors.yellow;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1200 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-soft-lg border border-subtle w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-subtle">
          <div className="flex items-center space-x-3">
            <Icon name="Bookmark" size={24} className="text-primary" />
            <div>
              <h2 className="text-xl font-heading font-semibold text-text-primary">
                My Bookmarks
              </h2>
              <p className="text-sm text-text-secondary">
                {filteredBookmarks.length} of {allBookmarks.length} bookmarks
              </p>
            </div>
          </div>
          
          <Button variant="ghost" onClick={onClose} className="p-2">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Controls */}
        <div className="p-6 border-b border-subtle bg-surface">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Icon 
                name="Search" 
                size={16} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              />
              <Input
                type="search"
                placeholder="Search bookmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Tag Filter */}
            <div className="md:w-48">
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="w-full p-2 border border-subtle rounded-lg bg-background text-sm font-body"
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>
                    {tag.charAt(0).toUpperCase() + tag.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-subtle rounded-lg bg-background text-sm font-body"
              >
                <option value="recent">Most Recent</option>
                <option value="oldest">Oldest First</option>
                <option value="book">By Book</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredBookmarks.length > 0 ? (
            <div className="space-y-4">
              {filteredBookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className={`p-4 rounded-lg border-2 ${getColorClass(bookmark.color)} hover:shadow-soft-md transition-all`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Book" size={16} className="text-primary" />
                      <span className="font-body font-semibold text-text-primary">
                        {bookmark.bookName} {bookmark.chapter}:{bookmark.verse}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditBookmark(bookmark)}
                        className="p-1"
                      >
                        <Icon name="Edit2" size={14} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBookmark(bookmark.id)}
                        className="p-1 text-error hover:text-error-600"
                      >
                        <Icon name="Trash2" size={14} />
                      </Button>
                    </div>
                  </div>

                  <blockquote className="text-text-primary font-body italic mb-3 pl-4 border-l-4 border-primary">
                    "{bookmark.text}"
                  </blockquote>

                  {bookmark.note && (
                    <p className="text-sm text-text-secondary font-body mb-3">
                      {bookmark.note}
                    </p>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {bookmark.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 text-xs font-caption bg-primary-100 text-primary-700 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="text-xs text-text-muted font-caption">
                      {formatDate(bookmark.dateAdded)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Icon name="BookmarkX" size={64} className="text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
                No bookmarks found
              </h3>
              <p className="text-text-secondary font-body">
                {searchTerm || selectedTag !== 'all' ?'Try adjusting your search or filter criteria' :'Start bookmarking verses as you study to build your collection'
                }
              </p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingBookmark && (
          <div className="fixed inset-0 z-1300 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg shadow-soft-lg border border-subtle w-full max-w-md">
              <div className="p-6">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
                  Edit Bookmark
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-body font-semibold text-text-primary mb-2">
                      Note
                    </label>
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add your personal note..."
                      className="w-full p-3 border border-subtle rounded-lg bg-background text-sm font-body resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-body font-semibold text-text-primary mb-2">
                      Tags (comma-separated)
                    </label>
                    <Input
                      type="text"
                      value={newTags}
                      onChange={(e) => setNewTags(e.target.value)}
                      placeholder="theology, comfort, study..."
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setEditingBookmark(null);
                      setNewNote('');
                      setNewTags('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={handleSaveEdit}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkManager;