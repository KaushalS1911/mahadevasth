import { Helmet } from 'react-helmet-async';

import HeadOfficeListView from '../../../sections/head-office/view/head-office-list-view';
import OrderListView from '../../../sections/head-office/view/order-view';

// ----------------------------------------------------------------------

export default function HeadOfficeOrderView() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Head Office Order View</title>
      </Helmet>

      <OrderListView />
    </>
  );
}
