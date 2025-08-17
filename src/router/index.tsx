import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout';
import { DefaultLayout } from '@/layouts/DefaultLayout';
import { Home } from '@/pages/Home';

import { pageRoutes } from './routes/pageRoutes';

const routes = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        element: <DefaultLayout />,
        children: [...pageRoutes],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
