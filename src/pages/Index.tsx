import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  TrendingUp, 
  BarChart3,
  Car,
  DollarSign,
  Clock,
  CheckCircle,
  Target,
  Phone
} from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Leads',
      value: '2,847',
      change: '+12.5%',
      icon: UserPlus,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: '+8.2%',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Sales This Month',
      value: '₹45.2L',
      change: '+15.3%',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Vehicles Sold',
      value: '89',
      change: '+22.1%',
      icon: Car,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Lead',
      description: 'Create a new customer lead',
      icon: UserPlus,
      action: () => navigate('/leads'),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'View Sales Pipeline',
      description: 'Check current opportunities',
      icon: BarChart3,
      action: () => navigate('/sales/pipeline'),
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Manage Inventory',
      description: 'Update vehicle inventory',
      icon: Car,
      action: () => navigate('/inventory'),
      color: 'bg-orange-600 hover:bg-orange-700'
    },
    {
      title: 'Follow-up Tasks',
      description: 'Pending customer follow-ups',
      icon: Clock,
      action: () => navigate('/follow-up'),
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const recentActivities = [
    {
      type: 'New Lead',
      description: 'Ahmed Al-Rashid inquired about BMW X5',
      time: '2 hours ago',
      icon: UserPlus,
      color: 'text-blue-600'
    },
    {
      type: 'Sale Completed',
      description: 'Fatima Al-Zahra purchased BMW 3 Series',
      time: '4 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      type: 'Follow-up Due',
      description: 'Call scheduled with Omar Al-Ghamdi',
      time: '6 hours ago',
      icon: Phone,
      color: 'text-orange-600'
    },
    {
      type: 'Quote Sent',
      description: 'Price quote sent to Layla Al-Dosari',
      time: '1 day ago',
      icon: Target,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to DrivePass CRM System</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => navigate('/leads')} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Lead
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start p-4 h-auto hover:bg-gray-50"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg mr-3 ${action.color} text-white`}>
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-gray-500">{action.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="p-2 rounded-lg bg-gray-100">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{activity.type}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* CRM 360 Overview */}
      <Card>
        <CardHeader>
          <CardTitle>CRM 360 Overview</CardTitle>
          <CardDescription>Key metrics and performance indicators</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">78%</div>
              <div className="text-sm text-gray-600 mt-1">Lead Conversion Rate</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">4.2 days</div>
              <div className="text-sm text-gray-600 mt-1">Average Response Time</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">₹2.8L</div>
              <div className="text-sm text-gray-600 mt-1">Average Deal Size</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}