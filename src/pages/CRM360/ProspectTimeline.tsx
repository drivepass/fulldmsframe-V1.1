import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MessageSquare, Calendar, MapPin, FileText, Plus, Filter, Search, User } from 'lucide-react';

interface Interaction {
  id: string;
  type: 'call' | 'email' | 'whatsapp' | 'visit' | 'service' | 'meeting';
  customerName: string;
  customerPhone: string;
  date: string;
  time: string;
  duration?: string;
  salesperson: string;
  subject: string;
  notes: string;
  outcome: 'positive' | 'neutral' | 'negative';
  followUpRequired: boolean;
  followUpDate?: string;
  attachments?: string[];
}

const mockInteractions: Interaction[] = [
  {
    id: '1',
    type: 'call',
    customerName: 'John Smith',
    customerPhone: '+971 50 123 4567',
    date: '2024-01-20',
    time: '14:30',
    duration: '15 min',
    salesperson: 'Ahmed Al-Rashid',
    subject: 'BMW X5 Inquiry',
    notes: 'Customer is very interested in BMW X5. Discussed features, pricing, and financing options. Customer wants to schedule a test drive.',
    outcome: 'positive',
    followUpRequired: true,
    followUpDate: '2024-01-22'
  },
  {
    id: '2',
    type: 'email',
    customerName: 'Sarah Johnson',
    customerPhone: '+971 55 987 6543',
    date: '2024-01-20',
    time: '10:15',
    salesperson: 'Fatima Al-Zahra',
    subject: 'Mercedes C-Class Brochure',
    notes: 'Sent detailed brochures and pricing information for Mercedes C-Class variants. Customer requested financing options.',
    outcome: 'neutral',
    followUpRequired: true,
    followUpDate: '2024-01-23',
    attachments: ['Mercedes_C_Class_Brochure.pdf', 'Financing_Options.pdf']
  },
  {
    id: '3',
    type: 'whatsapp',
    customerName: 'Michael Brown',
    customerPhone: '+971 52 456 7890',
    date: '2024-01-19',
    time: '16:45',
    salesperson: 'Omar Hassan',
    subject: 'Audi A4 Availability',
    notes: 'Customer inquired about Audi A4 availability in specific color. Confirmed availability and shared images.',
    outcome: 'positive',
    followUpRequired: false
  },
  {
    id: '4',
    type: 'visit',
    customerName: 'Lisa Davis',
    customerPhone: '+971 56 234 5678',
    date: '2024-01-19',
    time: '11:00',
    duration: '45 min',
    salesperson: 'Khalid Al-Mansouri',
    subject: 'Showroom Visit - Toyota Camry',
    notes: 'Customer visited showroom to see Toyota Camry. Test drove the vehicle and was satisfied with performance. Discussed trade-in options.',
    outcome: 'positive',
    followUpRequired: true,
    followUpDate: '2024-01-21'
  },
  {
    id: '5',
    type: 'service',
    customerName: 'Ahmed Hassan',
    customerPhone: '+971 54 345 6789',
    date: '2024-01-18',
    time: '09:30',
    salesperson: 'Noor Al-Zahra',
    subject: 'Service Appointment - Range Rover',
    notes: 'Customer brought Range Rover for routine maintenance. Discussed upgrade options and new model features.',
    outcome: 'neutral',
    followUpRequired: false
  },
  {
    id: '6',
    type: 'meeting',
    customerName: 'Emma Wilson',
    customerPhone: '+971 58 567 8901',
    date: '2024-01-17',
    time: '13:00',
    duration: '30 min',
    salesperson: 'Saeed Al-Maktoum',
    subject: 'Porsche Cayenne Purchase Discussion',
    notes: 'Detailed discussion about Porsche Cayenne purchase. Customer ready to proceed with financing. Scheduled delivery date.',
    outcome: 'positive',
    followUpRequired: true,
    followUpDate: '2024-01-19'
  }
];

export default function ProspectTimeline() {
  const [interactions, setInteractions] = useState<Interaction[]>(mockInteractions);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [outcomeFilter, setOutcomeFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'visit': return <MapPin className="h-4 w-4" />;
      case 'service': return <FileText className="h-4 w-4" />;
      case 'meeting': return <Calendar className="h-4 w-4" />;
      default: return <User className="h-4 w-4" />;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'whatsapp': return 'bg-emerald-100 text-emerald-800';
      case 'visit': return 'bg-purple-100 text-purple-800';
      case 'service': return 'bg-orange-100 text-orange-800';
      case 'meeting': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutcomeColor = (outcome: string) => {
    switch (outcome) {
      case 'positive': return 'bg-green-100 text-green-800';
      case 'neutral': return 'bg-yellow-100 text-yellow-800';
      case 'negative': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInteractions = interactions.filter(interaction => {
    const matchesSearch = interaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interaction.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         interaction.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || interaction.type === typeFilter;
    const matchesOutcome = outcomeFilter === 'all' || interaction.outcome === outcomeFilter;
    return matchesSearch && matchesType && matchesOutcome;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prospect Timeline</h1>
          <p className="text-gray-600">Chronological log of all customer interactions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Interaction
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Interaction</DialogTitle>
              <DialogDescription>
                Record a new customer interaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select interaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="visit">Showroom Visit</SelectItem>
                    <SelectItem value="service">Service</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Input id="customer" placeholder="Customer name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" placeholder="+971 50 123 4567" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subject" className="text-right">
                  Subject
                </Label>
                <Input id="subject" placeholder="Interaction subject" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Time
                </Label>
                <Input id="time" type="time" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="outcome" className="text-right">
                  Outcome
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-right">
                  Notes
                </Label>
                <Textarea id="notes" placeholder="Detailed notes..." className="col-span-3" rows={3} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                Add Interaction
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interactions.length}</div>
            <p className="text-xs text-green-600">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Positive Outcomes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interactions.filter(i => i.outcome === 'positive').length}
            </div>
            <p className="text-xs text-green-600">67% success rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Follow-ups Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interactions.filter(i => i.followUpRequired).length}
            </div>
            <p className="text-xs text-yellow-600">Pending action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3h</div>
            <p className="text-xs text-green-600">-15min improvement</p>
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
                  placeholder="Search interactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="call">Phone Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="visit">Visit</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="meeting">Meeting</SelectItem>
              </SelectContent>
            </Select>
            <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Outcomes</SelectItem>
                <SelectItem value="positive">Positive</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="negative">Negative</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Interaction Timeline ({filteredInteractions.length})</CardTitle>
          <CardDescription>Chronological view of all customer interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredInteractions
              .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime())
              .map((interaction, index) => (
                <div key={interaction.id} className="relative">
                  {index !== filteredInteractions.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-20 bg-gray-200"></div>
                  )}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getInteractionColor(interaction.type)}`}>
                        {getInteractionIcon(interaction.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-semibold text-lg">{interaction.subject}</h4>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                <span>{interaction.customerName}</span>
                                <span>{interaction.customerPhone}</span>
                                <span>{interaction.date} at {interaction.time}</span>
                                {interaction.duration && <span>({interaction.duration})</span>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getInteractionColor(interaction.type)}>
                                {interaction.type}
                              </Badge>
                              <Badge className={getOutcomeColor(interaction.outcome)}>
                                {interaction.outcome}
                              </Badge>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 mb-3">{interaction.notes}</p>
                          
                          {interaction.attachments && interaction.attachments.length > 0 && (
                            <div className="mb-3">
                              <p className="text-sm font-medium text-gray-600 mb-2">Attachments:</p>
                              <div className="flex flex-wrap gap-2">
                                {interaction.attachments.map((attachment, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    <FileText className="mr-1 h-3 w-3" />
                                    {attachment}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">By {interaction.salesperson}</span>
                            {interaction.followUpRequired && (
                              <div className="flex items-center space-x-2">
                                <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                                  Follow-up Required
                                </Badge>
                                {interaction.followUpDate && (
                                  <span className="text-yellow-600">
                                    Due: {interaction.followUpDate}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}