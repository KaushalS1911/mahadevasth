import axios from 'axios';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Grid,
  Radio,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Backdrop,
  CircularProgress,
} from '@mui/material';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { paths } from '../../../routes/paths';
import { useRouter } from '../../../routes/hooks';
import { Controller } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { LoadingScreen } from '../../../components/loading-screen';
const RegistrationForm = ({ vendor_category }) => {
  const router = useRouter();
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [loading, setLoading] = useState(false);
  const handleStateChange = (event, newValue) => {
    // setStateOptions([])
    // setDistrictOptions([])
    setSelectedState(newValue);
    methods.setValue('state', newValue);
    methods.setValue('district', '');
    methods.setValue('branch', '');
  };
  const firmOptions = ['Partnership', 'Proprietary ', 'LLP', 'Public Limited', 'Other'];
  const modes = ['Retail outlet', 'Mobile van'];
  useEffect(() => {
    fetchStates();
  }, []);
  const data1 = stateOptions?.find((data) => data?.state_name === selectedState);
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
  const gstNumberRegex = /^([0][1-9]|[1-2][0-9]|3[0-5])[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
  const panNumberRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const millingTypeOptions = ['Dry', 'Wet', 'Both'];
  const MillerBlogSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    milling_type: Yup.string().required('Milling type is required'),
    type_of_firm: Yup.string().required('Type of firm is required'),
    confirm_password: Yup.string().min(6,"Minimum 6 character should be required")
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    password: Yup.string().min(6,"Minimum 6 character should be required")
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    contact_person: Yup.string().required('Contact Person is required'),
    gst_number: Yup.string()
      .matches(gstNumberRegex, 'Invalid GST number format')
      .required('GST number is required'),
    email: Yup.string().matches(emailRegex, 'Invalide email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    branch: Yup.string().required('Branch is required'),

    pan_number:  Yup.string()
      .matches(panNumberRegex, 'Invalid PAN number format')
      .required('PAN number is required'),
    procurement_area:Yup.string().required('Procurement area is required'),
    pincode:Yup.string().max(6,"Invalide pincode number") .required('Pincode is required'),

    phone_number: Yup.string().max(10,"Enter valid contact number").required('Phone Number is required'),
  });
  const DistributorBlogSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    capacity: Yup.string().required('Capacity is required'),
    mode_of_sale: Yup.string().required('Mode of sale is required'),
    area_of_opration: Yup.string().required('Area of opration is required'),
    type_of_firm: Yup.string().required('Type of firm is required'),
    confirm_password: Yup.string().min(6,"Minimum 6 character should be required")
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    password: Yup.string().min(6,"Minimum 6 character should be required")
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    contact_person: Yup.string().required('Contact Person is required'),
    gst_number: Yup.string()
      .required('GST number is required')
      .matches(gstNumberRegex, 'Invalid GST number format'),
    email: Yup.string().matches(emailRegex, 'Invalide email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    branch: Yup.string().required('Branch is required'),

    pan_number:  Yup.string()
      .required('PAN number is required')
      .matches(panNumberRegex, 'Invalid PAN number format'),
    procurement_area:Yup.string().required('Procurement area is required'),
    pincode:Yup.string().max(6,"Invalide pincode number") .required('Pincode is required'),

    phone_number: Yup.string().max(10,"Enter valid contact number").required('Phone Number is required'),
  });
  const SocietyBlogSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    confirm_password: Yup.string().min(6,"Minimum 6 character should be required")
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    password: Yup.string().min(6,"Minimum 6 character should be required")
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    contact_person: Yup.string().required('Contact Person is required'),
    gst_number: Yup.string()
      .matches(gstNumberRegex, 'Invalid GST number format')
      .required('GST number is required'),
    mil_dis_sub_roles:Yup.string().required('Sub category is required'),
    email: Yup.string().matches(emailRegex, 'Invalide email format').required('Email is required'),
    address: Yup.string().required('Address is required'),
    state: Yup.string().required('State is required'),
    district: Yup.string().required('District is required'),
    branch: Yup.string().required('Branch is required'),

    pan_number:  Yup.string()
      .matches(panNumberRegex, 'Invalid PAN number format')
      .required('PAN number is required'),
    procurement_area:Yup.string().required('Procurement area is required'),
    pincode:Yup.string().max(6,"Invalide pincode number") .required('Pincode is required'),

    phone_number: Yup.string().max(10,"Enter valid contact number").required('Phone Number is required'),
  });
  const defaultValues = {
    name: '',
    category: '',
    milling_type: '',
    mil_dis_sub_roles: '',
    type_of_firm: '',
    contact_person: '',
    phone_number: '',
    email: '',
    password: '',
    confirm_password: '',
    address: '',
    state: '',
    district: '',
    procurement_area: '',
    branch: '',
    pincode: '',
    pan_number: '',
    gst_number: '',
    mode: '',
    area_of_opration:'',
    mode_of_sale:'',
    capacity:''
  };
  const NewBlogSchema = vendor_category === "distributor" || vendor_category === "modern_trade" ? DistributorBlogSchema : vendor_category === "society_cooperative" ? SocietyBlogSchema : MillerBlogSchema
  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    const payload = {
      name: values.name || '',
      category: vendor_category || '',
      milling_type: values.milling_type || '',
      mil_dis_sub_roles: values.mil_dis_sub_roles || '',
      type_of_firm: values.type_of_firm || '',
      contact_person: values.contact_person || '',
      phone_number: values.phone_number || '',
      email: values.email || '',
      password: values.password || '',
      confirm_password: values.confirm_password || '',
      address: values.address || '',
      state: values.state || '',
      district: values.district || '',
      procurement_area: values.procurement_area || '',
      branch: values.branch || '',
      pincode: values.pincode || '',
      pan_number: values.pan_number || '',
      gst_number: values.gst_number || '',
      mode: '',
    };
    axios
      .post(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp`, payload)
      .then((res) => {
        if (res?.data?.status == '201') {
          enqueueSnackbar('Register Successfully');
          setLoading(false)
          router.push(paths.auth.jwt.login);
        }
      })
      .catch((err) => {
        console.log(err);
          setLoading(false)
        enqueueSnackbar('Something want wrong', { variant: 'error' });
      });
  });
  return (
   <>
     {loading ? (
       <Box
         sx={{
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           height: '80vh',
           backgroundColor:"white"
         }}
       >


         <LoadingScreen sx={{ margin: 'auto' }}/>
       </Box>
     ) : (<Box p={5} className="registerForm" sx={{ backgroundColor: 'white', borderRadius: '10px' }}>
       <Typography variant="h5" gutterBottom className="heading">
         Basic Information
       </Typography>
       <FormProvider onSubmit={onSubmit} methods={methods}>
         <Grid container spacing={3}>
           <Grid item xs={12} sm={6} md={3}>
             <RHFTextField
               name="name"
               label={
                 (vendor_category === 'distributor' || vendor_category === "modern_trade")
                   ? 'Distributor Name'
                   :( vendor_category === 'miller' || vendor_category === 'miller_distributor')
                   ? 'Milling Unit Name'
                   : 'Society Name'
               }
             />
           </Grid>
           {(vendor_category === 'miller' || vendor_category === 'miller_distributor' )&& (
             <Grid item xs={12} sm={6} md={3}>
               <RHFAutocomplete
                 name="milling_type"
                 type="milling_type"
                 label="Milling Type"
                 placeholder="Choose Milling Type"
                 fullWidth
                 options={millingTypeOptions.map((option) => option)}
                 getOptionLabel={(option) => option}
               />
             </Grid>
           )}
           {vendor_category !== 'society_cooperative' && (
             <Grid item xs={12} sm={3}>
               <RHFAutocomplete
                 name="type_of_firm"
                 label="Type of Firm"
                 placeholder="Choose Your firm"
                 fullWidth
                 options={firmOptions.map((option) => option)}
                 getOptionLabel={(option) => option}
               />
             </Grid>
           )}
           <Grid item xs={12} sm={6} md={3}>
             <RHFTextField name="contact_person" label="Contact Person" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
             <RHFTextField name="phone_number" label="Phone Number" type="number" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
             <RHFTextField name="email" label="Email" />
           </Grid>
           {(vendor_category === 'distributor' || vendor_category === "modern_trade" ) && (
             <>
               <Grid item xs={12} sm={6} md={3}>
                 <RHFTextField name="area_of_opration" label="Area of Opration" />
               </Grid>
               <Grid item xs={12} sm={6} md={3}>
                 <RHFTextField name="capacity" label="Capacity /day (MT)" />
               </Grid>
               <Grid item xs={12} sm={3}>
                 <RHFAutocomplete
                   name="mode_of_sale"
                   label="Mode of Sale"
                   placeholder="Choose mode of sale"
                   fullWidth
                   options={modes.map((option) => option)}
                   getOptionLabel={(option) => option}
                 />
               </Grid>
             </>
           )}
           <Grid item xs={12} sm={6} md={3}>
             <RHFTextField name="pan_number" label="PAN Number" />
           </Grid>
           <Grid item xs={12} sm={6} md={3}>
             <RHFTextField name="gst_number" label="GST Number" />
           </Grid>
           {vendor_category === 'society_cooperative' && (
             <Grid item xs={12}>
               <Controller
                 name="mil_dis_sub_roles"
                 control={control}
                 render={({ field }) => (
                   <Box>
                     <RadioGroup row aria-label="vendor" {...field}>
                       <FormControlLabel
                         value="own_distribution_own_mill"
                         control={<Radio />}
                         label="Own both (Mill & Distribution)"
                       />
                       <FormControlLabel
                         value="own_distribution_rent_mill"
                         control={<Radio />}
                         label="Own Distribution (Rent Mill)"
                       />
                       <FormControlLabel
                         value="cooperative_rent_mill"
                         control={<Radio />}
                         label="Co-operative (Rent Mill)"
                       />
                     </RadioGroup>
                     {errors.mil_dis_sub_roles && (
                       <Typography color="error">{errors.mil_dis_sub_roles.message}</Typography>
                     )}
                   </Box>
                 )}
               />
             </Grid>
           )}
         </Grid>
         <Typography variant="h5" gutterBottom className="heading" mt={2}>
           {` ${
             (vendor_category === 'distributor' || vendor_category === "modern_trade" || vendor_category === 'miller_distributor')
               ? 'Address of Proposed Milling Unit Premises'
               : vendor_category === 'miller'
               ? 'Address of Proposed Milling Unit Premises'
               : 'Address Information'
           }`}
         </Typography>
         <Grid container spacing={3}>
           <Grid item xs={12}>
             <RHFTextField name="address" label="Address" />
           </Grid>
           <Grid item xs={12} sm={4}>
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
           </Grid>
           <Grid item xs={12} sm={4}>
             <RHFAutocomplete
               name="district"
               label="District"
               placeholder="Choose Your District"
               fullWidth
               options={districtOptions.map((option) => option?.district)}
               getOptionLabel={(option) => option}
               disabled={!data1}
             />
           </Grid>
           <Grid item xs={12} sm={4}>
             <RHFTextField name="pincode" label="Pin Code" />
           </Grid>
           <Grid item xs={12} sm={4}>
             <RHFAutocomplete
               name="branch"
               label="Branch"
               placeholder="Choose Your Branch"
               fullWidth
               options={branchOptions.map((option) => option?.branch_name)}
               getOptionLabel={(option) => option}
               disabled={!data1}
             />
           </Grid>
           <Grid item xs={12} sm={6} md={4}>
             <RHFTextField name="procurement_area" label="Procurement area" />
           </Grid>
         </Grid>
         <Typography variant="h5" gutterBottom className="heading" mt={2}>
           Password
         </Typography>
         <Grid container spacing={3}>
           <Grid item xs={12} sm={6} md={4}>
             <RHFTextField type="password" name="password" label="Password" />
           </Grid>
           <Grid item xs={12} sm={6} md={4}>
             <RHFTextField type="password" name="confirm_password" label="Confirm Password" />
           </Grid>
         </Grid>
         <Box display="flex" justifyContent="flex-end" mt={3}>
           <Button type="submit" variant="contained" color="primary">
             SUBMIT
           </Button>
         </Box>
       </FormProvider>
     </Box>)}

   </>
  );
};
export default RegistrationForm;
