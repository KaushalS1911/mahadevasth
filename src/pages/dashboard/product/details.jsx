import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { ProductDetailsView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export default function ProductDetailsPage() {
  const params = useParams();
console.log(params,"params");
  // const { id } = params;
const id = "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1"
  return (
    <>
      <Helmet>
        <title> Dashboard: Product Details</title>
      </Helmet>

      <ProductDetailsView id={id} />
    </>
  );
}
