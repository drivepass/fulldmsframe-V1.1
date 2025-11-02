import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Upload, Download, Search, Filter, Eye, Edit, Trash2, Folder, Image, File } from 'lucide-react';

const mockDocuments = [
  {
    id: 1,
    name: 'BMW_X5_Brochure.pdf',
    type: 'PDF',
    category: 'Brochures',
    size: '2.4 MB',
    uploadedBy: 'Ahmed Al-Rashid',
    uploadDate: '2024-01-15',
    customerName: 'John Smith',
    tags: ['BMW', 'X5', 'Brochure'],
    downloads: 15
  },
  {
    id: 2,
    name: 'Purchase_Agreement_MER002.pdf',
    type: 'PDF',
    category: 'Contracts',
    size: '1.8 MB',
    uploadedBy: 'Fatima Al-Zahra',
    uploadDate: '2024-01-14',
    customerName: 'Sarah Johnson',
    tags: ['Contract', 'Mercedes', 'Purchase'],
    downloads: 3
  },
  {
    id: 3,
    name: 'Insurance_Quote_AUD003.pdf',
    type: 'PDF',
    category: 'Insurance',
    size: '856 KB',
    uploadedBy: 'Omar Hassan',
    uploadDate: '2024-01-13',
    customerName: 'Michael Brown',
    tags: ['Insurance', 'Audi', 'Quote'],
    downloads: 7
  },
  {
    id: 4,
    name: 'Vehicle_Photos_TOY004.zip',
    type: 'ZIP',
    category: 'Images',
    size: '12.3 MB',
    uploadedBy: 'Khalid Al-Mansouri',
    uploadDate: '2024-01-12',
    customerName: 'Lisa Davis',
    tags: ['Photos', 'Toyota', 'Camry'],
    downloads: 22
  }
];

export default function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText className="h-5 w-5 text-red-600" />;
      case 'zip': return <Folder className="h-5 w-5 text-yellow-600" />;
      case 'jpg':
      case 'png':
      case 'jpeg': return <Image className="h-5 w-5 text-blue-600" />;
      default: return <File className="h-5 w-5 text-gray-600" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Brochures': return 'bg-blue-100 text-blue-800';
      case 'Contracts': return 'bg-green-100 text-green-800';
      case 'Insurance': return 'bg-purple-100 text-purple-800';
      case 'Images': return 'bg-orange-100 text-orange-800';
      case 'Service': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600">Organize and manage all customer documents</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Bulk Download
          </Button>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Documents
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-green-600">+23 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.8 GB</div>
            <p className="text-xs text-gray-600">of 10 GB limit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,567</div>
            <p className="text-xs text-green-600">+89 today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-gray-600">Document types</p>
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
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Brochures">Brochures</SelectItem>
                <SelectItem value="Contracts">Contracts</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
                <SelectItem value="Images">Images</SelectItem>
                <SelectItem value="Service">Service</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="File Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="ZIP">ZIP</SelectItem>
                <SelectItem value="JPG">JPG</SelectItem>
                <SelectItem value="PNG">PNG</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Documents ({filteredDocuments.length})</CardTitle>
          <CardDescription>All uploaded documents and files</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {getFileIcon(doc.type)}
                      <div>
                        <div className="font-medium">{doc.name}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {doc.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(doc.category)}>
                      {doc.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{doc.customerName}</TableCell>
                  <TableCell className="text-sm text-gray-600">{doc.size}</TableCell>
                  <TableCell>{doc.uploadedBy}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Download className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{doc.downloads}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Document Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {['Brochures', 'Contracts', 'Insurance', 'Images', 'Service'].map(category => {
                const count = mockDocuments.filter(d => d.category === category).length;
                const percentage = (count / mockDocuments.length) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span>{category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>BMW_X5_Brochure.pdf uploaded</span>
                <span className="text-gray-500 ml-auto">2h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Purchase_Agreement_MER002.pdf downloaded</span>
                <span className="text-gray-500 ml-auto">4h ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Insurance_Quote_AUD003.pdf shared</span>
                <span className="text-gray-500 ml-auto">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}