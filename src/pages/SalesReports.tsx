import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Car,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

export default function SalesReports() {
  const [dateRange, setDateRange] = useState('30');
  const [salesData] = useState({
    totalSales: 1250000,
    totalUnits: 85,
    avgDealValue: 14706,
    conversionRate: 23.5,
    monthlyGrowth: 12.3,
    quarterlyGrowth: 8.7
  });

  const [topPerformers] = useState([
    { name: 'Sarah Johnson', sales: 18, revenue: 265000, commission: 13250 },
    { name: 'Mike Chen', sales: 15, revenue: 220000, commission: 11000 },
    { name: 'David Wilson', sales: 12, revenue: 180000, commission: 9000 },
    { name: 'Lisa Brown', sales: 10, revenue: 145000, commission: 7250 },
    { name: 'Tom Garcia', sales: 8, revenue: 120000, commission: 6000 }
  ]);

  const [salesByModel] = useState([
    { model: 'BMW 3 Series', units: 22, revenue: 880000, percentage: 25.9 },
    { model: 'BMW X5', units: 18, revenue: 1080000, percentage: 21.2 },
    { model: 'BMW 5 Series', units: 15, revenue: 750000, percentage: 17.6 },
    { model: 'BMW X3', units: 12, revenue: 480000, percentage: 14.1 },
    { model: 'BMW 7 Series', units: 10, revenue: 700000, percentage: 11.8 },
    { model: 'Other Models', units: 8, revenue: 340000, percentage: 9.4 }
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
          <h1 className="text-3xl font-bold text-gray-900">Sales Reports</h1>
          <p className="text-gray-600 mt-1">Comprehensive sales performance analytics and insights</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{formatCurrency(salesData.totalSales)}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{salesData.monthlyGrowth}% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
              <Car className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{salesData.totalUnits}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +{salesData.quarterlyGrowth}% from last quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Avg Deal Value</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{formatCurrency(salesData.avgDealValue)}</div>
            <div className="flex items-center text-xs text-gray-600 mt-1">
              <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{salesData.conversionRate}%</div>
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
          <TabsTrigger value="performance">Sales Performance</TabsTrigger>
          <TabsTrigger value="products">Product Analysis</TabsTrigger>
          <TabsTrigger value="trends">Trends & Forecasting</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales Trend</CardTitle>
                <CardDescription>Revenue and units sold over the last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Sales trend chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales by Channel</CardTitle>
                <CardDescription>Revenue distribution across different sales channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Showroom</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(750000)}</div>
                      <div className="text-xs text-gray-600">60%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Online</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(375000)}</div>
                      <div className="text-xs text-gray-600">30%</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Referrals</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(125000)}</div>
                      <div className="text-xs text-gray-600">10%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Sales Performers</CardTitle>
              <CardDescription>Individual sales performance for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={performer.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{performer.name}</h4>
                        <p className="text-sm text-gray-600">{performer.sales} units sold</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(performer.revenue)}</div>
                      <div className="text-xs text-gray-600">Commission: {formatCurrency(performer.commission)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Vehicle Model</CardTitle>
              <CardDescription>Performance breakdown by vehicle model</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesByModel.map((model) => (
                  <div key={model.model} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Car className="h-5 w-5 text-gray-400" />
                      <div>
                        <h4 className="font-medium">{model.model}</h4>
                        <p className="text-sm text-gray-600">{model.units} units • {model.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{formatCurrency(model.revenue)}</div>
                      <div className="text-xs text-gray-600">Avg: {formatCurrency(model.revenue / model.units)}</div>
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
                <CardTitle>Sales Forecast</CardTitle>
                <CardDescription>Projected sales for the next 3 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Next Month</h4>
                      <p className="text-sm text-gray-600">Based on current trends</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">{formatCurrency(1400000)}</div>
                      <div className="text-xs text-gray-600">+12% projected growth</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Quarter End</h4>
                      <p className="text-sm text-gray-600">Q4 projection</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{formatCurrency(4200000)}</div>
                      <div className="text-xs text-gray-600">+8% vs last quarter</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
                <CardDescription>Key trends and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <h4 className="font-medium text-green-800">Strong Performance</h4>
                    <p className="text-sm text-green-700">Luxury models showing 15% growth</p>
                  </div>
                  <div className="p-3 border-l-4 border-yellow-500 bg-yellow-50">
                    <h4 className="font-medium text-yellow-800">Opportunity</h4>
                    <p className="text-sm text-yellow-700">Electric vehicle segment underperforming</p>
                  </div>
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-blue-800">Recommendation</h4>
                    <p className="text-sm text-blue-700">Focus on Q4 promotional campaigns</p>
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