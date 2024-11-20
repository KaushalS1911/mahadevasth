import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useBoolean } from 'src/hooks/use-boolean';
import ProductDetailsCarousel from '../../product/product-details-carousel';

// ----------------------------------------------------------------------

export default function MaxWidthDialog({open, handleClose, images}) {

  const [fullWidth, setFullWidth] = useState(true);

  const [maxWidth, setMaxWidth] = useState('md');


  return (
    <>
      <Dialog
        open={open}
        maxWidth={maxWidth}
        onClose={handleClose}
        fullWidth={fullWidth}
      >
        <DialogTitle>Document</DialogTitle>

        <DialogContent>
          <ProductDetailsCarousel images={images}/>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
