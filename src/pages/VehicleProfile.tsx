import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Car, Calendar, Shield, FileText, Plus, Wrench } from 'lucide-react';

export default function VehicleProfile() {
  const { id } = useParams();
  
  const vehicle = {
    id: id,
    vin: 'WBXHT910X0L123456',
    model: 'BMW X5 xDrive40i',
    year: 2024,
    color: 'Alpine White',
    purchaseDate: '2024-01-15',
    mileage: 1250,
    owner: 'John Smith',
    phone: '+971501234567',
    email: 'john.smith@email.com'
  };

  const serviceRecords = [
    {
      id: 1,
      date: '2024-01-20',
      type: 'Oil Change',
      mileage: 1000,
      cost: 450,
      workshop: 'BMW Service Center',
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024-01-10',
      type: 'Pre-delivery Inspection',
      mileage: 50,
      cost: 0,
      workshop: 'BMW Service Center',
      status: 'Completed'
    }
  ];

  const warranty = {
    type: 'Manufacturer Warranty',
    startDate: '2024-01-15',
    endDate: '2027-01-15',
    mileageLimit: 100000,
    status: 'Active',
    coverage: ['Engine', 'Transmission', 'Electrical', 'Air Conditioning']
  };

  const insurance = {
    provider: 'AXA Insurance',
    policyNumber: 'AXA-BMW-2024-001',
    startDate: '2024-01-15',
    endDate: '2025-01-15',
    premium: 3500,
    status: 'Active'
  };

  const accessories = [
    { name: 'Floor Mats', price: 350, installed: true },
    { name: 'Window Tinting', price: 800, installed: true },
    { name: 'Paint Protection Film', price: 2500, installed: false },
    { name: 'Dash Cam', price: 650, installed: false }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vehicle Profile</h1>
          <p className="text-gray-600">{vehicle.model} - VIN: {vehicle.vin}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Service Record
        </Button>
      </div>

      {/* Vehicle Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-5 w-5" />
            <span>Vehicle Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Model</p>
                <p className="font-semibold">{vehicle.model}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Year</p>
                <p className="font-semibold">{vehicle.year}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Color</p>
                <p className="font-semibold">{vehicle.color}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">VIN</p>
                <p className="font-semibold font-mono text-sm">{vehicle.vin}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Purchase Date</p>
                <p className="font-semibold">{vehicle.purchaseDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Mileage</p>
                <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Owner</p>
                <p className="font-semibold">{vehicle.owner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold">{vehicle.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-semibold">{vehicle.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="service" className="space-y-4">
        <TabsList>
          <TabsTrigger value="service">Service Records</TabsTrigger>
          <TabsTrigger value="warranty">Warranty</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="accessories">Accessories</TabsTrigger>
        </TabsList>

        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Service History</CardTitle>
              <CardDescription>Complete maintenance and repair history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{record.type}</h4>
                        <p className="text-sm text-gray-600">
                          {record.date} • {record.mileage.toLocaleString()} km • {record.workshop}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">AED {record.cost}</p>
                      <Badge className="bg-green-100 text-green-800">
                        {record.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Link Workshop Job
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="warranty">
          <Card>
            <CardHeader>
              <CardTitle>Warranty Information</CardTitle>
              <CardDescription>Current warranty coverage and details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Warranty Type</p>
                    <p className="font-semibold">{warranty.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Start Date</p>
                    <p className="font-semibold">{warranty.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">End Date</p>
                    <p className="font-semibold">{warranty.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mileage Limit</p>
                    <p className="font-semibold">{warranty.mileageLimit.toLocaleString()} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className="bg-green-100 text-green-800">
                      {warranty.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-3">Coverage Areas</p>
                  <div className="space-y-2">
                    {warranty.coverage.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Details</CardTitle>
              <CardDescription>Current insurance policy information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Insurance Provider</p>
                    <p className="font-semibold">{insurance.provider}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Policy Number</p>
                    <p className="font-semibold font-mono text-sm">{insurance.policyNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Policy Start</p>
                    <p className="font-semibold">{insurance.startDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Policy End</p>
                    <p className="font-semibold">{insurance.endDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Annual Premium</p>
                    <p className="font-semibold">AED {insurance.premium.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <Badge className="bg-green-100 text-green-800">
                      {insurance.status}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button className="w-full" variant="outline">
                    <FileText className="mr-2 h-4 w-4" />
                    Download Policy
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Calendar className="mr-2 h-4 w-4" />
                    Renew Policy
                  </Button>
                  <Button className="w-full" variant="outline">
                    Send Reminder
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessories">
          <Card>
            <CardHeader>
              <CardTitle>Accessories</CardTitle>
              <CardDescription>Installed and available accessories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {accessories.map((accessory, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{accessory.name}</h4>
                      <p className="text-sm text-gray-600">AED {accessory.price}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={accessory.installed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                        {accessory.installed ? 'Installed' : 'Available'}
                      </Badge>
                      {!accessory.installed && (
                        <Button size="sm" variant="outline">
                          Add Accessory
                        </Button>
                      )}
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