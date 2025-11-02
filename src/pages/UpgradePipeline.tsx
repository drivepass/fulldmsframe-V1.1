import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, Calendar, Car, User, Phone, Mail, AlertCircle } from 'lucide-react';

const mockUpgradeOpportunities = [
  {
    id: 1,
    customerName: 'John Smith',
    phone: '+971501234567',
    email: 'john.smith@email.com',
    currentVehicle: 'BMW 320i 2022',
    leaseEndDate: '2024-03-15',
    suggestedUpgrade: 'BMW 330i 2024',
    salesperson: 'Ahmed Ali',
    aiPrediction: 85,
    status: 'Hot',
    daysRemaining: 45
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    phone: '+971502345678',
    email: 'sarah.johnson@email.com',
    currentVehicle: 'Mercedes C200 2021',
    leaseEndDate: '2024-06-10',
    suggestedUpgrade: 'Mercedes C300 2024',
    salesperson: 'Fatima Hassan',
    aiPrediction: 72,
    status: 'Warm',
    daysRemaining: 132
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    phone: '+971503456789',
    email: 'mike.wilson@email.com',
    currentVehicle: 'Audi A4 2020',
    leaseEndDate: '2024-02-20',
    suggestedUpgrade: 'Audi A6 2024',
    salesperson: 'Omar Khalil',
    aiPrediction: 91,
    status: 'Hot',
    daysRemaining: 21
  },
  {
    id: 4,
    customerName: 'Lisa Chen',
    phone: '+971504567890',
    email: 'lisa.chen@email.com',
    currentVehicle: 'Toyota Camry 2022',
    leaseEndDate: '2024-08-15',
    suggestedUpgrade: 'Lexus ES 2024',
    salesperson: 'Ahmed Ali',
    aiPrediction: 68,
    status: 'Cold',
    daysRemaining: 198
  },
  {
    id: 5,
    customerName: 'David Brown',
    phone: '+971505678901',
    email: 'david.brown@email.com',
    currentVehicle: 'Honda Accord 2021',
    leaseEndDate: '2024-04-30',
    suggestedUpgrade: 'BMW 520i 2024',
    salesperson: 'Fatima Hassan',
    aiPrediction: 79,
    status: 'Interested',
    daysRemaining: 91
  }
];

export default function UpgradePipeline() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [salespersonFilter, setSalespersonFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Warm': return 'bg-yellow-100 text-yellow-800';
      case 'Cold': return 'bg-blue-100 text-blue-800';
      case 'Interested': return 'bg-green-100 text-green-800';
      case 'Not Interested': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPredictionColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getUrgencyColor = (days: number) => {
    if (days <= 30) return 'text-red-600 font-semibold';
    if (days <= 90) return 'text-yellow-600 font-semibold';
    return 'text-green-600';
  };

  const filteredOpportunities = mockUpgradeOpportunities.filter(opportunity => {
    const matchesSearch = opportunity.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.currentVehicle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.suggestedUpgrade.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || opportunity.status === statusFilter;
    const matchesSalesperson = salespersonFilter === 'all' || opportunity.salesperson === salespersonFilter;
    
    return matchesSearch && matchesStatus && matchesSalesperson;
  });

  const handleAssignSalesperson = (opportunityId: number, salesperson: string) => {
    console.log(`Assigning ${salesperson} to opportunity ${opportunityId}`);
  };

  const handleSendOffer = (opportunityId: number) => {
    console.log(`Sending offer for opportunity ${opportunityId}`);
  };

  const handleMarkInterested = (opportunityId: number) => {
    console.log(`Marking opportunity ${opportunityId} as interested`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upgrade Pipeline Dashboard</h1>
          <p className="text-gray-600">Track customers nearing lease/finance end for upgrade opportunities</p>
        </div>
        <Button>
          <TrendingUp className="mr-2 h-4 w-4" />
          Generate Upgrade Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockUpgradeOpportunities.length}</div>
            <p className="text-xs text-gray-600">Potential upgrades</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Urgent (≤30 days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {mockUpgradeOpportunities.filter(o => o.daysRemaining <= 30).length}
            </div>
            <p className="text-xs text-red-600">Need immediate attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Hot Prospects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUpgradeOpportunities.filter(o => o.status === 'Hot').length}
            </div>
            <p className="text-xs text-green-600">High conversion probability</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg. AI Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(mockUpgradeOpportunities.reduce((sum, o) => sum + o.aiPrediction, 0) / mockUpgradeOpportunities.length)}
            </div>
            <p className="text-xs text-blue-600">Prediction accuracy</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by customer, current vehicle, or suggested upgrade..."
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
                <SelectItem value="Hot">Hot</SelectItem>
                <SelectItem value="Warm">Warm</SelectItem>
                <SelectItem value="Cold">Cold</SelectItem>
                <SelectItem value="Interested">Interested</SelectItem>
                <SelectItem value="Not Interested">Not Interested</SelectItem>
              </SelectContent>
            </Select>
            <Select value={salespersonFilter} onValueChange={setSalespersonFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Salesperson" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Salespeople</SelectItem>
                <SelectItem value="Ahmed Ali">Ahmed Ali</SelectItem>
                <SelectItem value="Fatima Hassan">Fatima Hassan</SelectItem>
                <SelectItem value="Omar Khalil">Omar Khalil</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Upgrade Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Opportunities</CardTitle>
          <CardDescription>Customers approaching lease/finance end dates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{opportunity.customerName}</h4>
                      <p className="text-sm text-gray-600">
                        {opportunity.phone} • {opportunity.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(opportunity.status)}>
                      {opportunity.status}
                    </Badge>
                    {opportunity.daysRemaining <= 30 && (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Current Vehicle</p>
                    <p className="font-medium">{opportunity.currentVehicle}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Lease End Date</p>
                    <p className={`font-medium ${getUrgencyColor(opportunity.daysRemaining)}`}>
                      {opportunity.leaseEndDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Suggested Upgrade</p>
                    <p className="font-medium">{opportunity.suggestedUpgrade}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">AI Prediction</p>
                    <p className={`font-semibold ${getPredictionColor(opportunity.aiPrediction)}`}>
                      {opportunity.aiPrediction}%
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Days Remaining</p>
                    <p className={`font-medium ${getUrgencyColor(opportunity.daysRemaining)}`}>
                      {opportunity.daysRemaining} days
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Assigned to: {opportunity.salesperson}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="mr-1 h-3 w-3" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="mr-1 h-3 w-3" />
                      Email
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSendOffer(opportunity.id)}
                    >
                      <TrendingUp className="mr-1 h-3 w-3" />
                      Send Offer
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleMarkInterested(opportunity.id)}
                    >
                      Mark as Interested
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle>AI Insights & Recommendations</CardTitle>
          <CardDescription>Machine learning predictions for upgrade success</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">High Probability Upgrades</h4>
              <p className="text-2xl font-bold text-green-600">
                {mockUpgradeOpportunities.filter(o => o.aiPrediction >= 80).length}
              </p>
              <p className="text-sm text-green-700">AI Score ≥ 80%</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Medium Probability</h4>
              <p className="text-2xl font-bold text-yellow-600">
                {mockUpgradeOpportunities.filter(o => o.aiPrediction >= 60 && o.aiPrediction < 80).length}
              </p>
              <p className="text-sm text-yellow-700">AI Score 60-79%</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-medium text-red-800 mb-2">Low Probability</h4>
              <p className="text-2xl font-bold text-red-600">
                {mockUpgradeOpportunities.filter(o => o.aiPrediction < 60).length}
              </p>
              <p className="text-sm text-red-700">AI Score below 60%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}