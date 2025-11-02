import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, Calendar, User, DollarSign, Car } from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  interestedVehicle: string;
  budget: number;
  source: string;
  assignedTo: string;
  lastContact: string;
  score: number;
  stage: string;
}

const mockLeads: Lead[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+971501234567',
    interestedVehicle: 'BMW X5',
    budget: 300000,
    source: 'Website',
    assignedTo: 'Ahmed Ali',
    lastContact: '2024-01-20',
    score: 85,
    stage: 'New Lead'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+971502345678',
    interestedVehicle: 'Mercedes C-Class',
    budget: 250000,
    source: 'Referral',
    assignedTo: 'Fatima Hassan',
    lastContact: '2024-01-19',
    score: 72,
    stage: 'Contacted'
  },
  {
    id: 3,
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    phone: '+971503456789',
    interestedVehicle: 'Audi Q7',
    budget: 350000,
    source: 'Social Media',
    assignedTo: 'Omar Khalil',
    lastContact: '2024-01-18',
    score: 91,
    stage: 'Qualified'
  },
  {
    id: 4,
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '+971504567890',
    interestedVehicle: 'Lexus ES',
    budget: 200000,
    source: 'Walk-in',
    assignedTo: 'Ahmed Ali',
    lastContact: '2024-01-17',
    score: 68,
    stage: 'Proposal Sent'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+971505678901',
    interestedVehicle: 'Honda Accord',
    budget: 150000,
    source: 'Google Ads',
    assignedTo: 'Fatima Hassan',
    lastContact: '2024-01-16',
    score: 79,
    stage: 'Negotiation'
  }
];

const pipelineStages = [
  { name: 'New Lead', color: 'bg-gray-100', count: 0 },
  { name: 'Contacted', color: 'bg-blue-100', count: 0 },
  { name: 'Qualified', color: 'bg-yellow-100', count: 0 },
  { name: 'Proposal Sent', color: 'bg-orange-100', count: 0 },
  { name: 'Negotiation', color: 'bg-purple-100', count: 0 },
  { name: 'Closed Won', color: 'bg-green-100', count: 0 },
  { name: 'Closed Lost', color: 'bg-red-100', count: 0 }
];

export default function PipelineView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [assigneeFilter, setAssigneeFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');

  // Calculate stage counts
  const stagesWithCounts = pipelineStages.map(stage => ({
    ...stage,
    count: mockLeads.filter(lead => lead.stage === stage.name).length
  }));

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.interestedVehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAssignee = assigneeFilter === 'all' || lead.assignedTo === assigneeFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesAssignee && matchesSource;
  });

  const getLeadsByStage = (stageName: string) => {
    return filteredLeads.filter(lead => lead.stage === stageName);
  };

  const handleMoveStage = (leadId: number, newStage: string) => {
    console.log(`Moving lead ${leadId} to ${newStage}`);
  };

  const handleContactLead = (leadId: number, method: string) => {
    console.log(`Contacting lead ${leadId} via ${method}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
          <p className="text-gray-600">Track leads through your sales process</p>
        </div>
        <Button>
          <User className="mr-2 h-4 w-4" />
          Add New Lead
        </Button>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{mockLeads.length}</div>
            <p className="text-xs text-gray-600">Total Leads</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              AED {mockLeads.reduce((sum, lead) => sum + lead.budget, 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Pipeline Value</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">
              {Math.round(mockLeads.reduce((sum, lead) => sum + lead.score, 0) / mockLeads.length)}
            </div>
            <p className="text-xs text-gray-600">Avg. Lead Score</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">24%</div>
            <p className="text-xs text-gray-600">Conversion Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search leads by name or vehicle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Assignee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Assignees</SelectItem>
                <SelectItem value="Ahmed Ali">Ahmed Ali</SelectItem>
                <SelectItem value="Fatima Hassan">Fatima Hassan</SelectItem>
                <SelectItem value="Omar Khalil">Omar Khalil</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Website">Website</SelectItem>
                <SelectItem value="Referral">Referral</SelectItem>
                <SelectItem value="Social Media">Social Media</SelectItem>
                <SelectItem value="Walk-in">Walk-in</SelectItem>
                <SelectItem value="Google Ads">Google Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pipeline Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 overflow-x-auto">
        {stagesWithCounts.map((stage) => (
          <Card key={stage.name} className="min-w-[280px]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>{stage.name}</span>
                <Badge variant="secondary">{stage.count}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {getLeadsByStage(stage.name).map((lead) => (
                <div key={lead.id} className="p-3 bg-white border rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{lead.name}</h4>
                    <Badge className={`text-xs ${getScoreColor(lead.score)}`}>
                      {lead.score}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1 text-xs text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Car className="h-3 w-3" />
                      <span>{lead.interestedVehicle}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>AED {lead.budget.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{lead.assignedTo}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">{lead.lastContact}</span>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContactLead(lead.id, 'phone')}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContactLead(lead.id, 'email')}
                      >
                        <Mail className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleContactLead(lead.id, 'calendar')}
                      >
                        <Calendar className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Stage Movement Buttons */}
                  <div className="mt-2 flex space-x-1">
                    {stage.name !== 'Closed Won' && stage.name !== 'Closed Lost' && (
                      <Select onValueChange={(value) => handleMoveStage(lead.id, value)}>
                        <SelectTrigger className="h-6 text-xs">
                          <SelectValue placeholder="Move to..." />
                        </SelectTrigger>
                        <SelectContent>
                          {pipelineStages
                            .filter(s => s.name !== stage.name)
                            .map(s => (
                              <SelectItem key={s.name} value={s.name} className="text-xs">
                                {s.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </div>
              ))}
              
              {getLeadsByStage(stage.name).length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  <p className="text-sm">No leads in this stage</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pipeline Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Pipeline Summary</CardTitle>
          <CardDescription>Overview of your sales pipeline performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Stage Distribution</h4>
              <div className="space-y-2">
                {stagesWithCounts.map((stage) => (
                  <div key={stage.name} className="flex items-center justify-between text-sm">
                    <span>{stage.name}</span>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                      <span>{stage.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Top Performers</h4>
              <div className="space-y-2">
                {['Ahmed Ali', 'Fatima Hassan', 'Omar Khalil'].map((person) => (
                  <div key={person} className="flex items-center justify-between text-sm">
                    <span>{person}</span>
                    <span>{mockLeads.filter(l => l.assignedTo === person).length} leads</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Lead Sources</h4>
              <div className="space-y-2">
                {['Website', 'Referral', 'Social Media', 'Walk-in', 'Google Ads'].map((source) => (
                  <div key={source} className="flex items-center justify-between text-sm">
                    <span>{source}</span>
                    <span>{mockLeads.filter(l => l.source === source).length}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}