import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  Users, 
  UserCheck, 
  Kanban, 
  Calendar, 
  Clock, 
  MessageSquare,
  Handshake,
  FileText,
  Car,
  Shield,
  Bell,
  Megaphone,
  User,
  Gift,
  TrendingUp,
  RefreshCw,
  CreditCard,
  ChevronDown,
  ChevronRight,
  Wrench,
  CalendarCheck,
  Settings,
  Monitor,
  BarChart3,
  PieChart,
  LineChart,
  HelpCircle
} from 'lucide-react';

const navigation = [
  {
    name: 'CRM 360',
    items: [
      { name: 'Lead Management', href: '/leads', icon: Users },
      { name: 'Pipeline View', href: '/pipeline', icon: Kanban },
      { name: 'Test Drive Calendar', href: '/test-drives', icon: Calendar },
      { name: 'Prospect Timeline', href: '/prospect-timeline', icon: Clock },
      { name: 'Communication Panel', href: '/communication', icon: MessageSquare },
      { name: 'Deal Room', href: '/deal-room', icon: Handshake },
      { name: 'Offer Comparison', href: '/offers', icon: FileText },
      { name: 'Documents & Contracts', href: '/documents', icon: FileText },
      { name: 'Vehicle Profiles', href: '/vehicles/1', icon: Car },
      { name: 'Warranty & Insurance', href: '/warranty-insurance', icon: Shield },
      { name: 'Service Reminders', href: '/service-reminders', icon: Bell },
    ]
  },
  {
    name: 'Service Management',
    items: [
      { name: 'Service Bookings', href: '/service-bookings', icon: CalendarCheck },
      { name: 'Yard Management', href: '/yard-management', icon: Settings },
    ]
  },
  {
    name: 'Workshop Management',
    items: [
      { name: 'Workshop Management', href: '/workshop-management', icon: Wrench },
    ]
  },
  {
    name: 'Digital Signage',
    items: [
      { name: 'Digital Signage', href: '/digital-signage', icon: Monitor },
    ]
  },
  {
    name: 'Reports & Analytics',
    items: [
      { name: 'Sales Reports', href: '/reports/sales', icon: BarChart3 },
      { name: 'Service Analytics', href: '/reports/service', icon: PieChart },
      { name: 'Performance Dashboard', href: '/reports/performance', icon: LineChart },
    ]
  },
  {
    name: 'Customer Engagement',
    items: [
      { name: 'Campaign Automation', href: '/campaigns', icon: Megaphone },
      { name: 'Customer 360', href: '/customer-360', icon: User },
      { name: 'Rewards & Loyalty', href: '/rewards', icon: Gift },
      { name: 'Upgrade Pipeline', href: '/upgrades', icon: TrendingUp },
      { name: 'Part Exchange', href: '/part-exchange', icon: RefreshCw },
      { name: 'Subscription Manager', href: '/subscriptions', icon: CreditCard },
    ]
  },
  {
    name: 'Help Centre',
    items: [
      { name: 'Help Centre', href: '/help-centre', icon: HelpCircle },
    ]
  }
];

export default function Sidebar() {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['CRM 360']);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-center mb-4">
          <img 
            src="/drivepass-logo.png" 
            alt="DrivePass" 
            className="h-12 w-auto"
          />
        </div>
      </div>
      
      <nav className="px-3 pb-4">
        {navigation.map((section) => {
          const isExpanded = expandedSections.includes(section.name);
          
          return (
            <div key={section.name} className="mb-2">
              <button
                onClick={() => toggleSection(section.name)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                <span className="uppercase tracking-wider whitespace-nowrap">{section.name}</span>
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3 flex-shrink-0" />
                ) : (
                  <ChevronRight className="h-3 w-3 flex-shrink-0" />
                )}
              </button>
              
              {isExpanded && (
                <div className="mt-1 space-y-1 pl-3">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href;
                    
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          'group flex items-center px-3 py-2 text-xs font-medium rounded-md transition-colors',
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        )}
                      >
                        <Icon
                          className={cn(
                            'mr-2 h-3 w-3 flex-shrink-0',
                            isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                          )}
                        />
                        <span className="whitespace-nowrap text-ellipsis overflow-hidden">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}