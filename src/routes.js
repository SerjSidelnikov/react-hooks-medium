import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";
import Authentication from 'pages/authentication';

export default () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <GlobalFeed />} />
      <Route path="/articles/:slug" render={() => <Article />} />
      <Route path="/login" render={() => <Authentication />} />
      <Route path="/register" render={() => <Authentication />} />
    </Switch>
  );
};
