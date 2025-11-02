import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Login from './pages/Login';
import Index from './pages/Index';
import Leads from './pages/Leads';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          {!isAuthenticated ? (
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          ) : (
            <div className="flex h-screen bg-gray-50">
              <Navigation onLogout={handleLogout} />
              <div className="flex-1 overflow-hidden">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/leads" element={<Leads />} />
                  
                  {/* CRM 360 Routes */}
                  <Route path="/leads/journey" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Lead Journey</h1><p className="text-gray-600 mt-2">Lead journey tracking coming soon...</p></div>} />
                  <Route path="/customers" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Customer Database</h1><p className="text-gray-600 mt-2">Customer management coming soon...</p></div>} />
                  <Route path="/follow-up" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Follow-up Tasks</h1><p className="text-gray-600 mt-2">Follow-up management coming soon...</p></div>} />
                  <Route path="/communications" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Communication Log</h1><p className="text-gray-600 mt-2">Communication tracking coming soon...</p></div>} />
                  
                  {/* Sales Management Routes */}
                  <Route path="/sales/pipeline" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Sales Pipeline</h1><p className="text-gray-600 mt-2">Sales pipeline management coming soon...</p></div>} />
                  <Route path="/sales/assigned-leads" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Assigned Leads</h1><p className="text-gray-600 mt-2">Assigned leads management coming soon...</p></div>} />
                  <Route path="/sales/quotes" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Quotations</h1><p className="text-gray-600 mt-2">Quote management coming soon...</p></div>} />
                  <Route path="/sales/orders" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Orders & Invoices</h1><p className="text-gray-600 mt-2">Order management coming soon...</p></div>} />
                  <Route path="/sales/performance" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Sales Performance</h1><p className="text-gray-600 mt-2">Performance analytics coming soon...</p></div>} />
                  
                  {/* Service Management Routes */}
                  <Route path="/service/appointments" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Service Appointments</h1><p className="text-gray-600 mt-2">Service booking management coming soon...</p></div>} />
                  <Route path="/service/history" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Service History</h1><p className="text-gray-600 mt-2">Service records tracking coming soon...</p></div>} />
                  <Route path="/service/reminders" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Maintenance Reminders</h1><p className="text-gray-600 mt-2">Automated maintenance alerts coming soon...</p></div>} />
                  <Route path="/service/packages" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Service Packages</h1><p className="text-gray-600 mt-2">Service plans management coming soon...</p></div>} />
                  <Route path="/service/feedback" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Customer Feedback</h1><p className="text-gray-600 mt-2">Service satisfaction surveys coming soon...</p></div>} />
                  
                  {/* Workshop Management Routes */}
                  <Route path="/workshop/orders" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Work Orders</h1><p className="text-gray-600 mt-2">Repair work order management coming soon...</p></div>} />
                  <Route path="/workshop/technicians" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Technician Schedule</h1><p className="text-gray-600 mt-2">Staff scheduling and assignments coming soon...</p></div>} />
                  <Route path="/workshop/parts" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Parts Inventory</h1><p className="text-gray-600 mt-2">Spare parts management coming soon...</p></div>} />
                  <Route path="/workshop/quality" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Quality Control</h1><p className="text-gray-600 mt-2">Service quality assurance coming soon...</p></div>} />
                  <Route path="/workshop/analytics" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Workshop Analytics</h1><p className="text-gray-600 mt-2">Workshop performance metrics coming soon...</p></div>} />
                  
                  {/* Digital Signage Routes */}
                  <Route path="/digital/displays" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Display Management</h1><p className="text-gray-600 mt-2">Digital screen management coming soon...</p></div>} />
                  <Route path="/digital/content" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Content Library</h1><p className="text-gray-600 mt-2">Media and promotional content coming soon...</p></div>} />
                  <Route path="/digital/schedule" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Content Scheduling</h1><p className="text-gray-600 mt-2">Content scheduling and playlists coming soon...</p></div>} />
                  <Route path="/digital/locations" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Location Mapping</h1><p className="text-gray-600 mt-2">Screen location management coming soon...</p></div>} />
                  <Route path="/digital/analytics" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Digital Signage Analytics</h1><p className="text-gray-600 mt-2">Engagement and display metrics coming soon...</p></div>} />
                  
                  {/* Other Routes */}
                  <Route path="/inventory" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Inventory Management</h1><p className="text-gray-600 mt-2">Inventory tracking coming soon...</p></div>} />
                  
                  {/* Reports Routes */}
                  <Route path="/reports/sales" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Sales Reports</h1><p className="text-gray-600 mt-2">Sales reporting coming soon...</p></div>} />
                  <Route path="/reports/leads" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Lead Analytics</h1><p className="text-gray-600 mt-2">Lead analytics coming soon...</p></div>} />
                  <Route path="/reports/service" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Service Reports</h1><p className="text-gray-600 mt-2">Service department analytics coming soon...</p></div>} />
                  <Route path="/reports/workshop" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Workshop Reports</h1><p className="text-gray-600 mt-2">Workshop efficiency reports coming soon...</p></div>} />
                  <Route path="/reports/customers" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Customer Insights</h1><p className="text-gray-600 mt-2">Customer insights coming soon...</p></div>} />
                  
                  <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold font-sora">Settings</h1><p className="text-gray-600 mt-2">System settings coming soon...</p></div>} />
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          )}
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;