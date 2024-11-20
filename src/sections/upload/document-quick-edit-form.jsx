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

export default function DocumentQuickEditForm({
                                                currentUser,
                                                open,
                                                onClose,
                                                setOpen,
                                                approve,
                                                cspCode,
                                                getAllDocument,
                                                getDocuments,
                                                getBtanchDocument,
                                                branch,
                                              }) {
  const { enqueueSnackbar } = useSnackbar();
  const [remark, setRemark] = useState('');
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
    if (approve) {
      const payload = {
        document_id: currentUser?.id,
        status: '1',
        branch_approval_status: '1',
      };
      axios.put('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080//nccf/branch/csp/document/validate', payload).then((res) => {
        if (res) {
          if (cspCode !== 'All') {

            if (cspCode == 'All') {
              getDocuments();

            } else {
              getAllDocument(cspCode);

            }
          } else {
            getBtanchDocument(branch);
          }
          enqueueSnackbar('Document approved successfully');
        } else {

          enqueueSnackbar('Something want wrong', { variant: 'error' });
        }
      }).catch((err) => console.log(err));
    } else {
      {
        const payload = {
          document_id: currentUser?.id,
          status: '1',
          branch_approval_status: '0',
          // remark:remark
        };
        axios.post('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/csp/document/remark', {
          csp_code: cspCode,
          remark: remark,
          mode: 'test',
          document_id: currentUser?.id,
        });
        axios.put('http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/branch/csp/document/validate', payload).then((res) => {
          if (res) {
            setRemark('');
            if (cspCode == 'All') {
              getDocuments();

            } else {
              getAllDocument(cspCode);

            }
            enqueueSnackbar('Document rejected successfully');
          } else {

            enqueueSnackbar('Something want wrong', { variant: 'error' });
          }
        }).catch((err) => console.log(err));
      }
    }
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <DialogTitle>{handleDoctypeLabel(currentUser.doc_type)}</DialogTitle>
          <DialogTitle>
            <ClearIcon sx={{ cursor: 'pointer' }} onClick={() => setOpen(false)}/>
          </DialogTitle>
        </Box>

        <DialogContent>


          <Box py={1} sx={{ mr: 2, mb: 2, height: '100%', cursor: 'pointer' }}>

            <img src={url} alt={url} style={{ width: '100%', height: '100%' }}/>

          </Box>
          {!approve && <TextField name="Remark" label="Remark" value={remark} multiline={true} rows={4} fullWidth={true}
                                  onChange={(e) => setRemark(e.target.value)}/>}
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={() => {
            setOpen(false);
            setRemark('');
          }}>
            Cancel
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting} onClick={handelSubmit}
                         disabled={!approve && remark == ''}>
            {approve ? 'Approve' : 'Reject'}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

DocumentQuickEditForm.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  currentUser: PropTypes.object,
};
