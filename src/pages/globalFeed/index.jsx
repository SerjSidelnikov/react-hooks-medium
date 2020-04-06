import React, {useEffect} from 'react';
import {useLocation, useRouteMatch} from 'react-router-dom';
import {stringify} from 'query-string';

import useFetch from 'hooks/useFetch';
import Feed from 'components/feed';
import Pagination from 'components/pagination';
import {getPaginator, limit} from 'utils';

const GlobalFeed = () => {
  const {search} = useLocation();
  const {currentPage, offset} = getPaginator(search);
  const stringifiedParams = stringify({limit, offset});
  const apiUrl = `/articles?${stringifiedParams}`;
  const {url} = useRouteMatch();
  console.log(url);
  const [{response, isLoading, error}, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {isLoading && <div>Loading...</div>}
            {error && <div>Some error happened</div>}
            {!isLoading && response && (
              <>
                <Feed articles={response.articles}/>
                <Pagination limit={limit} total={response.articlesCount} url={url} currentPage={currentPage}/>
              </>
            )}
          </div>
          <div className="col-md-3">Popular tags</div>
        </div>
      </div>
    </div>
  );
};

export default GlobalFeed;
