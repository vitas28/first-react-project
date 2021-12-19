import React from 'react';

const Auth = ({ children }) => {
  const onAuthSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="auth">
      <form onSubmit={onAuthSubmit} className="auth-form ">
        {children}
      </form>
    </div>
  );
};

export default Auth;
