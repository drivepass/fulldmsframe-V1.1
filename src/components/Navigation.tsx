import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  ChevronDown, 
  ChevronRight,
  Home,
  Users,
  UserPlus,
  BarChart3,
  Settings,
  FileText,
  Calendar,
  Phone,
  Mail,
  Target,
  TrendingUp,
  Building,
  Car,
  DollarSign,
  PieChart,
  Activity,
  Wrench,
  ClipboardList,
  Monitor,
  Tv,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCrmOpen, setIsCrmOpen] = useState(true);
  const [isSalesOpen, setIsSalesOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [isDigitalOpen, setIsDigitalOpen] = useState(false);
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      title: 'Dashboard',
      icon: Home,
      path: '/',
      color: 'text-blue-600'
    },
    {
      title: 'CRM 360',
      icon: Users,
      isCollapsible: true,
      isOpen: isCrmOpen,
      setIsOpen: setIsCrmOpen,
      color: 'text-indigo-600',
      children: [
        {
          title: 'Leads Management',
          icon: UserPlus,
          path: '/leads',
          description: 'Manage and track customer leads'
        },
        {
          title: 'Lead Journey',
          icon: Target,
          path: '/leads/journey',
          description: 'Track lead progression'
        },
        {
          title: 'Customer Database',
          icon: Users,
          path: '/customers',
          description: 'Customer information management'
        },
        {
          title: 'Follow-up Tasks',
          icon: Calendar,
          path: '/follow-up',
          description: 'Scheduled follow-up activities'
        },
        {
          title: 'Communication Log',
          icon: Phone,
          path: '/communications',
          description: 'Call and message history'
        }
      ]
    },
    {
      title: 'Sales Management',
      icon: TrendingUp,
      isCollapsible: true,
      isOpen: isSalesOpen,
      setIsOpen: setIsSalesOpen,
      color: 'text-green-600',
      children: [
        {
          title: 'Sales Pipeline',
          icon: BarChart3,
          path: '/sales/pipeline',
          description: 'Track sales opportunities'
        },
        {
          title: 'Quotations',
          icon: FileText,
          path: '/sales/quotes',
          description: 'Manage price quotes'
        },
        {
          title: 'Orders & Invoices',
          icon: DollarSign,
          path: '/sales/orders',
          description: 'Order and billing management'
        },
        {
          title: 'Sales Performance',
          icon: Activity,
          path: '/sales/performance',
          description: 'Sales team analytics'
        }
      ]
    },
    {
      title: 'Service Management',
      icon: Wrench,
      isCollapsible: true,
      isOpen: isServiceOpen,
      setIsOpen: setIsServiceOpen,
      color: 'text-orange-600',
      children: [
        {
          title: 'Service Appointments',
          icon: Calendar,
          path: '/service/appointments',
          description: 'Schedule and manage service bookings'
        },
        {
          title: 'Service History',
          icon: ClipboardList,
          path: '/service/history',
          description: 'Customer service records'
        },
        {
          title: 'Maintenance Reminders',
          icon: Clock,
          path: '/service/reminders',
          description: 'Automated maintenance alerts'
        },
        {
          title: 'Service Packages',
          icon: CheckCircle,
          path: '/service/packages',
          description: 'Service plans and packages'
        },
        {
          title: 'Customer Feedback',
          icon: Mail,
          path: '/service/feedback',
          description: 'Service satisfaction surveys'
        }
      ]
    },
    {
      title: 'Workshop Management',
      icon: Building,
      isCollapsible: true,
      isOpen: isWorkshopOpen,
      setIsOpen: setIsWorkshopOpen,
      color: 'text-red-600',
      children: [
        {
          title: 'Work Orders',
          icon: ClipboardList,
          path: '/workshop/orders',
          description: 'Manage repair work orders'
        },
        {
          title: 'Technician Schedule',
          icon: Users,
          path: '/workshop/technicians',
          description: 'Staff scheduling and assignments'
        },
        {
          title: 'Parts Inventory',
          icon: Car,
          path: '/workshop/parts',
          description: 'Spare parts management'
        },
        {
          title: 'Quality Control',
          icon: CheckCircle,
          path: '/workshop/quality',
          description: 'Service quality assurance'
        },
        {
          title: 'Workshop Analytics',
          icon: BarChart3,
          path: '/workshop/analytics',
          description: 'Workshop performance metrics'
        }
      ]
    },
    {
      title: 'Digital Signage',
      icon: Monitor,
      isCollapsible: true,
      isOpen: isDigitalOpen,
      setIsOpen: setIsDigitalOpen,
      color: 'text-cyan-600',
      children: [
        {
          title: 'Display Management',
          icon: Tv,
          path: '/digital/displays',
          description: 'Manage digital screens'
        },
        {
          title: 'Content Library',
          icon: FileText,
          path: '/digital/content',
          description: 'Media and promotional content'
        },
        {
          title: 'Scheduling',
          icon: Calendar,
          path: '/digital/schedule',
          description: 'Content scheduling and playlists'
        },
        {
          title: 'Location Mapping',
          icon: MapPin,
          path: '/digital/locations',
          description: 'Screen location management'
        },
        {
          title: 'Performance Analytics',
          icon: Activity,
          path: '/digital/analytics',
          description: 'Engagement and display metrics'
        }
      ]
    },
    {
      title: 'Inventory',
      icon: Car,
      path: '/inventory',
      color: 'text-amber-600'
    },
    {
      title: 'Reports & Analytics',
      icon: PieChart,
      isCollapsible: true,
      isOpen: isReportsOpen,
      setIsOpen: setIsReportsOpen,
      color: 'text-purple-600',
      children: [
        {
          title: 'Sales Reports',
          icon: BarChart3,
          path: '/reports/sales',
          description: 'Sales performance reports'
        },
        {
          title: 'Lead Analytics',
          icon: TrendingUp,
          path: '/reports/leads',
          description: 'Lead conversion analytics'
        },
        {
          title: 'Service Reports',
          icon: Wrench,
          path: '/reports/service',
          description: 'Service department analytics'
        },
        {
          title: 'Workshop Reports',
          icon: Building,
          path: '/reports/workshop',
          description: 'Workshop efficiency reports'
        },
        {
          title: 'Customer Insights',
          icon: Users,
          path: '/reports/customers',
          description: 'Customer behavior analysis'
        }
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      path: '/settings',
      color: 'text-gray-600'
    }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-6">
          <img 
            src="/drivepass-logo.png" 
            alt="DrivePass Logo" 
            className="h-8 w-auto"
            onError={(e) => {
              // Fallback to text logo if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold" style={{ backgroundColor: '#1A91E2' }}>
              D
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item, index) => (
            <div key={index}>
              {item.isCollapsible ? (
                <Collapsible open={item.isOpen} onOpenChange={item.setIsOpen}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-3 h-auto hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-5 w-5 ${item.color}`} />
                          <span className="font-sora font-medium text-gray-700">{item.title}</span>
                        </div>
                        {item.isOpen ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 ml-4 mt-1">
                    {item.children?.map((child, childIndex) => (
                      <Button
                        key={childIndex}
                        variant="ghost"
                        className={`w-full justify-start p-2 h-auto text-left hover:bg-gray-50 ${
                          isActive(child.path) ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600'
                        }`}
                        onClick={() => handleNavigation(child.path)}
                      >
                        <div className="flex items-start gap-3">
                          <child.icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-sora font-medium text-sm">{child.title}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{child.description}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Button
                  variant="ghost"
                  className={`w-full justify-start p-3 h-auto hover:bg-gray-50 ${
                    isActive(item.path) ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-700'
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                    <span className="font-sora font-medium">{item.title}</span>
                  </div>
                </Button>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}