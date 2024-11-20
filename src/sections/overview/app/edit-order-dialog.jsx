// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import { useEffect, useMemo, useState } from 'react';
// import { useAuthContext } from 'src/auth/hooks';
// import axios from 'axios';
// import { useForm } from 'react-hook-form';
// import { Box, Stack } from '@mui/system';
// import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
// import FormProvider from 'src/components/hook-form/form-provider';
// import { enqueueSnackbar } from 'notistack';
// // ----------------------------------------------------------------------
// export default function EditOrderDialog({ editDialogOpen, setEditDialogOpen, editId ,dataFiltered}) {
//   const [commodities, setCommodities] = useState([]);
//   const [orderList, setOrderList] = useState([]);
//   const { vendor } = useAuthContext();
//
//   // function fetchAllOrders() {
//   //   axios.get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/${vendor.csp_code}/orders`).then((res) => {
//   //     setOrderList(res.data?.data);
//   //   });
//   // }
//   const editOrder = dataFiltered?.find((item) => item.id == editDialogOpen)
//   useEffect(() => {
//     fetchCommodities();
//     // fetchAllOrders();
//   }, []);
//
//   function fetchCommodities() {
//     axios
//       .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/commodity`)
//       .then((res) => {
//         setCommodities(res.data?.data);
//       });
//   }
//
//   const defaultValues = {
//     csp_code: editOrder?.csp_code,
//     commodity: editOrder?.commodity,
//     quantity: editOrder?.quantity,
//   };
//   const methods = useForm({
//     defaultValues,
//   });
//   const {
//     reset,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = methods;
//   const onSubmit = async (data) => {
//     setEditDialogOpen(false);
//     const payload = {
//       ...data,
//       csp_code: vendor.csp_code,
//       mode: 'test',
//       status: '0',
//     };
//     try {
//       const response = await axios.post(
//         'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/create_order',
//         payload,
//       );
//       if (response.data.status == '201') {
//         enqueueSnackbar('Order added successfully!');
//       } else if (response.data.status == '400') {
//       }
//     } catch (error) {
//       console.error('Order creation error:', error);
//     }
//   };
//   return (
//     <>
//       <Dialog open={editDialogOpen} fullWidth={true} maxWidth={'md'} onClose={() => setEditDialogOpen(false)}>
//         <Box sx={{ py: 5, px: 3 }}>
//           <DialogTitle>Edit Order</DialogTitle>
//           <FormProvider methods={methods}>
//             <DialogContent maxWidth={'lg '}>
//               <Box mb={2} mt={1}>
//                 <RHFAutocomplete
//                   name="commodity"
//                   type="commodity"
//                   label="Commodity"
//                   placeholder="Choose Commodity"
//                   fullWidth
//                   options={commodities.map((option) => option?.commodity_name)}
//                   getOptionLabel={(option) => option}
//                 />
//               </Box>
//               <Box mt={2}>
//                 <RHFTextField name="quantity" label="Quantity" fullWidth/>
//               </Box>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setEditDialogOpen(false)} variant="outlined" color="inherit">
//                 Cancel
//               </Button>
//               <Button variant="contained" onClick={handleSubmit(onSubmit)}>
//                 Save
//               </Button>
//             </DialogActions>
//           </FormProvider>
//         </Box>
//       </Dialog>
//     </>
//   );
// }
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useEffect, useMemo, useState } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Box, Stack } from '@mui/system';
import { RHFAutocomplete, RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------
export default function EditOrderDialog({ editDialogOpen, setEditDialogOpen, editData, dataFiltered,fetchAllOrdersDemo,commodities}) {
  // const [commodities, setCommodities] = useState([]);
  const { vendor } = useAuthContext();
const [edit,setEdit] = useState({})

  // useEffect(() => {
  //
  //   fetchCommodities();
  // }, []);

  // function fetchCommodities() {
  //   axios
  //     .get(`http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/commodity`)
  //     .then((res) => {
  //       setCommodities(res.data?.data);
  //     });
  // }

  const methods = useForm({
    defaultValues: {
      csp_code: '',
      commodity: '',
      quantity: '',
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  useEffect(() => {
    if (editData) {
      reset({
        csp_code: editData?.csp_code,
        commodity: editData?.commodity,
        quantity: editData?.quantity,
      });
    }
  }, [editData]);

  const onSubmit = async (data) => {
    setEditDialogOpen(false);
    const payload = {
      ...data,
      csp_code: vendor.csp_code,
      mode: 'test',
      status: '0',
    };
    try {
      const response = await axios.post(
        'http://ec2-54-173-125-80.compute-1.amazonaws.com:8080/nccf/csp/create_order',
        payload,
      );
      if (response.data.status == '201') {
        enqueueSnackbar('Order added successfully!');
        fetchAllOrdersDemo()
      } else if (response.data.status == '400') {
        enqueueSnackbar('Failed to add order.', { variant: 'error' });
      }
    } catch (error) {
      console.error('Order creation error:', error);
      enqueueSnackbar('Order creation failed.', { variant: 'error' });
    }
  };

  return (
    <Dialog open={editDialogOpen} fullWidth={true} maxWidth={'md'} onClose={() => setEditDialogOpen(false)}>
      <Box sx={{ py: 5, px: 3 }}>
        <DialogTitle>Edit Order</DialogTitle>
        <FormProvider methods={methods}>
          <DialogContent maxWidth={'lg '}>
            <Box mb={2} mt={1}>
              <RHFAutocomplete
                name="commodity"
                type="commodity"
                label="Commodity"
                placeholder="Choose Commodity"
                fullWidth
                options={commodities.map((option) => option?.commodity_name)}
                getOptionLabel={(option) => option}
              />
            </Box>
            <Box mt={2}>
              <RHFTextField name="quantity" label="Quantity" fullWidth />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} variant="outlined" color="inherit">
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              Save
            </Button>
          </DialogActions>
        </FormProvider>
      </Box>
    </Dialog>
  );
}
