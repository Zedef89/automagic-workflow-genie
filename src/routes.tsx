
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
import AllAutomations from '@/pages/AllAutomations';
import SearchResults from '@/pages/SearchResults';
import EmailMarketing from '@/pages/EmailMarketing';
import Inventory from '@/pages/Inventory';
import SocialMedia from '@/pages/SocialMedia';
import NewAutomation from '@/pages/NewAutomation';

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
        path: 'automations',
        element: <AllAutomations />,
      },
      {
        path: 'search',
        element: <SearchResults />,
      },
      {
        path: 'email-marketing',
        element: <EmailMarketing />,
      },
      {
        path: 'inventory',
        element: <Inventory />,
      },
      {
        path: 'social-media',
        element: <SocialMedia />,
      },
      {
        path: 'new-automation',
        element: <NewAutomation />,
      },
      {
        path: '*',
        element: <NotFound />,
      }
    ],
  },
]);