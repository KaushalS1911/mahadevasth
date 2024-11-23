import React from 'react';
import {Helmet} from 'react-helmet-async';
import AudioCreateView from '../../sections/audio/view/audio-create-view';

function AudioCreatePage(props) {
  return (
    <>
      <Helmet>
        <title>Article</title>
      </Helmet>
      <AudioCreateView/>
    </>
  );
}

export default AudioCreatePage;
