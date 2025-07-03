import React, { useState } from 'react';
import { ArrowLeft, Zap, MessageSquare, BarChart2, Mail, Package, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AnimatedRoute from '@/components/ui/AnimatedRoute';

const NewAutomation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [automationName, setAutomationName] = useState('');
  const [automationDescription, setAutomationDescription] = useState('');

  const automationTemplates = [
    {
      id: 'facebook-ads',
      name: 'Facebook Ads Automation',
      description: 'Automate Facebook ad campaigns, reporting, and optimization',
      icon: <BarChart2 className="h-8 w-8 text-brand-600" />,
      path: '/facebook-ads',
      category: 'Marketing'
    },
    {
      id: 'customer-support',
      name: 'AI Customer Support',
      description: 'Automated customer support with AI chatbot responses',
      icon: <MessageSquare className="h-8 w-8 text-brand-600" />,
      path: '/customer-support',
      category: 'Support'
    },
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      description: 'Automated business data analysis and insights generation',
      icon: <Zap className="h-8 w-8 text-brand-600" />,
      path: '/data-analysis',
      category: 'Analytics'
    },
    {
      id: 'email-marketing',
      name: 'Email Marketing',
      description: 'Automated email campaigns and sequences',
      icon: <Mail className="h-8 w-8 text-brand-600" />,
      path: '/email-marketing',
      category: 'Marketing'
    },
    {
      id: 'inventory',
      name: 'Inventory Management',
      description: 'Real-time inventory tracking and alerts',
      icon: <Package className="h-8 w-8 text-brand-600" />,
      path: '/inventory',
      category: 'Operations'
    },
    {
      id: 'social-media',
      name: 'Social Media Monitoring',
      description: 'Track brand mentions and sentiment across platforms',
      icon: <Users className="h-8 w-8 text-brand-600" />,
      path: '/social-media',
      category: 'Marketing'
    }
  ];

  const handleCreateAutomation = () => {
    if (!selectedTemplate) {
      toast({
        title: 'Template Required',
        description: 'Please select an automation template to continue.',
        variant: 'destructive'
      });
      return;
    }

    const template = automationTemplates.find(t => t.id === selectedTemplate);
    if (template) {
      toast({
        title: 'Automation Created',
        description: `${template.name} automation has been created successfully!`
      });
      
      // Navigate to the specific automation page
      setTimeout(() => {
        navigate(template.path);
      }, 1000);
    }
  };

  const handleCustomAutomation = () => {
    if (!automationName.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter a name for your custom automation.',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Custom Automation Created',
      description: `${automationName} has been created successfully!`
    });
    
    setTimeout(() => {
      navigate('/all-automations');
    }, 1000);
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Automation</h1>
            <p className="text-gray-600 mt-1">Choose a template or create a custom automation workflow</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Choose Template</CardTitle>
                <CardDescription>Select from pre-built automation templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {automationTemplates.map((template) => (
                    <div 
                      key={template.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-brand-300 ${
                        selectedTemplate === template.id ? 'border-brand-500 bg-brand-50' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className="flex items-start space-x-3">
                        {template.icon}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {template.category}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  onClick={handleCreateAutomation}
                  disabled={!selectedTemplate}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create from Template
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Custom Automation</CardTitle>
                <CardDescription>Create a custom automation from scratch</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="automation-name">Automation Name</Label>
                  <Input 
                    id="automation-name"
                    placeholder="Enter automation name"
                    value={automationName}
                    onChange={(e) => setAutomationName(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="automation-description">Description</Label>
                  <Textarea 
                    id="automation-description"
                    placeholder="Describe what this automation will do"
                    value={automationDescription}
                    onChange={(e) => setAutomationDescription(e.target.value)}
                    rows={4}
                  />
                </div>
                
                <div className="pt-4">
                  <h4 className="font-medium text-gray-900 mb-3">Automation Type</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="h-auto p-4 flex-col">
                      <Zap className="h-6 w-6 mb-2" />
                      <span className="text-sm">Trigger-based</span>
                    </Button>
                    <Button variant="outline" className="h-auto p-4 flex-col">
                      <BarChart2 className="h-6 w-6 mb-2" />
                      <span className="text-sm">Scheduled</span>
                    </Button>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleCustomAutomation}
                  disabled={!automationName.trim()}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Custom Automation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default NewAutomation;