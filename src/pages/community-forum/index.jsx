import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { safeGet } from '../../utils/safeObjectUtils';

import CategoryFilter from './components/CategoryFilter';
import SortingControls from './components/SortingControls';
import NewDiscussionFAB from './components/NewDiscussionFAB';
import AIDiscussionSpark from './components/AIDiscussionSpark';
import TrendingTopics from './components/TrendingTopics';
import ThreadList from './components/ThreadList';
import LiveActivityFeed from './components/LiveActivityFeed';

const CommunityForum = () => {
  const navigate = useNavigate();
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAISpark, setShowAISpark] = useState(true);
  const [page, setPage] = useState(1);

  const categories = [
    { id: 'all', name: 'All Discussions', icon: 'MessageSquare' },
    { id: 'general', name: 'General Discussion', icon: 'MessageCircle' },
    { id: 'biblical-interpretation', name: 'Biblical Interpretation', icon: 'Book' },
    { id: 'prayer-requests', name: 'Prayer Requests', icon: 'Heart' },
    { id: 'study-groups', name: 'Study Groups', icon: 'Users' }
  ];

  const trendingTopics = [
    { id: 1, name: 'Messianic Prophecies', tag: 'messiah', discussionCount: 24, trend: 15 },
    { id: 2, name: 'Book of Daniel', tag: 'daniel', discussionCount: 18, trend: 8 },
    { id: 3, name: 'Isaiah Commentary', tag: 'isaiah', discussionCount: 31, trend: -3 },
    { id: 4, name: 'Prophetic Symbolism', tag: 'symbolism', discussionCount: 12, trend: 22 },
    { id: 5, name: 'End Times Prophecy', tag: 'eschatology', discussionCount: 27, trend: 5 }
  ];

  useEffect(() => {
    loadInitialThreads();
  }, []);

  useEffect(() => {
    filterAndSortThreads();
  }, [threads, activeCategory, sortBy, searchQuery]);

  const loadInitialThreads = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockThreads = [
        {
          id: 1,
          title: "Understanding the Messianic Prophecies in Isaiah 53",
          excerpt: "I've been studying Isaiah 53 and I'm fascinated by how it points to the Messiah. The description of the suffering servant seems so clearly to describe Jesus, yet it was written centuries before His birth. How do we reconcile this with historical-critical approaches that suggest different interpretations?",
          author: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
            role: "Student"
          },
          category: "biblical-interpretation",
          categoryName: "Biblical Interpretation",
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
          lastActivity: new Date(Date.now() - 30 * 60 * 1000),
          replyCount: 12,
          viewCount: 89,
          participantCount: 8,
          upvotes: 15,
          isUpvoted: false,
          isBookmarked: true,
          isPinned: true,
          hasNewActivity: true,
          topics: ['messiah', 'isaiah', 'prophecy'],
          recentReplies: [
            {
              author: "Dr. Michael Chen",
              content: "The Hebrew text uses very specific language that creates a prophetic portrait...",
              createdAt: new Date(Date.now() - 30 * 60 * 1000)
            }
          ]
        },
        {
          id: 2,
          title: "Prayer Request: Guidance in Understanding Ezekiel\'s Visions",
          excerpt: "Brothers and sisters, I\'m struggling to understand the symbolic visions in Ezekiel, particularly the valley of dry bones and the temple vision. I feel like there are layers of meaning I\'m missing. Would appreciate your prayers and any insights you might have.",
          author: {
            name: "David Martinez",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            role: "Learner"
          },
          category: "prayer-requests",
          categoryName: "Prayer Requests",
          createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
          lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
          replyCount: 8,
          viewCount: 45,
          participantCount: 6,
          upvotes: 9,
          isUpvoted: true,
          isBookmarked: false,
          isPinned: false,
          hasNewActivity: false,
          topics: ['ezekiel', 'vision', 'prayer'],
          recentReplies: [
            {
              author: "Rachel Thompson",
              content: "Praying for you, David. The valley of dry bones represents...",
              createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
            }
          ]
        },
        {
          id: 3,
          title: "Study Group: Daniel\'s 70 Weeks Prophecy - Weekly Discussion",
          excerpt: "Join our weekly study group as we dive deep into Daniel's prophecy of the 70 weeks. This week we're focusing on the historical context and different interpretative approaches. All levels welcome!",
          author: {
            name: "Pastor James Wilson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            role: "Coach"
          },
          category: "study-groups",
          categoryName: "Study Groups",
          createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
          lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
          replyCount: 15,
          viewCount: 67,
          participantCount: 12,
          upvotes: 22,
          isUpvoted: false,
          isBookmarked: false,
          isPinned: false,
          hasNewActivity: true,
          topics: ['daniel', 'prophecy', 'study-group'],
          recentReplies: [
            {
              author: "Emily Rodriguez",
              content: "The chronological calculations are fascinating when you consider...",
              createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
            }
          ]
        },
        {
          id: 4,
          title: "The Role of Suffering in Prophetic Literature",
          excerpt: "I\'ve been reflecting on how suffering is portrayed throughout the prophetic books - from Jeremiah\'s lamentations to the suffering servant in Isaiah. What theological insights can we draw about the purpose and meaning of suffering from these texts?",
          author: {
            name: "Dr. Lisa Anderson",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            role: "Coach"
          },
          category: "biblical-interpretation",
          categoryName: "Biblical Interpretation",
          createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
          lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000),
          replyCount: 18,
          viewCount: 134,
          participantCount: 11,
          upvotes: 28,
          isUpvoted: true,
          isBookmarked: true,
          isPinned: false,
          hasNewActivity: false,
          topics: ['suffering', 'jeremiah', 'isaiah'],
          recentReplies: [
            {
              author: "Thomas Kim",
              content: "The connection between suffering and redemption is central to...",
              createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
            }
          ]
        },
        {
          id: 5,
          title: "Beginner Question: How to Approach Symbolic Language in Prophecy",
          excerpt: "I'm new to studying the prophetic books and I'm often confused by the symbolic language. How do I know when something should be interpreted literally versus symbolically? Are there principles or guidelines that can help?",
          author: {
            name: "Maria Gonzalez",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
            role: "Learner"
          },
          category: "general",
          categoryName: "General Discussion",
          createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
          lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
          replyCount: 24,
          viewCount: 156,
          participantCount: 15,
          upvotes: 31,
          isUpvoted: false,
          isBookmarked: false,
          isPinned: false,
          hasNewActivity: true,
          topics: ['symbolism', 'interpretation', 'beginner'],
          recentReplies: [
            {
              author: "Dr. Robert Chang",
              content: "Great question! The key is understanding the literary context and...",
              createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000)
            }
          ]
        }
      ];
      
      setThreads(mockThreads);
      setHasMore(true);
    } catch (error) {
      console.error('Error loading threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreThreads = async () => {
    try {
      // Simulate API call for pagination
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newThreads = [
        {
          id: threads.length + 1,
          title: "The Covenant Themes in Jeremiah",
          excerpt: "Exploring how Jeremiah presents both the broken covenant and the promise of a new covenant...",
          author: {
            name: "John Smith",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
            role: "Student"
          },
          category: "biblical-interpretation",
          categoryName: "Biblical Interpretation",
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
          replyCount: 7,
          viewCount: 42,
          participantCount: 5,
          upvotes: 12,
          isUpvoted: false,
          isBookmarked: false,
          isPinned: false,
          hasNewActivity: false,
          topics: ['jeremiah', 'covenant', 'theology'],
          recentReplies: []
        }
      ];
      
      setThreads(prev => [...prev, ...newThreads]);
      setPage(prev => prev + 1);
      
      // Simulate end of results after a few pages
      if (page >= 3) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more threads:', error);
    }
  };

  const filterAndSortThreads = () => {
    let filtered = threads || [];

    // Filter by category with safe access
    if (activeCategory !== 'all') {
      filtered = filtered.filter(thread => {
        const threadCategory = safeGet(thread, 'category', '');
        return threadCategory === activeCategory;
      });
    }

    // Filter by search query with safe access
    if (searchQuery?.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(thread => {
        const title = safeGet(thread, 'title', '').toLowerCase();
        const excerpt = safeGet(thread, 'excerpt', '').toLowerCase();
        const authorName = safeGet(thread, 'author.name', '').toLowerCase();
        const topics = safeGet(thread, 'topics', []);
        
        return title.includes(query) || 
               excerpt.includes(query) || 
               authorName.includes(query) ||
               (Array.isArray(topics) && topics.some(topic => 
                 typeof topic === 'string' && topic.toLowerCase().includes(query)
               ));
      });
    }

    // Sort threads with safe property access
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => {
          const dateA = safeGet(a, 'lastActivity');
          const dateB = safeGet(b, 'lastActivity');
          if (!dateA && !dateB) return 0;
          if (!dateA) return 1;
          if (!dateB) return -1;
          return new Date(dateB) - new Date(dateA);
        });
        break;
      case 'popular':
        filtered.sort((a, b) => {
          const upvotesA = safeGet(a, 'upvotes', 0);
          const upvotesB = safeGet(b, 'upvotes', 0);
          return upvotesB - upvotesA;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = safeGet(a, 'createdAt');
          const dateB = safeGet(b, 'createdAt');
          if (!dateA && !dateB) return 0;
          if (!dateA) return 1;
          if (!dateB) return -1;
          return new Date(dateB) - new Date(dateA);
        });
        break;
      default:
        break;
    }

    setFilteredThreads(filtered);
  };

  const getThreadCounts = () => {
    const counts = {};
    (categories || []).forEach(category => {
      if (category?.id === 'all') {
        counts[category.id] = (threads || []).length;
      } else {
        counts[category.id] = (threads || []).filter(thread => 
          safeGet(thread, 'category') === category?.id
        ).length;
      }
    });
    return counts;
  };

  const handleThreadClick = (threadId) => {
    // Navigate to thread detail page
    navigate(`/community-forum/thread/${threadId}`);
  };

  const handleThreadAction = (action, threadId, data = null) => {
    setThreads(prev => prev.map(thread => {
      if (safeGet(thread, 'id') === threadId) {
        switch (action) {
          case 'upvote':
            const isUpvoted = safeGet(thread, 'isUpvoted', false);
            const upvotes = safeGet(thread, 'upvotes', 0);
            return {
              ...thread,
              isUpvoted: !isUpvoted,
              upvotes: isUpvoted ? upvotes - 1 : upvotes + 1
            };
          case 'bookmark':
            return {
              ...thread,
              isBookmarked: !safeGet(thread, 'isBookmarked', false)
            };
          case 'share':
            // Handle share functionality
            const title = safeGet(thread, 'title', '');
            const excerpt = safeGet(thread, 'excerpt', '');
            navigator.share?.({
              title: title,
              text: excerpt,
              url: window.location.origin + `/community-forum/thread/${threadId}`
            });
            return thread;
          default:
            return thread;
        }
      }
      return thread;
    }));
  };

  const handleCreateDiscussion = async (discussionData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newThread = {
        id: Date.now(),
        title: safeGet(discussionData, 'title', 'New Discussion'),
        excerpt: safeGet(discussionData, 'content', '').substring(0, 200) + '...',
        author: {
          name: "Current User",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          role: "Learner"
        },
        category: safeGet(discussionData, 'category', 'general'),
        categoryName: categories.find(c => c.id === safeGet(discussionData, 'category'))?.name || 'General Discussion',
        createdAt: new Date(),
        lastActivity: new Date(),
        replyCount: 0,
        viewCount: 1,
        participantCount: 1,
        upvotes: 0,
        isUpvoted: false,
        isBookmarked: false,
        isPinned: false,
        hasNewActivity: false,
        topics: [],
        recentReplies: []
      };
      
      setThreads(prev => [newThread, ...prev]);
      
      if (safeGet(discussionData, 'isAIGenerated')) {
        setShowAISpark(false);
        setTimeout(() => setShowAISpark(true), 30000); // Show again after 30 seconds
      }
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };

  const handleTopicClick = (tag) => {
    setSearchQuery(tag);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        threadCounts={getThreadCounts()}
      />

      {/* Sorting Controls */}
      <SortingControls
        sortBy={sortBy}
        onSortChange={setSortBy}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Thread List */}
          <div className="lg:col-span-3 space-y-6">
            {/* AI Discussion Spark */}
            <AIDiscussionSpark
              onCreateFromSpark={handleCreateDiscussion}
              isVisible={showAISpark && filteredThreads.length > 0}
            />

            {/* Thread List */}
            <ThreadList
              threads={filteredThreads}
              loading={loading}
              hasMore={hasMore}
              onLoadMore={loadMoreThreads}
              onThreadClick={handleThreadClick}
              onThreadAction={handleThreadAction}
              emptyStateMessage={
                searchQuery 
                  ? `No discussions found for "${searchQuery}"`
                  : activeCategory !== 'all'
                    ? `No discussions in ${categories.find(c => c.id === activeCategory)?.name}`
                    : "No discussions found"
              }
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <TrendingTopics
              topics={trendingTopics}
              onTopicClick={handleTopicClick}
            />

            {/* Live Activity Feed */}
            <LiveActivityFeed isVisible={true} />

            {/* Quick Stats */}
            <div className="bg-card border border-subtle rounded-lg p-4">
              <h3 className="font-heading font-heading-semibold text-text-primary mb-4">
                Community Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Total Discussions</span>
                  <span className="text-sm font-data text-text-primary">{threads.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Active Today</span>
                  <span className="text-sm font-data text-success">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-body text-text-secondary">Total Members</span>
                  <span className="text-sm font-data text-text-primary">1,247</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Discussion FAB */}
      <NewDiscussionFAB onCreateDiscussion={handleCreateDiscussion} />
    </div>
  );
};

export default CommunityForum;