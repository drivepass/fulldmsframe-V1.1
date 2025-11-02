import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { 
  Monitor, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Plus, 
  Upload,
  Settings,
  Eye,
  Calendar,
  Clock,
  Wifi,
  WifiOff
} from 'lucide-react';

export default function DigitalSignage() {
  const [displays, setDisplays] = useState([
    {
      id: 1,
      name: 'Showroom Main Display',
      location: 'Main Entrance',
      status: 'online',
      currentContent: 'New Vehicle Showcase',
      resolution: '1920x1080',
      lastUpdate: '2 minutes ago'
    },
    {
      id: 2,
      name: 'Service Area Display',
      location: 'Service Reception',
      status: 'online',
      currentContent: 'Service Promotions',
      resolution: '1366x768',
      lastUpdate: '5 minutes ago'
    },
    {
      id: 3,
      name: 'Waiting Area Display',
      location: 'Customer Lounge',
      status: 'offline',
      currentContent: 'Customer Testimonials',
      resolution: '1920x1080',
      lastUpdate: '1 hour ago'
    }
  ]);

  const [contentLibrary] = useState([
    {
      id: 1,
      name: 'New Vehicle Showcase',
      type: 'Video',
      duration: '2:30',
      status: 'active',
      thumbnail: '/api/placeholder/200/120'
    },
    {
      id: 2,
      name: 'Service Promotions',
      type: 'Slideshow',
      duration: '1:45',
      status: 'active',
      thumbnail: '/api/placeholder/200/120'
    },
    {
      id: 3,
      name: 'Customer Testimonials',
      type: 'Video',
      duration: '3:15',
      status: 'draft',
      thumbnail: '/api/placeholder/200/120'
    },
    {
      id: 4,
      name: 'Finance Offers',
      type: 'Image',
      duration: '0:30',
      status: 'scheduled',
      thumbnail: '/api/placeholder/200/120'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-red-500';
      case 'updating': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getContentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Digital Signage</h1>
          <p className="text-gray-600 mt-1">Manage displays and content across your dealership</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Upload Content
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Display
          </Button>
        </div>
      </div>

      <Tabs defaultValue="displays" className="space-y-6">
        <TabsList>
          <TabsTrigger value="displays">Display Management</TabsTrigger>
          <TabsTrigger value="content">Content Library</TabsTrigger>
          <TabsTrigger value="scheduling">Scheduling</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="displays" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displays.map((display) => (
              <Card key={display.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-5 w-5 text-gray-600" />
                      <CardTitle className="text-lg">{display.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(display.status)}`}></div>
                      {display.status === 'online' ? (
                        <Wifi className="h-4 w-4 text-green-500" />
                      ) : (
                        <WifiOff className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <CardDescription>{display.location}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Current Content:</span>
                      <span className="font-medium">{display.currentContent}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Resolution:</span>
                      <span className="font-medium">{display.resolution}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Last Update:</span>
                      <span className="font-medium">{display.lastUpdate}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Settings className="h-3 w-3 mr-1" />
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentLibrary.map((content) => (
              <Card key={content.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-gray-100 rounded-md mb-3 flex items-center justify-center">
                    <Monitor className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{content.name}</CardTitle>
                    <Badge className={getContentStatusColor(content.status)}>
                      {content.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium">{content.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{content.duration}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Play className="h-3 w-3 mr-1" />
                      Play
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Scheduling</CardTitle>
              <CardDescription>Schedule content to play at specific times and displays</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="display-select">Select Display</Label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>Showroom Main Display</option>
                      <option>Service Area Display</option>
                      <option>Waiting Area Display</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="content-select">Select Content</Label>
                    <select className="w-full mt-1 p-2 border rounded-md">
                      <option>New Vehicle Showcase</option>
                      <option>Service Promotions</option>
                      <option>Customer Testimonials</option>
                      <option>Finance Offers</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="start-date">Start Date & Time</Label>
                    <Input type="datetime-local" className="mt-1" />
                  </div>
                  
                  <div>
                    <Label htmlFor="end-date">End Date & Time</Label>
                    <Input type="datetime-local" className="mt-1" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch id="repeat" />
                <Label htmlFor="repeat">Repeat Schedule</Label>
              </div>
              
              <Button>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Content
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Displays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">3</div>
                <p className="text-xs text-gray-600">2 online, 1 offline</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Active Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">2</div>
                <p className="text-xs text-gray-600">Currently playing</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Scheduled Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">1</div>
                <p className="text-xs text-gray-600">Upcoming this week</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Total Runtime</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">24h</div>
                <p className="text-xs text-gray-600">Today</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Display Performance</CardTitle>
              <CardDescription>Monitor display uptime and content engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {displays.map((display) => (
                  <div key={display.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(display.status)}`}></div>
                      <div>
                        <h4 className="font-medium">{display.name}</h4>
                        <p className="text-sm text-gray-600">{display.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {display.status === 'online' ? '99.9%' : '0%'} Uptime
                      </div>
                      <div className="text-xs text-gray-600">Last 30 days</div>
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