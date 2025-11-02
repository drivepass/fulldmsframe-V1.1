import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Plus, 
  Upload, 
  Filter, 
  Search, 
  Calendar,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';

// Mock data for demonstration
const mockLeads = [
  {
    id: 1,
    name: 'John Smith',
    contact: '+1 234-567-8900',
    email: 'john.smith@email.com',
    source: 'Website',
    aiScore: 85,
    status: 'Hot',
    salesperson: 'Sarah Johnson',
    dateAdded: '2024-01-15',
    carInterest: 'BMW X5'
  },
  {
    id: 2,
    name: 'Emily Davis',
    contact: '+1 234-567-8901',
    email: 'emily.davis@email.com',
    source: 'Facebook',
    aiScore: 72,
    status: 'Contacted',
    salesperson: 'Mike Wilson',
    dateAdded: '2024-01-14',
    carInterest: 'Mercedes C-Class'
  },
  {
    id: 3,
    name: 'Robert Brown',
    contact: '+1 234-567-8902',
    email: 'robert.brown@email.com',
    source: 'Referral',
    aiScore: 91,
    status: 'Test Drive',
    salesperson: 'Sarah Johnson',
    dateAdded: '2024-01-13',
    carInterest: 'Audi A4'
  }
];

const getScoreColor = (score: number) => {
  if (score >= 80) return 'bg-green-100 text-green-800';
  if (score >= 60) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Hot': return 'bg-red-100 text-red-800';
    case 'Test Drive': return 'bg-blue-100 text-blue-800';
    case 'Contacted': return 'bg-yellow-100 text-yellow-800';
    case 'New': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function CRM360() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contact.includes(searchTerm) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSource = selectedSource === 'all' || lead.source === selectedSource;
    const matchesStatus = selectedStatus === 'all' || lead.status === selectedStatus;
    
    return matchesSearch && matchesSource && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">CRM 360</h1>
          <p className="text-gray-600">Comprehensive customer relationship management</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import Leads
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Lead
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Lead Dashboard</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="calendar">Test Drive Calendar</TabsTrigger>
          <TabsTrigger value="timeline">Prospect Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Lead Capture Dashboard</CardTitle>
              <CardDescription>Manage and track all your leads in one place</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 mb-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search leads..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedSource} onValueChange={setSelectedSource}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="Website">Website</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Referral">Referral</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Contacted">Contacted</SelectItem>
                    <SelectItem value="Test Drive">Test Drive</SelectItem>
                    <SelectItem value="Hot">Hot</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>

              {/* Leads Table */}
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>AI Lead Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned Salesperson</TableHead>
                    <TableHead>Date Added</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3 w-3 mr-1" />
                            {lead.contact}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            {lead.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>
                        <Badge className={getScoreColor(lead.aiScore)}>
                          {lead.aiScore}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.salesperson}</TableCell>
                      <TableCell>{lead.dateAdded}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline">
                            Assign
                          </Button>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline View (Kanban)</CardTitle>
              <CardDescription>Drag and drop leads through different stages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-6 gap-4">
                {['New', 'Contacted', 'Test Drive', 'Proposal', 'Hot', 'Closed'].map((stage) => (
                  <div key={stage} className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold mb-3">{stage}</h3>
                    <div className="space-y-2">
                      {mockLeads
                        .filter(lead => lead.status === stage || (stage === 'New' && !['Contacted', 'Test Drive', 'Hot'].includes(lead.status)))
                        .map((lead) => (
                        <div key={lead.id} className="bg-white p-3 rounded border shadow-sm">
                          <div className="font-medium text-sm">{lead.name}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            Score: {lead.aiScore} | {lead.salesperson}
                          </div>
                          <div className="text-xs text-blue-600 mt-1">{lead.carInterest}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Drive Calendar View</CardTitle>
              <CardDescription>Schedule and manage test drives</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <Button>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Test Drive
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline">Today</Button>
                  <Button variant="outline">Week</Button>
                  <Button variant="outline">Month</Button>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="font-semibold p-2 bg-gray-100 rounded">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="border rounded p-2 h-20 text-sm">
                    {i + 1 <= 31 ? i + 1 : ''}
                    {i === 14 && (
                      <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded mt-1">
                        Test Drive - John Smith
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Prospect Timeline</CardTitle>
              <CardDescription>Chronological interaction history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <Button>Add Interaction</Button>
                  <Select>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Interactions</SelectItem>
                      <SelectItem value="call">Calls</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="visit">Showroom Visit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  {[
                    { type: 'call', date: '2024-01-15 10:30', contact: 'John Smith', notes: 'Interested in BMW X5, scheduled test drive' },
                    { type: 'whatsapp', date: '2024-01-14 15:45', contact: 'Emily Davis', notes: 'Sent brochure for Mercedes C-Class' },
                    { type: 'visit', date: '2024-01-13 14:00', contact: 'Robert Brown', notes: 'Showroom visit, test drove Audi A4' },
                  ].map((interaction, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        {interaction.type === 'call' && <Phone className="h-5 w-5 text-green-600" />}
                        {interaction.type === 'whatsapp' && <MessageSquare className="h-5 w-5 text-green-600" />}
                        {interaction.type === 'visit' && <Calendar className="h-5 w-5 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{interaction.contact}</h4>
                            <p className="text-sm text-gray-600">{interaction.notes}</p>
                          </div>
                          <span className="text-xs text-gray-500">{interaction.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}