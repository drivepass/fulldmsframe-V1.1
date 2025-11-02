import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Calendar, Download, Edit, Flag } from 'lucide-react';

interface AssignedLead {
  id: string;
  created_at: string;
  name: string;
  status: string;
  sub_status: string;
  channel: string;
  source: string;
  request_type: string;
  feedback: 'Positive' | 'Negative' | 'Neutral';
  assigned_on: string;
  flagged: boolean;
}

const mockAssignedLeads: AssignedLead[] = [
  {
    id: 'AL001',
    created_at: '2024-01-15 09:30 AM',
    name: 'Sarah Johnson',
    status: 'New',
    sub_status: 'Initial Contact',
    channel: 'Facebook / Messenger',
    source: 'Social Media',
    request_type: 'Product Inquiry',
    feedback: 'Positive',
    assigned_on: '2024-01-15 10:00 AM',
    flagged: false
  },
  {
    id: 'AL002',
    created_at: '2024-01-15 11:45 AM',
    name: 'Michael Chen',
    status: 'Qualified',
    sub_status: 'Needs Assessment',
    channel: 'WhatsApp Business',
    source: 'Website',
    request_type: 'Service Request',
    feedback: 'Positive',
    assigned_on: '2024-01-15 12:00 PM',
    flagged: true
  },
  {
    id: 'AL003',
    created_at: '2024-01-16 02:15 PM',
    name: 'Emily Rodriguez',
    status: 'Contacted',
    sub_status: 'Follow-up Required',
    channel: 'Instagram / Direct',
    source: 'Social Media',
    request_type: 'Quote Request',
    feedback: 'Neutral',
    assigned_on: '2024-01-16 02:30 PM',
    flagged: false
  },
  {
    id: 'AL004',
    created_at: '2024-01-16 04:20 PM',
    name: 'David Park',
    status: 'Proposal',
    sub_status: 'Proposal Sent',
    channel: 'LinkedIn / InMail',
    source: 'Referral',
    request_type: 'Consultation',
    feedback: 'Positive',
    assigned_on: '2024-01-16 04:45 PM',
    flagged: false
  },
  {
    id: 'AL005',
    created_at: '2024-01-17 10:10 AM',
    name: 'Lisa Thompson',
    status: 'Negotiation',
    sub_status: 'Price Discussion',
    channel: 'Email Campaign',
    source: 'Email Marketing',
    request_type: 'Bulk Order',
    feedback: 'Negative',
    assigned_on: '2024-01-17 10:30 AM',
    flagged: true
  },
  {
    id: 'AL006',
    created_at: '2024-01-17 03:25 PM',
    name: 'Robert Wilson',
    status: 'New',
    sub_status: 'Awaiting Response',
    channel: 'Twitter / DM',
    source: 'Social Media',
    request_type: 'Support',
    feedback: 'Neutral',
    assigned_on: '2024-01-17 03:40 PM',
    flagged: false
  }
];

const getFeedbackColor = (feedback: string) => {
  switch (feedback) {
    case 'Positive':
      return 'bg-green-100 text-green-800';
    case 'Negative':
      return 'bg-red-100 text-red-800';
    case 'Neutral':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function AssignedLeads() {
  const [searchTerm, setSearchTerm] = useState('');
  const [leftFromDate, setLeftFromDate] = useState('');
  const [leftToDate, setLeftToDate] = useState('');
  const [rightFromDate, setRightFromDate] = useState('');
  const [rightToDate, setRightToDate] = useState('');

  const filteredLeads = mockAssignedLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (leadId: string) => {
    console.log('Edit lead:', leadId);
  };

  const handleSearch = () => {
    console.log('Search with dates:', { leftFromDate, leftToDate });
  };

  const handleExport = () => {
    console.log('Export with dates:', { rightFromDate, rightToDate });
  };

  return (
    <div className="p-6 space-y-4 bg-gray-50 min-h-screen">
      {/* Header Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Inter', fontSize: '20px', fontWeight: 700 }}>
          Assigned Leads
        </h1>
      </div>

      {/* Filter Panels */}
      <div className="flex justify-between items-center gap-6">
        {/* Left Filter Panel */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">From Date</label>
            <div className="relative">
              <Input
                type="date"
                value={leftFromDate}
                onChange={(e) => setLeftFromDate(e.target.value)}
                className="w-[180px] h-9 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div className="relative">
              <Input
                type="date"
                value={leftToDate}
                onChange={(e) => setLeftToDate(e.target.value)}
                className="w-[180px] h-9 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
            <Button
              onClick={handleSearch}
              className="w-[120px] h-9 bg-black text-white hover:bg-gray-800"
              style={{ borderRadius: '6px' }}
            >
              Search
            </Button>
          </div>
        </div>

        {/* Right Filter Panel */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">From Date</label>
            <div className="relative">
              <Input
                type="date"
                value={rightFromDate}
                onChange={(e) => setRightFromDate(e.target.value)}
                className="w-[180px] h-9 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div className="relative">
              <Input
                type="date"
                value={rightToDate}
                onChange={(e) => setRightToDate(e.target.value)}
                className="w-[180px] h-9 pr-10"
              />
              <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
            <Button
              onClick={handleExport}
              variant="outline"
              className="w-[180px] h-9 bg-gray-200 text-gray-900 hover:bg-gray-300"
              style={{ borderRadius: '6px' }}
            >
              <Download className="h-4 w-4 mr-2" />
              Export Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <Card className="bg-white border border-gray-200" style={{ borderRadius: '8px' }}>
        <CardContent className="p-3">
          {/* Table Top Bar */}
          <div className="flex justify-between items-center mb-2">
            <div className="w-4"></div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[260px] h-9 pl-10"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100 hover:bg-gray-100" style={{ height: '40px' }}>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '200px', fontSize: '14px', fontWeight: 600 }}>
                    Lead Created Date and Time
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '160px', fontSize: '14px', fontWeight: 600 }}>
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '120px', fontSize: '14px', fontWeight: 600 }}>
                    Lead Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '160px', fontSize: '14px', fontWeight: 600 }}>
                    Lead Sub Status
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '180px', fontSize: '14px', fontWeight: 600 }}>
                    Lead Channel / Social Channel
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '120px', fontSize: '14px', fontWeight: 600 }}>
                    Lead Source
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '160px', fontSize: '14px', fontWeight: 600 }}>
                    Request Type
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '100px', fontSize: '14px', fontWeight: 600 }}>
                    Feedback
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '160px', fontSize: '14px', fontWeight: 600 }}>
                    Assigned On
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '60px', fontSize: '14px', fontWeight: 600 }}>
                    Flag
                  </TableHead>
                  <TableHead className="font-semibold text-gray-900" style={{ width: '80px', fontSize: '14px', fontWeight: 600 }}>
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead) => (
                  <TableRow 
                    key={lead.id} 
                    className="hover:bg-gray-50"
                    style={{ height: '40px' }}
                  >
                    <TableCell style={{ width: '200px', fontSize: '13px', fontWeight: 400 }}>
                      {lead.created_at}
                    </TableCell>
                    <TableCell style={{ width: '160px', fontSize: '13px', fontWeight: 400 }}>
                      {lead.name}
                    </TableCell>
                    <TableCell style={{ width: '120px', fontSize: '13px', fontWeight: 400 }}>
                      {lead.status}
                    </TableCell>
                    <TableCell style={{ width: '160px', fontSize: '13px', fontWeight: 400 }}>
                      {lead.sub_status}
                    </TableCell>
                    <TableCell style={{ width: '180px', fontSize: '13px', fontWeight: 400 }}>
                      {lead.channel}
                    </TableCell>
                    <TableCell style={{ width: '120px', fontSize: '13px', fontWeight: 400 }}>
                      {lead.source}
                    </TableCell>
                    <TableCell style={{ width: '160px', fontSize: '13px', fontWeight: 400 }}>
                      {lead.request_type}
                    </TableCell>
                    <TableCell style={{ width: '100px' }}>
                      <Badge className={getFeedbackColor(lead.feedback)} style={{ fontSize: '12px' }}>
                        {lead.feedback}
                      </Badge>
                    </TableCell>
                    <TableCell style={{ width: '160px', fontSize: '13px', fontWeight: 400 }}>
                      {lead.assigned_on}
                    </TableCell>
                    <TableCell style={{ width: '60px' }} className="text-center">
                      {lead.flagged && (
                        <Flag className="h-4 w-4 text-red-600 mx-auto" fill="currentColor" />
                      )}
                    </TableCell>
                    <TableCell style={{ width: '80px' }}>
                      <Button
                        onClick={() => handleEdit(lead.id)}
                        size="sm"
                        className="h-7 px-2 bg-red-600 text-white hover:bg-red-700"
                        style={{ borderRadius: '6px', fontSize: '12px' }}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}