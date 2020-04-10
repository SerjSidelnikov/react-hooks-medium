import React, {useContext, useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';

import ArticleForm from 'components/articleForm';
import useFetch from 'hooks/useFetch';
import {CurrentUserContext} from 'contexts/currentUser';

const CreateArticle = () => {
  const apiUrl = `articles`;
  const [{response, error}, doFetch] = useFetch(apiUrl);
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const [currentUserState] = useContext(CurrentUserContext);

  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };

  useEffect(() => {
    if (!response) {
      return;
    }

    setIsSuccessfullSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to='/'/>;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`}/>;
  }

  const handleSubmit = (article) => {
    console.log(article);
    doFetch({
      method: 'post',
      data: {
        article,
      },
    });
  };

  return (
    <div>
      <ArticleForm
        errors={(error && error.errors) || {}}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;