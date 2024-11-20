import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';


import { useSettingsContext } from 'src/components/settings';

import AppNewInvoice from '../app-new-invoice';
import AppWidgetSummary from '../app-widget-summary';
import axios from 'axios';
import { useAuthContext } from '../../../../auth/hooks';
import UserListView from '../../../../pages/user/view/user-list-view';
import AnalyticsWidgetSummary from '../../analytics/analytics-widget-summary';

// ----------------------------------------------------------------------

export default function OverviewAppView({ vendorCode }) {
  const {vendor} = useAuthContext()
  const settings = useSettingsContext();

  const [stats, setStats] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [count,setCount] = useState(0)


  useEffect(() => {
    if (vendor?.csp_code) {
      fetchAllOrders();
      getStats();
    }
  }, [count]);

  function fetchAllOrdersDemo(){
    setCount((ev) => ev+1 )
  }

  // console.log(count);
    function getStats() {
      axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/orders_stats`).then((res) => {
        setStats(res.data?.data[0]);
      });
    }

  function fetchAllOrders() {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/orders`).then((res) => {
      setOrderList(res.data?.data);
    });
  }

    return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>


        <Grid xs={12} md={3}>
          <AnalyticsWidgetSummary
            title="Intents Pending"
            total={stats?.placed_orders || "0"}
            color={"info"}

          />
        </Grid>

        <Grid xs={12} md={3}>
          <AnalyticsWidgetSummary
            title="Intents Accepted"
            color={"warning"}
            total={stats?.accepted_orders || "0"}

          />
        </Grid>

        <Grid xs={12} md={3}>
          <AnalyticsWidgetSummary
            color={"error"}
            title="Intents Declined"
            total={stats?.declined_orders || "0"}

          />
        </Grid>
        <Grid xs={12} md={3}>
          <AnalyticsWidgetSummary
            title="Total Intents"
            total={stats?.total_orders || "0"}
            color={"primary"}
          />
        </Grid>
        <Grid xs={12} lg={12}>
          <UserListView tableData={orderList} fetchAllOrdersDemo={fetchAllOrdersDemo} />
        </Grid>
      </Grid>
    </Container>
  );
}
