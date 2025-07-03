
import React, { useState } from 'react';
import { LifeBuoy, Book, MessageCircle, Mail, Phone, FileQuestion, ExternalLink, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AnimatedRoute from '@/components/ui/AnimatedRoute';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const helpCategories = [
    {
      id: 'getting-started',
      icon: <Book className="h-5 w-5 text-brand-600" />,
      title: 'Getting Started',
      description: 'Learn the basics of using the platform'
    },
    {
      id: 'automation',
      icon: <FileQuestion className="h-5 w-5 text-brand-600" />,
      title: 'Automation Help',
      description: 'Guidance on creating and managing automations'
    },
    {
      id: 'integrations',
      icon: <ExternalLink className="h-5 w-5 text-brand-600" />,
      title: 'Integrations',
      description: 'Help with connecting to external services'
    }
  ];

  const faqs = [
    {
      question: 'How do I create my first automation?',
      answer: 'To create your first automation, go to the Dashboard and click on the "New Automation" button. Follow the step-by-step wizard to select your automation type and configure your settings.'
    },
    {
      question: 'Can I connect multiple data sources?',
      answer: 'Yes, you can connect multiple data sources to your automations. Go to the "API Connections" page to add and manage your data source connections.'
    },
    {
      question: 'How do I share my automations with my team?',
      answer: 'You can share your automations with team members by going to the automation details page and clicking on the "Share" button. From there, you can invite team members by email.'
    },
    {
      question: 'Is there a limit to how many automations I can create?',
      answer: 'The number of automations you can create depends on your subscription plan. Check your account settings to see your current limits and upgrade options.'
    },
    {
      question: 'How do I upgrade my subscription?',
      answer: 'To upgrade your subscription, go to Settings > Billing and select the plan that best fits your needs. You can also contact our sales team for custom enterprise plans.'
    }
  ];

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-1">Find answers to your questions and get assistance</p>
        </div>

        <div className="mb-8 relative">
          <Input 
            placeholder="Search for help topics..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        <Tabs defaultValue="help-center" className="space-y-8">
          <TabsList className="mb-6">
            <TabsTrigger value="help-center">Help Center</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
            <TabsTrigger value="contact">Contact Support</TabsTrigger>
          </TabsList>
          
          <TabsContent value="help-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {helpCategories.map((category) => (
                <Card key={category.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <div>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>{category.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-2">
                        <Badge variant="outline">Guide</Badge>
                        <span className="text-sm">Quick Start Guide</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline">Video</Badge>
                        <span className="text-sm">Tutorial Videos</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge variant="outline">Doc</Badge>
                        <span className="text-sm">Documentation</span>
                      </li>
                    </ul>
                    <Button variant="ghost" className="w-full mt-4">View All Resources</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Popular Topics</CardTitle>
                <CardDescription>Find quick answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FileQuestion className="h-4 w-4 mr-2 text-brand-600" />
                    <span>Getting Started Guide</span>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FileQuestion className="h-4 w-4 mr-2 text-brand-600" />
                    <span>Connecting Data Sources</span>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FileQuestion className="h-4 w-4 mr-2 text-brand-600" />
                    <span>AI Configuration</span>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FileQuestion className="h-4 w-4 mr-2 text-brand-600" />
                    <span>Custom Automations</span>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FileQuestion className="h-4 w-4 mr-2 text-brand-600" />
                    <span>Account Management</span>
                  </Button>
                  <Button variant="outline" className="justify-start h-auto py-3">
                    <FileQuestion className="h-4 w-4 mr-2 text-brand-600" />
                    <span>Billing & Pricing</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faqs">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to common questions about using the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600">{faq.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Reach out to our support team for assistance</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                      <Input id="subject" placeholder="Help with..." />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                      <textarea 
                        id="message" 
                        rows={4} 
                        className="w-full rounded-md border border-gray-300 p-2"
                        placeholder="Describe your issue in detail..."
                      ></textarea>
                    </div>
                    <Button type="submit" className="w-full">Submit Request</Button>
                  </form>
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Support Options</CardTitle>
                    <CardDescription>Other ways to get help</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-brand-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-gray-600">support@automatex.com</p>
                        <p className="text-sm text-gray-600">Response time: 24-48 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <MessageCircle className="h-5 w-5 text-brand-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-gray-600">Available Monday - Friday</p>
                        <p className="text-sm text-gray-600">9:00 AM - 5:00 PM ET</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-brand-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Phone Support</p>
                        <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                        <p className="text-sm text-gray-600">Premium plans only</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Community Support</CardTitle>
                    <CardDescription>Connect with other users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full mb-3">
                      <LifeBuoy className="h-4 w-4 mr-2" />
                      Visit Community Forum
                    </Button>
                    <p className="text-sm text-gray-600">
                      Join our community of users to share tips, ask questions, and learn from others.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AnimatedRoute>
  );
};

export default Help;
