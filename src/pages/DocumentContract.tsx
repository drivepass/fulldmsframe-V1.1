import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Download, Upload, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface Document {
  id: number;
  name: string;
  type: string;
  status: string;
  uploadDate: string;
  size: string;
  customer: string;
}

const mockDocuments: Document[] = [
  {
    id: 1,
    name: 'Sales_Contract_BMW_X5_John_Smith.pdf',
    type: 'Sales Contract',
    status: 'Signed',
    uploadDate: '2024-01-20',
    size: '2.4 MB',
    customer: 'John Smith'
  },
  {
    id: 2,
    name: 'Insurance_Policy_Mercedes_C200.pdf',
    type: 'Insurance',
    status: 'Pending Signature',
    uploadDate: '2024-01-19',
    size: '1.8 MB',
    customer: 'Sarah Johnson'
  },
  {
    id: 3,
    name: 'Financing_Agreement_Audi_Q7.pdf',
    type: 'Finance Agreement',
    status: 'Under Review',
    uploadDate: '2024-01-18',
    size: '3.2 MB',
    customer: 'Mike Wilson'
  },
  {
    id: 4,
    name: 'Trade_In_Valuation_Toyota_Camry.pdf',
    type: 'Trade-in Document',
    status: 'Completed',
    uploadDate: '2024-01-17',
    size: '1.5 MB',
    customer: 'Lisa Chen'
  }
];

const documentTemplates = [
  {
    id: 1,
    name: 'Sales Contract Template',
    description: 'Standard vehicle sales agreement',
    type: 'Sales Contract'
  },
  {
    id: 2,
    name: 'Finance Agreement Template',
    description: 'Vehicle financing terms and conditions',
    type: 'Finance Agreement'
  },
  {
    id: 3,
    name: 'Insurance Policy Template',
    description: 'Comprehensive vehicle insurance coverage',
    type: 'Insurance'
  },
  {
    id: 4,
    name: 'Trade-in Agreement Template',
    description: 'Vehicle trade-in valuation and terms',
    type: 'Trade-in Document'
  }
];

export default function DocumentContract() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Signed': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending Signature': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Signed':
      case 'Completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Pending Signature':
      case 'Under Review':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Rejected':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.customer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleDownload = (documentId: number) => {
    console.log(`Downloading document ${documentId}`);
  };

  const handleView = (documentId: number) => {
    console.log(`Viewing document ${documentId}`);
  };

  const handleSendForSignature = (documentId: number) => {
    console.log(`Sending document ${documentId} for signature`);
  };

  const handleGenerateFromTemplate = (templateId: number) => {
    console.log(`Generating document from template ${templateId}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document & Contract Management</h1>
          <p className="text-gray-600">Manage all sales documents, contracts, and signatures</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Contract
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
            <div className="text-2xl font-bold">{mockDocuments.length}</div>
            <p className="text-xs text-gray-600">All document types</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Signatures</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDocuments.filter(d => d.status === 'Pending Signature').length}
            </div>
            <p className="text-xs text-yellow-600">Awaiting customer signature</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDocuments.filter(d => d.status === 'Signed' || d.status === 'Completed').length}
            </div>
            <p className="text-xs text-green-600">Fully processed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockDocuments.filter(d => d.status === 'Under Review').length}
            </div>
            <p className="text-xs text-blue-600">Being processed</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search by document name or customer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Signed">Signed</SelectItem>
                <SelectItem value="Pending Signature">Pending Signature</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Sales Contract">Sales Contract</SelectItem>
                <SelectItem value="Finance Agreement">Finance Agreement</SelectItem>
                <SelectItem value="Insurance">Insurance</SelectItem>
                <SelectItem value="Trade-in Document">Trade-in Document</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Documents & Contracts</CardTitle>
              <CardDescription>Manage all customer documents and contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((document) => (
                  <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        {getStatusIcon(document.status)}
                      </div>
                      <div>
                        <h4 className="font-medium">{document.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{document.customer}</span>
                          <span>•</span>
                          <span>{document.type}</span>
                          <span>•</span>
                          <span>{document.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <Badge className={getStatusColor(document.status)}>
                          {document.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">{document.uploadDate}</p>
                      </div>
                      <div className="flex space-x-1">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleView(document.id)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload(document.id)}
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                        {document.status === 'Under Review' && (
                          <Button 
                            size="sm"
                            onClick={() => handleSendForSignature(document.id)}
                          >
                            Send for Signature
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Document Templates */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Document Templates</CardTitle>
              <CardDescription>Generate documents from templates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documentTemplates.map((template) => (
                  <div key={template.id} className="p-3 border rounded-lg">
                    <h4 className="font-medium mb-1">{template.name}</h4>
                    <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleGenerateFromTemplate(template.id)}
                    >
                      <FileText className="mr-1 h-3 w-3" />
                      Generate
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* E-Signature Status */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>E-Signature Status</CardTitle>
              <CardDescription>Track signature progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">John Smith</span>
                  </div>
                  <span className="text-xs text-green-600">Signed</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Sarah Johnson</span>
                  </div>
                  <span className="text-xs text-yellow-600">Pending</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Mike Wilson</span>
                  </div>
                  <span className="text-xs text-blue-600">Sent</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}