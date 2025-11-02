import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Wrench, Bell, Car, Phone, Mail } from 'lucide-react';

const mockServiceReminders = [
  {
    id: 1,
    customerName: 'John Smith',
    phone: '+971501234567',
    email: 'john.smith@email.com',
    vehicle: 'BMW X5 2024',
    vin: 'WBXHT910X0L123456',
    serviceType: 'Oil Change',
    dueDate: '2024-02-15',
    dueMileage: 5000,
    currentMileage: 4500,
    status: 'Due Soon',
    lastService: '2024-01-15',
    priority: 'Medium'
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    phone: '+971502345678',
    email: 'sarah.johnson@email.com',
    vehicle: 'Mercedes C-Class 2023',
    vin: 'WDD2050461F123456',
    serviceType: 'Annual Service',
    dueDate: '2024-01-25',
    dueMileage: 20000,
    currentMileage: 19500,
    status: 'Overdue',
    lastService: '2023-01-25',
    priority: 'High'
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    phone: '+971503456789',
    email: 'mike.wilson@email.com',
    vehicle: 'Audi Q7 2022',
    vin: 'WA1BVAFY8DD123456',
    serviceType: 'Brake Inspection',
    dueDate: '2024-03-10',
    dueMileage: 50000,
    currentMileage: 45000,
    status: 'Upcoming',
    lastService: '2023-09-10',
    priority: 'Low'
  },
  {
    id: 4,
    customerName: 'Lisa Chen',
    phone: '+971504567890',
    email: 'lisa.chen@email.com',
    vehicle: 'Toyota Camry 2023',
    vin: 'JTNK4RBE5P3123456',
    serviceType: 'Tire Rotation',
    dueDate: '2024-02-01',
    dueMileage: 15000,
    currentMileage: 14800,
    status: 'Due Soon',
    lastService: '2023-11-01',
    priority: 'Medium'
  }
];

export default function ServiceReminder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Due Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Booked': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReminders = mockServiceReminders.filter(reminder => {
    const matchesSearch = reminder.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reminder.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || reminder.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || reminder.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleBookService = (reminderId: number) => {
    console.log(`Booking service for reminder ${reminderId}`);
    // In a real app, this would open a booking modal or redirect to booking page
  };

  const handleSendReminder = (reminderId: number) => {
    console.log(`Sending reminder for ${reminderId}`);
    // In a real app, this would send SMS/email reminder
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Reminders</h1>
          <p className="text-gray-600">Track upcoming and overdue service appointments</p>
        </div>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Send All Reminders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockServiceReminders.length}</div>
            <p className="text-xs text-gray-600">Active reminders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockServiceReminders.filter(r => r.status === 'Overdue').length}
            </div>
            <p className="text-xs text-red-600">Need immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Due Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {mockServiceReminders.filter(r => r.status === 'Due Soon').length}
            </div>
            <p className="text-xs text-yellow-600">Within 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockServiceReminders.filter(r => r.priority === 'High').length}
            </div>
            <p className="text-xs text-gray-600">Critical services</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by customer or vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
                <SelectItem value="Due Soon">Due Soon</SelectItem>
                <SelectItem value="Upcoming">Upcoming</SelectItem>
                <SelectItem value="Booked">Booked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Service Reminders List */}
      <Card>
        <CardHeader>
          <CardTitle>Service Reminders</CardTitle>
          <CardDescription>Manage upcoming and overdue services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReminders.map((reminder) => (
              <div key={reminder.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Wrench className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{reminder.customerName}</h4>
                      <p className="text-sm text-gray-600">{reminder.vehicle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPriorityColor(reminder.priority)}>
                      {reminder.priority}
                    </Badge>
                    <Badge className={getStatusColor(reminder.status)}>
                      {reminder.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Service Type</p>
                    <p className="font-medium">{reminder.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Due Date</p>
                    <p className="font-medium">{reminder.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Mileage</p>
                    <p className="font-medium">
                      {reminder.currentMileage.toLocaleString()} / {reminder.dueMileage.toLocaleString()} km
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Service</p>
                    <p className="font-medium">{reminder.lastService}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Phone className="h-4 w-4" />
                      <span>{reminder.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span>{reminder.email}</span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendReminder(reminder.id)}
                    >
                      <Bell className="mr-1 h-3 w-3" />
                      Send Reminder
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleBookService(reminder.id)}
                    >
                      <Calendar className="mr-1 h-3 w-3" />
                      Book Service
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}