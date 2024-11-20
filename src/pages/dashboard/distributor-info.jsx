import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAuthContext } from '../../auth/hooks';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import FormProvider from 'src/components/hook-form/form-provider';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings/context';
import { Helmet } from 'react-helmet-async';
import { RHFTextField } from 'src/components/hook-form';
import { enqueueSnackbar } from 'notistack';
import { useGetProfile } from '../../api/basic-info';
import { paths } from '../../routes/paths';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetDistributor } from '../../api/vendor';
import { LoadingScreen } from '../../components/loading-screen';
import { useRouter } from '../../routes/hooks';

function DistributorInfo(props) {
  const settings = useSettingsContext();
  const router = useRouter()
const [profile,setProfile] = useState({})
  const { vendor } = useAuthContext();
  const [disable, setDisable] = useState(false);
  const [loading,setLoading] = useState(false)
  const vendor_category = vendor?.category;
  // subcategory
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    getMiller_dis();
  }, []);
  function getMiller_dis() {
    setLoading(true)
    axios
      .get(
        `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor?.csp_code}/sub_mil_dist`
      )
      .then((res) => {
        setProfile(res?.data?.data[0]);
        setLoading(false)
      })
      .catch((err) => console.error(err));
  }
  const data1 = stateOptions.find((data) => data?.state_name === selectedState);
  const handleStateChange = (event, newValue) => {
    setSelectedState(newValue);
    methods.setValue('state', newValue);
  };
  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    contact_person: Yup.string().required('Contact person is required'),
    phone_number: Yup.string().required('Phone number is required'),
    area_of_opration: Yup.string().required('Area of opration is required'),
    mode_of_sale: Yup.string().required('Mode of sale is required'),
    capacity: Yup.string().required('Capacity per day is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email'),
    pan_number: Yup.string().required('PAN number is required'),
    gst_number: Yup.string().required('GST number is required'),
    type_of_firm: Yup.string().required('Type of firm is required'),
    address: Yup.string().required('Address is required'),
    // procurement_area: Yup.string().required('Procurement area is required'),
    state: Yup.string().required('State is required'),
    branch: Yup.string().required('Branch is required'),
    district: Yup.string().required('District is required'),
    pincode: Yup.string().required('Pincode is required').matches(/^[0-9]{6}$/, 'Pincode must be 6 digits'),
  });
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

  const defaultValues = {
    name: '',
    milling_type: '',
    mil_dis_sub_roles: '',
    type_of_firm: '',
    contact_person: '',
    phone_number: '',
    email: '',
    mode_of_sale:'',
    address: '',
    state: '',
    capacity:'',
    area_of_opration:'',
    district: '',
    procurement_area: '',
    branch: '',
    pincode: '',
    pan_number: '',
    gst_number: '',
  };
  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;
  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        milling_type: profile.milling_type || '',
        mil_dis_sub_roles: profile.mil_dis_sub_roles || '',
        type_of_firm: profile.type_of_firm || '',
        contact_person: profile.contact_person || '',
        phone_number: profile.phone_number || '',
        email: profile.email || '',
        password: profile.password || '',
        confirm_password: profile.confirm_password || '',
        address: profile.address || '',
        state: profile.state || '',
        district: profile.district || '',
        procurement_area: profile.procurement_area || '',
        branch: profile.branch || '',
        pincode: profile.pincode || '',
        pan_number: profile.pan_number || '',
        gst_number: profile.gst_number || '',
        capacity:profile.capacity || '',
        area_of_opration:profile.area_of_opration || '',
        mode_of_sale :profile.mode_of_sale || '',
        // name:'',
        // milling_type:'',
        // mil_dis_sub_roles:'',
        // type_of_firm:'',
        // contact_person:'',
        // phone_number:'',
        // email:'',
        // password:'',
        // confirm_password:'',
        // address:'',
        // state:'',
        // district:'',
        // procurement_area:'',
        // branch:'',
        // pincode:'',
        // pan_number:'',
        // gst_number:'',
      });
    }
  }, [profile, reset, vendor]);
  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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
            reset(defaultValues)
            // setLoading(false);
            router.push(paths.dashboard.distributor_info);
          }else {
            enqueueSnackbar(res.data.message,{variant:'error'});

          }
        });
    } catch (err) {
      console.log(err);
      // setLoading(false);
      enqueueSnackbar('Something went wrong', { variant: 'error' });
    }
  });
  const radio = [
    { label: 'Co-operative (Rent Mill)', value: 'cooperative_rent_mill' },
    { label: 'Own Distribution and Rent Mill', value: 'own_distribution_rent_mill' },
    { label: 'Own Mill and Distribution', value: 'own_distribution_own_mill' },
  ];
  const firmOptions = ['Partnership', 'Proprietary ', 'LLP', 'Public Limited', 'Other'];
  const modes = ['Retail outlet', 'Mobile van'];
  const millingTypeOptions = ['Dry', 'Wet', 'Both'];
  return (
    <>
      <Helmet>
        <title> Dashboard | Basic Info</title>
      </Helmet>
      {
        loading ? <LoadingScreen /> :
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4">Add Distrubutor Information</Typography>
        <Box
          sx={{
            mt: 5,
            width: 1,
            height: 320,
            borderRadius: 2,
          }}
        >
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <ToastContainer />
            <Grid container>
              <Grid item md={4}>
                <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                  <Box
                    sx={{
                      mb: '30px',
                      mt: '10px',
                      fontWeight: '600',
                      fontSize: '18px',
                    }}
                  >
                    Distributor Information
                    <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                      Distributor Information Input fields
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid md={8} xs={12} item>
                <Card sx={{ p: 3 }}>
                  <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(3, 1fr)',
                    }}
                  >
                    <RHFTextField
                      name="name"
                      disabled={disable}
                      label={
                        vendor_category === 'distributor' ||
                        vendor_category === 'miller_distributor'
                          ? 'Distributor Name'
                          : vendor_category === 'miller'
                          ? 'Milling Unit Name'
                          : 'Society Name'
                      }
                    />
                    {vendor_category === 'miller' && (
                      <RHFAutocomplete
                        name="milling_type"
                        type="milling_type"
                        label="Milling Type"
                        disabled={disable}
                        placeholder="Choose Milling Type"
                        fullWidth
                        options={millingTypeOptions.map((option) => option)}
                        getOptionLabel={(option) => option}
                      />
                    )}

                    {vendor_category !== 'society_cooperative' && (
                      <RHFAutocomplete
                        disabled={disable}
                        name="type_of_firm"
                        label="Type of Firm"
                        placeholder="Choose Your firm"
                        fullWidth
                        options={firmOptions.map((option) => option)}
                        getOptionLabel={(option) => option}
                      />
                    )}

                    <RHFTextField name="email" label="Email" disabled={disable} />
                    <RHFTextField name="contact_person" label="Contact Person" disabled={disable} />
                    <RHFTextField name="phone_number" label="Phone Number" disabled={disable} />
                    {(vendor_category === 'distributor' ||
                      vendor_category === 'miller_distributor') && (
                      <>
                        <RHFTextField name="area_of_opration" label="Area of Opration" />

                        <RHFTextField name="capacity" label="Capacity /day (MT)" />

                        <RHFAutocomplete
                          name="mode_of_sale"
                          label="Mode of Sale"
                          placeholder="Choose mode of sale"
                          fullWidth
                          options={modes.map((option) => option)}
                          getOptionLabel={(option) => option}
                        />
                      </>
                    )}
                    <RHFTextField name="pan_number" label="Pan Number" disabled={disable} />
                    <RHFTextField name="gst_number" label="GST Number" disabled={disable} />
                    {vendor_category === 'society_cooperative' && (
                      <RadioGroup row aria-label="vendor" name="mil_dis_sub_roles">
                        <Box sx={{ fontWeight: '500' }}>Society Cooperative Category :</Box>
                        {radio.map((data) => (
                          <FormControlLabel
                            checked={(data?.value).includes(profile?.mil_dis_sub_roles)}
                            value={data?.value}
                            control={<Radio />}
                            label={data?.label}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: '80px' }}>
              <Grid item md={4}>
                <Box sx={{ ml: { md: '60px', xs: '0' }, mt: '60px' }}>
                  <Box
                    sx={{
                      mb: '30px',
                      mt: '10px',
                      fontWeight: '600',
                      fontSize: '18px',
                    }}
                  >
                    <Typography variant="h6" gutterBottom className="heading" mt={2}>
                      { 'Address of Proposed Distributor Premises'}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid md={8} xs={12} item>
                <Card sx={{ p: 3 }}>
                  <Box
                    rowGap={3}
                    columnGap={2}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(2, 1fr)',
                      md: 'repeat(4, 1fr)',
                    }}
                  >
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 2', md: 'span 4' }}>
                      <RHFTextField name="address" label="Address" fullWidth disabled={disable} />
                    </Box>
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                      <Controller
                        name="state"
                        control={control}
                        render={({ field }) => (
                          <RHFAutocomplete
                            {...field}
                            label="State"
                            placeholder="Choose Your State"
                            fullWidth
                            options={stateOptions.map((option) => option?.state_name)}
                            getOptionLabel={(option) => option}
                            onChange={(event, newValue) => {
                              field.onChange(newValue);
                              handleStateChange(event, newValue);
                            }}
                          />
                        )}
                      />
                    </Box>
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                      <RHFAutocomplete
                        name="district"
                        label="District"
                        placeholder="Choose Your District"
                        fullWidth
                        options={districtOptions?.map((option) => option?.district)}
                        getOptionLabel={(option) => option}
                        disabled={!data1}
                      />
                    </Box>
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                      <RHFAutocomplete
                        name="branch"
                        label="Branch"
                        placeholder="Choose Your Branch"
                        fullWidth
                        options={branchOptions?.map((option) => option?.branch_name)}
                        getOptionLabel={(option) => option}
                        disabled={!data1}
                      />
                    </Box>
                    <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                      <RHFTextField name="pincode" label="Pin Code" fullWidth disabled={disable} />
                    </Box>
                  </Box>
                </Card>
              </Grid>
            </Grid>
            <Stack display={'flex'} alignItems={'flex-end'} sx={{ mt: 3 }}>
              <Box>
                {/*<Button*/}
                {/*  color="inherit"*/}
                {/*  variant="outlined"*/}
                {/*  sx={{ mr: '20px' }}*/}
                {/*  onClick={() => setDisable((prevDisable) => !prevDisable)}*/}
                {/*>*/}
                {/*  {disable ? 'Edit' : 'Cancel'}*/}
                {/*</Button>*/}
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                  disabled={profile}
                >
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </FormProvider>
        </Box>
      </Container>
      }

    </>
  );
};

export default DistributorInfo;
