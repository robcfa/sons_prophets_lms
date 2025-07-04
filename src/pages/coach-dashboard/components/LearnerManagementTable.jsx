import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LearnerManagementTable = () => {
  const [selectedLearners, setSelectedLearners] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const learners = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      enrolledCourses: 3,
      completedCourses: 1,
      overallProgress: 65,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000),
      currentCourse: "Biblical Hermeneutics",
      courseProgress: 78,
      xpPoints: 1250,
      status: "active"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      email: "michael.rodriguez@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      enrolledCourses: 2,
      completedCourses: 2,
      overallProgress: 92,
      lastActivity: new Date(Date.now() - 30 * 60 * 1000),
      currentCourse: "Old Testament Survey",
      courseProgress: 45,
      xpPoints: 2100,
      status: "active"
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily.chen@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      enrolledCourses: 4,
      completedCourses: 0,
      overallProgress: 34,
      lastActivity: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      currentCourse: "Introduction to Prophecy",
      courseProgress: 23,
      xpPoints: 680,
      status: "inactive"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      enrolledCourses: 1,
      completedCourses: 1,
      overallProgress: 88,
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000),
      currentCourse: "Prophetic Literature",
      courseProgress: 67,
      xpPoints: 1890,
      status: "active"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      enrolledCourses: 2,
      completedCourses: 0,
      overallProgress: 56,
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
      currentCourse: "Biblical Context Studies",
      courseProgress: 89,
      xpPoints: 945,
      status: "active"
    }
  ];

  const formatLastActivity = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'text-success' : 'text-warning';
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-success';
    if (progress >= 60) return 'bg-accent';
    if (progress >= 40) return 'bg-warning';
    return 'bg-error';
  };

  const handleSelectLearner = (learnerId) => {
    setSelectedLearners(prev => 
      prev.includes(learnerId)
        ? prev.filter(id => id !== learnerId)
        : [...prev, learnerId]
    );
  };

  const handleSelectAll = () => {
    setSelectedLearners(
      selectedLearners.length === learners.length 
        ? [] 
        : learners.map(learner => learner.id)
    );
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="bg-card rounded-lg border border-subtle overflow-hidden">
      <div className="p-6 border-b border-subtle">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-bold text-text-primary">
            Learner Management
          </h3>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Icon name="Filter" size={16} className="mr-2" />
              Filter
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Export
            </Button>
            <Button variant="primary" size="sm">
              <Icon name="Plus" size={16} className="mr-2" />
              Add Learner
            </Button>
          </div>
        </div>

        {selectedLearners.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-primary-50 rounded-lg mb-4">
            <span className="text-sm font-body text-primary">
              {selectedLearners.length} learner{selectedLearners.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Icon name="Mail" size={16} className="mr-2" />
                Send Message
              </Button>
              <Button variant="ghost" size="sm">
                <Icon name="Calendar" size={16} className="mr-2" />
                Schedule Session
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedLearners.length === learners.length}
                  onChange={handleSelectAll}
                  className="rounded border-subtle"
                />
              </th>
              <th 
                className="p-4 text-left cursor-pointer hover:bg-primary-50 transition-color"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-body font-semibold text-text-primary">
                    Learner
                  </span>
                  <Icon name="ArrowUpDown" size={14} className="text-text-muted" />
                </div>
              </th>
              <th 
                className="p-4 text-left cursor-pointer hover:bg-primary-50 transition-color"
                onClick={() => handleSort('overallProgress')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-body font-semibold text-text-primary">
                    Overall Progress
                  </span>
                  <Icon name="ArrowUpDown" size={14} className="text-text-muted" />
                </div>
              </th>
              <th className="p-4 text-left">
                <span className="text-sm font-body font-semibold text-text-primary">
                  Current Course
                </span>
              </th>
              <th 
                className="p-4 text-left cursor-pointer hover:bg-primary-50 transition-color"
                onClick={() => handleSort('lastActivity')}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-body font-semibold text-text-primary">
                    Last Activity
                  </span>
                  <Icon name="ArrowUpDown" size={14} className="text-text-muted" />
                </div>
              </th>
              <th className="p-4 text-left">
                <span className="text-sm font-body font-semibold text-text-primary">
                  Actions
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-subtle">
            {learners.map((learner) => (
              <tr key={learner.id} className="hover:bg-surface transition-color">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedLearners.includes(learner.id)}
                    onChange={() => handleSelectLearner(learner.id)}
                    className="rounded border-subtle"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={learner.avatar}
                      alt={learner.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-body font-semibold text-text-primary">
                        {learner.name}
                      </p>
                      <p className="text-sm font-caption text-text-secondary">
                        {learner.email}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-xs font-caption ${getStatusColor(learner.status)}`}>
                          {learner.status}
                        </span>
                        <span className="text-xs font-data text-text-muted">
                          {learner.xpPoints} XP
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-data text-text-primary">
                        {learner.overallProgress}%
                      </span>
                      <span className="text-xs font-caption text-text-secondary">
                        {learner.completedCourses}/{learner.enrolledCourses} courses
                      </span>
                    </div>
                    <div className="w-full bg-surface rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getProgressColor(learner.overallProgress)}`}
                        style={{ width: `${learner.overallProgress}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <p className="text-sm font-body text-text-primary">
                      {learner.currentCourse}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="w-16 bg-surface rounded-full h-1">
                        <div
                          className={`h-1 rounded-full ${getProgressColor(learner.courseProgress)}`}
                          style={{ width: `${learner.courseProgress}%` }}
                        />
                      </div>
                      <span className="text-xs font-data text-text-secondary">
                        {learner.courseProgress}%
                      </span>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-caption text-text-secondary">
                    {formatLastActivity(learner.lastActivity)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Icon name="Mail" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="Calendar" size={16} />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LearnerManagementTable;