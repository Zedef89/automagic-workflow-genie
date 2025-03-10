
import React from 'react';
import { FileSpreadsheet, Database, BarChart2, Zap, Download, RefreshCw, PlusCircle, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConnectButton from '@/components/dashboard/ConnectButton';

const DataAnalysis = () => {
  // Mock data
  const dataReports = [
    { 
      id: 1, 
      name: 'Weekly Sales Analysis', 
      created: 'Sep 20, 2023', 
      type: 'Automatic',
      status: 'Generated'
    },
    { 
      id: 2, 
      name: 'Monthly Performance Report', 
      created: 'Sep 15, 2023', 
      type: 'Automatic',
      status: 'Generated'
    },
    { 
      id: 3, 
      name: 'Customer Acquisition Cost', 
      created: 'Sep 10, 2023', 
      type: 'Manual',
      status: 'Generated'
    }
  ];

  const dataConnections = [
    {
      name: 'Google Sheets',
      icon: <FileSpreadsheet className="h-4 w-4 text-green-600" />,
      connected: true
    },
    {
      name: 'PostgreSQL Database',
      icon: <Database className="h-4 w-4 text-blue-600" />,
      connected: false
    },
    {
      name: 'Airtable',
      icon: <FileSpreadsheet className="h-4 w-4 text-teal-600" />,
      connected: true
    }
  ];

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Data Analysis</h1>
            <p className="text-gray-600 mt-1">Connect data sources and generate AI-powered insights</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button>
              <Zap className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="reports" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="connections">Data Connections</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports">
            <div className="grid grid-cols-1 gap-6">
              {/* Reports Table */}
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <CardTitle>Data Reports</CardTitle>
                    <CardDescription>
                      View and manage your generated data reports
                    </CardDescription>
                  </div>
                  <Button className="mt-4 sm:mt-0">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    New Report
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm border-b border-gray-200">
                          <th className="pb-3 font-medium text-gray-500">Report Name</th>
                          <th className="pb-3 font-medium text-gray-500">Created</th>
                          <th className="pb-3 font-medium text-gray-500">Type</th>
                          <th className="pb-3 font-medium text-gray-500">Status</th>
                          <th className="pb-3 font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataReports.map((report) => (
                          <tr key={report.id} className="border-b border-gray-100 text-sm">
                            <td className="py-4 font-medium">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-brand-600" />
                                {report.name}
                              </div>
                            </td>
                            <td className="py-4">{report.created}</td>
                            <td className="py-4">{report.type}</td>
                            <td className="py-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                {report.status}
                              </span>
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm">View</Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
              
              {/* Report Templates */}
              <Card>
                <CardHeader>
                  <CardTitle>Report Templates</CardTitle>
                  <CardDescription>
                    Start with pre-built templates or create your own
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <BarChart2 className="h-5 w-5 mr-3 text-brand-600" />
                      <div className="text-left">
                        <p className="font-medium">Sales Performance</p>
                        <p className="text-xs text-gray-500">Analysis of sales data over time</p>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <Zap className="h-5 w-5 mr-3 text-brand-600" />
                      <div className="text-left">
                        <p className="font-medium">Marketing ROI</p>
                        <p className="text-xs text-gray-500">Calculate return on marketing investment</p>
                      </div>
                    </Button>
                    
                    <Button variant="outline" className="h-auto py-4 justify-start">
                      <PlusCircle className="h-5 w-5 mr-3 text-brand-600" />
                      <div className="text-left">
                        <p className="font-medium">Custom Report</p>
                        <p className="text-xs text-gray-500">Create a custom report template</p>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="connections">
            <Card>
              <CardHeader>
                <CardTitle>Data Sources</CardTitle>
                <CardDescription>
                  Connect to external data sources to power your reports and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-w-xl">
                  {dataConnections.map((connection, index) => (
                    <ConnectButton 
                      key={index}
                      service={connection.name}
                      icon={connection.icon}
                      isConnected={connection.connected}
                    />
                  ))}
                  
                  <Button variant="outline" className="mt-4 w-full justify-start gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Add Data Source
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI-Generated Insights</CardTitle>
                  <CardDescription>
                    Let AI analyze your data and provide actionable insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-brand-50 rounded-lg border border-brand-100">
                      <div className="flex items-start">
                        <Zap className="h-5 w-5 text-brand-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-brand-800 mb-1">Sales Trend Detected</h3>
                          <p className="text-sm text-brand-700">
                            Your sales have increased by 23% in the last month, primarily driven by the new product line. Consider increasing inventory for these items.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <div className="flex items-start">
                        <Zap className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-amber-800 mb-1">Customer Retention Alert</h3>
                          <p className="text-sm text-amber-700">
                            Customer churn rate has increased to 5.2% this quarter. Consider implementing a retention campaign for at-risk customers.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">Generate More Insights</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Insight Settings</CardTitle>
                  <CardDescription>
                    Configure how AI generates insights from your data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Insight Focus Areas</h3>
                      <p className="text-sm text-gray-600 mb-2">Select which aspects of your business to focus on</p>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm">Sales</Button>
                        <Button variant="outline" size="sm">Marketing</Button>
                        <Button variant="outline" size="sm">Customer Retention</Button>
                        <Button variant="outline" size="sm">Inventory</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium mb-1">Insight Frequency</h3>
                      <p className="text-sm text-gray-600 mb-2">How often should AI generate new insights</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Daily</Button>
                        <Button size="sm">Weekly</Button>
                        <Button variant="outline" size="sm">Monthly</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium mb-1">Email Reports</h3>
                      <p className="text-sm text-gray-600 mb-2">Receive insights via email</p>
                      <Button variant="outline">Configure Email Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default DataAnalysis;
