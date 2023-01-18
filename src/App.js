import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { Home } from './Home';
import { Dashboard } from './Dashboard';
import { NoMatch } from './NoMatch';
import { Navigation } from './Navigation';
import { ProtectedRoute } from './ProtectedRoute';
import { Login } from './features/auth/Login';
import { CustomerHome } from './features/customer/CustomerHome';
import { useGetCustomersQuery } from './features/customer/customerAPI';
import { InvoiceHome } from './features/invoice/InvoiceHome';
import { CustomerDetailPage } from './features/customer/CustomerDetailPage';
import { SSEProvider } from 'react-hooks-sse';

const sseUrl = `${process.env.REACT_APP_API_BASE_URL}/updates`;

const App = () => {
  const { isError } = useGetCustomersQuery();


  return (

    <BrowserRouter>
      <SSEProvider endpoint={sseUrl}>
        <AuthProvider>
          <Navigation />
          <hr className={'my-2'} />
          <h1 className='text-3xl font-bold mb-4'>React, Redux, RTK Query</h1>

          {isError && <div className='my-4 text-white bg-red-500 p-4 rounded'>
            Unable to Fetch Customers, Have you Logged in Yet?
          </div>}
          <Routes>
            <Route index element={<Home />} />
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />} />

            <Route
              path='dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path='customers'>

              <Route index element={<ProtectedRoute>
                <CustomerHome />
              </ProtectedRoute>} />

              <Route path='detail/:id' element={
                <ProtectedRoute>
                  <CustomerDetailPage />
                </ProtectedRoute>} />
            </Route>

            <Route
              path='invoices'
              element={
                <ProtectedRoute>
                  <InvoiceHome />
                </ProtectedRoute>
              }
            />

            <Route path='*' element={<NoMatch />} />
          </Routes>
        </AuthProvider>
      </SSEProvider>

    </BrowserRouter>
  );
};

export default App;
