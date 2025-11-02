import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, BarChart3, PieChart, Download, Calendar } from 'lucide-react';

export default function ReportsAnalytics() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Business intelligence and performance analytics</p>
        </div>
        <div className="flex space-x-3">
          <Select defaultValue="month">
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.25M AED</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-green-600">+12.5%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.8%</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-green-600">+2.1%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-green-600">+0.2</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Market Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.2%</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingDown className="mr-1 h-3 w-3 text-red-600" />
              <span className="text-red-600">-0.8%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Sales Performance
            </CardTitle>
            <CardDescription>Monthly sales trends and targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Sales performance chart would be displayed here
              <br />
              (Bar chart showing monthly sales vs targets)
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="mr-2 h-5 w-5" />
              Lead Sources
            </CardTitle>
            <CardDescription>Distribution of lead generation channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Website</span>
                <div className="flex items-center space-x-2">
                  <Progress value={35} className="w-20" />
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Referrals</span>
                <div className="flex items-center space-x-2">
                  <Progress value={28} className="w-20" />
                  <span className="text-sm font-medium">28%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Social Media</span>
                <div className="flex items-center space-x-2">
                  <Progress value={22} className="w-20" />
                  <span className="text-sm font-medium">22%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Walk-in</span>
                <div className="flex items-center space-x-2">
                  <Progress value={15} className="w-20" />
                  <span className="text-sm font-medium">15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Customers</span>
                <span className="font-semibold">127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Returning Customers</span>
                <span className="font-semibold">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Customer Lifetime Value</span>
                <span className="font-semibold">185K AED</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Churn Rate</span>
                <span className="font-semibold text-red-600">3.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Top Performer</span>
                <span className="font-semibold">Fatima Al-Zahra</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Deals per Rep</span>
                <span className="font-semibold">11.8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Team Conversion Rate</span>
                <span className="font-semibold text-green-600">68.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Response Time</span>
                <span className="font-semibold">2.3 hours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Inventory Turnover</span>
                <span className="font-semibold">6.2x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fast Moving Models</span>
                <span className="font-semibold">BMW X5, Mercedes C-Class</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Days on Lot</span>
                <span className="font-semibold">45 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Stock Value</span>
                <span className="font-semibold">12.5M AED</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends and Forecasting */}
      <Card>
        <CardHeader>
          <CardTitle>Business Trends & Forecasting</CardTitle>
          <CardDescription>Predictive analytics and trend analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">Q2 Forecast</div>
              <div className="text-sm text-gray-600">5.2M AED Revenue</div>
              <Badge className="mt-2 bg-blue-100 text-blue-800">+18% Growth</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">Peak Season</div>
              <div className="text-sm text-gray-600">March - May</div>
              <Badge className="mt-2 bg-green-100 text-green-800">High Demand</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Market Trend</div>
              <div className="text-sm text-gray-600">SUV Preference</div>
              <Badge className="mt-2 bg-purple-100 text-purple-800">+25% YoY</Badge>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">Digital Leads</div>
              <div className="text-sm text-gray-600">Growing Channel</div>
              <Badge className="mt-2 bg-orange-100 text-orange-800">+40% Growth</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}