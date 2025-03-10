import React, { useState } from 'react';
import { MessageSquare, User, Bot, PlusCircle, Settings, RefreshCw, SendHorizontal, Calendar, Filter, Bookmark, Star, CheckCircle2, History, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/dashboard/StatCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

const CustomerSupport = () => {
  const { toast } = useToast();
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [currentTab, setCurrentTab] = useState('chat');
  const [aiSettings, setAiSettings] = useState({
    personality: 'friendly',
    responseLength: 'balanced',
    autoEscalation: true
  });
  const [newMessage, setNewMessage] = useState('');

  const conversations = [
    {
      id: 1,
      customer: "John Doe",
      avatar: "/placeholder.svg",
      lastMessage: "How do I reset my password?",
      time: "2 min ago",
      unread: true
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      avatar: "/placeholder.svg",
      lastMessage: "Thanks for your help!",
      time: "1 hour ago",
      unread: false
    },
    {
      id: 3,
      customer: "Michael Brown",
      avatar: "/placeholder.svg",
      lastMessage: "I'd like to upgrade my plan",
      time: "3 hours ago",
      unread: true
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "customer",
      content: "Hi there! I'm having trouble with my account. I can't seem to log in.",
      time: "10:32 AM"
    },
    {
      id: 2,
      sender: "ai",
      content: "I'm sorry to hear that you're having trouble logging in. Let me help you with that. Could you please tell me what error message you're seeing when you try to log in?",
      time: "10:33 AM"
    },
    {
      id: 3,
      sender: "customer",
      content: "It says 'Invalid password'. But I'm sure I'm using the right password.",
      time: "10:35 AM"
    },
    {
      id: 4,
      sender: "ai",
      content: "I understand how frustrating that can be. Let's try to reset your password. Would you like me to send a password reset link to your registered email address?",
      time: "10:36 AM"
    }
  ];

  const conversationHistory = [
    {
      id: 101,
      customer: "Emma Wilson",
      status: "resolved",
      messages: 12,
      startDate: "2023-06-12",
      endDate: "2023-06-12",
      topic: "Billing issue"
    },
    {
      id: 102,
      customer: "James Anderson",
      status: "escalated",
      messages: 8,
      startDate: "2023-06-10",
      endDate: "2023-06-11",
      topic: "Product return"
    },
    {
      id: 103,
      customer: "Olivia Martinez",
      status: "resolved",
      messages: 5,
      startDate: "2023-06-08",
      endDate: "2023-06-08",
      topic: "Account access"
    }
  ];

  const stats = [
    {
      title: 'Total Conversations',
      value: '247',
      change: { value: '12%', positive: true },
      icon: <MessageSquare className="h-5 w-5 text-brand-600" />
    },
    {
      title: 'AI Resolution Rate',
      value: '76%',
      change: { value: '5%', positive: true },
      icon: <Bot className="h-5 w-5 text-brand-600" />
    },
    {
      title: 'Avg. Response Time',
      value: '1.2 min',
      change: { value: '30s', positive: true },
      icon: <User className="h-5 w-5 text-brand-600" />
    }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent.",
    });
    
    setNewMessage('');
  };

  const handleConfigureAI = () => {
    toast({
      title: "AI Configured",
      description: "AI settings have been updated successfully.",
    });
  };

  const handleNewConversation = () => {
    toast({
      title: "New Conversation",
      description: "A new conversation has been started.",
    });
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
            <p className="text-gray-600 mt-1">Manage customer inquiries with AI-powered assistance</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure AI
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h3 className="font-medium">Quick AI Settings</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">AI Personality</label>
                      <div className="flex gap-2">
                        <Button 
                          variant={aiSettings.personality === 'professional' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, personality: 'professional'})}
                        >
                          Pro
                        </Button>
                        <Button 
                          variant={aiSettings.personality === 'friendly' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, personality: 'friendly'})}
                        >
                          Friendly
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Response Length</label>
                      <div className="flex gap-2">
                        <Button 
                          variant={aiSettings.responseLength === 'concise' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, responseLength: 'concise'})}
                        >
                          Short
                        </Button>
                        <Button 
                          variant={aiSettings.responseLength === 'balanced' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, responseLength: 'balanced'})}
                        >
                          Medium
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Auto-Escalation</label>
                      <Switch 
                        checked={aiSettings.autoEscalation} 
                        onCheckedChange={(checked) => setAiSettings({...aiSettings, autoEscalation: checked})}
                      />
                    </div>
                  </div>
                  
                  <Button className="w-full" onClick={handleConfigureAI}>
                    Save Settings
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            <Button onClick={handleNewConversation}>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Conversation
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={stat.icon}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>

        <Tabs defaultValue="chat" className="mb-8" onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">AI Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 border-gray-100">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Conversations</CardTitle>
                    <Button variant="ghost" size="icon">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Input placeholder="Search conversations..." className="pl-8" />
                    <Search className="h-4 w-4 absolute left-2.5 top-3 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-gray-100">
                    {conversations.map((conversation) => (
                      <div 
                        key={conversation.id} 
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${conversation.id === activeConversationId ? 'bg-brand-50' : ''}`}
                        onClick={() => setActiveConversationId(conversation.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={conversation.avatar} alt={conversation.customer} />
                            <AvatarFallback>{conversation.customer.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm truncate">{conversation.customer}</p>
                              <span className="text-xs text-gray-500">{conversation.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                          </div>
                          {conversation.unread && (
                            <div className="h-2 w-2 rounded-full bg-brand-500 flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2 border-gray-100 flex flex-col h-[600px]">
                <CardHeader className="border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt={conversations.find(c => c.id === activeConversationId)?.customer || "Customer"} />
                      <AvatarFallback>
                        {(conversations.find(c => c.id === activeConversationId)?.customer || "C").charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{conversations.find(c => c.id === activeConversationId)?.customer || "Customer"}</CardTitle>
                      <CardDescription>Active now</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] ${
                          message.sender === 'customer' 
                            ? 'bg-gray-100 text-gray-900' 
                            : 'bg-brand-500 text-white'
                          } rounded-2xl p-3 px-4`}>
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">{message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 flex gap-2">
                  <Input 
                    placeholder="Type your message..." 
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <Button type="submit" size="icon">
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Conversation History</CardTitle>
                  <CardDescription>
                    View and search through past customer conversations
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Date Range
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="py-3 px-4 text-left font-medium">Customer</th>
                          <th className="py-3 px-4 text-left font-medium">Topic</th>
                          <th className="py-3 px-4 text-left font-medium">Status</th>
                          <th className="py-3 px-4 text-left font-medium">Date</th>
                          <th className="py-3 px-4 text-left font-medium">Messages</th>
                          <th className="py-3 px-4 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {conversationHistory.map((conversation) => (
                          <tr key={conversation.id} className="hover:bg-gray-50">
                            <td className="py-3 px-4">{conversation.customer}</td>
                            <td className="py-3 px-4">{conversation.topic}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                {conversation.status === 'resolved' ? (
                                  <Badge variant="secondary" className="bg-green-100 text-green-800 flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" />
                                    resolved
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-amber-100 text-amber-800 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    escalated
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">{conversation.startDate}</td>
                            <td className="py-3 px-4">{conversation.messages}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm">
                                  <History className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Star className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Configuration</CardTitle>
                  <CardDescription>
                    Customize how the AI assistant responds to customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">AI Personality</h3>
                      <p className="text-sm text-gray-600 mb-2">Set the tone and style of AI responses</p>
                      <div className="flex gap-2">
                        <Button 
                          variant={aiSettings.personality === 'professional' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, personality: 'professional'})}
                        >
                          Professional
                        </Button>
                        <Button 
                          variant={aiSettings.personality === 'friendly' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, personality: 'friendly'})}
                        >
                          Friendly
                        </Button>
                        <Button 
                          variant={aiSettings.personality === 'casual' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, personality: 'casual'})}
                        >
                          Casual
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium mb-1">Response Length</h3>
                      <p className="text-sm text-gray-600 mb-2">Control how detailed AI responses should be</p>
                      <div className="flex gap-2">
                        <Button 
                          variant={aiSettings.responseLength === 'concise' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, responseLength: 'concise'})}
                        >
                          Concise
                        </Button>
                        <Button 
                          variant={aiSettings.responseLength === 'balanced' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, responseLength: 'balanced'})}
                        >
                          Balanced
                        </Button>
                        <Button 
                          variant={aiSettings.responseLength === 'detailed' ? 'default' : 'outline'} 
                          size="sm"
                          onClick={() => setAiSettings({...aiSettings, responseLength: 'detailed'})}
                        >
                          Detailed
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Human Handoff</CardTitle>
                  <CardDescription>
                    Configure when the AI should escalate to human support
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-1">Auto-Escalation</h3>
                      <p className="text-sm text-gray-600 mb-2">Set conditions for automatic escalation to human agents</p>
                      <div className="flex items-center justify-between py-2">
                        <label className="text-sm">Enable auto-escalation</label>
                        <Switch 
                          checked={aiSettings.autoEscalation} 
                          onCheckedChange={(checked) => setAiSettings({...aiSettings, autoEscalation: checked})}
                        />
                      </div>
                      <Button onClick={handleConfigureAI}>Configure Rules</Button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium mb-1">Human Support Hours</h3>
                      <p className="text-sm text-gray-600 mb-2">Define when human support agents are available</p>
                      <div className="bg-gray-50 p-3 rounded-md text-sm mb-2">
                        <p><span className="font-medium">Current hours:</span> Monday-Friday, 9:00 AM - 5:00 PM ET</p>
                      </div>
                      <Button variant="outline" onClick={() => {
                        toast({
                          title: "Hours Updated",
                          description: "Support hours have been updated.",
                        });
                      }}>Set Hours</Button>
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

const Search = MessageSquare;

export default CustomerSupport;
