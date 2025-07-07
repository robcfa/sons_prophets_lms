import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { safeProp, safeArray, safeGet } from '../../../utils/safeObjectUtils';

const ThreadCard = ({ thread = {}, onThreadClick, onUpvote, onBookmark, onShare }) => {
  const formatTimeAgo = (date) => {
    if (!date) return 'Unknown time';
    
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  const getCategoryColor = (category) => {
    if (!category) return 'bg-text-muted text-white';
    
    const colors = {
      'general': 'bg-secondary-100 text-secondary-700',
      'biblical-interpretation': 'bg-primary-100 text-primary-700',
      'prayer-requests': 'bg-accent-100 text-accent-700',
      'study-groups': 'bg-success-100 text-success-700'
    };
    return colors[category] || 'bg-text-muted text-white';
  };

  const threadId = safeProp(thread, 'id');
  const title = safeProp(thread, 'title', 'Untitled Thread');
  const excerpt = safeProp(thread, 'excerpt', 'No preview available');
  const createdAt = safeProp(thread, 'createdAt');
  const category = safeProp(thread, 'category', 'general');
  const categoryName = safeProp(thread, 'categoryName', 'General');
  const isPinned = safeProp(thread, 'isPinned', false);
  const hasNewActivity = safeProp(thread, 'hasNewActivity', false);
  const replyCount = safeProp(thread, 'replyCount', 0);
  const viewCount = safeProp(thread, 'viewCount', 0);
  const participantCount = safeProp(thread, 'participantCount', 0);
  const upvotes = safeProp(thread, 'upvotes', 0);
  const isUpvoted = safeProp(thread, 'isUpvoted', false);
  const isBookmarked = safeProp(thread, 'isBookmarked', false);

  // Safe access to author object
  const author = safeGet(thread, 'author', {});
  const authorName = safeProp(author, 'name', 'Anonymous');
  const authorAvatar = safeProp(author, 'avatar', '/assets/images/no_image.png');

  // Safe access to recent replies
  const recentReplies = safeArray(thread?.recentReplies);
  const hasRecentReplies = recentReplies.length > 0;

  return (
    <div 
      className="bg-card border border-subtle rounded-lg p-4 hover:shadow-soft-md transition-contemplative cursor-pointer group"
      onClick={() => onThreadClick?.(threadId)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Image
            src={authorAvatar}
            alt={authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-heading font-heading-semibold text-text-primary group-hover:text-primary transition-color line-clamp-1">
                {title}
              </h3>
              {isPinned && (
                <Icon name="Pin" size={14} className="text-accent flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm font-body text-text-secondary">
                {authorName}
              </span>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs font-caption text-text-muted">
                {formatTimeAgo(createdAt)}
              </span>
              <span className={`text-xs font-caption px-2 py-1 rounded-full ${getCategoryColor(category)}`}>
                {categoryName}
              </span>
            </div>
          </div>
        </div>
        
        {hasNewActivity && (
          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
        )}
      </div>

      {/* Content Preview */}
      <div className="mb-3">
        <p className="text-sm font-body text-text-secondary line-clamp-2">
          {excerpt}
        </p>
        
        {hasRecentReplies && (
          <div className="mt-2 pl-4 border-l-2 border-primary-100">
            <p className="text-xs font-caption text-text-muted mb-1">Recent reply:</p>
            <p className="text-sm font-body text-text-secondary line-clamp-1">
              "{safeProp(recentReplies[0], 'content', 'No content')}"
            </p>
            <p className="text-xs font-caption text-text-muted mt-1">
              by {safeProp(recentReplies[0], 'author', 'Anonymous')} • {formatTimeAgo(safeProp(recentReplies[0], 'createdAt'))}
            </p>
          </div>
        )}
      </div>

      {/* Stats and Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="MessageCircle" size={16} className="text-text-secondary" />
            <span className="text-sm font-data text-text-secondary">
              {replyCount}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} className="text-text-secondary" />
            <span className="text-sm font-data text-text-secondary">
              {viewCount}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <span className="text-sm font-data text-text-secondary">
              {participantCount}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpvote?.(threadId);
            }}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-color ${
              isUpvoted 
                ? 'bg-primary-100 text-primary' :'hover:bg-primary-50 text-text-secondary hover:text-primary'
            }`}
          >
            <Icon name="ChevronUp" size={16} />
            <span className="text-sm font-data">{upvotes}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.(threadId);
            }}
            className={`p-1 rounded transition-color ${
              isBookmarked 
                ? 'text-accent' :'text-text-secondary hover:text-accent'
            }`}
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare?.(threadId);
            }}
            className="p-1 rounded text-text-secondary hover:text-primary transition-color"
          >
            <Icon name="Share2" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreadCard;