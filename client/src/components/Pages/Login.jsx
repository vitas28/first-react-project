import React, { useContext, useState } from 'react';
import MyInput from '../UI/MyInput/MyInput';
import MyButton from '../UI/MyButton/MyButton';
import { NavLink } from 'react-router-dom';
import Auth from '../Auth';
import { useHttp } from '../../hooks/useHttp';
import { Context } from '../../context/Context';

const Login = ({ title }) => {
  const { request } = useHttp();
  const context = useContext(Context);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async (event) => {
    try {
      const data = await request('/auth/login', 'POST', { ...form });
      context.login(data.token, data.userId, form.email);
      setForm({ ...form, [event.target.name]: event.target.value });
    } catch (e) {}
  };

  return (
    <div>
      <Auth>
        <h1 className="form-header">{title}</h1>
        <div>
          <MyInput
            onChange={changeHandler}
            type="text"
            placeholder="Email"
            name="email"
          />
          <MyInput
            onChange={changeHandler}
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <div className="auth-nav">
          <MyButton onClick={loginHandler}>{title}</MyButton>
          <NavLink className="nav-link" to={'/auth/register'}>
            Create an account
          </NavLink>
        </div>
      </Auth>
    </div>
  );
};

export default Login;
