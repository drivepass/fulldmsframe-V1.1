import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  TrendingUp, 
  Wrench, 
  Monitor, 
  Package, 
  BarChart3, 
  Settings, 
  ChevronDown, 
  ChevronRight,
  UserPlus,
  Route,
  MessageSquare,
  Clock,
  PieChart,
  FileText,
  ShoppingCart,
  Calendar,
  History,
  Bell,
  Gift,
  Star,
  ClipboardList,
  UserCheck,
  Boxes,
  Shield,
  Activity,
  Tv,
  Image,
  MapPin,
  LogOut,
  Target,
  Award
} from 'lucide-react';

interface NavigationProps {
  onLogout: () => void;
}

export default function Navigation({ onLogout }: NavigationProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    crm: true,
    sales: true,
    service: false,
    workshop: false,
    digital: false,
    reports: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      id: 'crm',
      title: 'CRM 360',
      icon: Users,
      expanded: expandedSections.crm,
      items: [
        { path: '/leads', label: 'Lead Management', icon: UserPlus },
        { path: '/leads/journey', label: 'Lead Journey', icon: Route },
        { path: '/customers', label: 'Customer Database', icon: Users },
        { path: '/follow-up', label: 'Follow-up Tasks', icon: Clock },
        { path: '/communications', label: 'Communication Log', icon: MessageSquare }
      ]
    },
    {
      id: 'sales',
      title: 'Sales Management',
      icon: TrendingUp,
      expanded: expandedSections.sales,
      items: [
        { path: '/sales/pipeline', label: 'Sales Pipeline', icon: Target },
        { path: '/sales/assigned-leads', label: 'Assigned Leads', icon: UserCheck },
        { path: '/sales/quotes', label: 'Quotations', icon: FileText },
        { path: '/sales/orders', label: 'Orders & Invoices', icon: ShoppingCart },
        { path: '/sales/performance', label: 'Sales Performance', icon: Award }
      ]
    },
    {
      id: 'service',
      title: 'Service Management',
      icon: Wrench,
      expanded: expandedSections.service,
      items: [
        { path: '/service/appointments', label: 'Service Appointments', icon: Calendar },
        { path: '/service/history', label: 'Service History', icon: History },
        { path: '/service/reminders', label: 'Maintenance Reminders', icon: Bell },
        { path: '/service/packages', label: 'Service Packages', icon: Gift },
        { path: '/service/feedback', label: 'Customer Feedback', icon: Star }
      ]
    },
    {
      id: 'workshop',
      title: 'Workshop Management',
      icon: Settings,
      expanded: expandedSections.workshop,
      items: [
        { path: '/workshop/orders', label: 'Work Orders', icon: ClipboardList },
        { path: '/workshop/technicians', label: 'Technician Schedule', icon: UserCheck },
        { path: '/workshop/parts', label: 'Parts Inventory', icon: Boxes },
        { path: '/workshop/quality', label: 'Quality Control', icon: Shield },
        { path: '/workshop/analytics', label: 'Workshop Analytics', icon: Activity }
      ]
    },
    {
      id: 'digital',
      title: 'Digital Signage',
      icon: Monitor,
      expanded: expandedSections.digital,
      items: [
        { path: '/digital/displays', label: 'Display Management', icon: Tv },
        { path: '/digital/content', label: 'Content Library', icon: Image },
        { path: '/digital/schedule', label: 'Content Scheduling', icon: Calendar },
        { path: '/digital/locations', label: 'Location Mapping', icon: MapPin },
        { path: '/digital/analytics', label: 'Digital Signage Analytics', icon: BarChart3 }
      ]
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      icon: BarChart3,
      expanded: expandedSections.reports,
      items: [
        { path: '/reports/sales', label: 'Sales Reports', icon: TrendingUp },
        { path: '/reports/leads', label: 'Lead Analytics', icon: Users },
        { path: '/reports/service', label: 'Service Reports', icon: Wrench },
        { path: '/reports/workshop', label: 'Workshop Reports', icon: Settings },
        { path: '/reports/customers', label: 'Customer Insights', icon: Users }
      ]
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
          <div className="hidden w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: '#1A91E2' }}>
            DP
          </div>
          <div>
            <h1 className="font-bold text-lg font-sora" style={{ color: '#1A91E2' }}>DrivePass</h1>
            <p className="text-xs text-gray-500">CRM 360</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-2">
          {/* Dashboard */}
          <Link to="/">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              className="w-full justify-start gap-3 h-10"
              style={isActive('/') ? { backgroundColor: '#1A91E2' } : {}}
            >
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">Dashboard</span>
            </Button>
          </Link>

          <Separator className="my-3" />

          {/* Navigation Sections */}
          {navigationItems.map((section) => (
            <div key={section.id} className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-between h-10 px-3"
                onClick={() => toggleSection(section.id as keyof typeof expandedSections)}
              >
                <div className="flex items-center gap-3">
                  <section.icon className="h-4 w-4" />
                  <span className="font-medium font-sora">{section.title}</span>
                </div>
                {section.expanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>

              {section.expanded && (
                <div className="ml-4 space-y-1">
                  {section.items.map((item) => (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={isActive(item.path) ? 'default' : 'ghost'}
                        className="w-full justify-start gap-3 h-9 text-sm"
                        style={isActive(item.path) ? { backgroundColor: '#1A91E2' } : {}}
                      >
                        <item.icon className="h-3.5 w-3.5" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Separator className="my-3" />

          {/* Inventory */}
          <Link to="/inventory">
            <Button
              variant={isActive('/inventory') ? 'default' : 'ghost'}
              className="w-full justify-start gap-3 h-10"
              style={isActive('/inventory') ? { backgroundColor: '#1A91E2' } : {}}
            >
              <Package className="h-4 w-4" />
              <span className="font-medium">Inventory</span>
            </Button>
          </Link>

          {/* Settings */}
          <Link to="/settings">
            <Button
              variant={isActive('/settings') ? 'default' : 'ghost'}
              className="w-full justify-start gap-3 h-10"
              style={isActive('/settings') ? { backgroundColor: '#1A91E2' } : {}}
            >
              <Settings className="h-4 w-4" />
              <span className="font-medium">Settings</span>
            </Button>
          </Link>
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 h-10 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          <span className="font-medium">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}