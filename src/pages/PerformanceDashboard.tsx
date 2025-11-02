import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Car,
  Wrench,
  Target,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';

export default function PerformanceDashboard() {
  const [dateRange, setDateRange] = useState('30');
  const [kpis] = useState({
    totalRevenue: 1735000,
    salesRevenue: 1250000,
    serviceRevenue: 485000,
    totalCustomers: 1247,
    newCustomers: 189,
    customerRetention: 84.5,
    salesConversion: 23.5,
    serviceUtilization: 78.2
  });

  const [goals] = useState([
    { metric: 'Monthly Revenue', target: 2000000, current: 1735000, progress: 86.8, status: 'on-track' },
    { metric: 'New Customers', target: 200, current: 189, progress: 94.5, status: 'on-track' },
    { metric: 'Service Utilization', target: 85, current: 78.2, progress: 92.0, status: 'behind' },
    { metric: 'Customer Satisfaction', target: 4.5, current: 4.6, progress: 102.2, status: 'exceeded' },
    { metric: 'Sales Conversion', target: 25, current: 23.5, progress: 94.0, status: 'on-track' }
  ]);

  const [alerts] = useState([
    { type: 'warning', message: 'Service bay utilization below target', priority: 'medium' },
    { type: 'success', message: 'Customer satisfaction exceeded target', priority: 'low' },
    { type: 'error', message: 'Inventory levels critical for BMW X5', priority: 'high' },
    { type: 'info', message: 'Q4 sales forecast updated', priority: 'low' }
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'exceeded': return 'bg-green-100 text-green-800';
      case 'on-track': return 'bg-blue-100 text-blue-800';
      case 'behind': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time business performance metrics and KPIs</p>
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

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(kpis.totalRevenue)}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +10.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{kpis.totalCustomers.toLocaleString()}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{kpis.newCustomers} new this month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{kpis.customerRetention}%</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Sales Conversion</CardTitle>
              <Award className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{kpis.salesConversion}%</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +1.8% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals & Targets</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Notifications</TabsTrigger>
          <TabsTrigger value="trends">Trends Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>Sales vs Service revenue distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Car className="h-5 w-5 text-blue-600" />
                      <div>
                        <h4 className="font-medium">Sales Revenue</h4>
                        <p className="text-sm text-gray-600">Vehicle sales and financing</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{formatCurrency(kpis.salesRevenue)}</div>
                      <div className="text-xs text-gray-600">72% of total</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-green-600" />
                      <div>
                        <h4 className="font-medium">Service Revenue</h4>
                        <p className="text-sm text-gray-600">Maintenance and repairs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{formatCurrency(kpis.serviceRevenue)}</div>
                      <div className="text-xs text-gray-600">28% of total</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
                <CardDescription>Current month performance summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Service Utilization</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${kpis.serviceUtilization}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{kpis.serviceUtilization}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sales Conversion</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${kpis.salesConversion * 4}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{kpis.salesConversion}%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Customer Retention</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: `${kpis.customerRetention}%` }}></div>
                      </div>
                      <span className="text-sm font-medium">{kpis.customerRetention}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Goals & Targets</CardTitle>
              <CardDescription>Progress towards monthly and quarterly targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div key={goal.metric} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Target className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{goal.metric}</h4>
                        <p className="text-sm text-gray-600">
                          {typeof goal.current === 'number' && goal.current > 1000 
                            ? formatCurrency(goal.current) 
                            : goal.current
                          } / {typeof goal.target === 'number' && goal.target > 1000 
                            ? formatCurrency(goal.target) 
                            : goal.target
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            goal.status === 'exceeded' ? 'bg-green-500' :
                            goal.status === 'on-track' ? 'bg-blue-500' :
                            goal.status === 'behind' ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(goal.progress, 100)}%` }}
                        ></div>
                      </div>
                      <Badge className={getStatusColor(goal.status)}>
                        {goal.progress.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
              <CardDescription>Important updates and action items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {alert.priority} priority
                        </Badge>
                        <span className="text-xs text-gray-500">
                          <Clock className="h-3 w-3 inline mr-1" />
                          2 hours ago
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>12-month revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Revenue trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Insights</CardTitle>
                <CardDescription>Key trends and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium text-green-800">Strong Growth</h4>
                    <p className="text-sm text-green-700">Revenue up 10.2% month-over-month</p>
                  </div>
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-blue-800">Customer Acquisition</h4>
                    <p className="text-sm text-blue-700">New customer rate exceeding targets</p>
                  </div>
                  <div className="p-3 border-l-4 border-orange-500 bg-orange-50">
                    <h4 className="font-medium text-orange-800">Service Opportunity</h4>
                    <p className="text-sm text-orange-700">Service utilization below optimal levels</p>
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