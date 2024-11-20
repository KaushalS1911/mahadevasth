import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useMemo, useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import axios from 'axios';
import { paths } from '../../routes/paths';
import { useRouter } from '../../routes/hooks';
import { useAuthContext } from '../../auth/hooks';
import { useResponsive } from '../../hooks/use-responsive';
import { DocumentListView } from '../upload/view';
import { LoadingScreen } from '../../components/loading-screen';

// ----------------------------------------------------------------------

export default function CspHeadNewEditForm({ currentProduct, distributor ,cspt}) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { vendor } = useAuthContext();
  const [disable, setDisable] = useState(distributor ? true : false);
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(false);

  const data1 = stateOptions.find((data) => data?.state_name === selectedState);
  const mdUp = useResponsive('up', 'md');

  const handleStateChange = (event, newValue) => {
    setSelectedState(newValue);
    methods.setValue('state', newValue);
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (data1 && data1.state_id) {
      fetchBranches(data1.state_id);
      fetchDistrict(data1.state_id);
    }
  }, [data1]);

  function fetchStates() {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state`).then((res) => {
      setStateOptions(res?.data?.data);
    });
  }

  function fetchBranches(stateId) {
    axios
      .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/${stateId}/branch`)
      .then((res) => {
        setBranchOptions(res?.data?.data);
      });
  }

  function fetchDistrict(stateId) {
    axios
      .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/${stateId}/district`)
      .then((res) => {
        setDistrictOptions(res?.data?.data);
      });
  }

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    contact_person: Yup.string().required('Contact person is required'),
    phone_number: Yup.string().required('Phone number is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email'),
    pan_number: Yup.string().required('PAN number is required'),
    gst_number: Yup.string().required('GST number is required'),
    type_of_firm: Yup.string().required('Type of firm is required'),
    address: Yup.string().required('Address is required'),
    procurement_area: Yup.string().required('Procurement area is required'),
    state: Yup.string().required('State is required'),
    branch: Yup.string().required('Branch is required'),
    district: Yup.string().required('District is required'),
    pincode: Yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  });

  const defaultValues = useMemo(
    () => ({
      name: distributor?.name || '',
      contact_person: distributor?.contact_person || '',
      phone_number: distributor?.phone_number || '',
      email: distributor?.email || '',
      pan_number: distributor?.pan_number || '',
      gst_number: distributor?.gst_number || '',
      type_of_firm: distributor?.type_of_firm || '',
      address: distributor?.address || '',
      state: distributor?.state || '',
      branch: distributor?.branch || '',
      district: distributor?.district || '',
      procurement_area: distributor?.procurement_area || '',
      pincode: distributor?.pincode || '',
    }),
    [distributor],
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, watch, setValue, handleSubmit, formState: { isSubmitting } } = methods;

  useEffect(() => {
    if (distributor) {
      reset(defaultValues);
    }
  }, [distributor, reset, defaultValues]);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      axios
        .post(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/partner_onboarding`, {
          ...data,
          onboarder_csp_code: vendor?.csp_code,
          category: vendor?.category,
          mode: 'test',
        })
        .then((res) => {
          if (res?.data?.status == '201') {
            enqueueSnackbar('Distributor added successfully');
            setLoading(false);
            router.push(paths.dashboard.distributor.distributor_list);
          }
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  });

  // const renderProperties = (
  //   <>
  //     {mdUp && (
  //       <Grid md={4}>
  //         <Typography variant="h6" sx={{ mb: 0.5 }}>
  //           Distributor's Personal
  //           Details
  //         </Typography>
  //         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //           Title, short description, image...
  //         </Typography>
  //       </Grid>
  //     )}
  //     <Grid xs={12} md={8}>
  //       <Card>
  //         <Stack spacing={3} sx={{ p: 3 }}>
  //           <Box
  //             columnGap={2}
  //             rowGap={3}
  //             display="grid"
  //             gridTemplateColumns={{
  //               xs: 'repeat(1, 1fr)',
  //               md: 'repeat(2, 1fr)',
  //             }}
  //           >
  //             <RHFTextField disabled={disable} name="name" label="Distributor Name"/>
  //             <RHFAutocomplete
  //               name="type_of_firm"
  //               label="Type of Firm"
  //               placeholder="Choose Your Firm"
  //               fullWidth
  //               options={['Partnership', 'Property', 'LLP', 'Public Limited', 'Other']}
  //               disabled={disable}
  //               getOptionLabel={(option) => option}
  //             />
  //             <RHFTextField disabled={disable} name="contact_person" label="Contact Person"/>
  //             <RHFTextField disabled={disable} name="phone_number" label="Phone Number"/>
  //             <RHFTextField disabled={disable} name="email" label="Email"/>
  //             <RHFTextField disabled={disable} name="pan_number" label="PAN Number"/>
  //             <RHFTextField disabled={disable} name="gst_number" label="GST Number"/>
  //           </Box>
  //         </Stack>
  //       </Card>
  //     </Grid>
  //   </>
  // );
  //
  // const addressInfo = (
  //   <>
  //     {mdUp && (
  //       <Grid md={4}>
  //         <Typography variant="h6" sx={{ mb: 0.5 }}>
  //           Address Information
  //         </Typography>
  //         <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  //           Address, state, district...
  //         </Typography>
  //       </Grid>
  //     )}
  //     <Grid xs={12} md={8}>
  //       <Card>
  //         <Stack spacing={3} sx={{ p: 3 }}>
  //           <Box
  //             columnGap={2}
  //             rowGap={3}
  //             display="grid"
  //             gridTemplateColumns={{
  //               xs: 'repeat(1, 1fr)',
  //               md: 'repeat(2, 1fr)',
  //             }}
  //           >
  //             <RHFTextField name="address" label="Address" disabled={disable}/>
  //             <RHFAutocomplete
  //               name="state"
  //               disabled={disable}
  //               label="State"
  //               placeholder="Choose Your State"
  //               fullWidth
  //               options={stateOptions.map((option) => option?.state_name)}
  //               getOptionLabel={(option) => option}
  //               onChange={handleStateChange}
  //             />
  //             <RHFAutocomplete
  //               name="branch"
  //               label="Branch"
  //               placeholder="Choose Your Branch"
  //               fullWidth
  //               options={branchOptions.map((option) => option?.branch_name)}
  //               getOptionLabel={(option) => option}
  //               disabled={!data1}
  //             />
  //             <RHFAutocomplete
  //               name="district"
  //               label="District"
  //               placeholder="Choose Your District"
  //               fullWidth
  //               options={districtOptions.map((option) => option?.district)}
  //               getOptionLabel={(option) => option}
  //               disabled={!data1}
  //             />
  //             <RHFTextField disabled={disable} name="procurement_area" label="Procurement Area"/>
  //             <RHFTextField disabled={disable} name="pincode" label="Pin Code"/>
  //           </Box>
  //         </Stack>
  //       </Card>
  //     </Grid>
  //   </>
  // );
  const table = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Document list
          </Typography>
        </Grid>
      )}
      <Grid xs={12} md={12}>
        <DocumentListView csp={distributor?.csp_code}/>
      </Grid>
    </>
  );

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'white',
          }}
        >


          <LoadingScreen sx={{ margin: 'auto' }}/>
        </Box>
      ) : (
        <>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Grid container spacing={3}>
              {/*{renderProperties}*/}

              {/*{addressInfo}*/}

              <Grid container spacing={2}>
                <Grid xs={12} md={4} item>
                  <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                    <Box
                      sx={{
                        mb: {md: '30px' },
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
                <Grid item xs={12} md={8}>
                  <Box sx={{ my: { md:8 } }}>

                    <Box sx={{
                      ml: { xs: 0, md: 10 },
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                      <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                          <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Distributor name :</Box><Box sx={{ ml: 1 }}>{distributor?.name}</Box>
                        </Box>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                          <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Type of Firm :</Box><Box sx={{ ml: 1 }}>{distributor?.type_of_firm}</Box>
                        </Box>
                      </Grid>

                      <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                          <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Email :</Box><Box sx={{ ml: 1 }}>{distributor?.email}</Box>
                        </Box>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                          <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Contact Person :</Box><Box sx={{ ml: 1 }}>{distributor?.contact_person}</Box>
                        </Box>
                      </Grid>
                      {/*<Box sx={{ width: '100%', display: 'flex', mt: 2 }}>*/}
                      <Grid xs={12} md={6}> <Box sx={{ display: {md:'flex' } }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Phone Number :</Box><Box sx={{ ml: 1 }}>{distributor?.phone_number}</Box>
                      </Box></Grid>
                      <Grid xs={12} md={6}> <Box sx={{ display: {md:'flex' } }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Pan Number :</Box><Box sx={{ ml: 1 }}>{distributor?.pan_number}</Box>
                      </Box></Grid>
                      <Grid xs={12} md={6}><Box sx={{ display: {md:'flex' } }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}> GST Number:</Box><Box sx={{ ml: 1 }}>{distributor?.gst_number}</Box>
                      </Box>
                      </Grid>
                      {/*</Box>*/}


                    </Box>

                  </Box>
                </Grid>
                <Grid xs={12} md={4} item>
                  <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                    <Box
                      sx={{
                        mb: { md:'30px' },
                        mt: '10px',
                        fontWeight: '600',
                        fontSize: '18px',
                      }}
                    >
                      Address Information
                      <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                        State District Branch fields
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={8} xs={12}>
                  <Box sx={{ my: {md: 8 }}}>

                    <Box sx={{
                      ml: { xs: 0, md: 10 },
                      mt: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}>
                      <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                          <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Address :</Box><Box sx={{ ml: 1 }}>{distributor?.address}</Box>
                        </Box>
                      </Grid>

                      <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                          <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>State :</Box><Box sx={{ ml: 1 }}>{distributor?.state}</Box>
                        </Box>
                      </Grid>
                      <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                          <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Branch :</Box><Box sx={{ ml: 1 }}>{distributor?.branch}</Box>
                        </Box>
                      </Grid>
                      {/*<Box sx={{ width: '100%', display: 'flex', mt: 2 }}>*/}
                      <Grid xs={12} md={6}> <Box sx={{ display: {md:'flex' } }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>District :</Box><Box sx={{ ml: 1 }}>{distributor?.district}</Box>
                      </Box></Grid>
                      <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Procurement Area :</Box><Box sx={{ ml: 1 }}>{distributor?.procurement_area}</Box>
                      </Box>
                      </Grid>  <Grid xs={12} md={6}>
                        <Box sx={{ display: {md:'flex' } }}>
                        <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Pin Code :</Box><Box sx={{ ml: 1 }}>{distributor?.pincode}</Box>
                      </Box>
                      </Grid>

                      {/*</Box>*/}


                    </Box>

                  </Box>
                </Grid>
              </Grid>
              {!distributor && <Grid xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                  <Button variant="contained" type="submit">Submit</Button>
                </Box>
              </Grid>}
            </Grid>
          </FormProvider>
        </>
      )
      }
    </>
  );
}

CspHeadNewEditForm.propTypes = {
  currentProduct: PropTypes.object,
  distributor: PropTypes.object,
};
