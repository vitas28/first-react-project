import React, { useCallback, useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { useHttp } from '../../hooks/useHttp';
import { Link } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const { request } = useHttp();

  const fetchUsers = useCallback(async () => {
    try {
      const fetched = await request('/users', 'GET', null, {});
      setUsers(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchUsers().then();
  }, [fetchUsers]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="table">
          <div className="table-header">
            <div className="table-wrapper">
              <span>Username</span>
              <span>Email</span>
              <span>Date of birth</span>
            </div>
          </div>
          <hr />
          <div className="table-body">
            {users.map((user) => (
              <Link
                key={user._id}
                className="table-wrapper"
                to={`/profile/${user._id}`}
              >
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>{user.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
