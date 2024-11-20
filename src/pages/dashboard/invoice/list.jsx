import { Helmet } from 'react-helmet-async';

import { InvoiceListView } from 'src/sections/invoice/view';

// ----------------------------------------------------------------------

export default function InvoiceListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Payment</title>
      </Helmet>

      <InvoiceListView />
    </>
  );
}
