import React, { FC } from 'react';

import './App.css';
import { ConnectionStatus } from './components/ConnectionStatus';
import { Header } from './components/Header'
import { Placeholder } from './components/Placeholder';
import { Users } from './components/Users'

const App: FC = () => (
  <>
    <Header title={"Decentralized Guestbook App"} />
    <main>
      <Users />
      <ConnectionStatus />
      <Placeholder />
    </main>
  </>
)

export default App;
