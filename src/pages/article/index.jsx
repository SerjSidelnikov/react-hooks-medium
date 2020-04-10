import React, {useEffect, useContext, useState} from 'react';
import {useRouteMatch, Redirect, Link} from 'react-router-dom';

import useFetch from 'hooks/useFetch';
import Loading from 'components/loading';
import ErrorMessage from 'components/errorMessage';
import TagList from 'components/tagList';
import {CurrentUserContext} from 'contexts/currentUser';

const Article = () => {
  const {slug} = useRouteMatch().params;
  const apiUrl = `/articles/${slug}`;
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);
  const [{response: deleteResponse}, doDelete] = useFetch(apiUrl);
  const [currentUserState] = useContext(CurrentUserContext);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteResponse) {
      return;
    }

    setIsSuccess(true);
  }, [deleteResponse]);

  const isAuthor = () => {
    if (!response || !currentUserState.isLoggedIn) {
      return false;
    }

    return response.article.author.username === currentUserState.currentUser.username;
  };

  const deleteArticle = () => {
    doDelete({
      method: 'delete',
    });
  };

  if (isSuccess) {
    return <Redirect to='/'/>;
  }

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt=""/>
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link
                    to={`/articles/${response.article.slug}/edit`}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    <i className="ion-edit"/>
                    Edit Article
                  </Link>

                  <button onClick={deleteArticle} className="btn btn-outline-danger btn-sm">
                    <i className="ion-trash-a"/>
                    Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading/>}
        {error && <ErrorMessage/>}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{response.article.body}</p>
              </div>
              <TagList tags={response.article.tagList}/>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Article;
