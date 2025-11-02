import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Car, User, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestDrive {
  id: string;
  customerName: string;
  customerPhone: string;
  carModel: string;
  date: string;
  time: string;
  salesperson: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  notes?: string;
}

const mockTestDrives: TestDrive[] = [
  {
    id: '1',
    customerName: 'John Smith',
    customerPhone: '+971 50 123 4567',
    carModel: 'BMW X5',
    date: '2024-01-25',
    time: '10:00',
    salesperson: 'Ahmed Al-Rashid',
    status: 'confirmed',
    notes: 'Customer prefers morning slot'
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    customerPhone: '+971 55 987 6543',
    carModel: 'Mercedes C-Class',
    date: '2024-01-25',
    time: '14:00',
    salesperson: 'Fatima Al-Zahra',
    status: 'pending',
    notes: 'Waiting for customer confirmation'
  },
  {
    id: '3',
    customerName: 'Michael Brown',
    customerPhone: '+971 52 456 7890',
    carModel: 'Audi A4',
    date: '2024-01-26',
    time: '11:30',
    salesperson: 'Omar Hassan',
    status: 'confirmed'
  },
  {
    id: '4',
    customerName: 'Lisa Davis',
    customerPhone: '+971 56 234 5678',
    carModel: 'Toyota Camry',
    date: '2024-01-26',
    time: '16:00',
    salesperson: 'Khalid Al-Mansouri',
    status: 'completed'
  }
];

const availableCars = [
  'BMW X5', 'BMW X3', 'Mercedes C-Class', 'Mercedes E-Class', 'Audi A4', 'Audi Q5',
  'Toyota Camry', 'Toyota RAV4', 'Honda Accord', 'Nissan Altima'
];

const salespeople = [
  'Ahmed Al-Rashid', 'Fatima Al-Zahra', 'Omar Hassan', 'Khalid Al-Mansouri', 'Noor Al-Zahra', 'Saeed Al-Maktoum'
];

export default function TestDriveCalendar() {
  const [selectedDate, setSelectedDate] = useState('2024-01-25');
  const [testDrives, setTestDrives] = useState<TestDrive[]>(mockTestDrives);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentWeek, setCurrentWeek] = useState(new Date('2024-01-22'));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWeekDays = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getTestDrivesForDate = (date: string) => {
    return testDrives.filter(td => td.date === date);
  };

  const weekDays = getWeekDays(currentWeek);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentWeek);
    newDate.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newDate);
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Test Drive Calendar</h1>
          <p className="text-gray-600">Schedule and manage test drive appointments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Schedule Test Drive
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Schedule New Test Drive</DialogTitle>
              <DialogDescription>
                Book a test drive appointment for a customer
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Input id="customer" placeholder="Customer name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" placeholder="+971 50 123 4567" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="car" className="text-right">
                  Car Model
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select car model" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableCars.map((car) => (
                      <SelectItem key={car} value={car}>{car}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="salesperson" className="text-right">
                  Salesperson
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Assign salesperson" />
                  </SelectTrigger>
                  <SelectContent>
                    {salespeople.map((person) => (
                      <SelectItem key={person} value={person}>{person}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" placeholder="Additional notes..." className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Schedule Test Drive
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today's Test Drives</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-green-600">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-green-600">+15% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-green-600">+3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42%</div>
            <p className="text-xs text-red-600">-1% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Weekly Calendar View</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateWeek('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {currentWeek.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateWeek('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 gap-2">
            {/* Time column header */}
            <div className="text-sm font-medium text-gray-600 p-2">Time</div>
            
            {/* Day headers */}
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="text-center p-2">
                <div className="text-sm font-medium text-gray-900">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </div>
                <div className="text-lg font-bold text-gray-700">
                  {day.getDate()}
                </div>
              </div>
            ))}

            {/* Time slots and appointments */}
            {timeSlots.map((time) => (
              <div key={time} className="contents">
                <div className="text-sm text-gray-600 p-2 border-t">
                  {time}
                </div>
                {weekDays.map((day) => {
                  const dateStr = formatDate(day);
                  const dayTestDrives = getTestDrivesForDate(dateStr).filter(td => td.time === time);
                  
                  return (
                    <div key={`${dateStr}-${time}`} className="min-h-[60px] p-1 border-t border-l">
                      {dayTestDrives.map((testDrive) => (
                        <div
                          key={testDrive.id}
                          className="bg-blue-100 border border-blue-200 rounded p-2 mb-1 text-xs cursor-pointer hover:bg-blue-200"
                        >
                          <div className="font-medium truncate">{testDrive.customerName}</div>
                          <div className="text-gray-600 truncate">{testDrive.carModel}</div>
                          <Badge className={`${getStatusColor(testDrive.status)} text-xs`}>
                            {testDrive.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Test Drives List */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Test Drives</CardTitle>
          <CardDescription>Next 7 days scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testDrives
              .filter(td => new Date(td.date) >= new Date())
              .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())
              .slice(0, 10)
              .map((testDrive) => (
                <div key={testDrive.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium">{testDrive.customerName}</h4>
                      <p className="text-sm text-gray-600">{testDrive.carModel}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {testDrive.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          {testDrive.time}
                        </span>
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {testDrive.salesperson}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(testDrive.status)}>
                      {testDrive.status}
                    </Badge>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel
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