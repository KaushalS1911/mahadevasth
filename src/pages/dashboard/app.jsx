import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { OverviewAppView } from 'src/sections/overview/app/view';
import { HeadviewAppView } from '../../sections/overview/head-office-dashboard/view';
import BranchDashboardView from '../../sections/overview/branch-dashboard/view/branch-office-app-view';
import { useAuthContext } from '../../auth/hooks';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  const {vendor} = useAuthContext()
 const login_type = localStorage.getItem("login_type")
  return (
    <>
      <Helmet>
        <title> NCCF CSP Portal </title>
      </Helmet>

      {vendor?.category === "branch"? <BranchDashboardView />: vendor?.category === "head_office"? <HeadviewAppView/> : <OverviewAppView/> }
    </>
  );
}
