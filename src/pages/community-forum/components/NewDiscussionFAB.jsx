import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NewDiscussionFAB = ({ onCreateDiscussion }) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { id: 'general', name: 'General Discussion', icon: 'MessageSquare' },
    { id: 'biblical-interpretation', name: 'Biblical Interpretation', icon: 'Book' },
    { id: 'prayer-requests', name: 'Prayer Requests', icon: 'Heart' },
    { id: 'study-groups', name: 'Study Groups', icon: 'Users' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;

    setIsSubmitting(true);
    try {
      await onCreateDiscussion(formData);
      setFormData({ title: '', content: '', category: 'general', tags: [] });
      setShowModal(false);
    } catch (error) {
      console.error('Error creating discussion:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-20 md:bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-soft-lg hover:shadow-soft-md hover:scale-105 transition-all duration-200 flex items-center justify-center group"
      >
        <Icon name="Plus" size={24} className="group-hover:rotate-90 transition-transform duration-200" />
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-1000 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg shadow-soft-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-subtle">
              <h2 className="text-xl font-heading font-heading-semibold text-text-primary">
                Start New Discussion
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowModal(false)}
                className="p-2"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
                  Discussion Title *
                </label>
                <Input
                  type="text"
                  placeholder="What would you like to discuss?"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
                  Category *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => handleInputChange('category', category.id)}
                      className={`flex items-center space-x-2 p-3 rounded-lg border transition-color ${
                        formData.category === category.id
                          ? 'border-primary bg-primary-50 text-primary' :'border-subtle hover:border-primary hover:bg-primary-50'
                      }`}
                    >
                      <Icon name={category.icon} size={16} />
                      <span className="text-sm font-body">{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-body font-body-semibold text-text-primary mb-2">
                  Your Message *
                </label>
                <textarea
                  placeholder="Share your thoughts, questions, or insights..."
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  required
                  rows={6}
                  className="w-full px-3 py-2 border border-subtle rounded-lg bg-background text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-color resize-none"
                />
                <p className="text-xs text-text-muted mt-1">
                  Minimum 10 characters required
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-4 pt-4 border-t border-subtle">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Quote" size={16} />
                  <span>Add Bible Verse</span>
                </Button>
                
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Icon name="Image" size={16} />
                  <span>Add Image</span>
                </Button>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowModal(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!formData.title.trim() || !formData.content.trim() || isSubmitting}
                  className="flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={16} />
                      <span>Create Discussion</span>
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NewDiscussionFAB;