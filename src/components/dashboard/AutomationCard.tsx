
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AutomationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'inactive' | 'paused';
  lastRun?: string;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const AutomationCard: React.FC<AutomationCardProps> = ({
  title,
  description,
  icon,
  status,
  lastRun,
  className,
  onClick,
  style
}) => {
  const statusColors = {
    active: "bg-green-50 text-green-700 border-green-200",
    inactive: "bg-gray-50 text-gray-700 border-gray-200",
    paused: "bg-amber-50 text-amber-700 border-amber-200"
  };

  const statusLabels = {
    active: "Active",
    inactive: "Inactive",
    paused: "Paused"
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden card-hover border border-gray-100 shadow-sm transition-all duration-300",
        className
      )}
      onClick={onClick}
      style={style}
    >
      <CardHeader className="p-5 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-brand-50 flex items-center justify-center">
            {icon}
          </div>
          <Badge variant="outline" className={cn("px-2 py-0.5", statusColors[status])}>
            {statusLabels[status]}
          </Badge>
        </div>
        <CardTitle className="text-lg font-semibold mt-3">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </CardContent>
      {lastRun && (
        <CardFooter className="px-5 py-3 border-t border-gray-100 text-xs text-gray-500">
          Last run: {lastRun}
        </CardFooter>
      )}
    </Card>
  );
};

export default AutomationCard;
