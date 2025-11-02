import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  UserPlus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Filter,
  Search,
  Eye,
  EyeOff,
  Info,
  Phone,
  Mail,
  Calendar,
  MapPin,
  User,
  Building,
  Car,
  Hash,
  Globe,
  Target,
  TrendingUp,
  ExternalLink,
  Settings,
  Edit,
  Trash2,
  MoreHorizontal,
  Pencil,
  Save,
  X
} from 'lucide-react';

export default function Leads() {
  const navigate = useNavigate();
  const [showHeaders, setShowHeaders] = useState(false); // Changed to false by default
  const [selectedLead, setSelectedLead] = useState(null);
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false);
  const [editedLead, setEditedLead] = useState(null);
  
  const [visibleColumns, setVisibleColumns] = useState({
    serialNumber: true,
    createdDateTime: true,
    firstContactedDateTime: true,
    leadName: true,
    leadPhone: true,
    leadEmail: true,
    showroomVisit: true,
    requestType: true,
    carModel: true,
    status: true,
    subStatus: true,
    openClosed: true,
    leadChannel: true,
    leadSource: true,
    campaignName: true,
    campaignSource: true,
    action: true,
    leadJourney: true
  });

  const [selectedAgent, setSelectedAgent] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedConsultant, setSelectedConsultant] = useState('all');

  const [leadSummary] = useState({
    pending: 45,
    assigned: 32,
    followUp: 18,
    closedUnqualified: 12
  });

  const [leads, setLeads] = useState([
    {
      serialNumber: '001',
      createdDateTime: '2024-01-15 09:30:00',
      firstContactedDateTime: '2024-01-15 10:15:00',
      leadName: 'Ahmed Al-Rashid',
      leadPhone: '+966 50 123 4567',
      leadEmail: 'ahmed.alrashid@email.com',
      showroomVisit: 'Scheduled',
      requestType: 'Test Drive',
      carModel: 'BMW X5',
      status: 'Active',
      subStatus: 'Hot Lead',
      openClosed: 'Open',
      leadChannel: 'Digital',
      leadSource: 'Website',
      campaignName: 'Summer Sale 2024',
      campaignSource: 'Google Ads',
      leadJourney: 'Initial Contact',
      // All Excel fields
      title: 'Mr.',
      firstName: 'Ahmed',
      lastName: 'Al-Rashid',
      mobile: '+966 50 123 4567',
      address: 'King Fahd Road, Riyadh',
      cityPreferredBranch: 'Riyadh',
      gender: 'Male',
      age: '35-40',
      incomeRange: '15,000 - 25,000 SAR',
      purchasePeriod: 'Within 3 months',
      paymentMethod: 'Finance',
      currentVehicle: 'Toyota Camry 2018',
      modelOfInterest: 'BMW X5',
      trim: 'xDrive40i',
      modelYear: '2024',
      category: 'SUV',
      leadStatus: 'Active',
      leadSubStatus: 'Hot Lead',
      leadStatusReason: 'High interest shown',
      socialOrganicChannel: 'Google',
      comment: 'Customer interested in luxury SUV. Has budget of 200k SAR.',
      notes: 'Customer interested in luxury SUV. Has budget of 200k SAR.'
    },
    {
      serialNumber: '002',
      createdDateTime: '2024-01-14 14:20:00',
      firstContactedDateTime: '2024-01-14 15:45:00',
      leadName: 'Fatima Al-Zahra',
      leadPhone: '+966 55 234 5678',
      leadEmail: 'fatima.alzahra@email.com',
      showroomVisit: 'Completed',
      requestType: 'Purchase Inquiry',
      carModel: 'BMW 3 Series',
      status: 'Active',
      subStatus: 'Warm Lead',
      openClosed: 'Open',
      leadChannel: 'Referral',
      leadSource: 'Customer Referral',
      campaignName: 'Referral Program',
      campaignSource: 'Word of Mouth',
      leadJourney: 'Test Drive Scheduled',
      // All Excel fields
      title: 'Ms.',
      firstName: 'Fatima',
      lastName: 'Al-Zahra',
      mobile: '+966 55 234 5678',
      address: 'Al-Malaz District, Riyadh',
      cityPreferredBranch: 'Riyadh',
      gender: 'Female',
      age: '30-35',
      incomeRange: '10,000 - 15,000 SAR',
      purchasePeriod: 'Within 6 months',
      paymentMethod: 'Cash',
      currentVehicle: 'Honda Accord 2019',
      modelOfInterest: 'BMW 3 Series',
      trim: '330i',
      modelYear: '2024',
      category: 'Sedan',
      leadStatus: 'Active',
      leadSubStatus: 'Warm Lead',
      leadStatusReason: 'Completed showroom visit',
      socialOrganicChannel: 'Referral',
      comment: 'Referred by existing customer. Looking for family sedan.',
      notes: 'Referred by existing customer. Looking for family sedan.'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'follow-up': return 'bg-orange-100 text-orange-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOpenClosedColor = (openClosed: string) => {
    return openClosed === 'Open' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800';
  };

  const toggleColumn = (column: keyof typeof visibleColumns) => {
    if (column === 'leadJourney' || column === 'action') return; // Lead Journey and Action cannot be hidden
    setVisibleColumns(prev => ({
      ...prev,
      [column]: !prev[column]
    }));
  };

  const filteredLeads = leads.filter(lead => {
    const agentMatch = selectedAgent === 'all' || true; // Simplified for demo
    const cityMatch = selectedCity === 'all' || true; // Simplified for demo
    const consultantMatch = selectedConsultant === 'all' || true; // Simplified for demo
    return agentMatch && cityMatch && consultantMatch;
  });

  const columnLabels = {
    serialNumber: 'Serial Number',
    createdDateTime: 'Created Date/Time',
    firstContactedDateTime: 'First Contacted Date/Time',
    leadName: 'Lead Name',
    leadPhone: 'Lead Phone',
    leadEmail: 'Lead Email',
    showroomVisit: 'Showroom Visit',
    requestType: 'Request Type',
    carModel: 'Car Model',
    status: 'Status',
    subStatus: 'Sub Status',
    openClosed: 'Open/Closed',
    leadChannel: 'Lead Channel',
    leadSource: 'Lead Source',
    campaignName: 'Campaign Name',
    campaignSource: 'Campaign Source',
    action: 'Action',
    leadJourney: 'Lead Journey'
  };

  const handleLeadJourneyClick = (leadId: string) => {
    navigate(`/leads/${leadId}/journey`);
  };

  const handleActionClick = (lead: any) => {
    setSelectedLead(lead);
    setEditedLead({ ...lead });
    setIsActionDialogOpen(true);
  };

  const handleActionClose = () => {
    setIsActionDialogOpen(false);
    setSelectedLead(null);
    setEditedLead(null);
  };

  const handleSave = () => {
    if (editedLead) {
      setLeads(prevLeads => 
        prevLeads.map(lead => 
          lead.serialNumber === editedLead.serialNumber ? editedLead : lead
        )
      );
      handleActionClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (editedLead) {
      setEditedLead(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Area - Blue Bar #1A91E2 */}
      <div className="text-white p-4 rounded-lg" style={{ backgroundColor: '#1A91E2' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">CRM 360 - Leads Dashboard</h1>
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <span className="text-sm">Total Leads: {filteredLeads.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowHeaders(!showHeaders)}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              {showHeaders ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {showHeaders ? 'Hide Headers' : 'Show Headers'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Summary Cards - Color #92A0B2 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-white cursor-pointer transition-colors" style={{ backgroundColor: '#92A0B2' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Pending</p>
                <p className="text-3xl font-bold">{leadSummary.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-white cursor-pointer transition-colors" style={{ backgroundColor: '#92A0B2' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Assigned</p>
                <p className="text-3xl font-bold">{leadSummary.assigned}</p>
              </div>
              <UserPlus className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-white cursor-pointer transition-colors" style={{ backgroundColor: '#92A0B2' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Follow-up</p>
                <p className="text-3xl font-bold">{leadSummary.followUp}</p>
              </div>
              <Phone className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="text-white cursor-pointer transition-colors" style={{ backgroundColor: '#92A0B2' }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm font-medium">Closed/Unqualified</p>
                <p className="text-3xl font-bold">{leadSummary.closedUnqualified}</p>
              </div>
              <XCircle className="h-8 w-8 text-white/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Row - Color #BFCAD9 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border-2" style={{ backgroundColor: '#BFCAD9', borderColor: '#A8B5C8' }}>
          <label className="block text-sm font-medium text-gray-800 mb-2">Filter by Agent</label>
          <Select value={selectedAgent} onValueChange={setSelectedAgent}>
            <SelectTrigger className="bg-white" style={{ borderColor: '#A8B5C8' }}>
              <SelectValue placeholder="Select Agent" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Agents</SelectItem>
              <SelectItem value="Amira Al-Harbi">Amira Al-Harbi</SelectItem>
              <SelectItem value="Omar Al-Ghamdi">Omar Al-Ghamdi</SelectItem>
              <SelectItem value="Layla Al-Dosari">Layla Al-Dosari</SelectItem>
              <SelectItem value="Faisal Al-Mutairi">Faisal Al-Mutairi</SelectItem>
              <SelectItem value="Reem Al-Qahtani">Reem Al-Qahtani</SelectItem>
              <SelectItem value="Saad Al-Shehri">Saad Al-Shehri</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 rounded-lg border-2" style={{ backgroundColor: '#BFCAD9', borderColor: '#A8B5C8' }}>
          <label className="block text-sm font-medium text-gray-800 mb-2">Filter by City/Branch</label>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className="bg-white" style={{ borderColor: '#A8B5C8' }}>
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              <SelectItem value="Riyadh">Riyadh</SelectItem>
              <SelectItem value="Jeddah">Jeddah</SelectItem>
              <SelectItem value="Dammam">Dammam</SelectItem>
              <SelectItem value="Mecca">Mecca</SelectItem>
              <SelectItem value="Medina">Medina</SelectItem>
              <SelectItem value="Khobar">Khobar</SelectItem>
              <SelectItem value="Tabuk">Tabuk</SelectItem>
              <SelectItem value="Abha">Abha</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 rounded-lg border-2" style={{ backgroundColor: '#BFCAD9', borderColor: '#A8B5C8' }}>
          <label className="block text-sm font-medium text-gray-800 mb-2">Filter by Sales Consultant</label>
          <Select value={selectedConsultant} onValueChange={setSelectedConsultant}>
            <SelectTrigger className="bg-white" style={{ borderColor: '#A8B5C8' }}>
              <SelectValue placeholder="Select Consultant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Consultants</SelectItem>
              <SelectItem value="Hala Al-Zahrani">Hala Al-Zahrani</SelectItem>
              <SelectItem value="Abdulrahman Al-Malki">Abdulrahman Al-Malki</SelectItem>
              <SelectItem value="Maha Al-Subai">Maha Al-Subai</SelectItem>
              <SelectItem value="Khalid Al-Rasheed">Khalid Al-Rasheed</SelectItem>
              <SelectItem value="Noura Al-Anzi">Noura Al-Anzi</SelectItem>
              <SelectItem value="Turki Al-Dawsari">Turki Al-Dawsari</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Headers Row - Black Background #000000 */}
      {showHeaders && (
        <div className="text-white p-4 rounded-lg" style={{ backgroundColor: '#000000' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Table Headers Configuration</h3>
            <span className="text-sm text-gray-300">Click to toggle column visibility</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {Object.entries(visibleColumns).map(([key, visible]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={visible}
                  onCheckedChange={() => toggleColumn(key as keyof typeof visibleColumns)}
                  disabled={key === 'leadJourney' || key === 'action'}
                  className="border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                />
                <label
                  htmlFor={key}
                  className={`text-sm cursor-pointer ${(key === 'leadJourney' || key === 'action') ? 'text-gray-400' : 'text-white'}`}
                >
                  {columnLabels[key as keyof typeof columnLabels]}
                  {(key === 'leadJourney' || key === 'action') && ' (Non-hideable)'}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Total Leads</CardTitle>
              <CardDescription>Manage and track all customer leads</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  {visibleColumns.serialNumber && <th className="text-left p-3 font-medium">Serial Number</th>}
                  {visibleColumns.createdDateTime && <th className="text-left p-3 font-medium">Created Date/Time</th>}
                  {visibleColumns.firstContactedDateTime && <th className="text-left p-3 font-medium">First Contacted Date/Time</th>}
                  {visibleColumns.leadName && <th className="text-left p-3 font-medium">Lead Name</th>}
                  {visibleColumns.leadPhone && <th className="text-left p-3 font-medium">Lead Phone</th>}
                  {visibleColumns.leadEmail && <th className="text-left p-3 font-medium">Lead Email</th>}
                  {visibleColumns.showroomVisit && <th className="text-left p-3 font-medium">Showroom Visit</th>}
                  {visibleColumns.requestType && <th className="text-left p-3 font-medium">Request Type</th>}
                  {visibleColumns.carModel && <th className="text-left p-3 font-medium">Car Model</th>}
                  {visibleColumns.status && <th className="text-left p-3 font-medium">Status</th>}
                  {visibleColumns.subStatus && <th className="text-left p-3 font-medium">Sub Status</th>}
                  {visibleColumns.openClosed && <th className="text-left p-3 font-medium">Open/Closed</th>}
                  {visibleColumns.leadChannel && <th className="text-left p-3 font-medium">Lead Channel</th>}
                  {visibleColumns.leadSource && <th className="text-left p-3 font-medium">Lead Source</th>}
                  {visibleColumns.campaignName && <th className="text-left p-3 font-medium">Campaign Name</th>}
                  {visibleColumns.campaignSource && <th className="text-left p-3 font-medium">Campaign Source</th>}
                  {visibleColumns.action && <th className="text-left p-3 font-medium">Action</th>}
                  {visibleColumns.leadJourney && <th className="text-left p-3 font-medium">Lead Journey</th>}
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.serialNumber} className="border-b hover:bg-gray-50">
                    {visibleColumns.serialNumber && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Hash className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline">{lead.serialNumber}</Badge>
                        </div>
                      </td>
                    )}
                    {visibleColumns.createdDateTime && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{lead.createdDateTime}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.firstContactedDateTime && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{lead.firstContactedDateTime}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.leadName && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{lead.leadName}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.leadPhone && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{lead.leadPhone}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.leadEmail && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{lead.leadEmail}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.showroomVisit && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <Badge variant="secondary">{lead.showroomVisit}</Badge>
                        </div>
                      </td>
                    )}
                    {visibleColumns.requestType && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Info className="h-4 w-4 text-gray-400" />
                          <span>{lead.requestType}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.carModel && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-gray-400" />
                          <span>{lead.carModel}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="p-3">
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </td>
                    )}
                    {visibleColumns.subStatus && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline">{lead.subStatus}</Badge>
                        </div>
                      </td>
                    )}
                    {visibleColumns.openClosed && (
                      <td className="p-3">
                        <Badge className={getOpenClosedColor(lead.openClosed)}>
                          {lead.openClosed}
                        </Badge>
                      </td>
                    )}
                    {visibleColumns.leadChannel && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span>{lead.leadChannel}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.leadSource && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <Badge variant="secondary">{lead.leadSource}</Badge>
                        </div>
                      </td>
                    )}
                    {visibleColumns.campaignName && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{lead.campaignName}</span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.campaignSource && (
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <Badge variant="outline">{lead.campaignSource}</Badge>
                        </div>
                      </td>
                    )}
                    {visibleColumns.action && (
                      <td className="p-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleActionClick(lead)}
                          className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </td>
                    )}
                    {visibleColumns.leadJourney && (
                      <td className="p-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLeadJourneyClick(lead.serialNumber)}
                          className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {lead.leadJourney}
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* COMPREHENSIVE LEAD EDIT DIALOG WITH ALL 25 EXCEL FIELDS */}
      <Dialog open={isActionDialogOpen} onOpenChange={setIsActionDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Edit className="h-5 w-5" />
                Edit Lead Details - Complete Form
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleActionClose}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogDescription>
              {selectedLead && `Editing all details for ${selectedLead.leadName} (ID: ${selectedLead.serialNumber})`}
            </DialogDescription>
          </DialogHeader>
          
          {editedLead && (
            <div className="space-y-8 py-6">
              {/* 1. PERSONAL INFORMATION SECTION */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-blue-200 pb-2">👤 Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold">Title *</Label>
                    <Select value={editedLead.title || ''} onValueChange={(value) => handleInputChange('title', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mr.">Mr.</SelectItem>
                        <SelectItem value="Ms.">Ms.</SelectItem>
                        <SelectItem value="Mrs.">Mrs.</SelectItem>
                        <SelectItem value="Dr.">Dr.</SelectItem>
                        <SelectItem value="Prof.">Prof.</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-semibold">First Name *</Label>
                    <Input
                      id="firstName"
                      value={editedLead.firstName || ''}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter first name"
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-semibold">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={editedLead.lastName || ''}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter last name"
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm font-semibold">Gender *</Label>
                    <Select value={editedLead.gender || ''} onValueChange={(value) => handleInputChange('gender', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-semibold">Age *</Label>
                    <Select value={editedLead.age || ''} onValueChange={(value) => handleInputChange('age', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-25">18-25</SelectItem>
                        <SelectItem value="26-30">26-30</SelectItem>
                        <SelectItem value="31-35">31-35</SelectItem>
                        <SelectItem value="36-40">36-40</SelectItem>
                        <SelectItem value="41-50">41-50</SelectItem>
                        <SelectItem value="51+">51+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 2. CONTACT INFORMATION SECTION */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-green-200 pb-2">📞 Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leadEmail" className="text-sm font-semibold">Email</Label>
                    <Input
                      id="leadEmail"
                      type="email"
                      value={editedLead.leadEmail || ''}
                      onChange={(e) => handleInputChange('leadEmail', e.target.value)}
                      placeholder="Enter email address"
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile" className="text-sm font-semibold">Mobile</Label>
                    <Input
                      id="mobile"
                      value={editedLead.mobile || ''}
                      onChange={(e) => handleInputChange('mobile', e.target.value)}
                      placeholder="Enter mobile number"
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address" className="text-sm font-semibold">Address</Label>
                    <Input
                      id="address"
                      value={editedLead.address || ''}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter complete address"
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cityPreferredBranch" className="text-sm font-semibold">City (Preferred Branch)</Label>
                    <Select value={editedLead.cityPreferredBranch || ''} onValueChange={(value) => handleInputChange('cityPreferredBranch', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select preferred branch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Riyadh">Riyadh</SelectItem>
                        <SelectItem value="Jeddah">Jeddah</SelectItem>
                        <SelectItem value="Dammam">Dammam</SelectItem>
                        <SelectItem value="Mecca">Mecca</SelectItem>
                        <SelectItem value="Medina">Medina</SelectItem>
                        <SelectItem value="Khobar">Khobar</SelectItem>
                        <SelectItem value="Tabuk">Tabuk</SelectItem>
                        <SelectItem value="Abha">Abha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 3. FINANCIAL INFORMATION SECTION */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-yellow-200 pb-2">💰 Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="incomeRange" className="text-sm font-semibold">Income Range</Label>
                    <Select value={editedLead.incomeRange || ''} onValueChange={(value) => handleInputChange('incomeRange', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Less than 5,000 SAR">Less than 5,000 SAR</SelectItem>
                        <SelectItem value="5,000 - 10,000 SAR">5,000 - 10,000 SAR</SelectItem>
                        <SelectItem value="10,000 - 15,000 SAR">10,000 - 15,000 SAR</SelectItem>
                        <SelectItem value="15,000 - 25,000 SAR">15,000 - 25,000 SAR</SelectItem>
                        <SelectItem value="25,000+ SAR">25,000+ SAR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purchasePeriod" className="text-sm font-semibold">Purchase Period</Label>
                    <Select value={editedLead.purchasePeriod || ''} onValueChange={(value) => handleInputChange('purchasePeriod', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select purchase timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immediately">Immediately</SelectItem>
                        <SelectItem value="Within 1 month">Within 1 month</SelectItem>
                        <SelectItem value="Within 3 months">Within 3 months</SelectItem>
                        <SelectItem value="Within 6 months">Within 6 months</SelectItem>
                        <SelectItem value="Within 1 year">Within 1 year</SelectItem>
                        <SelectItem value="Just browsing">Just browsing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod" className="text-sm font-semibold">Payment Method</Label>
                    <Select value={editedLead.paymentMethod || ''} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Lease">Lease</SelectItem>
                        <SelectItem value="Trade-in">Trade-in</SelectItem>
                        <SelectItem value="Bank Loan">Bank Loan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 4. VEHICLE INFORMATION SECTION */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-red-200 pb-2">🚗 Vehicle Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentVehicle" className="text-sm font-semibold">Current Vehicle</Label>
                    <Input
                      id="currentVehicle"
                      value={editedLead.currentVehicle || ''}
                      onChange={(e) => handleInputChange('currentVehicle', e.target.value)}
                      placeholder="Enter current vehicle details"
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modelOfInterest" className="text-sm font-semibold">Model of Interest</Label>
                    <Select value={editedLead.modelOfInterest || ''} onValueChange={(value) => handleInputChange('modelOfInterest', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select BMW model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BMW 3 Series">BMW 3 Series</SelectItem>
                        <SelectItem value="BMW 5 Series">BMW 5 Series</SelectItem>
                        <SelectItem value="BMW 7 Series">BMW 7 Series</SelectItem>
                        <SelectItem value="BMW X3">BMW X3</SelectItem>
                        <SelectItem value="BMW X5">BMW X5</SelectItem>
                        <SelectItem value="BMW X7">BMW X7</SelectItem>
                        <SelectItem value="BMW i4">BMW i4</SelectItem>
                        <SelectItem value="BMW iX">BMW iX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trim" className="text-sm font-semibold">Trim</Label>
                    <Input
                      id="trim"
                      value={editedLead.trim || ''}
                      onChange={(e) => handleInputChange('trim', e.target.value)}
                      placeholder="Enter trim level (e.g., xDrive40i)"
                      className="border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modelYear" className="text-sm font-semibold">Model Year</Label>
                    <Select value={editedLead.modelYear || ''} onValueChange={(value) => handleInputChange('modelYear', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select model year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
                    <Select value={editedLead.category || ''} onValueChange={(value) => handleInputChange('category', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select vehicle category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sedan">Sedan</SelectItem>
                        <SelectItem value="SUV">SUV</SelectItem>
                        <SelectItem value="Coupe">Coupe</SelectItem>
                        <SelectItem value="Convertible">Convertible</SelectItem>
                        <SelectItem value="Electric">Electric</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requestType" className="text-sm font-semibold">Request Type</Label>
                    <Select value={editedLead.requestType || ''} onValueChange={(value) => handleInputChange('requestType', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select request type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Test Drive">Test Drive</SelectItem>
                        <SelectItem value="Purchase Inquiry">Purchase Inquiry</SelectItem>
                        <SelectItem value="Price Quote">Price Quote</SelectItem>
                        <SelectItem value="Service Inquiry">Service Inquiry</SelectItem>
                        <SelectItem value="Information">Information</SelectItem>
                        <SelectItem value="Financing Options">Financing Options</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 5. LEAD STATUS SECTION */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-purple-200 pb-2">📊 Lead Status Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="leadStatus" className="text-sm font-semibold">Lead Status</Label>
                    <Select value={editedLead.leadStatus || ''} onValueChange={(value) => handleInputChange('leadStatus', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select lead status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Follow-up">Follow-up</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                        <SelectItem value="Converted">Converted</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leadSubStatus" className="text-sm font-semibold">Lead Sub Status</Label>
                    <Select value={editedLead.leadSubStatus || ''} onValueChange={(value) => handleInputChange('leadSubStatus', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select sub status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hot Lead">Hot Lead</SelectItem>
                        <SelectItem value="Warm Lead">Warm Lead</SelectItem>
                        <SelectItem value="Cold Lead">Cold Lead</SelectItem>
                        <SelectItem value="Negotiating">Negotiating</SelectItem>
                        <SelectItem value="Qualified">Qualified</SelectItem>
                        <SelectItem value="Unqualified">Unqualified</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leadStatusReason" className="text-sm font-semibold">Lead Status Reason</Label>
                    <Input
                      id="leadStatusReason"
                      value={editedLead.leadStatusReason || ''}
                      onChange={(e) => handleInputChange('leadStatusReason', e.target.value)}
                      placeholder="Enter reason for current status"
                      className="border-2"
                    />
                  </div>
                </div>
              </div>

              {/* 6. SOURCE INFORMATION SECTION */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-indigo-200 pb-2">🌐 Source Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="socialOrganicChannel" className="text-sm font-semibold">Social Organic Channel</Label>
                    <Select value={editedLead.socialOrganicChannel || ''} onValueChange={(value) => handleInputChange('socialOrganicChannel', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                        <SelectItem value="Direct">Direct</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="leadSource" className="text-sm font-semibold">Lead Source</Label>
                    <Select value={editedLead.leadSource || ''} onValueChange={(value) => handleInputChange('leadSource', value)}>
                      <SelectTrigger className="border-2">
                        <SelectValue placeholder="Select lead source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Google Search">Google Search</SelectItem>
                        <SelectItem value="Customer Referral">Customer Referral</SelectItem>
                        <SelectItem value="Walk-in">Walk-in</SelectItem>
                        <SelectItem value="Phone Call">Phone Call</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Exhibition">Exhibition</SelectItem>
                        <SelectItem value="Print Media">Print Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 7. COMMENTS SECTION */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 border-b-2 border-orange-200 pb-2">💬 Additional Comments</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="comment" className="text-sm font-semibold">Comment</Label>
                    <Textarea
                      id="comment"
                      value={editedLead.comment || ''}
                      onChange={(e) => handleInputChange('comment', e.target.value)}
                      placeholder="Enter detailed comments about this lead, their preferences, conversation notes, etc..."
                      rows={4}
                      className="border-2"
                    />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-4 pt-6 border-t-2 border-gray-200">
                <Button variant="outline" onClick={handleActionClose} className="px-6">
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 px-6">
                  <Save className="h-4 w-4 mr-2" />
                  Save All Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}