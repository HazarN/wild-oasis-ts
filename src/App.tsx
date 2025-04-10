import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Account from '@pages/Account';
import Bookings from '@pages/Bookings';
import Cabins from '@pages/Cabins';
import Dashboard from '@pages/Dashboard';
import Login from '@pages/Login';
import PageNotFound from '@pages/PageNotFound';
import Settings from '@pages/Settings';
import Users from '@pages/Users';

import { MINUTE } from '@models/constants';
import AppLayout from '@ui/AppLayout';
import Notification from '@ui/Notification';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: MINUTE,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to={'dashboard'} />} />

            <Route path='dashboard' element={<Dashboard />} />
            <Route path='bookings' element={<Bookings />} />
            <Route path='cabins' element={<Cabins />} />
            <Route path='users' element={<Users />} />
            <Route path='settings' element={<Settings />} />
            <Route path='account' element={<Account />} />
            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Notification />
    </QueryClientProvider>
  );
}

export default App;
