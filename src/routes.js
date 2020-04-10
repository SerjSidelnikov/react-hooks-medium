import React from 'react';
import {Switch, Route} from 'react-router-dom';

import GlobalFeed from "pages/globalFeed";
import Article from "pages/article";
import Authentication from 'pages/authentication';
import TagFeed from 'pages/tagFeed';
import YourFeed from 'pages/yourFeed';
import CreateArticle from 'pages/createArticle';
import EditArticle from 'pages/editArticle';
import Settings from 'pages/settings';

export default () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <GlobalFeed />} />
      <Route path="/feed" render={() => <YourFeed />} />
      <Route path="/settings" render={() => <Settings />} />
      <Route path="/tags/:slug" render={() => <TagFeed />} />
      <Route path="/articles/new" render={() => <CreateArticle />} />
      <Route exact path="/articles/:slug" render={() => <Article />} />
      <Route path="/articles/:slug/edit" render={() => <EditArticle />} />
      <Route path="/login" render={() => <Authentication />} />
      <Route path="/register" render={() => <Authentication />} />
    </Switch>
  );
};
