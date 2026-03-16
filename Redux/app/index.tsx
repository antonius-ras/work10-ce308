import React from 'react';
import { provider } from 'react-redux';
import { store } from './redux/store';
import counterScreen from './screens/CounterScreen';

export default function App() {
  return(
    <Provider store={store}>
      <counterScreen/>
    </Provider>
  )
}
