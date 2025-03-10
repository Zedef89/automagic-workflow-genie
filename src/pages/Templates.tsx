
import React, { useState } from 'react';
import { FileCode, Download, Copy, Star, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { useToast } from '@/hooks/use-toast';

const Templates = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const templates = [
    {
      id: 1,
      name: 'Facebook Ad Campaign',
      description: 'Template for creating and monitoring Facebook ad campaigns',
      category: 'Marketing',
      popularity: 'Popular',
      lastUpdated: '2 days ago'
    },
    {
      id: 2,
      name: 'Customer Support Chatbot',
      description: 'AI-powered customer support chatbot with escalation workflow',
      category: 'Support',
      popularity: 'Featured',
      lastUpdated: '1 week ago'
    },
    {
      id: 3,
      name: 'Weekly Sales Report',
      description: 'Automated weekly sales report with AI insights',
      category: 'Analytics',
      popularity: 'New',
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      name: 'Email Marketing Sequence',
      description: 'Automated email marketing sequence with analytics',
      category: 'Marketing',
      popularity: 'Popular',
      lastUpdated: '5 days ago'
    }
  ];

  const filteredTemplates = searchQuery 
    ? templates.filter(template => 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : templates;

  const handleUseTemplate = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    toast({
      title: "Template Selected",
      description: `${template?.name} has been selected. You can now customize it.`,
    });
  };

  const handleCreateTemplate = () => {
    toast({
      title: "Create Template",
      description: "Starting new template creation...",
    });
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
            <p className="text-gray-600 mt-1">Browse and use pre-built automation templates</p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={handleCreateTemplate}>
            <Plus className="h-4 w-4 mr-2" />
            Create Template
          </Button>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search templates..." 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="border border-gray-100 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="p-2 rounded-md bg-brand-50">
                    <FileCode className="h-6 w-6 text-brand-600" />
                  </div>
                  <Badge variant={
                    template.popularity === 'Featured' ? 'default' : 
                    template.popularity === 'Popular' ? 'secondary' : 
                    'outline'
                  }>
                    {template.popularity}
                  </Badge>
                </div>
                <CardTitle className="mt-2">{template.name}</CardTitle>
                <CardDescription className="text-sm">{template.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-gray-100 pt-4">
                <div className="text-xs text-gray-500">Updated {template.lastUpdated}</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => {
                    toast({
                      title: "Template Copied",
                      description: `${template.name} has been copied to your templates.`,
                    });
                  }}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => {
                    toast({
                      title: "Template Saved",
                      description: `${template.name} has been saved to favorites.`,
                    });
                  }}>
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => handleUseTemplate(template.id)}>Use</Button>
                </div>
              </CardFooter>
            </Card>
          ))}

          <Card className="border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center p-6 h-[260px]">
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 font-medium">Create New Template</p>
            <p className="text-gray-500 text-sm text-center max-w-[200px] mb-4">Build and save your own custom automation templates</p>
            <Button variant="outline" onClick={handleCreateTemplate}>
              Create Template
            </Button>
          </Card>
        </div>
      </div>
    </AnimatedRoute>
  );
};

// Fixed: Need to define Search component
const Search = FileCode;

export default Templates;
