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

// ----------------------------------------------------------------------

export default function BranchInventoryQuickEditForm({
                                                       open,
                                                       onClose,
                                                       setOpen,

                                                     }) {
  const { enqueueSnackbar } = useSnackbar();
  const [remark, setRemark] = useState('');
  const [approvalQuantity, setApprovalQuantity] = useState('');
  const [error, setError] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [stateOptions, setStateOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const NewUserSchema = Yup.object().shape({
    commodity: Yup.string().required('Commodity is required'),
    state: Yup.string().required('State is required'),
    quantity: Yup.string().required('Quantity is required'),
  });
  const data1 = stateOptions?.find((data) => data?.state_name === selectedState);
  useEffect(() => {
    if (data1 && data1.state_id) {
      fetchBranches(data1.state_id);
    }
  }, []);

  function fetchBranches(stateId) {
    axios
      .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/state/${stateId}/branch`)
      .then((res) => {
        setBranchOptions(res?.data?.data);
      });
  }



  const defaultValues = useMemo(
    () => ({
      commodity: '',
      quantity: '',
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

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
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
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <DialogTitle sx={{ pb: 0 }}>
            <ClearIcon sx={{ cursor: 'pointer' }} onClick={() => setOpen(false)}/>
          </DialogTitle>
        </Box>

        <DialogContent>


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
                name="state"
                control={control}
                render={({ field }) => (
                  <RHFAutocomplete
                    {...field}
                    label="Branch"
                    placeholder="Choose Your Branch"
                    fullWidth
                    options={branchOptions.map((option) => option?.branch_name)}
                    getOptionLabel={(option) => option}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                  />
                )}
              />
              {/*<Controller*/}
              {/*  name="commodity"*/}
              {/*  control={control}*/}
              {/*  render={({ field }) => (*/}
              {/*    <RHFAutocomplete*/}
              {/*      {...field}*/}
              {/*      label="Commodity"*/}
              {/*      placeholder="Choose Your Commodity"*/}
              {/*      fullWidth*/}
              {/*      options={['Bharat Daal', 'Bharat Aata', 'Bharat Rice']}*/}
              {/*      getOptionLabel={(option) => option}*/}
              {/*      onChange={(event, newValue) => {*/}
              {/*        field.onChange(newValue);*/}
              {/*      }}*/}
              {/*      value={field.value || ''} // Ensure a fallback value*/}
              {/*    />*/}
              {/*  )}*/}
              {/*/>*/}
              {/*<RHFTextField name="approve_quantity" label="Approved Quantity"   />*/}

              <RHFTextField name="quantity" label="Quantity"/>
            </Box>
          </FormProvider>


        </DialogContent>

        <DialogActions >
          {/*<Button variant="outlined" onClick={() => {*/}
          {/*  setOpen(false);*/}
          {/*  setRemark('');*/}
          {/*}}>*/}
          {/*  Cancel*/}
          {/*</Button>*/}

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

BranchInventoryQuickEditForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};
