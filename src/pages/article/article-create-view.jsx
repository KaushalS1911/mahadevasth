import React from 'react';
import { Helmet } from 'react-helmet-async';
import ArticleCreateView from '../../sections/article/view/article-create-view';

function ArticleCreatePage(props) {
  return (
    <>
      <Helmet>
        <title>Article</title>
      </Helmet>
      <ArticleCreateView />
    </>
  );
}

export default ArticleCreatePage;
