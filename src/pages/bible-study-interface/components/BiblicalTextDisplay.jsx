import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiblicalTextDisplay = ({ 
  selectedBook, 
  selectedChapter, 
  selectedVerse, 
  onVerseSelect, 
  onAddBookmark,
  bookmarks = [],
  notes = {},
  onAddNote 
}) => {
  const [fontSize, setFontSize] = useState(16);
  const [lineSpacing, setLineSpacing] = useState(1.6);
  const [theme, setTheme] = useState('light');
  const [highlightedVerses, setHighlightedVerses] = useState(new Set());
  const [showCrossRefs, setShowCrossRefs] = useState(true);

  // Mock biblical text data
  const getBiblicalText = (book, chapter) => {
    const mockTexts = {
      'genesis': {
        1: [
          { verse: 1, text: "In the beginning God created the heavens and the earth.", crossRefs: ['John 1:1', 'Hebrews 11:3'] },
          { verse: 2, text: "Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.", crossRefs: ['Jeremiah 4:23'] },
          { verse: 3, text: "And God said, \"Let there be light,\" and there was light.", crossRefs: ['2 Corinthians 4:6', 'Psalm 33:9'] },
          { verse: 4, text: "God saw that the light was good, and he separated the light from the darkness.", crossRefs: ['1 John 1:5'] },
          { verse: 5, text: "God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning—the first day.", crossRefs: ['Psalm 74:16'] }
        ]
      },
      'psalms': {
        23: [
          { verse: 1, text: "The Lord is my shepherd, I lack nothing.", crossRefs: ['John 10:11', 'Ezekiel 34:11'] },
          { verse: 2, text: "He makes me lie down in green pastures, he leads me beside quiet waters,", crossRefs: ['Isaiah 49:10'] },
          { verse: 3, text: "he refreshes my soul. He guides me along the right paths for his name's sake.", crossRefs: ['Psalm 25:11'] },
          { verse: 4, text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.", crossRefs: ['Isaiah 43:2'] },
          { verse: 5, text: "You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.", crossRefs: ['Psalm 92:10'] },
          { verse: 6, text: "Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the Lord forever.", crossRefs: ['Psalm 27:4'] }
        ]
      },
      'isaiah': {
        53: [
          { verse: 1, text: "Who has believed our message and to whom has the arm of the Lord been revealed?", crossRefs: ['John 12:38', 'Romans 10:16'] },
          { verse: 2, text: "He grew up before him like a tender shoot, and like a root out of dry ground. He had no beauty or majesty to attract us to him, nothing in his appearance that we should desire him.", crossRefs: ['Mark 6:3'] },
          { verse: 3, text: "He was despised and rejected by mankind, a man of suffering, and familiar with pain. Like one from whom people hide their faces he was despised, and we held him in low esteem.", crossRefs: ['Luke 23:18'] },
          { verse: 4, text: "Surely he took up our pain and bore our suffering, yet we considered him punished by God, stricken by him, and afflicted.", crossRefs: ['Matthew 8:17', '1 Peter 2:24'] },
          { verse: 5, text: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.", crossRefs: ['1 Peter 2:24', 'Romans 4:25'] }
        ]
      }
    };

    return mockTexts[book]?.[chapter] || [];
  };

  const currentText = getBiblicalText(selectedBook, selectedChapter);

  const handleVerseClick = (verse) => {
    onVerseSelect(verse);
  };

  const handleHighlightVerse = (verse) => {
    const newHighlighted = new Set(highlightedVerses);
    if (newHighlighted.has(verse)) {
      newHighlighted.delete(verse);
    } else {
      newHighlighted.add(verse);
    }
    setHighlightedVerses(newHighlighted);
  };

  const isBookmarked = (book, chapter, verse) => {
    return bookmarks.some(b => b.book === book && b.chapter === chapter && b.verse === verse);
  };

  const hasNote = (book, chapter, verse) => {
    return notes[`${book}-${chapter}-${verse}`];
  };

  const themes = {
    light: { bg: 'bg-background', text: 'text-text-primary' },
    sepia: { bg: 'bg-amber-50', text: 'text-amber-900' },
    dark: { bg: 'bg-gray-900', text: 'text-gray-100' }
  };

  if (!selectedBook || !selectedChapter) {
    return (
      <div className="h-full flex items-center justify-center bg-surface">
        <div className="text-center">
          <Icon name="BookOpen" size={64} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Select a Passage
          </h3>
          <p className="text-text-secondary font-body">
            Choose a book and chapter from the navigator to begin studying
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${themes[theme].bg}`}>
      {/* Header with Controls */}
      <div className="p-4 border-b border-subtle bg-background">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              {selectedBook.charAt(0).toUpperCase() + selectedBook.slice(1).replace('-', ' ')} {selectedChapter}
            </h2>
            {selectedVerse && (
              <p className="text-sm text-text-secondary">Verse {selectedVerse}</p>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddBookmark(selectedBook, selectedChapter, selectedVerse)}
              className="p-2"
              title="Bookmark this passage"
            >
              <Icon 
                name="Bookmark" 
                size={16} 
                className={isBookmarked(selectedBook, selectedChapter, selectedVerse) ? 'text-accent' : ''} 
              />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCrossRefs(!showCrossRefs)}
              className="p-2"
              title="Toggle cross-references"
            >
              <Icon name="Link" size={16} className={showCrossRefs ? 'text-primary' : ''} />
            </Button>
          </div>
        </div>

        {/* Text Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Font Size */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                className="p-1"
              >
                <Icon name="Minus" size={14} />
              </Button>
              <span className="text-sm font-data w-8 text-center">{fontSize}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                className="p-1"
              >
                <Icon name="Plus" size={14} />
              </Button>
            </div>

            {/* Line Spacing */}
            <div className="flex items-center space-x-2">
              <Icon name="AlignJustify" size={16} className="text-text-secondary" />
              <select
                value={lineSpacing}
                onChange={(e) => setLineSpacing(parseFloat(e.target.value))}
                className="text-sm border border-subtle rounded px-2 py-1 bg-background"
              >
                <option value={1.2}>Tight</option>
                <option value={1.6}>Normal</option>
                <option value={2.0}>Loose</option>
              </select>
            </div>

            {/* Theme */}
            <div className="flex items-center space-x-1">
              {Object.keys(themes).map((themeName) => (
                <Button
                  key={themeName}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(themeName)}
                  className={`p-2 ${theme === themeName ? 'bg-primary-100' : ''}`}
                  title={`${themeName} theme`}
                >
                  <div className={`w-4 h-4 rounded-full ${
                    themeName === 'light' ? 'bg-white border border-gray-300' :
                    themeName === 'sepia'? 'bg-amber-100' : 'bg-gray-800'
                  }`} />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Biblical Text */}
      <div className="flex-1 overflow-y-auto p-6">
        <div 
          className={`max-w-4xl mx-auto ${themes[theme].text}`}
          style={{ fontSize: `${fontSize}px`, lineHeight: lineSpacing }}
        >
          {currentText.map((verseData) => (
            <div
              key={verseData.verse}
              className={`mb-4 p-3 rounded-lg transition-all cursor-pointer hover:bg-primary-50 ${
                selectedVerse === verseData.verse ? 'bg-primary-100 border-l-4 border-primary' : ''
              } ${
                highlightedVerses.has(verseData.verse) ? 'bg-accent-100' : ''
              }`}
              onClick={() => handleVerseClick(verseData.verse)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 flex flex-col items-center space-y-1">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-primary text-white text-sm font-data rounded-full">
                    {verseData.verse}
                  </span>
                  
                  {/* Verse Actions */}
                  <div className="flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHighlightVerse(verseData.verse);
                      }}
                      className="p-1"
                      title="Highlight verse"
                    >
                      <Icon name="Highlighter" size={12} />
                    </Button>
                    
                    {hasNote(selectedBook, selectedChapter, verseData.verse) && (
                      <Icon name="StickyNote" size={12} className="text-accent" />
                    )}
                    
                    {isBookmarked(selectedBook, selectedChapter, verseData.verse) && (
                      <Icon name="Bookmark" size={12} className="text-accent" />
                    )}
                  </div>
                </div>

                <div className="flex-1 group">
                  <p className="font-body leading-relaxed mb-2">
                    {verseData.text}
                  </p>

                  {/* Cross References */}
                  {showCrossRefs && verseData.crossRefs && verseData.crossRefs.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-subtle">
                      <div className="flex items-center space-x-2 mb-1">
                        <Icon name="Link" size={12} className="text-text-muted" />
                        <span className="text-xs font-caption text-text-muted">Cross-references:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {verseData.crossRefs.map((ref, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="sm"
                            className="text-xs text-secondary hover:text-secondary-600 p-1"
                          >
                            {ref}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-4 border-t border-subtle bg-background">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm">
            <Icon name="ChevronLeft" size={16} className="mr-1" />
            Previous Chapter
          </Button>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Icon name="Share" size={16} className="mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Printer" size={16} className="mr-1" />
              Print
            </Button>
          </div>
          
          <Button variant="outline" size="sm">
            Next Chapter
            <Icon name="ChevronRight" size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BiblicalTextDisplay;