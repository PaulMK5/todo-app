import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

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
        console.log('In Home component, received response: ');
        console.log(res);
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
        // props.sendUser(res.user);
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
