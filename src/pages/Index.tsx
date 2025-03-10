
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, BarChart2, MessageSquare, ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Facebook Ads Automation',
      description: 'Automate the creation, monitoring, and optimization of Facebook ad campaigns.',
      icon: <BarChart2 className="h-6 w-6 text-brand-600" />,
      delay: 100
    },
    {
      title: 'AI Customer Support',
      description: 'Improve response times with an AI-powered chatbot that handles customer inquiries.',
      icon: <MessageSquare className="h-6 w-6 text-brand-600" />,
      delay: 200
    },
    {
      title: 'Business Data Analysis',
      description: 'Get real-time insights and automated reports from your business data.',
      icon: <Zap className="h-6 w-6 text-brand-600" />,
      delay: 300
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500 leading-tight">
            Automate Your Business<br />With Powerful AI
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            A complete automation platform to streamline your business workflows, 
            increase efficiency, and drive growth with AI-powered solutions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="px-8 text-md font-medium rounded-full shadow-md shadow-brand-200/50 hover:shadow-lg transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 text-md font-medium rounded-full"
            >
              View Demo
            </Button>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Powerful Automation Features</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers a suite of tools to automate repetitive tasks and provide valuable insights.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-8 flex flex-col items-center text-center animate-fade-in-up"
              style={{ animationDelay: `${feature.delay}ms` }}
            >
              <div className="h-16 w-16 rounded-full bg-brand-50 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto glass rounded-2xl overflow-hidden">
          <div className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Start automating your workflows today and see the difference it makes in your efficiency and growth.
            </p>
            <Button 
              size="lg"
              className="px-8 text-md font-medium rounded-full shadow-md shadow-brand-200/50 hover:shadow-lg transition-all duration-300"
              onClick={() => navigate('/dashboard')}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        <p>&copy; 2023 AutomateX. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;
