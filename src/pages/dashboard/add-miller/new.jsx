import { Helmet } from 'react-helmet-async';
import { MillerCreateView } from 'src/sections/add-miller/view';

// import { ProductCreateView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function MillerCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new miller</title>
      </Helmet>

      <MillerCreateView />
    </>
  );
}
