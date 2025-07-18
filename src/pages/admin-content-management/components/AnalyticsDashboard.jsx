import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { safeGet, safeMap } from '../../../utils/safeObjectUtils';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [analyticsData, setAnalyticsData] = useState({
    overview: {},
    userActivity: [],
    courseEngagement: [],
    userRoles: [],
    deviceTypes: [],
    topContent: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock analytics data with safe defaults
    const mockData = {
      overview: {
        totalUsers: 1247,
        activeUsers: 892,
        totalCourses: 24,
        completionRate: 73.5,
        avgSessionTime: '24:35',
        totalXPAwarded: 125000
      },
      userActivity: [
        { date: '2024-01-01', users: 45, sessions: 78, pageViews: 234 },
        { date: '2024-01-02', users: 52, sessions: 89, pageViews: 267 },
        { date: '2024-01-03', users: 48, sessions: 82, pageViews: 245 },
        { date: '2024-01-04', users: 61, sessions: 95, pageViews: 289 },
        { date: '2024-01-05', users: 58, sessions: 91, pageViews: 276 },
        { date: '2024-01-06', users: 67, sessions: 103, pageViews: 312 },
        { date: '2024-01-07', users: 72, sessions: 108, pageViews: 334 }
      ],
      courseEngagement: [
        { course: 'OT Prophecy Intro', enrollments: 156, completions: 89, avgProgress: 67 },
        { course: 'Isaiah Study', enrollments: 134, completions: 78, avgProgress: 58 },
        { course: 'Ezekiel & Daniel', enrollments: 89, completions: 52, avgProgress: 45 },
        { course: 'Minor Prophets', enrollments: 234, completions: 145, avgProgress: 72 },
        { course: 'Prophetic Literature', enrollments: 98, completions: 61, avgProgress: 63 }
      ],
      userRoles: [
        { name: 'Learners', value: 1089, color: '#8B4513' },
        { name: 'Coaches', value: 134, color: '#CD853F' },
        { name: 'Admins', value: 24, color: '#2F4F4F' }
      ],
      deviceTypes: [
        { name: 'Desktop', value: 65, color: '#8B4513' },
        { name: 'Mobile', value: 28, color: '#CD853F' },
        { name: 'Tablet', value: 7, color: '#2F4F4F' }
      ],
      topContent: [
        { title: 'Introduction to Prophecy', views: 1234, engagement: 89 },
        { title: 'Isaiah Chapter 53', views: 987, engagement: 92 },
        { title: 'Daniel\'s Visions', views: 876, engagement: 85 },
        { title: 'Prophetic Timeline', views: 765, engagement: 78 },
        { title: 'Hebrew Pronunciation', views: 654, engagement: 81 }
      ]
    };
    
    setAnalyticsData(mockData);
    setLoading(false);
  }, [timeRange]);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const StatCard = ({ title, value, change, icon, color = 'primary' }) => (
    <div className="bg-card border border-subtle rounded-lg p-6 hover:shadow-soft-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={24} className={`text-${color}-600`} />
        </div>
        {change && (
          <div className={`flex items-center gap-1 text-sm ${
            change > 0 ? 'text-success-600' : 'text-error-600'
          }`}>
            <Icon name={change > 0 ? 'TrendingUp' : 'TrendingDown'} size={16} />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-heading font-heading-semibold text-text-primary mb-1">
          {value}
        </h3>
        <p className="text-text-secondary text-sm">{title}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Safe access to analytics data with defaults
  const overview = safeGet(analyticsData, 'overview', {});
  const userActivity = safeGet(analyticsData, 'userActivity', []);
  const courseEngagement = safeGet(analyticsData, 'courseEngagement', []);
  const userRoles = safeGet(analyticsData, 'userRoles', []);
  const deviceTypes = safeGet(analyticsData, 'deviceTypes', []);
  const topContent = safeGet(analyticsData, 'topContent', []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="font-heading font-heading-semibold text-text-primary text-xl">
            Analytics Dashboard
          </h2>
          <p className="text-text-secondary">
            Platform performance and user engagement metrics
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <Button variant="secondary" iconName="Download">
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          title="Total Users"
          value={formatNumber(safeGet(overview, 'totalUsers', 0))}
          change={12}
          icon="Users"
          color="primary"
        />
        <StatCard
          title="Active Users"
          value={formatNumber(safeGet(overview, 'activeUsers', 0))}
          change={8}
          icon="UserCheck"
          color="success"
        />
        <StatCard
          title="Total Courses"
          value={safeGet(overview, 'totalCourses', 0)}
          change={5}
          icon="BookOpen"
          color="accent"
        />
        <StatCard
          title="Completion Rate"
          value={`${safeGet(overview, 'completionRate', 0)}%`}
          change={3}
          icon="Target"
          color="secondary"
        />
        <StatCard
          title="Avg Session"
          value={safeGet(overview, 'avgSessionTime', '0:00')}
          change={-2}
          icon="Clock"
          color="warning"
        />
        <StatCard
          title="Total XP"
          value={formatNumber(safeGet(overview, 'totalXPAwarded', 0))}
          change={15}
          icon="Zap"
          color="primary"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Activity Chart */}
        <div className="bg-card border border-subtle rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading font-heading-semibold text-text-primary">
              User Activity
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span className="text-sm text-text-secondary">Users</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span className="text-sm text-text-secondary">Sessions</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6B6B6B"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#6B6B6B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E5E5', 
                    borderRadius: '8px' 
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="users" 
                  stackId="1" 
                  stroke="#8B4513" 
                  fill="#8B4513" 
                  fillOpacity={0.3}
                />
                <Area 
                  type="monotone" 
                  dataKey="sessions" 
                  stackId="2" 
                  stroke="#CD853F" 
                  fill="#CD853F" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Engagement Chart */}
        <div className="bg-card border border-subtle rounded-lg p-6">
          <h3 className="font-heading font-heading-semibold text-text-primary mb-6">
            Course Engagement
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseEngagement}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis 
                  dataKey="course" 
                  stroke="#6B6B6B"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis stroke="#6B6B6B" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E5E5', 
                    borderRadius: '8px' 
                  }}
                />
                <Bar dataKey="enrollments" fill="#8B4513" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completions" fill="#CD853F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Roles Pie Chart */}
        <div className="bg-card border border-subtle rounded-lg p-6">
          <h3 className="font-heading font-heading-semibold text-text-primary mb-6">
            User Roles
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userRoles}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {safeMap(userRoles, (entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color || '#8B4513'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {safeMap(userRoles, (role, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: safeGet(role, 'color', '#8B4513') }}
                  ></div>
                  <span className="text-sm text-text-secondary">{safeGet(role, 'name', '')}</span>
                </div>
                <span className="text-sm font-body-semibold text-text-primary">
                  {safeGet(role, 'value', 0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Types */}
        <div className="bg-card border border-subtle rounded-lg p-6">
          <h3 className="font-heading font-heading-semibold text-text-primary mb-6">
            Device Types
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {safeMap(deviceTypes, (entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color || '#8B4513'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Content */}
        <div className="bg-card border border-subtle rounded-lg p-6">
          <h3 className="font-heading font-heading-semibold text-text-primary mb-6">
            Top Content
          </h3>
          <div className="space-y-4">
            {safeMap(topContent, (content, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body-semibold text-text-primary truncate">
                    {safeGet(content, 'title', '')}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-secondary">
                    <span>{safeGet(content, 'views', 0)} views</span>
                    <span>{safeGet(content, 'engagement', 0)}% engagement</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-heading font-heading-semibold text-primary">
                    #{index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;