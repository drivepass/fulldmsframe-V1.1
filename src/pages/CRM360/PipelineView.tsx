import { useState } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, MessageSquare, Eye, Star } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  aiScore: number;
  salesperson: string;
  carInterest: string;
  value: string;
  lastContact: string;
  stage: string;
}

const initialLeads: Lead[] = [
  {
    id: '1',
    name: 'John Smith',
    phone: '+971 50 123 4567',
    email: 'john.smith@email.com',
    aiScore: 85,
    salesperson: 'Ahmed Al-Rashid',
    carInterest: 'BMW X5',
    value: '180,000 AED',
    lastContact: '2 hours ago',
    stage: 'new'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+971 55 987 6543',
    email: 'sarah.j@email.com',
    aiScore: 92,
    salesperson: 'Fatima Al-Zahra',
    carInterest: 'Mercedes C-Class',
    value: '150,000 AED',
    lastContact: '1 day ago',
    stage: 'contacted'
  },
  {
    id: '3',
    name: 'Michael Brown',
    phone: '+971 52 456 7890',
    email: 'mbrown@email.com',
    aiScore: 78,
    salesperson: 'Omar Hassan',
    carInterest: 'Audi A4',
    value: '120,000 AED',
    lastContact: '3 hours ago',
    stage: 'test-drive'
  },
  {
    id: '4',
    name: 'Lisa Davis',
    phone: '+971 56 234 5678',
    email: 'lisa.davis@email.com',
    aiScore: 88,
    salesperson: 'Khalid Al-Mansouri',
    carInterest: 'Toyota Camry',
    value: '95,000 AED',
    lastContact: '5 hours ago',
    stage: 'proposal'
  },
  {
    id: '5',
    name: 'Ahmed Hassan',
    phone: '+971 54 345 6789',
    email: 'ahmed.hassan@email.com',
    aiScore: 95,
    salesperson: 'Noor Al-Zahra',
    carInterest: 'Range Rover',
    value: '250,000 AED',
    lastContact: '30 minutes ago',
    stage: 'hot'
  },
  {
    id: '6',
    name: 'Emma Wilson',
    phone: '+971 58 567 8901',
    email: 'emma.wilson@email.com',
    aiScore: 90,
    salesperson: 'Saeed Al-Maktoum',
    carInterest: 'Porsche Cayenne',
    value: '320,000 AED',
    lastContact: '1 week ago',
    stage: 'closed'
  }
];

const stages = [
  { id: 'new', title: 'New', color: 'bg-gray-100', count: 0 },
  { id: 'contacted', title: 'Contacted', color: 'bg-blue-100', count: 0 },
  { id: 'test-drive', title: 'Test Drive', color: 'bg-purple-100', count: 0 },
  { id: 'proposal', title: 'Proposal', color: 'bg-yellow-100', count: 0 },
  { id: 'hot', title: 'Hot', color: 'bg-red-100', count: 0 },
  { id: 'closed', title: 'Closed', color: 'bg-green-100', count: 0 }
];

function LeadCard({ lead }: { lead: Lead }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-800';
    if (score >= 80) return 'bg-blue-100 text-blue-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing"
    >
      <Card className="mb-3 hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-sm">{lead.name}</h4>
              <p className="text-xs text-gray-500">{lead.carInterest}</p>
            </div>
            <Badge className={getScoreColor(lead.aiScore)}>
              <Star className="mr-1 h-3 w-3" />
              {lead.aiScore}
            </Badge>
          </div>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center text-xs text-gray-600">
              <Phone className="mr-1 h-3 w-3" />
              {lead.phone}
            </div>
            <div className="flex items-center text-xs text-gray-600">
              <Mail className="mr-1 h-3 w-3" />
              {lead.email}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-green-600">{lead.value}</span>
            <span className="text-gray-500">{lead.lastContact}</span>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">
                  {lead.salesperson.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <span className="ml-2 text-xs text-gray-600">{lead.salesperson}</span>
            </div>
            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Phone className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MessageSquare className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PipelineView() {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Check if we're dropping on a stage column
    const targetStage = stages.find(stage => stage.id === overId);
    if (targetStage) {
      setLeads(leads.map(lead => 
        lead.id === activeId 
          ? { ...lead, stage: targetStage.id }
          : lead
      ));
      return;
    }

    // Handle reordering within the same stage
    if (activeId !== overId) {
      const oldIndex = leads.findIndex(lead => lead.id === activeId);
      const newIndex = leads.findIndex(lead => lead.id === overId);
      
      setLeads(arrayMove(leads, oldIndex, newIndex));
    }
  };

  const getLeadsByStage = (stageId: string) => {
    return leads.filter(lead => lead.stage === stageId);
  };

  const getTotalValue = (stageId: string) => {
    return getLeadsByStage(stageId).reduce((sum, lead) => {
      return sum + parseInt(lead.value.replace(/[^\d]/g, ''));
    }, 0);
  };

  const formatValue = (value: number) => {
    return `${(value / 1000).toFixed(0)}K AED`;
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pipeline View</h1>
          <p className="text-gray-600">Drag and drop leads between stages</p>
        </div>
        <div className="flex space-x-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{leads.length}</div>
            <div className="text-gray-600">Total Leads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {formatValue(leads.reduce((sum, lead) => sum + parseInt(lead.value.replace(/[^\d]/g, '')), 0))}
            </div>
            <div className="text-gray-600">Total Value</div>
          </div>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {stages.map((stage) => {
            const stageLeads = getLeadsByStage(stage.id);
            const stageValue = getTotalValue(stage.id);
            
            return (
              <div key={stage.id} className="flex flex-col">
                <Card className={`${stage.color} mb-4`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium">
                        {stage.title}
                      </CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {stageLeads.length}
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      {formatValue(stageValue)}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div 
                  className="flex-1 min-h-[400px] p-2 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50/50"
                  data-stage={stage.id}
                >
                  <SortableContext 
                    items={stageLeads.map(lead => lead.id)} 
                    strategy={verticalListSortingStrategy}
                  >
                    {stageLeads.map((lead) => (
                      <LeadCard key={lead.id} lead={lead} />
                    ))}
                  </SortableContext>
                  
                  {stageLeads.length === 0 && (
                    <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                      Drop leads here
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}