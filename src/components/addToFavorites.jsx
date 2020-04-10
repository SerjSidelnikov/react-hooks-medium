import React from 'react';
import classNames from 'classnames';

import useFetch from 'hooks/useFetch';

const AddToFavorites = ({isFavorited, favoritesCount, articleSlug}) => {
  const apiUrl = `articles/${articleSlug}/favorite`;
  const [{response}, doFetch] = useFetch(apiUrl);
  const isFavoritedWithResponse = response ? response.article.favorited : isFavorited;

  const handleClick = () => {
    doFetch({
      method: isFavoritedWithResponse ? 'delete' : 'post',
    });
  };

  const classes = classNames(
    'btn',
    'btn-sm',
    {'btn-primary': isFavoritedWithResponse},
    {'btn-outline-primary': !isFavoritedWithResponse},
  );

  return (
    <button className={classes} onClick={handleClick}>
      <i className="ion-heart"/>
      <span>&nbsp;{response ? response.article.favoritesCount : favoritesCount}</span>
    </button>
  );
};

export default AddToFavorites;