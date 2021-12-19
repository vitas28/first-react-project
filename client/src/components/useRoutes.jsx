import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Users from './Pages/Users';

const useRoutes = (isAuthenticated, userId) => {
  if (isAuthenticated && userId) {
    return (
      <Routes>
        <Route path={'/profile/:id'} element={<Profile />} />
        <Route path={'/users'} element={<Users />} />
        <Route path={'*'} element={<Navigate to={`/profile/${userId}`} />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={'/auth/login'} element={<Login title="Sign In" />} />
      <Route path={'/auth/register'} element={<Register title="Sign In" />} />
      <Route path={'*'} element={<Navigate to={`/auth/login`} />} />
    </Routes>
  );
};

export default useRoutes;
