import React, {useMemo} from 'react';
import {useSettingsContext} from "../../components/settings";
import Container from "@mui/material/Container";
import CustomBreadcrumbs from "../../components/custom-breadcrumbs";
import {paths} from "../../routes/paths";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useSnackbar} from "../../components/snackbar";
import FormProvider, {RHFTextField} from "../../components/hook-form";
import { Box, Grid, Stack } from '@mui/material';
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Typography from '@mui/material/Typography';
import { useResponsive } from '../../hooks/use-responsive';
import Card from '@mui/material/Card';

function UpdatePassword() {
  const settings = useSettingsContext();
  const {enqueueSnackbar} = useSnackbar();
  const mdUp = useResponsive('up', 'md');
  const NewUpdateSchema = Yup.object().shape({
    currentPassword: Yup.string()
      .required('Current password is required'),
    newPassword: Yup.string()
      .notOneOf([Yup.ref('currentPassword')], 'New password must be different from the old password')
      .required('New password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], 'Confirm password must match the new password')
      .required('Confirm password is required'),
  });

  const defaultValues = useMemo(
    () => ({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(NewUpdateSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    reset,
    formState: {isSubmitting},
  } = methods;

  const onSubmit = handleSubmit(async (data) => {

    try {
      const res = JSON.parse(sessionStorage.getItem('res'))
      const response = await axios.put('https://interactapiverse.com/mahadevasth/shape/counsellor/update-password', {
        current_password: data.currentPassword,
        new_password: data.newPassword,
        counsellor_code: res.data.data.counsellor_code,
      });
      console.log(response)
      if (response.data.status == 200) {
      reset();
      enqueueSnackbar('Password Updated Successfully');
      }
      else{
      enqueueSnackbar(res.message);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      enqueueSnackbar('Error updating password', {variant: 'error'});
    }
  });
  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Update Password"
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {name: 'Update Password'},
          ]}
          sx={{
            mb: {xs: 3, md: 5},
          }}
        />
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
              <Grid md={4}>
                <Typography variant='h6' sx={{ mb: 0.5,paddingLeft:3 }}>
                  Password
                  Details
                </Typography>
              </Grid>
            <Grid xs={12} md={8}>
              <Card>
                <Stack spacing={3} sx={{ p: 3 }}>
                  <Grid xs={12} item>
                    <RHFTextField name="currentPassword" label="Current Password" fullWidth/>
                  </Grid>
                  <Box
                    columnGap={2}
                    rowGap={3}
                    display='grid'
                    gridTemplateColumns={{
                      xs: 'repeat(1, 1fr)',
                      md: 'repeat(2, 1fr)',
                    }}
                  >
                    {/*<RHFTextField name="currentPassword" label="Current Password" fullWidth/>*/}
                    <RHFTextField name="newPassword" label="New Password" fullWidth/>
                    <RHFTextField name="confirmPassword" label="Confirm Password" fullWidth/>
                  </Box>
                </Stack>
              </Card></Grid>
          </Grid>

          <LoadingButton type="submit" variant="contained" size="medium" loading={isSubmitting}
                         sx={{float: "right", mt: 3}}>
            Submit
          </LoadingButton>
        </FormProvider>
      </Container>
    </>
  );
}

export default UpdatePassword;
