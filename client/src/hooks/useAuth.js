import { useCallback, useEffect, useState } from 'react';

const storageName = 'userData';

export const useAuth = () => {
  const [auth, setAuth] = useState({
    token: '',
    userId: '',
  });

  const login = useCallback((token, userId) => {
    if (token && userId) {
      setAuth({
        token,
        userId,
      });
      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId,
          token,
        })
      );
    }
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.token, data.userId);
    }
  }, [login]);

  const logout = useCallback(() => {
    setAuth({
      token: '',
      userId: '',
    });
    localStorage.removeItem(storageName);
  }, []);

  return { login, logout, ...auth };
};
