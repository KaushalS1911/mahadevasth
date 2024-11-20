import { Helmet } from 'react-helmet-async';
import { DistributorCreateView } from '../../../sections/add-distributor/view';

// import { ProductCreateView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function DistributorCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new distributor</title>
      </Helmet>

      <DistributorCreateView />
    </>
  );
}
