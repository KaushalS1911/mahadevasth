import { Helmet } from 'react-helmet-async';

import HeadOfficeListView from '../../../sections/head-office/view/head-office-list-view';

// ----------------------------------------------------------------------

export default function HeadOfficeListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Head Office List</title>
      </Helmet>

      <HeadOfficeListView />
    </>
  );
}
