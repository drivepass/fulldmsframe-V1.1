import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Phone, Mail, MessageCircle, Send, FileText, Clock } from 'lucide-react';

interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  content: string;
}

const mockEmails = [
  {
    id: 1,
    subject: 'BMW X5 Pricing Information',
    recipient: 'john.smith@email.com',
    date: '2024-01-20 10:30 AM',
    status: 'Sent'
  },
  {
    id: 2,
    subject: 'Test Drive Confirmation',
    recipient: 'sarah.johnson@email.com',
    date: '2024-01-19 3:45 PM',
    status: 'Delivered'
  }
];

const mockWhatsApp = [
  {
    id: 1,
    message: 'Hi John! Here\'s the BMW X5 brochure you requested.',
    recipient: '+971501234567',
    date: '2024-01-20 11:00 AM',
    status: 'Read'
  },
  {
    id: 2,
    message: 'Your test drive is confirmed for tomorrow at 2 PM.',
    recipient: '+971502345678',
    date: '2024-01-19 4:00 PM',
    status: 'Delivered'
  }
];

const mockCalls = [
  {
    id: 1,
    contact: 'John Smith (+971501234567)',
    duration: '15 min',
    date: '2024-01-20 10:30 AM',
    type: 'Outgoing',
    notes: 'Discussed financing options for BMW X5'
  },
  {
    id: 2,
    contact: 'Sarah Johnson (+971502345678)',
    duration: '8 min',
    date: '2024-01-19 2:15 PM',
    type: 'Incoming',
    notes: 'Customer inquiry about Mercedes C-Class availability'
  }
];

const emailTemplates: EmailTemplate[] = [
  {
    id: 1,
    name: 'Welcome Email',
    subject: 'Welcome to DrivePass - Your Premium Car Dealer',
    content: 'Dear [Customer Name],\n\nThank you for your interest in our vehicles...'
  },
  {
    id: 2,
    name: 'Test Drive Confirmation',
    subject: 'Test Drive Confirmation - [Vehicle Model]',
    content: 'Dear [Customer Name],\n\nYour test drive has been confirmed for...'
  },
  {
    id: 3,
    name: 'Follow-up Email',
    subject: 'Following up on your visit to DrivePass',
    content: 'Dear [Customer Name],\n\nIt was great meeting you at our showroom...'
  }
];

export default function CommunicationPanel() {
  const [activeTab, setActiveTab] = useState('email');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Sent': return 'bg-blue-100 text-blue-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Read': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendEmail = () => {
    console.log('Sending email:', { subject: emailSubject, content: emailContent });
    setEmailSubject('');
    setEmailContent('');
  };

  const handleSendWhatsApp = () => {
    console.log('Sending WhatsApp:', whatsappMessage);
    setWhatsappMessage('');
  };

  const applyTemplate = (template: EmailTemplate) => {
    setEmailSubject(template.subject);
    setEmailContent(template.content);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communication Panel</h1>
          <p className="text-gray-600">Manage all customer communications from one place</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Emails Sent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-green-600">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">WhatsApp Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-blue-600">Active conversations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Calls Made</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-gray-600">2h 45m total time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Response Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-green-600">Above average</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Email</span>
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp/SMS</span>
          </TabsTrigger>
          <TabsTrigger value="calls" className="flex items-center space-x-2">
            <Phone className="h-4 w-4" />
            <span>Call Log</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compose Email</CardTitle>
                <CardDescription>Send emails to prospects and customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">To</label>
                  <Input placeholder="Enter email address" />
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Email subject"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                    placeholder="Type your message here..."
                    className="min-h-[200px]"
                  />
                </div>
                <Button onClick={handleSendEmail} className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Use pre-built templates for quick replies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {emailTemplates.map((template) => (
                    <div key={template.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{template.name}</h4>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => applyTemplate(template)}
                        >
                          <FileText className="mr-1 h-3 w-3" />
                          Use
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{template.subject}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Emails</CardTitle>
              <CardDescription>Track your sent emails and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockEmails.map((email) => (
                  <div key={email.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{email.subject}</h4>
                      <p className="text-sm text-gray-600">{email.recipient}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-500">{email.date}</div>
                      <Badge className={getStatusColor(email.status)}>
                        {email.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Send WhatsApp Message</CardTitle>
                <CardDescription>Quick messaging to prospects and customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input placeholder="+971 50 123 4567" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    value={whatsappMessage}
                    onChange={(e) => setWhatsappMessage(e.target.value)}
                    placeholder="Type your WhatsApp message here..."
                    className="min-h-[150px]"
                  />
                </div>
                <Button onClick={handleSendWhatsApp} className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Send WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Templates</CardTitle>
                <CardDescription>Common WhatsApp message templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    'Thank you for your interest! Here\'s the information you requested.',
                    'Your test drive is confirmed for [Date] at [Time].',
                    'We have a special offer on [Vehicle Model]. Would you like to know more?',
                    'Following up on your recent visit. Any questions?'
                  ].map((template, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left justify-start h-auto p-3"
                      onClick={() => setWhatsappMessage(template)}
                    >
                      <FileText className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{template}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Track your WhatsApp conversations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockWhatsApp.map((message) => (
                  <div key={message.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{message.message}</p>
                      <p className="text-sm text-gray-600">{message.recipient}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-500">{message.date}</div>
                      <Badge className={getStatusColor(message.status)}>
                        {message.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calls" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Call Log</CardTitle>
              <CardDescription>Track all phone conversations with prospects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        call.type === 'Outgoing' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        <Phone className={`h-5 w-5 ${
                          call.type === 'Outgoing' ? 'text-blue-600' : 'text-green-600'
                        }`} />
                      </div>
                      <div>
                        <h4 className="font-medium">{call.contact}</h4>
                        <p className="text-sm text-gray-600">{call.notes}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{call.duration}</span>
                      </div>
                      <p className="text-sm text-gray-500">{call.date}</p>
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