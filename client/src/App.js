import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/Home';
import Todo from './pages/Todo';
import { getUserRequest } from './actionCreator';

export const history = createBrowserHistory({ window });

function App(props) {
  useEffect(() => {
    if (!props.user) {
      props.getUserRequest();
    }
  }, [props.user]);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks/" element={<Todo />} />
      </Routes>
    </HistoryRouter>
  );
}

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = { getUserRequest };

const WrappedComponent = connect(mapStateToProps, mapDispatchToProps)(App);

export default WrappedComponent;
