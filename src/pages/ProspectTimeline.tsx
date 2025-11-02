import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Mail, MessageCircle, Calendar, FileText, Plus, Filter } from 'lucide-react';

const mockInteractions = [
  {
    id: 1,
    type: 'call',
    date: '2024-01-20',
    time: '10:30 AM',
    title: 'Initial Contact Call',
    notes: 'Customer interested in BMW X5. Discussed financing options.',
    attachments: [],
    salesperson: 'Ahmed Ali'
  },
  {
    id: 2,
    type: 'whatsapp',
    date: '2024-01-19',
    time: '3:45 PM',
    title: 'WhatsApp Follow-up',
    notes: 'Sent brochure and pricing information via WhatsApp.',
    attachments: ['BMW_X5_Brochure.pdf'],
    salesperson: 'Ahmed Ali'
  },
  {
    id: 3,
    type: 'showroom',
    date: '2024-01-18',
    time: '2:00 PM',
    title: 'Showroom Visit',
    notes: 'Customer visited showroom, inspected BMW X5, took test drive.',
    attachments: ['Test_Drive_Form.pdf'],
    salesperson: 'Ahmed Ali'
  },
  {
    id: 4,
    type: 'email',
    date: '2024-01-17',
    time: '11:15 AM',
    title: 'Email Inquiry Response',
    notes: 'Responded to customer inquiry about BMW X5 availability and pricing.',
    attachments: ['Price_Quote.pdf'],
    salesperson: 'Ahmed Ali'
  },
  {
    id: 5,
    type: 'service',
    date: '2024-01-15',
    time: '9:00 AM',
    title: 'Service History Review',
    notes: 'Reviewed customer\'s current vehicle service history for trade-in evaluation.',
    attachments: ['Service_History.pdf'],
    salesperson: 'Ahmed Ali'
  }
];

export default function ProspectTimeline() {
  const [filterType, setFilterType] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInteraction, setNewInteraction] = useState({
    type: '',
    title: '',
    notes: ''
  });

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'showroom': return <Calendar className="h-4 w-4" />;
      case 'service': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'showroom': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInteractions = filterType === 'all' 
    ? mockInteractions 
    : mockInteractions.filter(interaction => interaction.type === filterType);

  const handleAddInteraction = () => {
    // In a real app, this would save to the database
    console.log('Adding interaction:', newInteraction);
    setShowAddForm(false);
    setNewInteraction({ type: '', title: '', notes: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prospect Timeline</h1>
          <p className="text-gray-600">Chronological interaction history with prospects</p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Interaction
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockInteractions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInteractions.filter(i => i.type === 'call').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Emails</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInteractions.filter(i => i.type === 'email').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInteractions.filter(i => i.type === 'whatsapp').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Showroom Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockInteractions.filter(i => i.type === 'showroom').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Filter className="h-4 w-4 text-gray-400" />
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Interactions</SelectItem>
                <SelectItem value="call">Calls</SelectItem>
                <SelectItem value="email">Emails</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="showroom">Showroom Visits</SelectItem>
                <SelectItem value="service">Service</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Add Interaction Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Interaction</CardTitle>
            <CardDescription>Record a new interaction with the prospect</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Interaction Type</label>
                <Select value={newInteraction.type} onValueChange={(value) => 
                  setNewInteraction(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="showroom">Showroom Visit</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={newInteraction.title}
                  onChange={(e) => setNewInteraction(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Interaction title"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                value={newInteraction.notes}
                onChange={(e) => setNewInteraction(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Add detailed notes about this interaction..."
                className="min-h-[100px]"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddInteraction}>Save Interaction</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Interaction Timeline</CardTitle>
          <CardDescription>Chronological history of all interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredInteractions.map((interaction, index) => (
              <div key={interaction.id} className="flex space-x-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getInteractionColor(interaction.type)}`}>
                    {getInteractionIcon(interaction.type)}
                  </div>
                  {index < filteredInteractions.length - 1 && (
                    <div className="w-px h-16 bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{interaction.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{interaction.date}</span>
                      <span>{interaction.time}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{interaction.notes}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {interaction.salesperson}
                      </Badge>
                      {interaction.attachments.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {interaction.attachments.length} attachment(s)
                        </Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                  </div>
                  {interaction.attachments.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {interaction.attachments.map((attachment, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm text-blue-600">
                          <FileText className="h-3 w-3" />
                          <span>{attachment}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}