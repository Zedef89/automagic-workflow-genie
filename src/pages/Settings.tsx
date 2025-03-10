import React, { useState } from 'react';
import { Shield, Bell, Database, UserCog, Globe, LifeBuoy, KeyRound, FileJson, Power } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { toast } = useToast();
  const [settingCategories, setSettingCategories] = useState([
    {
      id: 'account',
      name: 'Account Settings',
      icon: <UserCog className="h-5 w-5 text-brand-600" />,
      items: [
        { id: 'profile', name: 'Profile Information', description: 'Update your account profile information', enabled: true },
        { id: 'password', name: 'Password & Security', description: 'Manage your password and security preferences', enabled: true },
        { id: 'notifications', name: 'Notification Preferences', description: 'Control how you receive notifications', enabled: true }
      ]
    },
    {
      id: 'integrations',
      name: 'API Integrations',
      icon: <Globe className="h-5 w-5 text-brand-600" />,
      items: [
        { id: 'facebook', name: 'Facebook Ads API', description: 'Manage connection to Facebook Marketing API', enabled: true },
        { id: 'openai', name: 'OpenAI API', description: 'Configure access to OpenAI services for AI features', enabled: true },
        { id: 'airtable', name: 'Airtable', description: 'Manage Airtable integration for data storage', enabled: false }
      ]
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: <Shield className="h-5 w-5 text-brand-600" />,
      items: [
        { id: 'two-factor', name: 'Two-Factor Authentication', description: 'Add an extra layer of security to your account', enabled: false },
        { id: 'api-keys', name: 'API Keys', description: 'Manage your API keys for external access', enabled: true },
        { id: 'data-privacy', name: 'Data Privacy', description: 'Control how your data is stored and used', enabled: true }
      ]
    }
  ]);

  const toggleSetting = (categoryId: string, itemId: string) => {
    setSettingCategories(categories => 
      categories.map(category => 
        category.id === categoryId 
          ? {
              ...category,
              items: category.items.map(item => 
                item.id === itemId 
                  ? { ...item, enabled: !item.enabled }
                  : item
              )
            }
          : category
      )
    );

    const category = settingCategories.find(c => c.id === categoryId);
    const item = category?.items.find(i => i.id === itemId);

    if (item) {
      toast({
        title: item.enabled ? "Feature Disabled" : "Feature Enabled",
        description: `${item.name} has been ${item.enabled ? 'disabled' : 'enabled'}.`,
      });
    }
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
        </div>

        <Tabs defaultValue="account" className="space-y-4">
          <TabsList className="w-full flex overflow-x-auto hide-scrollbar justify-start space-x-2 md:space-x-4 p-1 bg-transparent">
            {settingCategories.map((category) => (
              <TabsTrigger 
                key={category.id}
                value={category.id}
                className="flex items-center space-x-2 px-4 py-2"
              >
                {category.icon}
                <span>{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {settingCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.items.map((item) => (
                  <Card key={item.id} className="border border-gray-100 shadow-sm">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div>
                        <CardTitle className="text-xl font-semibold">{item.name}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Power className={`h-4 w-4 ${item.enabled ? 'text-green-500' : 'text-gray-300'}`} />
                        <Switch 
                          checked={item.enabled} 
                          onCheckedChange={() => toggleSetting(category.id, item.id)} 
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        disabled={!item.enabled}
                      >
                        Configure
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {category.id === 'integrations' && (
                <div className="mt-8">
                  <Card className="border border-dashed border-gray-200 bg-gray-50">
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold">Add New Integration</CardTitle>
                      <CardDescription>Connect to additional services and APIs</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-4">
                      <Button variant="outline" className="h-auto py-6 flex-col items-center">
                        <Database className="h-8 w-8 mb-2 text-gray-600" />
                        <span>PostgreSQL</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-6 flex-col items-center">
                        <Bell className="h-8 w-8 mb-2 text-gray-600" />
                        <span>Slack</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-6 flex-col items-center">
                        <FileJson className="h-8 w-8 mb-2 text-gray-600" />
                        <span>Google Sheets</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-6 flex-col items-center">
                        <LifeBuoy className="h-8 w-8 mb-2 text-gray-600" />
                        <span>Zendesk</span>
                      </Button>
                      <Button variant="outline" className="h-auto py-6 flex-col items-center">
                        <KeyRound className="h-8 w-8 mb-2 text-gray-600" />
                        <span>Custom API</span>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default Settings;
