import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { handleDoctypeLabel } from 'src/_mock';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import { TextField } from '@mui/material';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';
import { useRouter } from '../../routes/hooks';
import { paths } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function InventoryQuickEditForm({
                                            currentUser,
                                            open,
                                            onClose,
                                            setOpen,
allData
                                          }) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()
  const [approvalQuantity, setApprovalQuantity] = useState('');
  const [error, setError] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [commodity,setCommodity] = useState([])
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const NewUserSchema = Yup.object().shape({
    commodity: Yup.object().required('Commodity is required'),
    state: Yup.string().required('State is required'),
    quantity: Yup.string().required('Quantity is required'),
  });
  const data1 = stateOptions?.find((data) => data?.state_name === selectedState);
  useEffect(() => {
    if (data1 && data1.state_id) {
      fetchBranches(data1.state_id);
    }
  }, [data1]);

  function fetchBranches(stateId) {
    axios
      .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/${stateId}/branch`)
      .then((res) => {
        setBranchOptions(res?.data?.data);
      });
  }
  useEffect(() => {
    fetchStates();
  }, []);
  function fetchStates() {
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state`).then((res) => {
      setStateOptions(res?.data?.data);
    });
    axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/commodity`).then((res) => {
      setCommodity(res?.data?.data);
    });
  }
  const defaultValues = useMemo(
    () => ({
      commodity:  null,
      quantity:  '',
      state: '',

    }),
    [],
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (item) => {
const ids = [];
const quantity = [];
    branchOptions.map((data) => {
      ids.push(data.id)
      quantity.push(parseInt(item[data.branch_name]))
    })
const total = quantity.reduce((next,prev) => {
  return next + prev
},0)
   if(total > item.quantity){
     setError("Total branch quantity cannot exceed the approved quantity")
   }else {
     setError('')
    const payload={
      commodity_id:item.commodity.id,
      state_id:data1.state_id,
      branch_ids:ids,
      quantity:quantity
    }
    axios.post("http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/commodity/add-inventory",payload).then((res)=> {
      if(res.data.status == "200"){
        setOpen(false)
        enqueueSnackbar(`${res.data.data}`)
        reset(defaultValues)
        setBranchOptions([])
        allData()
      }else {
        enqueueSnackbar(`${res.data.message}`,{variant:"error"})
      }
    }).catch((err) => console.log(err))
   }

    // try {
    //   setOpen(false);
    //
    // } catch (error) {
    //   console.error(error);
    // }
  });

  const handleStateChange = (event, newValue) => {
    // setStateOptions([])
    // setDistrictOptions([])
    setSelectedState(newValue);
    methods.setValue('state', newValue);
    // methods.setValue('district', '');
    // methods.setValue('branch', '');
  };

  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: { md: 500, xs: '100%' } },
      }}
    >
      {/*<form>*/}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <DialogTitle sx={{ pb: 0 }}>
              <ClearIcon sx={{ cursor: 'pointer' }} onClick={() => {
                setOpen(false);
                reset(defaultValues)
                setBranchOptions([])
              }}/>
            </DialogTitle>
          </Box>

          <DialogContent sx={{px:5}}>



            <FormProvider onSubmit={onSubmit} methods={methods}>
              <Box
                mt={3}
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(1, 1fr)',
                }}
              >
                <Controller
                  name="commodity"
                  control={control}
                  render={({ field }) => (
                    <RHFAutocomplete
                      {...field}
                      label="Commodity"
                      placeholder="Choose Your Commodity"
                      fullWidth
                      options={commodity}
                      getOptionLabel={(option) => option.commodity_name}
                      onChange={(event, newValue) => {
                        field.onChange(newValue);
                      }}
                      value={field.value || null} // Ensure a fallback value
                    />
                  )}
                />
              </Box>
              <Box
                mt={3}
                rowGap={2}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(2, 1fr)',
                }}
              >
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
                {/*<RHFTextField name="approve_quantity" label="Approved Quantity"   />*/}

                <Controller
                  name="quantity"
                  control={control}
                  render={({ field }) => (
                    <RHFTextField
                      {...field}
                      label="Quantity"
                      fullWidth
                      onChange={(e) => {
                        field.onChange(e);
                        setApprovalQuantity(e.target.value)
                      }}
                    />
                  )}
                />

                <Box sx={{fontWeight:700,marginLeft:1}}>Branches :</Box> <br />
                {branchOptions.map((data) => (
                  <>
                    <RHFTextField   sx={{
                      '& .MuiOutlinedInput-root': {
                        '& input': {
                          fontSize: '16px',
                          fontWeight: 500,
                        },
                        '& fieldset': {
                          border: 'none', // Removes the border
                        },
                      },
                    }} name={data?.branch_name} value={`${data?.branch_name} :`} />
                    <RHFTextField name={data?.branch_name} label="Branch Quantity" />
                  </>

                ))}
              </Box>
            </FormProvider>


            {error && <Box sx={{color:"#FF5630",fontSize:"13px",textAlign:"center",mt:2}}>{error}</Box>}
          </DialogContent>

          <DialogActions >
            {/*<Button variant="outlined" onClick={() => {*/}
            {/*  setOpen(false);*/}
            {/*  setRemark('');*/}
            {/*}}>*/}
            {/*  Cancel*/}
            {/*</Button>*/}
            <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
              Submit
            </LoadingButton>
          </DialogActions>
        </FormProvider>
      {/*</form>*/}
    </Dialog>
  );
}

InventoryQuickEditForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
