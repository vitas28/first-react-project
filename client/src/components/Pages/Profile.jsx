import React, { useCallback, useContext, useEffect, useState } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import Navbar from '../Navbar';
import InputProfile from '../UI/InputProfile/InputProfile';
import MyTextArea from '../UI/MyTextArea/MyTextArea';
import { useHttp } from '../../hooks/useHttp';
import { useParams } from 'react-router-dom';
import { Context } from '../../context/Context';

const Profile = () => {
  const [edit, setEdit] = useState(false);
  const context = useContext(Context);
  const { request } = useHttp();
  const params = useParams();
  const [data, setData] = useState({
    name: '',
    lastName: '',
    email: '',
    job: '',
    information: '',
  });
  const [previous, setPrevious] = useState({ ...data });

  const fetchData = useCallback(async () => {
    try {
      const fetched = await request(`/profile/${params.id}`, 'GET', null, {
        Authorization: `Bearer ${context.token}`,
      });
      setPrevious(fetched);
      setData(fetched);
    } catch (e) {}
  }, [request, context.token, params.id]);

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const changeData = async (event) => {
    try {
      const changed = await request(
        `/profile/upgrade/${params.id}`,
        'PUT',
        { ...data },
        {
          Authorization: `Bearer ${context.token}`,
        }
      );
      setData({ ...changed, [changed.target.name]: event.target.value });
    } catch (e) {}
    setEdit(false);
  };

  const cancelHandler = () => {
    setData(previous);
    setEdit(false);
  };

  useEffect(() => {
    fetchData().then();
  }, [fetchData]);

  const toggleHandler = () => {
    setEdit(true);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="profile-header">
          <h1>{data.username}</h1>
          {params.id === context.userId ? (
            !edit ? (
              <MyButton
                style={{ background: 'yellowgreen' }}
                onClick={toggleHandler}
              >
                Edit profile
              </MyButton>
            ) : (
              <div className="buttons">
                <MyButton
                  style={{ background: 'red', width: 100 }}
                  onClick={cancelHandler}
                >
                  Cancel
                </MyButton>
                <MyButton
                  style={{ background: 'yellowgreen', width: 100 }}
                  onClick={changeData}
                >
                  Save
                </MyButton>
              </div>
            )
          ) : (
            <div />
          )}
        </div>
        <hr />
        <div className="info">
          <div className="info-wrapper">
            <div className="about">
              <strong>Name:</strong>
              <InputProfile
                type="text"
                name="name"
                readOnly={!edit}
                disabled={!edit}
                value={data.name}
                onChange={changeHandler}
              />
            </div>
            <div className="about">
              <strong>Last name:</strong>
              <InputProfile
                type="text"
                name="lastName"
                readOnly={!edit}
                disabled={!edit}
                value={data.lastName}
                onChange={changeHandler}
              />
            </div>
            <div className="about">
              <strong>Email:</strong>
              <InputProfile
                type="text"
                name="email"
                readOnly
                disabled
                value={data.email}
              />
            </div>
            <div className="about">
              <strong>Job:</strong>
              <InputProfile
                type="text"
                name="job"
                readOnly={!edit}
                disabled={!edit}
                value={data.job}
                onChange={changeHandler}
              />
            </div>
          </div>
          <hr />
          <div className="info-text">
            <strong>Information: </strong>
            <MyTextArea
              readOnly={!edit}
              disabled={!edit}
              name="information"
              onChange={changeHandler}
              value={data.information}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
