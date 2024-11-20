import React from 'react';
import { Helmet } from 'react-helmet-async';
import CspListView from '../../sections/csp/view/csp-list-view';

function Csp(props) {
  return (
    <>
      <Helmet>
        <title> Dashboard | CSP</title>
      </Helmet>
    <CspListView />
    </>
  );
}

export default Csp;
