import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Car, User, Phone, Mail } from 'lucide-react';

const mockTestDrives = [
  {
    id: 1,
    customer: 'John Smith',
    car: 'BMW X5 2024',
    date: '2024-01-20',
    time: '10:00 AM',
    salesperson: 'Ahmed Ali',
    status: 'Confirmed',
    phone: '+971501234567',
    email: 'john@email.com'
  },
  {
    id: 2,
    customer: 'Sarah Johnson',
    car: 'Mercedes C-Class 2024',
    date: '2024-01-20',
    time: '2:00 PM',
    salesperson: 'Fatima Hassan',
    status: 'Pending',
    phone: '+971502345678',
    email: 'sarah@email.com'
  },
  {
    id: 3,
    customer: 'Mike Wilson',
    car: 'Audi Q7 2024',
    date: '2024-01-21',
    time: '11:00 AM',
    salesperson: 'Omar Khalil',
    status: 'Confirmed',
    phone: '+971503456789',
    email: 'mike@email.com'
  }
];

export default function TestDriveCalendar() {
  const [selectedDate, setSelectedDate] = useState('2024-01-20');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTestDrivesForDate = (date: string) => {
    return mockTestDrives.filter(td => td.date === date);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Drive Calendar</h1>
          <p className="text-gray-600">Schedule and manage test drive appointments</p>
        </div>
        <Button>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Test Drive
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Test Drives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-600">6 confirmed, 2 pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-blue-600">+15% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-green-600">Above target</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Available Cars</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">Ready for test drives</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
            <CardDescription>Click on a date to view scheduled test drives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date(2024, 0, i - 6);
                const dateStr = date.toISOString().split('T')[0];
                const hasTestDrives = mockTestDrives.some(td => td.date === dateStr);
                const isSelected = dateStr === selectedDate;
                
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`
                      p-2 text-sm rounded-lg border transition-colors
                      ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'}
                      ${hasTestDrives ? 'border-blue-300 bg-blue-50' : 'border-gray-200'}
                      ${date.getMonth() !== 0 ? 'text-gray-400' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Cars</CardTitle>
            <CardDescription>Cars ready for test drives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                'BMW X5 2024',
                'Mercedes C-Class 2024',
                'Audi Q7 2024',
                'Toyota Camry 2024',
                'Honda CR-V 2024'
              ].map((car, index) => (
                <div key={index} className="flex items-center justify-between p-2 border rounded">
                  <div className="flex items-center space-x-2">
                    <Car className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{car}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">Available</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Test Drives for Selected Date */}
      <Card>
        <CardHeader>
          <CardTitle>Test Drives for {selectedDate}</CardTitle>
          <CardDescription>Scheduled appointments for the selected date</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {getTestDrivesForDate(selectedDate).map((testDrive) => (
              <div key={testDrive.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{testDrive.customer}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Car className="h-4 w-4" />
                        <span>{testDrive.car}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{testDrive.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>{testDrive.salesperson}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(testDrive.status)}>
                    {testDrive.status}
                  </Badge>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button variant="outline" size="sm">
                    Reschedule
                  </Button>
                  <Button size="sm">
                    Confirm
                  </Button>
                </div>
              </div>
            ))}
            {getTestDrivesForDate(selectedDate).length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Calendar className="h-12 w-12 mx-auto mb-4" />
                <p>No test drives scheduled for this date</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}