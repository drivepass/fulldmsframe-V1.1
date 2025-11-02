import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Car, Wrench, Plus, Filter } from 'lucide-react';

const mockServiceAppointments = [
  {
    id: 'SRV001',
    customerName: 'Ahmed Hassan',
    customerPhone: '+971 54 345 6789',
    vehicleModel: 'Range Rover Sport',
    vehiclePlate: 'D-12345',
    serviceType: 'Regular Maintenance',
    date: '2024-01-25',
    time: '09:00',
    technician: 'Mohammed Al-Rashid',
    estimatedDuration: '2 hours',
    status: 'Confirmed',
    notes: 'Oil change and general inspection'
  },
  {
    id: 'SRV002',
    customerName: 'Sarah Johnson',
    customerPhone: '+971 55 987 6543',
    vehicleModel: 'Mercedes C-Class',
    vehiclePlate: 'A-67890',
    serviceType: 'Warranty Repair',
    date: '2024-01-25',
    time: '11:30',
    technician: 'Ali Al-Maktoum',
    estimatedDuration: '3 hours',
    status: 'In Progress',
    notes: 'Air conditioning system repair'
  },
  {
    id: 'SRV003',
    customerName: 'John Smith',
    customerPhone: '+971 50 123 4567',
    vehicleModel: 'BMW X5',
    vehiclePlate: 'B-54321',
    serviceType: 'Annual Service',
    date: '2024-01-26',
    time: '14:00',
    technician: 'Hassan Al-Zahra',
    estimatedDuration: '4 hours',
    status: 'Scheduled',
    notes: 'Comprehensive annual service and inspection'
  }
];

export default function ServiceScheduling() {
  const [selectedDate, setSelectedDate] = useState('2024-01-25');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'Regular Maintenance': return 'bg-blue-100 text-blue-800';
      case 'Warranty Repair': return 'bg-purple-100 text-purple-800';
      case 'Annual Service': return 'bg-orange-100 text-orange-800';
      case 'Emergency Repair': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Scheduling</h1>
          <p className="text-gray-600">Manage service appointments and maintenance schedules</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-green-600">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-blue-600">Currently servicing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-green-600">+3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Service Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5h</div>
            <p className="text-xs text-green-600">-15min improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Service Schedule</CardTitle>
              <CardDescription>Today's service appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockServiceAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{appointment.customerName}</h4>
                        <p className="text-sm text-gray-600">{appointment.vehicleModel} • {appointment.vehiclePlate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getServiceTypeColor(appointment.serviceType)}>
                          {appointment.serviceType}
                        </Badge>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        {appointment.time}
                      </div>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        {appointment.technician}
                      </div>
                      <div className="flex items-center">
                        <Wrench className="mr-2 h-4 w-4" />
                        {appointment.estimatedDuration}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700">{appointment.notes}</p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm text-gray-500">ID: {appointment.id}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          Complete
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Service Bay Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((bay) => (
                  <div key={bay} className="flex items-center justify-between p-3 border rounded">
                    <span className="font-medium">Bay {bay}</span>
                    <Badge className={bay <= 2 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                      {bay <= 2 ? 'Occupied' : 'Available'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Technician Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mohammed Al-Rashid</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Busy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ali Al-Maktoum</span>
                  <Badge className="bg-blue-100 text-blue-800">Working</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Hassan Al-Zahra</span>
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Omar Al-Mansouri</span>
                  <Badge className="bg-green-100 text-green-800">Available</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}