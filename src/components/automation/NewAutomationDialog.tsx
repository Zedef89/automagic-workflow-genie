
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BarChart2, MessageSquare, Cpu, PlusCircle } from 'lucide-react';

interface AutomationType {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface NewAutomationDialogProps {
  trigger?: React.ReactNode;
  onCreateAutomation?: (name: string, type: string) => void;
}

const NewAutomationDialog: React.FC<NewAutomationDialogProps> = ({ 
  trigger,
  onCreateAutomation = () => {}
}) => {
  const [open, setOpen] = useState(false);
  const [automationName, setAutomationName] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const automationTypes: AutomationType[] = [
    {
      id: 'facebook-ads',
      name: 'Facebook Ads Automation',
      description: 'Create and manage automated Facebook advertising campaigns',
      icon: <BarChart2 className="h-12 w-12 text-brand-600 mb-2" />
    },
    {
      id: 'customer-support',
      name: 'AI Customer Support',
      description: 'Deploy an AI assistant to handle customer inquiries',
      icon: <MessageSquare className="h-12 w-12 text-brand-600 mb-2" />
    },
    {
      id: 'data-analysis',
      name: 'Data Analysis',
      description: 'Automated analysis and reporting on your business data',
      icon: <Cpu className="h-12 w-12 text-brand-600 mb-2" />
    }
  ];

  const handleCreate = () => {
    if (automationName && selectedType) {
      onCreateAutomation(automationName, selectedType);
      setOpen(false);
      setAutomationName('');
      setSelectedType(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            New Automation
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Automation</DialogTitle>
          <DialogDescription>
            Select the type of automation you want to create and provide a name
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="automation-name">Automation Name</Label>
            <Input
              id="automation-name"
              value={automationName}
              onChange={(e) => setAutomationName(e.target.value)}
              placeholder="My New Automation"
            />
          </div>
          
          <div>
            <Label className="mb-3 block">Automation Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {automationTypes.map((type) => (
                <div
                  key={type.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md flex flex-col items-center text-center ${
                    selectedType === type.id ? 'border-brand-600 bg-brand-50' : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  {type.icon}
                  <h3 className="font-medium mb-1">{type.name}</h3>
                  <p className="text-sm text-gray-500">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            disabled={!automationName || !selectedType}
          >
            Create Automation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewAutomationDialog;
