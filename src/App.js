import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { Home } from './Home';
import { Dashboard } from './Dashboard';
import { NoMatch } from './NoMatch';
import { Navigation } from './Navigation';
import { ProtectedRoute } from './ProtectedRoute';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>

        <Navigation />

        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NoMatch />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
