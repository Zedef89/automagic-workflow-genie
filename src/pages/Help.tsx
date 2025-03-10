
import React, { useState } from 'react';
import { 
  HelpCircle, Search, BookOpen, MessageCircle, FileText, 
  ExternalLink, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AnimatedRoute from '@/components/ui/AnimatedRoute';

const Help = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How do I create a new automation?",
      answer: "To create a new automation, navigate to the Dashboard and click on the 'Create Automation' button. Follow the step-by-step guide to set up your automation workflow. You can also use pre-built templates from the Templates section."
    },
    {
      question: "How do I connect my Facebook Ads account?",
      answer: "Go to Settings > API Integrations tab, find the Facebook Ads API card and click 'Configure'. You'll be guided through the authentication process to connect your Facebook account and grant the necessary permissions."
    },
    {
      question: "Can I customize the AI responses for customer support?",
      answer: "Yes! In the Customer Support section, navigate to the 'AI Settings' tab where you can customize the AI's personality, response length, and configure when to escalate to human support."
    },
    {
      question: "How do I export generated reports?",
      answer: "When viewing a report in the Data Analysis section, look for the Export button in the top-right corner. You can export reports as PDF, CSV, or schedule them to be automatically sent via email."
    },
    {
      question: "Is my data secure?",
      answer: "We take security seriously. All your data is encrypted both in transit and at rest. We use industry-standard security practices and regular security audits. For more details, please check our Security & Privacy policy."
    }
  ];

  const resources = [
    {
      title: "Getting Started Guide",
      description: "A comprehensive guide to help you get started with AutomateX",
      icon: <BookOpen className="h-10 w-10 text-brand-600" />,
      link: "#"
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step video tutorials for common automation workflows",
      icon: <FileText className="h-10 w-10 text-brand-600" />,
      link: "#"
    },
    {
      title: "API Documentation",
      description: "Technical documentation for developers integrating with our API",
      icon: <FileText className="h-10 w-10 text-brand-600" />,
      link: "#"
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <AnimatedRoute>
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-1">Find answers to your questions and get help</p>
        </div>

        <div className="mb-8">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              placeholder="Search for help topics..." 
              className="pl-10 py-6 text-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-brand-600" />
                Documentation
              </CardTitle>
              <CardDescription>Browse our documentation to learn more</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-between">
                Read Documentation
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2 text-brand-600" />
                Contact Support
              </CardTitle>
              <CardDescription>Get help from our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-between">
                Contact Support
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-brand-600" />
                Community
              </CardTitle>
              <CardDescription>Join our community forums</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-between">
                Visit Community
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-100 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleQuestion(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {openQuestion === index ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openQuestion === index && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="border border-gray-100">
                <CardHeader>
                  <div className="flex items-center">
                    {resource.icon}
                  </div>
                  <CardTitle className="mt-2">{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full justify-between">
                    View Resource
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AnimatedRoute>
  );
};

export default Help;
