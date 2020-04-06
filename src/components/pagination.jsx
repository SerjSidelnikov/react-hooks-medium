import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import {range} from 'utils';

const PaginationItem = ({page, currentPage, url}) => {
  const classes = classNames({
    'page-item': true,
    'active': currentPage === page,
  });

  return (
    <li className={classes}>
      <Link to={`${url}?page=${page}`} className="page-link">
        {page}
      </Link>
    </li>
  );
};

const Pagination = ({total, limit, url, currentPage}) => {
  const pageCount = Math.ceil(total / limit);
  const pages = range(1, pageCount);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <PaginationItem
          key={page}
          page={page}
          currentPage={currentPage}
          url={url}
        />
      ))}
    </ul>
  );
};

export default Pagination;