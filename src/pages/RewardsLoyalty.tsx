import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Gift, Star, Trophy, CreditCard, ShoppingBag, Car } from 'lucide-react';

const mockCustomers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    tier: 'Gold',
    points: 2450,
    totalSpent: 485000,
    joinDate: '2022-03-15',
    lastActivity: '2024-01-20'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    tier: 'Silver',
    points: 1250,
    totalSpent: 285000,
    joinDate: '2023-06-10',
    lastActivity: '2024-01-18'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    tier: 'Platinum',
    points: 4850,
    totalSpent: 750000,
    joinDate: '2021-09-20',
    lastActivity: '2024-01-19'
  }
];

const rewardOffers = [
  {
    id: 1,
    title: 'Free Oil Change',
    description: 'Complimentary oil change service',
    pointsCost: 500,
    category: 'Service',
    validity: '30 days',
    available: true
  },
  {
    id: 2,
    title: '10% Off Accessories',
    description: 'Discount on genuine accessories',
    pointsCost: 750,
    category: 'Accessories',
    validity: '60 days',
    available: true
  },
  {
    id: 3,
    title: 'Premium Car Wash',
    description: 'Full detailing service',
    pointsCost: 300,
    category: 'Service',
    validity: '45 days',
    available: true
  },
  {
    id: 4,
    title: 'Extended Warranty',
    description: '6 months extended warranty',
    pointsCost: 2000,
    category: 'Warranty',
    validity: '90 days',
    available: false
  }
];

const recentRedemptions = [
  {
    id: 1,
    customer: 'John Smith',
    reward: 'Free Oil Change',
    points: 500,
    date: '2024-01-15',
    status: 'Redeemed'
  },
  {
    id: 2,
    customer: 'Mike Wilson',
    reward: 'Premium Car Wash',
    points: 300,
    date: '2024-01-12',
    status: 'Used'
  },
  {
    id: 3,
    customer: 'Sarah Johnson',
    reward: '10% Off Accessories',
    points: 750,
    date: '2024-01-10',
    status: 'Active'
  }
];

export default function RewardsLoyalty() {
  const [searchTerm, setSearchTerm] = useState('');

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-100 text-purple-800';
      case 'Gold': return 'bg-yellow-100 text-yellow-800';
      case 'Silver': return 'bg-gray-100 text-gray-800';
      case 'Bronze': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Platinum': return <Trophy className="h-4 w-4 text-purple-600" />;
      case 'Gold': return <Star className="h-4 w-4 text-yellow-600" />;
      case 'Silver': return <CreditCard className="h-4 w-4 text-gray-600" />;
      case 'Bronze': return <Gift className="h-4 w-4 text-orange-600" />;
      default: return <Gift className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Used': return 'bg-blue-100 text-blue-800';
      case 'Redeemed': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Rewards & Loyalty Program</h1>
          <p className="text-gray-600">Manage customer loyalty points and rewards</p>
        </div>
        <Button>
          <Gift className="mr-2 h-4 w-4" />
          Create New Reward
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockCustomers.length}</div>
            <p className="text-xs text-green-600">Active loyalty members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Points Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCustomers.reduce((sum, c) => sum + c.points, 0).toLocaleString()}
            </div>
            <p className="text-xs text-blue-600">Total active points</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Redemptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentRedemptions.length}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Platinum Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCustomers.filter(c => c.tier === 'Platinum').length}
            </div>
            <p className="text-xs text-purple-600">Top tier customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Loyalty Status */}
        <Card>
          <CardHeader>
            <CardTitle>Loyalty Members</CardTitle>
            <CardDescription>Customer loyalty status and points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              {filteredCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      {getTierIcon(customer.tier)}
                    </div>
                    <div>
                      <h4 className="font-medium">{customer.name}</h4>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getTierColor(customer.tier)}>
                        {customer.tier}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold">{customer.points.toLocaleString()} points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Rewards */}
        <Card>
          <CardHeader>
            <CardTitle>Available Rewards</CardTitle>
            <CardDescription>Current reward offers for customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {rewardOffers.map((offer) => (
                <div key={offer.id} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{offer.title}</h4>
                    <Badge variant={offer.available ? "default" : "secondary"}>
                      {offer.available ? 'Available' : 'Unavailable'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold text-blue-600">
                        {offer.pointsCost} points
                      </span>
                      <span className="text-gray-500">{offer.category}</span>
                    </div>
                    <span className="text-gray-500">{offer.validity}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Redemptions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Redemptions</CardTitle>
          <CardDescription>Latest reward redemptions and usage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRedemptions.map((redemption) => (
              <div key={redemption.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Gift className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{redemption.customer}</h4>
                    <p className="text-sm text-gray-600">{redemption.reward}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <Badge className={getStatusColor(redemption.status)}>
                      {redemption.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{redemption.points} points</span>
                    <span>•</span>
                    <span>{redemption.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reward Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Car className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">Service Rewards</h3>
            <p className="text-sm text-gray-600">Oil changes, maintenance</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <ShoppingBag className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">Accessories</h3>
            <p className="text-sm text-gray-600">Discounts on parts</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Gift className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-medium">Special Offers</h3>
            <p className="text-sm text-gray-600">Exclusive deals</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <Trophy className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
            <h3 className="font-medium">VIP Benefits</h3>
            <p className="text-sm text-gray-600">Premium services</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}