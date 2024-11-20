import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/system';
import { Button, Card, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useGetBranchInfo } from '../../api/basic-info';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthContext } from '../../auth/hooks';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';
function BranchBasicInfo(props) {
  const {branchProfile} = useGetBranchInfo()
const {vendor} = useAuthContext()
  const password = Yup.object().shape({
    confirm_password: Yup.string().min(6,"Minimum 6 character should be required")
      .oneOf([Yup.ref('password'), null], 'Password does not match')
      .required('Confirm password is required'),
    password: Yup.string().min(6,"Minimum 6 character should be required")
      .oneOf([Yup.ref('password'), null], "Password does not match")
      .required('Confirm password is required'),
  })
  const defaultValues ={
    password: '',
    confirm_password: '',
  }
  const methods = useForm({
    resolver: yupResolver(password),
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
    console.log(values);
    const payload = {
      branch:vendor?.branch,
      new_password:values?.password,
      confirm_new_password:values.confirm_password
    }
      axios.put('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/update-password',payload)
        .then((res) => {
          enqueueSnackbar(res?.data?.message);
          reset(defaultValues)
        })
        .catch((err) => console.log(err))
  })
  return (
    <>
      <Helmet>
        <title> Dashboard | Basic Info</title>
      </Helmet>
      <Container maxWidth={ 'xl'}>
        <Typography variant="h4"> Branch Information</Typography>
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
           <Grid item md={8} xs={12} sx={{my:4}}>
         <Card sx={{paddingLeft:5,py:2}}>
             <Grid xs={12} my={2}>
               <Box sx={{ display: {md:'flex' } }}>
                 <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Branch :</Box><Box sx={{ ml: 1 }}>{branchProfile.branch}</Box>
               </Box>
             </Grid>
             <Grid xs={12} my={2}>
               <Box sx={{ display: {md:'flex' } }}>
                 <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Email :</Box><Box sx={{ ml: 1 }}>{branchProfile.email}</Box>
               </Box>
             </Grid>
             <Grid xs={12} my={2}>
               <Box sx={{ display: {md:'flex' } }}>
                 <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Phone Number :</Box><Box sx={{ ml: 1 }}>{branchProfile.phone_number}</Box>
               </Box>
             </Grid>
             <Grid xs={12} my={2}> <Box sx={{ display: {md:'flex' } }}>
               <Box sx={{ fontSize: 17, fontWeight: 'bold' }}>Manager :</Box><Box sx={{ ml: 1 }}>{branchProfile.manager}</Box>
             </Box>
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
               Update Password
                <Typography sx={{ fontSize: '13px', color: '#637381' }}>
                 Password , Confirm Password
                </Typography>
              </Box>
            </Box>
          </Grid>
           <Grid item md={8} xs={12} sx={{my:4}}>
         <Card sx={{paddingLeft:5,py:2}}>
           <FormProvider onSubmit={onSubmit} methods={methods}>
           <Grid container spacing={3}>
             <Grid item xs={12} sm={6} md={4}>
               <RHFTextField type="password" name="password" label="Password" />
             </Grid>
             <Grid item xs={12} sm={6} md={4}>
               <RHFTextField type="password" name="confirm_password" label="Confirm Password" />
             </Grid>
           </Grid>
             <Box display="flex" justifyContent="flex-end" mt={3} marginRight={3}>
               <Button type="submit" variant="contained" >
                 SUBMIT
               </Button>
             </Box>
           </FormProvider>
         </Card>
           </Grid>
          </Grid>
      </Container>

    </>
  );
}

export default BranchBasicInfo;
