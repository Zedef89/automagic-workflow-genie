
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import Dashboard from '@/pages/Dashboard';
import Templates from '@/pages/Templates';
import ApiConnections from '@/pages/ApiConnections';
import Help from '@/pages/Help';
import CustomerSupport from '@/pages/CustomerSupport';
import NotFound from '@/pages/NotFound';
import DataAnalysis from '@/pages/DataAnalysis';
import FacebookAds from '@/pages/FacebookAds';
import Settings from '@/pages/Settings';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'templates',
        element: <Templates />,
      },
      {
        path: 'api-connections',
        element: <ApiConnections />,
      },
      {
        path: 'customer-support',
        element: <CustomerSupport />,
      },
      {
        path: 'help',
        element: <Help />,
      },
      {
        path: 'data-analysis',
        element: <DataAnalysis />,
      },
      {
        path: 'facebook-ads',
        element: <FacebookAds />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  },
]);