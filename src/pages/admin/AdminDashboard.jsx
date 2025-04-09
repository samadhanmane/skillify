import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Settings, Database, Shield, Award, BarChart, CheckCircle, FileText, Code, RefreshCw } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getSystemStats } from '@/lib/adminApi';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { label: 'Total Users', value: '0', color: 'bg-blue-50 text-blue-700' },
    { label: 'Active Users Today', value: '0', color: 'bg-green-50 text-green-700' },
    { label: 'Pending Verifications', value: '0', color: 'bg-yellow-50 text-yellow-700' },
    { label: 'System Alerts', value: '0', color: 'bg-red-50 text-red-700' },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSystemStats();
  }, []);

  const fetchSystemStats = async () => {
    try {
      setLoading(true);
      const data = await getSystemStats();
      
      setStats([
        { label: 'Total Users', value: String(data.userCount || 0), color: 'bg-blue-50 text-blue-700' },
        { label: 'Active Users Today', value: String(data.activeUsers || 0), color: 'bg-green-50 text-green-700' },
        { label: 'Pending Verifications', value: String(data.pendingVerifications || 0), color: 'bg-yellow-50 text-yellow-700' },
        { label: 'System Alerts', value: String(data.systemAlerts || 0), color: 'bg-red-50 text-red-700' },
      ]);
      
      setError(null);
    } catch (err) {
      console.error('Error fetching system stats:', err);
      setError('Failed to load dashboard statistics');
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const adminModules = [
    { 
      title: 'User Management', 
      icon: <Users size={24} />, 
      description: 'Manage users, roles and permissions',
      link: '/admin/users',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    { 
      title: 'System Settings', 
      icon: <Settings size={24} />, 
      description: 'Configure system parameters and integrations',
      link: '/admin/system',
      color: 'bg-purple-50 border-purple-200 text-purple-700'
    },
    { 
      title: 'Certificate Management', 
      icon: <Award size={24} />, 
      description: 'Manage certificate templates and verification',
      link: '/admin/certificates',
      color: 'bg-yellow-50 border-yellow-200 text-yellow-700'
    },
    { 
      title: 'Skill Management', 
      icon: <BarChart size={24} />, 
      description: 'Manage skill categories and relationships',
      link: '/admin/skills',
      color: 'bg-indigo-50 border-indigo-200 text-indigo-700'
    },
    { 
      title: 'Verification Settings', 
      icon: <CheckCircle size={24} />, 
      description: 'Configure verification rules and trusted issuers',
      link: '/admin/verification',
      color: 'bg-green-50 border-green-200 text-green-700'
    },
    { 
      title: 'Content Management', 
      icon: <FileText size={24} />, 
      description: 'Manage platform content and emails',
      link: '/admin/content',
      color: 'bg-pink-50 border-pink-200 text-pink-700'
    },
    { 
      title: 'API Management', 
      icon: <Code size={24} />, 
      description: 'Manage API access and keys',
      link: '/admin/api',
      color: 'bg-orange-50 border-orange-200 text-orange-700'
    },
    { 
      title: 'System Logs', 
      icon: <Database size={24} />, 
      description: 'View and export system logs and audit trails',
      link: '/admin/logs',
      color: 'bg-gray-50 border-gray-200 text-gray-700'
    },
  ];

  const recentActivities = [
    { time: '10:45 AM', action: 'New user registered', user: 'alice@example.com' },
    { time: '09:32 AM', action: 'Password reset requested', user: 'bob@example.com' },
    { time: 'Yesterday', action: 'System settings updated', user: 'admin@skillify.com' },
    { time: 'Yesterday', action: 'Database backup completed', user: 'System' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="mt-2 sm:mt-0 flex space-x-2">
          <button 
            className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center"
            onClick={fetchSystemStats}
            disabled={loading}
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} p-4 rounded-lg shadow ${loading ? 'animate-pulse' : ''}`}>
            <p className="text-sm font-medium">{stat.label}</p>
            <p className="text-3xl font-bold">{loading ? '...' : stat.value}</p>
          </div>
        ))}
      </div>

      {/* Admin modules */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {adminModules.map((module, index) => (
          <Link to={module.link} key={index} className={`${module.color} p-4 rounded-lg border hover:shadow-lg transition-shadow`}>
            <div className="flex flex-col h-full">
              <div className="flex items-center mb-2">
                {module.icon}
                <h2 className="text-lg font-semibold ml-2">{module.title}</h2>
              </div>
              <p className="text-xs mb-2 flex-grow">{module.description}</p>
              <span className="text-xs font-medium">Manage →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Admin info and recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Shield size={20} className="text-blue-600 mr-2" />
            <h2 className="text-xl font-semibold">Admin Information</h2>
          </div>
          <div className="space-y-3">
            <div className="flex">
              <span className="font-medium w-32">Name:</span>
              <span>{user?.name || 'Administrator'}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Email:</span>
              <span>{user?.email || 'admin@skillify.com'}</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Last Login:</span>
              <span>Today, 08:22 AM</span>
            </div>
            <div className="flex">
              <span className="font-medium w-32">Role:</span>
              <span className="text-blue-600 font-medium">System Administrator</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex justify-between border-b pb-2">
                <div>
                  <span className="text-gray-600 text-sm">{activity.time}</span>
                  <p className="font-medium">{activity.action}</p>
                </div>
                <div className="text-sm text-gray-500">{activity.user}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 text-sm font-medium hover:text-blue-800">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 