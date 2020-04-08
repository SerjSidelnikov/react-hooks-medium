import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";
import Authentication from 'pages/authentication';
import TagFeed from 'pages/tagFeed';
import YourFeed from 'pages/yourFeed';

export default () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <GlobalFeed />} />
      <Route path="/feed" render={() => <YourFeed />} />
      <Route path="/tags/:slug" render={() => <TagFeed />} />
      <Route path="/articles/:slug" render={() => <Article />} />
      <Route path="/login" render={() => <Authentication />} />
      <Route path="/register" render={() => <Authentication />} />
    </Switch>
  );
};
