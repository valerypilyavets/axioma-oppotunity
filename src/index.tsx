import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

import { CreateAccount } from './features/create-account/CreateAccount';
import { PlateScanner } from './features/plate-scanner/PlateScanner';
import { Report } from './features/report/Report';
import { TopUp } from './features/top-up/TopUp';

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/scan-plate',
        element: <PlateScanner />,
      },
      {
        path: '/create-account',
        element: <CreateAccount />,
      },
      {
        path: '/top-up',
        element: <TopUp />,
      },
      {
        path: '/report',
        element: <Report />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
