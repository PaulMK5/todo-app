import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

import { registerUser } from '../api/userApi';

const Home = props => {
  const [state, setState] = useState(true);
  const [error, setError] = useState();

  const buttonHandler = () => {
    setState(state => !state);
  };

  const navigate = useNavigate();

  const textButton = state ? 'SignUp' : 'SignIn';

  const getData = ({ cb, values }) => {
    cb(values)
      .then(res => {
        props.sendUser(res.data);
        navigate('/tasks');
      })
      .catch(({ err }) => setError(err));
  };

  return (
    <>
      <header>
        <button onClick={buttonHandler}>{textButton}</button>
      </header>
      <main>
        {state ? <SignIn sendData={getData} /> : <SignUp sendData={getData} />}
        {error && <div>{error}</div>}
      </main>
    </>
  );
};

export default Home;
