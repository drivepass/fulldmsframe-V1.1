import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Play, Pause, Edit, Trash2, Mail, MessageCircle, Calendar, Users } from 'lucide-react';

const mockCampaigns = [
  {
    id: 1,
    name: 'Birthday Wishes Campaign',
    type: 'Birthday',
    status: 'Active',
    trigger: 'Customer Birthday',
    channel: 'Email + SMS',
    recipients: 245,
    sent: 12,
    opened: 8,
    clicked: 3,
    created: '2024-01-10'
  },
  {
    id: 2,
    name: 'Service Reminder Campaign',
    type: 'Service',
    status: 'Active',
    trigger: 'Service Due Date',
    channel: 'WhatsApp',
    recipients: 89,
    sent: 45,
    opened: 32,
    clicked: 15,
    created: '2024-01-05'
  },
  {
    id: 3,
    name: 'Insurance Renewal Reminder',
    type: 'Insurance',
    status: 'Paused',
    trigger: 'Insurance Expiry',
    channel: 'Email',
    recipients: 156,
    sent: 78,
    opened: 45,
    clicked: 12,
    created: '2023-12-20'
  },
  {
    id: 4,
    name: 'Loyalty Program Invitation',
    type: 'Loyalty',
    status: 'Draft',
    trigger: 'Purchase Completion',
    channel: 'Email + WhatsApp',
    recipients: 0,
    sent: 0,
    opened: 0,
    clicked: 0,
    created: '2024-01-18'
  }
];

const campaignTemplates = [
  {
    id: 1,
    name: 'Birthday Celebration',
    description: 'Send birthday wishes with special offers',
    trigger: 'Birthday',
    channels: ['Email', 'SMS']
  },
  {
    id: 2,
    name: 'Service Reminder',
    description: 'Remind customers about upcoming service',
    trigger: 'Service Due',
    channels: ['WhatsApp', 'SMS']
  },
  {
    id: 3,
    name: 'Insurance Renewal',
    description: 'Notify about insurance renewal',
    trigger: 'Insurance Expiry',
    channels: ['Email', 'WhatsApp']
  },
  {
    id: 4,
    name: 'Welcome Series',
    description: 'Welcome new customers',
    trigger: 'Purchase',
    channels: ['Email']
  }
];

export default function CampaignAutomation() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    type: '',
    trigger: '',
    channel: '',
    message: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Paused': return 'bg-yellow-100 text-yellow-800';
      case 'Draft': return 'bg-gray-100 text-gray-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getChannelIcon = (channel: string) => {
    if (channel.includes('Email')) return <Mail className="h-4 w-4" />;
    if (channel.includes('WhatsApp')) return <MessageCircle className="h-4 w-4" />;
    return <MessageCircle className="h-4 w-4" />;
  };

  const handleCreateCampaign = () => {
    console.log('Creating campaign:', newCampaign);
    setShowCreateForm(false);
    setNewCampaign({ name: '', type: '', trigger: '', channel: '', message: '' });
  };

  const handleToggleCampaign = (campaignId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'Active' ? 'Paused' : 'Active';
    console.log(`Toggling campaign ${campaignId} to ${newStatus}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Automation</h1>
          <p className="text-gray-600">Create and manage automated marketing campaigns</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.filter(c => c.status === 'Active').length}
            </div>
            <p className="text-xs text-green-600">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.reduce((sum, c) => sum + c.recipients, 0)}
            </div>
            <p className="text-xs text-blue-600">Across all campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Messages Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.reduce((sum, c) => sum + c.sent, 0)}
            </div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Click Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCampaigns.reduce((sum, c) => sum + c.sent, 0) > 0 
                ? Math.round((mockCampaigns.reduce((sum, c) => sum + c.clicked, 0) / mockCampaigns.reduce((sum, c) => sum + c.sent, 0)) * 100)
                : 0}%
            </div>
            <p className="text-xs text-green-600">Above average</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Campaign Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Campaign</CardTitle>
            <CardDescription>Set up an automated marketing campaign</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Campaign Name</label>
                <Input
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter campaign name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Campaign Type</label>
                <Select value={newCampaign.type} onValueChange={(value) => 
                  setNewCampaign(prev => ({ ...prev, type: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Birthday">Birthday</SelectItem>
                    <SelectItem value="Service">Service Reminder</SelectItem>
                    <SelectItem value="Insurance">Insurance Renewal</SelectItem>
                    <SelectItem value="Loyalty">Loyalty Program</SelectItem>
                    <SelectItem value="Follow-up">Follow-up</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Trigger</label>
                <Select value={newCampaign.trigger} onValueChange={(value) => 
                  setNewCampaign(prev => ({ ...prev, trigger: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trigger" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Birthday">Customer Birthday</SelectItem>
                    <SelectItem value="Service Due">Service Due Date</SelectItem>
                    <SelectItem value="Insurance Expiry">Insurance Expiry</SelectItem>
                    <SelectItem value="Purchase">Purchase Completion</SelectItem>
                    <SelectItem value="Visit">Showroom Visit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Channel</label>
                <Select value={newCampaign.channel} onValueChange={(value) => 
                  setNewCampaign(prev => ({ ...prev, channel: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Email + SMS">Email + SMS</SelectItem>
                    <SelectItem value="Email + WhatsApp">Email + WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Message Template</label>
              <Textarea
                value={newCampaign.message}
                onChange={(e) => setNewCampaign(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Enter your message template..."
                className="min-h-[100px]"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleCreateCampaign}>Create Campaign</Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Campaign Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Templates</CardTitle>
          <CardDescription>Quick start with pre-built campaign templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {campaignTemplates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">{template.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {template.trigger}
                  </Badge>
                  <Button size="sm" variant="outline">
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>Monitor and manage your automated campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCampaigns.map((campaign) => (
              <div key={campaign.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getChannelIcon(campaign.channel)}
                    <div>
                      <h4 className="font-medium">{campaign.name}</h4>
                      <p className="text-sm text-gray-600">{campaign.trigger} • {campaign.channel}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm mb-4">
                  <div>
                    <p className="text-gray-600">Recipients</p>
                    <p className="font-semibold">{campaign.recipients}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sent</p>
                    <p className="font-semibold">{campaign.sent}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Opened</p>
                    <p className="font-semibold">{campaign.opened}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Clicked</p>
                    <p className="font-semibold">{campaign.clicked}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Click Rate</p>
                    <p className="font-semibold">
                      {campaign.sent > 0 ? Math.round((campaign.clicked / campaign.sent) * 100) : 0}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">Created: {campaign.created}</p>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleCampaign(campaign.id, campaign.status)}
                    >
                      {campaign.status === 'Active' ? (
                        <>
                          <Pause className="mr-1 h-3 w-3" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-1 h-3 w-3" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Users className="mr-1 h-3 w-3" />
                      View Recipients
                    </Button>
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