import React from 'react';

import Routes from './routes';
import TopBar from "components/topBar";
import { CurrentUserProvider } from 'contexts/currentUser';
import CurrentUserChecker from 'components/currentUserChecker';

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <TopBar />
        <Routes />
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
