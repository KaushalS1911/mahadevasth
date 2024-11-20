import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from '../../components/custom-breadcrumbs';
import { paths } from '../../routes/paths';

import { useAuthContext } from '../../auth/hooks';
import { Button, Card, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';


export default function FieldReport({singleCode,data,setData,remark,setRemark,remarkData}) {
  // const [remark,setRemark] = useState("")
  // const [data,setData] = useState("")
  const {vendor} = useAuthContext()
  // const remarkData = () => {
  //   axios.post("http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/fr",{csp_code:singleCode})
  //     .then((res) => {
  //       setRemark(res?.data?.data?.remark);
  //       setData(res?.data?.data?.remark)
  //     }).catch((err) => console.log(err))
  // }
  const handelSubmit = () => {
    const payload = {
      csp_code:singleCode,
      field_report:remark,
      nccf_branch_status:"1"
    }
    axios.put("http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/fr/validate",payload)
      .then((res) => {
        remarkData();
        enqueueSnackbar(res.data.message)
      }).catch((err) => console.log(err))
  }
  const handelSubmit2 = () => {
    const payload ={
      csp_code:singleCode,
      field_report:remark,
      nccf_branch_status:"0"
    }
    axios.put("http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/fr/validate",payload)
      .then((res) => {
        remarkData();
        enqueueSnackbar(res.data.message)
      }).catch((err) => console.log(err))
  }


  // useEffect(() => {
  //   setRemark("")
  //   remarkData()
  // },[])

  return (
    <>

        <Container
          maxWidth={'xl'}

        >

          {/*<CustomBreadcrumbs*/}
          {/*  heading={'Field Report'}*/}
          {/*  links={[*/}
          {/*    {*/}
          {/*      name: 'Dashboard',*/}
          {/*      href: paths.dashboard.root,*/}
          {/*    },*/}
          {/*    {*/}
          {/*      name: 'CSP List',*/}
          {/*      href: paths.dashboard.csp.csp_list ,*/}
          {/*    },*/}

          {/*    {*/}
          {/*      name: 'Field Report',*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*  sx={{ mb: { xs: 3, md: 5 } }}*/}
          {/*  // action={*/}
          {/*  //   (vendor?.category !== 'branch' && !cspt) &&*/}
          {/*  //   <Button*/}
          {/*  //     component={RouterLink}*/}
          {/*  //     href={miller ? paths.dashboard.miller.document_upload : docu ? paths.dashboard.distributor.document_upload : paths.dashboard.distributor.document_upload}*/}
          {/*  //     variant="contained"*/}
          {/*  //     startIcon={<Iconify icon="mingcute:add-line"/>}*/}
          {/*  //*/}
          {/*  //   >*/}
          {/*  //     Upload Document*/}
          {/*  //   </Button>*/}
          {/*  // }*/}
          {/*/>*/}
          <Card>
            <Stack spacing={3} sx={{ p: 4 }}>
              <Stack>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  // gridTemplateColumns={{
                  //   xs: 'repeat(1, 1fr)',
                  //   sm: 'repeat(2, 1fr)',
                  //   md:  'repeat(2, 1fr)',
                  // }}
                >
          <TextField name="Remark" label="Remark" disabled={data !== ""} value={remark} multiline={true} rows={4}  onChange={(e) => setRemark(e.target.value)}/>
                </Box>
              </Stack>
              {data === "" && <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: '20px' }}>
                <Button sx={{ cursor: 'pointer', maxWidth: '200px' }} variant="contained" onClick={() => {

                  handelSubmit();
                }}>
                  Approve
                </Button>
                <Button sx={{ cursor: 'pointer', maxWidth: '200px', mx: 2 }} variant="contained" onClick={() => {
                  handelSubmit2();
                }}>
                  Reject
                </Button>
              </Box>}
            </Stack>
          </Card>


        </Container>

    </>
  );
}

