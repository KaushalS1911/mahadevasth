import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useBoolean } from 'src/hooks/use-boolean';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useState } from 'react';
import { handleCategoryTypes } from '../../_mock';

// ----------------------------------------------------------------------
export default function CspTableRow({ row, selected, onEditRow, onSelectRow, onViewRow,onDeleteRow, index,onView }) {
  const { name,category, type_of_firm, contact_person, phone_number, email, address} = row;
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([])
  // const firstPart = object_url.substring(0, secondSlashIndex);
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const popover = usePopover();



const status = "completed"
  return (
    <>
      <TableRow hover selected={selected}>
        {/*<TableCell padding="checkbox" sx={{ width: '100px' }}>*/}
        {/*  <Checkbox checked={selected} onClick={onSelectRow} />*/}
        {/*</TableCell>*/}
        <TableCell sx={{ whiteSpace: 'nowrap' ,textAlign:"center"}}>{index + 1}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' ,fontWeight:"bold",cursor:"pointer"}} onClick={onView} >{name}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{handleCategoryTypes(category)}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{type_of_firm}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{contact_person}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{phone_number}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{email}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{address}</TableCell>
        {/*<TableCell>*/}
        {/*  <Avatar*/}
        {/*    alt={object_url}*/}
        {/*    src={url}*/}
        {/*    sx={{ mr: 2, height: 46, width: 46,cursor:"pointer" }}*/}
        {/*    variant="rounded"*/}
        {/*    onClick={() => handleViewDialog(url)}*/}
        {/*  />*/}
        {/*</TableCell>*/}
        {/*<TableCell sx={{ whiteSpace: 'nowrap' }}>{handleDoctypeLabel(doc_type)}</TableCell>*/}
        {/*<TableCell sx={{ whiteSpace: 'nowrap' }}>*/}
        {/*  {moment(uploaded_on).format('DD/MM/YYYY')}*/}
        {/*</TableCell>*/}
        {/*<TableCell>*/}
        {/*  <Label*/}
        {/*    variant="soft"*/}
        {/*    color={*/}
        {/*      (status === 'completed' && 'success') ||*/}
        {/*      (status === 'pending' && 'warning') ||*/}
        {/*      (status === 'declined' && 'error') ||*/}
        {/*      'default'*/}
        {/*    }*/}
        {/*  >*/}
        {/*    {status}*/}
        {/*  </Label>*/}
        {/*</TableCell>*/}
        {/* <TableCell sx={{ whiteSpace: 'nowrap' }}>completed</TableCell> */}
        {/* <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}> */}
        {/*<Tooltip title="Quick Edit" placement="top" arrow>*/}
        {/*  <IconButton color={quickEdit.value ? 'inherit' : 'default'} onClick={quickEdit.onTrue}>*/}
        {/*    <Iconify icon="solar:pen-bold" />*/}
        {/*  </IconButton>*/}
        {/*</Tooltip>*/}
        {/* <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell> */}
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>

          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        // sx={{ width: 140 }}
      >
        <MenuItem onClick={() => onViewRow()}>
          <Iconify icon="solar:eye-bold" />
          View Documents
        </MenuItem>
        {/*<MenuItem*/}
        {/*  onClick={() => {*/}
        {/*    onEditRow();*/}
        {/*    popover.onClose();*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <Iconify icon="solar:pen-bold" />*/}
        {/*  Edit*/}
        {/*</MenuItem>*/}
        {/*<MenuItem*/}
        {/*  onClick={() => {*/}
        {/*    confirm.onTrue();*/}
        {/*    popover.onClose();*/}
        {/*  }}*/}
        {/*  sx={{ color: 'error.main' }}*/}
        {/*>*/}
        {/*  <Iconify icon="solar:trash-bin-trash-bold" />*/}
        {/*  Delete*/}
        {/*</MenuItem>*/}
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
CspTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
