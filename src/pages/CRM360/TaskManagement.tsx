import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Clock, User, Plus, Search, Filter, AlertTriangle } from 'lucide-react';

const mockTasks = [
  {
    id: 1,
    title: 'Follow up with John Smith - BMW X5',
    description: 'Customer interested in test drive. Schedule appointment.',
    priority: 'High',
    status: 'Pending',
    assignee: 'Ahmed Al-Rashid',
    dueDate: '2024-01-25',
    customerName: 'John Smith',
    category: 'Follow-up',
    completed: false
  },
  {
    id: 2,
    title: 'Prepare financing documents for Sarah Johnson',
    description: 'Mercedes C-Class purchase - prepare loan documentation.',
    priority: 'Medium',
    status: 'In Progress',
    assignee: 'Fatima Al-Zahra',
    dueDate: '2024-01-26',
    customerName: 'Sarah Johnson',
    category: 'Documentation',
    completed: false
  },
  {
    id: 3,
    title: 'Vehicle delivery - Audi A4',
    description: 'Coordinate delivery of Audi A4 to customer location.',
    priority: 'High',
    status: 'Scheduled',
    assignee: 'Omar Hassan',
    dueDate: '2024-01-24',
    customerName: 'Michael Brown',
    category: 'Delivery',
    completed: false
  },
  {
    id: 4,
    title: 'Service reminder - Toyota Camry',
    description: 'Send service reminder to customer for routine maintenance.',
    priority: 'Low',
    status: 'Completed',
    assignee: 'Khalid Al-Mansouri',
    dueDate: '2024-01-20',
    customerName: 'Lisa Davis',
    category: 'Service',
    completed: true
  }
];

export default function TaskManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [assigneeFilter, setAssigneeFilter] = useState('all');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Scheduled': return 'bg-purple-100 text-purple-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Follow-up': return 'bg-blue-100 text-blue-800';
      case 'Documentation': return 'bg-purple-100 text-purple-800';
      case 'Delivery': return 'bg-orange-100 text-orange-800';
      case 'Service': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !mockTasks.find(t => t.dueDate === dueDate)?.completed;
  };

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesAssignee = assigneeFilter === 'all' || task.assignee === assigneeFilter;
    return matchesSearch && matchesPriority && matchesStatus && matchesAssignee;
  });

  const pendingTasks = mockTasks.filter(t => !t.completed).length;
  const overdueTasks = mockTasks.filter(t => isOverdue(t.dueDate)).length;
  const completedTasks = mockTasks.filter(t => t.completed).length;
  const todayTasks = mockTasks.filter(t => t.dueDate === '2024-01-25').length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
          <p className="text-gray-600">Manage and track all tasks and follow-ups</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Task
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-yellow-600">Needs attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Due Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTasks}</div>
            <p className="text-xs text-blue-600">Today's tasks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks}</div>
            <p className="text-xs text-red-600">Requires immediate action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTasks}</div>
            <p className="text-xs text-green-600">This week</p>
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
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="Ahmed Al-Rashid">Ahmed Al-Rashid</SelectItem>
                <SelectItem value="Fatima Al-Zahra">Fatima Al-Zahra</SelectItem>
                <SelectItem value="Omar Hassan">Omar Hassan</SelectItem>
                <SelectItem value="Khalid Al-Mansouri">Khalid Al-Mansouri</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks ({filteredTasks.length})</CardTitle>
          <CardDescription>All assigned tasks and follow-ups</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className={`p-4 border rounded-lg hover:bg-gray-50 ${task.completed ? 'opacity-75' : ''}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      checked={task.completed}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <h4 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isOverdue(task.dueDate) && !task.completed && (
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                    )}
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge className={getStatusColor(task.status)}>
                      {task.status}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <User className="mr-1 h-4 w-4" />
                      {task.assignee}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-4 w-4" />
                      {task.dueDate}
                    </div>
                    <Badge className={getCategoryColor(task.category)} variant="outline">
                      {task.category}
                    </Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      {task.completed ? 'Reopen' : 'Complete'}
                    </Button>
                  </div>
                </div>
                
                <div className="mt-2 text-sm text-gray-500">
                  Customer: {task.customerName}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tasks by Priority</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['High', 'Medium', 'Low'].map(priority => {
                const count = mockTasks.filter(t => t.priority === priority && !t.completed).length;
                const percentage = count > 0 ? (count / pendingTasks) * 100 : 0;
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <span>{priority} Priority</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            priority === 'High' ? 'bg-red-600' : 
                            priority === 'Medium' ? 'bg-yellow-600' : 'bg-green-600'
                          }`}
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
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTasks
                .filter(t => !t.completed && new Date(t.dueDate) >= new Date())
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .slice(0, 5)
                .map((task) => (
                  <div key={task.id} className="flex items-center justify-between text-sm">
                    <div>
                      <div className="font-medium truncate">{task.title}</div>
                      <div className="text-gray-500">{task.customerName}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(task.priority)} variant="outline">
                        {task.priority}
                      </Badge>
                      <span className="text-gray-500">{task.dueDate}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}