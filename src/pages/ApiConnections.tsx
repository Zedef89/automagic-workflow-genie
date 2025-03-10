
import React, { useState } from 'react';
import { Globe, Plus, RefreshCw, Check, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import ConnectButton from '@/components/dashboard/ConnectButton';
import { useToast } from '@/hooks/use-toast';

const ApiConnections = () => {
  const { toast } = useToast();
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newApiName, setNewApiName] = useState('');
  const [newApiUrl, setNewApiUrl] = useState('');
  
  const apiConnections = [
    {
      id: 1,
      name: 'Facebook Marketing API',
      status: 'connected',
      lastSync: '2 hours ago',
      icon: <Globe className="h-5 w-5 text-blue-600" />
    },
    {
      id: 2,
      name: 'OpenAI API',
      status: 'connected',
      lastSync: '1 day ago',
      icon: <Globe className="h-5 w-5 text-green-600" />
    },
    {
      id: 3,
      name: 'Airtable',
      status: 'disconnected',
      lastSync: 'Never',
      icon: <Globe className="h-5 w-5 text-gray-600" />
    }
  ];

  const handleAddApi = () => {
    if (!newApiName || !newApiUrl) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "API Added",
      description: `${newApiName} has been added successfully`,
    });

    setIsAddingNew(false);
    setNewApiName('');
    setNewApiUrl('');
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">API Connections</h1>
            <p className="text-gray-600 mt-1">Manage your external API integrations</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => setIsAddingNew(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Connection
          </Button>
        </div>

        {isAddingNew && (
          <Card className="mb-8 border border-gray-200">
            <CardHeader>
              <CardTitle>Add New API Connection</CardTitle>
              <CardDescription>Enter the details of the API you want to connect</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="api-name" className="text-sm font-medium">API Name</label>
                  <Input 
                    id="api-name" 
                    placeholder="e.g. Twitter API" 
                    value={newApiName}
                    onChange={(e) => setNewApiName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="api-url" className="text-sm font-medium">API URL or Endpoint</label>
                  <Input 
                    id="api-url" 
                    placeholder="https://api.example.com/v1" 
                    value={newApiUrl}
                    onChange={(e) => setNewApiUrl(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <Button onClick={handleAddApi}>
                    <Check className="h-4 w-4 mr-2" />
                    Add Connection
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {apiConnections.map((connection) => (
            <Card key={connection.id} className="border border-gray-100">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {connection.icon}
                    <CardTitle className="text-lg">{connection.name}</CardTitle>
                  </div>
                  <Switch 
                    checked={connection.status === 'connected'} 
                    onCheckedChange={() => {
                      toast({
                        title: connection.status === 'connected' ? "Disconnected" : "Connected",
                        description: `${connection.name} has been ${connection.status === 'connected' ? 'disconnected' : 'connected'} successfully`,
                      });
                    }} 
                  />
                </div>
                <CardDescription>
                  Status: <span className={connection.status === 'connected' ? "text-green-600" : "text-gray-600"}>
                    {connection.status === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500">Last synced: {connection.lastSync}</div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="w-full">
                    <Link2 className="h-4 w-4 mr-2" />
                    Test
                  </Button>
                  <Button size="sm" variant="outline" className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-6 h-[200px]">
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">Add New Connection</p>
            <Button variant="ghost" className="mt-2" onClick={() => setIsAddingNew(true)}>
              Connect API
            </Button>
          </Card>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default ApiConnections;
