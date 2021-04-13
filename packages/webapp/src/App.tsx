import React, { FC } from 'react';
import { Provider } from 'react-redux'

import './App.css';

import { configureStore } from './store';
import { Header } from './components/Header'
import { Users } from './components/Users'

export const App: FC = () => {
  const store = configureStore()
  return (
    <Provider store={store}>
      <Header title={"Decentralized Guestbook App"} />
      <main>
        <Users />
      </main>
    </Provider>
  )
}
