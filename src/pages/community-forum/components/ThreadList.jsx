import React, { useState, useEffect, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import ThreadCard from './ThreadCard';

const ThreadList = ({ 
  threads, 
  loading, 
  hasMore, 
  onLoadMore, 
  onThreadClick, 
  onThreadAction,
  emptyStateMessage = "No discussions found"
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef();
  const lastThreadRef = useRef();

  // Infinite scroll implementation
  const lastThreadElementRef = useCallback(node => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingMore) {
        setLoadingMore(true);
        onLoadMore().finally(() => setLoadingMore(false));
      }
    });
    
    if (node) observerRef.current.observe(node);
  }, [loading, hasMore, loadingMore, onLoadMore]);

  const handleThreadAction = (action, threadId, data = null) => {
    onThreadAction(action, threadId, data);
  };

  if (loading && threads.length === 0) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-card border border-subtle rounded-lg p-4 animate-pulse">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-surface rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface rounded w-3/4"></div>
                <div className="h-3 bg-surface rounded w-1/2"></div>
                <div className="h-3 bg-surface rounded w-full"></div>
                <div className="h-3 bg-surface rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="MessageSquare" size={48} className="text-text-muted mx-auto mb-4" />
        <h3 className="text-lg font-heading font-heading-semibold text-text-primary mb-2">
          No Discussions Yet
        </h3>
        <p className="text-text-secondary font-body mb-6">
          {emptyStateMessage}
        </p>
        <div className="text-sm font-body text-text-muted">
          Be the first to start a meaningful conversation!
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {threads.map((thread, index) => {
        const isLast = index === threads.length - 1;
        
        return (
          <div
            key={thread.id}
            ref={isLast ? lastThreadElementRef : null}
          >
            <ThreadCard
              thread={thread}
              onThreadClick={onThreadClick}
              onUpvote={(threadId) => handleThreadAction('upvote', threadId)}
              onBookmark={(threadId) => handleThreadAction('bookmark', threadId)}
              onShare={(threadId) => handleThreadAction('share', threadId)}
            />
          </div>
        );
      })}
      
      {/* Loading More Indicator */}
      {loadingMore && (
        <div className="flex items-center justify-center py-6">
          <div className="flex items-center space-x-2">
            <Icon name="Loader2" size={20} className="animate-spin text-primary" />
            <span className="text-sm font-body text-text-secondary">
              Loading more discussions...
            </span>
          </div>
        </div>
      )}
      
      {/* End of Results */}
      {!hasMore && threads.length > 0 && (
        <div className="text-center py-6">
          <div className="inline-flex items-center space-x-2 text-text-muted">
            <Icon name="CheckCircle" size={16} />
            <span className="text-sm font-body">
              You've reached the end of discussions
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadList;