import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Book, 
  FileText, 
  Video, 
  Download,
  Star,
  Clock,
  User,
  ChevronRight,
  Play,
  Bookmark,
  ThumbsUp
} from 'lucide-react';

export default function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories] = useState([
    {
      name: 'Getting Started',
      icon: Book,
      articles: 12,
      description: 'Basic setup and initial configuration'
    },
    {
      name: 'CRM Management',
      icon: User,
      articles: 28,
      description: 'Lead management and customer relations'
    },
    {
      name: 'Service Operations',
      icon: FileText,
      articles: 15,
      description: 'Workshop and service management'
    },
    {
      name: 'Reports & Analytics',
      icon: Star,
      articles: 8,
      description: 'Data analysis and reporting tools'
    },
    {
      name: 'Digital Signage',
      icon: Video,
      articles: 6,
      description: 'Display management and content'
    },
    {
      name: 'Troubleshooting',
      icon: FileText,
      articles: 22,
      description: 'Common issues and solutions'
    }
  ]);

  const [popularArticles] = useState([
    {
      id: 1,
      title: 'How to Set Up Your First Lead Pipeline',
      category: 'CRM Management',
      views: 2847,
      rating: 4.8,
      readTime: '5 min',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      title: 'Creating Service Appointments and Bookings',
      category: 'Service Operations',
      views: 1923,
      rating: 4.7,
      readTime: '8 min',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      title: 'Understanding Sales Reports and Analytics',
      category: 'Reports & Analytics',
      views: 1654,
      rating: 4.9,
      readTime: '12 min',
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      title: 'Digital Signage Content Management Guide',
      category: 'Digital Signage',
      views: 1432,
      rating: 4.6,
      readTime: '10 min',
      lastUpdated: '5 days ago'
    },
    {
      id: 5,
      title: 'Troubleshooting Common Login Issues',
      category: 'Troubleshooting',
      views: 3201,
      rating: 4.5,
      readTime: '3 min',
      lastUpdated: '1 day ago'
    }
  ]);

  const [videoTutorials] = useState([
    {
      id: 1,
      title: 'DrivePass CRM 360 Overview',
      duration: '15:30',
      views: 5432,
      thumbnail: '/api/placeholder/300/180'
    },
    {
      id: 2,
      title: 'Setting Up Your Service Department',
      duration: '12:45',
      views: 3210,
      thumbnail: '/api/placeholder/300/180'
    },
    {
      id: 3,
      title: 'Advanced Reporting Features',
      duration: '18:20',
      views: 2876,
      thumbnail: '/api/placeholder/300/180'
    },
    {
      id: 4,
      title: 'Customer Engagement Best Practices',
      duration: '22:15',
      views: 4123,
      thumbnail: '/api/placeholder/300/180'
    }
  ]);

  const [recentArticles] = useState([
    {
      id: 1,
      title: 'New Features in DrivePass CRM 360 v2.1',
      category: 'Getting Started',
      publishDate: '2024-01-15',
      isNew: true
    },
    {
      id: 2,
      title: 'Enhanced Workshop Management Tools',
      category: 'Service Operations',
      publishDate: '2024-01-12',
      isNew: true
    },
    {
      id: 3,
      title: 'Updated Digital Signage Templates',
      category: 'Digital Signage',
      publishDate: '2024-01-10',
      isNew: false
    },
    {
      id: 4,
      title: 'Advanced Customer Segmentation',
      category: 'CRM Management',
      publishDate: '2024-01-08',
      isNew: false
    }
  ]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
          <p className="text-gray-600 mt-1">Find answers, tutorials, and guides for DrivePass CRM</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download PDF Guide
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search knowledge base..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="browse" className="space-y-6">
        <TabsList>
          <TabsTrigger value="browse">Browse Categories</TabsTrigger>
          <TabsTrigger value="popular">Popular Articles</TabsTrigger>
          <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
          <TabsTrigger value="recent">Recent Updates</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <CardDescription>{category.articles} articles</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">View Articles</span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="space-y-4">
            {popularArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{article.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <span>{article.views.toLocaleString()} views</span>
                        <span>Updated {article.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoTutorials.map((video) => (
              <Card key={video.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                      <Play className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{video.views.toLocaleString()} views</span>
                      <Button size="sm" variant="outline">
                        <Play className="h-3 w-3 mr-1" />
                        Watch
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <div className="space-y-4">
            {recentArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{article.title}</h3>
                          {article.isNew && (
                            <Badge className="bg-green-100 text-green-800">New</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{article.category}</span>
                          <span>Published {article.publishDate}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}