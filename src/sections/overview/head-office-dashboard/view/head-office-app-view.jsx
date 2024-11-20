import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';


import { useSettingsContext } from 'src/components/settings';

import axios from 'axios';
import { useAuthContext } from '../../../../auth/hooks';
import UserListView from '../../../../pages/user/view/user-list-view';
import HeadWidgetSummary from '../head-widget-summary';
import HeadCurrentDownload from '../head-current-download';
import HeadDataActivity from '../head-data-activity';
import HeadManagerPanel from '../head-manager-panel';
import { paths } from '../../../../routes/paths';
import scrollbar from '../../../../components/scrollbar';
import { Stack } from '@mui/system';
import { _folders, handleCategoryTypes, handleOrderTypes } from '../../../../_mock';
import BranchWidgetSummary from '../../branch-dashboard/branch-widget-summary';
import AnalyticsWidgetSummary from '../../analytics/analytics-widget-summary';

// ----------------------------------------------------------------------

export default function HeadviewAppView({ vendorCode }) {
  const { vendor } = useAuthContext();
  const settings = useSettingsContext();
  const theme = useTheme();


  const [orderList, setOrderList] = useState([]);
  const [stats, setStats] = useState([]);
  const [orderCount, setOrderCount] = useState([]);
  const [labelCount, setLabelCount] = useState([])

  const TIME_LABELS = {
    week: ['Mon', 'Tue', 'Web', 'Thu', 'Fri', 'Sat', 'Sun'],
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    year: ['2018', '2019', '2020', '2021', '2022'],
  };
  useEffect(() => {
    // if (vendor.csp_code) {
    //   fetchAllOrders();
    // }
    getStats();
    getOrder();
  }, []);

  useEffect(() => {
    const count = stats?.map((data, ind) => {
      if (data?.category !== "Distributor") {
        return { label: handleCategoryTypes(data?.category), value: data?.count };
      }
      return null;
    }).filter(item => item !== null);

    setLabelCount(count);
  }, [stats]);


  function getStats() {
    axios.get('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/ho/csp/category-stats')
      .then((res) => {
        const data = res.data.data;
        const desiredSequence = ['miller', 'distributor', 'miller_distributor', 'society_cooperative'];

        // Map through the desired sequence and find the matching object in data
        const sortedData = desiredSequence.map(category => {
          return data.find(item => item.category === category);
        }).filter(Boolean); // filter out any undefined entries if a category isn't found

        // Set the sorted data to state
        setStats(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
      });
  }

  function getOrder() {
    axios.get('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/ho/csp/orders/stats')
      .then((res) => {
        const data = res.data.data;
        const desiredSequence = ['placed', 'accepted', 'declined'];

        // Map through the desired sequence and find the matching object in data
        const sortedData = desiredSequence.map(status => {
          return data.find(item => item.nccf_order_status === status);
        }).filter(Boolean); // filter out any undefined entries if a status isn't found

        // Set the sorted data to state
        setOrderCount(sortedData);
      })
      .catch((error) => {
        console.error("Error fetching order stats:", error);
      });
  }

  // function fetchAllOrders() {
  //   axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor.csp_code}/orders`).then((res) => {
  //     setOrderList(res.data?.data);
  //   });
  // }
  const statusesToKeep = ['placed', 'accepted', 'declined'];
  const color = ["primary","info","warning","error"]
const color2 = ["secondary","brown1","brown","brown"]
  const filteredData = orderCount.filter(item => statusesToKeep.includes(item.nccf_order_status));
const chartOrder = []
  filteredData.map((data) => chartOrder.push({label:handleOrderTypes(data?.nccf_order_status),value:data?.order_count || 0}))
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        {stats && stats.map((data, ind) => (
           <Grid xs={12} md={3}>
            <AnalyticsWidgetSummary
              title={handleCategoryTypes(data?.category)}
              // percent={0.2}
              total={data?.count || 0}
              color={color[ind]}
              // icon={}
              // chart={{
                // colors: color[ind-1],
                // series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              /*}}*/
            />
          </Grid>
        ))}
        {orderCount && filteredData.map((data, ind) => (
           <Grid xs={12} md={4}>
            <AnalyticsWidgetSummary
              title={handleOrderTypes(data?.nccf_order_status)}
              // percent={0.2}
              total={data?.order_count || 0}
              color={color2[ind]}
              chart={{
                // colors: color[ind-1],
                // series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
              }}
            />
          </Grid>
        ))}
        {/*</Grid>*/}
        {/*<Grid xs={12} md={3}>*/}
        {/*  <HeadWidgetSummary*/}
        {/*    title="Distributor"*/}
        {/*    // percent={-0.1}*/}
        {/*    total={678}*/}
        {/*    chart={{*/}
        {/*      colors: [theme.palette.warning.light, theme.palette.warning.main],*/}
        {/*      series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],*/}
        {/*    }}*/}

        {/*  />*/}
        {/*</Grid>*/}

        {/*<Grid xs={12} md={3}>*/}
        {/*  <HeadWidgetSummary*/}
        {/*    title="Miller & Distributor"*/}
        {/*    // percent={0.2}*/}
        {/*    total={4876}*/}
        {/*    chart={{*/}
        {/*      colors: [theme.palette.info.light, theme.palette.info.main],*/}
        {/*      series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],*/}
        {/*    }}*/}

        {/*  />*/}
        {/*</Grid>*/}

        {/*<Grid xs={12} md={3}>*/}
        {/*  <HeadWidgetSummary*/}
        {/*    title="Society/Co-operative"*/}
        {/*    // percent={-0.1}*/}
        {/*    total={678}*/}
        {/*    chart={{*/}
        {/*      colors: [theme.palette.secondary.light, theme.palette.secondary.main],*/}
        {/*      series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],*/}
        {/*    }}*/}

        {/*  />*/}
        {/*</Grid>*/}

        <Grid xs={12} md={6} lg={4}>
          {labelCount !== [] && <HeadCurrentDownload
            title="CSP distribution"
            chart={{
              colors: [
                '#5DD095',
                '#0D7566',
                '#004B50',
                '#C8FAD6',
              ],
              series: labelCount,
            }}
          />}
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {labelCount !== [] && <HeadCurrentDownload
            title="Total Intents"
            chart={{
              colors: [
                '#6F4E37',
                '#A67B5B',
                '#FED8B1',
                '#ECB176',
              ],
              series: chartOrder,
            }}
          />}
        </Grid>
        {/*<Grid xs={12} md={6} lg={8}>*/}
        {/*  <HeadDataActivity*/}
        {/*    title="Orders"*/}
        {/*    chart={{*/}
        {/*      labels: TIME_LABELS,*/}
        {/*      colors: [*/}
        {/*        theme.palette.primary.main,*/}
        {/*        theme.palette.error.main,*/}
        {/*        theme.palette.warning.main,*/}
        {/*      ],*/}
        {/*      series: [*/}
        {/*        {*/}
        {/*          type: 'Week',*/}
        {/*          data: [*/}
        {/*            { name: 'Bharat Daal', data: [20, 34, 48, 65, 37, 48, 9] },*/}
        {/*            { name: 'Bharat Aata', data: [10, 34, 13, 26, 27, 28, 18] },*/}
        {/*            { name: 'Bharat Rice', data: [10, 14, 13, 16, 17, 18, 28] },*/}
        {/*          ],*/}
        {/*        },*/}
        {/*        {*/}
        {/*          type: 'Month',*/}
        {/*          data: [*/}
        {/*            {*/}
        {/*              name: 'Bharat Daal',*/}
        {/*              data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],*/}
        {/*            },*/}
        {/*            {*/}
        {/*              name: 'Bharat Aata',*/}
        {/*              data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],*/}
        {/*            },*/}
        {/*            {*/}
        {/*              name: 'Bharat Rice',*/}
        {/*              data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 12, 43, 34],*/}
        {/*            },*/}

        {/*          ],*/}
        {/*        },*/}
        {/*        {*/}
        {/*          type: 'Year',*/}
        {/*          data: [*/}
        {/*            { name: 'Bharat Daal', data: [10, 34, 13, 56, 77] },*/}
        {/*            { name: 'Bharat Aata', data: [10, 34, 13, 56, 77] },*/}
        {/*            { name: 'Bharat Rice', data: [10, 34, 13, 56, 77] },*/}
        {/*          ],*/}
        {/*        },*/}
        {/*      ],*/}
        {/*    }}*/}
        {/*  />*/}

          {/*<div>*/}
          {/*  <HeadManagerPanel*/}
          {/*    title="Folders"*/}
          {/*    link={paths.dashboard.fileManager}*/}
          {/*    onOpen={newFolder.onTrue}*/}
          {/*    sx={{ mt: 5 }}*/}
          {/*  />*/}

          {/*  <Scrollbar>*/}
          {/*    <Stack direction="row" spacing={3} sx={{ pb: 3 }}>*/}
          {/*      {_folders.map((folder) => (*/}
          {/*        <FileManagerFolderItem*/}
          {/*          key={folder.id}*/}
          {/*          folder={folder}*/}
          {/*          onDelete={() => console.info('DELETE', folder.id)}*/}
          {/*          sx={{*/}
          {/*            ...(_folders.length > 3 && {*/}
          {/*              minWidth: 222,*/}
          {/*            }),*/}
          {/*          }}*/}
          {/*        />*/}
          {/*      ))}*/}
          {/*    </Stack>*/}
          {/*  </Scrollbar>*/}

          {/*  <FileManagerPanel*/}
          {/*    title="Recent Files"*/}
          {/*    link={paths.dashboard.fileManager}*/}
          {/*    onOpen={upload.onTrue}*/}
          {/*    sx={{ mt: 2 }}*/}
          {/*  />*/}

          {/*  <Stack spacing={2}>*/}
          {/*    {_files.slice(0, 5).map((file) => (*/}
          {/*      <FileRecentItem*/}
          {/*        key={file.id}*/}
          {/*        file={file}*/}
          {/*        onDelete={() => console.info('DELETE', file.id)}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*  </Stack>*/}
          {/*</div>*/}
        {/*</Grid>*/}
        {/*<Grid xs={12} md={6} lg={4}>*/}
        {/*  <HeadAnalyticsCurrentVisits*/}
        {/*    title="Current Orders"*/}

        {/*    chart={{*/}
        {/*      colors: [*/}
        {/*        theme.palette.warning.main,*/}
        {/*        theme.palette.primary.main,*/}
        {/*        theme.palette.error.main,*/}
        {/*      ],*/}
        {/*      series:chartOrder,*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</Grid>*/}
        {/*<Grid xs={12} lg={12}>*/}
        {/*  <UserListView tableData={orderList}/>*/}
        {/*</Grid>*/}
      </Grid>
    </Container>
  );
}
