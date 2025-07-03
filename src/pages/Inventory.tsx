import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingDown, TrendingUp, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import AnimatedRoute from '@/components/ui/AnimatedRoute';

const Inventory = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      sku: 'WH-001',
      quantity: 45,
      minStock: 20,
      price: 99.99,
      status: 'in_stock',
      lastUpdated: '2 hours ago'
    },
    {
      id: 2,
      name: 'Smartphone Case',
      sku: 'SC-002',
      quantity: 8,
      minStock: 15,
      price: 24.99,
      status: 'low_stock',
      lastUpdated: '1 day ago'
    },
    {
      id: 3,
      name: 'USB Cable',
      sku: 'UC-003',
      quantity: 0,
      minStock: 50,
      price: 12.99,
      status: 'out_of_stock',
      lastUpdated: '3 days ago'
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      sku: 'BS-004',
      quantity: 120,
      minStock: 30,
      price: 79.99,
      status: 'in_stock',
      lastUpdated: '1 hour ago'
    }
  ]);

  const filteredInventory = searchQuery
    ? inventory.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : inventory;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_stock': return 'bg-green-100 text-green-800';
      case 'low_stock': return 'bg-yellow-100 text-yellow-800';
      case 'out_of_stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in_stock': return <TrendingUp className="h-4 w-4" />;
      case 'low_stock': return <AlertTriangle className="h-4 w-4" />;
      case 'out_of_stock': return <TrendingDown className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const handleAction = (action: string, itemId?: number) => {
    toast({
      title: `Inventory ${action}`,
      description: `Action completed successfully.`
    });
  };

  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const lowStockItems = inventory.filter(item => item.status === 'low_stock').length;
  const outOfStockItems = inventory.filter(item => item.status === 'out_of_stock').length;

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-1">Real-time inventory tracking and alerts</p>
          </div>
          <Button onClick={() => handleAction('Item Added')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{inventory.length}</p>
                </div>
                <Package className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">${totalValue.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-brand-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Low Stock</p>
                  <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                  <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search items..." 
                    className="pl-9 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" onClick={() => handleAction('Filtered')}>
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInventory.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <Package className="h-8 w-8 text-brand-600" />
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">SKU: {item.sku} • Updated: {item.lastUpdated}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="font-semibold">{item.quantity} units</p>
                      <p className="text-sm text-gray-600">Min: {item.minStock}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold">${item.price}</p>
                      <p className="text-sm text-gray-600">per unit</p>
                    </div>
                    
                    <Badge className={`${getStatusColor(item.status)} flex items-center gap-1`}>
                      {getStatusIcon(item.status)}
                      {item.status.replace('_', ' ')}
                    </Badge>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('Updated', item.id)}
                      >
                        Update
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAction('Reordered', item.id)}
                      >
                        Reorder
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedRoute>
  );
};

export default Inventory;