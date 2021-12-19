import { createContext } from 'react';

const noop = () => {};

export const Context = createContext({
  token: null,
  userId: null,
  email: null,
  login: noop,
  logout: noop,
});
