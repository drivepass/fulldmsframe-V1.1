import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Filter, Download, Eye, Edit, Car, AlertTriangle } from 'lucide-react';

const mockInventory = [
  {
    id: 'BMW001',
    brand: 'BMW',
    model: 'X5',
    year: 2024,
    color: 'Alpine White',
    price: 185000,
    cost: 165000,
    status: 'Available',
    location: 'Showroom A',
    vin: 'WBAFR9C50LC123456',
    mileage: 15,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    dateAdded: '2024-01-10',
    reservedBy: null,
    images: 3
  },
  {
    id: 'MER002',
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2024,
    color: 'Obsidian Black',
    price: 155000,
    cost: 140000,
    status: 'Reserved',
    location: 'Showroom B',
    vin: 'WDD2050461F123456',
    mileage: 8,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    dateAdded: '2024-01-08',
    reservedBy: 'Sarah Johnson',
    images: 5
  },
  {
    id: 'AUD003',
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    color: 'Glacier White',
    price: 125000,
    cost: 115000,
    status: 'Sold',
    location: 'Delivered',
    vin: 'WAUZZZ8K8DA123456',
    mileage: 1250,
    fuelType: 'Petrol',
    transmission: 'Automatic',
    dateAdded: '2023-12-15',
    reservedBy: null,
    images: 4
  },
  {
    id: 'TOY004',
    brand: 'Toyota',
    model: 'Camry',
    year: 2024,
    color: 'Silver Metallic',
    price: 95000,
    cost: 85000,
    status: 'In Transit',
    location: 'Port Rashid',
    vin: 'JTDKARFP1L2123456',
    mileage: 0,
    fuelType: 'Hybrid',
    transmission: 'CVT',
    dateAdded: '2024-01-12',
    reservedBy: null,
    images: 2
  }
];

export default function InventoryManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Reserved': return 'bg-yellow-100 text-yellow-800';
      case 'Sold': return 'bg-blue-100 text-blue-800';
      case 'In Transit': return 'bg-purple-100 text-purple-800';
      case 'Service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} AED`;
  };

  const filteredInventory = mockInventory.filter(vehicle => {
    const matchesSearch = vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = brandFilter === 'all' || vehicle.brand === brandFilter;
    const matchesStatus = statusFilter === 'all' || vehicle.status === statusFilter;
    const matchesLocation = locationFilter === 'all' || vehicle.location === locationFilter;
    return matchesSearch && matchesBrand && matchesStatus && matchesLocation;
  });

  const totalValue = mockInventory.reduce((sum, vehicle) => sum + vehicle.price, 0);
  const availableCount = mockInventory.filter(v => v.status === 'Available').length;
  const reservedCount = mockInventory.filter(v => v.status === 'Reserved').length;
  const soldCount = mockInventory.filter(v => v.status === 'Sold').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600">Manage vehicle inventory and stock levels</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Vehicle
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInventory.length}</div>
            <p className="text-xs text-green-600">+3 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{availableCount}</div>
            <p className="text-xs text-gray-600">Ready for sale</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Reserved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{reservedCount}</div>
            <p className="text-xs text-gray-600">Pending delivery</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-blue-600">Inventory worth</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={brandFilter} onValueChange={setBrandFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                <SelectItem value="BMW">BMW</SelectItem>
                <SelectItem value="Mercedes">Mercedes</SelectItem>
                <SelectItem value="Audi">Audi</SelectItem>
                <SelectItem value="Toyota">Toyota</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Reserved">Reserved</SelectItem>
                <SelectItem value="Sold">Sold</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
              </SelectContent>
            </Select>
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Showroom A">Showroom A</SelectItem>
                <SelectItem value="Showroom B">Showroom B</SelectItem>
                <SelectItem value="Port Rashid">Port Rashid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Inventory ({filteredInventory.length})</CardTitle>
          <CardDescription>Complete list of vehicles in stock</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Reserved By</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInventory.map((vehicle) => (
                <TableRow key={vehicle.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Car className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{vehicle.brand} {vehicle.model}</div>
                        <div className="text-sm text-gray-500">{vehicle.year} • {vehicle.color}</div>
                        <div className="text-xs text-gray-400">ID: {vehicle.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>VIN: {vehicle.vin}</div>
                      <div>{vehicle.mileage.toLocaleString()} km</div>
                      <div>{vehicle.fuelType} • {vehicle.transmission}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{formatCurrency(vehicle.price)}</div>
                      <div className="text-sm text-gray-500">Cost: {formatCurrency(vehicle.cost)}</div>
                      <div className="text-xs text-green-600">
                        Margin: {formatCurrency(vehicle.price - vehicle.cost)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{vehicle.location}</TableCell>
                  <TableCell>
                    {vehicle.reservedBy ? (
                      <div className="text-sm">
                        <div className="font-medium">{vehicle.reservedBy}</div>
                        <div className="text-gray-500">Reserved</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {vehicle.mileage > 1000 && (
                        <Button variant="ghost" size="sm" className="text-yellow-600">
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory by Brand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['BMW', 'Mercedes', 'Audi', 'Toyota'].map(brand => {
                const count = mockInventory.filter(v => v.brand === brand).length;
                const percentage = (count / mockInventory.length) * 100;
                return (
                  <div key={brand} className="flex items-center justify-between">
                    <span>{brand}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>BMW X5 (BMW001) marked as Available</span>
                <span className="text-gray-500 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Mercedes C-Class reserved by Sarah Johnson</span>
                <span className="text-gray-500 ml-auto">4h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Audi A4 (AUD003) sold and delivered</span>
                <span className="text-gray-500 ml-auto">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}