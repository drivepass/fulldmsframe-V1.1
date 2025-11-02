import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  Clock, 
  MapPin,
  Calendar,
  Video,
  FileText,
  Users,
  Headphones,
  Globe,
  Send
} from 'lucide-react';

export default function ContactSupport() {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    priority: 'medium'
  });

  const [supportChannels] = useState([
    {
      name: 'Phone Support',
      icon: Phone,
      description: '24/7 phone support for urgent issues',
      contact: '+1 (555) 123-4567',
      availability: 'Available 24/7',
      responseTime: 'Immediate',
      status: 'online'
    },
    {
      name: 'Email Support',
      icon: Mail,
      description: 'Detailed support via email',
      contact: 'support@drivepass.com',
      availability: 'Business hours',
      responseTime: '2-4 hours',
      status: 'online'
    },
    {
      name: 'Live Chat',
      icon: MessageCircle,
      description: 'Real-time chat with support agents',
      contact: 'Available in app',
      availability: '9 AM - 6 PM EST',
      responseTime: '< 5 minutes',
      status: 'online'
    },
    {
      name: 'Video Call',
      icon: Video,
      description: 'Screen sharing and video support',
      contact: 'Schedule appointment',
      availability: 'By appointment',
      responseTime: 'Same day',
      status: 'available'
    }
  ]);

  const [supportTeam] = useState([
    {
      name: 'Sarah Johnson',
      role: 'Technical Support Lead',
      specialization: 'CRM & Service Management',
      avatar: '/api/placeholder/64/64',
      status: 'online'
    },
    {
      name: 'Mike Chen',
      role: 'Systems Specialist',
      specialization: 'Digital Signage & Analytics',
      avatar: '/api/placeholder/64/64',
      status: 'online'
    },
    {
      name: 'Lisa Brown',
      role: 'Customer Success Manager',
      specialization: 'Training & Onboarding',
      avatar: '/api/placeholder/64/64',
      status: 'busy'
    },
    {
      name: 'David Wilson',
      role: 'Senior Developer',
      specialization: 'Integration & API Support',
      avatar: '/api/placeholder/64/64',
      status: 'offline'
    }
  ]);

  const [businessHours] = useState([
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
    { day: 'Sunday', hours: 'Emergency support only' }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', contactForm);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Support</h1>
          <p className="text-gray-600 mt-1">Get help from our expert support team</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Support Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Methods */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Support Channels</CardTitle>
              <CardDescription>Choose the best way to reach our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <div key={channel.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold">{channel.name}</h3>
                            <Badge className={getStatusColor(channel.status)}>
                              {channel.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{channel.description}</p>
                          <div className="space-y-1 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{channel.availability}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-3 w-3" />
                              <span>Response: {channel.responseTime}</span>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Button size="sm" variant="outline" className="w-full">
                              {channel.name === 'Phone Support' && 'Call Now'}
                              {channel.name === 'Email Support' && 'Send Email'}
                              {channel.name === 'Live Chat' && 'Start Chat'}
                              {channel.name === 'Video Call' && 'Schedule Call'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>Fill out the form below and we'll get back to you</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      placeholder="Your full name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <Input 
                      type="email"
                      placeholder="your.email@company.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input 
                      placeholder="+1 (555) 123-4567"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={contactForm.priority}
                      onChange={(e) => setContactForm({...contactForm, priority: e.target.value})}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    placeholder="Brief description of your inquiry"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Please provide detailed information about your inquiry or issue..."
                    rows={6}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="font-medium">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Team */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Support Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supportTeam.map((member) => (
                  <div key={member.name} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === 'online' ? 'bg-green-500' :
                        member.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`}></div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{member.name}</h4>
                      <p className="text-xs text-gray-600">{member.role}</p>
                      <p className="text-xs text-gray-500">{member.specialization}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  User Manual
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Video className="h-4 w-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  System Status
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Training
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-red-700 mb-3">
                For critical system outages or urgent technical issues
              </p>
              <Button variant="destructive" className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency Line
              </Button>
              <p className="text-xs text-red-600 mt-2 text-center">
                +1 (555) 911-HELP
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}