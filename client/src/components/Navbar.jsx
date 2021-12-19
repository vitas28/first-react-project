import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../context/Context';

const Navbar = () => {
  const context = useContext(Context);

  return (
    <nav>
      <h1>Tortique</h1>
      <div className="links">
        <NavLink className="links-item" to={`/profile/${context.userId}`}>
          Profile
        </NavLink>
        <NavLink className="links-item" to={'/users'}>
          Users
        </NavLink>
        <NavLink
          onClick={context.logout}
          className="links-item"
          to={'/auth/login'}
        >
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
