import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Calendar, TrendingUp, TrendingDown, RefreshCw, X } from 'lucide-react';

const mockSubscriptions = [
  {
    id: 1,
    customerName: 'John Smith',
    phone: '+971501234567',
    email: 'john.smith@email.com',
    vehicle: 'BMW X5 2024',
    plan: 'Premium',
    monthlyPayment: 2850,
    startDate: '2024-01-15',
    renewalDate: '2025-01-15',
    status: 'Active',
    daysToRenewal: 365,
    totalPaid: 5700,
    upgradeOptions: ['Luxury', 'Executive']
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    phone: '+971502345678',
    email: 'sarah.johnson@email.com',
    vehicle: 'Mercedes C-Class 2024',
    plan: 'Standard',
    monthlyPayment: 2200,
    startDate: '2023-06-10',
    renewalDate: '2024-06-10',
    status: 'Expiring Soon',
    daysToRenewal: 30,
    totalPaid: 17600,
    upgradeOptions: ['Premium', 'Luxury']
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    phone: '+971503456789',
    email: 'mike.wilson@email.com',
    vehicle: 'Audi Q7 2024',
    plan: 'Luxury',
    monthlyPayment: 3500,
    startDate: '2023-03-20',
    renewalDate: '2024-03-20',
    status: 'Expired',
    daysToRenewal: -15,
    totalPaid: 42000,
    upgradeOptions: ['Executive']
  },
  {
    id: 4,
    customerName: 'Lisa Chen',
    phone: '+971504567890',
    email: 'lisa.chen@email.com',
    vehicle: 'Lexus ES 2024',
    plan: 'Executive',
    monthlyPayment: 4200,
    startDate: '2023-08-15',
    renewalDate: '2024-08-15',
    status: 'Active',
    daysToRenewal: 198,
    totalPaid: 21000,
    upgradeOptions: []
  }
];

const subscriptionPlans = [
  {
    name: 'Standard',
    monthlyPrice: 2200,
    features: ['Basic Maintenance', 'Insurance Included', '24/7 Support'],
    color: 'bg-blue-100 text-blue-800'
  },
  {
    name: 'Premium',
    monthlyPrice: 2850,
    features: ['Full Maintenance', 'Comprehensive Insurance', 'Roadside Assistance', 'Car Wash'],
    color: 'bg-green-100 text-green-800'
  },
  {
    name: 'Luxury',
    monthlyPrice: 3500,
    features: ['Premium Maintenance', 'Full Coverage Insurance', 'Concierge Service', 'Premium Car Wash'],
    color: 'bg-purple-100 text-purple-800'
  },
  {
    name: 'Executive',
    monthlyPrice: 4200,
    features: ['VIP Maintenance', 'Platinum Insurance', 'Personal Assistant', 'Luxury Services'],
    color: 'bg-yellow-100 text-yellow-800'
  }
];

export default function SubscriptionManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [planFilter, setPlanFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    const planData = subscriptionPlans.find(p => p.name === plan);
    return planData ? planData.color : 'bg-gray-100 text-gray-800';
  };

  const filteredSubscriptions = mockSubscriptions.filter(subscription => {
    const matchesSearch = subscription.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         subscription.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscription.status === statusFilter;
    const matchesPlan = planFilter === 'all' || subscription.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const handleRenewSubscription = (subscriptionId: number) => {
    console.log(`Renewing subscription ${subscriptionId}`);
  };

  const handleUpgradeSubscription = (subscriptionId: number, newPlan: string) => {
    console.log(`Upgrading subscription ${subscriptionId} to ${newPlan}`);
  };

  const handleCancelSubscription = (subscriptionId: number) => {
    console.log(`Cancelling subscription ${subscriptionId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscription Manager</h1>
          <p className="text-gray-600">Manage vehicle subscription plans and renewals</p>
        </div>
        <Button>
          <CreditCard className="mr-2 h-4 w-4" />
          New Subscription
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSubscriptions.filter(s => s.status === 'Active').length}
            </div>
            <p className="text-xs text-green-600">Currently active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSubscriptions.filter(s => s.status === 'Expiring Soon').length}
            </div>
            <p className="text-xs text-yellow-600">Need renewal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              AED {mockSubscriptions
                .filter(s => s.status === 'Active')
                .reduce((sum, s) => sum + s.monthlyPayment, 0)
                .toLocaleString()}
            </div>
            <p className="text-xs text-green-600">From active subscriptions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. Subscription Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              AED {Math.round(mockSubscriptions.reduce((sum, s) => sum + s.monthlyPayment, 0) / mockSubscriptions.length).toLocaleString()}
            </div>
            <p className="text-xs text-blue-600">Per month</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by customer name or vehicle..."
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
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={planFilter} onValueChange={setPlanFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
                <SelectItem value="Luxury">Luxury</SelectItem>
                <SelectItem value="Executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Plans Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>Available subscription tiers and pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {subscriptionPlans.map((plan) => (
              <div key={plan.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{plan.name}</h4>
                  <Badge className={plan.color}>
                    {plan.name}
                  </Badge>
                </div>
                <div className="text-2xl font-bold mb-3">
                  AED {plan.monthlyPrice.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600">/month</span>
                </div>
                <ul className="space-y-1 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-gray-600">• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Subscriptions List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Subscriptions</CardTitle>
          <CardDescription>Manage customer subscription plans and renewals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredSubscriptions.map((subscription) => (
              <div key={subscription.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{subscription.customerName}</h4>
                      <p className="text-sm text-gray-600">{subscription.vehicle}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getPlanColor(subscription.plan)}>
                      {subscription.plan}
                    </Badge>
                    <Badge className={getStatusColor(subscription.status)}>
                      {subscription.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Monthly Payment</p>
                    <p className="font-semibold">AED {subscription.monthlyPayment.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Start Date</p>
                    <p className="font-medium">{subscription.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Renewal Date</p>
                    <p className="font-medium">{subscription.renewalDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Days to Renewal</p>
                    <p className={`font-medium ${
                      subscription.daysToRenewal < 0 ? 'text-red-600' :
                      subscription.daysToRenewal <= 30 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {subscription.daysToRenewal < 0 
                        ? `Expired ${Math.abs(subscription.daysToRenewal)} days ago`
                        : `${subscription.daysToRenewal} days`
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Total Paid</p>
                    <p className="font-semibold">AED {subscription.totalPaid.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    <span>Contact: {subscription.phone} • {subscription.email}</span>
                  </div>
                  <div className="flex space-x-2">
                    {subscription.status === 'Expiring Soon' || subscription.status === 'Expired' ? (
                      <Button 
                        size="sm"
                        onClick={() => handleRenewSubscription(subscription.id)}
                      >
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Renew
                      </Button>
                    ) : null}
                    
                    {subscription.upgradeOptions.length > 0 && (
                      <Select onValueChange={(value) => handleUpgradeSubscription(subscription.id, value)}>
                        <SelectTrigger className="w-[120px] h-8">
                          <TrendingUp className="mr-1 h-3 w-3" />
                          <SelectValue placeholder="Upgrade" />
                        </SelectTrigger>
                        <SelectContent>
                          {subscription.upgradeOptions.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCancelSubscription(subscription.id)}
                    >
                      <X className="mr-1 h-3 w-3" />
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