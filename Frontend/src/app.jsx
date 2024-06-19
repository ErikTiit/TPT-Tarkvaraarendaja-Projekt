import React, { useState, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import UserRegisterView from './Views/UserRegisterView';
import BusinessView from './Views/BusinessView';
import HomeView from './Views/HomeView';
import StudentView from './Views/StudentView';
import UserLoginView from './Views/UserLoginView';
import ContractEdit from './Views/ContractEdit';
import ContractList from './Views/ContractList';
import { checkAuth } from './Controllers/LoginRegistrationAPI';
import '@mantine/core/styles.css';
import UserDetailsView from './Views/UserDetailsView';

const ProtectedRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchAuthStatus = async () => {
        const authStatus = await checkAuth();
        setIsAuthenticated(authStatus);
        setIsLoading(false);
      };
  
      fetchAuthStatus();
    }, []);
  
    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate('/user-login');
      }
    }, [isLoading, isAuthenticated, navigate]);
  
    if (!isAuthenticated) {
      return null;
    }
  
    return children;
  };

  const App = () => {
    return (
        <Router>
            <MantineProvider>
                <Routes>
                    <Route path="/user-register" element={<UserRegisterView />} />
                    <Route path="/" element={<HomeView />} />
                    <Route path="/business-offer" element={<BusinessView />} />
                    <Route path="/student-offer" element={<ProtectedRoute><StudentView /></ProtectedRoute>} />
                    <Route path="/user-login" element={<UserLoginView />} />
                    <Route path="/contract/:id" element={<ContractEdit />} />
                    <Route path="/contracts" element={<ContractList />} />
                    <Route path="/userdetails" element={<UserDetailsView />} />
                    <Route path="*" element={<h1>404 Not Found</h1>} />
                </Routes>
            </MantineProvider>
        </Router>
    );
};
export default App;