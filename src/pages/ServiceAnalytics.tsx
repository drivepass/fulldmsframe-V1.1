import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Wrench, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  Star,
  AlertTriangle
} from 'lucide-react';

export default function ServiceAnalytics() {
  const [dateRange, setDateRange] = useState('30');
  const [serviceData] = useState({
    totalRevenue: 485000,
    totalJobs: 342,
    avgJobValue: 1418,
    customerSatisfaction: 4.6,
    avgTurnaround: 2.3,
    repeatCustomers: 68.5
  });

  const [serviceTypes] = useState([
    { type: 'Oil Change', jobs: 89, revenue: 8900, avgTime: 0.5, satisfaction: 4.8 },
    { type: 'Brake Service', jobs: 45, revenue: 22500, avgTime: 2.0, satisfaction: 4.7 },
    { type: 'Engine Diagnostics', jobs: 38, revenue: 19000, avgTime: 1.5, satisfaction: 4.5 },
    { type: 'Tire Service', jobs: 52, revenue: 15600, avgTime: 1.0, satisfaction: 4.6 },
    { type: 'Transmission Service', jobs: 28, revenue: 42000, avgTime: 4.0, satisfaction: 4.4 },
    { type: 'General Maintenance', jobs: 90, revenue: 27000, avgTime: 1.5, satisfaction: 4.7 }
  ]);

  const [technicians] = useState([
    { name: 'John Smith', jobs: 45, revenue: 67500, efficiency: 95, satisfaction: 4.8 },
    { name: 'Mike Johnson', jobs: 42, revenue: 63000, efficiency: 92, satisfaction: 4.7 },
    { name: 'David Brown', jobs: 38, revenue: 57000, efficiency: 88, satisfaction: 4.6 },
    { name: 'Chris Wilson', jobs: 35, revenue: 52500, efficiency: 90, satisfaction: 4.5 },
    { name: 'Tom Garcia', jobs: 32, revenue: 48000, efficiency: 87, satisfaction: 4.4 }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Service Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive service department performance and insights</p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Service Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(serviceData.totalRevenue)}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +8.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
              <Wrench className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{serviceData.totalJobs}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Avg Job Value</CardTitle>
              <DollarSign className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(serviceData.avgJobValue)}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -3.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{serviceData.customerSatisfaction}/5.0</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +0.2 from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Avg Turnaround</CardTitle>
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{serviceData.avgTurnaround} days</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
              -0.3 days improved
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Repeat Customers</CardTitle>
              <Users className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{serviceData.repeatCustomers}%</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +4.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Service Types</TabsTrigger>
          <TabsTrigger value="technicians">Technician Performance</TabsTrigger>
          <TabsTrigger value="capacity">Capacity Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Revenue Trend</CardTitle>
                <CardDescription>Monthly service revenue over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Service revenue trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Distribution</CardTitle>
                <CardDescription>Breakdown of service types by volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {serviceTypes.slice(0, 4).map((service, index) => (
                    <div key={service.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          index === 0 ? 'bg-blue-500' : 
                          index === 1 ? 'bg-green-500' : 
                          index === 2 ? 'bg-orange-500' : 'bg-purple-500'
                        }`}></div>
                        <span className="text-sm">{service.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{service.jobs} jobs</div>
                        <div className="text-xs text-gray-600">{formatCurrency(service.revenue)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Service Type Performance</CardTitle>
              <CardDescription>Detailed breakdown of each service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceTypes.map((service) => (
                  <div key={service.type} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Wrench className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{service.type}</h4>
                        <p className="text-sm text-gray-600">
                          {service.jobs} jobs • Avg {service.avgTime}h • {service.satisfaction}★
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(service.revenue)}</div>
                      <div className="text-xs text-gray-600">
                        Avg: {formatCurrency(service.revenue / service.jobs)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technicians" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technician Performance</CardTitle>
              <CardDescription>Individual technician metrics and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {technicians.map((tech, index) => (
                  <div key={tech.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{tech.name}</h4>
                        <p className="text-sm text-gray-600">
                          {tech.jobs} jobs • {tech.efficiency}% efficiency • {tech.satisfaction}★
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(tech.revenue)}</div>
                      <div className="text-xs text-gray-600">
                        Avg: {formatCurrency(tech.revenue / tech.jobs)}/job
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="capacity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bay Utilization</CardTitle>
                <CardDescription>Service bay usage and availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Bay 1 - General Service</h4>
                      <p className="text-sm text-gray-600">Currently occupied</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800">85% Utilization</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Bay 2 - Engine Work</h4>
                      <p className="text-sm text-gray-600">Available</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-blue-100 text-blue-800">72% Utilization</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Bay 3 - Quick Service</h4>
                      <p className="text-sm text-gray-600">Currently occupied</p>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-orange-100 text-orange-800">92% Utilization</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Capacity Recommendations</CardTitle>
                <CardDescription>Optimization suggestions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium text-green-800">Optimal Performance</h4>
                    <p className="text-sm text-green-700">Current capacity utilization is well balanced</p>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-medium text-yellow-800">Peak Hours</h4>
                    <p className="text-sm text-yellow-700">Consider additional staff for 10AM-2PM</p>
                  </div>
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-blue-800">Equipment</h4>
                    <p className="text-sm text-blue-700">Diagnostic equipment showing high usage</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}