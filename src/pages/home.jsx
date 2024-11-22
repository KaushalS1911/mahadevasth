import { Helmet } from 'react-helmet-async';

import { HomeView } from 'src/sections/home/view';
import NewHomeView from "../sections/home/view/new-home-view";

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Mahadevasth</title>
      </Helmet>

      {/*<HomeView />*/}
      <NewHomeView />
    </>
  );
}
