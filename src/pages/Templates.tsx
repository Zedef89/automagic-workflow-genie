
import React, { useState } from 'react';
import { Star, StarIcon, Filter, PlusCircle, Download, Search, Share2, Copy, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All Templates',
    'Marketing',
    'Customer Support',
    'Data Analysis',
    'Social Media',
    'Utilities'
  ];

  const templates = [
    {
      id: 1,
      name: 'Facebook Ad Performance',
      description: 'Track and analyze Facebook advertising campaigns',
      category: 'Marketing',
      author: 'AutomateX',
      rating: 4.8,
      downloads: 1205,
      image: '/placeholder.svg',
      tags: ['facebook', 'ads', 'analytics'],
      featured: true
    },
    {
      id: 2,
      name: 'Customer Support Automation',
      description: 'Automatically respond to common customer inquiries',
      category: 'Customer Support',
      author: 'AutomateX',
      rating: 4.5,
      downloads: 987,
      image: '/placeholder.svg',
      tags: ['support', 'chat', 'ai']
    },
    {
      id: 3,
      name: 'Sales Dashboard',
      description: 'Comprehensive sales metrics and performance tracking',
      category: 'Data Analysis',
      author: 'Community',
      rating: 4.2,
      downloads: 756,
      image: '/placeholder.svg',
      tags: ['sales', 'dashboard', 'metrics']
    },
    {
      id: 4,
      name: 'Social Media Scheduler',
      description: 'Schedule and post content across multiple platforms',
      category: 'Social Media',
      author: 'AutomateX',
      rating: 4.7,
      downloads: 1543,
      image: '/placeholder.svg',
      tags: ['social', 'scheduling', 'content'],
      featured: true
    },
    {
      id: 5,
      name: 'Email Marketing Campaign',
      description: 'Create and analyze email marketing campaigns',
      category: 'Marketing',
      author: 'Community',
      rating: 4.3,
      downloads: 621,
      image: '/placeholder.svg',
      tags: ['email', 'marketing', 'campaign']
    },
    {
      id: 6,
      name: 'Data Visualization Suite',
      description: 'Advanced data visualization and reporting tools',
      category: 'Data Analysis',
      author: 'AutomateX',
      rating: 4.6,
      downloads: 842,
      image: '/placeholder.svg',
      tags: ['data', 'visualization', 'reporting']
    }
  ];

  const myTemplates = [
    {
      id: 101,
      name: 'Custom Support Bot',
      description: 'My customized support automation',
      category: 'Customer Support',
      created: '2023-06-15',
      lastUsed: '2 days ago',
      image: '/placeholder.svg'
    },
    {
      id: 102,
      name: 'Weekly Sales Report',
      description: 'Automated sales reporting',
      category: 'Data Analysis',
      created: '2023-05-22',
      lastUsed: '1 week ago',
      image: '/placeholder.svg'
    }
  ];

  const featuredTemplates = templates.filter(template => template.featured);

  const handleDownload = async (templateId: number) => {
    try {
      setIsLoading(true);
      setSelectedTemplate(templateId);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const template = templates.find(t => t.id === templateId);
      if (template) {
        toast({
          title: "Template Downloaded Successfully!",
          description: `${template.name} has been added to your templates and is ready to use.`,
        });
        
        // Navigate to the appropriate automation page based on template category
        switch(template.category.toLowerCase()) {
          case 'marketing':
            navigate('/facebook-ads');
            break;
          case 'customer support':
            navigate('/customer-support');
            break;
          case 'data analysis':
            navigate('/data-analysis');
            break;
          default:
            navigate('/automations');
        }
      }
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setSelectedTemplate(null);
    }
  };

  const handleTemplateClick = (template: any) => {
    toast({
      title: "Template Preview",
      description: `Viewing details for ${template.name}`,
    });
  };

  const handleFavoriteToggle = (templateId: number) => {
    const template = templates.find(t => t.id === templateId);
    toast({
      title: "Favorites Updated",
      description: `${template?.name} ${Math.random() > 0.5 ? 'added to' : 'removed from'} favorites.`,
    });
  };

  // Update the template card button to show loading state
  <Button 
    onClick={() => handleDownload(template.id)}
    disabled={isLoading && selectedTemplate === template.id}
  >
    {isLoading && selectedTemplate === template.id ? (
      <Loader2 className="h-4 w-4 animate-spin mr-2" />
    ) : (
      <Download className="h-4 w-4 mr-2" />
    )}
    Download
  </Button>

  const handleCreateTemplate = () => {
    toast({
      title: "Template Builder",
      description: "Opening template creation wizard...",
    });
    // Simulate navigation to template builder
    setTimeout(() => {
      navigate('/automations');
    }, 1000);
  };

  const handleCategoryFilter = (category: string) => {
    toast({
      title: "Filter Applied",
      description: `Showing templates for: ${category}`,
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
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button onClick={handleCreateTemplate}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Template
            </Button>
          </div>
        </div>

        <div className="mb-8 relative">
          <Input 
            placeholder="Search templates..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        <Tabs defaultValue="explore" className="space-y-8">
          <TabsList className="mb-6">
            <TabsTrigger value="explore">Explore</TabsTrigger>
            <TabsTrigger value="my-templates">My Templates</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="explore">
            {/* Categories */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category, index) => (
                <Button 
                  key={index} 
                  variant={index === 0 ? "default" : "outline"} 
                  size="sm"
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            
            {/* Featured Templates */}
            {featuredTemplates.length > 0 && (
              <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Featured Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredTemplates.map((template) => (
                    <Card key={template.id} className="overflow-hidden">
                      <div className="h-40 bg-gray-100 relative">
                        <img
                          src={template.image}
                          alt={template.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="bg-brand-500 text-white">
                            Featured
                          </Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{template.name}</CardTitle>
                            <CardDescription className="mt-1">
                              {template.description}
                            </CardDescription>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleFavoriteToggle(template.id)}
                          >
                            <Star className="h-5 w-5 text-yellow-400" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-1 mb-3">
                          {template.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="bg-gray-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 gap-4">
                          <span className="flex items-center">
                            <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                            {template.rating}
                          </span>
                          <span>{template.downloads} downloads</span>
                          <span>By {template.author}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => handleTemplateClick(template)}
                          >
                            Preview
                          </Button>
                          <Button 
                            variant="default" 
                            className="flex-1"
                            onClick={() => handleDownload(template.id)}
                            disabled={isLoading && selectedTemplate === template.id}
                          >
                            {isLoading && selectedTemplate === template.id ? (
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                              <Download className="h-4 w-4 mr-2" />
                            )}
                            Use Template
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* All Templates */}
            <h2 className="text-xl font-semibold mb-4">All Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id}>
                  <div className="h-32 bg-gray-100">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg cursor-pointer hover:text-brand-600" onClick={() => handleTemplateClick(template)}>{template.name}</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleFavoriteToggle(template.id)}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center text-sm text-gray-500 justify-between">
                      <Badge variant="outline">{template.category}</Badge>
                      <span className="flex items-center">
                        <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                        {template.rating}
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleTemplateClick(template)}
                      >
                        Preview
                      </Button>
                      <Button 
                        variant="default" 
                        className="flex-1"
                        onClick={() => handleDownload(template.id)}
                        disabled={isLoading && selectedTemplate === template.id}
                      >
                        {isLoading && selectedTemplate === template.id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Download className="h-4 w-4 mr-2" />
                        )}
                        Use
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="my-templates">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {myTemplates.map((template) => (
                <Card key={template.id}>
                  <div className="h-32 bg-gray-100">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Category:</span>
                        <span>{template.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Created:</span>
                        <span>{template.created}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Last used:</span>
                        <span>{template.lastUsed}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => toast({ title: "Template Shared", description: `${template.name} sharing link copied to clipboard.` })}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => toast({ title: "Template Duplicated", description: `${template.name} has been duplicated.` })}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleDownload(template.id)}
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Use
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Create New Template Card */}
              <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="flex flex-col items-center justify-center h-full py-12">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <PlusCircle className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Create New Template</h3>
                  <p className="text-gray-500 text-center mb-4">Build a custom automation template</p>
                  <Button onClick={handleCreateTemplate}>Get Started</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Bookmark className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Favorite Templates Yet</h3>
              <p className="text-gray-500 mb-4">Save templates you like by clicking the star icon</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  toast({ title: "Navigating", description: "Switching to template browser..." });
                  setTimeout(() => {
                    const exploreTab = document.querySelector('[data-value="explore"]') as HTMLElement;
                    exploreTab?.click();
                  }, 500);
                }}
              >
                Browse Templates
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default Templates;
