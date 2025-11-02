import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, PieChart, BarChart3, Download } from 'lucide-react';

const financialData = {
  revenue: {
    current: 4250000,
    previous: 3890000,
    target: 4500000
  },
  profit: {
    current: 850000,
    previous: 778000,
    margin: 20
  },
  expenses: {
    current: 3400000,
    categories: {
      inventory: 2500000,
      salaries: 450000,
      marketing: 200000,
      operations: 250000
    }
  },
  cashFlow: {
    inflow: 4250000,
    outflow: 3400000,
    net: 850000
  }
};

export default function FinancialReports() {
  const formatCurrency = (amount: number) => {
    return `${(amount / 1000).toFixed(0)}K AED`;
  };

  const calculateGrowth = (current: number, previous: number) => {
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const revenueGrowth = calculateGrowth(financialData.revenue.current, financialData.revenue.previous);
  const profitGrowth = calculateGrowth(financialData.profit.current, financialData.profit.previous);
  const revenueProgress = (financialData.revenue.current / financialData.revenue.target) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
          <p className="text-gray-600">Track financial performance and key metrics</p>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialData.revenue.current)}</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-green-600">+{revenueGrowth}%</span>
              <span className="text-gray-600 ml-2">vs last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <BarChart3 className="mr-2 h-4 w-4" />
              Net Profit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(financialData.profit.current)}</div>
            <div className="flex items-center text-xs mt-1">
              <TrendingUp className="mr-1 h-3 w-3 text-green-600" />
              <span className="text-green-600">+{profitGrowth}%</span>
              <span className="text-gray-600 ml-2">Margin: {financialData.profit.margin}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cash Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{formatCurrency(financialData.cashFlow.net)}</div>
            <div className="text-xs text-gray-600">
              In: {formatCurrency(financialData.cashFlow.inflow)} | 
              Out: {formatCurrency(financialData.cashFlow.outflow)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Target Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueProgress.toFixed(1)}%</div>
            <Progress value={revenueProgress} className="mt-2" />
            <p className="text-xs text-gray-600 mt-1">
              {formatCurrency(financialData.revenue.target - financialData.revenue.current)} to target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Monthly revenue analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>New Vehicle Sales</span>
                <div className="flex items-center space-x-2">
                  <Progress value={65} className="w-20" />
                  <span className="text-sm font-medium">2,762K AED</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Used Vehicle Sales</span>
                <div className="flex items-center space-x-2">
                  <Progress value={25} className="w-20" />
                  <span className="text-sm font-medium">1,063K AED</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Service & Parts</span>
                <div className="flex items-center space-x-2">
                  <Progress value={8} className="w-20" />
                  <span className="text-sm font-medium">340K AED</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Insurance & Finance</span>
                <div className="flex items-center space-x-2">
                  <Progress value={2} className="w-20" />
                  <span className="text-sm font-medium">85K AED</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Cost analysis by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(financialData.expenses.categories).map(([category, amount]) => {
                const percentage = (amount / financialData.expenses.current) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="capitalize">{category}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={percentage} className="w-20" />
                      <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profitability Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gross Profit Margin</span>
                <span className="font-semibold">22.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Net Profit Margin</span>
                <span className="font-semibold">20.0%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">ROI</span>
                <span className="font-semibold text-green-600">15.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">EBITDA</span>
                <span className="font-semibold">{formatCurrency(920000)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Units Sold</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg Sale Price</span>
                <span className="font-semibold">{formatCurrency(90426)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Conversion Rate</span>
                <span className="font-semibold text-green-600">23.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Sales per Rep</span>
                <span className="font-semibold">{formatCurrency(1062500)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Inventory Turnover</span>
                <span className="font-semibold">6.2x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Days Sales Outstanding</span>
                <span className="font-semibold">18 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Operating Ratio</span>
                <span className="font-semibold">80%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cost per Lead</span>
                <span className="font-semibold">245 AED</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Trends</CardTitle>
          <CardDescription>12-month performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-gray-500">
            Financial trend charts would be displayed here
            <br />
            (Revenue, Profit, Cash Flow over time)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}