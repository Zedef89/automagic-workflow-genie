
import React, { useState } from 'react';
import { Bell, Settings, X, Circle, CheckCircle, AlertCircle, InfoIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
}

const NotificationsPopover = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: 1, 
      title: 'New automation created', 
      message: 'Facebook Ads Weekly Report has been created successfully.',
      time: '2 min ago',
      type: 'success',
      read: false 
    },
    { 
      id: 2, 
      title: 'API connection issue', 
      message: 'We detected an issue with your OpenAI API connection.',
      time: '1 hour ago',
      type: 'error',
      read: false 
    },
    { 
      id: 3, 
      title: 'Automation completed', 
      message: 'Customer Support AI has processed 24 new conversations.',
      time: '3 hours ago',
      type: 'info',
      read: true 
    },
    { 
      id: 4, 
      title: 'Weekly report', 
      message: 'Your weekly performance report is now available.',
      time: '1 day ago',
      type: 'info',
      read: true 
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'info':
      default:
        return <InfoIcon className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-gray-100"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[380px] p-0" 
        align="end"
        side="bottom"
      >
        <div className="flex items-center justify-between border-b border-gray-100 p-4">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full grid grid-cols-3 p-0 h-12 bg-transparent">
            <TabsTrigger value="all" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-brand-600 data-[state=active]:shadow-none rounded-none">
              All
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-brand-600 data-[state=active]:shadow-none rounded-none">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="read" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-brand-600 data-[state=active]:shadow-none rounded-none">
              Read
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="m-0 max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No notifications
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "p-4 hover:bg-gray-50",
                      !notification.read && "bg-brand-50"
                    )}
                  >
                    <div className="flex items-start">
                      <div className="mr-3 mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                      <div className="flex ml-2">
                        {!notification.read && (
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Circle className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-500" 
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="unread" className="m-0 max-h-[400px] overflow-y-auto">
            {notifications.filter(n => !n.read).length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No unread notifications
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications
                  .filter(notification => !notification.read)
                  .map((notification) => (
                    <div 
                      key={notification.id}
                      className="p-4 hover:bg-gray-50 bg-brand-50"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        <div className="flex ml-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8" 
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Circle className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500" 
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="read" className="m-0 max-h-[400px] overflow-y-auto">
            {notifications.filter(n => n.read).length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No read notifications
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {notifications
                  .filter(notification => notification.read)
                  .map((notification) => (
                    <div 
                      key={notification.id}
                      className="p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        <div className="flex ml-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500" 
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="border-t border-gray-100 p-2">
          <Button variant="ghost" className="w-full text-sm">
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
