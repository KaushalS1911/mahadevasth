import * as Yup from 'yup';
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
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
import FormProvider from 'src/components/hook-form';
import { TextField } from '@mui/material';
import axios from 'axios';
import ClearIcon from '@mui/icons-material/Clear';

// ----------------------------------------------------------------------

export default function BranchQuickEditForm({ currentUser, open, onClose, setOpen, approve,cspCode ,getAllDocument}) {
  const { enqueueSnackbar } = useSnackbar();
  const [remark,setRemark] = useState("")
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('Country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role is required'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',
    }),
    [currentUser],
  );

  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setOpen(false);

    } catch (error) {
      console.error(error);
    }
  });
  const handelSubmit = () => {
    setOpen(false);
    // if (approve){
    const payload = approve ?  {
      order_id: currentUser?.id,
      status: '1',
      branch_approval_status:"1"
    } :{
      order_id: currentUser?.id,
      status: '1',
      branch_approval_status:"0"
    };
    console.log(payload);
      axios.put('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/csp/order/validate', payload).then((res) => {
        if (res) {
          getAllDocument(cspCode)
          approve ? enqueueSnackbar('Document approved successfully') : enqueueSnackbar('Document rejected successfully');
        } else {

          enqueueSnackbar('Something want wrong', { variant: 'error' });
        }
      }).catch((err) => console.log(err))

  };
  const object_url = currentUser?.object_url;
  const secondSlashIndex = object_url?.indexOf('/', 8);
  const secondPart = object_url?.substring(secondSlashIndex);
  const url = `http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/file${secondPart}`;
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: { md: 700, xs: '100%' } },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <DialogTitle>{handleDoctypeLabel(currentUser.doc_type)}</DialogTitle>
          <DialogTitle>
            <ClearIcon sx={{cursor:"pointer"}} onClick={() => setOpen(false)}/>
          </DialogTitle>
        </Box>

        <DialogContent>

          {approve ? <Box sx={{fontSize:"20px",fontWeight:700}}>Are you sure you want to approve this order ?</Box> : <Box sx={{fontSize:"20px",fontWeight:700}}>Are you sure you want to reject this order ? </Box>}

        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => {
            setOpen(false);
            setRemark("")
          }}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting} onClick={handelSubmit} >
            {approve ? 'Approve' : 'Reject'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

BranchQuickEditForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  currentUser: PropTypes.object,
};
