import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Target, Users, Calendar } from 'lucide-react';

const salesData = [
  {
    salesperson: 'Ahmed Al-Rashid',
    target: 2000000,
    achieved: 1750000,
    deals: 12,
    conversion: 68,
    avgDealSize: 145833,
    trend: 'up'
  },
  {
    salesperson: 'Fatima Al-Zahra',
    target: 1800000,
    achieved: 1920000,
    deals: 15,
    conversion: 72,
    avgDealSize: 128000,
    trend: 'up'
  },
  {
    salesperson: 'Omar Hassan',
    target: 1500000,
    achieved: 1350000,
    deals: 9,
    conversion: 65,
    avgDealSize: 150000,
    trend: 'down'
  },
  {
    salesperson: 'Khalid Al-Mansouri',
    target: 1600000,
    achieved: 1680000,
    deals: 11,
    conversion: 70,
    avgDealSize: 152727,
    trend: 'up'
  }
];

export default function SalesPerformance() {
  const formatCurrency = (amount: number) => {
    return `${(amount / 1000).toFixed(0)}K AED`;
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const totalTarget = salesData.reduce((sum, person) => sum + person.target, 0);
  const totalAchieved = salesData.reduce((sum, person) => sum + person.achieved, 0);
  const totalDeals = salesData.reduce((sum, person) => sum + person.deals, 0);
  const avgConversion = salesData.reduce((sum, person) => sum + person.conversion, 0) / salesData.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Performance</h1>
          <p className="text-gray-600">Track sales metrics and team performance</p>
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
          <Button>Export Report</Button>
        </div>
      </div>

      {/* Overall Performance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAchieved)}</div>
            <div className="flex items-center text-xs mt-1">
              <span className="text-gray-600">Target: {formatCurrency(totalTarget)}</span>
              <Badge className="ml-2 bg-green-100 text-green-800">
                {((totalAchieved / totalTarget) * 100).toFixed(1)}%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Target className="mr-2 h-4 w-4" />
              Total Deals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeals}</div>
            <p className="text-xs text-green-600">+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Avg Conversion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgConversion.toFixed(1)}%</div>
            <p className="text-xs text-green-600">+2.3% improvement</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Avg Deal Size
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(totalAchieved / totalDeals)}
            </div>
            <p className="text-xs text-green-600">+12K from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Team Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Team Performance</CardTitle>
          <CardDescription>Individual salesperson metrics and targets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {salesData.map((person, index) => {
              const achievementPercentage = (person.achieved / person.target) * 100;
              return (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{person.salesperson}</h3>
                      <p className="text-sm text-gray-600">
                        {formatCurrency(person.achieved)} / {formatCurrency(person.target)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={achievementPercentage >= 100 ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {achievementPercentage.toFixed(1)}%
                      </Badge>
                      {person.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </div>
                  
                  <Progress 
                    value={Math.min(achievementPercentage, 100)} 
                    className="mb-4"
                  />
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Deals Closed:</span>
                      <div className="font-semibold">{person.deals}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Conversion Rate:</span>
                      <div className="font-semibold">{person.conversion}%</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Avg Deal Size:</span>
                      <div className="font-semibold">{formatCurrency(person.avgDealSize)}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Trend</CardTitle>
            <CardDescription>Revenue performance over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart visualization would go here
              <br />
              (Revenue trend over 12 months)
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Brand</CardTitle>
            <CardDescription>Revenue breakdown by car brands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>BMW</span>
                <div className="flex items-center space-x-2">
                  <Progress value={35} className="w-20" />
                  <span className="text-sm font-medium">35%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Mercedes</span>
                <div className="flex items-center space-x-2">
                  <Progress value={28} className="w-20" />
                  <span className="text-sm font-medium">28%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Audi</span>
                <div className="flex items-center space-x-2">
                  <Progress value={22} className="w-20" />
                  <span className="text-sm font-medium">22%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Toyota</span>
                <div className="flex items-center space-x-2">
                  <Progress value={15} className="w-20" />
                  <span className="text-sm font-medium">15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}