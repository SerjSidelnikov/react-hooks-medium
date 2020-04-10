import React, {useContext, useEffect, useState} from 'react';
import {Redirect, useRouteMatch} from 'react-router-dom';

import ArticleForm from 'components/articleForm';
import useFetch from 'hooks/useFetch';
import {CurrentUserContext} from 'contexts/currentUser';

const EditArticle = () => {
  const {slug} = useRouteMatch().params;
  const [currentUserState] = useContext(CurrentUserContext);
  const apiUrl = `articles/${slug}`;
  const [{response: fetchResponse}, doFetch] = useFetch(apiUrl);
  const [{response: updateResponse, error}, doUpdate] = useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!fetchResponse) {
      return;
    }

    setInitialValues({
      title: fetchResponse.article.title,
      description: fetchResponse.article.description,
      body: fetchResponse.article.body,
      tagList: fetchResponse.article.tagList,
    });
  }, [fetchResponse]);

  useEffect(() => {
    if (!updateResponse) {
      return;
    }

    setIsSuccess(true);
  }, [updateResponse]);

  const handleSubmit = (article) => {
    doUpdate({
      method: 'put',
      data: {
        article,
      },
    });
  };

  if (!currentUserState.isLoggedIn) {
    return <Redirect to='/'/>;
  }

  if (isSuccess) {
    return <Redirect to={`/articles/${slug}`}/>;
  }

  return (
    <div>
      <ArticleForm
        onSubmit={handleSubmit}
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
      />
    </div>
  );
};

export default EditArticle;