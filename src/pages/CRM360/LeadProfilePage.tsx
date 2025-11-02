import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Edit, Save, Upload, Phone, Mail, MessageSquare, MapPin, Calendar, Star } from 'lucide-react';

export default function LeadProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  // Mock lead data - in real app, fetch based on ID
  const lead = {
    id: 1,
    name: 'John Smith',
    gender: 'Male',
    dob: '1985-03-15',
    nationality: 'UAE',
    language: 'English',
    phone: '+971 50 123 4567',
    email: 'john.smith@email.com',
    whatsapp: '+971 50 123 4567',
    address: 'Dubai Marina, Dubai, UAE',
    source: 'Website',
    aiScore: 85,
    status: 'Hot',
    salesperson: 'Ahmed Al-Rashid',
    carInterest: 'BMW X5',
    budget: '150,000 - 200,000 AED',
    notes: 'Customer is very interested in luxury SUVs. Prefers German brands. Has a trade-in vehicle.',
    dateAdded: '2024-01-15',
    lastContact: '2024-01-20',
    nextFollowUp: '2024-01-25'
  };

  const interactions = [
    {
      id: 1,
      type: 'call',
      date: '2024-01-20',
      time: '14:30',
      notes: 'Discussed BMW X5 features and pricing. Customer interested in test drive.',
      salesperson: 'Ahmed Al-Rashid'
    },
    {
      id: 2,
      type: 'email',
      date: '2024-01-18',
      time: '10:15',
      notes: 'Sent brochures and pricing information for BMW X5 and X3.',
      salesperson: 'Ahmed Al-Rashid'
    },
    {
      id: 3,
      type: 'whatsapp',
      date: '2024-01-16',
      time: '16:45',
      notes: 'Initial inquiry about luxury SUVs. Provided basic information.',
      salesperson: 'Ahmed Al-Rashid'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800';
      case 'Contacted': return 'bg-blue-100 text-blue-800';
      case 'Test Drive': return 'bg-purple-100 text-purple-800';
      case 'New': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/leads')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{lead.name}</h1>
            <div className="flex items-center space-x-4 mt-2">
              <Badge className={getScoreColor(lead.aiScore)}>
                <Star className="mr-1 h-3 w-3" />
                AI Score: {lead.aiScore}
              </Badge>
              <Badge className={getStatusColor(lead.status)}>
                {lead.status}
              </Badge>
              <span className="text-sm text-gray-600">
                Added on {lead.dateAdded}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Lead
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="interactions">Interactions</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={lead.name}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue placeholder={lead.gender} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={lead.dob}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={lead.nationality}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="language">Preferred Language</Label>
                  <Input
                    id="language"
                    value={lead.language}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex">
                    <Input
                      id="phone"
                      value={lead.phone}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                    <Button variant="outline" size="sm" className="ml-2">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <Input
                      id="email"
                      value={lead.email}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                    <Button variant="outline" size="sm" className="ml-2">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <div className="flex">
                    <Input
                      id="whatsapp"
                      value={lead.whatsapp}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                    <Button variant="outline" size="sm" className="ml-2">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={lead.address}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lead Information */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="source">Lead Source</Label>
                    <Input
                      id="source"
                      value={lead.source}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="salesperson">Assigned Salesperson</Label>
                    <Input
                      id="salesperson"
                      value={lead.salesperson}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="carInterest">Car Interest</Label>
                    <Input
                      id="carInterest"
                      value={lead.carInterest}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <Input
                      id="budget"
                      value={lead.budget}
                      disabled={!isEditing}
                      className={!isEditing ? 'bg-gray-50' : ''}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nextFollowUp">Next Follow-up</Label>
                  <Input
                    id="nextFollowUp"
                    type="date"
                    value={lead.nextFollowUp}
                    disabled={!isEditing}
                    className={!isEditing ? 'bg-gray-50' : ''}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={lead.notes}
                  disabled={!isEditing}
                  className={!isEditing ? 'bg-gray-50' : ''}
                  rows={6}
                  placeholder="Add notes about this lead..."
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interaction History</CardTitle>
              <CardDescription>All communications with this lead</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {getInteractionIcon(interaction.type)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium capitalize">{interaction.type}</h4>
                        <span className="text-sm text-gray-500">
                          {interaction.date} at {interaction.time}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-1">{interaction.notes}</p>
                      <p className="text-sm text-gray-500 mt-2">By {interaction.salesperson}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Attachments</CardTitle>
              <CardDescription>Files related to this lead</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No documents</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by uploading a file.</p>
                <div className="mt-6">
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lead Timeline</CardTitle>
              <CardDescription>Chronological view of all activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {interactions.map((interaction, index) => (
                  <div key={interaction.id} className="relative">
                    {index !== interactions.length - 1 && (
                      <div className="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"></div>
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                          {getInteractionIcon(interaction.type)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="bg-white p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium capitalize">{interaction.type}</h4>
                            <span className="text-sm text-gray-500">
                              {interaction.date} at {interaction.time}
                            </span>
                          </div>
                          <p className="text-gray-600">{interaction.notes}</p>
                          <p className="text-sm text-gray-500 mt-2">By {interaction.salesperson}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}