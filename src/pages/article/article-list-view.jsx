import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleListView from '../../sections/article/view/list';

function ArticleListPage(props) {
  return (
    <>
      <Helmet>
        <title>Article</title>
      </Helmet>
      <ArticleListView />
    </>
  );
}

export default ArticleListPage;
