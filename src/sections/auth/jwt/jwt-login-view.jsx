import React, { useEffect, useState } from 'react';
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
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
import { LoadingScreen } from '../../../components/loading-screen';

export default function JwtLoginView() {
  const { login } = useAuthContext();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');
  const searchParams = useSearchParams();
  const [society, setSociety] = useState('');
  const [subSociety, setSubSociety] = useState('');
  const returnTo = searchParams.get('returnTo');
  const [loading, setLoading] = useState(false);
//   const [session,setSession] = useState([])
//   console.log(session,"shshs");
// useEffect(() => {
//   const session1 = JSON.parse(sessionStorage.getItem('res'));
//   setSession(session1)
//   if (session?.data) {
//     setLoading(false);
//   }
// },[session])
  const LoginSchema = Yup.object().shape({
    phone_number: Yup.string().required('Phone number is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = {
    phone_number: '',
    password: '',
    role: '',
  };
  const validation = LoginSchema;
  const methods = useForm({
    resolver: yupResolver(validation),
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
    setLoading(true);
    console.log("dadada : ",data)
    try {
      // await login?.({ ...data, category: society === 'society' ? subSociety : data.category });
      localStorage.setItem('login_type', 'other-login');
      setLoading(false)
    } catch (error) {
      console.error(error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
      setLoading(false);
    }

  });

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
        ) :
        <Container maxWidth="sm">
          <ToastContainer/>
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
                  <img src={logo} alt="BootstrapBrain Logo"/>
                </Box>
                <FormProvider onSubmit={onSubmit} methods={methods}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <RHFTextField name="phone_number" label="Phone Number"/>
                    </Grid>
                    <Grid item xs={12} sx={{ my: '10px' }}>
                      <RHFTextField name="password" label="Password" type="password"/>
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                          <Box>
                            <RadioGroup
                              {...field}
                              row
                              onChange={(event) => {
                                field.onChange(event);
                                setSociety(event.target.value);
                              }}
                            >
                              <FormControlLabel
                                value="admin"
                                control={<Radio/>}
                                label="Admin"
                              />
                              <FormControlLabel
                                value="counsellor"
                                control={<Radio/>}
                                label="Counsellor"
                              />
                            </RadioGroup>
                            {errors.category && (
                              <Typography color="error">{errors.category.message}</Typography>
                            )}
                          </Box>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        fullWidth
                        type="submit"
                      >
                        Sign In
                      </Button>
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*  <Stack direction="row" sx={{ mt: 2, justifyContent: 'center' }} spacing={1}>*/}
                    {/*    <Typography variant="subtitle2">Become NCCF CSP?</Typography>*/}
                    {/*    <Link*/}
                    {/*      component={RouterLink}*/}
                    {/*      href={paths.auth.jwt.register}*/}
                    {/*      variant="subtitle2"*/}
                    {/*    >*/}
                    {/*      Create an account*/}
                    {/*    </Link>*/}
                    {/*  </Stack>*/}
                    {/*</Grid>*/}
                  </Grid>
                </FormProvider>
              </CardContent>
            </Card>
          </Box>
        </Container>
      }
    </>
  );
}
