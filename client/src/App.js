import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Import all components

import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFoud';


// Root Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username>Username</Username>
  },
  {
    path: '/register',
    element: <Register>Register routes</Register>
  },
  {
    path: '/Password',
    element: <Password>password routes</Password>
  },
  {
    path: '/Profile',
    element: <Profile>profile routes</Profile>
  },
  {
    path: '/Recovery',
    element: <Recovery>Recovery routes</Recovery>
  },
  {
    path: '/Reset',
    element: <Reset>reset routes</Reset>
  },
  {
    path: '/PageNotFound',
    element: <PageNotFound>PageNotFound routes</PageNotFound>
  }
]);

export default function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}
