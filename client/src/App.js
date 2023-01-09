import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Todo from './pages/Todo';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home sendUser={setUser} />} />
        <Route path="/tasks/" element={<Todo user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
