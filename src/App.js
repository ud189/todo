import React from 'react';
import { Provider } from 'react-redux';
import Router from './Router';
import store from './store';
export default function App() {
  return (
    <div>
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}
