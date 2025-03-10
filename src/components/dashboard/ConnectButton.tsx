
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConnectButtonProps {
  service: string;
  icon: React.ReactNode;
  isConnected?: boolean;
  isLoading?: boolean;
  className?: string;
  onClick?: () => void;
}

const ConnectButton: React.FC<ConnectButtonProps> = ({
  service,
  icon,
  isConnected = false,
  isLoading = false,
  className,
  onClick
}) => {
  return (
    <Button
      variant={isConnected ? "outline" : "default"}
      className={cn(
        "relative h-auto py-4 gap-3 w-full justify-start",
        isConnected && "border-green-200 bg-green-50 hover:bg-green-100 text-green-800",
        className
      )}
      onClick={onClick}
      disabled={isLoading}
    >
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm">
        {icon}
      </div>
      
      <div className="flex flex-col items-start">
        <span className="font-medium">{service}</span>
        <span className="text-xs opacity-70">
          {isConnected ? "Connected" : "Connect account"}
        </span>
      </div>
      
      {isLoading && (
        <Loader2 className="h-4 w-4 animate-spin absolute right-4" />
      )}
      
      {isConnected && (
        <div className="h-2 w-2 rounded-full bg-green-500 absolute right-4" />
      )}
    </Button>
  );
};

export default ConnectButton;
