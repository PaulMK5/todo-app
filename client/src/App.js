import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/Home';
import Todo from './pages/Todo';
import { getUser } from './api/userApi';

export const history = createBrowserHistory({ window });

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      getUser()
        .then(user => {
          console.log('in App getUser then');
          if (user) {
            setUser(user);
            history.push('/tasks');
          }
        })
        .catch(err => {
          console.error('Error caught in App useEffect', err);
          // localStorage.removeItem('token');
        });
    }
  }, [user]);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser} />} />
        <Route path="/tasks/" element={<Todo user={user} />} />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
