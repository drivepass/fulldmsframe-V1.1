import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MessageCircle, Car, Calendar, CreditCard, Star, Gift, TrendingUp } from 'lucide-react';

const customerData = {
  id: 1,
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+971501234567',
  whatsapp: '+971501234567',
  joinDate: '2022-03-15',
  totalSpent: 485000,
  lifetimeValue: 650000,
  loyaltyPoints: 2450,
  tier: 'Gold',
  lastInteraction: '2024-01-20'
};

const ownedCars = [
  {
    id: 1,
    model: 'BMW X5 2024',
    vin: 'WBXHT910X0L123456',
    purchaseDate: '2024-01-15',
    price: 315000,
    status: 'Active',
    mileage: 1250
  },
  {
    id: 2,
    model: 'BMW 320i 2022',
    vin: 'WBA8E1G50JNU12345',
    purchaseDate: '2022-03-15',
    price: 170000,
    status: 'Sold',
    mileage: 45000
  }
];

const financeStatus = [
  {
    id: 1,
    type: 'Auto Loan',
    vehicle: 'BMW X5 2024',
    amount: 250000,
    remaining: 235000,
    monthlyPayment: 4250,
    nextPayment: '2024-02-15',
    status: 'Active'
  }
];

const serviceHistory = [
  {
    id: 1,
    date: '2024-01-20',
    vehicle: 'BMW X5 2024',
    service: 'Oil Change',
    cost: 450,
    mileage: 1000
  },
  {
    id: 2,
    date: '2023-12-15',
    vehicle: 'BMW 320i 2022',
    service: 'Annual Service',
    cost: 1200,
    mileage: 44000
  },
  {
    id: 3,
    date: '2023-09-10',
    vehicle: 'BMW 320i 2022',
    service: 'Brake Replacement',
    cost: 2800,
    mileage: 42000
  }
];

const campaigns = [
  {
    id: 1,
    name: 'Birthday Wishes 2024',
    type: 'Birthday',
    status: 'Sent',
    date: '2024-01-15',
    channel: 'Email + SMS'
  },
  {
    id: 2,
    name: 'Service Reminder',
    type: 'Service',
    status: 'Opened',
    date: '2024-01-10',
    channel: 'WhatsApp'
  }
];

export default function Customer360() {
  const [activeTab, setActiveTab] = useState('overview');

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Opened': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customer 360 Dashboard</h1>
          <p className="text-gray-600">Complete customer relationship overview</p>
        </div>
      </div>

      {/* Customer Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="text-xl">
                  {customerData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{customerData.name}</h2>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-gray-600">{customerData.email}</span>
                  <span className="text-gray-600">{customerData.phone}</span>
                  <Badge className={getTierColor(customerData.tier)}>
                    {customerData.tier} Member
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                Book Service
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED {customerData.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-gray-600">Since {customerData.joinDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">AED {customerData.lifetimeValue.toLocaleString()}</div>
            <p className="text-xs text-green-600">High value customer</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Loyalty Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customerData.loyaltyPoints.toLocaleString()}</div>
            <p className="text-xs text-blue-600">Available for redemption</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cars Owned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownedCars.length}</div>
            <p className="text-xs text-gray-600">1 active, 1 sold</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="finance">Finance</TabsTrigger>
          <TabsTrigger value="service">Service History</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer Since:</span>
                  <span className="font-medium">{customerData.joinDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Interaction:</span>
                  <span className="font-medium">{customerData.lastInteraction}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Membership Tier:</span>
                  <Badge className={getTierColor(customerData.tier)}>
                    {customerData.tier}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contact Preference:</span>
                  <span className="font-medium">WhatsApp</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <Phone className="mr-2 h-4 w-4" />
                  Schedule Call
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send WhatsApp
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Service
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Create Offer
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vehicles">
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Ownership History</CardTitle>
              <CardDescription>All vehicles owned by this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ownedCars.map((car) => (
                  <div key={car.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{car.model}</h4>
                        <p className="text-sm text-gray-600">
                          VIN: {car.vin} • Purchased: {car.purchaseDate}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">AED {car.price.toLocaleString()}</p>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(car.status)}>
                          {car.status}
                        </Badge>
                        <span className="text-sm text-gray-600">{car.mileage.toLocaleString()} km</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="finance">
          <Card>
            <CardHeader>
              <CardTitle>Finance & Lease Status</CardTitle>
              <CardDescription>Current financing and payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {financeStatus.map((finance) => (
                  <div key={finance.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        <div>
                          <h4 className="font-medium">{finance.type}</h4>
                          <p className="text-sm text-gray-600">{finance.vehicle}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(finance.status)}>
                        {finance.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Original Amount</p>
                        <p className="font-semibold">AED {finance.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Remaining</p>
                        <p className="font-semibold">AED {finance.remaining.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Monthly Payment</p>
                        <p className="font-semibold">AED {finance.monthlyPayment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Next Payment</p>
                        <p className="font-semibold">{finance.nextPayment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Service History</CardTitle>
              <CardDescription>Complete maintenance and repair history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceHistory.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{service.service}</h4>
                        <p className="text-sm text-gray-600">
                          {service.vehicle} • {service.date} • {service.mileage.toLocaleString()} km
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">AED {service.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Campaign History</CardTitle>
              <CardDescription>Marketing campaigns sent to this customer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{campaign.name}</h4>
                        <p className="text-sm text-gray-600">
                          {campaign.type} • {campaign.channel} • {campaign.date}
                        </p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}