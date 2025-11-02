import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  Clock,
  MessageSquare,
  FileText,
  Car,
  CheckCircle,
  AlertCircle,
  Filter,
  Search,
  Plus,
  Paperclip,
  Download,
  Eye
} from 'lucide-react';

interface JourneyEvent {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  description: string;
  type: 'created' | 'contacted' | 'test_drive' | 'quotation' | 'follow_up' | 'status_change' | 'note' | 'closed';
  status?: string;
}

interface LeadNote {
  id: string;
  timestamp: string;
  user: string;
  content: string;
  attachments?: string[];
}

export default function LeadJourney() {
  const { leadId } = useParams();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showAddNote, setShowAddNote] = useState(false);

  // Mock lead data - would come from API in real app
  const [leadData] = useState({
    id: leadId || '001',
    name: 'Ahmed Al-Rashid',
    phone: '+966 50 123 4567',
    email: 'ahmed.alrashid@email.com',
    assignedAgent: 'Amira Al-Harbi',
    currentStatus: 'Active',
    carModel: 'BMW X5',
    createdDate: '2024-01-15'
  });

  const [journeyEvents] = useState<JourneyEvent[]>([
    {
      id: '1',
      timestamp: '2024-01-15 09:30:00',
      user: 'System',
      action: 'Lead Created',
      description: 'New lead created from website inquiry for BMW X5',
      type: 'created'
    },
    {
      id: '2',
      timestamp: '2024-01-15 10:15:00',
      user: 'Amira Al-Harbi',
      action: 'First Contact',
      description: 'Initial phone call made to customer. Customer expressed interest in test drive.',
      type: 'contacted'
    },
    {
      id: '3',
      timestamp: '2024-01-16 14:30:00',
      user: 'Amira Al-Harbi',
      action: 'Test Drive Scheduled',
      description: 'Test drive appointment scheduled for January 18th at 2:00 PM',
      type: 'test_drive'
    },
    {
      id: '4',
      timestamp: '2024-01-18 14:00:00',
      user: 'Omar Al-Ghamdi',
      action: 'Test Drive Completed',
      description: 'Customer completed test drive. Showed strong interest in vehicle features.',
      type: 'test_drive'
    },
    {
      id: '5',
      timestamp: '2024-01-18 15:30:00',
      user: 'Hala Al-Zahrani',
      action: 'Quotation Provided',
      description: 'Detailed quotation sent via email including financing options',
      type: 'quotation'
    },
    {
      id: '6',
      timestamp: '2024-01-20 11:00:00',
      user: 'Amira Al-Harbi',
      action: 'Follow-up Call',
      description: 'Customer requested time to consider the offer. Follow-up scheduled for next week.',
      type: 'follow_up'
    },
    {
      id: '7',
      timestamp: '2024-01-22 16:45:00',
      user: 'Amira Al-Harbi',
      action: 'Status Updated',
      description: 'Lead status changed from Warm to Hot - customer ready to proceed',
      type: 'status_change',
      status: 'Hot Lead'
    }
  ]);

  const [leadNotes] = useState<LeadNote[]>([
    {
      id: '1',
      timestamp: '2024-01-16 10:30:00',
      user: 'Amira Al-Harbi',
      content: 'Customer is particularly interested in the safety features and fuel efficiency. Mentioned budget range of 180K-200K SAR.',
      attachments: ['customer_requirements.pdf']
    },
    {
      id: '2',
      timestamp: '2024-01-18 16:00:00',
      user: 'Omar Al-Ghamdi',
      content: 'Test drive went very well. Customer loved the handling and interior comfort. Discussed trade-in options for current vehicle.',
      attachments: ['test_drive_feedback.pdf', 'trade_in_evaluation.xlsx']
    },
    {
      id: '3',
      timestamp: '2024-01-20 11:30:00',
      user: 'Hala Al-Zahrani',
      content: 'Customer needs to discuss with spouse before making final decision. Provided extended warranty information as requested.',
      attachments: ['warranty_details.pdf']
    }
  ]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'created': return <Plus className="h-4 w-4" />;
      case 'contacted': return <Phone className="h-4 w-4" />;
      case 'test_drive': return <Car className="h-4 w-4" />;
      case 'quotation': return <FileText className="h-4 w-4" />;
      case 'follow_up': return <Clock className="h-4 w-4" />;
      case 'status_change': return <AlertCircle className="h-4 w-4" />;
      case 'note': return <MessageSquare className="h-4 w-4" />;
      case 'closed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'created': return 'bg-blue-500';
      case 'contacted': return 'bg-green-500';
      case 'test_drive': return 'bg-purple-500';
      case 'quotation': return 'bg-orange-500';
      case 'follow_up': return 'bg-yellow-500';
      case 'status_change': return 'bg-red-500';
      case 'note': return 'bg-gray-500';
      case 'closed': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'hot lead': return 'bg-red-100 text-red-800';
      case 'warm lead': return 'bg-orange-100 text-orange-800';
      case 'cold lead': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = journeyEvents.filter(event => {
    const matchesFilter = filterType === 'all' || event.type === filterType;
    const matchesSearch = searchQuery === '' || 
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In real app, this would make an API call
      setNewNote('');
      setShowAddNote(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Bar - Lead Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-lg sticky top-0 z-10 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/leads')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Leads
            </Button>
            <Separator orientation="vertical" className="h-8 bg-white/30" />
            <div>
              <h1 className="text-2xl font-bold">Lead Journey - {leadData.name}</h1>
              <p className="text-blue-100">Lead ID: {leadData.id} | Car Model: {leadData.carModel}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-blue-100">Assigned Agent</p>
              <p className="font-semibold">{leadData.assignedAgent}</p>
            </div>
            <Badge className={getStatusColor(leadData.currentStatus)}>
              {leadData.currentStatus}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-6 mt-4 text-sm text-blue-100">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>{leadData.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>{leadData.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Created: {leadData.createdDate}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Timeline Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filter & Search Panel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Activity Timeline
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search activities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Activities</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="test_drive">Test Drive</SelectItem>
                      <SelectItem value="quotation">Quotation</SelectItem>
                      <SelectItem value="follow_up">Follow-up</SelectItem>
                      <SelectItem value="status_change">Status Updates</SelectItem>
                      <SelectItem value="note">Notes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Journey Timeline */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  {filteredEvents.map((event, index) => (
                    <div key={event.id} className="relative flex items-start gap-4">
                      {/* Timeline node */}
                      <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${getEventColor(event.type)} text-white shadow-lg`}>
                        {getEventIcon(event.type)}
                      </div>
                      
                      {/* Event content */}
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{event.action}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span>{event.timestamp}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">{event.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <User className="h-4 w-4" />
                              <span>{event.user}</span>
                            </div>
                            {event.status && (
                              <Badge className={getStatusColor(event.status)}>
                                {event.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notes & Attachments Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Notes & Attachments
                </CardTitle>
                <Button
                  size="sm"
                  onClick={() => setShowAddNote(!showAddNote)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Note Form */}
              {showAddNote && (
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Textarea
                    placeholder="Add a note about this lead..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="mb-3"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddNote}>
                      Save Note
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowAddNote(false)}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" variant="outline">
                      <Paperclip className="h-4 w-4 mr-2" />
                      Attach File
                    </Button>
                  </div>
                </div>
              )}

              {/* Notes List */}
              <div className="space-y-4">
                {leadNotes.map((note) => (
                  <div key={note.id} className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <User className="h-4 w-4" />
                        <span>{note.user}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{note.timestamp}</span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{note.content}</p>
                    
                    {note.attachments && note.attachments.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-600">Attachments:</p>
                        {note.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span className="text-sm">{attachment}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}