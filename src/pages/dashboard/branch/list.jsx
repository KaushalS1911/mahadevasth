import { Helmet } from 'react-helmet-async';

import { ProductListView } from 'src/sections/product/view';
import { BranchListView } from '../../../sections/branch/view';

// ----------------------------------------------------------------------

export default function BranchListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Product List</title>
      </Helmet>

      <BranchListView />
    </>
  );
}
