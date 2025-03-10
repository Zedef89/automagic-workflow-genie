
import React from 'react';
import { MessageSquare, User, Bot, PlusCircle, Settings, RefreshCw, SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatCard from '@/components/dashboard/StatCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const CustomerSupport = () => {
  // Mock data
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

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Support</h1>
            <p className="text-gray-600 mt-1">Manage customer inquiries with AI-powered assistance</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure AI
            </Button>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Conversation
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
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

        <Tabs defaultValue="chat" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="chat">Live Chat</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">AI Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Conversations List */}
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
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${conversation.id === 1 ? 'bg-brand-50' : ''}`}
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
              
              {/* Chat Window */}
              <Card className="md:col-span-2 border-gray-100 flex flex-col h-[600px]">
                <CardHeader className="border-b border-gray-100 flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">John Doe</CardTitle>
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
                <div className="p-4 border-t border-gray-100 flex gap-2">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button size="icon">
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Conversation History</CardTitle>
                <CardDescription>
                  View and search through past customer conversations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 w-full flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
                  <p className="text-gray-500">Conversation history will appear here</p>
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
                        <Button variant="outline" size="sm">Professional</Button>
                        <Button size="sm">Friendly</Button>
                        <Button variant="outline" size="sm">Casual</Button>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium mb-1">Response Length</h3>
                      <p className="text-sm text-gray-600 mb-2">Control how detailed AI responses should be</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Concise</Button>
                        <Button size="sm">Balanced</Button>
                        <Button variant="outline" size="sm">Detailed</Button>
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
                      <Button>Configure Rules</Button>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                      <h3 className="text-sm font-medium mb-1">Human Support Hours</h3>
                      <p className="text-sm text-gray-600 mb-2">Define when human support agents are available</p>
                      <Button variant="outline">Set Hours</Button>
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

// Fixed: Need to define Search component
const Search = MessageSquare;

export default CustomerSupport;
