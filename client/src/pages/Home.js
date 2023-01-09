import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

import { registerUser } from '../api';

const Home = props => {
  const [state, setState] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();

  const buttonHandler = () => {
    setState(state => !state);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      registerUser(data)
        .then(res => {
          props.sendUser(res);
          navigate('/tasks');
        })
        .catch(({ err }) => setError(err));
    }
  }, [data]);

  const textButton = state ? 'SignUp' : 'SignIn';

  const getData = userData => {
    setData(userData);

    // callback(values)
    //   .then(result => {
    //     props.sendUser(result.data);
    //     navigate('/tasks');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
