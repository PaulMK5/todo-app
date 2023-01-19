import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';

const Home = props => {
  const [state, setState] = useState(true);
  console.log(props);
  const buttonHandler = () => {
    setState(state => !state);
  };

  const textButton = state ? 'SignUp' : 'SignIn';

  /* const getData = ({ cb, values }) => {
    cb(values)
      .then(user => {
        props.sendUser(user);
        navigate('/tasks');
      })
      .catch(({ err }) => setError(err));
  }; */

  return (
    <>
      <header>
        <button onClick={buttonHandler}>{textButton}</button>
      </header>
      <main>
        {state ? <SignIn /> : <SignUp />}
        {props.error && <div style={{ color: 'red' }}>{props.error}</div>}
      </main>
    </>
  );
};

const mapStateToProps = state => ({ error: state.error });

const WrappedComponent = connect(mapStateToProps, null)(Home);

export default WrappedComponent;
