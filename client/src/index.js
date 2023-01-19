import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Counter from './Counter';
import Clicker from './Clicker';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <>
      <Counter />
      <Clicker />
    </>
  </Provider>
);
// root.render(<App />);
