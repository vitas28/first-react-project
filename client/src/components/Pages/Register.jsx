import React, { useState } from 'react';
import MyInput from '../UI/MyInput/MyInput';
import MyButton from '../UI/MyButton/MyButton';
import { NavLink } from 'react-router-dom';
import { useHttp } from '../../hooks/useHttp';
import Auth from '../Auth';

const Register = ({ title }) => {
  const { isLoading, error, request } = useHttp();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    date: '',
    name: '',
    lastName: '',
    job: '',
    information: '',
  });

  const registerHandler = async () => {
    try {
      await request('/auth/register', 'POST', { ...form });
    } catch (e) {}
  };

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <Auth>
        <h1 className="form-header">{title}</h1>
        <div>
          <MyInput
            id="username"
            value={form.username}
            onChange={changeHandler}
            type="text"
            placeholder="Username"
            name="username"
          />
          <MyInput
            id="name"
            value={form.name}
            onChange={changeHandler}
            type="text"
            placeholder="Name"
            name="name"
          />
          <MyInput
            id="lastName"
            value={form.lastName}
            onChange={changeHandler}
            type="text"
            placeholder="Last name"
            name="lastName"
          />
          <MyInput
            id="job"
            value={form.job}
            onChange={changeHandler}
            type="text"
            placeholder="Job"
            name="job"
          />
          <MyInput
            id="email"
            value={form.email}
            onChange={changeHandler}
            type="text"
            placeholder="Email"
            name="email"
          />
          <MyInput
            id="password"
            value={form.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            name="password"
          />

          <MyInput
            id="date"
            value={form.date}
            onChange={changeHandler}
            type="date"
            name="date"
          />
        </div>
        <div className="auth-nav">
          <MyButton onClick={registerHandler} disabled={isLoading}>
            {title}
          </MyButton>
          <NavLink className="nav-link" to={'/auth/login'}>
            I already have an account
          </NavLink>
        </div>
        {error !== null && <div>{error}</div>}
      </Auth>
    </div>
  );
};

export default Register;
