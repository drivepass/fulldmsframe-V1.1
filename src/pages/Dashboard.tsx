import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Car, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Phone,
  Mail,
  FileText,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Leads',
      value: '248',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Active Deals',
      value: '89',
      change: '+8%',
      icon: Car,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Monthly Revenue',
      value: '2.4M SAR',
      change: '+15%',
      icon: DollarSign,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Conversion Rate',
      value: '24.5%',
      change: '+3%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const quickActions = [
    {
      title: 'Total Leads',
      description: 'View and manage customer leads',
      icon: Users,
      path: '/leads',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'Sales Reports',
      description: 'View sales performance and analytics',
      icon: BarChart3,
      path: '/sales-reports',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Performance Dashboard',
      description: 'Monitor key performance indicators',
      icon: Activity,
      path: '/performance-dashboard',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Digital Signage',
      description: 'Manage digital displays and content',
      icon: FileText,
      path: '/digital-signage',
      color: 'bg-orange-500 hover:bg-orange-600'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-2">DrivePass CRM 360 Dashboard</h1>
        <p className="text-blue-100">Welcome back! Here's your business overview for today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-all cursor-pointer" onClick={() => navigate(action.path)}>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className={`inline-flex p-4 rounded-full ${action.color} text-white`}>
                  <action.icon className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Lead Activity
            </CardTitle>
            <CardDescription>Latest lead interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Ahmed Al-Rashid', action: 'Test drive scheduled', time: '2 hours ago', status: 'Hot Lead' },
                { name: 'Fatima Al-Zahra', action: 'Quotation sent', time: '4 hours ago', status: 'Warm Lead' },
                { name: 'Mohammed Al-Saud', action: 'Follow-up call completed', time: '6 hours ago', status: 'Negotiating' },
                { name: 'Nora Al-Mansouri', action: 'Lead created', time: '8 hours ago', status: 'New' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
            <CardDescription>Upcoming appointments and tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: '09:00 AM', event: 'Team Meeting', type: 'Meeting' },
                { time: '11:30 AM', event: 'Test Drive - Ahmed Al-Rashid', type: 'Appointment' },
                { time: '02:00 PM', event: 'Sales Review', type: 'Meeting' },
                { time: '04:30 PM', event: 'Customer Follow-up Calls', type: 'Task' }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.event}</p>
                    <p className="text-sm text-gray-600">{item.time}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}