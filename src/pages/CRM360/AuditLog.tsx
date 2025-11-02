import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download, Eye, Shield, User, Settings, Database } from 'lucide-react';

const mockAuditLogs = [
  {
    id: 1,
    timestamp: '2024-01-20 14:30:15',
    user: 'Ahmed Al-Rashid',
    action: 'LOGIN',
    resource: 'System',
    details: 'User logged in successfully',
    ipAddress: '192.168.1.100',
    userAgent: 'Chrome 120.0.0.0',
    status: 'Success',
    category: 'Authentication'
  },
  {
    id: 2,
    timestamp: '2024-01-20 14:25:32',
    user: 'Fatima Al-Zahra',
    action: 'UPDATE',
    resource: 'Lead #1247',
    details: 'Updated lead status from "New" to "Contacted"',
    ipAddress: '192.168.1.101',
    userAgent: 'Chrome 120.0.0.0',
    status: 'Success',
    category: 'Data Modification'
  },
  {
    id: 3,
    timestamp: '2024-01-20 14:20:45',
    user: 'Omar Hassan',
    action: 'CREATE',
    resource: 'Customer #2156',
    details: 'Created new customer record for Michael Brown',
    ipAddress: '192.168.1.102',
    userAgent: 'Firefox 121.0.0.0',
    status: 'Success',
    category: 'Data Creation'
  },
  {
    id: 4,
    timestamp: '2024-01-20 14:15:18',
    user: 'System',
    action: 'BACKUP',
    resource: 'Database',
    details: 'Automated database backup completed',
    ipAddress: 'localhost',
    userAgent: 'System Process',
    status: 'Success',
    category: 'System Operation'
  },
  {
    id: 5,
    timestamp: '2024-01-20 14:10:22',
    user: 'Sarah Wilson',
    action: 'DELETE',
    resource: 'User #45',
    details: 'Deleted inactive user account',
    ipAddress: '192.168.1.103',
    userAgent: 'Chrome 120.0.0.0',
    status: 'Success',
    category: 'User Management'
  },
  {
    id: 6,
    timestamp: '2024-01-20 14:05:33',
    user: 'Unknown',
    action: 'LOGIN_FAILED',
    resource: 'System',
    details: 'Failed login attempt with invalid credentials',
    ipAddress: '203.0.113.45',
    userAgent: 'Chrome 119.0.0.0',
    status: 'Failed',
    category: 'Security'
  }
];

export default function AuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'LOGIN':
      case 'LOGOUT': return <User className="h-4 w-4 text-blue-600" />;
      case 'CREATE':
      case 'UPDATE':
      case 'DELETE': return <Database className="h-4 w-4 text-green-600" />;
      case 'LOGIN_FAILED': return <Shield className="h-4 w-4 text-red-600" />;
      case 'BACKUP':
      case 'RESTORE': return <Settings className="h-4 w-4 text-purple-600" />;
      default: return <Eye className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Authentication': return 'bg-blue-100 text-blue-800';
      case 'Data Modification': return 'bg-green-100 text-green-800';
      case 'Data Creation': return 'bg-purple-100 text-purple-800';
      case 'User Management': return 'bg-orange-100 text-orange-800';
      case 'System Operation': return 'bg-gray-100 text-gray-800';
      case 'Security': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = mockAuditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action === actionFilter;
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || log.category === categoryFilter;
    return matchesSearch && matchesAction && matchesStatus && matchesCategory;
  });

  const totalLogs = mockAuditLogs.length;
  const successfulActions = mockAuditLogs.filter(l => l.status === 'Success').length;
  const failedActions = mockAuditLogs.filter(l => l.status === 'Failed').length;
  const securityEvents = mockAuditLogs.filter(l => l.category === 'Security').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Log</h1>
          <p className="text-gray-600">System activity tracking and security monitoring</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLogs}</div>
            <p className="text-xs text-gray-600">All logged activities</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Successful Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{successfulActions}</div>
            <p className="text-xs text-green-600">{((successfulActions/totalLogs)*100).toFixed(0)}% success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Failed Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failedActions}</div>
            <p className="text-xs text-red-600">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{securityEvents}</div>
            <p className="text-xs text-orange-600">Security monitoring</p>
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
                  placeholder="Search audit logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="LOGIN">Login</SelectItem>
                <SelectItem value="CREATE">Create</SelectItem>
                <SelectItem value="UPDATE">Update</SelectItem>
                <SelectItem value="DELETE">Delete</SelectItem>
                <SelectItem value="LOGIN_FAILED">Login Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Authentication">Authentication</SelectItem>
                <SelectItem value="Data Modification">Data Modification</SelectItem>
                <SelectItem value="User Management">User Management</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Events ({filteredLogs.length})</CardTitle>
          <CardDescription>Detailed system activity log</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-gray-50">
                  <TableCell className="font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span>{log.user}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getActionIcon(log.action)}
                      <span className="font-medium">{log.action}</span>
                    </div>
                  </TableCell>
                  <TableCell>{log.resource}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(log.status)}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(log.category)} variant="outline">
                      {log.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {log.ipAddress}
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {log.details}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Security Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Authentication', 'Data Modification', 'User Management', 'Security'].map(category => {
                const count = mockAuditLogs.filter(l => l.category === category).length;
                const percentage = count > 0 ? (count / totalLogs) * 100 : 0;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span>{category}</span>
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
            <CardTitle>Recent Security Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAuditLogs
                .filter(l => l.category === 'Security' || l.status === 'Failed')
                .slice(0, 5)
                .map((log) => (
                  <div key={log.id} className="flex items-center space-x-3 text-sm">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="flex-1">{log.details}</span>
                    <span className="text-gray-500">{log.timestamp.split(' ')[1]}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}