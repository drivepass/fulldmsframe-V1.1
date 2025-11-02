import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Calendar, AlertTriangle, CheckCircle, FileText, Bell } from 'lucide-react';

const mockWarranties = [
  {
    id: 1,
    customerName: 'John Smith',
    vehicle: 'BMW X5 2024',
    vin: 'WBXHT910X0L123456',
    type: 'Manufacturer Warranty',
    startDate: '2024-01-15',
    endDate: '2027-01-15',
    mileageLimit: 100000,
    currentMileage: 1250,
    status: 'Active',
    daysRemaining: 1095
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    vehicle: 'Mercedes C-Class 2023',
    vin: 'WDD2050461F123456',
    type: 'Extended Warranty',
    startDate: '2023-06-10',
    endDate: '2025-06-10',
    mileageLimit: 80000,
    currentMileage: 25000,
    status: 'Active',
    daysRemaining: 502
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    vehicle: 'Audi Q7 2022',
    vin: 'WA1BVAFY8DD123456',
    type: 'Manufacturer Warranty',
    startDate: '2022-03-20',
    endDate: '2025-03-20',
    mileageLimit: 100000,
    currentMileage: 45000,
    status: 'Expiring Soon',
    daysRemaining: 45
  }
];

const mockInsurances = [
  {
    id: 1,
    customerName: 'John Smith',
    vehicle: 'BMW X5 2024',
    provider: 'AXA Insurance',
    policyNumber: 'AXA-BMW-2024-001',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    premium: 3500,
    status: 'Active',
    daysRemaining: 365
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    vehicle: 'Mercedes C-Class 2023',
    provider: 'ADNIC Insurance',
    policyNumber: 'ADNIC-MB-2023-045',
    startDate: '2023-06-10',
    endDate: '2024-06-10',
    premium: 2800,
    status: 'Expiring Soon',
    daysRemaining: 30
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    vehicle: 'Audi Q7 2022',
    provider: 'Orient Insurance',
    policyNumber: 'OIC-AUDI-2022-089',
    startDate: '2023-03-20',
    endDate: '2024-03-20',
    premium: 4200,
    status: 'Expired',
    daysRemaining: -15
  }
];

export default function WarrantyInsurance() {
  const [activeTab, setActiveTab] = useState('warranties');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Expiring Soon': return 'bg-yellow-100 text-yellow-800';
      case 'Expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Expiring Soon': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'Expired': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredWarranties = mockWarranties.filter(warranty =>
    warranty.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warranty.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInsurances = mockInsurances.filter(insurance =>
    insurance.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    insurance.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Warranty & Insurance Dashboard</h1>
          <p className="text-gray-600">Monitor warranty and insurance status for all vehicles</p>
        </div>
        <Button>
          <Bell className="mr-2 h-4 w-4" />
          Send Reminders
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Warranties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockWarranties.filter(w => w.status === 'Active').length}
            </div>
            <p className="text-xs text-green-600">Currently covered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Expiring Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockWarranties.filter(w => w.status === 'Expiring Soon').length + 
               mockInsurances.filter(i => i.status === 'Expiring Soon').length}
            </div>
            <p className="text-xs text-yellow-600">Need attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Insurance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInsurances.filter(i => i.status === 'Active').length}
            </div>
            <p className="text-xs text-green-600">Currently insured</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Premium Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              AED {mockInsurances.reduce((sum, ins) => sum + ins.premium, 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Annual premiums</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search by customer name or vehicle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="warranties">Warranties</TabsTrigger>
          <TabsTrigger value="insurance">Insurance Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="warranties">
          <Card>
            <CardHeader>
              <CardTitle>Warranty Management</CardTitle>
              <CardDescription>Track warranty status and expiration dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredWarranties.map((warranty) => (
                  <div key={warranty.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(warranty.status)}
                        <div>
                          <h4 className="font-medium">{warranty.customerName}</h4>
                          <p className="text-sm text-gray-600">{warranty.vehicle}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(warranty.status)}>
                        {warranty.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Warranty Type</p>
                        <p className="font-medium">{warranty.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">End Date</p>
                        <p className="font-medium">{warranty.endDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Mileage</p>
                        <p className="font-medium">
                          {warranty.currentMileage.toLocaleString()} / {warranty.mileageLimit.toLocaleString()} km
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Days Remaining</p>
                        <p className={`font-medium ${warranty.daysRemaining < 90 ? 'text-red-600' : 'text-green-600'}`}>
                          {warranty.daysRemaining} days
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-1 h-3 w-3" />
                        View Details
                      </Button>
                      {warranty.status === 'Expiring Soon' && (
                        <Button size="sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          Renew
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Bell className="mr-1 h-3 w-3" />
                        Send Reminder
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Management</CardTitle>
              <CardDescription>Monitor insurance policies and renewal dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredInsurances.map((insurance) => (
                  <div key={insurance.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(insurance.status)}
                        <div>
                          <h4 className="font-medium">{insurance.customerName}</h4>
                          <p className="text-sm text-gray-600">{insurance.vehicle}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(insurance.status)}>
                        {insurance.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Provider</p>
                        <p className="font-medium">{insurance.provider}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Policy Number</p>
                        <p className="font-medium font-mono text-xs">{insurance.policyNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">End Date</p>
                        <p className="font-medium">{insurance.endDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Annual Premium</p>
                        <p className="font-medium">AED {insurance.premium.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-sm text-gray-600">Days Remaining</p>
                      <p className={`font-medium ${insurance.daysRemaining < 30 ? 'text-red-600' : 'text-green-600'}`}>
                        {insurance.daysRemaining > 0 ? `${insurance.daysRemaining} days` : `Expired ${Math.abs(insurance.daysRemaining)} days ago`}
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" size="sm">
                        <FileText className="mr-1 h-3 w-3" />
                        Download Policy
                      </Button>
                      {(insurance.status === 'Expiring Soon' || insurance.status === 'Expired') && (
                        <Button size="sm">
                          <Calendar className="mr-1 h-3 w-3" />
                          Renew
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Bell className="mr-1 h-3 w-3" />
                        Send Reminder
                      </Button>
                    </div>
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