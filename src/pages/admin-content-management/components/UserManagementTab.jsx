import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementTab = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Mock user data
    const mockUsers = [
      {
        id: 'user-1',
        name: 'Sarah Johnson',
        email: 'sarah.johnson@email.com',
        role: 'learner',
        status: 'active',
        joinDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
        coursesEnrolled: 3,
        coursesCompleted: 1,
        totalXP: 1250,
        avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
      },
      {
        id: 'user-2',
        name: 'Michael Thompson',
        email: 'michael.thompson@email.com',
        role: 'coach',
        status: 'active',
        joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
        lastActive: new Date(Date.now() - 30 * 60 * 1000),
        coursesEnrolled: 0,
        coursesCompleted: 0,
        studentsCoached: 25,
        totalXP: 3500,
        avatar: 'https://randomuser.me/api/portraits/men/2.jpg'
      },
      {
        id: 'user-3',
        name: 'Rachel Cohen',
        email: 'rachel.cohen@email.com',
        role: 'learner',
        status: 'inactive',
        joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
        lastActive: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        coursesEnrolled: 2,
        coursesCompleted: 0,
        totalXP: 450,
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
      },
      {
        id: 'user-4',
        name: 'David Williams',
        email: 'david.williams@email.com',
        role: 'admin',
        status: 'active',
        joinDate: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        lastActive: new Date(Date.now() - 5 * 60 * 1000),
        coursesEnrolled: 0,
        coursesCompleted: 0,
        coursesCreated: 12,
        totalXP: 5000,
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg'
      },
      {
        id: 'user-5',
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        role: 'learner',
        status: 'active',
        joinDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000),
        coursesEnrolled: 1,
        coursesCompleted: 0,
        totalXP: 200,
        avatar: 'https://randomuser.me/api/portraits/women/5.jpg'
      },
      {
        id: 'user-6',
        name: 'James Wilson',
        email: 'james.wilson@email.com',
        role: 'coach',
        status: 'pending',
        joinDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        coursesEnrolled: 0,
        coursesCompleted: 0,
        studentsCoached: 0,
        totalXP: 0,
        avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
      }
    ];
    setUsers(mockUsers);
  }, []);

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on users:`, selectedUsers);
    setSelectedUsers([]);
    setShowBulkActions(false);
  };

  const getRoleColor = (role) => {
    const colors = {
      learner: 'bg-primary-100 text-primary-700',
      coach: 'bg-accent-100 text-accent-700',
      admin: 'bg-secondary-100 text-secondary-700'
    };
    return colors[role] || 'bg-text-muted text-white';
  };

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success-100 text-success-700',
      inactive: 'bg-warning-100 text-warning-700',
      pending: 'bg-text-muted text-white',
      suspended: 'bg-error-100 text-error-700'
    };
    return colors[status] || 'bg-text-muted text-white';
  };

  const formatLastActive = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else if (days < 7) {
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="learner">Learners</option>
            <option value="coach">Coaches</option>
            <option value="admin">Admins</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-subtle rounded-lg bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="flex gap-2">
          <Button variant="secondary" iconName="Download">
            Export
          </Button>
          <Button variant="primary" iconName="UserPlus">
            Invite User
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-body text-primary-700">
              {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('activate')}>
                Activate
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('deactivate')}>
                Deactivate
              </Button>
              <Button variant="ghost" size="sm" onClick={() => handleBulkAction('message')}>
                Send Message
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelectedUsers([])}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-card border border-subtle rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-subtle">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(paginatedUsers.map(user => user.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="w-4 h-4 text-primary border-subtle rounded focus:ring-primary"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-caption font-caption-semibold text-text-secondary uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-caption font-caption-semibold text-text-secondary uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-caption font-caption-semibold text-text-secondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-caption font-caption-semibold text-text-secondary uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-3 text-left text-xs font-caption font-caption-semibold text-text-secondary uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-caption font-caption-semibold text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-subtle">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface transition-color">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleUserSelect(user.id)}
                      className="w-4 h-4 text-primary border-subtle rounded focus:ring-primary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface rounded-full overflow-hidden flex-shrink-0">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/assets/images/no_image.png';
                          }}
                        />
                      </div>
                      <div>
                        <p className="font-body font-body-semibold text-text-primary">
                          {user.name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-caption rounded-full ${getRoleColor(user.role)}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-caption rounded-full ${getStatusColor(user.status)}`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-text-primary">
                        Joined {user.joinDate.toLocaleDateString()}
                      </p>
                      <p className="text-text-secondary">
                        Last active {formatLastActive(user.lastActive)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      {user.role === 'learner' && (
                        <>
                          <p className="text-text-primary">
                            {user.coursesCompleted}/{user.coursesEnrolled} courses
                          </p>
                          <p className="text-text-secondary">
                            {user.totalXP} XP
                          </p>
                        </>
                      )}
                      {user.role === 'coach' && (
                        <>
                          <p className="text-text-primary">
                            {user.studentsCoached || 0} students
                          </p>
                          <p className="text-text-secondary">
                            {user.totalXP} XP
                          </p>
                        </>
                      )}
                      {user.role === 'admin' && (
                        <>
                          <p className="text-text-primary">
                            {user.coursesCreated || 0} courses created
                          </p>
                          <p className="text-text-secondary">
                            {user.totalXP} XP
                          </p>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="Edit" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MessageSquare" size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icon name="MoreVertical" size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Showing {startIndex + 1} to {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} users
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <Icon name="ChevronLeft" size={16} />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className="w-8 h-8"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <Icon name="ChevronRight" size={16} />
            </Button>
          </div>
        </div>
      )}

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-text-muted mx-auto mb-4" />
          <h3 className="font-heading font-heading-semibold text-text-primary mb-2">
            No users found
          </h3>
          <p className="text-text-secondary mb-4">
            {searchTerm || filterRole !== 'all' || filterStatus !== 'all' ?'Try adjusting your search or filter criteria.' :'Invite your first users to get started.'
            }
          </p>
          <Button variant="primary" iconName="UserPlus">
            Invite User
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserManagementTab;