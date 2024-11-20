import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '@mui/material/Container';
import { Button, Card, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { paths } from '../../routes/paths';
import { useAuthContext } from '../../auth/hooks';
import axios from 'axios';
import { Text } from '@react-pdf/renderer';
import { LoadingScreen } from '../../components/loading-screen';

function FieldReport(props) {
  const {vendor} = useAuthContext()
  const [loading,setLoading] = useState(false)
  const [remark,setRemark] = useState("")
  const [data,setData] = useState("")
  const remarkData = () => {
    setLoading(true)
    axios.post("http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/fr",{csp_code:vendor?.csp_code})
      .then((res) => {
        setRemark(res?.data?.data?.remark);
        setData(res?.data?.data?.remark)
        setLoading(false)
      }).catch((err) => {
      setLoading(false)
      console.log(err);
    })
  }
  useEffect(() => {
    setRemark("")
    remarkData()
  },[])
  return (
    <>
      <Helmet>
        <title> Dashboard | Field Report</title>
      </Helmet>
      {loading ? <LoadingScreen /> :
      <Container
        maxWidth={'xl'}

      >
          <CustomBreadcrumbs
            heading="CSP"
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'Field Report' },
              // { name: 'Account' },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />


        <Card sx={{background:!remark && "#FFE2DA",color:!remark && "#93313A"}}>
          <Stack spacing={3} sx={{ p: 1.5 }}>
            <Stack>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
                <Text>{remark ? remark : "Field report not generated"}</Text>
              </Box>
            </Stack>
            {/*{data === '' && <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '20px' }}>*/}
            {/*  <Button sx={{ cursor: 'pointer', maxWidth: '200px' }} variant="contained" onClick={() => {*/}

            {/*    handelSubmit();*/}
            {/*  }}>*/}
            {/*    Approve*/}
            {/*  </Button>*/}
            {/*  <Button sx={{ cursor: 'pointer', maxWidth: '200px', mx: 2 }} variant="contained" onClick={() => {*/}
            {/*    handelSubmit2();*/}
            {/*  }}>*/}
            {/*    Reject*/}
            {/*  </Button>*/}
            {/*</Box>}*/}
          </Stack>
        </Card>


      </Container>
      }
    </>
  );
};

export default FieldReport;
