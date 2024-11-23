import React from 'react';
import {Helmet} from 'react-helmet-async';
import VideoListView from '../../sections/video/view/list';

function VideoListPage(props) {
  return (
    <>
      <Helmet>
        <title>Article</title>
      </Helmet>
      <VideoListView/>
    </>
  );
}

export default VideoListPage;
