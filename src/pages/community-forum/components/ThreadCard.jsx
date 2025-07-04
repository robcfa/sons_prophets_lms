import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ThreadCard = ({ thread, onThreadClick, onUpvote, onBookmark, onShare }) => {
  const formatTimeAgo = (date) => {
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
    const colors = {
      'general': 'bg-secondary-100 text-secondary-700',
      'biblical-interpretation': 'bg-primary-100 text-primary-700',
      'prayer-requests': 'bg-accent-100 text-accent-700',
      'study-groups': 'bg-success-100 text-success-700'
    };
    return colors[category] || 'bg-text-muted text-white';
  };

  return (
    <div 
      className="bg-card border border-subtle rounded-lg p-4 hover:shadow-soft-md transition-contemplative cursor-pointer group"
      onClick={() => onThreadClick(thread.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <Image
            src={thread.author.avatar}
            alt={thread.author.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="font-heading font-heading-semibold text-text-primary group-hover:text-primary transition-color line-clamp-1">
                {thread.title}
              </h3>
              {thread.isPinned && (
                <Icon name="Pin" size={14} className="text-accent flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm font-body text-text-secondary">
                {thread.author.name}
              </span>
              <span className="text-xs text-text-muted">•</span>
              <span className="text-xs font-caption text-text-muted">
                {formatTimeAgo(thread.createdAt)}
              </span>
              <span className={`text-xs font-caption px-2 py-1 rounded-full ${getCategoryColor(thread.category)}`}>
                {thread.categoryName}
              </span>
            </div>
          </div>
        </div>
        
        {thread.hasNewActivity && (
          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></div>
        )}
      </div>

      {/* Content Preview */}
      <div className="mb-3">
        <p className="text-sm font-body text-text-secondary line-clamp-2">
          {thread.excerpt}
        </p>
        
        {thread.recentReplies && thread.recentReplies.length > 0 && (
          <div className="mt-2 pl-4 border-l-2 border-primary-100">
            <p className="text-xs font-caption text-text-muted mb-1">Recent reply:</p>
            <p className="text-sm font-body text-text-secondary line-clamp-1">
              "{thread.recentReplies[0].content}"
            </p>
            <p className="text-xs font-caption text-text-muted mt-1">
              by {thread.recentReplies[0].author} • {formatTimeAgo(thread.recentReplies[0].createdAt)}
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
              {thread.replyCount}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={16} className="text-text-secondary" />
            <span className="text-sm font-data text-text-secondary">
              {thread.viewCount}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={16} className="text-text-secondary" />
            <span className="text-sm font-data text-text-secondary">
              {thread.participantCount}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpvote(thread.id);
            }}
            className={`flex items-center space-x-1 px-2 py-1 rounded transition-color ${
              thread.isUpvoted 
                ? 'bg-primary-100 text-primary' :'hover:bg-primary-50 text-text-secondary hover:text-primary'
            }`}
          >
            <Icon name="ChevronUp" size={16} />
            <span className="text-sm font-data">{thread.upvotes}</span>
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark(thread.id);
            }}
            className={`p-1 rounded transition-color ${
              thread.isBookmarked 
                ? 'text-accent' :'text-text-secondary hover:text-accent'
            }`}
          >
            <Icon name={thread.isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare(thread.id);
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