import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
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

export default function BasicInfo() {
  const settings = useSettingsContext();

  const { vendor } = useAuthContext();
  const [disable, setDisable] = useState(true);
  const vendor_category = vendor?.category;
  // subcategory
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const { profile } = useGetProfile();

  const data1 = stateOptions.find((data) => data?.state_name === selectedState);
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

  const defaultValues = {
    name: '',
    milling_type: '',
    mil_dis_sub_roles: '',
    type_of_firm: '',
    contact_person: '',
    phone_number: '',
    email: '',
    address: '',
    state: '',
    district: '',
    procurement_area: '',
    branch: '',
    pincode: '',
    pan_number: '',
    gst_number: '',
  };
  const methods = useForm({
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
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
      });
    }
  }, [profile, reset, vendor]);
  const onSubmit = handleSubmit(async (data) => {
    const payload = {
      ...data,
      csp_code: vendor.csp_code,
      updated_on: new Date().toISOString(),
      mode: 'test',
    };
    axios
      .put('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/update_info', payload)
      .then((res) => {
        enqueueSnackbar('Update successfully');
      })
      .catch((err) => {
        enqueueSnackbar('Something went wrong', { variant: 'error' });
      });
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
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Basic Information</Typography>


          <Box
            sx={{
              mt: 5,
              width: 1,
              height: 320,
              borderRadius: 2,
            }}
          >
            <FormProvider methods={methods} onSubmit={onSubmit}>
              <ToastContainer/>
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
                      Basic Information
                      <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                        Basic Information Input fields
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
                          vendor_category === 'distributor'
                            ? 'Distributor Name'
                            : (vendor_category === 'miller' || vendor_category === 'miller_distributor')
                            ? 'Milling Unit Name'
                            : 'Society Name'
                        }
                      />
                      {(vendor_category === 'miller' || vendor_category === 'miller_distributor') && (
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

                      {(vendor_category !== 'own_distribution_own_mill' &&
                        vendor_category !== 'own_distribution_rent_mill' &&
                        vendor_category !== 'cooperative_rent_mill') && (
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

                      <RHFTextField name="email" label="Email" disabled={disable}/>
                      <RHFTextField name="contact_person" label="Contact Person" disabled={disable}/>
                      <RHFTextField name="phone_number" label="Phone Number" disabled={disable}/>
                      {vendor_category === 'distributor' && (
                        <>
                          <RHFTextField name="area_of_Opration" label="Area of Opration"/>

                          <RHFTextField name="capacity" label="Capacity /day (MT)"/>

                          <RHFAutocomplete
                            name="mode"
                            label="Mode of Sale"
                            placeholder="Choose mode of sale"
                            fullWidth
                            options={modes.map((option) => option)}
                            getOptionLabel={(option) => option}
                          />
                        </>
                      )}
                      <RHFTextField name="pan_number" label="Pan Number" disabled={disable}/>
                      <RHFTextField name="gst_number" label="GST Number" disabled={disable}/>
                      {vendor_category === 'society_cooperative' && (
                        <RadioGroup row aria-label="vendor" name="mil_dis_sub_roles">
                          <Box sx={{ fontWeight: '500' }}>Society Cooperative Category :</Box>
                          {radio.map((data) => (
                            <FormControlLabel
                              checked={(data?.value).includes(profile?.mil_dis_sub_roles)}
                              value={data?.value}
                              control={<Radio/>}
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
                      <Box sx={{
                        mb: '30px',
                        mt: '10px',
                        fontWeight: '600',
                        fontSize: '18px',
                      }}>
                        {` ${
                          vendor_category === 'distributor' ||
                          vendor_category === 'miller_distributor'
                            ? 'Address of Proposed Milling Unit Premises'
                            : vendor_category === 'miller'
                            ? 'Address of Proposed Milling Unit Premises'
                            : 'Address Information'
                        }`}
                      </Box>
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
                        <RHFTextField name="address" label="Address" fullWidth disabled={disable}/>
                      </Box>
                      <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                        <RHFAutocomplete
                          name="state"
                          label="State"
                          disabled={disable}
                          placeholder="Choose Your State"
                          fullWidth
                          options={stateOptions.map((option) => option?.state_name)}
                          getOptionLabel={(option) => option}
                          onChange={handleStateChange}
                        />
                      </Box>
                      <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                        <RHFAutocomplete
                          name="district"
                          label="District"
                          placeholder="Choose Your District"
                          fullWidth
                          options={districtOptions.map((option) => option?.district)}
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
                          options={branchOptions.map((option) => option?.branch_name)}
                          getOptionLabel={(option) => option}
                          disabled={!data1}
                        />
                      </Box>
                      <Box gridColumn={{ xs: 'span 1', sm: 'span 1', md: 'span 2' }}>
                        <RHFTextField name="pincode" label="Pin Code" fullWidth disabled={disable}/>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
              <Stack display={'flex'} alignItems={'flex-end'} sx={{ mt: 3 }}>
                <Box>
                  <Button
                    color="inherit"
                    variant="outlined"
                    sx={{ mr: '20px' }}
                    onClick={() => setDisable((prevDisable) => !prevDisable)}
                  >
                    {disable ? 'Edit' : 'Cancel'}
                  </Button>
                  <LoadingButton
                    type="submit"
                    loading={isSubmitting}
                    variant="contained"
                    disabled={disable}
                  >
                    Save
                  </LoadingButton>
                </Box>
              </Stack>
            </FormProvider>
          </Box>

      </Container>
    </>
  );
}
