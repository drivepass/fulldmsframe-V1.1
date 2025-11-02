import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw, Car, Calculator, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const mockPartExchanges = [
  {
    id: 1,
    customerName: 'John Smith',
    phone: '+971501234567',
    currentVehicle: {
      make: 'Toyota',
      model: 'Camry',
      year: 2019,
      mileage: 45000,
      condition: 'Good',
      vin: 'JTNK4RBE5P3123456'
    },
    valuation: 85000,
    marketValue: 95000,
    newVehicle: 'BMW X5 2024',
    status: 'Pending Approval',
    date: '2024-01-20',
    salesperson: 'Ahmed Ali'
  },
  {
    id: 2,
    customerName: 'Sarah Johnson',
    phone: '+971502345678',
    currentVehicle: {
      make: 'Honda',
      model: 'Accord',
      year: 2020,
      mileage: 35000,
      condition: 'Excellent',
      vin: 'JHMCV6F16LC123456'
    },
    valuation: 95000,
    marketValue: 105000,
    newVehicle: 'Mercedes C-Class 2024',
    status: 'Approved',
    date: '2024-01-18',
    salesperson: 'Fatima Hassan'
  },
  {
    id: 3,
    customerName: 'Mike Wilson',
    phone: '+971503456789',
    currentVehicle: {
      make: 'Nissan',
      model: 'Altima',
      year: 2018,
      mileage: 65000,
      condition: 'Fair',
      vin: 'JTNK4RBE5P3789012'
    },
    valuation: 55000,
    marketValue: 65000,
    newVehicle: 'Audi Q7 2024',
    status: 'Under Review',
    date: '2024-01-19',
    salesperson: 'Omar Khalil'
  }
];

export default function PartExchange() {
  const [showValuationForm, setShowValuationForm] = useState(false);
  const [valuationForm, setValuationForm] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    condition: '',
    vin: '',
    notes: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending Approval': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Under Review': return <Clock className="h-4 w-4 text-blue-500" />;
      case 'Rejected': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600';
      case 'Good': return 'text-blue-600';
      case 'Fair': return 'text-yellow-600';
      case 'Poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleGenerateValuation = () => {
    console.log('Generating valuation for:', valuationForm);
    // In a real app, this would call valuation API
    setShowValuationForm(false);
    setValuationForm({
      make: '',
      model: '',
      year: '',
      mileage: '',
      condition: '',
      vin: '',
      notes: ''
    });
  };

  const handleApproveOffer = (exchangeId: number) => {
    console.log(`Approving offer for exchange ${exchangeId}`);
  };

  const handleRejectOffer = (exchangeId: number) => {
    console.log(`Rejecting offer for exchange ${exchangeId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Part Exchange Management</h1>
          <p className="text-gray-600">Evaluate and manage vehicle trade-in valuations</p>
        </div>
        <Button onClick={() => setShowValuationForm(true)}>
          <Calculator className="mr-2 h-4 w-4" />
          New Valuation
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Valuations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPartExchanges.length}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPartExchanges.filter(e => e.status === 'Pending Approval').length}
            </div>
            <p className="text-xs text-yellow-600">Awaiting decision</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approved Offers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPartExchanges.filter(e => e.status === 'Approved').length}
            </div>
            <p className="text-xs text-green-600">Ready to proceed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              AED {mockPartExchanges.reduce((sum, e) => sum + e.valuation, 0).toLocaleString()}
            </div>
            <p className="text-xs text-blue-600">Combined valuations</p>
          </CardContent>
        </Card>
      </div>

      {/* Valuation Form */}
      {showValuationForm && (
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Valuation</CardTitle>
            <CardDescription>Enter vehicle details for trade-in valuation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Make</label>
                <Input
                  value={valuationForm.make}
                  onChange={(e) => setValuationForm(prev => ({ ...prev, make: e.target.value }))}
                  placeholder="e.g., Toyota"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Model</label>
                <Input
                  value={valuationForm.model}
                  onChange={(e) => setValuationForm(prev => ({ ...prev, model: e.target.value }))}
                  placeholder="e.g., Camry"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Year</label>
                <Input
                  type="number"
                  value={valuationForm.year}
                  onChange={(e) => setValuationForm(prev => ({ ...prev, year: e.target.value }))}
                  placeholder="e.g., 2020"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Mileage (km)</label>
                <Input
                  type="number"
                  value={valuationForm.mileage}
                  onChange={(e) => setValuationForm(prev => ({ ...prev, mileage: e.target.value }))}
                  placeholder="e.g., 45000"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Condition</label>
                <Select value={valuationForm.condition} onValueChange={(value) => 
                  setValuationForm(prev => ({ ...prev, condition: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">VIN</label>
                <Input
                  value={valuationForm.vin}
                  onChange={(e) => setValuationForm(prev => ({ ...prev, vin: e.target.value }))}
                  placeholder="Vehicle identification number"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Additional Notes</label>
              <Textarea
                value={valuationForm.notes}
                onChange={(e) => setValuationForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional details about the vehicle condition, modifications, etc."
                className="min-h-[80px]"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleGenerateValuation}>
                <Calculator className="mr-2 h-4 w-4" />
                Generate Valuation
              </Button>
              <Button variant="outline" onClick={() => setShowValuationForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Part Exchange List */}
      <Card>
        <CardHeader>
          <CardTitle>Part Exchange Requests</CardTitle>
          <CardDescription>Current vehicle valuations and trade-in offers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPartExchanges.map((exchange) => (
              <div key={exchange.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(exchange.status)}
                    <div>
                      <h4 className="font-medium">{exchange.customerName}</h4>
                      <p className="text-sm text-gray-600">{exchange.phone} • {exchange.date}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(exchange.status)}>
                    {exchange.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Current Vehicle */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900">Current Vehicle</h5>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Car className="h-4 w-4 text-gray-600" />
                        <span className="font-medium">
                          {exchange.currentVehicle.make} {exchange.currentVehicle.model} {exchange.currentVehicle.year}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">Mileage:</span>
                          <span className="ml-2 font-medium">{exchange.currentVehicle.mileage.toLocaleString()} km</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Condition:</span>
                          <span className={`ml-2 font-medium ${getConditionColor(exchange.currentVehicle.condition)}`}>
                            {exchange.currentVehicle.condition}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-gray-600">VIN:</span>
                          <span className="ml-2 font-mono text-xs">{exchange.currentVehicle.vin}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Valuation Details */}
                  <div className="space-y-3">
                    <h5 className="font-medium text-gray-900">Valuation Details</h5>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Market Value:</span>
                          <span className="font-medium">AED {exchange.marketValue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Condition Adjustment:</span>
                          <span className="font-medium text-red-600">
                            -AED {(exchange.marketValue - exchange.valuation).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                          <span>Final Offer:</span>
                          <span className="text-green-600">AED {exchange.valuation.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>New Vehicle: </span>
                      <span className="font-medium">{exchange.newVehicle}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span>Assigned to: </span>
                      <span className="font-medium">{exchange.salesperson}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Update Valuation
                  </Button>
                  {exchange.status === 'Pending Approval' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRejectOffer(exchange.id)}
                      >
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApproveOffer(exchange.id)}
                      >
                        Approve Offer
                      </Button>
                    </>
                  )}
                  {exchange.status === 'Approved' && (
                    <Button size="sm">
                      Create Deal
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}