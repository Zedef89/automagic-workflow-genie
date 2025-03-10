
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, BarChart2, MessageSquare, Zap, Settings, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AnimatedRoute from '@/components/ui/AnimatedRoute';

interface SearchResult {
  id: string;
  title: string;
  type: 'automation' | 'template' | 'setting' | 'document';
  description: string;
  path: string;
  icon: React.ReactNode;
}

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to search backend
    setLoading(true);
    
    // Simulate loading delay
    const timer = setTimeout(() => {
      // Mock search results
      const mockResults: SearchResult[] = [
        {
          id: '1',
          title: 'Facebook Ads Campaign',
          type: 'automation',
          description: 'Automated Facebook ad campaign for summer promotion',
          path: '/facebook-ads',
          icon: <BarChart2 className="h-5 w-5 text-brand-600" />
        },
        {
          id: '2',
          title: 'Customer Support AI Bot',
          type: 'automation',
          description: 'AI-powered customer service automation',
          path: '/customer-support',
          icon: <MessageSquare className="h-5 w-5 text-brand-600" />
        },
        {
          id: '3',
          title: 'Sales Data Analysis',
          type: 'automation',
          description: 'Weekly sales data analysis and reporting',
          path: '/data-analysis',
          icon: <Zap className="h-5 w-5 text-brand-600" />
        },
        {
          id: '4',
          title: 'E-commerce Performance Template',
          type: 'template',
          description: 'Ready-to-use template for e-commerce analytics',
          path: '/templates/ecommerce',
          icon: <FileText className="h-5 w-5 text-brand-600" />
        },
        {
          id: '5',
          title: 'API Connection Settings',
          type: 'setting',
          description: 'Configure your API connections and security preferences',
          path: '/settings',
          icon: <Settings className="h-5 w-5 text-brand-600" />
        }
      ];

      // Filter results based on query
      const filteredResults = query
        ? mockResults.filter(
            result => result.title.toLowerCase().includes(query.toLowerCase()) || 
                     result.description.toLowerCase().includes(query.toLowerCase())
          )
        : mockResults;

      setResults(filteredResults);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the URL with new search query
    const url = new URL(window.location.href);
    url.searchParams.set('q', searchQuery);
    window.history.pushState({}, '', url.toString());
    
    // Trigger the search effect
    // This would trigger the useEffect if we were using a state-based query value
    window.location.search = `?q=${encodeURIComponent(searchQuery)}`;
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
            <p className="text-gray-600 mt-1">
              {results.length} results found for "{query}"
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="mt-4 md:mt-0 flex w-full md:w-96">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search again..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" className="ml-2">Search</Button>
          </form>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Results</TabsTrigger>
            <TabsTrigger value="automations">Automations</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-60">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {result.icon}
                          <span className="ml-2 text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">
                            {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                          </span>
                        </div>
                      </div>
                      <CardTitle className="text-lg mt-2">{result.title}</CardTitle>
                      <CardDescription>{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm">
                        <a href={result.path}>View {result.type}</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">No results found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search terms or browse our automations.
                </p>
                <Button className="mt-4" asChild>
                  <a href="/dashboard">Browse Automations</a>
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="automations">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results
                .filter(result => result.type === 'automation')
                .map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {result.icon}
                      </div>
                      <CardTitle className="text-lg mt-2">{result.title}</CardTitle>
                      <CardDescription>{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm">
                        <a href={result.path}>View automation</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          {/* Similar content for templates and settings tabs */}
          <TabsContent value="templates">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results
                .filter(result => result.type === 'template')
                .map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {result.icon}
                      </div>
                      <CardTitle className="text-lg mt-2">{result.title}</CardTitle>
                      <CardDescription>{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm">
                        <a href={result.path}>View template</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results
                .filter(result => result.type === 'setting')
                .map((result) => (
                  <Card key={result.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        {result.icon}
                      </div>
                      <CardTitle className="text-lg mt-2">{result.title}</CardTitle>
                      <CardDescription>{result.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button asChild variant="outline" size="sm">
                        <a href={result.path}>View setting</a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default SearchResults;
