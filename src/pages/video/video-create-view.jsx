import React from 'react';
import {Helmet} from 'react-helmet-async';
import ArticleCreateView from '../../sections/video/view/video-create-view';

function VideoCreatePage(props) {
  return (
    <>
      <Helmet>
        <title>Article</title>
      </Helmet>
      <ArticleCreateView/>
    </>
  );
}

export default VideoCreatePage;
