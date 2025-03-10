
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import FacebookAds from "./pages/FacebookAds";
import CustomerSupport from "./pages/CustomerSupport";
import DataAnalysis from "./pages/DataAnalysis";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

const queryClient = new QueryClient();

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Helper function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
            
            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
              <Navbar toggleSidebar={toggleSidebar} />
              
              <main className="flex-1 pt-16">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/facebook-ads" element={<FacebookAds />} />
                  <Route path="/customer-support" element={<CustomerSupport />} />
                  <Route path="/data-analysis" element={<DataAnalysis />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
