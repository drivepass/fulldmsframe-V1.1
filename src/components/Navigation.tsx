import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Wrench, 
  Monitor, 
  Package, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  LogOut,
  Car,
  UserPlus,
  Route,
  MessageSquare,
  Phone,
  DollarSign,
  FileText,
  ShoppingCart,
  Target,
  Clock,
  History,
  Bell,
  Gift,
  MessageCircle,
  ClipboardList,
  UserCheck,
  Boxes,
  CheckCircle,
  PieChart,
  Tv,
  Image,
  MapPin,
  Activity,
  FileBarChart,
  BarChart,
  TrendingDown,
  UserSearch,
  Database
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface NavigationProps {
  onLogout: () => void;
}

export default function Navigation({ onLogout }: NavigationProps) {
  const location = useLocation();
  // Make sure both CRM and Sales sections are expanded by default
  const [expandedSections, setExpandedSections] = useState<string[]>(['crm', 'sales']);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      id: 'crm',
      title: 'CRM 360',
      icon: Users,
      items: [
        { title: 'Lead Management', path: '/leads', icon: UserPlus },
        { title: 'Lead Journey', path: '/leads/journey', icon: Route },
        { title: 'Customer Database', path: '/customers', icon: Database },
        { title: 'Follow-up Tasks', path: '/follow-up', icon: Clock },
        { title: 'Communication Log', path: '/communications', icon: MessageSquare }
      ]
    },
    {
      id: 'sales',
      title: 'Sales Management',
      icon: TrendingUp,
      items: [
        { title: 'Sales Pipeline', path: '/sales/pipeline', icon: DollarSign },
        { title: 'Assigned Leads', path: '/sales/assigned-leads', icon: UserCheck },
        { title: 'Quotations', path: '/sales/quotes', icon: FileText },
        { title: 'Orders & Invoices', path: '/sales/orders', icon: ShoppingCart },
        { title: 'Sales Performance', path: '/sales/performance', icon: Target }
      ]
    },
    {
      id: 'service',
      title: 'Service Management',
      icon: Calendar,
      items: [
        { title: 'Service Appointments', path: '/service/appointments', icon: Calendar },
        { title: 'Service History', path: '/service/history', icon: History },
        { title: 'Maintenance Reminders', path: '/service/reminders', icon: Bell },
        { title: 'Service Packages', path: '/service/packages', icon: Gift },
        { title: 'Customer Feedback', path: '/service/feedback', icon: MessageCircle }
      ]
    },
    {
      id: 'workshop',
      title: 'Workshop Management',
      icon: Wrench,
      items: [
        { title: 'Work Orders', path: '/workshop/orders', icon: ClipboardList },
        { title: 'Technician Schedule', path: '/workshop/technicians', icon: UserCheck },
        { title: 'Parts Inventory', path: '/workshop/parts', icon: Boxes },
        { title: 'Quality Control', path: '/workshop/quality', icon: CheckCircle },
        { title: 'Workshop Analytics', path: '/workshop/analytics', icon: PieChart }
      ]
    },
    {
      id: 'digital',
      title: 'Digital Signage',
      icon: Monitor,
      items: [
        { title: 'Display Management', path: '/digital/displays', icon: Tv },
        { title: 'Content Library', path: '/digital/content', icon: Image },
        { title: 'Content Scheduling', path: '/digital/schedule', icon: Calendar },
        { title: 'Location Mapping', path: '/digital/locations', icon: MapPin },
        { title: 'Digital Signage Analytics', path: '/digital/analytics', icon: Activity }
      ]
    },
    {
      id: 'inventory',
      title: 'Inventory Management',
      icon: Package,
      path: '/inventory'
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: BarChart3,
      items: [
        { title: 'Sales Reports', path: '/reports/sales', icon: FileBarChart },
        { title: 'Lead Analytics', path: '/reports/leads', icon: BarChart },
        { title: 'Service Reports', path: '/reports/service', icon: TrendingDown },
        { title: 'Workshop Reports', path: '/reports/workshop', icon: Wrench },
        { title: 'Customer Insights', path: '/reports/customers', icon: UserSearch }
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      path: '/settings'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <img 
            src="/assets/drivepass-logo.png" 
            alt="DrivePass" 
            className="h-8 w-auto"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-8 h-8 rounded flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: '#1A91E2' }}>
            <Car className="h-4 w-4" />
          </div>
          <div>
            <h1 className="font-bold text-lg font-sora" style={{ color: '#1A91E2' }}>DrivePass</h1>
            <p className="text-xs text-gray-500">CRM 360</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {/* Dashboard */}
          <Link to="/">
            <Button
              variant="ghost"
              className={`w-full justify-start h-9 px-3 font-medium ${
                isActive('/')
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-3" />
              <span className="text-sm">Dashboard</span>
            </Button>
          </Link>

          <Separator className="my-3" />

          {navigationItems.map((section) => (
            <div key={section.id}>
              {section.items ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-between h-9 px-3 font-medium text-gray-700 hover:bg-gray-100"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="h-4 w-4" />
                      <span className="text-sm">{section.title}</span>
                    </div>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                  {expandedSections.includes(section.id) && (
                    <div className="ml-6 space-y-1 mt-1">
                      {section.items.map((item) => (
                        <Link key={item.path} to={item.path}>
                          <Button
                            variant="ghost"
                            className={`w-full justify-start h-8 px-3 text-sm ${
                              isActive(item.path)
                                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <item.icon className="h-3.5 w-3.5 mr-3" />
                            {item.title}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link to={section.path!}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start h-9 px-3 font-medium ${
                      isActive(section.path!)
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <section.icon className="h-4 w-4 mr-3" />
                    <span className="text-sm">{section.title}</span>
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start h-9 px-3 text-gray-600 hover:bg-gray-100"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span className="text-sm">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}