import React, { useEffect, useState } from 'react';
import { useGetProfile } from '../../api/basic-info';
import { Container } from '@mui/system';
import { Card, Grid, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useAuthContext } from '../../auth/hooks';
import axios from 'axios';
import { LoadingScreen } from '../../components/loading-screen';

function MillerBasicInfo({profile,miller_disprofile,vendor,loading}) {



  return (
    <>
      {loading ? <LoadingScreen /> :
      <>
        <Container maxWidth="xl">
          {vendor?.category === "miller_distributor" && <Typography variant="h4">Miller's Information</Typography>}
          <Grid container>
            <Grid item md={4} xs={12}>
              <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                <Box
                  sx={{
                    mb: '30px',
                    mt: '10px',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  Basic Information
                  <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                    Basic Information Input fields
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={8} xs={12} sx={{ my: 4 }}>
              <Card sx={{ paddingLeft: 5, py: 3, width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Name:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.name}</Box>
                    </Box>
                  </Grid>
                  { (vendor?.category === 'miller' || vendor?.category === 'miller_distributor') &&<Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Milling Type:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.milling_type}</Box>
                    </Box>
                  </Grid>}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Type Of Firm:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.type_of_firm}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Email:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.email}</Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Contact Person:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.contact_person}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Phone Number:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.phone_number}</Box>
                    </Box>
                  </Grid>
                  {vendor?.category === 'distributor' && (<>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Area of Opration:</Box>
                        <Box sx={{ ml: 1 }}>{profile?.area_of_Opration}</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{display: 'flex'}}>
                        <Box sx={{fontSize: 17, fontWeight: 'bold'}}>Capacity /day (MT):</Box>
                        <Box sx={{ml: 1}}>{profile?.capacity}</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{display: 'flex'}}>
                        <Box sx={{fontSize: 17, fontWeight: 'bold'}}>Mode of Sale:</Box>
                        <Box sx={{ml: 1}}>{profile?.mode}</Box>
                      </Box>
                    </Grid></>)}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Pan Number:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.pan_number}</Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>GST Number:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.gst_number}</Box>
                    </Box>
                  </Grid>

                  { vendor?.category === 'society_cooperative' && <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Society Cooperative Category:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.mil_dis_sub_roles}</Box>
                    </Box>
                  </Grid>}

                </Grid>
              </Card>
            </Grid>

            <Grid item md={4} xs={12}>
              <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                <Box
                  sx={{
                    mb: '30px',
                    mt: '10px',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  Address Information
                  <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                    State , District , Pin Code
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={8} xs={12} sx={{ my: 4 }}>
              <Card sx={{ paddingLeft: 5, py: 3, width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Address:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.address}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>State:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.state}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>District:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.district}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Branch:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.branch}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Pin Code:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.pincode}</Box>
                    </Box>
                  </Grid>


                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
        {(miller_disprofile && vendor?.category === "miller_distributor") &&
        <Container maxWidth="xl">
          <Typography variant="h4">Distributor's Information</Typography>
          <Grid container>
            <Grid item md={4} xs={12}>
              <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                <Box
                  sx={{
                    mb: '30px',
                    mt: '10px',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  Basic Information
                  <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                    Basic Information Input fields
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={8} xs={12} sx={{ my: 4 }}>
              <Card sx={{ paddingLeft: 5, py: 3, width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Name:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.name}</Box>
                    </Box>
                  </Grid>
                  {(vendor?.category === 'miller' || vendor?.category === 'miller_distributor') &&
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Area of Opration:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.area_of_opration}</Box>
                    </Box>
                  </Grid>}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Type Of Firm:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.type_of_firm}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Capacity:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.capacity}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Mode of Sale:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.mode_of_sale}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Email:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.email}</Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Contact Person:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.contact_person}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Phone Number:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.phone_number}</Box>
                    </Box>
                  </Grid>
                  {vendor?.category === 'distributor' && (<>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Area of Opration:</Box>
                        <Box sx={{ ml: 1 }}>{miller_disprofile?.area_of_Opration}</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Capacity /day (MT):</Box>
                        <Box sx={{ ml: 1 }}>{miller_disprofile?.capacity}</Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Mode of Sale:</Box>
                        <Box sx={{ ml: 1 }}>{miller_disprofile?.mode}</Box>
                      </Box>
                    </Grid></>)}
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Pan Number:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.pan_number}</Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>GST Number:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.gst_number}</Box>
                    </Box>
                  </Grid>

                  {vendor?.category === 'society_cooperative' && <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Society Cooperative Category:</Box>
                      <Box sx={{ ml: 1 }}>{miller_disprofile?.mil_dis_sub_roles}</Box>
                    </Box>
                  </Grid>}

                </Grid>
              </Card>
            </Grid>

            <Grid item md={4} xs={12}>
              <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                <Box
                  sx={{
                    mb: '30px',
                    mt: '10px',
                    fontWeight: '600',
                    fontSize: '18px',
                  }}
                >
                  Address Information
                  <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                    State , District , Pin Code
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item md={8} xs={12} sx={{ my: 4 }}>
              <Card sx={{ paddingLeft: 5, py: 3, width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Address:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.address}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>State:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.state}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>District:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.district}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Branch:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.branch}</Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Pin Code:</Box>
                      <Box sx={{ ml: 1 }}>{profile?.pincode}</Box>
                    </Box>
                  </Grid>


                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>}</>
      }
    </>
  );
}

export default MillerBasicInfo;
