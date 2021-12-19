import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import useRoutes from './components/useRoutes';
import { useAuth } from './hooks/useAuth';
import { Context } from './context/Context';
import './styles/main.css';

const App = () => {
  const auth = useAuth();
  const isAuthenticated = !!auth.token;
  const routes = useRoutes(isAuthenticated, auth.userId);

  return (
    <Context.Provider
      value={{
        token: auth.token,
        userId: auth.userId,
        email: auth.email,
        login: auth.login,
        logout: auth.logout,
      }}
    >
      <BrowserRouter>{routes}</BrowserRouter>
    </Context.Provider>
  );
};

export default App;
