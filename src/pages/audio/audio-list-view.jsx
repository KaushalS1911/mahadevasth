import React from 'react';
import { Helmet } from 'react-helmet-async';
import AudioListView from '../../sections/audio/view/list';

function AudioListPage(props) {
  return (
    <>
      <Helmet>
        <title>Article</title>
      </Helmet>
      <AudioListView />
    </>
  );
}

export default AudioListPage;
