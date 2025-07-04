import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommentaryPanel = ({ selectedBook, selectedChapter, selectedVerse }) => {
  const [activeTab, setActiveTab] = useState('commentary');
  const [selectedCommentator, setSelectedCommentator] = useState('matthew-henry');
  const [loading, setLoading] = useState(false);

  // Mock commentary data
  const getCommentaryData = (book, chapter, verse) => {
    const mockCommentaries = {
      'matthew-henry': {
        name: 'Matthew Henry',
        bio: 'English Nonconformist minister and Bible commentator (1662-1714)',
        commentary: {
          'genesis-1-1': `This verse contains the fundamental truth of all religion and philosophy. "In the beginning" - not in the beginning of time, for time is the measure of motion, and there was no motion till creatures were made; but in the beginning of the creation of the world. God created - the Hebrew word "bara" signifies to create out of nothing, which is peculiar to God alone. The heavens and the earth - by which we understand the whole universe, all things visible and invisible.`,
          'psalms-23-1': `David, in this psalm, takes to himself the comfort of his relation to God as his shepherd. The Lord is my shepherd - not only the shepherd of Israel in general, but my shepherd in particular. This speaks both the dignity of the relation and the comfort of it. A shepherd has a property in his sheep, knows them, takes care of them, and provides for them; and this relation subsists between God and his people.`,
          'isaiah-53-4': `Here the prophet speaks of the Messiah's sufferings for our sins. "Surely he hath borne our griefs" - the word signifies both sickness and sorrow. Christ bore our griefs by taking upon himself our nature, which is liable to grief. He carried our sorrows - not only sympathized with us in them, but took them upon himself, and so carried them away.`
        }
      },
      'john-calvin': {
        name: 'John Calvin',bio: 'French theologian and reformer (1509-1564)',
        commentary: {
          'genesis-1-1': `Moses here begins with the creation of the world, not because he intended to give a complete account of the works of God, but because it was necessary to show that the world was created by God, and did not exist from eternity. The phrase "In the beginning" refers to the commencement of time itself, when God began to display his power in the creation of all things.`,'psalms-23-1': `David here declares his confidence in God's providence and care. The metaphor of a shepherd is most appropriate, for as a shepherd feeds his flock, defends them from wild beasts, leads them to pasture, and takes care of them in every way, so God exercises a similar care over his people.`,
          'isaiah-53-4': `The prophet here describes how Christ took upon himself our infirmities and diseases. This was fulfilled when Christ healed the sick and cast out demons, but more especially when he bore the punishment of our sins upon the cross, thus removing from us the cause of all our spiritual maladies.`
        }
      },
      'spurgeon': {
        name: 'Charles Spurgeon',
        bio: 'English Baptist preacher (1834-1892)',
        commentary: {
          'genesis-1-1': `What a grand opening! Like the first notes of a mighty symphony, this verse strikes the keynote of all Scripture. Here we have the foundation of all true philosophy and science. God is before all things, and by him all things consist. Let us never forget that our God is the Creator, and therefore has absolute right over all his creatures.`,
          'psalms-23-1': `What a sweet title - "my shepherd"! Not merely a shepherd, but MY shepherd. David could say this because he had experienced God's care. The Lord had been his shepherd from his youth up. He had led him, fed him, protected him, and provided for him. What confidence this gives to the believer!`,
          'isaiah-53-4': `Behold the wonder of substitution! Our griefs became his griefs, our sorrows his sorrows. He did not merely pity us in our afflictions, but actually bore them. This is the heart of the gospel - Christ taking our place, bearing our burdens, and suffering our punishment.`
        }
      }
    };

    const key = `${book}-${chapter}-${verse}`;
    return mockCommentaries[selectedCommentator]?.commentary[key] || 
           `Commentary for ${book} ${chapter}:${verse} is being prepared. This passage contains rich theological insights that have been studied by scholars throughout church history.`;
  };

  const getHistoricalContext = (book, chapter) => {
    const contexts = {
      'genesis': `Genesis was written by Moses around 1400-1450 BC. The creation account establishes God as the sovereign creator and sets the foundation for understanding humanity's relationship with God. The historical context includes the Israelites' recent exodus from Egypt and their need to understand their origins and God's covenant promises.`,'psalms': `The Psalms were written over a period of about 1000 years, with many attributed to David (around 1000 BC). Psalm 23 was likely written during David's time as a shepherd or reflecting on those experiences. The psalm reflects the covenant relationship between God and his people, using imagery familiar to an agricultural society.`,
      'isaiah': `Isaiah prophesied during the reigns of Uzziah, Jotham, Ahaz, and Hezekiah (740-680 BC). Chapter 53 is part of the "Servant Songs" that prophetically describe the coming Messiah. The historical context includes the Assyrian threat and the need for hope in God's ultimate deliverance through his chosen servant.`
    };

    return contexts[book] || `Historical context for ${book} provides important background for understanding the cultural, political, and religious circumstances surrounding this biblical text.`;
  };

  const getRelatedPassages = (book, chapter, verse) => {
    const relatedPassages = {
      'genesis-1-1': [
        { reference: 'John 1:1-3', text: 'In the beginning was the Word...', theme: 'Creation through the Word' },
        { reference: 'Hebrews 11:3', text: 'By faith we understand that the universe was formed...', theme: 'Faith and Creation' },
        { reference: 'Colossians 1:16', text: 'For in him all things were created...', theme: 'Christ as Creator' }
      ],
      'psalms-23-1': [
        { reference: 'John 10:11', text: 'I am the good shepherd...', theme: 'Jesus as Shepherd' },
        { reference: 'Ezekiel 34:11-16', text: 'For this is what the Sovereign Lord says...', theme: 'God as Shepherd' },
        { reference: '1 Peter 2:25', text: 'For you were like sheep going astray...', theme: 'Return to the Shepherd' }
      ],
      'isaiah-53-4': [
        { reference: 'Matthew 8:17', text: 'He took up our infirmities...', theme: 'Fulfillment in Christ' },
        { reference: '1 Peter 2:24', text: 'He himself bore our sins...', theme: 'Substitutionary Atonement' },
        { reference: '2 Corinthians 5:21', text: 'God made him who had no sin...', theme: 'Sin-Bearer' }
      ]
    };

    const key = `${book}-${chapter}-${verse}`;
    return relatedPassages[key] || [];
  };

  const commentators = [
    { id: 'matthew-henry', name: 'Matthew Henry', period: '1662-1714' },
    { id: 'john-calvin', name: 'John Calvin', period: '1509-1564' },
    { id: 'spurgeon', name: 'Charles Spurgeon', period: '1834-1892' }
  ];

  const tabs = [
    { id: 'commentary', label: 'Commentary', icon: 'BookOpen' },
    { id: 'context', label: 'Historical Context', icon: 'Clock' },
    { id: 'related', label: 'Related Passages', icon: 'Link' }
  ];

  if (!selectedBook || !selectedChapter) {
    return (
      <div className="h-full flex items-center justify-center bg-surface border-l border-subtle">
        <div className="text-center p-6">
          <Icon name="MessageSquare" size={64} className="text-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Commentary & Insights
          </h3>
          <p className="text-text-secondary font-body">
            Select a passage to view theological commentary and historical context
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-surface border-l border-subtle">
      {/* Header */}
      <div className="p-4 border-b border-subtle bg-background">
        <h2 className="text-lg font-heading font-semibold text-text-primary mb-3">
          Study Resources
        </h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 bg-muted rounded-lg p-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 text-xs"
            >
              <Icon name={tab.icon} size={14} className="mr-1" />
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'commentary' && (
          <div className="p-4">
            {/* Commentator Selection */}
            <div className="mb-4">
              <label className="block text-sm font-body font-semibold text-text-primary mb-2">
                Select Commentator
              </label>
              <select
                value={selectedCommentator}
                onChange={(e) => setSelectedCommentator(e.target.value)}
                className="w-full p-2 border border-subtle rounded-lg bg-background text-sm font-body"
              >
                {commentators.map((commentator) => (
                  <option key={commentator.id} value={commentator.id}>
                    {commentator.name} ({commentator.period})
                  </option>
                ))}
              </select>
            </div>

            {/* Commentary Content */}
            <div className="bg-background rounded-lg p-4 border border-subtle">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="User" size={16} className="text-primary" />
                <span className="font-body font-semibold text-text-primary">
                  {commentators.find(c => c.id === selectedCommentator)?.name}
                </span>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-text-primary font-body leading-relaxed">
                  {getCommentaryData(selectedBook, selectedChapter, selectedVerse)}
                </p>
              </div>

              {selectedVerse && (
                <div className="mt-4 p-3 bg-primary-50 rounded-lg border border-primary-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Target" size={14} className="text-primary" />
                    <span className="text-sm font-body font-semibold text-primary">
                      Focused on verse {selectedVerse}
                    </span>
                  </div>
                  <p className="text-sm text-primary-700 font-body">
                    This commentary specifically addresses the theological significance and practical application of this verse.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'context' && (
          <div className="p-4">
            <div className="bg-background rounded-lg p-4 border border-subtle">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Clock" size={16} className="text-secondary" />
                <span className="font-body font-semibold text-text-primary">
                  Historical Context
                </span>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-text-primary font-body leading-relaxed">
                  {getHistoricalContext(selectedBook, selectedChapter)}
                </p>
              </div>

              {/* Timeline */}
              <div className="mt-4 p-3 bg-secondary-50 rounded-lg border border-secondary-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Calendar" size={14} className="text-secondary" />
                  <span className="text-sm font-body font-semibold text-secondary">
                    Key Dates & Events
                  </span>
                </div>
                <div className="text-sm text-secondary-700 font-body space-y-1">
                  <div>• Written: ~1400-1450 BC (estimated)</div>
                  <div>• Historical Period: Post-Exodus</div>
                  <div>• Cultural Context: Ancient Near East</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'related' && (
          <div className="p-4">
            <div className="bg-background rounded-lg p-4 border border-subtle">
              <div className="flex items-center space-x-2 mb-3">
                <Icon name="Link" size={16} className="text-accent" />
                <span className="font-body font-semibold text-text-primary">
                  Related Passages
                </span>
              </div>

              {getRelatedPassages(selectedBook, selectedChapter, selectedVerse).length > 0 ? (
                <div className="space-y-3">
                  {getRelatedPassages(selectedBook, selectedChapter, selectedVerse).map((passage, index) => (
                    <div key={index} className="p-3 bg-accent-50 rounded-lg border border-accent-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body font-semibold text-accent-700">
                          {passage.reference}
                        </span>
                        <Button variant="ghost" size="sm" className="text-xs text-accent-600">
                          <Icon name="ExternalLink" size={12} className="mr-1" />
                          View
                        </Button>
                      </div>
                      <p className="text-sm text-accent-700 font-body mb-2">
                        {passage.text}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Icon name="Tag" size={12} className="text-accent-500" />
                        <span className="text-xs font-caption text-accent-600">
                          {passage.theme}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Icon name="Search" size={32} className="text-text-muted mx-auto mb-2" />
                  <p className="text-text-secondary font-body">
                    No related passages found for this selection
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-subtle bg-background">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="BookmarkPlus" size={14} className="mr-1" />
            Save Study
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="Share" size={14} className="mr-1" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentaryPanel;