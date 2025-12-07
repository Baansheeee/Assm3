/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Users, FileText, ClipboardCheck, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from '../../components/Layout/AdminLayout';

const userGrowthData = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 300 },
  { month: 'Mar', users: 200 },
  { month: 'Apr', users: 278 },
  { month: 'May', users: 189 },
  { month: 'Jun', users: 239 },
];

const submissionTrendsData = [
  { week: 'Week 1', submissions: 65 },
  { week: 'Week 2', submissions: 59 },
  { week: 'Week 3', submissions: 80 },
  { week: 'Week 4', submissions: 81 },
];

const MetricCard = ({ title, value, icon: Icon, trend }) => (

  <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      </div>
      <div className="bg-indigo-100 rounded-full p-3">
        <Icon className="h-6 w-6 text-indigo-600" />
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <AdminLayout title={"Shop Sphere - Admin Dashboard"}>
      <div className="min-h-screen bg-gray-100">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total Users"
              value="1,234"
              icon={Users}
            />
            <MetricCard
              title="Active Submissions"
              value="56"
              icon={FileText}
            />
            <MetricCard
              title="Pending Approvals"
              value="23"
              icon={ClipboardCheck}
            />
            <MetricCard
              title="Total Revenue"
              value="$12,345"
              icon={DollarSign}
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Growth Chart */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">User Growth Over Time</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#4F46E5"
                      strokeWidth={2}
                      dot={{ fill: '#4F46E5', strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Submission Trends Chart */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Submission Trends</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={submissionTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="submissions" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Activity Section */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-indigo-100 rounded-full p-2">
                      <Users className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">New user registered</p>
                      <p className="text-sm text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">View</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

