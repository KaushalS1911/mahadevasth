import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Container,
  Card,
  CardContent,
  Box,
  Grid,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../../../assets/images/header/logo-dark.png';
import Link from '@mui/material/Link';
import { RouterLink } from '../../../routes/components';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useAuthContext } from '../../../auth/hooks';
import { useRouter, useSearchParams } from '../../../routes/hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import { PATH_AFTER_LOGIN } from '../../../config-global';
import { paths } from '../../../routes/paths';
import { RHFTextField, RHFRadioGroup, RHFCheckbox } from '../../../components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
// ----------------------------------------------------------------------
export default function JwtHeadOfficeLoginView() {
  const { ho_login } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const LoginSchema = Yup.object().shape({
    branch_code: Yup.string().required('Branch code is required'),
    password: Yup.string().required('Password is required'),
    category: Yup.string().required('Category is required'),
  });
  const defaultValues = {
    branch_code: '',
    password: '',
    category: '',
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {

    try {
      await ho_login?.(data);
      localStorage.setItem("login_type","head-office")
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });
  return (
    <>
      <Container maxWidth="sm">
        <ToastContainer />
        <Box display="flex" justifyContent="center" alignItems="center" height={'100vh'}>
          <Card sx={{ mt: 5 }}>
            <CardContent
              sx={{
                pb: '70px !important',
                pt: '50px !important',
                px: '30px',
              }}
            >
              <Box
                display="flex"
                justifyContent="center"
                mb={3}
                sx={{ height: '130px', mb: '60px' }}
              >
                <img src={logo} alt="BootstrapBrain Logo" />
              </Box>
              <FormProvider onSubmit={onSubmit} methods={methods}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <RHFTextField name="branch_code" label="Branch Code" />
                  </Grid>
                  <Grid item xs={12} sx={{ my: '10px' }}>
                    <RHFTextField name={'password'} label={'Password'} type={'password'} />
                  </Grid>

                  <Grid item xs={12} >

                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Box>
                          <RadioGroup row aria-label="vendor" {...field}>
                            <FormControlLabel
                              value="head_office"
                              control={<Radio />}
                              label="Head Office"
                            />
                            <FormControlLabel
                              value="branch"
                              control={<Radio />}
                              label="Branch"
                            />

                          </RadioGroup>
                          {errors.category && (
                            <Typography color="error">{errors.category.message}</Typography>
                          )}
                        </Box>
                      )}
                    />
                  </Grid>

                  {/*<Grid item xs={12}>*/}
                  {/*  <RHFRadioGroup*/}
                  {/*    name={'category'}*/}
                  {/*    row*/}
                  {/*    options={[*/}
                  {/*      { label: 'Miller', value: 'miller' },*/}
                  {/*      { label: 'Distributor', value: 'distributor' },*/}
                  {/*      { label: 'Miller + Distributor', value: 'miller_distributor' },*/}
                  {/*      { label: 'Society/Co-operative', value: 'society_cooperative' },*/}
                  {/*    ]}*/}
                  {/*  />*/}
                  {/*</Grid>*/}
                  {/*<Grid item xs={12}>*/}
                  {/*  <RHFCheckbox name={'remember_me'} label={'Keep me logged in'} />*/}
                  {/*</Grid>*/}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size={'large'}
                      color="primary"
                      fullWidth
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Stack direction="row" sx={{ mt: 2, justifyContent: 'center' }} spacing={1}>
                      <Typography variant="subtitle2">Become NCCF CSP?</Typography>
                      <Link
                        component={RouterLink}
                        href={paths.auth.jwt.register}
                        variant="subtitle2"
                      >
                        Create an account
                      </Link>
                    </Stack>
                  </Grid>
                </Grid>
              </FormProvider>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
