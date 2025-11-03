import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Search, Calendar, Download, Edit, Flag, Save, X } from 'lucide-react';

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

interface LeadActionData {
  leadStatus: string;
  subStatus: string;
  leadStatusReason: string;
  showroomStatus: string;
  showroomVisitDate: string;
  showroomVisitTime: string;
  testDriveStatus: string;
  testDriveDate: string;
  testDriveTime: string;
  feedbackNotes: string;
}

const mockAssignedLeads: AssignedLead[] = [
  {
    id: 'AL001',
    created_at: '2024-01-15 09:30 AM',
    name: 'Ahmed Mohammed Al-Khalidi',
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
    name: 'Fatima Ali Al-Salem',
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
    name: 'Mohammed Abdullah Al-Najjar',
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
    name: 'Noura Saad Al-Harbi',
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
    name: 'Khalid Youssef Al-Otaibi',
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
    name: 'Sarah Ahmed Al-Mutairi',
    status: 'New',
    sub_status: 'Awaiting Response',
    channel: 'Twitter / DM',
    source: 'Social Media',
    request_type: 'Support',
    feedback: 'Neutral',
    assigned_on: '2024-01-17 03:40 PM',
    flagged: false
  },
  {
    id: 'AL007',
    created_at: '2024-01-18 09:15 AM',
    name: 'Abdulrahman Mohammed Al-Qahtani',
    status: 'Qualified',
    sub_status: 'Technical Review',
    channel: 'WhatsApp Business',
    source: 'Website',
    request_type: 'Product Demo',
    feedback: 'Positive',
    assigned_on: '2024-01-18 09:30 AM',
    flagged: false
  },
  {
    id: 'AL008',
    created_at: '2024-01-18 01:20 PM',
    name: 'Maryam Abdulaziz Al-Dosari',
    status: 'Contacted',
    sub_status: 'Information Sent',
    channel: 'Facebook / Messenger',
    source: 'Social Media',
    request_type: 'Service Inquiry',
    feedback: 'Positive',
    assigned_on: '2024-01-18 01:35 PM',
    flagged: false
  },
  {
    id: 'AL009',
    created_at: '2024-01-18 04:45 PM',
    name: 'Omar Sulaiman Al-Shammari',
    status: 'Proposal',
    sub_status: 'Contract Review',
    channel: 'Email Campaign',
    source: 'Email Marketing',
    request_type: 'Partnership',
    feedback: 'Neutral',
    assigned_on: '2024-01-18 05:00 PM',
    flagged: true
  },
  {
    id: 'AL010',
    created_at: '2024-01-19 11:30 AM',
    name: 'Layla Hassan Al-Anazi',
    status: 'New',
    sub_status: 'Initial Contact',
    channel: 'Instagram / Direct',
    source: 'Social Media',
    request_type: 'Product Information',
    feedback: 'Positive',
    assigned_on: '2024-01-19 11:45 AM',
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
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState<AssignedLead | null>(null);
  const [actionData, setActionData] = useState<LeadActionData>({
    leadStatus: '',
    subStatus: '',
    leadStatusReason: '',
    showroomStatus: '',
    showroomVisitDate: '',
    showroomVisitTime: '',
    testDriveStatus: '',
    testDriveDate: '',
    testDriveTime: '',
    feedbackNotes: ''
  });

  const filteredLeads = mockAssignedLeads.filter(lead =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.channel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.source.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (lead: AssignedLead) => {
    setSelectedLead(lead);
    setActionData({
      leadStatus: lead.status,
      subStatus: lead.sub_status,
      leadStatusReason: '',
      showroomStatus: '',
      showroomVisitDate: '',
      showroomVisitTime: '',
      testDriveStatus: '',
      testDriveDate: '',
      testDriveTime: '',
      feedbackNotes: ''
    });
    setIsActionDialogOpen(true);
  };

  const handleSearch = () => {
    console.log('Search with dates:', { leftFromDate, leftToDate });
  };

  const handleExport = () => {
    console.log('Export with dates:', { rightFromDate, rightToDate });
  };

  const handleSave = () => {
    console.log('Saving action data:', actionData);
    setIsActionDialogOpen(false);
    setSelectedLead(null);
    setActionData({
      leadStatus: '',
      subStatus: '',
      leadStatusReason: '',
      showroomStatus: '',
      showroomVisitDate: '',
      showroomVisitTime: '',
      testDriveStatus: '',
      testDriveDate: '',
      testDriveTime: '',
      feedbackNotes: ''
    });
  };

  const handleCancel = () => {
    setIsActionDialogOpen(false);
    setSelectedLead(null);
    setActionData({
      leadStatus: '',
      subStatus: '',
      leadStatusReason: '',
      showroomStatus: '',
      showroomVisitDate: '',
      showroomVisitTime: '',
      testDriveStatus: '',
      testDriveDate: '',
      testDriveTime: '',
      feedbackNotes: ''
    });
  };

  const updateActionData = (field: keyof LeadActionData, value: string) => {
    setActionData(prev => ({
      ...prev,
      [field]: value
    }));
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
                        onClick={() => handleEdit(lead)}
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

      {/* Lead Action Dialog */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Lead Action - {selectedLead?.name}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              Update lead status, schedule appointments and add feedback notes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Lead Status Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                📊 Lead Status Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leadStatus" className="text-sm font-medium">Lead Status *</Label>
                  <Select value={actionData.leadStatus} onValueChange={(value) => updateActionData('leadStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lead status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Contacted">Contacted</SelectItem>
                      <SelectItem value="Qualified">Qualified</SelectItem>
                      <SelectItem value="Proposal">Proposal</SelectItem>
                      <SelectItem value="Negotiation">Negotiation</SelectItem>
                      <SelectItem value="Closed Won">Closed Won</SelectItem>
                      <SelectItem value="Closed Lost">Closed Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subStatus" className="text-sm font-medium">Sub Status *</Label>
                  <Select value={actionData.subStatus} onValueChange={(value) => updateActionData('subStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Initial Contact">Initial Contact</SelectItem>
                      <SelectItem value="Needs Assessment">Needs Assessment</SelectItem>
                      <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                      <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                      <SelectItem value="Price Discussion">Price Discussion</SelectItem>
                      <SelectItem value="Technical Review">Technical Review</SelectItem>
                      <SelectItem value="Information Sent">Information Sent</SelectItem>
                      <SelectItem value="Contract Review">Contract Review</SelectItem>
                      <SelectItem value="Awaiting Response">Awaiting Response</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="leadStatusReason" className="text-sm font-medium">Lead Status Reason</Label>
                  <Input
                    id="leadStatusReason"
                    value={actionData.leadStatusReason}
                    onChange={(e) => updateActionData('leadStatusReason', e.target.value)}
                    placeholder="Enter reason for status change"
                  />
                </div>
              </div>
            </div>

            {/* Showroom Visit Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                🏢 Showroom Visit Section
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="showroomStatus" className="text-sm font-medium">Showroom Status Type</Label>
                  <Select value={actionData.showroomStatus} onValueChange={(value) => updateActionData('showroomStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select showroom status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Scheduled">Not Scheduled</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                      <SelectItem value="No Show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="showroomVisitDate" className="text-sm font-medium">Showroom Visit Date</Label>
                  <Input
                    id="showroomVisitDate"
                    type="date"
                    value={actionData.showroomVisitDate}
                    onChange={(e) => updateActionData('showroomVisitDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="showroomVisitTime" className="text-sm font-medium">Showroom Visit Time</Label>
                  <Input
                    id="showroomVisitTime"
                    type="time"
                    value={actionData.showroomVisitTime}
                    onChange={(e) => updateActionData('showroomVisitTime', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Test Drive Appointment Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                🚗 Test Drive Appointment Section
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testDriveStatus" className="text-sm font-medium">Test Drive Status Type</Label>
                  <Select value={actionData.testDriveStatus} onValueChange={(value) => updateActionData('testDriveStatus', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select test drive status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Not Scheduled">Not Scheduled</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                      <SelectItem value="No Show">No Show</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testDriveDate" className="text-sm font-medium">Test Drive Date</Label>
                  <Input
                    id="testDriveDate"
                    type="date"
                    value={actionData.testDriveDate}
                    onChange={(e) => updateActionData('testDriveDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testDriveTime" className="text-sm font-medium">Test Drive Time</Label>
                  <Input
                    id="testDriveTime"
                    type="time"
                    value={actionData.testDriveTime}
                    onChange={(e) => updateActionData('testDriveTime', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Feedback Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">
                💬 Feedback Notes
              </h3>
              <div className="space-y-2">
                <Label htmlFor="feedbackNotes" className="text-sm font-medium">Feedback Box (10 sentences max)</Label>
                <Textarea
                  id="feedbackNotes"
                  value={actionData.feedbackNotes}
                  onChange={(e) => updateActionData('feedbackNotes', e.target.value)}
                  placeholder="Enter detailed feedback about the lead interaction, customer preferences, next steps, and any important notes..."
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  {actionData.feedbackNotes.split('.').filter(sentence => sentence.trim().length > 0).length}/10 sentences
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}