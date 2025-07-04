import React from 'react';
import Icon from '../../../components/AppIcon';

const CoachingStats = () => {
  const stats = [
    {
      id: 1,
      title: "Total Learners",
      value: 24,
      change: "+3",
      changeType: "increase",
      icon: "Users",
      color: "primary"
    },
    {
      id: 2,
      title: "Average Progress",
      value: "78%",
      change: "+5%",
      changeType: "increase",
      icon: "TrendingUp",
      color: "success"
    },
    {
      id: 3,
      title: "Completed Courses",
      value: 12,
      change: "+2",
      changeType: "increase",
      icon: "BookOpen",
      color: "accent"
    },
    {
      id: 4,
      title: "Active Discussions",
      value: 8,
      change: "-1",
      changeType: "decrease",
      icon: "MessageCircle",
      color: "secondary"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      primary: "bg-primary-50 text-primary border-primary-200",
      success: "bg-success-50 text-success border-success-200",
      accent: "bg-accent-50 text-accent border-accent-200",
      secondary: "bg-secondary-50 text-secondary border-secondary-200"
    };
    return colorMap[color] || colorMap.primary;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-card rounded-lg border border-subtle p-6 hover-lift"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
              <Icon name={stat.icon} size={24} />
            </div>
            <div className={`flex items-center text-sm font-data ${
              stat.changeType === 'increase' ?'text-success' :'text-error'
            }`}>
              <Icon 
                name={stat.changeType === 'increase' ? 'ArrowUp' : 'ArrowDown'} 
                size={16} 
                className="mr-1" 
              />
              {stat.change}
            </div>
          </div>
          
          <div>
            <p className="text-2xl font-heading font-bold text-text-primary mb-1">
              {stat.value}
            </p>
            <p className="text-sm font-body text-text-secondary">
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CoachingStats;