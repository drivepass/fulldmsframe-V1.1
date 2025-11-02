import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, AlertTriangle, Info, CheckCircle, X, Check } from 'lucide-react';

const mockNotifications = [
  {
    id: 1,
    type: 'alert',
    title: 'High Priority Lead',
    message: 'New lead with AI score 95 requires immediate attention',
    timestamp: '2024-01-20 14:30',
    read: false,
    priority: 'high',
    category: 'leads'
  },
  {
    id: 2,
    type: 'info',
    title: 'System Update',
    message: 'CRM system will be updated tonight at 2:00 AM',
    timestamp: '2024-01-20 12:15',
    read: false,
    priority: 'medium',
    category: 'system'
  },
  {
    id: 3,
    type: 'success',
    title: 'Sale Completed',
    message: 'BMW X5 sold to John Smith - AED 185,000',
    timestamp: '2024-01-20 11:45',
    read: true,
    priority: 'low',
    category: 'sales'
  },
  {
    id: 4,
    type: 'warning',
    title: 'Task Overdue',
    message: 'Follow-up with Sarah Johnson is 2 days overdue',
    timestamp: '2024-01-20 09:30',
    read: false,
    priority: 'high',
    category: 'tasks'
  },
  {
    id: 5,
    type: 'info',
    title: 'New User Added',
    message: 'Mohammed Al-Maktoum has been added to the system',
    timestamp: '2024-01-19 16:20',
    read: true,
    priority: 'low',
    category: 'users'
  }
];

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [selectedTab, setSelectedTab] = useState('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'leads': return 'bg-blue-100 text-blue-800';
      case 'sales': return 'bg-green-100 text-green-800';
      case 'tasks': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-orange-100 text-orange-800';
      case 'users': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(notification => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'unread') return !notification.read;
    return notification.category === selectedTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high' && !n.read).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notification Center</h1>
          <p className="text-gray-600">Manage all system notifications and alerts</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark All Read
          </Button>
          <Button variant="outline">
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
            <p className="text-xs text-gray-600">All notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Unread</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
            <p className="text-xs text-blue-600">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{highPriorityCount}</div>
            <p className="text-xs text-red-600">Urgent notifications</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-green-600">New today</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notifications ({filteredNotifications.length})</CardTitle>
              <CardDescription>Recent system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <div className="text-center py-12">
                    <Bell className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
                    <p className="mt-1 text-sm text-gray-500">You're all caught up!</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 border rounded-lg hover:bg-gray-50 ${
                        !notification.read ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-semibold ${!notification.read ? 'text-blue-900' : ''}`}>
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-gray-700 mb-2">{notification.message}</p>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              <Badge className={getCategoryColor(notification.category)} variant="outline">
                                {notification.category}
                              </Badge>
                              <span className="text-xs text-gray-500">{notification.timestamp}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure when and how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Lead Notifications</h4>
              <p className="text-sm text-gray-600 mb-3">New leads and high-priority prospects</p>
              <div className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <label className="text-sm">Enable</label>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Sales Alerts</h4>
              <p className="text-sm text-gray-600 mb-3">Sales completions and targets</p>
              <div className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <label className="text-sm">Enable</label>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Task Reminders</h4>
              <p className="text-sm text-gray-600 mb-3">Overdue tasks and deadlines</p>
              <div className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <label className="text-sm">Enable</label>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">System Updates</h4>
              <p className="text-sm text-gray-600 mb-3">System maintenance and updates</p>
              <div className="flex items-center space-x-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <label className="text-sm">Enable</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}